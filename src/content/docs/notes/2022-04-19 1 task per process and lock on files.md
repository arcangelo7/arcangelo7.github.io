---
title: 2022-04-19 1 task per process and lock on files
editUrl: false
---

## Cosa ho fatto

* Novità relative a Meta:
  * Ho individuato la causa principale del consumo smodato di **memoria**: `concurrent.futures.ProcessPoolExecutor` riutilizza il processi. Pertanto, la memoria dei task passati non viene mai rilasciata completamente, accumulandosi.
    * `multiprocessing.Pool` mette invece a disposizione il parametro `maxtasksperchild`, che se impostato a 1 fa sì che ogni processo venga killato al termine del task. Questo ha risolto il problema di memoria.

  * Ho individuato il principale **collo di bottiglia**: è lo **Storer**, che costretto a operare in maniera sequenziale blocca tutti gli altri processi.
    * La soluzione è imporre il **lock** non all’intero processo, ma solo allo specifico file modificato.
    * In questo modo, due processi si calpestano i piedi soltanto se hanno individuato sul triplestore una stessa entità preesistente da arricchire, un’eventualità possibile ma infrequente.
    * Ho modificato sia il Reader che lo Storer di oc\_ocdm in locale, utilizzando la libreria [https://github.com/tox-dev/py-filelock](https://github.com/tox-dev/py-filelock) menzionata da Simone.
      * ⚠️ Problema: mentre su Windows i file .lock vengono cancellati automaticamente, su UNIX ciò non avviene e non deve avvenire, per evitare la *race condition* (due processi che tengono un blocco su uno stesso file contemporaneamente).

        * In UNIX è possibile eliminare un file anche quando c'è un processo in corso che lo usa, quindi cancellare il lockfile **non** garantisce che nessun processo stia utilizzando quel blocco o che un processo sia in procinto di aprire un file e di appropriarsi di quel blocco.

        [Why does the Python filelock library delete lockfiles on Windows but not UNIX?](https://stackoverflow.com/questions/58098634/why-does-the-python-filelock-library-delete-lockfiles-on-windows-but-not-unix)

  * In fase di preparazione al multiprocessing, i CSV in input vengono anzitutto **divisi** in CSV di **1000 righe** l’uno. Ciò comporta i seguenti vantaggi:
    * Si occupa meno memoria in multiprocess.
    * Il tempo stimato per completare il processo di Meta è più accurato.

  * Ci sono 152,975 risorse bibliografiche nel dump di Meta con coautori registrati con lo stesso nome. Ecco quali casi ho riscontrato:

    [files/homonymous\_coauthors.csv at main · arcangelo7/files](https://github.com/arcangelo7/files/blob/main/homonymous_coauthors.csv)

    * Autore “Not Available” ([10.1007/s002770000280](https://api.crossref.org/works/10.1007/s002770000280))
      * Nel dump di Crossref la dicitura ‘not available’ compare 931 volte nei campi “author” e 1 volta nel campo “issue”.
      * L’autore viene cancellato.
        * Not Available, Not Available → None
        * Peroni, Not Available → Peroni,
        * Not Available, Silvio → None
        * Not Available → None
    * Due autori con stesso cognome e stessa iniziale del nome registrati con solo l’iniziale del nome ([10.1007/s00280-020-04196-9](http://doi.org/10.1007/s00280-020-04196-9))
    * Lo stesso autore registrato due volte ([https://doi.org/10.1007/s002770050211](https://doi.org/10.1007/s002770050211))
    * Due autori diversi con lo stesso nome e cognome ([10.1007/s00521-020-05452-y](https://doi.org/10.1007/s00521-020-05452-y))
      * Padre e figlio con stesso nome e cognome che coautorano lo stesso articolo ([10.1007/s00508-010-1409-y](https://doi.org/10.1007/s00508-010-1409-y)).
        * Su Crossref compaiono come omonimi, anche se sulla pagina dell’articolo il figlio è riportato come Jr.
      * Non viene assegnato alcun ORCID.

  * Risolto un **bug** per cui, riguardo ai campi **volume**, **issue e venue**, i dati presenti sul triplestore avevano la **precedenza** su quelli nel CSV anche se **inesistenti**.
    * In pratica, se sul triplestore non era indicato alcun volume, issue e venue e nel CSV sì, il CSV veniva sovrascritto cancellando tali informazioni.
    * Ora, se sul CSV sono presenti volumi, issue e venue assenti sul triplestore, il triplestore viene aggiornato con tali informazioni e non viceversa. Inoltre, nei log viene segnato che è stato trovato un valore per quei campi.

  * Risolto un **bug** per cui, riguardo gli **agenti responsabili**, se il campo del CSV era vuoto non veniva fatto alcun controllo per verificare che l’informazione fosse presente sul triplestore. Pertanto, i campi rimanevano vuoti e non venivano arricchiti.

  * ~~Risolto un **bug** per cui, in caso di **estensione** della **sequenza ordinata** di **autori** o **editor** o di \*\*\*\*aggiunta del **titolo**, i **log** non tenevano traccia di queste modifiche.~~

  * Ho scoperto che il **ProvSet** salvava tutti i delta a partire da zero, non dallo snapshot precedente, poiché non veniva specificato il **preexisting\_graph**.
    * Adesso, per ogni entità **realmente** preesistente, viene recuperato il grafo preesistente.
    * Per non rallentare ulteriormente il processo, il Curator salva in un set i MetaID delle entità preesistenti, così che il Creator non faccia dei CONSTRUCT a vuoto.
      * Subito prima che i wannabe\_id diventino dei MetaID, le entità i cui id **non** sono dei wannabe\_id sono **tutte** le entità preesistenti rilevanti per quel CSV. Questa funzionalità è stata testata.
    * Inoltre, in ogni file, il preexisting graph di ogni entità viene recuperato solo una volta e salvato per essere riutilizzato nel caso una stessa entità compaia più volte nello stesso file.
    * La generazione della provenance è stata testata.

  * Per quanto riguarda il potenziamento della **cache**, ho adottato una soluzione tanto cheap quanto funzionale all’obiettivo prefissato.
    * 🎯Requisito: evitare che il crash del Curator o del Creator in un processo faccia crashare altri processi che stanno modificando i file o il triplestore.
    * 💡Soluzione: intercettare qualunque eccezione e salvare l’elenco dei file che hanno causato un crash e perché lo hanno causato.
      * ⬆️ Vantaggi:
        * Non c’è bisogno di utilizzare un database per gestire letture e scritture parallele.  Se un processo solleva un’eccezione, quel singolo processo scrive su file.
        * Meta non crasha più.
      * ⬇️ Svantaggi:
        * In teoria, se l’eccezione è causata dalla Storer questo sistema non evita le incongruenze tra file e triplestore. Tuttavia, i danni vengono limitati a un singolo processo e non moltiplicati per il numero di workers. Ad ogni modo, lo Storer non ha mai causato crash finora.
        * Se il computer si spegne durante l’esecuzione questo sistema non funziona.
    * Pertanto, ora la cache consiste di due file:
      * `cache.txt`, contenente l’elenco del file processati, che si aggiorna ogni volta che un processo ha completato il task.
      * `errors.txt`, che contiene l’elenco dei file che hanno sollevato eccezioni e i relativi messaggi di errore.

  * **Fine-tuning** della **preparazione** al **multiprocess**:
    * Per quanto riguarda gli id che compaiono in file multipli, non vengono preprocessati solo gli id, ma anche le **pagine**, perché gli intervalli di pagine sono registrati in entità di tipo fabio:ResourceEmbodiment.
      * Ad oggi, solo il titolo, la data di pubblicazione e il tipo non richiedono alcun preprocessing.
    * Le venue, i volumi, gli issue, gli agenti responsabili e i publishers vengono preprocessati solo se compaiono effettivamente in più file.
      * Questa modifica ha lo scopo di preprocessare il meno possibile, in quanto Meta impiega più tempo a processare una risorsa preesistente che a crearne una nuova.
      * Anche ridurre i tempi del preprocessing non fa schifo.
    * ~~Le **venue** vengono nuovamente **preprocessate** in multiprocessing, ma solo dopo essere state suddivise tra i vari file di input in maniera tale che **file diversi** contengano sempre **venue diverse** e almeno **1000 righe**.~~

  * Ho testato la **velocità** delle **query** su **valori letterali** su un triplestore contenente circa 60 milioni di triple.
    * Le query sono risultate sorprendentemente **veloci** (nell’ordine dei 40 ms).
    * **Non** ho riscontrato differenze ponendo il triple-pattern contenente il valore letterale in **cima** alla query, né utilizzando bds:search.
    * Per scrupolo, ho riscritto le query ponendo sempre il triple-pattern con il valore letterale in cima alle query, ma penso che tale modifica sia stata ininfluente sulla velocità di esecuzione.
    * I fattori che rallentavano il processo erano il consumo eccessivo di memoria e le operazioni sequenziali dello Storer, non le query poco performanti.
* Ho studiato **RAMOSE**:
  * Daquino, M., Heibi, I., Peroni, S., & Shotton, D. (2022). Creating RESTful APIs over SPARQL endpoints using RAMOSE. In A. Haller (Ed.), Semantic Web (Vol. 13, Issue 2, pp. 195–213). IOS Press. [https://doi.org/10.3233/sw-210439](https://doi.org/10.3233/sw-210439)
  * Silvio Peroni, & marilenadaquino. (2021). opencitations/ramose: latest (v1.0.4). Zenodo. [https://doi.org/10.5281/zenodo.5636513](https://doi.org/10.5281/zenodo.5636513)
* Novità relative a **time-agnostic-library**:
  * La libreria è ora parzialmente compatibile con **Fuseki**, in quanto le stesse query già testate con gli altri triplestore hanno funzionato anche con Fuseki.
    * Tuttavia, ci sono ancora **incompatibilità** per quanto riguarda la **cache**.
    * Anche Fuseki viene lanciato **automaticamente** dal comando `poetry run test`

## Domande

* Riprendo il discorso su un problema che era già emerso durante lo sviluppo di time-agnostic-library e che non è mai stato risolto.
  * La funzione utilizzata da oc\_ocdm per hashare due grafi e confrontarli per computarne il delta è `rdflib.compare.to_isomorphic`.
  * **Problema**: l’hash è sensibile ai datatype. Se si confrontano gli hash di grafi contenenti triple identiche meno che per la presenza/assenza del datatype, gli hash risultano diversi. Pertanto, vengono generati nuovi snapshot inutili.
  * È assai probabile che software diversi da oc\_ocdm coinvolti nel workflow (e.g. rdflib, Blazegraph, SPARQLWrapper) normalizzino i letterali, aggiungendo o rimuovendo il datatype in maniera arbitraria e imprevedibile.
  * oc\_ocdm aggiunge il datatype alle date, ma non alle stringhe.
  * Ritengo che oc\_ocdm dovrebbe normalizzare i datatype, in modo da gestire i datatype in lettura nello stesso modo in cui farebbe in scrittura. Altrimenti si è in balia delle implementazioni esterne. Cosa ne pensate?
  * Temporaneamente, Meta rimuove il datatype solo dai letterali di tipo stringa quando ne recupera il grafo preesistente.
* Ritenete che per i test su time-agnostic-library dovrei usare la versione gratuita di GraphDB anche se quella a pagamento ha un periodo di prova di 60 giorni?

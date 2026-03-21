---
title: 2025-04-16 Interfaccia di merge
editUrl: false
---

# 16-04-2025. Interfaccia di merge

## time-agnostic-library

* Sto provando a realizzare l'adapter in java che mi permetta di utilizzare il benchmark [SPVB](https://github.com/hobbit-project/versioning-benchmark) tramite la piattaforma [HOBBIT](https://github.com/hobbit-project/core). Un problema che sto riscontrando è che il file `pom.xml` del benchmark che definisce le dipendenze è rotto, nel senso che fa riferimento a dei repository da cui scaricare la dipendenza del core di hobbit che sono bloccati o comunque non esistono, non contengono quella versione, rendendo di fatto impossibile la generazione di un file jar da utilizzare per fare test localmente. Ricordo che si tratta di un benchmark che non viene aggiornato dal 2018.
* Per quanto riguarda Bear, i dati non sono più disponibili, nel senso che il repository ufficiale di Bear fa riferimento a un server FTP che non è raggiungibile e il sito che faceva da Mirror e dal quale si potevano scaricare i dati è offline. Sulla Wayback machine ho trovato un link funzionante ([https://web.archive.org/web/20240730164248/https://aic.ai.wu.ac.at/qadlod/bear.html](https://web.archive.org/web/20240730164248/https://aic.ai.wu.ac.at/qadlod/bear.html)) dal quale però non è possibile scaricare i dati
  * [https://aic.ai.wu.ac.at/qadlod/bear.html](https://aic.ai.wu.ac.at/qadlod/bear.html)
  * [ftp://nassdataweb.infor.uva.es/BEAR](# "ftp://nassdataweb.infor.uva.es/BEAR")
  * [https://github.com/webdata/BEAR](https://github.com/webdata/BEAR)
* Ho quindi provato a inviare un'email ai quattro autori del paper, sebbene per quanto riguarda Javier Fernandez e Magnus Knut non sono riuscito a trovare un'email funzionante e quella più recente, presente sui loro paper più recenti, non permette al messaggio di arrivare a destinazione. Quindi in pratica ho scritto soltanto al secondo autore, Juergen Umbrich, e ad Axel Polleres.
* Dato che il benchmark BEAR non esiste più in rete sono tornato a lavorare a quell'altro, SPBv, che però ha altrettanti problemi perché in 10 anni alcune dipendenze non esistono più in rete. Allora sto provando a cercare e a precompilarmele a mano ma mi sto trovando in un dependency hell per cui ogni dipendenza ha altre dipendenze a catena da precompilare a mano. Tutto questo in Java, che non ho mai studiato bene da zero e sto imparando mentre lo uso, ma sono ben lontano dal padroneggiare. Io penso di essere in un vicolo cieco e non so cosa inventarmi, oltre al fatto che sto sprecando tantissimo tempo perché in due settimane sono a zero progressi concreti. Qualche idea?

## HERITRACE

### Bugfix

* Dei punti sollevati da Francesca Filograsso nella sua mail, uno mi ha particolarmente colpito, ovvero quello in cui dice che non è possibile aggiungere il contenitore dell'articolo di una conferenza, ovvero la collezione degli articoli della conferenza. Questo in teoria è una proprietà obbligatoria dell'elemento Conference Proceedings.
* Indagando mi sono accorto che il motivo per cui non era possibile aggiungere tale proprietà era che esisteva già. Esisteva già, ma esisteva il puntatore a un'entità che poi era stata cancellata. Era stata cancellata, ma non era stato cancellato in riferimento a quell'entità da parte della entità che la referenziava. - Si è reso quindi necessario realizzare uno script per eliminare questi collegamenti morti, script che ho testato e ho lanciato per patchare la situazione attuale.
  * Tra l'altro questo script non si occupa di gestire la provenance per non creare disallineamenti temporali nel momento in cui quel riferimento doveva essere già stato cancellato nel passato e non lo era stato. Quindi per evitare di creare ulteriori casini a posteriori mi sono limitato a cancellare i riferimenti morti.
* Ho poi però indagato se effettivamente il problema persiste ancora, ovvero se eliminando ad esempio l'identificatore di un articolo, l'articolo continui a referenziare quell'identificatore e la risposta è sì, il problema esiste ancora.
  * Effettivamente cancellavo già i riferimenti a entità cancellate, ma tali entità referenzianti non erano incluse nel grafo locale.
  * Costruivo il grafo locale in maniera ricorsiva a partire dall'entità coinvolta in una modifica al fine di trovarne per esempio entità proxy e entità orfane, ma non mi ponevo il problema dell'individuare le entità referenzianti.
  * Al momento le entità referenzianti vengono incluse nel grafo locale soltanto nel caso in cui l'entità referenziata venga cancellata per ragioni di performance.

### Merge

* Ho cominciato a riflettere sull'interfaccia per fondere varie entità. La cosa migliore, secondo me, è disegnare un'interfaccia proattiva che stimoli l'utente a liberarsi delle entità duplicate, in quanto lo scopo originale dell'applicazione è proprio quello di correggere gli errori nel dataset.
  * In questo senso, la cosa migliore mi è sembrata aggiungere un'ulteriore sottosezione alla pagina di dettaglio di un'entità che mostri le entità collegate e che per ciascuna entità collegata ti stimoli a cliccare su un pulsante diffusione.
  * Dopodiché, l'idea è che il pulsante di fusione rimandi a una pagina di confronto dettagliato tra le due entità che spieghi esplicitamente le conseguenze derivanti dalla fusione, che magari potrebbero non essere immediatamente ovvie per il nostro tipo di utente.
* Per la ricerca di entità simili si pone un problema, come faccio a definire in maniera agnostica quando due entità sono simili? Il sistema deve funzionare out of the box, se l'utente non specifica niente sono simili due entità per le quali almeno uno dei valori dei predicati è uguale, quindi si fa una query di union con i valori di tutti i predicati con un limit di 5, se almeno una coincide quella è una somiglianza.
  * Questo approccio però è problematico, perché in questo modo potrebbero essere considerate simili due entità perché hanno una keyword uguale. Questo è del tutto legittimo, ma magari non è quello che vuole l'utente finale, magari l'utente finale vuole che due entità siano simili perché hanno lo stesso identificatore.
  * Queste regole vanno definite con delle regole ad hoc.

````yaml
            common_similarity_properties:
              title_identifier: &title_identifier
                - "http://purl.org/dc/terms/title"
                - "http://purl.org/spar/datacite/hasIdentifier"
              sequence_container: &sequence_container
                - "http://purl.org/vocab/frbr/core#partOf"
              agent_names_identifier: &agent_names_identifier
                - "http://xmlns.com/foaf/0.1/name"
                - "http://xmlns.com/foaf/0.1/familyName"
                - "http://xmlns.com/foaf/0.1/givenName"
                - "http://purl.org/spar/datacite/hasIdentifier"
              identifier_value_scheme: &identifier_value_scheme
                - "http://www.essepuntato.it/2010/06/literalreification/hasLiteralValue"
              
            - class: "http://purl.org/spar/fabio/JournalArticle"
              priority: 1
              shouldBeDisplayed: true
              displayName: "Journal Article"
              similarity_properties: *title_identifier
        ```

### UI/UX

- L'aggiunta del pulsante di fusione ha portato alla luce un'incoerenza tra i vari pulsanti, nel senso che alcuni pulsanti avevano sia un'etichetta che un'icona, altri soltanto l'etichetta, altri soltanto l'icona.
    - Ho deciso, nell'ottica di essere il più espliciti possibile, di mettere icona e testo per tutti i pulsanti, cercando tra l'altro di renderli tutti della stessa larghezza per coerenza visiva e scegliendo delle parole che abbiano più o meno lo stesso numero di caratteri. Quindi, per esempio, Merge, Visit, Delete, Revert con una larghezza massima di 6 rem.
    - Dopodiché, i campi affiancati avranno una larghezza massima che è il 100% meno 7 rem della larghezza del contenitore.
    - Il pulsante delete, relativo alla cancellazione dell'intera risorsa, ora ha un'etichetta delete resource e edit diventa edit resource, in maniera tale che per i pulsanti in alto ci siano sempre due parole. Perché poi edit, quando cliccato, diventa cancel editing e in time machine ovviamente sono già due parole. Chiaramente, su smartphone, i pulsanti vanno uno sotto l'altro.
````

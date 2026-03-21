---
title: 2022-03-22 GraphDB vs Blazegraph
editUrl: false
---

## Cosa ho fatto

* Ho lanciato Meta in single-process su oc-ficlit.

* Ho implementato e testato le nuove regole di validazione dei CSV in input per Meta.

* Il CSV allegato contiene tutte le 427,543 risorse presenti nel dump di Crossref con **issue** direttamente contenuta nella rivista, **senza volume**.

  [files/issues\_in\_journal.csv at main · arcangelo7/files](https://github.com/arcangelo7/files/blob/main/issues_in_journal.csv)

  Ne riporto qui 10 casuali.

  [attachments/09f11f471679449a9f37b179ba97758e.csv](/notes/attachments/09f11f471679449a9f37b179ba97758e)

* Novità relative all’articolo sulle time-traversal queries:
  * Ho completato i benchmark su Blazegraph.
  * Ho scritto del codice Javascript che, data una lista di file contenenti i risultati dei benchmark, genera automaticamente delle tabelle HTML che contengono e confrontano tutti i risultati.
    * Ciò si è reso necessario perché, aumentando i triplestore, i risultati sono diventati centinaia. Pertanto, copiare tutti i numeri a mano, oltre che tedioso, introduceva un alto rischio di errori di trascrizione.
    * Si possono usare convertitori online per trasformare le tabelle HTML in altri linguaggi, tra cui LaTeX.
  * Le dipendenze, la pacchettizzazione, i test e la distribuzione di time-agnostic-library sono ora gestibili tramite **Poetry**.
    * Ho aggiornato il README per spiegare come effettuare le suddette operazioni tramite Poetry.
  * time-agnostic-library è ora compatibile con **rdflib v6.1.1**.
  * Ho studiato la documentazione di GraphDB circa la **full text search** ([Lucene GraphDB connector](https://graphdb.ontotext.com/documentation/free/lucene-graphdb-connector.html#), [General full-text search with the connectors](https://graphdb.ontotext.com/documentation/free/general-full-text-search-with-connectors.html)). Alcune considerazioni:

    | Blazegraph FTS                                                                                                       | GraphDB FTS                                                                                                                                                                                              |
    | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | Per costruire l’indice basta premere un pulsante o fare un POST tramite l’API, non c’è bisogno di configurare niente | Per costruire l’indice bisogna effettuare una complessa query SPARQL INSERT con configurazione JSON embeddata. Si può fare anche tramite interfaccia, ma non è intuitivo                                 |
    | Vengono indicizzati tutti i literal, punto (non è vero, si può fare con un hack)                                     | Fine tuning estremo. È possibile indicizzare solo determinate proprietà o catene di proprietà con determinati datatype, lingue e match di espressioni regolari. Mi fermo qui, ma si può fare molto altro |
    | Predicati per effettuare la ricerca testuale standard e uguali per tutti (e.g. bds:search)                           | ⚠️Per effettuare una ricerca testuale bisogna specificare il nome dell’indice (chiamato *connector*), che è deciso dall’utente. Non ci sono query generiche valide per tutti                             |
    | L’indice non si aggiorna in automatico, va ricostruito in caso di modifiche al dataset (non è vero)                  | L’indice si aggiorna a ogni UPDATE in automatico                                                                                                                                                         |
    | Le tipologie di query sono comparabili (ricerca testuale, rilevanza, rank, expressioni regolari, total hits)         | Le tipologie di query sono comparabili (ricerca testuale, rilevanza, rank, expressioni regolari, total hits)                                                                                             |
    | Usa un sistema proprietario                                                                                          | Si appoggia ad [Apache Lucene](https://lucene.apache.org/), open-source                                                                                                                                  |
  * In GraphDB è possibile elencare i connectors disponibili o controllare il loro stato, ma niente di più. Non è possibile capire tramite query SPARQL quale proprietà è stata indicizzata, se sono state indicizzate tutte o altro. In presenza di migliaia di connectors, time-agnostic-library dovrebbe aprioristicamente interpellarli tutti, vanificando l’utilità dell’indice stesso di rendere la query più rapida.
    * Pertanto, nel file di configurazione di time-agnostic-library occorre specificare il nome del connector, tramite la nuova chiave `graphdb_connector_name`
  * time-agnostic-library supporta ora l’indice testuale di GraphDB. Ponendo di voler cercare tutte le query di update contenenti l’IRI ‘[http://www.essepuntato.it/2010/06/literalreification/hasLiteralValue](http://www.essepuntato.it/2010/06/literalreification/hasLiteralValue)’ e ponendo che il *connector* si chiami *fts*, la query all’indice è la seguente:

    ```sparql
    PREFIX con: <http://www.ontotext.com/connectors/lucene#>
    PREFIX con-inst: <http://www.ontotext.com/connectors/lucene/instance#>
    PREFIX oco: <https://w3id.org/oc/ontology/>
    SELECT DISTINCT ?updateQuery 
    WHERE {
      ?snapshot oco:hasUpdateQuery ?updateQuery.
      [] a con-inst:fts; 
    		con:query '"http://www.essepuntato.it/2010/06/literalreification/hasLiteralValue"';
    		con:entities ?snapshot .
    }
    ```

    * Ho testato tale nuova funzionalità.
  * ⚒️ Sto testando su GraphDB tutte le query sulle versioni, sui delta e le materializzazioni già testate su Blazegraph.
    * Se si effettua una query con BIND e una variabile viene vincolata dopo il suo utilizzo GraphDB considera la query malformata, a differenza di Blazegraph.

## Domande

* Ho visto che su oc-ficlit c’è un SSD da 446.6G e un hard-disk da 2T. Immagino che per scrivere sull’hard-disk si debba utilizzare il mountpoint in /mnt, ma non ho i permessi per scrivere in quella directory. Si potrebbe creare un altro mountpoint nella mia home su cui ho i permessi?
  * Finora mi sono limitato a caricare sul server solo 21.7 GB di CSV, ma per testare Meta a tutto tondo saturerei sicuramente l’SSD.
* Quanti core posso usare su oc-ficlit? 10.
* Se il processo di Meta crasha prima che le entità create siano state caricate sul triplestore, nei file RDF in JSON-LD compariranno entità che sul triplestore non esistono, con relativa provenance. Sbaglio? Se non sbaglio, è un problema? Sì.
  * Risoluzione: struttura dir dati e prov temporanea. Viene unita alla struttura finale solo alla fine, dopo il caricamento sul triplestore.
  * Al contrario, non ci dovrebbero essere problemi nel caso di modifiche multiple e identiche a entità preesistenti nei file RDF, perché tali modifiche dovrebbero essere **idempotenti**, giusto?
* time-agnostic-library dovrebbe supportare la possibilità di usare triplestore diversi con indici diversi contemporaneamente? Ad esempio, provenance divisa su un triplestore Blazegraph e uno GraphDB entrambi con l’indice testuale abilitato. Al momento specificare più di un indice solleva un ValueError con messaggio di errore “The use of multiple indexing systems simultaneously is currently not supported.”.
* Per qualche ragione time-agnostic-library lavora molto più lentamente avendo GraphDB come triplestore anziché Blazegraph. Qualcuno ha avuto esperienza di tali rallentamenti? Potrebbe essere un problema di configurazione?

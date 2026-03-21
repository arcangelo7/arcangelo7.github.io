---
# SPDX-FileCopyrightText: 2025-2026 Arcangelo Massari <info@arcangelomassari.com>
#
# SPDX-License-Identifier: CC-BY-4.0

title: 2022-04-08 Time-agnostic-library +300%
editUrl: false
---

## Cosa ho fatto

* Ecco quali funzionalità di Meta sono state testate con successo su oc\_ficlit:
  * Generazione dell’input di Meta a partire dal dump di Crossref
  * Preparazione al multiprocess
* Risolto un bug nella preparazione al multiprocess per cui venivano paradossalmente introdotte entità conflittuali. Il problema si risolve preprocessando le venue in single-process, poiché possono comparire in più file contemporaneamente, mentre gli autori possono essere preprocessati in multi-process.
* In precedenza venivano preprocessate tutte le venue multi-publisher con relativi volumi e issue e tutti gli autori ed editor, dopodiché i dati venivano divisi per casa editrice in modo da poter essere elaborati da più processi in sicurezza.
  * Tale sistema si è dimostrato fallimentare dai miei test su oc\_ficlit, perché si vengono a creare file CSV che pesano GB, come quello relativo all’”American Physical Society”, e altri con una riga sola, come quello relativo a “Sci-Comm Consulting Ltd”. I file più massicci fanno sì che in multi-process con 10 workers oc\_ficlit finisca la RAM.
  * Per risolvere questo problema, ora vengono preprocessate tutte le venue (in single-process) e tutti i publisher, che sono appena 14,367 e con 24 workers sulla mia macchina si processano in appena 2 minuti.
  * I publisher vengono precaricati sul triplestore come gli autori e gli editor, quindi come semplici agenti responsabili senza ruolo e senza risorsa bibliografica associata.
* Ho implementato un sistema di **cache** anche per il plugin che genera l’input di Meta a partire dal dump di **Crossref**. Tale sistema è analogo a quello di Meta e funziona sia se il dump è compresso sia se è decompresso.
* Ho trovato la rivista con issue “7-8 (10)”: [10.1134/s0370274x19190081](http://doi.org/10.1134/s0370274x19190081)
* Confermo che ogni nuovo literal viene aggiunto all’indice testuale di Blazegraph

  > If enabled, then each literal added to the database (by appearing in the “O” position of a statement) is also added to the text index ([https://github.com/blazegraph/database/wiki/FullTextSearch](https://github.com/blazegraph/database/wiki/FullTextSearch))
* Novità relative a **time-agnostic-library**:
  * Ora tutti i test che coinvolgono query vengono eseguiti sia su Blazegraph che su GraphDB, per garantire la piena compatibilità con questi due triplestore.
    * Tutti i test sono stati superati.

  * Ho caricato i dataset di test su Zenodo. Lanciando `poetry run tests` tutto l’occorrente, se non è già presente, viene automaticamente scaricato ed estratto nella cartella corretta. Dopodiché, sia Blazegraph che GraphDB vengono lanciati in automatico, in modo da consentire l’esecuzione dei test.

  * Risolto l’annoso problema menzionato nel seguente blocco: [Tu vuo far el phdino/22-03-2022 GraphDB vs Blazegraph](/notes/tu-vuo-far-el-phdino/22-03-2022-graphdb-vs-blazegraph)
    * Non è un problema legato ai limiti sul multi-threading imposti dalla versione gratuita. Ho testato la versione a pagamento tramite prova di 60 giorni e il problema persiste.
    * Il problema è che ho passato come indirizzo locale dell’endpoint http\://**localhost**:7200/repositories/data anziché http\://**127.0.0.1**/repositories/data. In questo modo, il DNS doveva risolvere ogni volta l’indirizzo, causando una pausa di circa 1 secondo tra una query e l’altra.

  * Ho aumentato del 330% circa le performance del processo di ricostruzione della storia delle entità rilevanti trovate nelle query di update. Una volta individuati i loro URI, tali entità vengono ricostruite in multithreading. Per ricostruire 2814 entità si impiegano adesso circa 45 secondi anziché 2 minuti e mezzo.

      <aside>
      👉 È vero che sia Blazegraph che GraphDB lavorano automaticamente in multithreading, ma Python no. L’esecuzione del codice si blocca per aspettare la risposta di una query prima di lanciare la successiva. Pertanto, implementare il multithreading su operazioni di I/O porta un enorme beneficio.

      </aside>

    * Lo stesso discorso vale anche per le query sui delta: le entità che sono state modificate vengono identificate in multi-threading.

      <aside>
      👉 Sono consapevole pyparsing non è thread-safe e che viene utilizzato da rdflib per parsare le query SPARQL. Ho aggirato il problema facendo sì che il parsing avvenga single-thread tramite lock. Tale parser serve solo per eseguire le query su file locali e per processare l’output di query già avvenute, poco male.

      </aside>

    [https://github.com/RDFLib/rdflib/issues/1282](https://github.com/RDFLib/rdflib/issues/1282)

    [benchmarks\_before\_after\_multi\_threading.xlsx](08-04-2022%20Time-agnostic-library%20+300%25%207ac33a7161ba4cdfa13ff8d639cdec4c/benchmarks_before_after_multi_threading.xlsx)

  * Ho dovuto modificare il parametro di configurazione relativo alla cache, per consentire la distinzione tra endpoint di lettura e scrittura. Infatti, GraphDB ha due endpoint separati per le due operazioni.

  * Ho aggiornato README e documentazione per spiegare le novità relative al file di configurazione e al supporto a GraphDB.

  * Ho rilasciato la versione **3.0.0** (non è retrocompatibile per via del supporto a rdflib 6.1.1.).

  * Novità relative ai benchmark:
    * Ho ampliato l’automatismo della procedura di benchmark in modo che i benchmark vengano eseguiti con più triplestore. Basta sempre lanciare un file bash, dopodiché i benchmark vengano lanciati prima su Blazegraph e poi su GraphDB, coi i relativi file di configurazione e metodi per lanciare e chiudere i database pre-impostati.

## Domande

* Esiste un modo per ricavare il nome del triplestore dall’URL dell’endpoint? Per fare l’esempio di Blazegraph, nei metadati di una risposta HTTP si legge semplicemente che il server è ‘Jetty(9.4.z-SNAPSHOT)’, ovvero un generico server basato su Java, che viene usato anche da altri triplestore.
* Nel file di configurazione YAML gli indici testuali sono di mutua esclusione e se ne può specificare al massimo uno. Tuttavia, non c’è niente nel formato YAML che forzi questo comportamento, che io sappia. Qualche idea su come evitare che l’utente sbagli e specifichi più di un indice?
* Il processo master conta come processo? In altre parole, se l’utente specifica 24 nel parametro max\_workers del file di configurazione di Meta si aspetta che vengano processati 24 CSV contemporaneamente o che ci siano al massimo 24 processi? Perché nel secondo caso i file processati contemporaneamente saranno 23, a cui si aggiunge il processo master che coordina gli altri. Il problema della seconda opzione è che, se l’utente indica 2 nel parametro max\_workers, i file di input vengono paradossalmente processati in single-process. Cosa ne pensate?

---
title: 2025-04-24 Time Agnostic Mess
editUrl: false
---

## La Novitade

### HERITRACE

#### Fusione

* Dato che la logica di fusione non è specifica di HERITRACE ma può essere riutilizzata in varie applicazioni l'ho spostata e generalizzata in rdflib-ocdm
  * In questo modo viene anche automaticamente gestita l'aggiunta dello snapshot di fusione all'entità sopravvissuta.
* Ho testato tutto il back-end relativo alle operazioni di fusione
  * Analizzando uno snapshot di fusione, ho notato che il sistema non riusciva a risolvere il nome leggibile dell'entità cancellata. Approfondendo, ho individuato un bug nella Time Agnostic Library: le entità risultanti da una fusione non venivano trattate come correlate quando si richiedeva la ricostruzione della storia di una determinata entità. Il sistema considerava come correlate solo le entità collegate tramite predicati, ignorando quelle coinvolte in operazioni di fusione. Ho quindi integrato una nuova funzionalità per includere anche queste ultime nel tracciamento delle entità correlate e ne ho verificato il corretto funzionamento tramite test dedicati.
    * Ulteriore complicazione, il nome leggibile dell'entità fusa non era risolvibile neanche dopo averla aggiunta tra le entità correlate in quanto risultava cancellata nello snapshot di fusione. Di conseguenza ho dovuto sofisticare la logica di generazione della descrizione leggibile di uno snapshot per utilizzare il contesto della penultima versione dell'entità fusa.

### Meta

* La procedura di test era obsoleta, nel senso che usava ancora un'istanza di redis e Virtuoso locale e difficilmente portabile. C'erano anche alcuni test che fallivano. Ho aggiornato il tutto per usare Docker, script di avvio dei database e documentazione nel README.
* Script per convertire la provenance di Meta in una cartella contenente file in formato nquads, facile da importare in qualsiasi triplestore.
  * Testato.
  * Multiprocessing con 24 core, 10 ore previste

### Time Agnostic Mess

* Colli di bottiglia

  * Python: no multithreading, multiprocessing sì ma tempo di bootstrap
  * rdflib: parser e motore di query non thread safe
* Soluzioni

  * Indice delle query di update snapshot -> pickle
    * Al che uno potrebbe chiedersi perché si sono salvate le query sparql in prima istanza
  * Riscrivere tutto in Rust
  * Indice materializzazioni aggregate. Ogni tot snapshot si materializza e si salva la materializzazione nell'indice, in modo da avere dei checkpoint
    * Strategia ibrida independent copied, delta based, con gravi problemi di scalabilità in termini di storage, problemi che tra l'altro già ci sono
  * Fare parsing delle query senza usare rdflib, tanto sono sempre nello stesso formato
    * Contro: fragilità
* Benchmark

  * The Need for Better RDF Archiving Benchmarks: [https://inria.hal.science/hal-04389014v1/file/MEPDaW\_2023.pdf](https://inria.hal.science/hal-04389014v1/file/MEPDaW_2023.pdf)

  * Idea: fare benchmark sulla provenance di OpenCitations Meta
    * Pro
      * La mettiamo su triplestore
      * è un dataset reale
    * Contro
      * C'è da scrivere le query. Si potrebbe riutilizzare i ragionamenti di BEAR
      * Scarsa riproducibilità
      * Nessuna configurabilità
    * Gli dei continuano a opporsi
      * Lock nel bulk load di Virtuoso. Non sono riuscito a risolvere il problema, ma il caricamento sembra comunque veloce
      * Il waterblock del mio dissipatore ha smesso di pompare

### Altro

* Le famose guide: [https://github.com/opencitations/repository\_setup\_guides](https://github.com/opencitations/repository_setup_guides)
* Virtuoso utilities: [https://github.com/opencitations/virtuoso\_utilities](https://github.com/opencitations/virtuoso_utilities)
  * Virtuoso Docker Launcher
    * Quality of life
      * Calcolo automatico dei valori di buffer sulla base di [https://community.openlinksw.com/t/performance-tuning-virtuoso-for-rdf-queries-and-other-use/1692](https://community.openlinksw.com/t/performance-tuning-virtuoso-for-rdf-queries-and-other-use/1692)
      * Se si specifica --container-data-dir o --mount-volume le directory corrispondenti vengono automaticamente aggiunte a DirsAllowed in virtuoso.ini, così da essere leggibili da Virtuoso. Ad esempio, per fare bulk load. \\
      * Di default usa 2/3 della RAM disponibile come da impostazioni raccomandate
  * Parallel Bulk Loader
    * Di default usa nprocs/2.5 dei core come da impostazioni raccomandate

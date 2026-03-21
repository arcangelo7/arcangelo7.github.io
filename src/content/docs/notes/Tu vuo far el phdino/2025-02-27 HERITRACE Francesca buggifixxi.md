---
title: 2025-02-27 HERITRACE Francesca buggifixxi
editUrl: false
---

## La Novitade

### API

* L’environment di test delle API è da rivedere completamente.
  * C’è ancora Blazegraph
  * Non c’è più un’automazione CI/CD
  * Non c’è documentazione su come eseguire i test
  * C’è incoerenza tra ciò che si trova nel branch di test e quello di produzione per quanto riguarda i test
  * Test su una versione di ramose datata
    * Ramose non è compatibile con Python 3.5 e non viene testato su Python 3.5. Viene dichiarato compatibile con Python 3.7+
  * Difficoltà nell’installare i pacchetti su env Python 3.5
* Soluzioni
  * Usare Docker per generare al volo un db Virtuoso caricando al volo i dati di test
  * Aggiornato il README con le informazioni su come eseguire i test
  * Non si può usare Poetry perché richiede Python>3.8 e le API girano su produzione che ha Python 3.5
  * Niente, aspetto che avvenga il passaggio a Python 3.11

### HERITRACE

* Aggiornato il README
  * io stesso non mi ricordavo come far partire HERITRACE. Ora c’è una guida
  * Aggiornate le descrizioni delle configurazioni

* In precedenza, nella visualizzazione degli articoli, issue, volume e journal erano mostrati come campi separati grazie alla possibilità di definire più regole di visualizzazione per una stessa proprietà. Tuttavia, questo approccio entrava in conflitto con la definizione di *frbr:partOf* nello Shacl, che utilizza sh:or seguito da una lista di opzioni per specificare le shape oggetto.

  Avere tre campi distinti per issue, volume e journal nella visualizzazione, ma un unico campo con una *select option* per la loro selezione, risultava incoerente e generava bug, non per un problema dell’applicazione, ma della configurazione.

  Per rendere il sistema più omogeneo, chiaro e manutenibile, ho unificato la visualizzazione di *frbr:partOf* in un unico campo che, tramite una query SPARQL, restituisce tutte le informazioni su issue, volume e journal in una stringa. Ora è presente un solo campo che rappresenta esclusivamente l’entità direttamente collegata, evitando la gestione atipica precedente, che aveva causato la scomparsa del pulsante "Add container" per gli articoli.

* Per coerenza, anche per le *issue* non deve esserci un campo *volume*, ma un campo *container* che riporti l’informazione sul *volume* (se presente) o direttamente sul *journal* (se il volume non è presente). Questo perché il sistema prevede entrambe le possibilità.

  Per il *volume*, invece, il problema non si pone: se è contenuto in un *journal*, il legame è sempre univoco.

* Gestione separata per cancellazione di orfani e entità proxy

  ```python
    # Default
    ORPHAN_HANDLING_STRATEGY = OrphanHandlingStrategy.ASK
    PROXY_HANDLING_STRATEGY = ProxyHandlingStrategy.DELETE
  ```

* Risolto un bug per cui, in presenza di shape selezionabile tramite select option, il valore di quella shape veniva aggiunto due volte al database.

* In caso di modifica di un’entità, la cardinalità non veniva validata nel frontend, ora sì.

* Inoltre, il backend validava modifiche a entità esistenti solo in caso di cancellazione o modifica di proprietà, non in caso di aggiunta. Inoltre, la validazione della cancellazione della modifica per le stringhe era buggata perché non considerava il data type.
  * Ho rivisto la validazione del back-end per quanto riguarda la modifica di entità già esistenti, sia per quanto riguarda la cancellazione di proprietà, che l'aggiunta, che la modifica, e anche i feedback dati al front-end.
  * Il backend adesso valida ogni nuova tripla che viene aggiunta o rimossa al database, rispetto a ciò che è definito nel data model.

    Quindi, anche in caso di creazione di entità annidate, ogni nuova tripla viene validata.

* Aggiunti ISBN, abstract, keywords e collaborator a fabio:Proceedings e fabio:Series (miscellany)
  * Quindi ora fabio:Proceedings e fabio:Series (Miscellany) hanno ISSN, DOI, OpenAlex, JID e ISBN. Non ha senso e va bene così.

* Risolto un bug per cui il controllo sugli orfani veniva fatto anche per i valori letterali.

* Ora il controllo sugli orfani viene fatto solo in caso di cancellazione di una proprietà o dell'intera entità. Non ha senso farlo in nessun altro caso. E per la cancellazione di una proprietà solo se l'oggetto è un'altra entità. La verifica viene fatta direttamente nel front-end per migliorare le prestazioni.

### DSH

* Revisione completata from my side

## Domande

* Ripercorrere insieme form DSH
  * Does your article contain previously published illustrations for which copyright is held by another publisher
    * Immagine Graffoo
    * High level overview of PROV records. Sostituita con immagine Grafoo
  * Confirm whether your paper contains supplementary data to go online only?
    * Abbreviazioni su Zenodo
  * Quando mi si chiede di allegare una tabella come dovrei fare? E i listaggi?

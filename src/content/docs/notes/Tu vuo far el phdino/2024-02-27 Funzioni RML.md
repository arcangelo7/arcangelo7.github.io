---
title: 2024-02-27 Funzioni RML
editUrl: false
---

## Novità

RML

* Anastasia mi ha chiesto di fornire dei mapping a Tijs, il ragazzo che si sta occupando dell’inversione con CSV
* Enormi difficoltà a creare mapping per le nostre tabelle CSV, data la necessità di numerose regole di manipolazione delle stringhe
* In RML si possono usare funzioni, ma quelle già esistenti sono limitate. Quella per le espressioni regolari, ad esempio, matcha l’intero campo o nulla (l’ho scoperto guardando nel codice Java, non è esplicito altrove)
* Definire funzioni personalizzate è un inferno
  * Bisogna definirle usando un ontologia chiamata la Function Ontology: [https://fno.io/](https://fno.io/)
  * Bisogna scrivere la funzione in Java
  * Bisogna generare il jar
  * Bisogna specifica la definizione della funzione in turtle, che rimanda all’implementazione, dinamicamente al lancio dello script che genera l’RDF a partire dal mapping
* Sono riuscito a modificare la funzione delle espressioni regolari per fare anche match parziali
* Ho provato ad aggiungere un nuovo parametro per fare match e sostituzione, ma ha smesso di funzionare: `be.ugent.idlab.knows.functions.agent.functionIntantiation.exception.MethodNotFoundException: No suitable method 'precise_match' with matching parameter types found in class 'CustomFunctions'.`
* Per venirne a capo ho dovuto fare debugging direttamente sul codice in Java. In questo modo mi sono accorto che avevo definito l’output come array anziché come stringa.
* Per gestire i log nella classe personalizzata ho dovuto creare un progetto java
  * `mvn archetype:generate`
  * Aggiungere org.slf4j alle dipendenze
* Risultato: [https://github.com/arcangelo7/rml-mapping/tree/main](https://github.com/arcangelo7/rml-mapping/tree/main)

**Expert Committee Meeting**

* Silvio:
  * Useremo questo contributo per migliorare la qualità di OpenCitations
* Anastasia:
  * Usi shacl per la validazione? Ni
    * Ci sono lavori per migliorare l’efficienza di shacl, validando solo il sottografo più rilevante
  * C’è un modo per derivare parte dello shacl direttamente dall’RML
  * Usi CSVW? No perché è fatto per input ideali
* Philippa Sheil:
  * Hai coinvolto practitioners?
    * Not yet, ma sarà fondamentale per valutare la qualità del lavoro e la sua effettiva usabilità
    * Silvio: lavoriamo in un dipartimento di filologia. Mancanza di metadati per risorse di natura umanistica. Questo sistema pootrebbe essere usato per permetrere a umanisti di caricare la bibliografia dei loro lavori in questo grande grafo.

## Domande

* Maggiorazione borsa

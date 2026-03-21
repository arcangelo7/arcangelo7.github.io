---
title: 2023-02-14 rdflib-ocdm merge
editUrl: false
---

## Novità

* Lo script per fondere identificatori uguali era troppo lento. Ora lavora in maniera ibrida in multi-process e single-process.
  * In multi-process trova tutti gli identificatori da fondere e in single process li fonde facendo attenzione a scartare quelli già cancellati.
  * I file già processati e gli identificatori cancellati vengono salvati in un file di cache, così da essere ignorati in esecuzioni successive.
* rdflib-ocdm
  * preexisting finished genera lo snapshot di creazione se non ci sono snapshot per una certa entità
    * Perché ciò avvenga il grafo si deve occupare della provenance, dato che preexisting finished è un metodo del grafo. Questo mi ha dato lo spunto per spostare la gestione della provenance direttamente sul grafo.
      * Nel momento dell’inizializzazione, il grafo inizializza l’oggetto che gestisce la provenance. Dopodiché, i metodi pubblici del ProvSet possono essere chiamati direttamente sul grafo. Ad esempio: grafo.generate\_provenance()
  * Ho aggiunto la funzione di merge e i relativi meccanismi di provenance
  * Ho aggiunto il metodo commit\_changes che resetta l’OCDMGraph
  * preexisting finished accetta come parametri la fonte primaria e l’agente responsabile. Sono entrambi parametri opzionali.
  * Il counter handler viene specificato direttamente con l’istanza della classe che si vuole usare, per retrocompatibilità con oc\_ocdm.
  * Ho testato quando detto

## Domande

* In oc\_ocdm mi pare che lo snapshot dell’entità sopravvissuta al merge derivi dall’ultimo snpashot in cui l’entità fusa esisteva e non dallo snapshot di cancellazione, è così?

---
title: 2023-01-11 ExportKB dà problemi
editUrl: false
---

## Novità

* Software che salva i dati di Meta in JSON-LD rispettando la struttura di cartelle e sottocartelle a partire da un dump in JSON-LD di Blazegraph
  * Blazegraph salva tutto in un unico file
  * ison per processare le entità in streaming
  * Batch di 10000 entità
  * I batch vengono assegnati a processi paralleli
  * Lock sui file
  * Prima di essere processate, le entità vengono raggruppate per file, in modo che, per ogni batch, il file venga aperto una volta sola

* Il metodo integrato in Blazegraph per scaricare il triplestore in formato testuale non scala bene con triplestore di grandi dimensioni, perché prova a mettere tutto il triplestore in memoria prima di scaricarlo, dopodiché lo scarica su un unico file

  * Di conseguenza, ho implementato uno script che usa un OFFSET per scaricare in maniera incrementale tutte le entità del triplestore, in maniera similare a come ho fatto per visualizzare tutte le entità nell’interfaccia che sto facendo per il dottorato

    <aside>
    ⚠️ OFFSET diventa molto lento mano a mano che l’OFFSET aumenta e non è una soluzione praticabile per le dimensioni di Meta

    </aside>

* Provenance
  * Ho creato il Redis OMID-SOURCE a partire dal dump di Crossref di dicembre, Datacite, PubMed, OpenAIRE

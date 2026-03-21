---
title: 2023-04-17 SPARQLWrapper timeout
editUrl: false
---

## Novità

**oc-meta**

* Ho esteso il correttore automatico dell’ordine degli agenti perché gestisca un nuovo errore: se due ar con lo stesso ruolo fanno riferimento allo stesso ra, allora devono essere fusi. Non ho idea di cos abbia causato questo errore, ma era presente in Meta e causava problemi nell’ingestione di nuovi dati
* Ho aggiunto a meta i citati di DataCite e Crossref non in DataCite né in Crossref. Sono presenti solo gli OMID associati all’id.
* Persiste il problema degli id duplicati per br e ra. Non riesco a riprodurlo, ma direi che è sicuramente dovuto a una race condition

**time-agnostic-library**

* Ho aggiunto a rdflib-ocdm dei sistemi per recuperare le entità da un triplestore e per caricarle sul triplestore
* Sto scrivendo il software per generare un triplestore di provenance conforme all’OCDM a partire dai delta forniti da BEAR

DH Graz

* Ho modificato l’abstract per dare maggior rilievo alle implicazioni dei modelli di provenance su dati umanistici rimanendo nel numero massimo di parole
* Ho inviato la domanda per la borsa

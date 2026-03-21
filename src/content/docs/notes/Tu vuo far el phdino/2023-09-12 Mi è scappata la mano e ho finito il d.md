---
title: 2023-09-12 Mi è scappata la mano e ho finito il d
editUrl: false
---

## Novità

**PhD**

* Proseguendo nella modifica di CLEF, mi sono reso conto che lavorare a partire da quel software non è un modo rapido di procedere. Questo perché, per quanto esso sia una buona base di partenza, gli aspetti da modificare sono di egual numero rispetto a quelli da estendere. Per fare un esempio, tutta la gestione di tracciamento dei cambiamenti va modificata. Pertanto, ho deciso di procedere nel verso opposto, ovvero scrivendo software da zero e copiando via via le parti riutilizzabili da CLEF.
* Ho creato un subset di Meta con 1000 articoli e tutte le entità collegate per i test.
* Paginazione con OFFSET e LIMIT
* URI human readable usando prefix.cc, fondamentale per capire quando rendere gli oggetti human readable e quando no
* Proprietà divise per attributi e collegamenti ad altre entità.
* Internazionalizzazione basata su Flask Babel
* Modifica e cancella con rdflib-ocdm
* SPARQL endpoint (devo personalizzare la tabella dei risultati)

### Domande

* Esiste un modo generico per puntare alla definizione di una proprietà
* Snapshot viene generato alla prima modifica - timedelta(minutes=10) per comodità di rappresentazione sulla linea del tempo

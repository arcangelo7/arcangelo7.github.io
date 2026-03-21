---
title: 2023-06-22 Miracolo parte n
editUrl: false
---

## Novità

* **Meta**
  * Il generatore di CSV cancella un’entità dal dump in JSON nel caso in cui questa non esista sul triplestore. Devo aver inavvertitamente interrotto il processo di Meta dopo l’aggiornamento del dump e prima del caricamento sul triplestore.
  * Implementato il multiprocessing per OROCI
    * Sqlite.Curson non è pickable → Redis
    * Processi totalmente indipendenti tra di loro. Ciascuno ha il suo dizionario doi-orcid
    * Ogni processo crea il suo collegamento a redis
  * Ho aggiornato Meta e oc\_ocdm e OCDM con i nuovi tipi
* Articolo **SWJ**
  * C'è un problema legato al consumo di memoria:
    * chunk più piccolo per il salvataggio su file e salvare
    * triple aggiunte e rimosse come liste di stringhe e non grafi
      * Queste informazioni vengono salvate su Redis (provare con un altro db)
  * Migliorata l’efficienza: un unica query a Redis per trovare tutte le entità che già hanno snapshot e un’unica query alla fine per aggiornare i contatori

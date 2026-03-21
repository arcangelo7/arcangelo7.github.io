---
title: 2023-06-27 OROCI fatto
editUrl: false
---

**Meta**

* Software che scarta le risorse in cui tutti gli id sono già presenti su Redis
  * OROCI: 5,879,707 entità nuove
    * Rimosse righe perfettamente identiche: 2,097,967
    * Rimosse righe identiche tenendo in considerazione id, autori ed editor in ordine diverso: 1,959,360
  * OROCI è in Meta
* Aggiunto create\_arxiv a oc\_ocdm e a Meta
* Software per generare l’input di Meta a partire dai dati forniti dal gruppo di OpenScience di Olga, Marta, Lorenzo e Sara.
  * Righe totali: 67,241,628
  * Righe senza duplicati: 15,148,903
  * Ho usato Redis per scartare tutti gli id già presenti in Meta e ho rimosso i duplicati
    * Righe risultanti: 58,268
  * Gli id mancanti sono in Meta
* Ivan mi ha fornito un file con 1,190,770 id diversi mancanti in Meta
  * Usando Redis, risulta che quelli effettivamente mancanti sono
* Ho mandato l’articolo a QSS

**BEAR**

* Le modifiche vengono salvate e recuperate da un db PostgreSQL

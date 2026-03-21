---
title: 2023-02-07 rdflib-ocdm genera gli snapshot
editUrl: false
---

## Novità

rdflib-ocdm

* Ho riscritto e semplificato `abstract_entity.py`, `prov_entity.py` e `snapshot_entity.py`
* Ho testato la creazione degli snapshot
* Ho introdotto dei nuovi sistemi di gestione dei contatori, tutti testati
  * Uno in memoria, semplificato, dato che serve solo per la provenance e non per le entità
  * Uno su file, ovvero un JSON `nome_entità: count`
  * Nuova classe `SqliteCounterHandler`, che gestisce i contatori su database sqlite3
* Ho creato uno script che cicla su br e ra e, laddove incontra entità con due identificatori uguali, fonde gli identificatori.
  * Questa operazione avviene in single-process.
  * Viene conservato l’identificatore con il valor sequenziale più basso
  * Funziona anche se gli identificatori uguali sono più di due
  * Gli identificatori cancellati vengono salvati in un file txt. Se vengono incontrati di nuovo, vengono semplicemente eliminati, senza merge.
* L’editor per Meta è ora in grado anche di eliminare delle triple specifiche e non solo delle proprietà.

## Domande

* rdflib-ocdm
  * In quale fase l’utente specifica fonte e agente responsabile?
  * Se l’utente indica che è finita la creazione del grafo preesistente, e modifica il grafo in assenza di provenance preesistente, le modifiche vengono trattate come snapshot di creazione secondo la logica di oc-ocdm. Sei d’accordo?
  * Alla fine della generazione della provenance il grafo preesistente va aggiornato, sei d’accordo?

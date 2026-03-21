---
title: 2024-11-28 ASK KEEP DELETE
editUrl: false
---

## La Novitade

### Meta

* Non c’era alcun meccanismo di retry per la query che trova le entità correlate nella funzione di merge! Ecco perché le query fallivano.

### HERITRACE

* Referenced by → Linked Resources
* Time Vault

  * Snapshot di cancellazione
    * Distinzione tra snapshot che non esiste e snapshot di cancellazione
    * Il contesto a partire dal quale vengono ricostruiti i nomi leggibili degli URI è la versione precedenze quella di cancellazione (pagina di versione, storia dell’entità, about, time vault)

    <aside>
    ⚠️

  Mostrare la versione leggibile degli URI significa ricostruire al volo lo stato precedente di cancellazione di ciascuna entità cancellata, operazione che potrebbe essere onerosa in caso di numerose entità cancellate. Per questo, l’api che se ne occupa lavora in multi-threading

    </aside>

  * Ripristinare un’entità cancellata ha una complessità aggiuntiva, perché le entità correlate vanno ricercate nell’ultimo snapshot valido.
* Timeline rifatta con React
  * Se cambiano i dati si aggiorna
* Non mi piacciono gli URI delle entità encodati nell’URL
* Gestione delle entità orfane
  * Definizione
    * Un'entità diventa orfana quando non ha più collegamenti con altre entità nel database
    * Per essere considerata orfana, un'entità deve soddisfare due condizioni:
      1. Non deve essere referenziata da nessun'altra entità
      2. Non deve avere collegamenti verso entità che sono soggetti di altre triple
  * Strategia di gestione
    * Implementate tre diverse strategie configurabili

      1. DELETE
         * Cancellazione automatica delle entità orfane
         * Non richiede interazione con l'utente
         * Gli orfani vengono identificati e rimossi durante l'applicazione delle modifiche
      2. KEEP
         * Mantiene le entità orfane nel sistema
         * Non effettua controlli sugli orfani
         * Le entità rimangono accessibili attraverso ricerche dirette
      3. ASK
         * Richiede conferma all'utente prima della cancellazione
         * Mostra un elenco delle entità che diventeranno orfane
         * Permette all'utente di decidere se cancellare o mantenere gli orfani

      ```python
      class OrphanHandlingStrategy(Enum):
          DELETE = "delete"  # Automatically delete orphaned entities
          ASK = "ask"       # Ask the user before deleting orphaned entities
          KEEP = "keep"     # Keep orphaned entities (do nothing)

      class Config(object):
          APP_TITLE = 'ParaText'
          APP_SUBTITLE = 'Bibliographical database'
          
          [...]
          
          ORPHAN_HANDLING_STRATEGY = OrphanHandlingStrategy.ASK
      ```

## Definizione di Entità Orfana

* Un'entità diventa orfana quando non ha più collegamenti con altre entità nel database
* Per essere considerata orfana, un'entità deve soddisfare due condizioni:
  1. Non deve essere referenziata da nessun'altra entità
  2. Non deve avere collegamenti verso entità che sono soggetti di altre triple

### time-agnostic-library

* Riscritta la classe che fa query su file e triplestore per ritornare risultati come li ritornerebbe SPARQLWrapper, quindi con binding, nomi variabili, datatype, lingua. In questo modo le altre classi che usano quella classe non si affidano più alla posizione dei binding nei risultati, ma direttamente ai binding sulle variabili.
* Avevo intenzione di realizzare un sistema di batch processing ma mi sono reso conto che ciò non è possibile perché la lista delle entità correlate deve essere ottenuta progressivamente sia dal dataset presente che dalle informazioni del passato e quindi non è possibile raccogliere tutte le entità correlate in un colpo solo in maniera tale da fare un'unica query sui dati e sulla provenance.
* Mi sono accorto che stavo continuando a fare test su Blazegraph anziché su Virtuoso. Migrare a Virtuoso ha ovviamente comportato problemi.

## Domande

* Lo snapshot di rigenerazione rende irriconoscibile quello di cancellazione, poiché uno snapshot è di cancellazione se è l’ultimo e se ha un tempo di invalidazione. Che famo?
* Conoscete pyoxigraph?

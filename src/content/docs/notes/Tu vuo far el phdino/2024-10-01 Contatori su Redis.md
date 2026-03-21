---
title: 2024-10-01 Contatori su Redis
editUrl: false
---

## La Novitade

### Meta

* Bug nella provenance dopo i merge dovuto a un bug nei contatori. Si riparte dall’ultima versione prima del merge
  * RedisCounterHandler in oc\_ocdm
    * Possibili aggiornamenti in batch
  * possibilità di specificare counter handler via classe a GraphSet e ProvSet
  * Meta usa Redis per i contatori
    * Più facili da mantenere perchè più facili da controllare
    * Nessun problema di concorrenza da gestire
  * Aggiornato il software che genera i contatori a partire da dati e provenance per usare redis
    * Aggiorna in batch
  * Aggiornato l’editor di Meta per usare Redis
  * Aggiornati test automatici su github per tirare su un redis con docker
  * Ora anche la provenance è ok. Sia lode a Elia.

### HERITRACE

* Migliore leggibilità modifiche nella linea del tempo
* about
  * Modifica date uniformata a creazione date
    * In caso di cancellazione, viene visualizzata solo la data senza il selettore con striked e color grey
  * Aggiornamento ordine: cancello tutto e ricreo l’ordine da zero. Tanto alla fine viene comunque calcolato il delta
  * Aggiunta proprietà
    * Un solo pulsante di modifica. UPDATE e CREATE visivamente unificati
    * Riutilizzo funzionalità per creare una nuova entità

## Domande

* L’ ordine non è una proprietà della br, ma dell’ ar. Quindi in teoria non modifica la timeline della br. Tuttavia, dato che l’ ordine viene modificato dalla br, l’ utente probabilmente si aspetta di poter vedere quel cambiamento nella timeline e di poterlo riavvolgere nel caso

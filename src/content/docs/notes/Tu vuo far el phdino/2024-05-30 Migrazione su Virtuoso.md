---
title: 2024-05-30 Migrazione su Virtuoso
editUrl: false
---

**Meta**

* [https://github.com/ad-freiburg/qlever-control/issues/35](https://github.com/ad-freiburg/qlever-control/issues/35)
  * [docker.io/adfreiburg/qlever:latest](http://docker.io/adfreiburg/qlever:latest) Non garantisce di usare l’ultima versione! Non viene fatto un pull automatico. Stavo inconsapevolmente usando la versione di ottobre 2023
  * Fondamentale specificare il digest o il commit dell’immage docker, il tag latest non basta

* [https://github.com/ad-freiburg/qlever-control/issues/36](https://github.com/ad-freiburg/qlever-control/issues/36)

* [https://github.com/ad-freiburg/qlever-control/issues/37](https://github.com/ad-freiburg/qlever-control/issues/37)

* Ottimizzazione Virtuoso per dataset di grandi dimensioni e server potenti

  ```markdown
  ;; Per 500 GB di RAM
  ;; Also, if running with a large database, setting MaxCheckpointRemap to 1/4th of the database size is recommended. This is in pages, 8K per page.
  MaxCheckpointRemap = 20000000
  ;; NumberOfBuffers = (Free Memory * 0.66)/8000. MaxDirtyBuffers (3/4 of NumberOfBuffers)
  NumberOfBuffers          = 44000000
  MaxDirtyBuffers          = 33000000
  MaxClientConnections     = 200
  O_DIRECT = 1
  RdfFreeTextRulesSize     = 100000
  IndexTreeMaps            = 256
  MaxQueryMem              = 16G
  ```

* Script per bulk load in multiprocessing con Virtuoso

  ```bash
  #!/bin/bash

  # Configurazione variabili
  CONTAINER_NAME="oc_meta"                # Nome del container Docker
  DBA_USER="..."                          # Nome utente DBA
  DBA_PASSWORD="..."         # Password DBA
  LOG_FILE="bulk_load.log"                # File di log nel volume montato
  CORES=$(nproc)                          # Numero di core della macchina
  LOADERS=$((CORES / 2))                  # Numero di loaders (massimo core / 2)

  # Funzione per lanciare il loader
  launch_loader() {
      docker exec -i $CONTAINER_NAME isql 1111 $DBA_USER $DBA_PASSWORD exec="rdf_loader_run(log_enable=>2);" >> $LOG_FILE 2>&1 &
  }

  # Inizializzazione del log
  echo "Inizio caricamento bulk RDF: $(date)" > $LOG_FILE

  # Avvio multipli loader
  for ((i=1; i<=LOADERS; i++))
  do
      echo "Lancio loader $i: $(date)" >> $LOG_FILE
      launch_loader
  done

  # Attesa del completamento dei loaders
  wait

  # Esecuzione del checkpoint finale
  echo "Esecuzione checkpoint: $(date)" >> $LOG_FILE
  docker exec -i $CONTAINER_NAME isql 1111 $DBA_USER $DBA_PASSWORD exec="checkpoint;" >> $LOG_FILE 2>&1

  # Ripristino delle impostazioni di checkpoint e scheduler
  docker exec -i $CONTAINER_NAME isql 1111 $DBA_USER $DBA_PASSWORD exec="checkpoint_interval(N);" >> $LOG_FILE 2>&1
  docker exec -i $CONTAINER_NAME isql 1111 $DBA_USER $DBA_PASSWORD exec="scheduler_interval(M);" >> $LOG_FILE 2>&1

  echo "Caricamento bulk RDF completato: $(date)" >> $LOG_FILE
  ```

* Virtuoso
  * Conteggi
    * AR:
      * Blazegraph: 1,577,469,289
      * Virtuoso:1,577,470,930
    * BR:
      * Blazegraph: 1,246,866,834
      * Virtuoso: 1,247,454,694
    * RA:
      * Blazegraph: 903,227,547
      * Virtuoso: 903,228,697
    * ID:
      * Blazegraph: 628,852,233
      * Virtuoso: 628,857,264
    * RE:
      * Blazegraph: 212,260,046
      * Virtuoso: 212,260,046
  * Osservazioni:
    * Ci sono delle triple di default nel triplestore che non sono riuscito a cancellare per problemi di permessi
    * Virtuoso è decisamente più lento di Blazegraph nel contare le triple
    * La differenza di triple si spiega perchè nei dati ci sono più triple che nel triplestore Blazegraph. E qualcosa di cui mi ero già accorto a proposito dei soggetti referenziati senza triple. Quei riferimenti sono presenti solo nei dati e non nel triplestore per ragioni sconosciute

* Qlever
  * Numero di triple
    * Blazegraph: 4,568,675,949
    * Qlever: 4,569,275,768

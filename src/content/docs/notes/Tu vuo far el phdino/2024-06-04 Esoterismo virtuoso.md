---
title: 2024-06-04 Esoterismo virtuoso
editUrl: false
---

## La Novitade

**Meta**

* Virtuoso: 2484 triple non richieste
* Test con Virtuoso automatizzati su GitHub. Magia del Natale

```bash
#!/bin/bash

# Configurazione variabili
DBA_USER="dba"                          # Nome utente DBA
DBA_PASSWORD="dba"                      # Password DBA
LOG_FILE="bulk_load.log"                # File di log nel volume montato
CORES=$(nproc)                          # Numero di core della macchina
LOADERS=$((CORES / 4))                  # Numero di loaders (massimo core / 2)
ISQL_PATH="/vltd/triplestore/meta/meta_virtuoso/virtuoso-opensource/bin/isql"      # Path al binario isql di Virtuoso (modifica se necessario)

# Variabili per il caricamento dei dati
DATA_DIR="/vltd/triplestore/meta/meta_virtuoso/virtuoso_input"             # Directory dei dati
FILE_PATTERN="*.nq"                     # Pattern dei file
GRAPH_URI="https://w3id.org/oc/meta/"         # URI del grafo

# Funzione per lanciare il loader
launch_loader() {
    $ISQL_PATH 127.0.0.1:1111 $DBA_USER $DBA_PASSWORD exec="rdf_loader_run(log_enable=>2);" >> $LOG_FILE 2>&1 &
}

# Inizializzazione del log
echo "Inizio caricamento bulk RDF: $(date)" > $LOG_FILE

# Disabilitare l'indicizzazione
echo "Disabilitazione dell'indicizzazione: $(date)" >> $LOG_FILE
$ISQL_PATH 127.0.0.1:1111 $DBA_USER $DBA_PASSWORD exec="DB.DBA.VT_BATCH_UPDATE ('DB.DBA.RDF_OBJ', 'ON', NULL);" >> $LOG_FILE 2>&1

# Cancellare la lista
echo "Cancellazione della lista: $(date)" >> $LOG_FILE
$ISQL_PATH 127.0.0.1:1111 $DBA_USER $DBA_PASSWORD exec="delete from DB.DBA.load_list;" >> $LOG_FILE 2>&1

# Caricare i dati
echo "Caricamento dei dati: $(date)" >> $LOG_FILE
$ISQL_PATH 127.0.0.1:1111 $DBA_USER $DBA_PASSWORD exec="ld_dir('$DATA_DIR', '$FILE_PATTERN', '$GRAPH_URI');" >> $LOG_FILE 2>&1
$ISQL_PATH 127.0.0.1:1111 $DBA_USER $DBA_PASSWORD exec="set isolation='uncommitted';" >> $LOG_FILE 2>&1

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
$ISQL_PATH 127.0.0.1:1111 $DBA_USER $DBA_PASSWORD exec="checkpoint;" >> $LOG_FILE 2>&1
$ISQL_PATH 127.0.0.1:1111 $DBA_USER $DBA_PASSWORD exec="commit WORK;" >> $LOG_FILE 2>&1
$ISQL_PATH 127.0.0.1:1111 $DBA_USER $DBA_PASSWORD exec="checkpoint;" >> $LOG_FILE 2>&1

# Riabilitare l'indicizzazione
echo "Riabilitazione dell'indicizzazione: $(date)" >> $LOG_FILE
$ISQL_PATH 127.0.0.1:1111 $DBA_USER $DBA_PASSWORD exec="DB.DBA.RDF_OBJ_FT_RULE_ADD (null, null, 'All');" >> $LOG_FILE 2>&1
$ISQL_PATH 127.0.0.1:1111 $DBA_USER $DBA_PASSWORD exec="DB.DBA.VT_INC_INDEX_DB_DBA_RDF_OBJ ();" >> $LOG_FILE 2>&1

# Ripristino delle impostazioni di checkpoint e scheduler
$ISQL_PATH 127.0.0.1:1111 $DBA_USER $DBA_PASSWORD exec="checkpoint_interval(N);" >> $LOG_FILE 2>&1
$ISQL_PATH 127.0.0.1:1111 $DBA_USER $DBA_PASSWORD exec="scheduler_interval(M);" >> $LOG_FILE 2>&1

echo "Caricamento bulk RDF completato: $(date)" >> $LOG_FILE
```

* Problemi col parallelismo. Virtuoso si blocca. Aggiunti 3 tentativi per l’upload a oc\_ocdm

---
title: 2025-06-10 Merge CSV dumps light
editUrl: false
---

# La Novitade

## Meta

* C'era un piccolino nonché insignificante dettaglino che avevo omesso di precisare quando ho detto che bisogna scaricare tutto il dump di Meta per costruire i CSV a partire dall'RDF e cioè che non basta scaricare tutto il dump, bisogna anche convertirlo nel formato di Meta, perché altrimenti non c'è modo di trovare le informazioni che non sarebbero indicizzate. Questo pone ulteriori preoccupazioni in termini di performance.
* Pertanto ho ritenuto ugualmente opportuno sviluppare un nuovo software che permetta di allineare i CSV esistenti al database e anche di aggiungere eventuali CSV nuovi. Ovviamente l'ho testato.
  ```bash
  poetry run python3 -m oc_meta.run.merge_csv_dumps --help

  usage: merge_csv_dumps.py [-h] [--batch-size BATCH_SIZE] [--max-workers MAX_WORKERS]
                            existing_dir new_dir output_dir sparql_endpoint

  Merge CSV metadata dumps with SPARQL verification

  positional arguments:
    existing_dir          Directory containing existing CSV files
    new_dir               Directory containing new CSV files
    output_dir            Directory to save merged CSV files
    sparql_endpoint       SPARQL endpoint URL

  options:
    -h, --help            show this help message and exit
    --batch-size BATCH_SIZE
                          Batch size for SPARQL queries
    --max-workers MAX_WORKERS
                          Maximum number of worker processes
  ```
  * Per risparmiare RAM, tutte le operazioni dall'inizio alla fine vengono eseguite in parallelo sul singolo file: quindi il caricamento del file esistente, la verifica dei dati presenti sul triplestore, l'esclusione degli OMID già processati, la scrittura sul nuovo file di output. Tutto questo avviene in un unico processo in parallelo, ovvero non vengono letti inizialmente tutti i file CSV perché questo consumerebbe troppa RAM.
  * Questo script ha involontariamente risolto due problemi nei file CSV che erano passati inosservati. Nella risposta alle API noi stavamo mostrando solo il numero di pagina, in caso la pagina di inizio e fine fosse uguale, e stavamo associando al contenuto anche gli editor del contenitore, nel caso il contenitore avesse degli editor. Questo non lo stavamo facendo per i CSV e adesso viene fatto.
  * In caso anche una sola query fallisca il file viene saltato. C'è una cache che permette di saltare i file già processati alla seconda esecuzione.
    > Virtuoso crasha spesso a causa di query parallele. Mettere il numero di thread per query a 1 e impostare un numero massimo di thread superiore a quelli disponibili sulla macchina migliora la situazione, ma non la risolve. In generale, Virtuoso gestisce malissimo il parallelismo.
* Versione light dello script per forndere csv vecchi e nuovi senza controllo al database. Ordina gli OMID in ordine alfabetico crescente e usa nomi di file progressivi.
  * Come ordinare se la quantità di dati è superiore alla RAM? External merge sort
    1. Leggiamo tutti i file in multiprocessing e li salviamo in file temporanei con gli OMID ordinati.
    2. Apriamo in streaming tutti i file, ovvero ci salviamo solo i file descriptors, ma senza caricarli in RAM
    3. Inizializziamo la heap con la prima riga di ciascun file letta senza in streaming semplicemente sostando il cursore alla prima riga. Per la heap usiamo una struttura dati [heapq](https://docs.python.org/3/library/heapq.html), che automaticamente tiene l'elemento più basso in cima.
    4. Poi estraiamo l'OMID più piccolo, lo scriviamo nell'output, leggiamo la prossima riga dallo stesso file e mettiamo la riga successiva nell'heap. Ripetiamo finché la heap è vuota
    ```
    File_1: [omid:br/001, omid:br/005, omid:br/009, ...]  ← Leggi 1 riga
    File_2: [omid:br/002, omid:br/007, omid:br/012, ...]  ← Leggi 1 riga  
    File_3: [omid:br/003, omid:br/008, omid:br/015, ...]  ← Leggi 1 riga
    ...

    Heap: [(omid:br/001, file_1), (omid:br/002, file_2), (omid:br/003, file_3)]
          ↓
    Output: omid:br/001 (da file_1)
          ↓ 
    Leggi prossima riga da file_1: omid:br/005
    Heap: [(omid:br/002, file_2), (omid:br/003, file_3), (omid:br/005, file_1)]
    ```
  Immagina di avere 38k pile di carte (file), tutte ordinate. Vuoi creare un'unica pila ordinata:
  1\. Prendi la prima carta da ogni pila e mettile sul tavolo
  2\. Guardi quale carta ha il numero più basso
  3\. Prendi quella carta e la metti nella pila finale
  4\. Dalla stessa pila da cui hai preso la carta, prendi la prossima carta
  5\. Fino a quando tutte le pile sono vuote
* Nuovo script che calcola le statistiche nei nuovi dump usando l'endpoint, visto che Virtuoso è velocissimo a contare, non conviene più usare i CSV

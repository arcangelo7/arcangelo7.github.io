---
title: 2023-12-14 Meta rigenerato
editUrl: false
---

## Novità

* Esportare i dati da Balzegraph dividendo il lavoro per classi tramite query sparql con limit e offset richiede comunque un tempo proibitivo.
  * Ho modificato direttamente la classe ExportKB di Blazegraph, aggiungendo un buffer di 1,000,000 di triple al salvataggio su file. Il salvataggio avviene su file compressi diversi
  * Per compilare con successo i vari script java nel file jar utilizzando Maven ho dovuto utilizzare Java 8. Il processo non è andato a buon fine usando versioni successivo di Java o versioni successiva alla 3.6.0 di Maven
    * Ora, questa è una scoperta molto inquietante, perché io non mi sono mai preoccupato della versione di java da utilizzare
  * In questo modo è possibile esportare Meta in json-ld in circa 10 ore
  * Il tempo necessario per smistare le entità nelle varie cartelle e sottocartelle è invece di circa 4 ore
  * La modifica è su un fork di Blazegraph: [https://github.com/arcangelo7/blazegraph](https://github.com/arcangelo7/blazegraph)
* Ho misurato il numero di triple
  * Nel triplestore: 4,257,819,647
  * Nei dati scaricati dal triplestore: 4,257,819,647
  * Nei dati riorganizzati nel formato di Meta: 3,261,919,872
* Test su un triplestore con 100,000 triple
  * Nel triplestore: 100,000
  * Nei dati scaricati dal triplestore: 100,100
  * Nei dati riorganizzati nel formato di Meta: 94,631
    * In single process: 89,889
    * Aprendo l’intero file anziché usare ijson: 89,889
    * Eliminando il batch: 100,000
  * Il bug era dovuto alla cattiva gestione di grafi multipli nello stesso file, che causava sovrapposizioni e perdita di triple.
  * C’era un altro bug dovuto al fatto che, in caso di file zippati, l’esistenza del file veniva verificata con l’estensione json anziché zip
  * Ora: 4,257,815,286 (4,361 triple in meno del triplestore)
* Ho realizzato uno script che genera gli info\_dir a partire dai file RDF. L’esecuzione dura meno di un secondo per quanto riguarda i dati, e 15 minuti per la provenance. Mentre per i dati basta vedere qual è l’entità col valore più alto nella cartella col valore più alto, per la provenance bisogna esplorare tutti i file. Questo avviene in multiprocessing.
  * Ho esteso il FileSystemCounterHandler di oc\_ocdm con
    * set\_counters
    * set\_numbers
    * Sono come set\_counter e set\_number ma permettono di salvare più informazioni contemporaneamente su un file. Utile per salvare in un colpo solo tutta la provenance relativa a una certa entità per un certo supplier\_prefix.

**Entità che non vengono fuse**

* Test con la versione attuale del triplestore
  * 1 documento contenente Peroni, Silvio \[orcid:0000-0003-0530-4305] → Viene correttamente deduplicato
  * 3 documenti con 1000 righe ciascuno e contenenti ciascuno 1 occorrenza di Peroni, Silvio \[orcid:0000-0003-0530-4305]
    * Preparazione al multiprocessing, con preprocessamento di persone presenti in file diversi → Viene correttamento deduplicato
    * Esecuzione di Meta a seguito della preparazione al multiprocessing in multiprocessing → Viene correttamento deduplicato
  * L’unica ipotesi che mi viene in mente è che, per qualche svista di cui non ho nessuna memoria, io abbia lanciato Meta direttamente senza fare la preparazione al multiprocessing
* Script che trova tutte le entità con lo stesso id da fondere e le salva in un CSV
* Script che fonde le entità presenti in quel CSV
  * Il file fa anche da cache con una colonna Done
  * Stop gentile: vado a catturare i segnali SIGINT, SIGTERM (kill). Se vengono intercettati, la cache viene aggiornata e il processo si interrompe prima di processare la coppia di entità successiva

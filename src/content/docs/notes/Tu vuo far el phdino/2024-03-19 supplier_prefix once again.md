---
title: 2024-03-19 supplier_prefix once again
editUrl: false
---

## Novità

**Meta**

* Ho reso più robusta la gestione di formati multipli in lettura in oc\_ocdm. In precedenza, in caso di errore, i file non venivano chiusi. Inoltre, vengono generati log specifici per gli errori, invece di concatenare messaggi di errore
  * Stesso discorso per lo storer
* Ho dovuto attivare l’autenticazione a due fattori su PyPI di OpenCitations per caricare la nuova versione di oc\_ocdm
* Sono riuscito a far coincidere il numero di triple nell’RDF
* Ho generalizzato quello che facevo per le date di pubblicazione a tutti i predicati: se presenti con valori diversi, il log tiene traccia di ciò, se assenti, il log tiene traccia di ciò. In entrambi i casi, l’RDF viene allineato al triplestore
* Allineamento
  * Ho scoperto che Blazegraph, nell’esportare i dati in formato jsonld, suddivide le informazioni sulle varie entità in file diversi, quindi non posso usare i dati grezzi per l’allineamento, devo prima generare le directory col modello di Meta
  * Se inizialmente ha avuto senso pensare di creare uno script che aggiusta i dati in RDF a partire dal triplestore, ora che mi sono accorto della necessità di raggruppare i dati per entità prima di procedere all’allineamento, ha più senso generare direttamente l’rdf di Meta dai dati del triplestore anziché aggiustare quello esistente. Lo script per l’allineamento viene quindi usato solo per controllare che errori esistono e la loro tipologia. In caso di errore, si procedere a generare l’rdf da zero.
  * Ho creato uno script che copia la provenance da source a dest
* Meta non gestisce bene omid in input, perché gli omid hanno prefissi diversi da quelli assegnati ai processi
  * Avevo già gestito il problema in passato per la provenance, ora ho modificato oc\_ocdm per gestire il problema in maniera generalizzata
  * Quando viene istanziato il CounterHandler, viene specificato anche il supplier\_prefix. Dopodiché, i metodi set\_counter, counter\_incrementer e read\_counter estraggono autonomamente il supplier prefix dall’URI della risorsa, lo confrontano con quello generale del counter\_handler (utile in caso di nuove entità) e, se è diverso,  lo sostituiscono nel percorso dell’info\_dir
    * Ho testato sia i dati che la provenance in questo scenario e in multiprocessing
* In oc\_ocdm, il semaforo rimane rosso per tutta l’elaborazione di un file, dalla lettura, alla modifica, alla scrittura
  * Questo rende Meta estremamente più lenta maggiore è il numero di processi
    * 88: circa 4 file in una notte
    * 8: circa 150 file in una notte
    * …
  * Ho implementato una barra di caricamento per registrare il tempo stimato in maniera precisa
  * Sto cercando il bilancio migliore

**OUTCITE**

> Hi Arcangelo,I hope you are doing well. Now is the best time for us to start delivering the OUTCITE data and attached you could find the following sample csv data files for 50 processed documents out of the corpora:
>
> * metadata.csv à gives extracted references.
> * citations.csv à gives citations information/details.
>
> Questions:
>
> * References without the ids are the non-sourced items which mean that we are unable to find web source for them. Some dummy string as an identifier could be generated if required. Otherwise, such references could also be filtered out.
> * Do you need single larger file for each (metadata and citations) or we could also divide and store data to the multiple files? Latest corpus contains > 70,000 processed documents with > 2.9 Million extracted references (sourced and non-sourced).
> * What encoding do you need for the data written to csv? Currently “utf-8” has been used.
>
> We would like to handover all of the data latest by the end of May 2024. Kindly have a look on the sample files and provide us with the feedback so that we could make it work together. Also, feel free to write back in case of any confusion. We could also arrange a meeting if needed.Looking forward to hearing from you soon. Have a nice day and weekend!
>
> Best regards,Muhammad Ahsan Shahid

[attachments/4c529c3df28e422b9f786ed0447a09b8.csv](/notes/attachments/4c529c3df28e422b9f786ed0447a09b8)

[attachments/dc11d1668e4e4a0f8720c2f6c4dfe994.csv](/notes/attachments/dc11d1668e4e4a0f8720c2f6c4dfe994)

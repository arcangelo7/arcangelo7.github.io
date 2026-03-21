---
title: 2023-11-22 Risolto il bug dei bug in Meta
editUrl: false
---

## Novità

Meta

* Ho individuato e risolto la fonte di tutti i problemi di concorrenza nei dump RDF.
  * L’errore era in Meta. Infatti, lanciando un’operazione in multiprocessing nei test di oc\_ocdm non sono riuscito a riprodurlo.
  * Oggetto condiviso tra tutti i processi che cambia una proprietà relativa al supplier prefix dinamicamente in ciascun processo. Isolando questo oggetto in ciascun processo il problema si è risolto.
* Aggiustare la provenance
  * Problema fonte primaria
    * Riguarda tutti i tipi di entità (ar, br, ra, re, id)
    * Centinaia di milioni di entità non hanno uno snapshot 1
    * Come recuperare la fonte primaria?
      * Dai dump
        * Se la br è in Crossref la fonte è Crossref, se è in DataCite e non in Crossref è DataCite, se è in PubMed e non in Crossref è DataCite è PubMed, se è in OpenAIRE e non in Crossref, DataCite e PubMed è OpenAIRE
      * Come fare per le entità che non hanno un’id? Le si assegna la fonte primaria della br
  * Algoritmo
    * Per tutti le br che non hanno uno snapshot 1
      * Elimino tutti gli snapshot
      * Creo uno snapshot 1
        * Fonte primaria
          * Ho un REDIS OMID-Source, creato a partire dai dump
          * Recupero la fonte dal REDIS
    * Per tutti gli altri tipi di entità che non sono br che non hanno uno snapshot 1
      * Faccio una query sparql per scoprire a quale br appartengono
      * Assegno loro la fonte primaria della br, che recupero dalla provenance
* Aggiustare i dati in RDF
  * Download di Blazegraph in JSON-LD, così le triple sono già raggruppate per entità

**Ho inviato la domanda di iscrizione a Leuven!**

## Domande

---
title: 2022-12-01 L’articolo su Meta è pronto
editUrl: false
---

## Novità

* Sebbene pandas 1.5.1 non sia compatibile con Python 3.7 sulla carta, testandolo su Python 3.7 non ha dato problemi.
* Ho scritto del codice per calcolare varie statistiche su Meta a partire dai CSV di output. Si lancia tramite linea di comando. Tutte le statistiche vengono calcolate utilizzando i MetaID per disambiguare le entità.
  * Top N case editrici per numero di risorse bibliografiche
    * Se N è None vengono ritornati tutti
  * Top N case editrici per numero di risorse venue
  * Top N venue per numero di risorse bibliografiche
  * Top N anni per numero di pubblicazioni
  * Top N tipi per numero di pubblicazioni
  * Numero di:
    * Autori
    * Editor
    * Publisher
    * Venue
* Ho scritto del codice per cancellare una di CSV in output di Meta nel caso esista una riga più recente con lo stesso MetaID.
* Ho riportato e commentato i dati nell’articolo su OC Meta, che ora è completo.
* Le ricerche testuali su autori, editor e publisher sono più veloci:
  * Le ricerche su autori ed editor fanno una ricerca secca sul nome, che viene automaticamente modificato per rispettare le regole interne di Meta
  * Le ricerche su publishers accedono a una lista dei nomi autorevoli utilizzati, cercano la stringa che si avvicina di più tramite `difflib.get_close_matches` e, se la trovano, fanno una ricerca secca sul nome. Se non lo trovano, accedono all’indice testuale.
  * Queste migliorie hanno reso le query più veloci su SSD, ma rimangono ancora molto lente su hard disk, specialmente se il disco sta svolgendo altre operazioni in contemporanea.
* Ho modificato e testato l’API di Index, che ora chiama Meta e non Crossref/Datacite per recuperare i metadati. Lo stesso addon viene richiamato anche da COCI.

### Mugabushaka

* Pushing for using open data for evaluating bibliometrics. With properitary databases data are taken for propaganda, since you cannot reproduce them.
* M. think that if we don’t merge our forces we won’t overcome Scopus.
* Mission: data quality.
* Give OpenAlex a chance.
  * Good points:
    * They use PIDs for several metadata.
    * Not discriminatory, all journals (200k journals / 50k journals, 25k actively indexed / Crossref 90k)
    * Open
  * But M. think that the task is too big, OpenAlex is not enough.
* Repo for improving OpenAlex data: almagabo/openalex\_qa
* Proposal: creating a small subset of journals curated very well and then expanding the curation.
* Analisi su quante riviste in Scopus sono in Crossref. If you add PubMed it’s 97%. With Crossref + PubMed we can match Scopus.
* Issues:
  1. additional id: issn-l, openalexid, treatng volumes and issues as containers.
* Low-value contract

## Domande

* Chi menziono nei riconoscimenti dell’articolo su Meta?
  * OpenAIRE Nexus
  * Il team di OpenCitations non compreso tra gli autori
  * ?
* Ci sono diverse differenze tra i campi di `/metadata/` in Meta e in Index.
  * In Index, il nome della venue e gli id sono due campi diversi (`source_title` e `source_id`). Lascio così o creo un unico campo `venue` che mima quello della tabella CSV?
  * Inoltre, in index il campo per gli id è `doi`, non `id`. Lascio così?
  * In Index non c’è il campo `editor`
  * In Index il campo per la data è `year`, ma a volte ci sono date. Cambio il nome del campo? Uso lo stesso anche per Meta?

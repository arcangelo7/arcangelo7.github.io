---
title: 2022-11-22 Programmazione agile
editUrl: false
---

## Novità

* Ho notato che molte operazioni erano in comune tra DataciteProcessing e CrossrefProcesing. Ho introdotto una nuova classe RaProcessing, madre delle prime due, che racchiude i metodi comuni.
  * Inizializzazione dell’elenco dei doi, della mappatura delle case editrici, dell’indice DOI-ORCID
  * Generazione della lista di autori ed editor
  * Estrazione ORCID dall’indice DOI-ORCID
  * Generazione dell’intervallo delle pagine
* Sto correggendo bug negli estrattori di metadati da JaLC, mEDRA e Datacite utilizzandoli sull’elenco dei DOI presenti in COCI ma non in Crossref.
* Ecco come sono distribuiti questi DOI finora (34,458 su 634,720):
  * Airiti: 227
  * CNKI: 3743
  * Crossref: 15,313
  * Datacite: 6288
  * Invalidi: 39
  * Istic: 1486
  * JaLC: 917
  * Kisti: 307
  * mEDRA: 2439
  * OP: 155
  * Public (?): 21
  * Sconosciuto: 3523
* Sia **Meta** che i **plugin** ora collassano eventuali id duplicati. Infatti, in **mEDRA** a volte gli **ISSN** si **ripetono** (come print/**issn-l** o electronic/issn-l). L’ordine degli id viene preservato (non ho usato set)
* Tutti gli estrattori di metadati **normalizzano** i caratteri **unicode collassando** i caratteri **composti**.
* Meta ora gestisce il caso di solo id tra parentesi quadre senza nome nei campi author, editor, venue e publisher.

## Domande

* Il DOI [10.3969/j.issn.1004-132x.2014.09.011](https://doi.org/10.3969/j.issn.1004-132x.2014.09.011) è valido, ma manda in timeout l’API di DOI. Come si spiega? Ce ne sono 10 così.
* Perché l’API di COCI omette i DOI non di Crossref? Lo fa sia usando references che citations. I DOI non di Crossref non compaiono né tra i citati né tra i citanti se si usa l’API.
  * Ad esempio, [10.17309/jltm.2020.2.06](https://opencitations.net/index/coci/api/v1/references/10.17309/jltm.2020.2.06) cita [10.14589/IDO.20.3.5](https://doi.org/10.14589/IDO.20.3.5), ma 10.14589/IDO.20.3.5 non compare tra i citati nonostante sia valido e presente su [Crossref](http://api.crossref.org/works/10.17309/jltm.2020.2.06).
* Fare cinque minuti di chiacchiera sul dottorato
* pandas 1.5.1 non è compatibile con Python 3.7. L’ultima versione compatibile è la 0.23.2 del 2018. Il preprocessing di DataCite usa pandas per dividere file CSV. Droppo pandas o droppo Python 3.7?
  * pandas 1.5.1 dipende da numpy 1.23.5, che non è compatibile con Python 3.10 su Windows. Insomma,

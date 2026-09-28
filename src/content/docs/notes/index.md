---
title: index
editUrl: false
---

## La Novitade

### API

* Le api di Index (v1 e v2) e Meta usano ora l'orchestrazione di Ramose v2 per la federazione.

***

Mi sa che c'era un bug nel vecchio codice di reference-count: [https://github.com/opencitations/oc\_api/blob/d1b269c1ed1185b033b0331537303c56a40fee28/src/api/indexapi\_v2.py#L61-L65](https://github.com/opencitations/oc_api/blob/d1b269c1ed1185b033b0331537303c56a40fee28/src/api/indexapi_v2.py#L61-L65).

Questa moltiplicazione conta citazioni che non esistono. Tipo, una rivista ha due articoli, A e B.

* A cita X e Y
* B cita Z

Le citazioni sono 3.

Il codice di reference-count fa così:

1. Mette tutti i citanti in una lista: \[A, B]
2. Mette tutti i citati in un'altra lista: \[X, Y, Z]
3. Abbina ogni citante a ogni citato: 2 x 3 = 6

Su 0138-9130 (Scientometrics) ritorna 604,067,532 anziché 199,333 citazioni: [https://api.opencitations.net/index/v2/reference-count/issn:0138-9130](https://api.opencitations.net/index/v2/reference-count/issn:0138-9130)

***

Ho trovato un altro bug

/index/v2/citation-count/omid su entità senza identificatori in Meta restituisce sempre 0, ad esempio per br/0606234256, che ha 2,346 citazioni, restituisce 0: [https://github.com/opencitations/oc\_api/blob/d1b269c1ed1185b033b0331537303c56a40fee28/src/api/indexapi\_common.py#L140](https://github.com/opencitations/oc_api/blob/d1b269c1ed1185b033b0331537303c56a40fee28/src/api/indexapi_common.py#L140)

[https://api.opencitations.net/index/v2/citation-count/omid:br/0606234256](https://api.opencitations.net/index/v2/citation-count/omid:br/0606234256)

***

Qualche numero

| Chiamata                                         | HEAD    | Nuovo  |
| ------------------------------------------------ | ------- | ------ |
| citations/doi:10.1038/nature14539 (73.495 righe) | 251,5 s | 11,6 s |
| citation-count dello stesso DOI (v2)             | 196,9 s | 7,2 s  |
| reference-count/issn:2641-3337                   | 11,9 s  | 3,9 s  |

## Domande

* Il Journal Self Citation per le API di Index riguarda ovviamente soltanto i contenitori di tipo Journal, non tutti gli altri, giusto?
* Mi sono accorto che c'è un limite di 200.000 sul citation count e sul reference count

## Memo

META

* Disambiguare gli editori. Inserirla nel processo di patch. Completare il merge.
* Prossimo dump. Eliminare citazioni duplicate.
* Aggiornare oc\_sparql per la provenance

RAMOSE

* Confronto performance
* Aggiungere connextion
* Chiarire di non usare LIMIT con @@page

TAL

* Aggiungere skolemizzazione

Vizioso

* [https://en.wikipedia.org/wiki/Compilers:\_Principles,\_Techniques,\_and\_Tools](https://en.wikipedia.org/wiki/Compilers:_Principles,_Techniques,_and_Tools)
* [https://en.wikipedia.org/wiki/GNU\_Bison](https://en.wikipedia.org/wiki/GNU_Bison)
* [https://en.wikipedia.org/wiki/Yacc](https://en.wikipedia.org/wiki/Yacc)

HERITRACE

* anni: essere meno stretto sugli anni. Problema ISO per 999. 0999?
* Timer massimo. Timer configurabile. Messaggio in caso si stia per toccare il timer massimo.
* Riflettere su @lang. SKOS come use case. skos:prefLabel, skos:altLabel
* Possibilità di specificare l’URI a mano in fase di creazione
* description con l'entità e stata modificata. Tipo commit
* display name è References Cited by VA bene
* Avvertire l'utente del disastro imminente nel caso in cui provi a cancellare un volume

Meta

* Usare il triplestore di provenance per fare 303 in caso di entità mergiate o mostrare la provenance in caso di cancellazione e basta.

oc\_ocdm

* Automatizzare mark\_as\_restored di default. è possibile disabilitare e fare a mano mark\_as\_restored.
* [https://opencitations.net/meta/api/v1/metadata/doi:10.1093/acprof:oso/9780199977628.001.0001](https://opencitations.net/meta/api/v1/metadata/doi:10.1093/acprof:oso/9780199977628.001.0001)
* DELETE con variabile
* Modificare Meta sulla base della tabella di Elia
* embodiment multipli devono essere purgati a monte
* Modificare documentazione API aggiungendo omid
* aggiungere Relation sovraclasse di Citazione e Menzione

RML

* Chiedere Ionannis il diagramma che ha usato per auto rml.

Crowdsourcing

* Quando dobbiamo ingerire Crossref stoppo manualmente OJS. Si mette una nota nel repository per dire le cose. Ogni mese.
* Aggiornamenti al dump incrementali. Si usa un nuovo prefisso e si aggiungono dati solo a quel CSV.
* Bisogna usare il DOI di Zenodo come primary source. Un unico DOI per batch process.
* Bisogna fare l’aggiornamento sulla copia e poi bisogna automatizzare lo switch

Citazioni

* Fare diff DataCite per togliere le citazioni che non sono più citazioni. è da fare in post. Snapshot 2 di provenance. Fare lo snapshot 3 con la creazione con il derived from al nuovo dump. La lineage viene data dallo specialization of. Colleghi sia al 2 che al dump.
* Repo cerotti. meta/index/sorgenti

OC di converter

* Riguardare perché viene fuori una seconda tabella object per DataCite.

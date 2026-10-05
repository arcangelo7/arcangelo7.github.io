---
title: index
editUrl: false
---

## La Novitade

### API

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Sep 29, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/oc_api" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/oc_api</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>feat(index): support isbn in v2 citation-count, reference-count, citations &amp; references endpoints</p></div><div style="display: flex; justify-content: flex-end; align-items: center; font-size: 0.85em;"><a href="https://github.com/opencitations/oc_api/commit/4c2b56883056d8de830f4792cdf90932751949a6" style="color: #0969da; text-decoration: none; font-weight: 500;">4c2b568</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Sep 29, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/oc_api" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/oc_api</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>feat(index): support issn across v2 citation-count, reference-count, citations and references endpoints</p>
<p>Normalize ISSN and ISBN inputs to match Meta. For these endpoints, incoming and outgoing citations refer directly to the work identified by the ISSN, excluding citations to or from works contained within it.</p></div><div style="display: flex; justify-content: flex-end; align-items: center; font-size: 0.85em;"><a href="https://github.com/opencitations/oc_api/commit/bc28253506e8a5b847f2eca22c72a012fdc9728b" style="color: #0969da; text-decoration: none; font-weight: 500;">bc28253</a></div></div>

Citations: [https://api-stg.opencitations.net/index/v2/citations/issn:0192-8651](https://api-stg.opencitations.net/index/v2/citations/issn:0192-8651)

References: [https://api-stg.opencitations.net/index/v2/references/issn:2295-9262](https://api-stg.opencitations.net/index/v2/references/issn:2295-9262)

### SPARQL

QLever cookbook: [https://github.com/opencitations/oc\_sparql/blob/main/AGENTS.md](https://github.com/opencitations/oc_sparql/blob/main/AGENTS.md)

### Dump

RDF: [https://doi.org/10.5281/zenodo.23059736](https://doi.org/10.5281/zenodo.23059736)
QLever: [https://doi.org/10.5281/zenodo.23063958](https://doi.org/10.5281/zenodo.23063958)

### Altro

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Sep 29, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/python-package-template" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/python-package-template</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>fix: switch documentation from Astro Starlight to Jupyter Book 1.0</p></div><div style="display: flex; justify-content: flex-end; align-items: center; font-size: 0.85em;"><a href="https://github.com/opencitations/python-package-template/commit/cdabf5d5a20a7be35072096b82238acf598481dd" style="color: #0969da; text-decoration: none; font-weight: 500;">cdabf5d</a></div></div>

[https://doi.org/10.5281/zenodo.23164113](https://doi.org/10.5281/zenodo.23164113)
Mi sono accorto che molti titoli sono sbagliati perché ho tenuto solo la prima riga

## Domande

* Secondo me, la roba di Elia che pesa in totale 1,19 TB sul server di test si può cancellare tutta, perché non viene toccata da aprile 2026 ed è collegata ai lavori sulla provenance e su Matilda che sono già stati integrati in produzione.

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

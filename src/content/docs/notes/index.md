---
title: index
editUrl: false
---

## La Novitade

### time-agnostic-library

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Aug 7, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/time-agnostic-library" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/time-agnostic-library</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>feat(query): support merge-aware entity histories</p></div><div style="display: flex; justify-content: flex-end; align-items: center; font-size: 0.85em;"><a href="https://github.com/opencitations/time-agnostic-library/commit/6a965689f6f2e17a71e92eec9af3cd26dcf37aca" style="color: #0969da; text-decoration: none; font-weight: 500;">6a96568</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Aug 26, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/time-agnostic-library" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/time-agnostic-library</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>perf(query): filter quads before isolated version reconstruction</p></div><div style="display: flex; justify-content: flex-end; align-items: center; font-size: 0.85em;"><a href="https://github.com/opencitations/time-agnostic-library/commit/f3c430ca47bb8b77ead7cdc54286a0e02a04b584" style="color: #0969da; text-decoration: none; font-weight: 500;">f3c430c</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Sep 3, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/time-agnostic-library" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/time-agnostic-library</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>feat!: compare delta query solution mappings across versions</p>
<p>BREAKING CHANGE: DeltaQuery removes changed_properties and returns additions, deletions, changes, and merges as solution mappings instead of per-entity quad records.</p></div><div style="display: flex; justify-content: flex-end; align-items: center; font-size: 0.85em;"><a href="https://github.com/opencitations/time-agnostic-library/commit/a14f83dc4cec25e3f8637816256304c9e146d8d3" style="color: #0969da; text-decoration: none; font-weight: 500;">a14f83d</a></div></div>

### Complessità algoritmica

Obiettivo: capire come cresce il lavoro al crescere dell'input. Trovare un limite superiore, un peggio di così non può andare.

Mattone di cui ho letto solo 40 pagine [https://cs.ucf.edu/\~sharma/Algorithms\_notes.pdf](https://cs.ucf.edu/~sharma/Algorithms_notes.pdf) chiedendo a ChatGPT di spiegarmi  ogni riga salvo poi scoprire che quello è un libro di appunti di un prof, non il vero manuale

Partiamo da una roba facile.

![Pasted image 20260819214739.png](../../../assets/notes/attachments/pasted-image-20260819214739.png)

Qui l'input è formato da due cose: una query di update, cioè un elenco di quadruple, e lo stato corrente dell'entità, cioè il set da modificare. Chiamiamo **u** il numero di quadruple dell'update.

Il parsing costa **u** passi, perché DELETE DATA e INSERT DATA sono liste piatte di quadruple, senza strutture annidate, quindi basta una sola lettura. Il parsing restituisce **k** blocchi di update, con k al massimo u, perché ogni blocco contiene almeno una quadrupla.

Poi ogni quadrupla richiede una sola operazione, aggiungerla o toglierla dal set, operazione che costa un passo in media (perché da quando ho implementato un hashmap in C so che O(1) esiste solo nelle fiabe).

Quindi T <= 3k + 5u <= 8u (caso 1 quadrupla per blocco), quindi O(u)

![Pasted image 20260903233700.png](../../../assets/notes/attachments/pasted-image-20260903233700.png)

QuerySnapshots è una richiesta al triplestore: prima chiamata. Torna h snapshot. SortDesc li ordina per data. Lato codice uso la funzione sorted di Python, che usa [Timsort](https://en.wikipedia.org/wiki/Timsort), che ha performance nel caso peggiore O(n log n), come il merge sort. Ma in realtà vedo che non c'è nessun algoritmo di ordinamento che può fare meglio di così nel libro di Cormen.

![Pasted image 20260819214808.png](../../../assets/notes/attachments/pasted-image-20260819214808.png)

Gli algoritmi 5, 6, 7, 8 e 9 vanno studiati prima del 4, perché il 4 è la loro somma dei loro costi. La 6 usa la 7, quindi tocca alla 7

![Pasted image 20260822165742.png](../../../assets/notes/attachments/pasted-image-20260822165742.png)

![Pasted image 20260822165850.png](../../../assets/notes/attachments/pasted-image-20260822165850.png)

![Pasted image 20260821154833.png](../../../assets/notes/attachments/pasted-image-20260821154833.png)

![Pasted image 20260903233723.png](../../../assets/notes/attachments/pasted-image-20260903233723.png)

![Pasted image 20260903233712.png](../../../assets/notes/attachments/pasted-image-20260903233712.png)

L'algoritmo 4 è solo un orchestratore, quasi tutto il lavoro lo fanno gli algoritmi 2, 5, 7 e 8 e qui si sommano i loro costi.

![Pasted image 20260822165952.png](../../../assets/notes/attachments/pasted-image-20260822165952.png)

![Pasted image 20260903233730.png](../../../assets/notes/attachments/pasted-image-20260903233730.png)

### SKG-IF

422 Unprocessable Entity: [https://github.com/skg-if/api/blob/de137849ae5ba478995b97c8cc87f8772fc9fb74/openapi/ver/current/skg-if-openapi.yaml#L289-L291](https://github.com/skg-if/api/blob/de137849ae5ba478995b97c8cc87f8772fc9fb74/openapi/ver/current/skg-if-openapi.yaml#L289-L291)

E poi, risposta conforme a RFC7807: [https://github.com/skg-if/api/blob/main/openapi/ver/current/skg-if-openapi.yaml#L417-L432](https://github.com/skg-if/api/blob/main/openapi/ver/current/skg-if-openapi.yaml#L417-L432)

[https://www.rfc-editor.org/info/rfc7807/](https://www.rfc-editor.org/info/rfc7807/)

[https://github.com/skg-if/api/issues/98](https://github.com/skg-if/api/issues/98)

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Sep 5, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/ramose" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/ramose</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>feat(skg-if): complete the contract exposure</p></div><div style="display: flex; justify-content: flex-end; align-items: center; font-size: 0.85em;"><a href="https://github.com/opencitations/ramose/commit/2228ca3f8a8a8d3142a5229cf0921022c0d52e60" style="color: #0969da; text-decoration: none; font-weight: 500;">2228ca3</a></div></div>

[https://api-stg.opencitations.net/skg-if/v1](https://api-stg.opencitations.net/skg-if/v1)

### Benchmark

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Sep 5, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/ramose" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/ramose</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>chore(benchmarks): add SERVICE versus orchestration harness</p></div><div style="display: flex; justify-content: flex-end; align-items: center; font-size: 0.85em;"><a href="https://github.com/opencitations/ramose/commit/d243662f719ebd630625d7f8f767a7f1c84bf4a6" style="color: #0969da; text-decoration: none; font-weight: 500;">d243662</a></div></div>

## Domande

* E-mail formale all'editor in chief di Journal of Web Semantics.

## Memo

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

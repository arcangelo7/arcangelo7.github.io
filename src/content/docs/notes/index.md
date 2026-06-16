---
title: index
editUrl: false
---

## La Novitade

### RAMOSE

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Jun 10, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/ramose" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/ramose</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>fix(skgif): normalize local identifier URLs with merged scheme slashes [release]</p>
<p>Reverse proxies such as Traefik sanitize request paths by collapsing
duplicate slashes, so a full URL passed as local identifier reaches the
API as &quot;https:/example.org/...&quot;. The new normalize_local_identifier_url
preprocess function restores the scheme separator, so specs can accept
both the canonical and the merged form.</p></div><div style="display: flex; justify-content: flex-end; align-items: center; font-size: 0.85em;"><a href="https://github.com/opencitations/ramose/commit/8994919de5d4d4734c6533ab66fb1bb76b02ecf7" style="color: #0969da; text-decoration: none; font-weight: 500;">8994919</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Jun 11, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/ramose" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/ramose</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>feat(skgif): add per-triplestore text-search backend addon modules</p>
<p>The package default keeps FILTER CONTAINS for endpoints
without a text index; the blazegraph, fuseki, graphdb, qlever and virtuoso
modules override that behaviour. They can be imported as
ramose.skgif_addon.virtuoso, ramose.skgif_addon.qlever, ecc.</p></div><div style="display: flex; justify-content: flex-end; align-items: center; font-size: 0.85em;"><a href="https://github.com/opencitations/ramose/commit/63043369c7dc73a1e8129af2760fcd96327b130c" style="color: #0969da; text-decoration: none; font-weight: 500;">6304336</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Jun 15, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/ramose" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/ramose</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>fix(skg-if): emit single_entity meta for single-entity lookups [release]</p></div><div style="display: flex; justify-content: flex-end; align-items: center; font-size: 0.85em;"><a href="https://github.com/opencitations/ramose/commit/be00bb511cb5f4e6af499329a7852f4dbe2fbd3e" style="color: #0969da; text-decoration: none; font-weight: 500;">be00bb5</a></div></div>

La nuova BBuusta di metadati per products/{local\_identifier}

```json
  "meta": {
    "local_identifier": "https://example.com/skg-if/api/products/product-1-fgp",
    "entity_type": "single_entity",
    "api_items": [
      {
        "local_identifier": "person-5-mw",
        "urls": [
          {
            "entity_type": "link",
            "rel": "self",
            "href": "https://example.com/skg-if/api/persons/person-5-mw"
          }
        ]
      },
      {
        "local_identifier": "affiliation-organisation-1",
        "urls": [
          {
            "entity_type": "link",
            "rel": "self",
            "href": "https://example.com/skg-if/api/organisations/affiliation-organisation-1"
          }
        ]
      },
      {
        "local_identifier": "datasource-1-aa",
        "urls": [
          {
            "entity_type": "link",
            "rel": "self",
            "href": "https://example.com/skg-if/api/datasources/datasource-1-aa"
          }
        ]
      },
      {
        "local_identifier": "venue-5-sd",
        "urls": [
          {
            "entity_type": "link",
            "rel": "self",
            "href": "https://example.com/skg-if/api/venues/venue-5-sd"
          }
        ]
      }
    ]
  }
```

Io ho implementato e local\_identifier e "entity\_type": "single\_entity", che sono obbligatori. api\_items lo metto?

#### Parametri custom con logica dichiarativa

`#custom_params` continua a funzionare come già funziona, ma con una possibilità in più. Se come handler del parametro custom specifichi una funzione, te la implementi tu e di sicuro puoi farci più cose. In alternativa, al posto del nome della funzione, puoi indicare il percorso a un file YAML.

Il file mappa ogni filtro ai "buchi" della query. Per ogni filtro la chiave è il nome con cui lo si invoca nella richiesta; sotto, dici in quale placeholder `[[...]]` della query SPARQL va iniettato il frammento, e qual è il frammento. Il valore passato nella richiesta entra nel frammento dove scrivi {{value}}.

Nel file hf hai

```
#custom_params filter,ocdm.yaml,preprocess,Search filter.
```

Esempio:

```yaml
identifiers.id:
    filter: "?product datacite:hasIdentifier [ literal:hasLiteralValue {{value}} ] ."

cf.cites:
	filter_preamble: |
		@@with source=index
		SELECT ?product WHERE { ?ci cito:hasCitedEntity {{value}} ;
			cito:hasCitingEntity ?product . }
		@@join ?product ?product type=inner
```

Dove la query dell'operazione è:

```
SELECT ?product ?title WHERE {
	[[filter_preamble]]
	?product dcterms:title ?title .
	[[filter]]
}
```

### HERITRACE

Ripristinare un'entità ripristinava l'intero vicinato di un'entità. Ripristinare il ra di un'autore ripristinava anche la br collegata nel grafo corrente: i suoi link tornavano a puntare agli ar originali. C'era un bug per cui le entità correlate venivano scoperte solo nel grafo corrente e non in quello storico, per cui se ad esempio avevo cancellato gli ar originali, ecco che la br perdeva tutti i ruoli connessi al ripristino di un ra collegato.

Tuttavia, trovo che ripristinare tutte le entità collegate sia una cosa un po' pazzerella. L'utente, quando clicca restore, si aspetta di ripristinare quell'entità e quelle modificate nella transazione di quell'entità, tipo un ra e l'id collegato, non anche le br associate e gli ar associati ecc.

Il revert co-transazionale equivale a un git revert. Il revert del vicinato completo equivale a un git reset --hard dell'intero repo. Mi sembra un po' too much.

Scegliendo di applicare la semantica del git revert non pregiudica di ottenere il risultato del git rest. Basta scegliere la radice giusta, mentre la semantica opposta sarebbe più vincolante.

Per essere chiaro, non è solo un problema di direzionalità dei collegamenti. Il problema non è solo recuperare le entità che referenziano quella corrente come oggetto e includerle nel revert, ma anche includere nel revert quelle collegate come oggetto diretto o indiretto all'entità corrente. Cambia solo la scala del problema, ma il problema rimane.

Esempio, ripristino un br alla versione T. Un altro utente, la settimana scorsa (dopo T), ha corretto un refuso nel literal di un identifier, in un salvataggio che non c'entrava nulla col br. Restore-a-T outgoing-only: l'identifier torna al valore sbagliato.

Per revert co-transazionale mi riferisco al revert delle operazioni eseguite nello stesso salvataggio: ripristinando un'entità a una versione T, vengono annullate le sue modifiche successive a T e, per ogni entità correlata, soltanto le modifiche scritte negli stessi salvataggi che si stanno annullando (riconoscibili dal prov:generatedAtTime condiviso), lasciando intatte quelle ricevute in operazioni indipendenti.

C'è però un problema a livello di interfaccia, perché se l'utente va a ispezionare la storia di un'entità, vedrà anche lo stato vecchio delle entità correlate. Quindi facendo un revert potrebbe aspettarsi di ripristinare anche le identità correlate per come le ha viste nella versione vecchia. Tuttavia io mi aspetto che un utente che fa un revert vada ad annullare le proprie azioni, le proprie modifiche, non le modifiche del mondo. Cioè non mi aspetto che l'utente faccia un audit completo di tutte le entità correlate quando fa un revert

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Jun 13, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/heritrace" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/heritrace</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>fix(restore): scope version restore to the transactions being undone</p>
<p>Restoring a version rebuilt every related entity from its snapshot at the
target time, which also reverted changes those entities received in unrelated
later transactions.</p></div><div style="display: flex; justify-content: flex-end; align-items: center; font-size: 0.85em;"><a href="https://github.com/opencitations/heritrace/commit/07f79f6a9e5688ff71e95276e0afc36487444bde" style="color: #0969da; text-decoration: none; font-weight: 500;">07f79f6</a></div></div>

## Domande

Io non ho idea di come rendere i filtri di SKF-IF agnostici rispetto al data model e riutilizzabili dalla community. Al momento il parametro custom "filter" è associato ad un addon che inietta nella query SPARQL i predicati dell'OCDM.

Secondo me dovrebbe essere discussa e entrare in specifica una paginazione di default quando l'utente non specifica nulla nelle ricerche. È impensabile ritornare una lista piatta di tutto come default.

## Memo

RAMOSE

* Confronto performance
* Aggiungere connextion

TAL

* Aggiungere skolemizzazione

Vizioso

* [https://en.wikipedia.org/wiki/Compilers:\_Principles,\_Techniques,\_and\_Tools](https://en.wikipedia.org/wiki/Compilers:_Principles,_Techniques,_and_Tools)
* [https://en.wikipedia.org/wiki/GNU\_Bison](https://en.wikipedia.org/wiki/GNU_Bison)
* [https://en.wikipedia.org/wiki/Yacc](https://en.wikipedia.org/wiki/Yacc)

HERITRACE

* C'è un bug che si verifica quando uno seleziona un'entità preesistente, poi clicca sulla X e inserisce i metadati a mano. Alcuni metadati vengono duplicati.
* Per risolvere le performance del time-vault non usare la time-agnostic-library, ma guarda solo la query di update dello snapshot di cancellazione.
* Ordine dato all’indice dell’elemento
* date: formato
* anni: essere meno stretto sugli anni. Problema ISO per 999. 0999?
* Opzione per evitare counting
* Opzione per non aggiungere la lista delle risorse, che posso comunque essere cercate
* Configurabilità troppa fatica
* Timer massimo. Timer configurabile. Messaggio in caso si stia per toccare il timer massimo.
* Riflettere su @lang. SKOS come use case. skos:prefLabel, skos:altLabel
* Possibilità di specificare l’URI a mano in fase di creazione
* la base è non specificare la sorgente, perché non sarà mai quella iniziale.
* desvription con l'entità e stata modificata. Tipo commit
* display name è References Cited by VA bene
* Avvertire l'utente del disastro imminente nel caso in cui provi a cancellare un volume

Meta

* Matilda e OUTCITE nella prossima versione
* Rilanciare processo eliminazione duplicati
* Fusione: chi ha più metadati compilati. A parità di metadato si tiene l’omid più basso
* frbr:partOf non deve aggiungere nel merge: [https://opencitations.net/meta/api/v1/metadata/omid:br/06304322094](https://opencitations.net/meta/api/v1/metadata/omid:br/06304322094)
* API v2
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

* Vedere come morh kgc rappresenta database internamente
* [https://github.com/oeg-upm/gtfs-bench](https://github.com/oeg-upm/gtfs-bench)
* Chiedere Ionannisil diagramma che ha usato per auto rml.

Crowdsourcing

* Quando dobbiamo ingerire Crossref stoppo manualmente OJS. Si mette una nota nel repository per dire le cose. Ogni mese.
* Aggiornamenti al dump incrementali. Si usa un nuovo prefisso e si aggiungono dati solo a quel CSV.
* Bisogna usare il DOI di Zenodo come primary source. Un unico DOI per batch process.
* Bisogna fare l’aggiornamento sulla copia e poi bisogna automatizzare lo switch

Citazioni

* Fare diff DataCite per togliere le citazioni che non sono più citazioni. è da fare in post. Snapshot 2 di provenance. Fare lo snapshot 3 con la creazione con il derived from al nuovo dump. La lineage viene data dallo specialization of. Colleghi sia al 2 che al dump.
* Repo cerotti. meta/index/sorgenti

OC di converter

Riguardare perché viene fuori una seconda tabella object per DataCite.

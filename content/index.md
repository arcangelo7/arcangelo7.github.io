---
{"publish":true,"created":"2025-10-15T20:56:24.684+02:00","modified":"2025-11-11T15:51:56.099+01:00","cssclasses":""}
---

# La Novitade

## Meta

- Adesso l'aggiornamento dei file RDF per dati provenance, nonché la generazione delle query SPARQL per aggiornare i database avvengono in parallelo usando il multi-threading, trattandosi di operazioni I/O-bound non CPU intensive, che quindi verrebbero penalizzate dalla duplicazione intera della memoria necessaria per generare nuovi processi (o almeno così spero). 
- Dopodiché, i database vengono aggiornati anche in questo caso in parallelo subito dopo che sono stati generati i file con le query SPARQL, senza aspettare che venga completata la modifica dei file RDF. Tutto questo deve concludersi prima che parta il processing del file CSV successivo.
## Infrastruttura

## HERITRACE

# Domande

## Memo
- HERITRACE
	- C'è un bug che si verifica quando uno seleziona un'entità preesistente, poi clicca sulla X e inserisce i metadati a mano. Alcuni metadati vengono duplicati.
	- Se uno ripristina una sotto entità a seguito di un merge, l'entità principale potrebbe rompersi.
- Meta
	- Bisogna produrre la tabella che associa temp a OMID per produrre le citazioni.
- Tesi
	- RML
	- Crowdsourcing future works

- OpenCitations
	- Rifare dump (CrossRef e DataCite)
	- Risolvere la questione ORCID
	- Rilanciare processo eliminazione duplicati

- "reference": { "@id": "frbr:part", "@type": "@vocab" } → bibreference
    
- "crossref": { "@id": "biro:references", "@type": "@vocab"} → reference
    
- "crossref": "datacite:crossref"
    
- Ripubblicare dbpedia agnostica su Zenodo e si può usare time-agnostic-library su db pedia agnostica
    
- oc_ocdm
    
    - Automatizzare mark_as_restored di default. è possibile disabilitare e fare a mano mark_as_restored.
- https://opencitations.net/meta/api/v1/metadata/doi:10.1093/acprof:oso/9780199977628.001.0001
    
- Guida per Meta e cerotti
    
- DELETE con variabile
    
- Modificare Meta sulla base della tabella di Elia
    
- embodiment multipli devono essere purgati a monte
    
- Portare il Meta Editor fuori. oc_editor
    
- Modificare documentazione API aggiungendo omid
        
- Heritrace
    - Per risolvere le performance del time-vault non usare la time-agnostic-library, ma guarda solo la query di update dello snapshot di cancellazione.
    - Ordine dato all’indice dell’elemento
    - date: formato
    - anni: essere meno stretto sugli anni. Problema ISO per 999. 0999?
    - Opzione per evitare counting
    - Opzione per non aggiungere la lista delle risorse, che posso comunque essere cercate
    - Configurabilità troppa fatica
    - Collegamento da review e articolo revisionato.
    - Timer massimo. Timer configurabile. Messaggio in caso si stia per toccare il timer massimo.
    - Riflettere su @lang. SKOS come use case. skos:prefLabel, skos:altLabel
    - Possibilità di specificare l’URI a mano in fase di creazione
	- la base è non specificare la sorgente, perché non sarà mai quella iniziale.
	- desvription con l'entità e stata modificata. Tipo commit
	- display name è References Cited by VA bene
	- Avvertire l'utente del disastro imminente nel caso in cui provi a cancellare un volume
- Meta
    - Fusione: chi ha più metadati compilati. A parità di metadato si tiene l’omid più basso
    - Issue github parallelizzazione virtuoso
    - frbr:partOf non deve aggiungere nel merge: https://opencitations.net/meta/api/v1/metadata/omid:br/06304322094
    - API v2
    - Usare il triplestore di provenance per fare 303 in caso di entità mergiate o mostrare la provenance in caso di cancellazione e basta.
- RML
    
    - Vedere come morh kgc rappresenta database internamente
    - https://dylanvanassche.be/assets/pdf/iswc2024-krown-benchmark-rdf-graph-materialisation.pdf
    
    https://github.com/oeg-upm/gtfs-bench
    - Chiedere Ionannisil diagramma che ha usato per auto rml.

- Crowdsourcing
    - Quando dobbiamo ingerire Crossref stoppo manualmente OJS. Si mette una nota nel repository per dire le cose. Ogni mese.
    - Aggiornamenti al dump incrementali. Si usa un nuovo prefisso e si aggiungono dati solo a quel CSV.
    - Bisogna usare il DOI di Zenodo come primary source. Un unico DOI per batch process.
    - Bisogna fare l’aggiornamento sulla copia e poi bisogna automatizzare lo switch
- docker compose atom melody, con un volume per gli asset. C'è una documentazione su come si lanciano entrambi fatti da Giulia Renda. Fine maggio
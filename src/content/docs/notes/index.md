---
title: index
editUrl: false
---

## La Novitade

### Meta

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">May 13, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/oc_meta" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/oc_meta</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>feat: add convert_citations script for resolving temp IDs to OMIDs</p>
<p>Reads Meta output CSVs to build a mapping from source identifiers
(temp:, doi:, isbn:, etc.) to their assigned OMIDs, then rewrites
citation CSVs with resolved OMIDs in the format expected by the
Index cnc.py pipeline. Reports unresolvable orphan IDs.</p></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+272</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-0</span><a href="https://github.com/opencitations/oc_meta/commit/2bcdca670a8614c78d79903b58fe8f44718d356e" style="color: #0969da; text-decoration: none; font-weight: 500;">2bcdca6</a></div></div>

### ex produzione nvme

Meta indicizzato in 7.8h su ex-produzione con gli nvme vs 7.3h con gli HDD in RAID10 vs 5.8h su ServerGrosso con gli stessi parametri.

### oc-botwatch

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">May 18, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/arcangelo7/oc-botwatch" style="font-size: 0.85em; color: #0969da; text-decoration: none;">arcangelo7/oc-botwatch</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>feat: classify access log traffic into human, generic bot, and ai bot</p></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+333</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-0</span><a href="https://github.com/arcangelo7/oc-botwatch/commit/6e9d61322e5240754a71cb5f5b7ff90e44b32b54" style="color: #0969da; text-decoration: none; font-weight: 500;">6e9d613</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">May 18, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/arcangelo7/oc-botwatch" style="font-size: 0.85em; color: #0969da; text-decoration: none;">arcangelo7/oc-botwatch</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>perf: rewrite traffic analysis with polars</p></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+76</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-124</span><a href="https://github.com/arcangelo7/oc-botwatch/commit/63bf7192df0e71b79d9c95ce61122544a7dc0585" style="color: #0969da; text-decoration: none; font-weight: 500;">63bf719</a></div></div>

Utilizzando le librerie native di Python e leggendo le righe in batch in parallelo, ci sono voluti per tre mesi di log una decina di minuti per arrivare al risultato. Con Polars pochi secondi. Altamente consigliato.

## Domande

### Review

* Come rendo verificabile una review presso una rivista single blind? So che posso registrarla sul profilo di Web of Science, so che Publons è stata inglobata da Web of Science e che Web of Science, credo, registri automaticamente le review presso i suoi giornali su ORCID, ma DSH non è un giornale di Wiley.
* Fare da revisore per un articolo inviato nella stessa traccia alla quale ho contribuito anch'io, non è di per sé un conflitto di interessi? Voglio dire, ho interesse a recensire negativamente l'articolo di un altro per aumentare le possibilità che il mio venga accettato, no?

#### Modellare l'assenza di provenance

Sto facendo la revisione di un articolo che introduce tre moduli basati su CIDOC-CRM per modellare tre diverse dimensioni dell'assenza di provenance.
\- Modulo per la natura dinamica (usa E3 Condition State per esprimere la temporalità del gap)
\- Modulo per la natura problematica (collega E3 Condition State a E92 Spacetime Volume e E5 Event)
\- Modulo per l'intenzionalità (introduce due sottoclassi di E5 Event: Event Human ed Event Natural)
Di per sé è un'idea interessante. Fabio con [VISU](https://ceur-ws.org/Vol-3602/paper5.pdf) (Vagueness, Incompleteness, Subjectivity, and Uncertainty) ha identificato il problema e ha parlato di pattern per riconoscere l'assenza, ma ha detto che l'assenza di per sé non è modellabile. Questa autrice invece cerca proprio di modellare l'assenza.

Tuttavia, il modo in cui sono definiti questi moduli viola i domini e i range di CIDOC-CRM . È legittima questa cosa?

L'autrice definisce il suo contributo come moduli basati su ontologie. Io non ho trovato questo concetto in letteratura. È un contributo sensato.

Inoltre, se il contributo è sensato, cosa ci si aspetta che uno presenti? Un artefatto? Una documentazione machine readable? Una versione machine readable del modulo? L'articolo dice di aver usato un adattamento di SAMOD, ma non presenta nessun test case, competency question, query SPARQL eccetera.

### Altro

* A che punto siamo con Aldrovandi? Posso procedere con il caricamento su Zenodo?
* Rate limit
  * [https://www.countermetrics.org/](https://www.countermetrics.org/) questo lo conosciamo o lo seguiamo?
* Firma tutorato

### Mr Y

Mr Y vuole (1) filtrare le citazioni JaLC per avere solo quelle verso entità DataCite e (2) avere i DOI direttamente nel risultato invece degli URI interni di OC. Io posso anche ottenere queste informazioni, ma non sarebbero riproducibili a meno che io non le ottenessi tramite uno script che lavora sui file RDF di provenance. Rendiamo pubblico il db di provenance? Sarebbe anche ora, esiste da un pezzo.

prov:atLocation [https://w3id.org/oc/index/joci/](https://w3id.org/oc/index/joci/) che roba è?

## Memo

TAL

* Aggiungere skolemizzazione

Aldrovandi

* Ai related works c'è da aggiungere l'articolo su chad kg
* Articolo del Twin

Vizioso

* [https://en.wikipedia.org/wiki/Compilers:\_Principles,\_Techniques,\_and\_Tools](https://en.wikipedia.org/wiki/Compilers:_Principles,_Techniques,_and_Tools)
* [https://en.wikipedia.org/wiki/GNU\_Bison](https://en.wikipedia.org/wiki/GNU_Bison)
* [https://en.wikipedia.org/wiki/Yacc](https://en.wikipedia.org/wiki/Yacc)

HERITRACE

* C'è un bug che si verifica quando uno seleziona un'entità preesistente, poi clicca sulla X e inserisce i metadati a mano. Alcuni metadati vengono duplicati.
* Se uno ripristina una sotto entità a seguito di un merge, l'entità principale potrebbe rompersi.
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
  * Da definire le sorgenti
* Bisogna produrre la tabella che associa temp a OMID per produrre le citazioni.
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

RML

* Vedere come morh kgc rappresenta database internamente
* [https://github.com/oeg-upm/gtfs-bench](https://github.com/oeg-upm/gtfs-bench)
* Chiedere Ionannisil diagramma che ha usato per auto rml.

Crowdsourcing

* Quando dobbiamo ingerire Crossref stoppo manualmente OJS. Si mette una nota nel repository per dire le cose. Ogni mese.
* Aggiornamenti al dump incrementali. Si usa un nuovo prefisso e si aggiungono dati solo a quel CSV.
* Bisogna usare il DOI di Zenodo come primary source. Un unico DOI per batch process.
* Bisogna fare l’aggiornamento sulla copia e poi bisogna automatizzare lo switch

---
title: index
editUrl: false
---

## La Novitade

### Meta

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">

```
<div>
  <strong style="display: block; color: #1f2328;">arcangelo7</strong>
  <span style="font-size: 0.85em; color: #656d76;">Dec 27, 2025</span>
  <span style="font-size: 0.85em; color: #656d76;"> · </span>
  <a href="https://github.com/opencitations/oc_meta" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/oc_meta</a>
</div>
```

  </div>
  <div style="margin: 12px 0; color: #1f2328;">
    <p>feat(fixer): add script to detect identifier schema mismatches</p>
<p>Scans RDF files directly to find identifiers where the declared schema
does not match the value pattern (e.g., ISSN values marked as ORCID).</p>

  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
    <span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+226</span>
    <span style="font-family: monospace; color: #cf222e; font-weight: 600;">-0</span>
    <a href="https://github.com/opencitations/oc_meta/commit/49a5051bf7599b4dc6eb153f71fd6f2d465c8508" style="color: #0969da; text-decoration: none; font-weight: 500;">49a5051</a>
  </div>
</div>



#### ORCID errati (7 casi)

Identificatori con formato ISSN/ISBN ma schema ORCID. Tutti appartenenti a entita BR (Journal/Book).

| ID Mismatch | Valore errato | Entita         | Titolo                                           | Valore corretto | Schema corretto |
| ----------- | ------------- | -------------- | ------------------------------------------------ | --------------- | --------------- |
| 06012393243 | 2790-9344     | br/06012054723 | Pakistan Journal Of Health Sciences              | 2790-9344       | issn            |
| 06012393328 | 1462-0324     | br/06012054834 | Rheumatology                                     | 1462-0324       | issn            |
| 06012393250 | 0962-1067     | br/06012054731 | Journal Of Clinical Nursing                      | 0962-1067       | issn            |
| 06012393478 | 0277-1691     | br/06012055012 | International Journal Of Gynecological Pathology | 0277-1691       | issn            |
| 06012393294 | 9783111692456 | br/06012054788 | Women In The Socratic Tradition                  | 9783111692456   | isbn            |
| 06012387883 | 9783031963971 | br/06012050602 | Studies In Childhood And Youth                   | 9783031963971   | isbn            |
| 06012387868 | 1724-6059     | ra/06030984957 | (Responsible Agent)                              | 1724-6059       | issn            |

**Verifica esterna**:

* ISSN 2790-9344: confermato [Pakistan Journal of Health Sciences](https://www.thejas.com.pk/index.php/pjhs/about)
* ISSN 0962-1067: confermato [Journal of Clinical Nursing](https://portal.issn.org/resource/ISSN/0962-1067)
* ISBN 9783111692456: confermato [De Gruyter](https://www.degruyterbrill.com/document/doi/10.1515/9783111692456/html)

Tutte le corruzioni sono successive al 22 dicembre, data in cui è stato spento il server. Io me l'ero dimenticato e non ho stoppato Meta in tempo.

~~Soluzione: cancellare tutte le entità successive al 22 dicembre e riprocessarle.~~

Pensandoci meglio questa soluzione è rischiosa. Alla fine ho preferito rilanciare il processo da capo.

***

```yaml
  autoheal:
    image: willfarrell/autoheal:latest
    container_name: oc_meta_autoheal
    restart: unless-stopped
    network_mode: none
    environment:
      AUTOHEAL_CONTAINER_LABEL: all
      AUTOHEAL_INTERVAL: 30
      AUTOHEAL_START_PERIOD: 120
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /etc/localtime:/etc/localtime:ro
```

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">

```
<div>
  <strong style="display: block; color: #1f2328;">arcangelo7</strong>
  <span style="font-size: 0.85em; color: #656d76;">Dec 20, 2025</span>
  <span style="font-size: 0.85em; color: #656d76;"> · </span>
  <a href="https://github.com/opencitations/oc_meta" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/oc_meta</a>
</div>
```

  </div>
  <div style="margin: 12px 0; color: #1f2328;">
    <p>fix: add timeout to SPARQLClient to handle database unavailability</p>
<ul>
<li>Add timeout=3600 (1 hour) to all SPARQLClient calls in production code</li>
<li>Add timeout=60 to all SPARQLClient calls in test code</li>
<li>Update sparqlite to 1.1.0 which supports timeout parameter</li>
<li>Add exit code checking in meta_process.py for child process failures</li>
<li>Add wait_for_virtuoso utility for test database readiness</li>
<li>Add database_unavailability_test.py to verify graceful failure handling</li>
</ul>
<p>When the triplestore becomes unavailable, SPARQLClient now times out
instead of hanging indefinitely, allowing proper error propagation.</p>

  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
    <span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+262</span>
    <span style="font-family: monospace; color: #cf222e; font-weight: 600;">-75</span>
    <a href="https://github.com/opencitations/oc_meta/commit/c59160b3f3182e73ebe89d74ba24ba88dff422a3" style="color: #0969da; text-decoration: none; font-weight: 500;">c59160b</a>
  </div>
</div>

### Altro

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
    <img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" />
    <div>
      <strong style="display: block; color: #1f2328;">arcangelo7</strong>
      <span style="font-size: 0.85em; color: #656d76;">Dec 20, 2025</span>
      <span style="font-size: 0.85em; color: #656d76;"> · </span>
      <a href="https://github.com/opencitations/sparqlite" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/sparqlite</a>
    </div>
  </div>
  <div style="margin: 12px 0; color: #1f2328;">
    <p>feat: add timeout parameter to SPARQLClient [release]</p>

  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
    <span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+85</span>
    <span style="font-family: monospace; color: #cf222e; font-weight: 600;">-1</span>
    <a href="https://github.com/opencitations/sparqlite/commit/8bfd31aa3ac3f01945d45fa1be4867b8782dac9c" style="color: #0969da; text-decoration: none; font-weight: 500;">8bfd31a</a>
  </div>
</div>

### Tesi

> Explain which specific system underpins the Paratext DB case study when it is first mentioned

> Regarding the ParaText scenario, it is fairly obvious that editing in a database requires a user interface, this is not specific to the complexity of the domain. As a reader, I wonder whether there is another reason why this system is a good example for the contribution of this thesis. The argument about a provenance is clearer, and maybe that could be at the centre of the scenario in 3.2.

Nella narrativa attuale sembra quasi che Paratext sia un sistema preesistente a Heritrace e che sia stato utilizzato per far emergere dei requisiti che poi Heritrace ha soddisfatto. Questo crea dei fraintendimenti in entrambi i revisori. Di conseguenza ho reso più esplicito che OC Meta è il sistema preesistente che dimostra l'esistenza di barriere sistematiche su scala, mentre Paratext è servito come piattaforma di guerilla testing per validare se la soluzione proposta, cioè Heritrace, fosse in grado di risolvere quei problemi che pur si presentano anche in Paratext. In quest'ottica, la metodologia utilizzata rientra nel cosiddetto Design Science Research, un paradigma orientato alla risoluzione di problemi che mira a estendere i confini delle capacità umane e organizzative attraverso la creazione di artefatti nuovi e innovativi. Si oppone alla behavioural research che invece indaga comportamenti esistenti per elaborare nuove teorie. Noi partiamo da una teoria esistente per elaborare una soluzione.

> The research follows a Design Science Research methodology \citep{hevnerDesignScienceInformation2004}, where the construction and evaluation of an artifact (HERITRACE) constitutes the primary contribution. Two case studies serve distinct methodological roles. OpenCitations Meta \citep{massariOpenCitationsMeta2024}, where the author participates as a contributor, provides independent validation that the identified barriers exist at scale in production systems. The ParaText Bibliographical Database was developed as an application case for HERITRACE, serving as a testbed for guerrilla testing \citep{nielsenUsabilityEngineering1993} and iterative refinement throughout the development process. This distinction is methodologically significant: OpenCitations Meta demonstrates the problem exists independently, while ParaText enables solution validation through guerrilla testing in a real-world scholarly context.

***

> The RQ could be better developed, possibly breaking it down to sub-questions.

> Why considering technically proficient users, since the RQ only targets domain experts, that are supposidely not technically savvy?

Prima:

> This challenge motivates the research question: how can we enable domain experts to participate in semantic data curation while maintaining provenance documentation, tracking changes over time, supporting flexible customization, and integrating with existing RDF collections?

Dopo:

> This challenge motivates two research questions addressing distinct operational phases:
>
> **RQ1**: How can we design interfaces that enable domain experts to curate RDF data without requiring technical expertise, while maintaining provenance documentation and change tracking?
>
> **RQ2**: How can technical staff perform one-time system configuration to adapt the curation environment to specialized domains, ensuring integration with existing RDF collections and flexible customization?
>
> RQ1 addresses the continuous curation workflow where domain experts interact with
> semantic data daily. RQ2 addresses the initial configuration phase, performed once
> by technical staff, that prepares the system for domain-specific use.

### Aldrovandi

## Domande

* Contratto di ricerca
* Cosa uso come istante di generazione delle entità di provenance per Aldrovandi? Non ricordo [https://w3id.org/changes/4/agent/morph-kgc-changes-metadata/1.0.1](https://w3id.org/changes/4/agent/morph-kgc-changes-metadata/1.0.1) va bene come agente responsabile?

Cartelle che non rispettando il naming

| Categoria                        | Conteggio | Esempio                            |
| -------------------------------- | --------- | ---------------------------------- |
| Non oggetto (materials, \_files) | 8         | `Sala1/materials`                  |
| Sub-item con lettera (27a, 74b)  | 16        | `S2-27a-FICLIT_...`                |
| Separatore spazio                | 1         | `S2-39 - Vitello...`               |
| Prefisso speciale (PT, VS, s.n.) | 6         | `S3-PT-DICAM_...`                  |
| NR con underscore                | 2         | `S6-106_...`, `S6-114_115_116-...` |
| Senza NR                         | 2         | `S1-CNR_SoffittoSala1`             |
| Sala 5 - Vetrina                 | 108       | `S5-Vetrina 1 alto N...`           |
| Sala 5 - Manoscritto             | 8         | `S5-Manoscritto-FICLIT_...`        |
| Sala 5 - Altri (A, B, CNR)       | 20        | `S5-A alto sinistra...`            |
| **TOTALE**                       | **171**   |                                    |

Riguardo questi

![Pasted image 20260112200707.png](../../../../assets/notes/attachments/pasted-image-20260112200707.png)

Qui qual è il numero?

stesso problema con robe tipo S5-B alto sinistra 2-CNR\_Miocene, S5-Manoscritto-FICLIT\_LexiconRerumInanimatarum ecc... Questi contengono le cartelle raw, rawp, dhco, e dhcoo

## Memo

Vizioso

* [https://en.wikipedia.org/wiki/Compilers:\_Principles,\_Techniques,\_and\_Tools](https://en.wikipedia.org/wiki/Compilers:_Principles,_Techniques,_and_Tools)

* [https://en.wikipedia.org/wiki/GNU\_Bison](https://en.wikipedia.org/wiki/GNU_Bison)

* [https://en.wikipedia.org/wiki/Yacc](https://en.wikipedia.org/wiki/Yacc)

* HERITRACE
  * C'è un bug che si verifica quando uno seleziona un'entità preesistente, poi clicca sulla X e inserisce i metadati a mano. Alcuni metadati vengono duplicati.
  * Se uno ripristina una sotto entità a seguito di un merge, l'entità principale potrebbe rompersi.

* Meta
  * Bisogna produrre la tabella che associa temp a OMID per produrre le citazioni.

* OpenCitations
  * Rifare dump (CrossRef e DataCite)
  * Risolvere la questione ORCID
  * Rilanciare processo eliminazione duplicati

* "reference": { "@id": "frbr:part", "@type": "@vocab" } → bibreference

* "crossref": { "@id": "biro:references", "@type": "@vocab"} → reference

* "crossref": "datacite:crossref"

* Ripubblicare dbpedia agnostica su Zenodo e si può usare time-agnostic-library su db pedia agnostica

* oc\_ocdm

  * Automatizzare mark\_as\_restored di default. è possibile disabilitare e fare a mano mark\_as\_restored.

* [https://opencitations.net/meta/api/v1/metadata/doi:10.1093/acprof:oso/9780199977628.001.0001](https://opencitations.net/meta/api/v1/metadata/doi:10.1093/acprof:oso/9780199977628.001.0001)

* Guida per Meta e cerotti

* DELETE con variabile

* Modificare Meta sulla base della tabella di Elia

* embodiment multipli devono essere purgati a monte

* Portare il Meta Editor fuori. oc\_editor

* Modificare documentazione API aggiungendo omid

* Heritrace
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

* Meta
  * Fusione: chi ha più metadati compilati. A parità di metadato si tiene l’omid più basso
  * Issue github parallelizzazione virtuoso
  * frbr:partOf non deve aggiungere nel merge: [https://opencitations.net/meta/api/v1/metadata/omid:br/06304322094](https://opencitations.net/meta/api/v1/metadata/omid:br/06304322094)
  * API v2
  * Usare il triplestore di provenance per fare 303 in caso di entità mergiate o mostrare la provenance in caso di cancellazione e basta.

* RML

  * Vedere come morh kgc rappresenta database internamente
  * [https://dylanvanassche.be/assets/pdf/iswc2024-krown-benchmark-rdf-graph-materialisation.pdf](https://dylanvanassche.be/assets/pdf/iswc2024-krown-benchmark-rdf-graph-materialisation.pdf)

  [https://github.com/oeg-upm/gtfs-bench](https://github.com/oeg-upm/gtfs-bench)

  * Chiedere Ionannisil diagramma che ha usato per auto rml.

* Crowdsourcing
  * Quando dobbiamo ingerire Crossref stoppo manualmente OJS. Si mette una nota nel repository per dire le cose. Ogni mese.
  * Aggiornamenti al dump incrementali. Si usa un nuovo prefisso e si aggiungono dati solo a quel CSV.
  * Bisogna usare il DOI di Zenodo come primary source. Un unico DOI per batch process.
  * Bisogna fare l’aggiornamento sulla copia e poi bisogna automatizzare lo switch

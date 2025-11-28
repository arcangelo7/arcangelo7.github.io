---
title: 2023-10-03 CZI first steps
editUrl: false
---

## Novità

**Phd**

* Bugfix:
  * Visualizzazione linea del tempo
  * Possibilità di aggiungere predicati che hanno già raggiunto il numero massimo di valori

* Punto interrogativo cursore hover: non puoi cancellare / aggiungere

* Ho modificato shacle in maniera tale che fabio:Expression sia obbligatorio (minCount 1 e maxCount 1) mentre tutti gli altri valori di type sono opzionali (minCount 0 e maxCount 1)

  ```python
  sh:property
    [
      sh:path rdf:type ;
      sh:hasValue fabio:Expression ;
      sh:minCount 1 ;
      sh:maxCount 1 ;
    ] ;
    # General property shape for rdf:type
    sh:property
  	[
      sh:path rdf:type ;
      sh:in (fabio:ArchivalDocument
        fabio:Book
        fabio:BookChapter
        doco:Part
        fabio:ExpressionCollection
        fabio:BookSeries
        fabio:BookSet
        fabio:DataFile
        fabio:Thesis
        fabio:JournalArticle
        fabio:JournalIssue
        fabio:JournalVolume
        fabio:Journal
        fabio:ProceedingsPaper
        fabio:AcademicProceedings
        fabio:ReferenceBook
        fabio:ReferenceEntry
        fabio:ReportDocument
        fabio:Series
        fabio:SpecificationDocument) ;
      sh:minCount 0 ;
      sh:maxCount 1 ;
    ] ;
  ```

* Se presente lista di valori, vengono mostrati in un select option sia per la modifica che per l’aggiunta. Doppia validazione lato server

* Proprietà non cliccabili

* Configurazione
  * Data di creazione del dataset usata per snapshot di creazione in loro assenza

* Fonte primaria versione in caso di reverse snapshot. Modificare anche descrizione

* URL entity-history furbo (timestamp e versione). Gestiti out of index e date nel passato

* Valori raggruppato per proprietà

**CZI**

* Ho dato il mio contributo selezionando idee rilevanti e aggiungendo OpenCitations e SOftware Heritage all’elenco delle risorse
  * For a long time now a lot of different methods and tools co-exist to detect, disambiguate and characterize software mentions in scientific publications. But there is no gold dataset, no complete and exhaustive dataset of annotated publications widely approved by the scientific community. Such a dataset would be useful to be able to easily compare the results of different tools.
  * There's a gap between academic papers and data/code repositories due to the absence of bidirectional links. We propose to develop a tool that connects scientific papers to their relevant GitHub repositories and vice versa. Our approach involves devising algorithms to search both academic platforms and GitHub for mutual references, integrating features into the tool for automatic link creation, and incorporating capabilities to auto-comment on platforms like arXiv when a corresponding GitHub repository is detected. Ultimately, we aim to promote the significance of traceability, emphasizing its importance to both the academic and developer communities.
  * The [OpenAIRE Graph](https://docs.google.com/document/d/14WhnHJ3U4cQkMfu_2qrhSI3hrMN2L8as0vuemvvsczg/edit#heading=h.byw61pea4rgf) is a massive scholarly graph that collects metadata and links between research products (articles, datasets, software, and other research products), entities like organizations, funders, funding streams, projects, communities, and data sources. Specifically, OpenAIRE collects publication-to-software relations by (a) extracting them from the full text of Open Access publications, and (b) harvesting them from institutional repositories. In the context of this project, we propose to analyze the overlap of those publication-to-software relations collected by OpenAIRE with those reported by the CZI software mentions dataset. Furthermore, based on the results of the previous analysis, it could be beneficial to integrate the CZI software mentions dataset with the OpenAIRE Graph, enriching it with new publication-to-software relations.

**Passaggio d’anno**

* Compilazione modulo attività svolte e scrittura relazione

## Domande

* Facciamo del sacro rifletto: [https://github.com/opencitations/oscar/blob/master/doc/README.md](https://github.com/opencitations/oscar/blob/master/doc/README.md)

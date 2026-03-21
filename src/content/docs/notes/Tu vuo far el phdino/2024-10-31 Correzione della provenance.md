---
title: 2024-10-31 Correzione della provenance
editUrl: false
---

## La Novitade

### Meta

* Aggiunti controlli sulla provenance anche per l’esito della fusione tra id
  * Mi sono accorto di problemi di provenance preesistenti che francamente hanno abbastanza reso → Script per fixarli tutti
* Script per fixare problemi di provenance preesistenti (testato)
  * Le correzioni vengono applicate solo quando necessarie (non sovrascrive dati validi esistenti)
  * Aggiunge `prov:specializationOf` mancante tra uno snapshot e la sua entità
  * Ricostruisce la catena di `prov:wasDerivedFrom` tra snapshot consecutivi quando mancante
  * Corregge o aggiunge `prov:generatedAtTime` per gli snapshot:
    * Per il primo snapshot: imposta una data di default (20 Dicembre 2022, data di generazione di Meta)
    * Per gli altri snapshot: usa il timestamp di invalidazione dello snapshot precedente
  * Corregge o aggiunge `prov:invalidatedAtTime` per gli snapshot:
    * Per tutti gli snapshot tranne l'ultimo: usa il timestamp di generazione dello snapshot successivo
  * Rimuove timestamp duplicati quando uno snapshot ha più di un valore per `generatedAtTime` o `invalidatedAtTime`
  * In assenza di `invalidatedAtTime` dello snapshot precedente e in assenza di `generatedAtTime` dello snapshot corrente, viene usata una data intermedia.
  * Aggiunge la timezone se assente, convertendo da Rome/Europe a UTC
* Noi normalizziamo i titoli, ma Francesca non vuole giustamente → Nuovo parametro di configurazione per Meta, `normalize_titles`, di default a `True`

### HERITRACE

* Performance
  * Binding eventi dinamici sui singoli elementi → Event delegation
  * Le query sullo shacl vengono eseguite una sola volta a inizio applicazione e messe in cache. Tutto ciò che serve è organizzato in un dizionario.

* Datatype inferito dallo shacl in fase di creazione di nuove proprietà di un’entità esistente (era già così per la creazione da zero)

* Il file di conigurazione yaml per le regole di visualizzazione aveva superato le 2000 righe, con moltissimo codice ripetuto
  * Fortunatamente, yaml permette di definire e riutilizzare variabili
  * Ad esempio, le query sparql erano spesso ripetute
  * Purtroppo YAML non supporta l’importazione di file esterni, altrimenti il tutto sarebbe stato ancora più modulare e gestibile
  * Raggruppate le query sparql siamo scesi a 1221 righe, ancora troppo visto che dovrò aggiungere mille mila classi → Ho raggruppato anche le proprietà in comune → 1108 righe, ancora troppe

* Nuove classi
  * BR
    * fabio:Thesis
    * fabio:Review
    * fabio:ReviewArticle
    * fabio:ReferenceBook
    * fabio:AcademicProceedings
  * AR
    * pro:translator (ce l’hanno tutti a parte journal, volume, issue, academic proceedings)

* L’abstract pone un nuovo problema, ovvero consentire al configuratore di decidere il tipo di input sulla base della proprietà (in questo caso una textarea)

  * Nuovo parametro di configurazione a livello di proprietà: `inputType`: "textarea”
  * In assenza di questo parametro il tipo di input viene inferito dal datatype. se presente. Defaut text

  ```json
      datatype_to_input = {
          "http://www.w3.org/2001/XMLSchema#string": "text",
          "http://www.w3.org/2001/XMLSchema#integer": "number",
          "http://www.w3.org/2001/XMLSchema#decimal": "number",
          "http://www.w3.org/2001/XMLSchema#float": "number",
          "http://www.w3.org/2001/XMLSchema#double": "number",
          "http://www.w3.org/2001/XMLSchema#boolean": "checkbox",
          "http://www.w3.org/2001/XMLSchema#date": "date",
          "http://www.w3.org/2001/XMLSchema#time": "time",
          "http://www.w3.org/2001/XMLSchema#dateTime": "datetime-local",
          "http://www.w3.org/2001/XMLSchema#anyURI": "url",
          "http://www.w3.org/2001/XMLSchema#email": "email"
      }
  ```

* Keywords
  * Ho usato prism:keyword
  * `inputType: “tag”`. Non è HTML5 ma direi che rende l’idea
  * Lavorerò successivamente a un modo carino per creare, visualizzare e modificare i tag, che non mi piacciono gli input text

* APP\_TITLE = 'ParaText’ in config.py

* Nuova casistica da gestire: proprietà che hanno come possibile valore più di un template

  ```turtle
    sh:property [
      sh:path frbr:partOf ;
      sh:or (
        [ sh:node schema:IssueShape ]
        [ sh:node schema:VolumeShape ]
        [ sh:node schema:JournalShape ]
      ) ;
      sh:minCount 0 ;
      sh:maxCount 1 ;
    ] ;
  ```

* Campi d’inserimento: spaziatura 3rem → 2rem

### Altro

* Esiste un KU Leuven Joint PhD Team: il mio cuore esulta di gioia. Mi hanno risposto in meno di 24 e hanno anche rimosso i crediti formativi da ottenere presso la KU Leuven dal mio curriculum. Tutto ciò è sbalorditivo

  ![attachments/3d97e1df73df43a2837ef56abc10af7c.png](../../../../assets/notes/attachments/3d97e1df73df43a2837ef56abc10af7c.png)

## Domande

* In cosa può essere contenuta una review? In un book, in un journal? In un academic proceedings?
* A cosa mappo Collaborator? A pro:contributor?
* E a cosa mappo editor of text? Qual è la differenza con editor?
  * IDK
* A cosa mappo editor of bundle? Il fatto che un editor sia associato a un bundle non lo rende di per se editor of bundle? C’è bisogno di una classe separata?
  * What is a bundle?
* A cosa mappo commentator?
  * Avete il commento? Problema di modellazione. Poi il problema è se aggiungi i commenti. Noi questo ruolo non lo abbiamo, cosa intendete?
* A cosa mappo monograph? fabio:Book?
  * Sì
* A cosa mappo edition? A fabio:CriticalEdition?
  * Cosa intendete?
* A cosa mappo edition with translation?
  * Non ce l’abbiamo nel data model
* A cosa mappo translation?
  * Sono differenti espressioni, basta aggiungere il translator
* A cosa mappo Festschrift?
  * Non ce l’abbiamo.
* A cosa mappo Article in book? fabio:BookChapter?
  * Sì
* A cosa mappo miscellany?
  * No
* A cosa mappo collected essayes? fabio:Anthology? (A collection of selected literary or scholastics works, for example poems, short stories, plays or research papers)
  * Spiego cosa intengo per anthology
* Per semplicità, per l’abstract pensavo di usare dcterms:asbtract, idem per prism:keyword
* Un fabio:ReviewArticle è frbr:partOf fabio:JournalIssue?

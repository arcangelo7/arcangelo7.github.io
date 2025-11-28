---
title: 2024-09-18 HERITRACE issue, volume, journal
editUrl: false
---

## La Novitade

HERITRACE

```
    # Database configuration
    DATASET_DB_TYPE = 'docker'  # 'endpoint' or 'docker'
    DATASET_DB_TRIPLESTORE = 'virtuoso' # virtuoso or blazegraph
    DATASET_DB_URL = 'http://localhost:8890/sparql'
    DATASET_DB_DOCKER_IMAGE = 'openlink/virtuoso-opensource-7@sha256:c08d54120b8085234f8244951232553428e235543412e41d75705736a3026f1b'
    DATASET_DB_DOCKER_PORT = 8890
    DATASET_DB_DOCKER_ISQL_PORT = 1111
    DATASET_DB_VOLUME_PATH = os.path.join(BASE_DIR, 'data', 'dataset_db')

    PROVENANCE_DB_TYPE = 'docker'  # 'endpoint' or 'docker'
    PROVENANCE_DB_TRIPLESTORE = 'virtuoso' # virtuoso or blazegraph
    PROVENANCE_DB_URL = 'http://localhost:8891/sparql'
    PROVENANCE_DB_DOCKER_IMAGE = 'openlink/virtuoso-opensource-7@sha256:c08d54120b8085234f8244951232553428e235543412e41d75705736a3026f1b'
    PROVENANCE_DB_DOCKER_PORT = 8891
    PROVENANCE_DB_DOCKER_ISQL_PORT = 1112
    PROVENANCE_DB_VOLUME_PATH = os.path.join(BASE_DIR, 'data', 'provenance_db')
```

* All’avvio i container vengono pullati e avviati. Al signterm, sigint i container vengono stoppati ma non cancellati. Al riavvio i container esistenti vengono avviati.

* Se si usa virtuoso, vengono escluse da tutte le query i named graph che contengono le triple predefinite di virtuoso

* Virtuoso è solo un quadstore, non si può usare come triplestore: [https://github.com/openlink/virtuoso-opensource/issues/417](https://github.com/openlink/virtuoso-opensource/issues/417)
  * Nuovi parametri di configurazine,  DATASET\_IS\_QUADSTORE, PROVENANCE\_IS\_QUADSTORE. Ora Heritrace gestisce anche quadruple. Tuttavia, lo fa di nascosto. All’utente vengono mostrate le stesse cose per triple e quadruple

* Ho spostato nello shacle gli elementi di modellazione (proprietà obbligatorie, valori multipli per proprietà) che stavo gestendo nello yaml. Ora lo yaml usa la chiave shapeper impostare regole di visualizzazione specifiche per una shape.

  ```yaml
  - class: "http://purl.org/spar/fabio/JournalArticle"
    displayName: "Journal Article"
    displayProperties:
      - property: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
        displayName: "Type"
        shouldBeDisplayed: true
      - property: "http://purl.org/spar/datacite/hasIdentifier"
        displayName: "Identifier"
        shouldBeDisplayed: true
        fetchValueFromQuery: |
              PREFIX datacite: <http://purl.org/spar/datacite/>
              PREFIX literal: <http://www.essepuntato.it/2010/06/literalreification/>
              SELECT (CONCAT(STRAFTER(STR(?scheme), "http://purl.org/spar/datacite/"), ":", ?literal) AS ?id) ?identifier
              WHERE {
                  [[subject]] datacite:hasIdentifier ?identifier.
                  BIND([[value]] AS ?identifier)
                  ?identifier datacite:usesIdentifierScheme ?scheme;
                              literal:hasLiteralValue ?literal.
              }
      - property: "http://purl.org/dc/terms/title"
        displayName: "Title"
        shouldBeDisplayed: true
      - property: "http://purl.org/spar/pro/isDocumentContextFor"
        orderedBy: "https://w3id.org/oc/ontology/hasNext"
        intermediateRelation:
          class: "http://purl.org/spar/pro/RoleInTime"
          targetEntityType: "http://xmlns.com/foaf/0.1/Agent"
        displayRules:
          - shape: "http://schema.org/AuthorShape"
            displayName: "Author"
            fetchValueFromQuery: |
              PREFIX pro: <http://purl.org/spar/pro/>
              PREFIX foaf: <http://xmlns.com/foaf/0.1/>
              SELECT DISTINCT ?formattedName ?ra WHERE {
                  [[value]] pro:isHeldBy ?ra;
                      pro:withRole pro:author.
                  OPTIONAL { ?ra foaf:name ?name. }
                  OPTIONAL { ?ra foaf:familyName ?familyName. }
                  OPTIONAL { ?ra foaf:givenName ?givenName. }
                  BIND(
                      IF(BOUND(?name), ?name,
                          IF(BOUND(?familyName) && BOUND(?givenName), CONCAT(?familyName, ", ", ?givenName),
                              IF(BOUND(?familyName), CONCAT(?familyName, ","), 
                                  IF(BOUND(?givenName), CONCAT(",", ?givenName), "")
                              )
                          )
                      ) AS ?formattedName
                  )
              }
          - shape: "http://schema.org/EditorShape"
            displayName: "Editor"
            fetchValueFromQuery: |
              PREFIX pro: <http://purl.org/spar/pro/>
              PREFIX foaf: <http://xmlns.com/foaf/0.1/>
              SELECT DISTINCT ?formattedName ?ra WHERE {
                  [[value]] pro:isHeldBy ?ra;
                      pro:withRole pro:editor.
                  OPTIONAL { ?ra foaf:name ?name. }
                  OPTIONAL { ?ra foaf:familyName ?familyName. }
                  OPTIONAL { ?ra foaf:givenName ?givenName. }
                  BIND(
                      IF(BOUND(?name), ?name,
                          IF(BOUND(?familyName) && BOUND(?givenName), CONCAT(?familyName, ", ", ?givenName),
                              IF(BOUND(?familyName), CONCAT(?familyName, ","), 
                                  IF(BOUND(?givenName), CONCAT(",", ?givenName), "")
                              )
                          )
                      ) AS ?formattedName
                  )
              }
          - shape: "http://schema.org/PublisherShape"
            displayName: "Publisher"
            fetchValueFromQuery: |
              PREFIX pro: <http://purl.org/spar/pro/>
              PREFIX foaf: <http://xmlns.com/foaf/0.1/>
              SELECT DISTINCT ?formattedName ?ra WHERE {
                  [[value]] pro:isHeldBy ?ra;
                      pro:withRole pro:publisher.
                  OPTIONAL { ?ra foaf:name ?name. }
                  OPTIONAL { ?ra foaf:familyName ?familyName. }
                  OPTIONAL { ?ra foaf:givenName ?givenName. }
                  BIND(
                      IF(BOUND(?name), ?name,
                          IF(BOUND(?familyName) && BOUND(?givenName), CONCAT(?familyName, ", ", ?givenName),
                              IF(BOUND(?familyName), CONCAT(?familyName, ","), 
                                  IF(BOUND(?givenName), CONCAT(",", ?givenName), "")
                              )
                          )
                      ) AS ?formattedName
                  )
              }
      - property: "http://prismstandard.org/namespaces/basic/2.0/publicationDate"
        displayName: "Publication Date"
        shouldBeDisplayed: true
      - property: "http://purl.org/vocab/frbr/core#embodiment"
        displayName: "Page"
        shouldBeDisplayed: true
        fetchValueFromQuery: |
            PREFIX frbr: <http://purl.org/vocab/frbr/core#>
            PREFIX prism: <http://prismstandard.org/namespaces/basic/2.0/>
            SELECT 
                (IF(BOUND(?startingPage) && BOUND(?endingPage), 
                    CONCAT(STR(?startingPage), "-", STR(?endingPage)), 
                    IF(BOUND(?startingPage), STR(?startingPage), 
                    IF(BOUND(?endingPage), STR(?endingPage), ""))) AS ?page) 
              ?re
            WHERE {
                [[subject]] frbr:embodiment ?re.
                OPTIONAL { ?re prism:startingPage ?startingPage. }
                OPTIONAL { ?re prism:endingPage ?endingPage. }
            }
      - property: "http://purl.org/vocab/frbr/core#partOf"
        displayRules:
          - shape: "http://schema.org/IssueShape"
            displayName: "Issue"
            fetchValueFromQuery: |
              PREFIX fabio: <http://purl.org/spar/fabio/>
              PREFIX frbr: <http://purl.org/vocab/frbr/core#>
              SELECT ?issueNumber ?issue
              WHERE {
                  [[subject]] frbr:partOf ?issue.
                  ?issue a fabio:JournalIssue;
                      fabio:hasSequenceIdentifier ?issueNumber.
              }
          - shape: "http://schema.org/VolumeShape"
            displayName: "Volume"
            fetchValueFromQuery: |
              PREFIX fabio: <http://purl.org/spar/fabio/>
              PREFIX frbr: <http://purl.org/vocab/frbr/core#>
              PREFIX foaf: <http://xmlns.com/foaf/0.1/>
              SELECT ?volumeNumber ?volume
              WHERE {
                  [[subject]] frbr:partOf+ ?volume.
                  ?volume a fabio:JournalVolume;
                      fabio:hasSequenceIdentifier ?volumeNumber.
              }
          - shape: "http://schema.org/JournalShape"
            displayName: "Journal"
            fetchValueFromQuery: |
              PREFIX fabio: <http://purl.org/spar/fabio/>
              PREFIX frbr: <http://purl.org/vocab/frbr/core#>
              PREFIX dcterms: <http://purl.org/dc/terms/>
              SELECT ?journalName ?journal
              WHERE {
                  [[subject]] frbr:partOf+ ?journal.
                  ?journal a fabio:Journal;
                      dcterms:title ?journalName.
              }

  ```

* Issue, volume, journal

### RML

* Interfaccia per i test
* I test mysql si rompono per colpa delle colonne non case-sensitive. Su rml i test sono tutti case insensitive per questo motivo. Inoltre richiedono delle query di upload diverse. Ad esempio

  ```sql
  # mysql
  USE r2rml;
  DROP TABLE IF EXISTS r2rml.Student;
  CREATE TABLE Student (
    Name VARCHAR(50)
  );

  # postgresql
  DROP TABLE IF EXISTS "Student" cascade;
  CREATE TABLE "Student" ("Name" varchar(50));
  ```

  * Codice di Tiyj più robusto

    * Gestisce query sql invalide nel mapping
    * Gestisce output non creato per altri errori nel processo di rml
    * Mapping senza subject map
    * Dati RDF generati invalidi

    ```python
    elif object_term_type == RML_LITERAL:
        object_map_value = f'"{object_map_value}"'
    ```

### time-agnostic-library

* Blazegraph non aggiungeva il datatype string automaticamente ai literal, Virtuoso sì. Se si ripristina una versione di Blazegraph di un’entità la query sparql giustamente ripristina l’elemento senza datatype, ma l’elemento finisce su Virtuoso col datatype. Questo ovviamente rompe la materializzazione delle versioni precedenti, in quanto l’elemento attuale non viene mai cancellato.
  * Virtuoso preserva l’assenza di datatype se i dati vengono aggiunti tramite load di file, ma aggiunge il datatype se vengono aggiunti tramite query sparql
  * Non c’è modo di prevenire questo comportamento di Virtuoso
  * time-agnostic-library per la cancellazione della prima batteria di triple rispetto allo stato corrente dei dati fa il match dei literal e privilegia il datatype del grafo corrente in caso di match

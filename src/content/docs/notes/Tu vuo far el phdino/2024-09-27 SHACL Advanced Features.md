---
title: 2024-09-27 SHACL Advanced Features
editUrl: false
---

## La Novitade

### HERITRACE

* Se un valore ha tra i datatype, xsd:date, xsd:gYearMonth o xsd:gYear
  * Di dault c’è il selettore per la data, ma è possibile selezionare anche gli altri formati.
  * Rimane la possibilità di inserire il valore a mano per gli utenti sgamati
* Di default vengono mostrati solo i campi obbligatori. Gli altri devono essere aggiunti a mano.
* Gestione dinamica del required
* Validazione
  * Ci vuole coraggio per riuscire a inserire dati invalidi con un form che ti forza in ogni modo a inserirne di validi, comunque è buona pratica validare sia frontend che backend, quindi famolo
  * Frontend
    * Bisogna specificare almeno una proprietà
    * I campi obbligatorio vanno compilati
    * Validazione url
    * Validazione datatype
    * Validazione condizioni (regex)
  * Backend
    * Se c’è shacl,
      * il tipo è obbligatorio e dev’essere tra i tipi previsti
      * Le proprietà devono essere previste per quel tipo
      * Il minimo e il massimo di proprietà per un campo devono corrispondere a quelle attese
      * I datatype devono essere quelli attesi
      * Se ci sono valori opzionali, il valore deve rientrare in quelli opzionali
    * Se non c’è shacl
      * Gli URI devono essere URI
  * [https://www.w3.org/TR/shacl-af/](https://www.w3.org/TR/shacl-af/)

    ```turtle
    schema:JournalArticleIdentifierShape
      a sh:NodeShape ;
      sh:targetClass datacite:Identifier ;
      sh:property [
        sh:path rdf:type ;
        sh:hasValue datacite:Identifier ;
        sh:minCount 1 ;
        sh:maxCount 1 ;
      ] ;
      sh:property [
        sh:path literal:hasLiteralValue ;
        sh:datatype xsd:string ;
        sh:minCount 1 ;
        sh:maxCount 1 ;
      ] ;
      sh:property [
        sh:path datacite:usesIdentifierScheme ;
        sh:minCount 1 ;
        sh:maxCount 1 ;
      ] ;
      sh:property [
        sh:path literal:hasLiteralValue ;
        sh:condition [
          sh:path datacite:usesIdentifierScheme ;
          sh:hasValue datacite:doi ;
        ] ;
        sh:pattern "^10\\.\\d{4,9}/[-._;()/:A-Z0-9]+$" ;
        sh:message "DOI must start with '10.' followed by a prefix and a suffix" ;
      ] ;
      sh:property [
        sh:path literal:hasLiteralValue ;
        sh:condition [
          sh:path datacite:usesIdentifierScheme ;
          sh:hasValue datacite:pmid ;
        ] ;
        sh:pattern "^\\d+$" ;
        sh:message "PMID must contain only numbers" ;
      ] ;
      sh:property [
        sh:path literal:hasLiteralValue ;
        sh:condition [
          sh:path datacite:usesIdentifierScheme ;
          sh:hasValue datacite:pmcid ;
        ] ;
        sh:pattern "^PMC\\d+$" ;
        sh:message "PMCID must start with 'PMC' followed by numbers" ;
      ] ;
      sh:property [
        sh:path literal:hasLiteralValue ;
        sh:condition [
          sh:path datacite:usesIdentifierScheme ;
          sh:hasValue datacite:openalex ;
        ] ;
        sh:pattern "^W\\d+$" ;
        sh:message "OpenAlex work ID must start with 'W' followed by numbers" ;
      ] ;
      sh:property [
        sh:path [sh:inversePath datacite:hasIdentifier] ;
        sh:node schema:JournalArticleShape ;
      ] .

    ```

    * I pattern li ho presi da oc\_idmanager
    * OpenAlex Journal Id ≠ work id (W, S)

### DSH

* Ho scritto all’EIC e ho aggiornato la versione presente su arxiv, che mi sono accorto essere ancora quella della conferenza
* Pare che non abbiamo ancora dei revisori sigh

### Francesca

* Ho caricato i suoi dati su un’istanza di Meta su Virtuoso sul container creto da Vitale
* Ho configurato Heritrace per funzionare su quei dati
* Senza un interfaccia di ricerca semplice e avanzata è chiaramente inutilizzabile

### Meta

* Fine fusione id
  * Ho controllato che
    * Gli id fusi non fossero nei dati e quelli sopravvissuti ci fossero
    * Che gli id sopravvissuti avessero
      * 1 literal value Literal
      * 1 identifier scheme URIRef
    * Sia nei dati che sull’endpoint
    * Sull’endpoint ho controllato che le entità fuse non siano referenziate da nessun’entità

### API

* Unittest
  * esempi + casi eliaci
* [https://github.com/opencitations/api/issues/15](https://github.com/opencitations/api/issues/15)
* [https://github.com/opencitations/api/issues/14](https://github.com/opencitations/api/issues/14)
* [https://github.com/opencitations/api/issues/13](https://github.com/opencitations/api/issues/13)
  * Misteriosamente la query SPARQL con con Blazegraph ritornava gli autori nel giusto ordine, con Virtuoso li ritorna nell’ordina sbagliato. Ci ho riflettuto a lungo, ho constatato che prima dell’aggregazione i risultati sono correttamente ordinati in ordine discendente per numero di salti fatti tramite oco:hasNext, ma dopo l’aggregazione l’ordine va perso, come se l’aggregazione ignorasse l’ordine.
  * L’unica soluzione che ho trovato è ordinare in Python 😢
* [https://github.com/opencitations/api/issues/12](https://github.com/opencitations/api/issues/12)
* Aggiornato gli esempi
* Tutte le modifiche sono in master. Sto completamente ignorando il branch di test. Per me possiamo anche toglierlo.
* [https://github.com/opencitations/api/issues/16](https://github.com/opencitations/api/issues/16)

```sparql
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX pro: <http://purl.org/spar/pro/>
PREFIX literal: <http://www.essepuntato.it/2010/06/literalreification/>
PREFIX datacite: <http://purl.org/spar/datacite/>
PREFIX dcterm: <http://purl.org/dc/terms/>
PREFIX frbr: <http://purl.org/vocab/frbr/core#>
PREFIX fabio: <http://purl.org/spar/fabio/>
PREFIX prism: <http://prismstandard.org/namespaces/basic/2.0/>
PREFIX oco: <https://w3id.org/oc/ontology/>

SELECT DISTINCT
?id
(STR(?title) AS ?title)
(GROUP_CONCAT(DISTINCT ?author_info; SEPARATOR="|") AS ?author)
(STR(?pub_date) AS ?pub_date)
(STR(?issue) AS ?issue)
(STR(?volume) AS ?volume)
?venue
?type
?page
(GROUP_CONCAT(DISTINCT ?publisher_info; SEPARATOR="|") AS ?publisher)
(GROUP_CONCAT(DISTINCT ?combined_editor_info; SEPARATOR="|") AS ?editor)
WHERE {
    {
        SELECT ?res ?title ?author_info ?combined_editor_info ?publisher_info ?type ?pub_date ?page ?issue ?volume ?venueName ?venueMetaid
        (GROUP_CONCAT(DISTINCT ?id ; SEPARATOR=" ") AS ?ids)
        (GROUP_CONCAT(DISTINCT ?venue_ids_; SEPARATOR=' ') AS ?venue_ids)
        WHERE {
            [[ids]]
            OPTIONAL {
                ?res datacite:hasIdentifier ?allIdentifiers.
                ?allIdentifiers datacite:usesIdentifierScheme ?allSchemes;
                                literal:hasLiteralValue ?allLiteralValues.
                BIND(CONCAT(STRAFTER(STR(?allSchemes), "http://purl.org/spar/datacite/"), ":", ?allLiteralValues) AS ?id)
            }
            OPTIONAL {
                ?res pro:isDocumentContextFor ?arAuthor.
                ?arAuthor pro:withRole pro:author;
                        pro:isHeldBy ?raAuthor.
                OPTIONAL {
                    ?arAuthor oco:hasNext ?nextAuthorRole .
                }
                BIND(STRAFTER(STR(?arAuthor), "https://w3id.org/oc/meta/ar/") AS ?roleUri)
                BIND(STRAFTER(STR(?nextAuthorRole), "https://w3id.org/oc/meta/ar/") AS ?nextRoleUri)
                BIND(CONCAT("omid:ra/", STRAFTER(STR(?raAuthor), "/ra/")) AS ?author_metaid)
                OPTIONAL {?raAuthor foaf:familyName ?familyName.}
                OPTIONAL {?raAuthor foaf:givenName ?givenName.}
                OPTIONAL {?raAuthor foaf:name ?name.}
                OPTIONAL {
                    ?raAuthor datacite:hasIdentifier ?authorIdentifier.
                    ?authorIdentifier datacite:usesIdentifierScheme ?authorIdSchema;
                                        literal:hasLiteralValue ?authorIdLiteralValue.
                    BIND(CONCAT(STRAFTER(STR(?authorIdSchema), "http://purl.org/spar/datacite/"), ":", ?authorIdLiteralValue) AS ?author_id)
                }
                BIND(
                    IF(
                        STRLEN(STR(?familyName)) > 0 && STRLEN(STR(?givenName)) > 0,
                        CONCAT(?familyName, ", ", ?givenName),
                        IF(
                            STRLEN(STR(?familyName)) > 0,
                            CONCAT(?familyName, ","),
                            ?name
                        )
                    )
                AS ?authorName)
                BIND(
                    IF(
                        STRLEN(STR(?author_id)) > 0,
                        CONCAT(?authorName, " [", ?author_id, " ", ?author_metaid, "]"),
                        CONCAT(?authorName, " [", ?author_metaid, "]")
                    )
                AS ?author_)
                BIND(CONCAT(?author_, ":", ?roleUri, ":", COALESCE(?nextRoleUri, "")) AS ?author_info)
            }
            OPTIONAL {
                ?res pro:isDocumentContextFor ?arEditor.
                ?arEditor pro:withRole pro:editor;
                            pro:isHeldBy ?raEditor.
                OPTIONAL {
                    ?arEditor oco:hasNext ?nextEditorRole .
                }
                BIND(STRAFTER(STR(?arEditor), "https://w3id.org/oc/meta/ar/") AS ?editorRoleUri)
                BIND(STRAFTER(STR(?nextEditorRole), "https://w3id.org/oc/meta/ar/") AS ?nextEditorRoleUri)
                BIND(CONCAT("omid:ra/", STRAFTER(STR(?raEditor), "/ra/")) AS ?editor_metaid)
                OPTIONAL {?raEditor foaf:familyName ?editorFamilyName.}
                OPTIONAL {?raEditor foaf:givenName ?editorGivenName.}
                OPTIONAL {?raEditor foaf:name ?editor_name.}
                OPTIONAL {
                    ?raEditor datacite:hasIdentifier ?editorIdentifier.
                    ?editorIdentifier datacite:usesIdentifierScheme ?editorIdSchema;
                                    literal:hasLiteralValue ?editorIdLiteralValue.
                    BIND(CONCAT(STRAFTER(STR(?editorIdSchema), "http://purl.org/spar/datacite/"), ":", ?editorIdLiteralValue) AS ?editor_id)
                }
                BIND(
                    IF(
                        STRLEN(STR(?editorFamilyName)) > 0 && STRLEN(STR(?editorGivenName)) > 0,
                        CONCAT(?editorFamilyName, ", ", ?editorGivenName),
                        IF(
                            STRLEN(STR(?editorFamilyName)) > 0,
                            CONCAT(?editorFamilyName, ","),
                            ?editor_name
                        )
                    )
                AS ?editorName)
                BIND(
                    IF(
                        STRLEN(STR(?editor_id)) > 0,
                        CONCAT(?editorName, " [", ?editor_id, " ", ?editor_metaid, "]"),
                        CONCAT(?editorName, " [", ?editor_metaid, "]")
                    )
                AS ?editor_)
                BIND(CONCAT(?editor_, ":", ?editorRoleUri, ":", COALESCE(?nextEditorRoleUri, "")) AS ?editor_info)
            }
            OPTIONAL {
                ?res frbr:partOf ?container.
                ?container pro:isDocumentContextFor ?arContainerEditor.
                ?arContainerEditor pro:withRole pro:editor;
                                pro:isHeldBy ?raContainerEditor.
                OPTIONAL {
                    ?arContainerEditor oco:hasNext ?nextContainerEditorRole .
                }
                BIND(STRAFTER(STR(?arContainerEditor), "https://w3id.org/oc/meta/ar/") AS ?containerEditorRoleUri)
                BIND(STRAFTER(STR(?nextContainerEditorRole), "https://w3id.org/oc/meta/ar/") AS ?nextContainerEditorRoleUri)
                BIND(CONCAT("omid:ra/", STRAFTER(STR(?raContainerEditor), "/ra/")) AS ?container_editor_metaid)
                OPTIONAL {?raContainerEditor foaf:familyName ?containerEditorFamilyName.}
                OPTIONAL {?raContainerEditor foaf:givenName ?containerEditorGivenName.}
                OPTIONAL {?raContainerEditor foaf:name ?container_editor_name.}
                OPTIONAL {
                    ?raContainerEditor datacite:hasIdentifier ?containerEditorIdentifier.
                    ?containerEditorIdentifier datacite:usesIdentifierScheme ?containerEditorIdSchema;
                                                literal:hasLiteralValue ?containerEditorIdLiteralValue.
                    BIND(CONCAT(STRAFTER(STR(?containerEditorIdSchema), "http://purl.org/spar/datacite/"), ":", ?containerEditorIdLiteralValue) AS ?container_editor_id)
                }
                BIND(
                    IF(
                        STRLEN(STR(?containerEditorFamilyName)) > 0 && STRLEN(STR(?containerEditorGivenName)) > 0,
                        CONCAT(?containerEditorFamilyName, ", ", ?containerEditorGivenName),
                        IF(
                            STRLEN(STR(?containerEditorFamilyName)) > 0,
                            CONCAT(?containerEditorFamilyName, ","),
                            ?container_editor_name
                        )
                    )
                AS ?containerEditorName)
                BIND(
                    IF(
                        STRLEN(STR(?container_editor_id)) > 0,
                        CONCAT(?containerEditorName, " [", ?container_editor_id, " ", ?container_editor_metaid, "]"),
                        CONCAT(?containerEditorName, " [", ?container_editor_metaid, "]")
                    )
                AS ?container_editor_)
                BIND(CONCAT(?container_editor_, ":", ?containerEditorRoleUri, ":", COALESCE(?nextContainerEditorRoleUri, "")) AS ?container_editor_info)
            }
            BIND(
                IF(BOUND(?editor_info),
                IF(BOUND(?container_editor_info),
                    CONCAT(?editor_info, "|", ?container_editor_info),
                    ?editor_info),
                IF(BOUND(?container_editor_info),
                    ?container_editor_info,
                    "")
                )
            AS ?combined_editor_info)
            OPTIONAL {
                ?res pro:isDocumentContextFor ?arPublisher.
                ?arPublisher pro:withRole pro:publisher;
                            pro:isHeldBy ?raPublisher.
                OPTIONAL {
                    ?arPublisher oco:hasNext ?nextPublisherRole .
                }
                BIND(STRAFTER(STR(?arPublisher), "https://w3id.org/oc/meta/ar/") AS ?publisherRoleUri)
                BIND(STRAFTER(STR(?nextPublisherRole), "https://w3id.org/oc/meta/ar/") AS ?nextPublisherRoleUri)
                ?raPublisher foaf:name ?publisherName_.
                BIND(CONCAT("omid:ra/", STRAFTER(STR(?raPublisher), "/ra/")) AS ?publisher_metaid)
                ?raPublisher foaf:name ?publisher_name.
                OPTIONAL {
                    ?raPublisher datacite:hasIdentifier ?publisherIdentifier__.
                    ?publisherIdentifier__ datacite:usesIdentifierScheme ?publisherIdSchema;
                                        literal:hasLiteralValue ?publisherIdLiteralValue.
                    BIND(CONCAT(STRAFTER(STR(?publisherIdSchema), "http://purl.org/spar/datacite/"), ":", ?publisherIdLiteralValue) AS ?publisher_id)
                }
                BIND(
                    IF(
                        STRLEN(STR(?publisher_id)) > 0,
                        CONCAT(?publisher_name, " [", ?publisher_id, " ", ?publisher_metaid, "]"),
                        CONCAT(?publisher_name, " [", ?publisher_metaid, "]")
                    )
                AS ?publisher_)
                BIND(CONCAT(?publisher_, ":", ?publisherRoleUri, ":", COALESCE(?nextPublisherRoleUri, "")) AS ?publisher_info)
            }
            OPTIONAL {
                {
                    ?res a fabio:JournalArticle;
                        frbr:partOf+ ?journal.
                        BIND(CONCAT("omid:br/", STRAFTER(STR(?journal), "/br/")) AS ?venueMetaid)
                    ?journal a fabio:Journal.
                } UNION {
                    ?res frbr:partOf ?journal.
                    BIND(CONCAT("omid:br/", STRAFTER(STR(?journal), "/br/")) AS ?venueMetaid)
                }
                ?journal dcterm:title ?venueName.
                OPTIONAL {
                    ?journal datacite:hasIdentifier ?journalIdentifier__.
                    ?journalIdentifier__ datacite:usesIdentifierScheme ?journalIdScheme;
                                literal:hasLiteralValue ?journalIdLiteralValue.
                    BIND(CONCAT(STRAFTER(STR(?journalIdScheme), "http://purl.org/spar/datacite/"), ":", ?journalIdLiteralValue) AS ?venue_ids_)
                }
            }
            OPTIONAL {?res a ?type. FILTER (?type != fabio:Expression)}
            OPTIONAL {?res dcterm:title ?title.}
            OPTIONAL {?res prism:publicationDate ?pub_date.}
            OPTIONAL {
                ?res frbr:embodiment ?re.
                ?re prism:startingPage ?startingPage;
                    prism:endingPage ?endingPage.
                BIND(IF(STR(?startingPage) = STR(?endingPage), STR(?startingPage), CONCAT(?startingPage, '-', ?endingPage)) AS ?page)
            }
            OPTIONAL {
                ?res frbr:partOf ?resIssue.
                ?resIssue a fabio:JournalIssue;
                            fabio:hasSequenceIdentifier ?issue.
            }
            OPTIONAL {
                ?res frbr:partOf+ ?resVolume.
                ?resVolume a fabio:JournalVolume;
                            fabio:hasSequenceIdentifier ?volume.
            }
        } GROUP BY ?res ?title ?author_info ?combined_editor_info ?publisher_info ?type ?issue ?volume ?pub_date ?page  ?venueName ?venueMetaid
    }
    BIND(CONCAT(?ids, IF(STR(?ids) != "", " ", ""), "omid:br/", STRAFTER(STR(?res), "/br/")) AS ?id)
    BIND(
        IF(BOUND(?venueMetaid),
           IF(STR(?venue_ids) != "",
              CONCAT(" [", ?venue_ids, " ", ?venueMetaid, "]"),
              CONCAT(" [", ?venueMetaid, "]")
           ),
           ""
        )
    AS ?venueIdentifiers)
    BIND(CONCAT(?venueName, ?venueIdentifiers) AS ?venue)
} GROUP BY ?id ?title ?type ?issue ?volume ?venue ?pub_date ?page
```

### RML

* Estrazione automatica di eventuali stringhe di connesione al db dalla configurazione di Morph KGC
* La query sql viene generata tramite sqlalchemy
* Uso sqlalchemy anche per eseguire la query, in modo da essere agnostico sull’rdb. Per quanto in realtà tutti i test verranno fatti solo su Postgres.
* I risultati della query di inversione non vengono salvati e poi recuperati da CSV, ma tenuti in memoria
* I dati ottenuti tramite morphkgc non vengono salvati su graphdb, ma tenuti in memoria
* Rimossa la possibilità di fare test con mysql. Solo postgresql
* Vengono preservati i datatype recuperati con la query inversa
* Se il nome della tabella è una query sql, la creazione della tabella viene saltata
* Allineamenti tra schema tabella esistente e schema rml. Prevale quello RML.
* Le query sparql di tijs sopprimono il datatype. Le devo riguardare

## Domande

* [https://github.com/opencitations/oc\_ds\_converter/blob/main/oc\_ds\_converter/oc\_idmanager/ror.py](https://github.com/opencitations/oc_ds_converter/blob/main/oc_ds_converter/oc_idmanager/ror.py) URL opzionale in ROR? Perché non come ORCID?
* In fase di merge prefero il self su tutto?
* In fase di test come gestisco creazione di tabelle che sono query SQL?
* Che fare se lo schema della tabella non coincide con quello rml?
* Ha senso guardarsi la rappresnetazione interna di morph dal momento in cui alla fine io voglio comunque avere come punto di partenza un rdf e un mapping e un rdb?

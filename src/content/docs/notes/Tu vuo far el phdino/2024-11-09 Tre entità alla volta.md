---
title: 2024-11-09 Tre entità alla volta
editUrl: false
---

## La Novitade

### HERITRACE

* Bugfix
  * Le entità non venivano create correttamente in caso shacl fosse None
  * Il contatore non veniva incrementato le entità annidate
  * In caso di entità annidate multiple per una stessa proprietà veniva generata solo l’ultima
  * Nella configurazione sulla visualizzazione la query sparql per la visualizzazione dell’identificatore era sbagliata e fondeva in un unico identificatore identificatori multipli in quando non c’era bind tra la variabile dell’identificatore e i vari URI degli identificatori associati a un’entità
* Novità
  * I datatype invalidi vengono nascosti, non più disabilitati
  * Creazione entità proxy

    * Devono essere create tre entità

    ```yaml
    - class: "http://purl.org/spar/fabio/JournalArticle"
      displayName: "Journal Article"
      displayProperties:
        - property: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
          values:
          - displayName: "Type"
            shouldBeDisplayed: true
            fetchValueFromQuery: null
          orderedBy: null
        - property: "http://purl.org/spar/datacite/hasIdentifier"
          values:
          - displayName: "Identifier"
            shouldBeDisplayed: true
            fetchValueFromQuery: |
                PREFIX datacite: <http://purl.org/spar/datacite/>
                PREFIX literal: <http://www.essepuntato.it/2010/06/literalreification/>
                SELECT (CONCAT(STRAFTER(STR(?scheme), "http://purl.org/spar/datacite/"), ":", ?literal) AS ?id) ?identifier
                WHERE {
                    [[subject]] datacite:hasIdentifier ?identifier.
                    ?identifier datacite:usesIdentifierScheme ?scheme;
                                literal:hasLiteralValue ?literal.
                }
          orderedBy: null
        - property: "http://purl.org/dc/terms/title"
          values:
          - displayName: "Title"
            shouldBeDisplayed: true
            fetchValueFromQuery: null
          orderedBy: null
        - property: "http://purl.org/spar/pro/isDocumentContextFor"
          intermediateRelation:
            class: "http://purl.org/spar/pro/RoleInTime"
            targetEntityType: "http://xmlns.com/foaf/0.1/Agent"
          values:
          - displayName: "Author"
            properties:
              - property: "http://purl.org/spar/pro/withRole"
                value: "http://purl.org/spar/pro/author"
            shouldBeDisplayed: true
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
          - displayName: "Publisher"
            properties:
              - property: "http://purl.org/spar/pro/withRole"
                value: "http://purl.org/spar/pro/publisher"
            shouldBeDisplayed: true
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
          - displayName: "Editor"
            properties:
              - property: "http://purl.org/spar/pro/withRole"
                value: "http://purl.org/spar/pro/editor"
            shouldBeDisplayed: true
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
          orderedBy: "https://w3id.org/oc/ontology/hasNext"

    ```

    * La proprietà che connette class a targetEntityType viene automaticamente dedotta dallo shacl. Eventuali altre proprietà (pro:withRole) possono essere specificate per ciascuno valore di isDocumentContextFor
  * Creazione di proprietà ordinate
    * Modifica dell’ordine in tempo reale tramite handle
    * Numerazione dinamica
  * Ho ridisegnato l’interfaccia di creazione
    * Miglior raggruppamento per form distinti, con più spazio tra uno e l’altro
    * Gli item nei singoli form-group sono dentro un bordo chiaro
    * Handle + toggle e in fondo pulsante di eliminazione sulla stessa linea
  * Il numero minimo e massimo di valori per proprietà definito nello shacl si riflette sulla logica di comparsa e scomparsa dei pulsanti di cancellazione nell’interfaccia di creazione
  * Shape specializzate per le varie risorse bibliografiche

### Meta

* Ho eliminato a mano le triple problematica

  ```ntriples
  <#I>	<#\u201EOkocim>	" S.A. Notowanych Na Gie\u0142dzie Papier\u00F3w Warto\u015Bciowych W Warszawie"	<https://w3id.org/oc/meta/br/> .
  <#Kliment>	<#Ohridski>	""	<https://w3id.org/oc/meta/ra/> .
  <#Carol>	<#Davila>	" Bucharest Romania Department Of Neurology "	<#Dr> .
  <#Carol>	<#Davila>	" Central Military Emergency University Hospital Bucharest Romania"	<https://w3id.org/oc/meta/ra/> .

  ```

  * Esteso il codice per raggruppare le entità da fondere in file diversi per evitare problemi di concorrenza. Per gli id era sufficiente raggruppare per id puntati dalle medesime entità. Per le br si è reso necessario raggruppare anche per entità comuni puntate. Entità = uri che è a sua volta soggetto di altre triple.

### RML

* Test con Morph-KGC e PostgreSQL
  * infer\_sql\_datatypes: yes
* Environment
  * morph\_kgc==2.8.0 (2024-09-09) vs 1.3.5 (2021-10-13)
  * PostgreSQL 13 vs ?

| Nome del Test | Passato | Motivo del Fallimento                                                                              | **R2RML Implementation Report** |
| ------------- | ------- | -------------------------------------------------------------------------------------------------- | ------------------------------- |
| R2RMLTC0000   | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0001a  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0001b  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0002a  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0002b  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0002c  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0002d  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0002e  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0002f  | No      | Eccezione gestita                                                                                  | No                              |
| R2RMLTC0002g  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0002h  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0002i  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0002j  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0003b  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0003c  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0004a  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0004b  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0005a  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0005b  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0006a  | Yes     |                                                                                                    | No                              |
| R2RMLTC0007a  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0007b  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0007c  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0007d  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0007e  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0007f  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0007g  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0007h  | Yes     |                                                                                                    | No                              |
| R2RMLTC0008a  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0008b  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0008c  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0009a  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0009b  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0009c  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0009d  | No      | Datatype su COUNT                                                                                  | No                              |
| R2RMLTC0010a  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0010b  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0010c  | Yes     |                                                                                                    | No                              |
| R2RMLTC0011a  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0011b  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0012a  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0012b  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0012c  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0012d  | No      | TriplesMap with two subjectMap. Eccezione gestita, viene presa la seconda                          | No                              |
| R2RMLTC0012e  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0013a  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0014a  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0014b  | Yes     |                                                                                                    | No                              |
| R2RMLTC0014c  | Yes     |                                                                                                    | No                              |
| R2RMLTC0014d  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0015a  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0015b  | No      | map with an invalid rr:language (english, spanish). Viene conservato il lang invalido nell’output  | Yes                             |
| R2RMLTC0016a  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0016b  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0016c  | No      | Viene inferito time anziché datetime, ma è anche vero che il valore inserito nel db non è datatime | No                              |
| R2RMLTC0016d  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0016e  | No      |                                                                                                    | No                              |
| R2RMLTC0018a  | Yes     |                                                                                                    | Yes                             |
| R2RMLTC0019a  | No      |                                                                                                    | No                              |
| R2RMLTC0019b  | No      |                                                                                                    | No                              |
| R2RMLTC0020a  | No      |                                                                                                    | No                              |
| R2RMLTC0020b  | No      |                                                                                                    | No                              |

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

## Domande

* Perché usare GraphDB e non un grafo rdflib locale? Stiamo prendendo i dati rdf generati, li stiamo caricando su triplestore, poi stiamo generando una query a partire dai mapping e la stiamo eseguendo sul triplestore. Poi salviamo il risultato della query su csv. Poi carichiamo il CSV

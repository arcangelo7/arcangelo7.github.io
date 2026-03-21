---
title: 2023-10-10 Display Rules
editUrl: false
---

## Novità

**Phd**

* No hr per separare valori
* Unificata visualizzazione entity-version a triples
* Se la versione non esiste, 404
* display rules

  * Non va bene ragionare per proprietà
    * Ci sono proprietà che non ha senso visualizzare, tipo endingPage una volta che ho definito la query per startingPage. Potrei aggiungere un parametro display a False ma è brutto, sembra un hack
    * Che si fa per autore, editor e publisher? Si parte sempre dalla stessa proprietà ma si scopre il ruolo solo tramite la query sparql. Anche il display name dovrebbe essere definito con una query sparql (follia)
    * Quindi si ragiona per tipi e si definiscono direttamente le proprietà che si intende visualizzare e come.
  * Altra considerazione: shacl ha una proprietà sh:sparql per definire regole di validazione. Non voglio risemantizzarla né mi piace usare shacl per la visualizzazione. Shacl fa validazione, estenderlo per gestire la visualizzazione mi sembra un uno improprio che potrebbe confondere la persona addetta alla configurazione. Quindi preferisco creare un file di configurazione che gestisce esclusivamente la visualizzazione

  ```yaml
  - class: "http://purl.org/spar/fabio/Expression"
    displayProperties:
      - property: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
        values:
        - displayName: "Type"
          shouldBeDisplayed: true
          fetchValueFromQuery: |
              PREFIX fabio: <http://purl.org/spar/fabio/>
              SELECT DISTINCT ?type
              WHERE {
                  [[subject]] a ?type.
                  FILTER (?type != fabio:Expression)
              }
  			orderedBy: null
      - property: "http://purl.org/dc/terms/title"
        values:
        - displayName: "Title"
          shouldBeDisplayed: true
          fetchValueFromQuery: null
  			orderedBy: null
      - property: "http://purl.org/spar/fabio/hasSubtitle"
        values:
        - displayName: "Subtitle"
          shouldBeDisplayed: true
          fetchValueFromQuery: null
  			orderedBy: null
      - property: "http://purl.org/spar/pro/isDocumentContextFor"
        values:
        - displayName: "Author"
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
  		orderedBy: "https://w3id.org/oc/ontology/hasNext"
  ```

  * Order matters
  * n-ary relations: author, publisher
  * Prima variabile visualizzazione, seconda (opzionale) entità esterna.
    * Se proxy
      * No modifica diretta, link all’entità
  * orderedBy

**Meta**

[https://opencitations.net/meta/br/069066063.html](https://opencitations.net/meta/br/069066063.html)

* [\*\*Transactions on Aspect-Oriented Software Development](https://www.springer.com/series/7584) (*1864-3035*)\*\*
* [\*\*Transactions on Rough Sets](https://www.springer.com/series/7151) (*1861-2067*)\*\*
* [\*\*Transactions on Edutainment](https://www.springer.com/series/8277) (*1867-7754*)\*\*
* [\*\*Lecture Notes in Computer Science](https://www.springer.com/series/558) (*1611-3349*)\*\*

**Expert Commettee**

## Domande

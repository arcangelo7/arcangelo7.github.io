---
title: 2024-11-11 HERITACE è più bellino
editUrl: false
---

## La Novitade

### Meta

* A quanto pare il 100% delle br da fondere rimanenti esiste… Quindi perché è così lento?
* Guardando in strace mi sono accorto che il problema è l’apertura e chiusura di socket http, quindi richieste al triplestore. Probabilmente il problema è la ricostruzione del contesto di ogni entità, qui

```python
{% raw %}
    def merge(self, g_set: GraphSet, res: URIRef, other: URIRef) -> None:
        self.reader.import_entity_from_triplestore(g_set, self.endpoint, res, self.resp_agent, enable_validation=False)
        self.reader.import_entity_from_triplestore(g_set, self.endpoint, other, self.resp_agent, enable_validation=False)
        sparql = SPARQLWrapper(endpoint=self.endpoint)
        query_other_as_obj = f'''
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX datacite: <http://purl.org/spar/datacite/>
            PREFIX pro: <http://purl.org/spar/pro/>
            SELECT DISTINCT ?entity WHERE {{
                {{?entity ?p <{other}>}} UNION {{<{res}> ?p ?entity}} UNION {{<{other}> ?p ?entity}}
                FILTER (?p != rdf:type) FILTER (?p != datacite:usesIdentifierScheme) FILTER (?p != pro:withRole)}}'''
        sparql.setQuery(query_other_as_obj)
        sparql.setReturnFormat(JSON)
        data_obj = sparql.queryAndConvert()
        for data in data_obj["results"]["bindings"]:
            if data['entity']['type'] == 'uri':
                res_other_as_obj = URIRef(data["entity"]["value"])
                try:
                    self.reader.import_entity_from_triplestore(g_set, self.endpoint, res_other_as_obj, self.resp_agent, enable_validation=False)
                except ValueError:
                    print(res_other_as_obj)
                    raise(ValueError)
{% endraw %}
```

Anche dovuto al fatto che ogni richiesta implementa un meccanismo di retry. Come posso migliorare questo aspetto?

* Implementare connection pooling per riutilizzare le connessioni HTTP invece di aprirne una nuova per ogni query
  * Raggruppare più query SPARQL in una singola richiesta usando UNION o costrutti simili
  * Considerare l'utilizzo di batch processing per importare multiple entità contemporaneamente
  * Potenzialmente implementare caching per evitare di richiedere ripetutamente le stesse entità
  * Tutto molto bello ma anche molto prono a introdurre nuovi errori. Lo farò solo se mi trovassi costretto a rilanciare il processo.

### HERITRACE

* Data model
  * schema:CollaboratorShape (pro:contributor)
  * Monograph → fabio:book
  * Article in Book → fabio:BookChapter

* Rimossa la possibilità di creare identificativi e responsible agent come entità a sé. Ora sono creabili solo nel contesto di una risorsa bibliografica (`shouldBeDisplayed: false`) . In questo modo, la lista di entità creabili e presenti nel dataset corrisponde alla lista di risorse bibliografiche, senza la necessità di creare liste separate in maniera agnostica sul modello di dati e scervellarmi su questo problema.

* Se il livello di profondità è > 1, imposto la classe nelle ricerche a depth-1, ovvero a quella del genitore. Ovviamente, anche il contenitore da sostituire con la selezione sarà quello a depth-1, così come la versione human readable del nome dell’entità si basa sulla classe del genitore anziché dell’entità stessa.

  ```javascript
  function generateSearchQuery(term, entityType, predicate, dataset_db_triplestore, dataset_db_text_index_enabled, depth, connectingPredicate) {
      let query;
      if (dataset_db_text_index_enabled && dataset_db_triplestore === 'virtuoso') {
          // Use Virtuoso text index
          query = `
              SELECT DISTINCT ?entity ?type ?scoreValue WHERE {
                  ${depth > 1 ? `
                      ?entity a <${entityType}> .
                      ?entity <${connectingPredicate}> ?nestedEntity .
                      ?nestedEntity <${predicate}> ?text .
                  ` : `
                      ?entity ?p ?text .
                      ${entityType ? `?entity a <${entityType}> .` : ''}
                      ${predicate ? `?entity <${predicate}> ?text .` : ''}
                  `}
                  ?text bif:contains "'${term}*'" OPTION (score ?scoreValue) .
                  OPTIONAL { ?entity a ?type }
                  FILTER(?scoreValue > 0.2)
              }
              ORDER BY DESC(?scoreValue)
              LIMIT 5
          `;
      } else {
          // Fallback to standard REGEX search
          query = `
              SELECT DISTINCT ?entity ?type WHERE {
                  ${depth > 1 ? `
                      ?entity a <${entityType}> .
                      ?entity <${connectingPredicate}> ?nestedEntity .
                      ?nestedEntity <${predicate}> ?searchValue .
                  ` : `
                      ${entityType ? `?entity a <${entityType}> .` : ''}
                      ${predicate ? 
                          `?entity <${predicate}> ?searchValue .` :
                          `?entity ?searchPredicate ?searchValue .`
                      }
                  `}
                  FILTER(REGEX(STR(?searchValue), "${term}", "i"))
                  OPTIONAL { ?entity a ?type }
              } 
              LIMIT 5
          `;
      }
      return query;
  }

  ```

* Cazzeggio
  * Animazione home
  * 404
  * layout bottoni, font, palette cromatica
  * logo

    ![attachments/ab9105025e194d6ab4efacb399be7dfd.png](../../../../assets/notes/attachments/ab9105025e194d6ab4efacb399be7dfd.png)

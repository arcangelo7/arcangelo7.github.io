---
title: 2023-02-01 Primo lancio dei test su BEAR
editUrl: false
---

## Novità

**time-agnostic-library**

* Dato che adesso abbiamo 1TB e passa di RAM, ho reso opzionale l’uso di Postgre per tenere traccia delle modifiche alle entità durante la conversione dai dati sui cambiamenti di BEAR all’OCDM. In questo modo, si va più veloci
  * BEAR B hour, Postgre: 02:44
  * BEAR B hour, RAM: 01:21

* Similmente, redis veniva usato per tenere traccia dei contatori della provenance, ma non ce n’è più bisogno data la quantità gargantuesca di RAM
  * BEAR B hour, senza Postgre, senza Redis: 01:31
  * Conclusione: sono stupido, Redis è già in RAM

* Risolto un bug nello script che genera la provenance secondo l’OCDM, per cui, in presenza di spazi nell’oggetto letterale, lo split per spazio per identificare soggetto, predicato e oggetto nei file nt di partenza rompeva l’oggetto letterale. Per evitare infinite altre eccezioni (ad esempio, punto nella stringa), ho usato rdflib
  * Le modifiche vengono salvate nel db postgre come json in stringa, in modo da salvare informazioni sull’oggetto (URI, Literal, datatype). Ricordo che salvare le aggiunte e le cancellazione in un db postgre serve a evitare problemi di memoria. In passato è stato cruciale, oggi con 1 TB di memoria non so se lo sarebbe, ma mi pare comunque una buona cosa
  * Viene gestito anche il caso in cui qualche stringa nella query di update contiene un’andata a capo
  * Viene scapato anche il carattere di escaping

    ```python
    def serialize_modifications(modifications):
        serialized_modifications = []
        for predicate, obj in modifications:
            mod_dict = {
                "predicate": predicate, 
                "value": str(obj)
            }

            if isinstance(obj, URIRef):
                mod_dict["type"] = "uri"
            elif isinstance(obj, Literal):
                mod_dict["type"] = "literal"
                if obj.datatype:
                    mod_dict["datatype"] = str(obj.datatype)
                if obj.language:
                    mod_dict["language"] = obj.language

            serialized_modifications.append(json.dumps(mod_dict))
        return serialized_modifications

    def deserialize_modifications(serialized_modifications):
        modifications = []
        serialized_modifications = json.loads(serialized_modifications)
        for serialized_modification in serialized_modifications:
            mod_dict: dict = json.loads(serialized_modification)
            predicate = mod_dict["predicate"]
            obj_type = mod_dict["type"]
            value = mod_dict["value"]

            if obj_type == "uri":
                obj = URIRef(value)
            elif obj_type == "literal":
                datatype = mod_dict.get("datatype")
                language = mod_dict.get("language")
                if datatype:
                    obj = Literal(value, datatype=URIRef(datatype))
                elif language:
                    obj = Literal(value, lang=language)
                else:
                    obj = Literal(value)
            
            modifications.append((predicate, obj))
        return modifications

    def build_statements(entity, modifications: List[Tuple[str, URIRef | Literal]]) -> str:
        statements = ''
        for predicate, obj in modifications:
            if isinstance(obj, URIRef):
                obj_str = f"<{obj}>"
            elif isinstance(obj, Literal):
                obj_value = str(obj).replace('\\', '\\\\').replace('"', '\"')
                obj_value = f'\"\"\"{obj_value}\"\"\"' if '\n' in obj_value else f"\"{obj_value}\""
                if obj.datatype:
                    obj_str = f"{obj_value}^^<{obj.datatype}>"
                elif obj.language:
                    obj_str = f"{obj_value}@{obj.language}"
                else:
                    obj_str = f"{obj_value}"
            else:
                obj_str = f"\"{obj}\""
            statements += f"<{entity}> <{predicate}> {obj_str} . "
        return statements
    ```

* Risolto un bug per cui i contatori nel db redis venivano riutilizzati anche in assenza di file di cache

* Risolvo un bug in time-agnostic-library per cui le query di update nella provenance non venivano parsate correttamente se contenevano triple e non quadruple

* Viene gestito il caso in cui i dati sono su triplestore anziché su quadstore. L’informazione si trova nel file di configurazione. Questo mi fa gioco, perché tanto la configurazione andava modificata per aggiungere la flag alla provenance su triplestore

  ```json
  {
      "dataset": {
          "triplestore_urls": ["http://127.0.0.1:9999/blazegraph/sparql"],
          "file_paths": [],
          "is_quadstore": false
      },
      "provenance": {
          "triplestore_urls": ["http://127.0.0.1:19999/blazegraph/sparql"],
          "file_paths": [],
          "is_quadstore": true
      },
      "blazegraph_full_text_search": "no",
      "fuseki_full_text_search": "no",
      "virtuoso_full_text_search": "no",
      "graphdb_connector_name": "",
      "cache_triplestore_url": {
          "endpoint": "",
          "update_endpoint": ""
      }
  }
  ```

* Mi sono accorto di una sciocchezza che però rallentava moltissimo la time-agnostic-library. Il file di configurazione veniva riletto a ogni query.

* Dopo aver trovato le query di update contenenti gli uri presenti nelle triple isolate, venivano ricostruiti sia i soggetti che gli oggetti delle triple coinvolte in tali query di update, mentre basta ricostruire i soggetti.

* Rimosso un blocco necessario per il parsing della query al fine di ottenere le variabili al suo interno tramite rdflib (il parser non è thread-safe). Le variabili si possono ottenere direttamente nella risposta alla query tramite SPARQLWrapper. Inoltre, la query non viene parsata per ogni risultato, ma solo una volta. Questa modifica ha aumentato la velocità del 96% (da 840 a 36 secondi)

* Fare una query a uno specifico named graph rende la query estremamente più veloce che farla su tutto il dataset!

{% raw %}

```sparql
SELECT ?snapshot ?time ?responsibleAgent ?updateQuery ?primarySource ?description ?invalidatedAtTime
               WHERE {{
                   ?snapshot <{ProvEntity.iri_specialization_of}> <{self.res}>;
                       <{ProvEntity.iri_generated_at_time}> ?time;
                       <{ProvEntity.iri_was_attributed_to}> ?responsibleAgent.
                   OPTIONAL {{
                       ?snapshot <{ProvEntity.iri_invalidated_at_time}> ?invalidatedAtTime.
                   }}
                   OPTIONAL {{
                       ?snapshot <{ProvEntity.iri_description}> ?description.
                   }}
                   OPTIONAL {{
                       ?snapshot <{ProvEntity.iri_has_update_query}> ?updateQuery.
                   }}
                   OPTIONAL {{
                       ?snapshot <{ProvEntity.iri_had_primary_source}> ?primarySource.
                   }}
               }}

   829ms


SELECT ?snapshot ?time ?responsibleAgent ?updateQuery ?primarySource ?description ?invalidatedAtTime
               WHERE {{
                   GRAPH <{self.res}/prov/> {{
                       ?snapshot <{ProvEntity.iri_specialization_of}> <{self.res}>;
                           <{ProvEntity.iri_generated_at_time}> ?time;
                           <{ProvEntity.iri_was_attributed_to}> ?responsibleAgent.
                       OPTIONAL {{
                           ?snapshot <{ProvEntity.iri_invalidated_at_time}> ?invalidatedAtTime.
                       }}
                       OPTIONAL {{
                           ?snapshot <{ProvEntity.iri_description}> ?description.
                       }}
                       OPTIONAL {{
                           ?snapshot <{ProvEntity.iri_has_update_query}> ?updateQuery.
                       }}
                       OPTIONAL {{
                           ?snapshot <{ProvEntity.iri_had_primary_source}> ?primarySource.
                       }}
                   }}
               }}

   358ms

```

{% endraw %}

Ho scoperto che, per pura casualità, i file che avevo realizzato per i test erano triple, non quadruple. time-agnostic-library permette già di fare query su provenance in triple se è su file. Non ho fatto test su triplestore, dove invece ci sono quadruple, però tutto lascia pensare che funzionerebbe anche lì. In ogni caso, la flag is\_quadstore nel file di configurazione viene usata per modificare la query qui sopra

**AIUCD2024**

* Long abstract riorganizzato per essere conforme al template di AIUCD
* Ho inviato l’articolo

## Domande

* In RDF, un Literal non può avere contemporaneamente un datatype e una language, vi risulta?

  > [Language-tagged
  > strings](https://www.w3.org/TR/rdf11-concepts/#dfn-language-tagged-string) have the [datatype IRI](https://www.w3.org/TR/rdf11-concepts/#dfn-datatype-iri)`http://www.w3.org/1999/02/22-rdf-syntax-ns#langString`.
  > No datatype is formally defined for this IRI because the definition
  > of [datatypes](https://www.w3.org/TR/rdf11-concepts/#dfn-datatype) does not accommodate
  > [language tags](https://www.w3.org/TR/rdf11-concepts/#dfn-language-tag) in the [lexical space](https://www.w3.org/TR/rdf11-concepts/#dfn-lexical-space).
  > The [value space](https://www.w3.org/TR/rdf11-concepts/#dfn-value-space) associated with this datatype IRI is the set
  > of all pairs of strings and language tags. ([https://www.w3.org/TR/rdf11-concepts/#section-Datatypes](https://www.w3.org/TR/rdf11-concepts/#section-Datatypes))

---
title: 2025-09-30 Proprietà virtuali
editUrl: false
head:
  - tag: link
    attrs:
      rel: stylesheet
      href: https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css
---

# La Novitade

## HERITRACE

* Aggiornata la signature del componente per generare gli URI delle nuove entità. Ora riceve un nuovo parametro, il contesto, che contiene tutti i dati passati dal frontend al backend per la creazione di una determinata entità, ad esempio

```json
{
    "entity_type": "http://purl.org/spar/cito/Citation",
    "properties": {
        "http://purl.org/spar/cito/hasCitingEntity": [
            {
                "is_existing_entity": True,
                "entity_uri": "https://w3id.org/oc/meta/br/061503302037"
            }
        ],
        "http://purl.org/spar/cito/hasCitedEntity": [
            {
                "is_existing_entity": True,
                "entity_uri": "https://w3id.org/oc/meta/br/061503302004"
            }
        ]
    }
}
```

In questo modo è possibile personalizzare MetaURIGenerator, che eredita da URIGenerator, per generare gli URI delle citazioni come OMID-OMID.

* Una volta creata una proprietà virtuale, per visualizzarla bisogna introdurre una nuova logica. Nel nostro caso andremo a cercare le entità che referenziano l'entità corrente (\${currentEntity}) attraverso il predicato specificato nelle impostazioni di visualizzazione e che appartengono alla classe specificata, se specificata. Dopodiché per ciascuna di queste entità verranno applicate le regole di visualizzazione in fetchValueFromQuery.
* Problema di performance lato creazione. Aggiungere le citazioni come proprietà virtuale significa aggiungere tutte le sotto entità, compreso i selettori per i container volume, venue e issue. Follia.
  * Ora, anziché precaricare tutte quante le entità e le sottentità all'interno del browser, viene caricata soltanto l'entità selezionata con tutte le sottentità in maniera dinamica e asincrona, ovvero tramite una chiamata API.
* Come includere la caratterizzazione della citazione all'interno della proprietà visualizzata? Non ne ho idea, intanto l'ho fatto con la SPARQL query

```sparql
  IF(BOUND(?characterization),
    CONCAT(
      LCASE(
        REPLACE(
          REPLACE(STR(?characterization), "^.*/([^/]*)$", "$1"),
          "([a-z])([A-Z])", "$1 $2"
        )
      ),
      " \""
    ),
    ""
  ),
```

* REPLACE(STR(?characterization), "^.*/(\[^/]*)$", "$1")
  * Regex che estrae tutto dopo l'ultimo /
    * ^.\* = dall'inizio fino a...
    * /(\[^/]\*)\$ = l'ultimo / seguito da qualsiasi carattere non-/ fino alla fine
    * \$1 = restituisce solo il gruppo catturato (\[^/]\*)
    * Es: "[http://purl.org/spar/cito/citesAsRelated](http://purl.org/spar/cito/citesAsRelated)" → "citesAsRelated"
* REPLACE(..., "(\[a-z])(\[A-Z])", "$1 $2")
  * Spezza il camelCase inserendo spazi
  * (\[a-z])(\[A-Z]) = cattura una lettera minuscola seguita da maiuscola
  * $1 $2 = mette spazio tra i due gruppi
  * Es: "citesAsRelated" → "cites As Related"
* LCASE(...)
  * Converte tutto in minuscolo
  * Es: "cites As Related" → "cites as related"
* La logica dell'aggiunta di proprietà virtuali è stata aggiunta anche per la creazione di entità da zero. Chiaramente in questo caso viene prima aggiunta l'entità principale e soltanto dopo che abbiamo un URI viene aggiunta la proprietà virtuale, ovvero l'entità separata.
* Chiaramente le proprietà virtuali vengono filtrate dalle risorse collegate, anche se in questo caso non verrebbero mostrate proprietà virtuali, ma verrebbero mostrate proprio le entità citazioni collegate.

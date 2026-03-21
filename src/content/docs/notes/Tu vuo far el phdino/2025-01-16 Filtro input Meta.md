---
title: 2025-01-16 Filtro input Meta
editUrl: false
---

## La Novitade

### Meta

* Fusione BR 69.61% (3,178,369 / 4,566,013)
  * [https://github.com/opencitations/oc\_meta/issues/38](https://github.com/opencitations/oc_meta/issues/38)
* Esiste lui: [https://www.springerprofessional.de/with-design-reinventing-design-modes/23680138?tocPage=1](https://www.springerprofessional.de/with-design-reinventing-design-modes/23680138?tocPage=1)
* Script per preprocessare input per Meta (testato)

  * Filtra le righe duplicate (hash, copie perfette)
  * Verifica l'esistenza degli identificatori in Redis. Se tutti gli id della riga sono presenti in Redis la riga viene ignorata
  * Compatibile con Python 3.5 perché Redis sta solo su Produzione

  ```
  Processing Report:
  ==================================================
  Total input files processed: 2756
  Total input rows: 63,173,964
  Rows discarded (duplicates): 2,988,182
  Rows discarded (existing IDs): 54,369,267
  Rows written to output: 5,816,515

  Percentages:
  Duplicate rows: 4.7%
  Existing IDs: 86.1%
  Saved rows: 9.2%

  ```

### oc\_ds\_converter

* Reintegrato DOI-ORCID index per la validazione dei DOI. Viene utilizzato prima di REDIS e delle API ma dopo il controllo nello storage locale, dove si trovano gli ORCID già incontrati in quel file.
  * La modifica è stata fatta per:
    * Crossref
    * OpenAIRE
    * DataCite
    * Mancano JaLC, Medra, Zotero

### SKG-IF

* Ho risolto il problema legato alla mancata validazione quando l’oggetto di un’entità non contiene il tipo o è ad esempio un blank node come accade nell’esempio di OpenCitations, indicando così la presenza del valore di una proprietà per la quale definiamo la classe dell’oggetto all’interno dell’ontologia

  ```turtle
  fabio:ExpressionCollectionShape a sh:NodeShape ;
      sh:property [ 
          sh:path datacite:hasIdentifier;
          sh:minCount 0 ;
          sh:or ( [ sh:class datacite:Identifier ] [ sh:nodeKind sh:BlankNodeOrIRI ] )
      ]
  ```

### HERITRACE

* Il servizio non era ripartito automaticamente per problemi di spazio. Docker da solo prende 13G base più ulteriore spazio per immagini, container e copie di dati permanenti. Ho chiesto a Tommaso di portare i 28G a 40.

### QLEVER

* [https://github.com/ad-freiburg/qlever/wiki/QLever-support-for-SPARQL-1.1-Update](https://github.com/ad-freiburg/qlever/wiki/QLever-support-for-SPARQL-1.1-Update)

## Domande

* Il Public Data File di ORCID utilizzato per generare le tabelle per Meta da ultimo è quello del 2024 o del 2023?
  * Risposta: 2023

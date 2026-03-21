---
title: 2023-12-18 Merge delle entità duplicate
editUrl: false
---

## La Novitade

* Le entità da fondere sono circa 1/6  di quelle che pensavamo

  La query era sbagliata

  ```sparql
  PREFIX datacite: <http://purl.org/spar/datacite/>
  PREFIX dcterms: <http://purl.org/dc/terms/>
  PREFIX literal: <http://www.essepuntato.it/2010/06/literalreification/>
  PREFIX prism: <http://prismstandard.org/namespaces/basic/2.0/>
  SELECT ?r1 ?r2 {
      ?id_1 literal:hasLiteralValue ?s ; ^datacite:hasIdentifier ?r1 .
      ?id_2 literal:hasLiteralValue ?s ; ^datacite:hasIdentifier ?r2 .
    FILTER(?r1 != ?r2)
  }
  ```

  Questa query non tiene conto dello schema, quindi un crossref id si ritrova identico a un pmid

  Nuova query

  ```sparql
  PREFIX datacite: http://purl.org/spar/datacite/
  PREFIX literal: http://www.essepuntato.it/2010/06/literalreification/
  SELECT ?entity1 ?entity2 {
  	?id ^datacite:hasIdentifier ?entity1, ?entity2.
  	FILTER(?entity1 != ?entity2 )
  }
  ```

  Risultato: 1,002,200 entità anziché 5,929,604

  * 753,336 br
  * 248,864 ra

* Ho modificato il software che trova e salva in un csv le entità da fondere in modo che nel CSV ci siano due colonne: **surviving\_entity**, **merged\_entities**

  ```csv
  surviving_entity,merged_entities
  https://w3id.org/oc/meta/br/06904044877,https://w3id.org/oc/meta/br/061601850
  https://w3id.org/oc/meta/br/06350147790,https://w3id.org/oc/meta/br/0603903711; https://w3id.org/oc/meta/br/0603903969; https://w3id.org/oc/meta/br/0603904973; https://w3id.org/oc/meta/br/062103689974; https://w3id.org/oc/meta/br/062203701946; https://w3id.org/oc/meta/br/062303713402; https://w3id.org/oc/meta/br/062403720758; https://w3id.org/oc/meta/br/062503701865; https://w3id.org/oc/meta/br/061046331
  ```

* Ho modificato lo script per fondere le entità in modo che sia possibile specificare una lista di classi (ra, br) da fondere.

## Domande

* Come resp agent delle fusioni ho messo sempre [https://w3id.org/oc/meta/prov/pa/1](https://w3id.org/oc/meta/prov/pa/1), va bene?

---
title: 2024-06-11 Migrazione riuscita
editUrl: false
---

## La Novitade

Creare un archivio in multiprocessing

```bash
nohup tar -cvf - database/ 2> zipping_database.log | pigz -p 96 > database.tar.gz &
```

**Virtuoso**

```bash
SELECT DISTINCT ?s WHERE {
    VALUES (?scheme ?literal) { (<http://purl.org/spar/datacite/orcid> "0000-0002-2267-305X") (<http://purl.org/spar/datacite/orcid> "0000-0003-1969-7664") (<http://purl.org/spar/datacite/orcid> "0000-0002-6830-6781") (<http://purl.org/spar/datacite/issn> "2052-4463") (<http://purl.org/spar/datacite/issn> "2168-8605") (<http://purl.org/spar/datacite/orcid> "0000-0003-4153-5696") (<http://purl.org/spar/datacite/issn> "0021-8936") (<http://purl.org/spar/datacite/doi> "10.1063/1.1483859") }
    ?s <http://purl.org/spar/datacite/hasIdentifier> ?id.
    ?id <http://purl.org/spar/datacite/usesIdentifierScheme> ?scheme;
        <http://www.essepuntato.it/2010/06/literalreification/hasLiteralValue> ?literal.
}
```

| 1 | [https://w3id.org/oc/meta/br/061603498613](https://w3id.org/oc/meta/br/061603498613) |
| - | ------------------------------------------------------------------------------------ |

```bash
SELECT DISTINCT ?s WHERE {
    VALUES (?scheme ?literal) { (<http://purl.org/spar/datacite/orcid> "0000-0002-2267-305X") (<http://purl.org/spar/datacite/orcid> "0000-0003-1969-7664") (<http://purl.org/spar/datacite/orcid> "0000-0002-6830-6781") (<http://purl.org/spar/datacite/issn> "2052-4463") (<http://purl.org/spar/datacite/issn> "2168-8605") (<http://purl.org/spar/datacite/orcid> "0000-0003-4153-5696") (<http://purl.org/spar/datacite/issn> "0021-8936") }
    ?s <http://purl.org/spar/datacite/hasIdentifier> ?id.
    ?id <http://purl.org/spar/datacite/usesIdentifierScheme> ?scheme;
        <http://www.essepuntato.it/2010/06/literalreification/hasLiteralValue> ?literal.
}
```

| 1 | [https://w3id.org/oc/meta/br/0612012086](https://w3id.org/oc/meta/br/0612012086)     |
| - | ------------------------------------------------------------------------------------ |
| 2 | [https://w3id.org/oc/meta/br/064020664](https://w3id.org/oc/meta/br/064020664)       |
| 3 | [https://w3id.org/oc/meta/ra/068017574](https://w3id.org/oc/meta/ra/068017574)       |
| 4 | [https://w3id.org/oc/meta/ra/0624060266](https://w3id.org/oc/meta/ra/0624060266)     |
| 5 | [https://w3id.org/oc/meta/ra/0614070090](https://w3id.org/oc/meta/ra/0614070090)     |
| 6 | [https://w3id.org/oc/meta/br/061403126585](https://w3id.org/oc/meta/br/061403126585) |

[https://docs.openlinksw.com/virtuoso/anytimequeries/](https://docs.openlinksw.com/virtuoso/anytimequeries/) → c'è un timeout alle query. Se il timeout scade non ritorna un timeout error, ritorna i risultati parziali

VALUES è lentissima su Virtuoso, velocissima su Blazegraph, mentre UNION velocissima su Virtuoso e lentissima su Blazegraph

UNION + text search per Virtuoso se uno le attiva tramite parametro di configurazione. Per Blazegraph rimane VALUES + text search

Per misteriose ragioni stavo skippando il salvataggio su file dei dati relativi alle entità non modificate ma non della provenance

Impossibile caricare lui in un colpo solo su Virtuoso: [https://pubmed.ncbi.nlm.nih.gov/38277607/](https://pubmed.ncbi.nlm.nih.gov/38277607/)

Virtuoso crasha all’incirca dopo lo stesso numero triple caricate di Blazegraph

Letture e scritture separate

No DISTNCT nelle query

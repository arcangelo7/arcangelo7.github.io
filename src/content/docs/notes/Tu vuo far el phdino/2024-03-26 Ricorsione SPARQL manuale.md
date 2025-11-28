---
title: 2024-03-26 Ricorsione SPARQL manuale
editUrl: false
---

## La Novitade

**oc\_ocdm**

process\_id nella composizione del percorso dei file

**Meta**

* merge\_rdf\_files

* Ho aggiunto la barra di caricamento

* Altra causa di rallentamento: Jobu Tupaki

  ![attachments/fb70959894e94e1e94c3f7a5fe91038e.png](../../../../assets/notes/attachments/fb70959894e94e1e94c3f7a5fe91038e.png)

  ```sparql
  PREFIX eea: <https://jobu_tupaki/>
  CONSTRUCT { ?s ?p ?o } 
  WHERE {
    {
      ?res (!<eea:everything_everywhere_allatonce>)* ?s. 
      ?s ?p ?o.
      VALUES ?res {<https://w3id.org/oc/meta/br/061101706033>}
    }
    UNION
    {
      ?br <http://purl.org/spar/datacite/hasIdentifier> ?id.
      ?id <http://purl.org/spar/datacite/usesIdentifierScheme> ?scheme;
          <http://www.essepuntato.it/2010/06/literalreification/hasLiteralValue> ?literal.
      VALUES (?scheme ?literal) {(<http://purl.org/spar/datacite/openalex> "W2041215242")}
      ?br (!<eea:everything_everywhere_allatonce>)* ?s. ?s ?p ?o. 
    }
  }
  ```

  * Spezzata in due query separate. Inoltre, in presenza di omid e/o id singoli, usa BIND al posto di VALUES. Così è più veloce, ma comunque Blazegraph accusa molto l’aumento dei processi
  * Uso dell’indice testuale. Still lenta
  * Batch. Still lenta.
  * Ricorsione manuale. Ottimo
  * SELECT. Ottimo

    [oc\_meta/oc\_meta/lib/finder.py at 5290c8220eff6e9f9f2c85b1ad0e9846ec1891fa · opencitations/oc\_meta](https://github.com/opencitations/oc_meta/blob/5290c8220eff6e9f9f2c85b1ad0e9846ec1891fa/oc_meta/lib/finder.py#L686)

* Ora Meta gestisce anche sequenze di publisher senza nome, con solo id

* Script per togliere il punto e virgola dai nomi dei publisher. Sono 3246

**OUTCITE**

> Additionally, we also have extracted strings for each parsed reference which are not included in to the CSV but could be added on demand if it makes any difference at your end. Kindly let me know if adding them helps.

## Domande

* È possibile fare più di quattro salti in padella?
* Mi sono accorto di un problema causato dai merge delle br. Le sequenze di ruoli vengono duplicate, triplicate, quadruplicate a seconda del numero di br fuse e in assenza di id
* Problema publisher multipli: ci sono publisher con ; nel nome: [https://opencitations.net/meta/ra/0618010337094.html](https://opencitations.net/meta/ra/0618010337094.html)

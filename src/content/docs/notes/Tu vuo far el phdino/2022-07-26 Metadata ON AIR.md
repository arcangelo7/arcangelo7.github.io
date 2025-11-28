---
title: 2022-07-26 Metadata ON AIR
editUrl: false
---

## Cosa ho fatto

### Novità relative all’API di OC Meta

L’API di OC Meta è pronta. La potete provare qui: [https://oc-meta-test.arcangelomassari.it/api/v1](https://oc-meta-test.arcangelomassari.it/api/v1) (l’host è il PC in camera mia, probabilmente non sarà sempre acceso. Forse sposterò il tutto su un RaspberryPi perché mi piacerebbe fare un po’ di beta testing).

* **metadata**
  * L’operazione **metadata** gestisce ora anche **id multipli** per **autori** ed **editor**.
  * Risolto un bug per cui non venivano ritornati **id ulteriori** rispetto a quelli indicati come input dell’operazione.
* Ho implementato e testato le operazioni **author**/{orcid} ed **editor**/{orcid}
* Ho implementato la **ricerca testuale** sui campi title, author, editor, publisher, page, issue, volume, venue. Inoltre, è possibile specificare “**all**” come campo per cercare su tutti i campi.
  * Tale ricerca avviene tramite l’operazione `/search/{fields}/{text}`
    * È possibile specificare più di un campo, separati da doppio trattino basso, ad esempio `/search/author__editor/Peroni`

  * Per ottenere questo risultato, una funzione di preprocess **genera** frammenti di **query testuali** specifiche a seconda del campo, che vengono poi integrate nella query principale in modo da filtrare le entità di cui si vogliono ottenere i metadati.

  * La ricerca testuale sui campi author ed editor avviene con una sintassi specifica.
    * Ecco tutte le possibilità:

      * familyName,givenName (e.g., Peroni,Silvio)
      * familyName, (e.g., Peroni,)
      * ,givenName (e.g., ,Silvio)
      * name (e.g. Research Centre for Open Scholarly Metadata)

        <aside>
        👉 Nota bene. Se si omette la virgola la ricerca avviene solo sui foaf:name!

        </aside>

    * Adottare questa sintassi permette di risolvere due problemi:
      * ⚠️ **Problema 1**. Senza una sintassi che specifichi cosa è un foaf:familyName, foaf:givenName e foaf:name, il risultato conterrebbe l’unione di tutte queste possibilità e sarebbe impreciso.
      * ⚠️ **Problema 2.** Fare l’unione di tutti i risultati sui foaf:familyName, foaf:givenName e foaf:name rende la query molto lenta.

  * Per utilizzare i predicati speciali di Blazegraph all’interno di sotto-query bisogna racchiudere i triple pattern che utilizzano questi predicati entro l’operazione `SERVICE`

    ```SPARQL

    SELECT ...
    WHERE {
    ...
    	{SELECT ?res 
    	WHERE {
    		?res <http://purl.org/dc/terms/title> ?tsTitle.
    			SERVICE <http://www.bigdata.com/rdf/search#search> {
    				?tsTitle bds:search "Peroni";
    			  bds:matchAllTerms 'true'.
    			}
    	}}
    }}
    ```

    Questa informazione non è più presente nella documentazione di Blazegraph, perché era presente in una documentazione che ora è offline. L’unica traccia che ho trovato è in una discussione su [Stackoverflow](https://stackoverflow.com/questions/46096250/blazegraph-full-text-search-with-total-count).

  * La ricerca testuale sembra non funzionare sul campo date, perché la data non è una stringa e credo che Blazegraph non indicizzi i letterali di tipo xsd:gYear, xsd:gYearMonth o xsd:gDate.

  * Non ho implementato la ricerca testuale sul campo id perché mi è sembrata ridondante rispetto all’operazione metadata

  * Le ricerche testuali su ciascuno dei campi menzionati sono state testate.
* Ho testato tutte le operazioni su un triplestore di 161,267,659 di triple per mettere alla prova l’**efficienza** delle query.
  * Mi sono accorto che riscrivendo le query concentrando tutti i JOIN all’entità bibliografica da identificare all’interno della sotto-query la query è enormemente più veloce. Al contrario, se parte dei triple pattern è nella query interna e parte in quella esterna, sebbene la query esterna debba fare riferimento alla stessa entità di quella interna, la query è molto più lenta.

    ```SPARQL
    # Lenta
    SELECT ?res ?type
    WHERE {
      {SELECT ?res # La query interna viene risolta per prima
       	WHERE {
        ?res pro:isDocumentContextFor ?knownEditor.
        ?knownEditor pro:withRole pro:author;
                     pro:isHeldBy ?knownPerson.
        ?knownPerson datacite:hasIdentifier ?knownPersonIdentifier.
        ?knownPersonIdentifier datacite:usesIdentifierScheme datacite:orcid;
                               literal:hasLiteralValue "0000-0002-4765-6547".
      }}
      **?res a ?type. # Triple pattern nella query esterna**
    }

    # Veloce
    SELECT ?res ?type
    WHERE {
      {SELECT ?res ?type
       	WHERE {
        ?res pro:isDocumentContextFor ?knownEditor.
        ?knownEditor pro:withRole pro:author;
                     pro:isHeldBy ?knownPerson.
        ?knownPerson datacite:hasIdentifier ?knownPersonIdentifier.
        ?knownPersonIdentifier datacite:usesIdentifierScheme datacite:orcid;
                               literal:hasLiteralValue "0000-0002-4765-6547".
    		**?res a ?type. # Triple pattern dentro la query interna**
      }}
    }

    # La query veloce impiega 84 ms, quella lenta fa crashare il triplestore

    # Forse la query interna viene rieseguita se una variabile all'esterno
    # richiama uno dei risultati della query interna?

    ```

  * ~~Alla luce di questa evidenza, ho inizialmente riscritto tutte le query concentrando nella query interna il BGP relativo all’entità da identificare e mettendo nella query esterna solo le operazioni di concatenazione.~~

  * Per evitare che Blazegraph ripeta più volte la query per identificare le risorse bibliografiche rilevanti ho utilizzato una [named subquery](https://github.com/blazegraph/database/wiki/NamedSubquery), ovvero un’estensione per pre-computare un insieme di soluzioni da riutilizzare più volte nella query.
    * Questa modifica ha aumentato drasticamente la velocità di tutte le operazioni, in particolare quelle che utilizzano testuale.
* Ho implementato le funzioni preprocessing e postprocessing in modo che utilizzino solo librerie built-in di Python, per una maggiore compatibilità e interoperabilità.

Cose brutte che saranno ineluttabilmente in OC Meta

## Domande

* Se specifico più di un campo in cui cercare un dato testo tramite l’operazione `/search/{fields}/{text}`, i vari campi sono intesi come AND o come OR?
  * Ad esempio, posso specificare più campi con `/search/author__editor/Peroni` oppure con `/search/all/Peroni`
  * Per il momento, ho implementato un OR
* [Non ho implementato la ricerca testuale sul campo id perché mi è sembrata ridondante rispetto all’operazione metadata](https://www.notion.so/Non-ho-implementato-la-ricerca-testuale-sul-campo-id-perch-mi-sembrata-ridondante-rispetto-all-op-31bf44fa54114e49ad81c32a54cd9916?pvs=21)
* [La ricerca testuale sembra non funzionare sul campo date, perché la data non è una stringa e credo che Blazegraph non indicizzi i letterali di tipo xsd:gYear, xsd:gYearMonth o xsd:gDate.](https://www.notion.so/La-ricerca-testuale-sembra-non-funzionare-sul-campo-date-perch-la-data-non-una-stringa-e-credo-c-e7b57b2c7d8247418b49637d4b82ef2f?pvs=21)
* Una ricerca testuale come `/search/all/adaptive` può potenzialmente ritornare decine di migliaia di risultati. Ho imposto 1000 come numero di risultati massimo. Cosa ne pensate?
* Perché la governance di OpenCitations ha deciso che OpenCitations non mira a fornire un’alternativa gratuita Web of Science?
* Se l’utente esegue `/search/venue/scientometrics` a essere ritornati sono tutte le risorse bibliografica contenute in Scientometrics, compresi volumi e numeri.
  * Dovrei escludere dai risultati le risorse di tipo volume e numero?
* Ha senso una ricerca testuale del tipo `/search/issue/1` o `/search/volume/4`?

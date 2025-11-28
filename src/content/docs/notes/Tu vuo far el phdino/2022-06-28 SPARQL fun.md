---
title: 2022-06-28 SPARQL fun
editUrl: false
---

### Novità su OpenCitations Meta

* Ho continuato a lavorare sull’operazione `metadata`

  * L’operazione ora ha la forma `metadata/{scheme}/{literal_values}`, ad esempio `metadata/doi/10.1001/2012.jama.10456__10.1001/2012.jama.10503`
  * La variabile `{scheme}` viene validata: `str(\"?doi|issn|isbn|pmid\"?)`
    * In questo modo la variabile è separabile tramite slash, anche se lo slash è presente nella variabile successiva nel caso in cui questa sia un DOI
  * L’operazione `metadata` è stata **testata** tramite **APIManager**
  * Ecco la query SPARQL (fuori di testa) utilizzata. Quasi tutto il postprocessing viene fatto direttamente in SPARQL. Forse non è la soluzione più efficiente, ma volevo scoprire quanto potente fosse SPARQL

  ```sparql
  PREFIX foaf: <http://xmlns.com/foaf/0.1/>
  PREFIX pro: <http://purl.org/spar/pro/>
  PREFIX literal: <http://www.essepuntato.it/2010/06/literalreification/>
  PREFIX datacite: <http://purl.org/spar/datacite/>
  PREFIX dcterm: <http://purl.org/dc/terms/>
  PREFIX frbr: <http://purl.org/vocab/frbr/core#>
  PREFIX fabio: <http://purl.org/spar/fabio/>
  PREFIX prism: <http://prismstandard.org/namespaces/basic/2.0/>
  SELECT ?res (GROUP_CONCAT(DISTINCT ?id_; separator=' ') AS ?id)
  ?title 
  (GROUP_CONCAT(DISTINCT ?author_; separator='; ') AS ?author)
  ?date ?issue ?volume ?venue
  (GROUP_CONCAT(DISTINCT ?type_; separator=' ;and; ') AS ?type)
  ?publisher
  (GROUP_CONCAT(DISTINCT ?editor_; separator='; ') AS ?editor)
  WHERE {
    	?res datacite:hasIdentifier ?identifier.
      ?identifier datacite:usesIdentifierScheme datacite:[[scheme]];
          literal:hasLiteralValue ?literalValue.
      VALUES ?literalValue {[[literal_values]]}
   	BIND(CONCAT(STRAFTER(STR(datacite:[[scheme]]), "http://purl.org/spar/datacite/"), ":", STR(?literalValue)) AS ?id_)
      ?res a ?type_.
      OPTIONAL {?res prism:publicationDate ?date.}
    	OPTIONAL {
        ?res pro:isDocumentContextFor ?arAuthor.
        ?arAuthor pro:withRole pro:author;
                  pro:isHeldBy ?raAuthor.
        {?raAuthor foaf:familyName ?familyName.} UNION {?raAuthor foaf:name ?name.}
        OPTIONAL {
          ?raAuthor datacite:hasIdentifier ?authorIdentifier__.
          ?authorIdentifier__ datacite:usesIdentifierScheme ?authorIdSchema;
                            literal:hasLiteralValue ?authorIdLiteralValue.
          BIND(CONCAT(STRAFTER(STR(?authorIdSchema), "http://purl.org/spar/datacite/"), ":", STR(?authorIdLiteralValue)) AS ?authorIdentifier_)
        }
        OPTIONAL {
          ?raAuthor foaf:givenName ?givenName.
        }
        BIND(IF(bound(?authorIdentifier_), CONCAT(" [", ?authorIdentifier_, "]"), "") AS ?authorIdentifier)
        BIND(
          IF(bound(?givenName), 
             CONCAT(STR(?familyName), ", ", STR(?givenName), ?authorIdentifier), 
             IF(bound(?name), 
                ?name, 
                CONCAT(STR(?familyName), ","))) 
          AS ?author_)
      }
    	OPTIONAL {
        ?res pro:isDocumentContextFor ?arEditor.
        ?arEditor pro:withRole pro:editor;
                  pro:isHeldBy ?raEditor.
        {?raEditor foaf:familyName ?editorFamilyName.} UNION {?raEditor foaf:name ?editorName.}
        OPTIONAL {
          ?raEditor datacite:hasIdentifier ?editorIdentifier__.
          ?editorIdentifier__ datacite:usesIdentifierScheme ?editorIdSchema;
                            literal:hasLiteralValue ?editorIdLiteralValue.
          BIND(CONCAT(STRAFTER(STR(?editorIdSchema), "http://purl.org/spar/datacite/"), ":", STR(?editorIdLiteralValue)) AS ?editorIdentifier_)
        }
        OPTIONAL {
          ?raEditor foaf:givenName ?editorGivenName.
        }
        BIND(IF(bound(?editorIdentifier_), CONCAT(" [", ?editorIdentifier_, "]"), "") AS ?editorIdentifier)
        BIND(
          IF(bound(?editorGivenName), 
             CONCAT(STR(?editorFamilyName), ", ", STR(?editorGivenName), ?editorIdentifier), 
             IF(bound(?editorName), 
                ?editorName, 
                CONCAT(STR(?editorFamilyName), ","))) 
          AS ?editor_)
      }
    	OPTIONAL {
        ?res pro:isDocumentContextFor ?arPublisher.
        ?arPublisher pro:withRole pro:publisher;
                  pro:isHeldBy ?raPublisher.
        ?raPublisher foaf:name ?publisherName.
        OPTIONAL {
          ?raPublisher datacite:hasIdentifier ?publisherIdentifier__.
          ?publisherIdentifier__ datacite:usesIdentifierScheme ?publisherIdSchema;
                            literal:hasLiteralValue ?publisherIdLiteralValue.
          BIND(CONCAT(STRAFTER(STR(?publisherIdSchema), "http://purl.org/spar/datacite/"), ":", STR(?publisherIdLiteralValue)) AS ?publisherIdentifier_)
        }
        BIND(IF(bound(?publisherIdentifier_), CONCAT(" [", ?publisherIdentifier_, "]"), "") AS ?publisherIdentifier)
        BIND(CONCAT(STR(?publisherName), ?publisherIdentifier) AS ?publisher)
      }
    OPTIONAL {
    	?res frbr:partOf ?resIssue.
      ?resIssue a fabio:JournalIssue;
                fabio:hasSequenceIdentifier ?issue.
    }
    OPTIONAL {
    	?res frbr:partOf+ ?resVolume.
      ?resVolume a fabio:JournalVolume;
                fabio:hasSequenceIdentifier ?volume.
    }
    OPTIONAL {
    	?res frbr:partOf+ ?journal.
      ?journal a fabio:Journal;
               dcterm:title ?venueName.
      OPTIONAL {
      	?journal datacite:hasIdentifier ?journalIdentifier__.
        	?journalIdentifier__ datacite:usesIdentifierScheme ?journalIdScheme;
                     literal:hasLiteralValue ?journalIdLiteralValue.
        	BIND(CONCAT(STRAFTER(STR(?journalIdScheme), "http://purl.org/spar/datacite/"), ":", STR(?journalIdLiteralValue)) AS ?journalIdentifier_)
      }
      BIND(IF(bound(?journalIdentifier_), CONCAT(" [", ?journalIdentifier_, "]"), "") AS ?journalIdentifier)
      BIND(CONCAT(STR(?venueName), ?journalIdentifier) AS ?venue)
    }
    OPTIONAL {?res dcterm:title ?title}
  }
  GROUP BY ?res ?title ?date ?issue ?volume ?venue ?publisher
  ```

* Ho scoperto che la libreria `multiprocessing` non solleva eccezioni in caso di terminazione improvvisa di un worker, lasciando la coda in disordine e causando un deadlock.

  [Occasional deadlock in multiprocessing.Pool](https://stackoverflow.com/questions/65115092/occasional-deadlock-in-multiprocessing-pool)

  * È possibile che un utilizzo eccessivo della memoria attivi l’OOM killer e causi un deadlock.
  * La soluzione è stata utilizzare [pebble](https://github.com/noxdafox/pebble), una libreria non built-in che unisce il meglio di `concurrent.futures` al meglio di `multiprocessing`, in particolare:
    * Permette di killare i processi dopo ogni task, senza riutilizzarli
    * Solleva un’eccezione `BrokenProcessPool` se un worker viene terminato all’improvviso

* Ho individuato un **bug catastrofico** in oc-meta:

  * **Fenomenologia**: oc-meta non esce dalla Pool dei processi a causa di un **infinite loop** in uno dei processi.
    * L’infinite loop è causato da una risorsa con più AR con ruolo editor riferiti a più RA che sono in realtà la stessa persona e senza la proprietà `oco:hasNext`.
  * Come è potuto accadere? Il Creator, in caso la risorsa sia di tipo 'proceedings article', 'book chapter' o 'book part’ collega l’AR dell’editor alla venue anziché alla risorsa bibliografica stessa. Dato che il Curator non fa lo stesso ragionamento, il Creator crea nuove AR ogni volta che incontra risorse di quei tipi con quella venue e con un editor.

    <aside>
    👉 Adesso la seguente logica viene applicata sia dal Curator che dal Creator: se una risorsa è di tipo 'proceedings article', 'book chapter', 'book part', 'book section', 'book track', 'component' o 'reference entry’ e se sono presenti autore, venue ed editor, allora l’editor si riferisce alla venue, altrimenti si riferisce alla risorsa stessa.

    </aside>

* Ho applicato i suggerimenti di **Arianna** circa l’ex coci\_process:
  * Ora si chiama **get\_ids\_from\_citations**
  * La **documentazione** è più **esplicita** sui **formati accettati** (CSV o ZIP). Se non viene trovato nessuno dei due formati, viene sollevata un’eccezione con **messaggio esplicativo**: “I did not find CSV or ZIP files in the given directory”
  * Gli id vengono salvati in più file CSV di N righe ciascuno, dove N è personalizzabile e preimpostato a 10,000. In precedenza, tutti gli id venivano salvati in un unico file CSV
  * Mi sono accorto che queste funzioni non erano testate. Aggiungere i **test** ha portato la **coverage** da 80% a **90%.**

## Domande

### Domande su oc-meta

* Se una risorsa è di tipo di tipo 'proceedings article', 'book chapter' o 'book part’ il Creator associa gli AR con ruolo di editor alla venue anziché alla risorsa stessa. Ho più di una perplessità a riguardo:
  1. È giusto che sia così?
     1. Sì
  2. È giusto che sia così solo per l’editor e non per gli autori e il publisher?
     1. Sì, per default il publisher e l’autore è sempre associato alla risorsa in considerazione
  3. Se è giusto che sia così, non dovrebbe essere così anche per le risorse di tipo ‘book section’, ‘book track’, ‘component’ e ‘reference entry’?
     1. Se c'è l’autore specificato, allora l’editor si riferisce al contenitore. Se non c'è, però, allora rischia di riferirsi alla risorsa
* oc\_ocdm tratta le risorse di tipo ‘book section’ come fabio:ExpressionCollection. In che senso la sezione di un libro è una collezione?
* Le callback di `multiprocessing` vengono eseguite dal processo principale, credo, quindi sono bloccanti, giusto? È possibile che due callback vengano eseguite contemporaneamente?

### Domande su Ramose

* Facciamo un brainstorming sulle operazioni da abilitare per l’API di OCMeta?
* Il file di configurazione di RAMOSE accetta due valori per `type`, `api` e `operation`. In tutti i file di esempio il valore di `method` per quanto riguarda l’`api` è sempre `post`. Perché?

## Note

* La documentazione di Ramose non specifica che le funzioni di postprocess devono ritornare una tupla, dove il secondo elemento è un booleano che specifica se aggiungere o meno il tipo dei valori nel risultato. Questa informazione andrebbe aggiunta.
  * In generale, sarebbe utile avere un esempio di funzione di preprocess e di postprocess. Ho avuto bisogno di spulciare nel codice di Ramose per capire come strutturarle. Ad esempio

    ```python
    # Preprocess function example

    def split_ids(s):
        return "\"%s\"" % "\" \"".join(s.split("__")),
    ```

* La documentazione di Ramose dice che il metodo exec di **APIManager** ritorna una tupla di due elementi, lo status code della risposta e la risposta, ma questo non è vero. L’operazione ritorna una tupla di tre elementi, dove i primi due sono quelli detti e il terzo è il **formato della risposta** (e.g., application/json)

* Avrei bisogno che Ramose dipenda da **python-dateutil@^2.8.2** e non 2.8.1, perché librerie usate da time-agnostic-library e oc-meta dipendono da python-dateutil@^2.8.2.

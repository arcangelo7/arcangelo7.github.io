---
title: 2024-05-20 Primo tentativo di resuscitazione falli
editUrl: false
---

## La Novitade

**Meta**

* Voilà: [https://archive.org/details/meta-triplestore-2024-04-06](https://archive.org/details/meta-triplestore-2024-04-06). Il trucco era effettivamente non specificare alcuna collezione in fase di upload

* Qualche tempo fa Francesca mi ha chiesto quanti autori hanno l'ORCID dentro Meta. La risposta è 6,819,269 autori su 298,290,649, ovvero il 2,29%.

* Oltre agli orfani, ho individuati gli oggetti che non sono mai soggetto, ovvero entità refenziate da altre entità che però non hanno alcuna tripla associata.

* Cancellare orfani ed entità non referenziate è problematico perchè oc ocdm non le considera entità valide e non le importa → Importazione custom tramite Editor (testato)

* Gestione delle entità non eliminate correttamente e introduzione dell'operazione di "resuscitazione”

  * In passato, alcuni merge hanno portato alla cancellazione teorica di entità, che però non sono state effettivamente rimosse a causa dell'assenza del datatype del tempo di cancellazione nella query SPARQL di Delete. Questo problema ha causato la permanenza di tali entità nel triplestore, creando potenziali bug durante l'importazione di nuovi dati.
  * **Problema:**
    Per la prima volta, ci troviamo a dover introdurre un'operazione di "resuscitazione" di uno snapshot di provenance già cancellato e con un tempo di invalidazione. La sfida consiste nel rimuovere il precedente tempo di invalidazione e aggiungerne uno nuovo, senza compromettere l'efficienza e l'integrità del sistema. Attualmente, la classe che gestisce la provenance non è consapevole del triplestore o dei file, rendendo complicata la gestione dell'informazione.
  * **Soluzione Proposta:**
    Nel caso di resuscitazione di un'entità, questa avrà due tempi di invalidazione:
    1. Si opera solo in aggiunta, mantenendo l'efficienza.
    2. La presenza di due tempi di invalidazione indica chiaramente che l'entità è stata resuscitata.

  Questa soluzione evita problemi di ristrutturazione del codice e di efficienza, senza estendere il data model. Ho già implementato questa soluzione per proseguire con l'ingestion. Se necessario, in futuro sarà possibile modificare la provenance collassando i due tempi di invalidazione.

* Ho cancellato gli orfani

**RML**

* Test
  * Necessità di forkare il repository
    * Incompatibili ultima versione docker: docker-compose → docker compose
    * Version 2.8.6  psycopg2-binary bug di importazione risolto in 2.9.9
    * necessità di modificare le porte dell’host dei database. Modificato file di configurazione per aggiungere questa impostazione
    * Problema di autenticazione al db risolto downgradando Postgres da 14 a 13
    * R2RMLTC0002f:

      * Two columns mapping, delimited identifiers referenced as regular identifiers
      * Tests the presence of delimited identifiers referenced as regular identifiers. Within rr:template ID is ok, but Name is not

      ```turtle
      @prefix rr: <http://www.w3.org/ns/r2rml#> .
      @prefix foaf: <http://xmlns.com/foaf/0.1/> .
      @prefix ex: <http://example.com/> .
      @prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
      @base <http://example.com/base/> .

      <TriplesMap1>
          a rr:TriplesMap;
          
          rr:logicalTable [ rr:tableName "\"Student\"" ];

          rr:subjectMap [ rr:template "http://example.com/{ID}/{Name}";
                          rr:class foaf:Person ];

          rr:predicateObjectMap
          [ 
            rr:predicate		ex:id ; 
            rr:objectMap		[ rr:column "\"ID\"";  ]
          ];

          rr:predicateObjectMap
          [ 
            rr:predicate		foaf:name ; 
            rr:objectMap		[ rr:column "\"Name\"" ]
      	]
          .
      ```

      * L’output viene generato comunque
      * Ho rilanciato il test usando RmlMapper v6.5.1 (l’ultimo) e java 22.0.1 (l’ultima) e comunque non passa. Non solo, si ripresenta il problema dei driver. Ho riprovato con Postgres versioni 16 (l’ultimo), 14, 15 e il problema persiste.
    * **R2RMLTC0002a**
      * Differenza di datatype. Il mapping non specifica affatto il datatype, quindi forse è sbagliato l’output atteso
    * ## R2RMLTC0004a

## Domande

* Esiste una tabella di dipendenze per l’rml mapper?

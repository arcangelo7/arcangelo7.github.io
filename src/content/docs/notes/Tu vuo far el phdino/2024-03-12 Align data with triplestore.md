---
title: 2024-03-12 Align data with triplestore
editUrl: false
---

## Novità

**Meta**

* Script per allineare l’RDF al triplestore

  * Bisogna prima scaricare l’RDF dal triplestore
  * Tipologie di errori
    * File json assente
    * Se file presente, entità assente
    * Se entità presente, tripla assente
  * Genera un log dei problemi trovati, dicendo sia quali file/entità ne sono affetti sia il numero di casi trovati per tipologia di errore
  * Test su dati completi e perfetti by design: nessun log generato
  * Test su dati attuali di Meta
  * Correzioni
    * Se data presente senza datatype e se anno e mese coincidono, aggiungi il datatype

  ```json
  {
      "date_datatype_missing": 2214359,
      "subject_not_found": 55912,
      "missing_triple": 4957
  }
  ```

  * Problemi
    * Numero di triple in output inferiore al numero di triple in input
      * Ci sono date di pubblicazione multiple? No
      * Problemi con filelock? Probabile. Il blocco deve contenere lettura e scrittura.
        * Numero di triple in output più vicino a quello giusto, ma ancora inferiore
      * ## Problemi con filelock e zip?
  * Spiegazione
    * Entità assenti
      * BR fuse a cui sul triplestore è rimasta solo la data di pubblicazione, probabilmente perché Blazegraph ha alterato il datatype, rendendo inefficace la query di update
    * Triple mancanti
      * Differenza nel datatype delle date

        * Ho testato oc\_ocdm e il datatype della data viene registrato correttamente nell’RDF. Il datatype viene ricavato automaticamente da oc\_ocdm a partire dalla data in formato ISO. Date senza datatype, in teoria, non dovrebbero mai essercene nell’RDF. Com’è possibile che ce ne siano?
        * Infatti, altre entità hanno il datatype per le date
        * Ho lanciato Meta in multiprocessing che un input di test e i datatype delle date sono stati registrati correttamente nell’RDF

        [https://github.com/opencitations/oc\_meta/issues/21](https://github.com/opencitations/oc_meta/issues/21)

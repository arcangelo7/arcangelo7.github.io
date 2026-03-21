---
title: 2024-04-05 Revisione AIUCD
editUrl: false
---

## La Novitade

oc\_ocdm

* CONSTRUCT → SELECT

**Meta**

* .split(':') → .split(':', maxsplit=1)
* peer\_review → peer review
* Aggiornata lista tipi gestiti da API Meta. Ho pushato su api/master. Bisogna fare qualcosa?
* Ho dovuto modificare a mano usando l’editor 6 risorse in cui si era rotto l’ordine dei ruoli
* Generazione dell’RDF a partire dal triplestore

**SAL**

* [https://www2.classics.unibo.it/eikasmos/index.php?page=ricerca](https://www2.classics.unibo.it/eikasmos/index.php?page=ricerca)
  * Permettere ricerca sui singoli campi (titolo, parola chiave, abstract…)
  * Aumentare tipi br
  * Parole chiave fondamentali
  * Miscellanea, monografia, traduzione, edizione commentata
  * Ragionare su qual è il formato migliore per il riuso
  * Stilare lista di requisiti

**OUTCITE**

> Dear Arcangelo,

> I hope you are doing well. Attached you could find the new improvised CSVs as per the suggestions and feedback provided in your previous emails.

> Information on the generation of the dummy ids:- The dummy id for non-sourced reference has been generated in the following format:

> e.g. “**tmp:gesis-ssoar-92076\_ref-0\_block-1919712**”

> The string is the concatenation of the followings and segregated by “\_”:

> documents id as “gesis-ssoar-…”

> reference index within the document as “ref-…”

> lastly the block id for deduplication as “block-…”
>
> * All the references with the same block id are considered as the potential duplicates but the results are not guaranteed as same block might also contains false positives i.e. the reference wrongly detected as a duplicate for particular block. This information along with your additional checks and constraints could help you in data disambiguation and deduplication.

> Furthermore, we also have the additional information which is not considered for the ingestion but could be added on demand. Kindly let me know if adding any/all of them helps:

> Extracted reference strings for each parsed reference.

> Multiple ids for an item as we are matching references against multiple target collections.

> URLs for most of the sourced references.

> If you have any further questions or encounter any other issue in the data that needs detailed discussion, feel free to pingback. Thank you and have a nice day!Best regards,

> Ahsan
>
> [attachments/88dba4d115ae40f084f8b584ca4a934c.csv](/notes/attachments/88dba4d115ae40f084f8b584ca4a934c)
>
> [attachments/c9e1d8346aaa47cd9f5bcee668b06b61.csv](/notes/attachments/c9e1d8346aaa47cd9f5bcee668b06b61)

**AIUCD**

* **Common European data space for cultural heritage**

  * [https://pro.europeana.eu/page/common-european-data-space-for-cultural-heritage](https://pro.europeana.eu/page/common-european-data-space-for-cultural-heritage)
  * [https://pro.europeana.eu/page/data-space-deployment](https://pro.europeana.eu/page/data-space-deployment)

  [https://www.youtube.com/watch?v=90-mG1cl7uQ](https://www.youtube.com/watch?v=90-mG1cl7uQ)

## Domande

* Come faccio a rimuovere il punto e virgola dal nome di un agente senza id, quindi in assenza di parentesi quadre che facciano da marcatore per la fine dell’agente? Sarebbe carino se i punti e virgola venissero rimossi dall’id\_manager, cioè in fase di creazione delle tabelle
  * Al momento uso questa espressione regolare: `'\s*;\s*(?=[^\]]*(?:\[|$))’`. Cerca un punto e virgola che può essere preceduto e seguito da spazi bianchi. Questo punto e virgola deve essere seguito da qualsiasi numero di caratteri che non siano una parentesi quadra chiusa **`]`**, fino a trovare una parentesi quadra aperta **`[`** o la fine della stringa **`$`**. Questo pattern è particolarmente utile per identificare separatori in una lista dove gli elementi possono essere racchiusi tra parentesi quadre e vuoi evitare di dividere elementi basandoti sui punti e virgola che potrebbero apparire all'interno delle parentesi. Serve per non catturare i punti e virgola presenti negli id.

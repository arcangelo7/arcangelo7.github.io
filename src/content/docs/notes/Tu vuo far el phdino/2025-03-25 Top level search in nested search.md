---
title: 2025-03-25 Top level search in nested search
editUrl: false
---

## La Novitade

### HERITRACE

* Se per una determinata entità annidata ho stabilito che voglio ricercare il genitore anziché l'entità stessa ma il genitore è l'entità che io sto creando a livello zero ecco che ho un caso eccezionale perché sto eseguendo una top level search non a livello zero ma a un livello annidato. Ho gestito questo caso particolare

BUGFIX

* Ora i dati vengono raccolti correttamente dal form di creazione di un'entità anche in caso di entità preesistenti selezionate in struttura annidata (e.g., issue, volume, journal)
* Problema di concorrenza riguardo l'eliminazione di entità e delle loro relazioni. Quando si tentava di eliminare sia una tripla specifica che l'entità oggetto della tripla stessa, si verificava un errore perché le operazioni interferivano tra loro. L'eliminazione delle entità proxy/intermedie causava la scomparsa delle triple che contenevano tali entità come oggetto, rendendo impossibile la successiva eliminazione esplicita di queste triple. La soluzione è stata ristrutturare la logica in due fasi distinte: prima eliminare tutte le entità proxy/intermedie, poi procedere con l'eliminazione delle triple specifiche, controllando preventivamente se l'oggetto della tripla è già stato eliminato. Questo approccio risolve alla radice il problema, garantendo che le operazioni di eliminazione vengano eseguite in un ordine logico che previene conflitti.
* Errori estetici
  * Pulsanti di modifica cancellazione e linea del tempo rimanevano sulla stessa riga anche per schermi piccoli

## Domande

* Aldrovandi
  * Agente responsabile: io
  * Fonte primaria: è uno Zenodo che esiste/esisterà (chiedere a Ari)
  * Dare la provenance ad Ari

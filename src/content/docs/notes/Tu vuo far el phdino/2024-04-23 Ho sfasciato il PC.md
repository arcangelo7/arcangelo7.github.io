---
title: 2024-04-23 Ho sfasciato il PC
editUrl: false
---

## La Novitade

**oc\_meta**

```bash
Entity Type: ra, Missing 'hadPrimarySource': 33436297/318116386 (10.51%)
Entity Type: re, Missing 'hadPrimarySource': 6881592/71669593 (9.60%)
Entity Type: br, Missing 'hadPrimarySource': 13396269/144865016 (9.25%)
Entity Type: ar, Missing 'hadPrimarySource': 27709099/449278006 (6.17%)
Entity Type: id, Missing 'hadPrimarySource': 17069423/220292361 (7.75%)
```

* 55,709 entità isolate. Sono solo br. Tutte quelle che no controllato hanno solo la data di pubblicazione.
* Mi sono accorto che Meta usava una versione datata dell’id manager. L’ho aggiornata
* 14,392 br con re multipli
  * Anziché cancellarli a caso, ho pensato che la cosa migliore sia cancellare tutti quelli che sono stati aggiunti. Come individuarli? time-agnostic-library
  * Ho cancellato 17,312 re

**time-agnostic-library**

* Gestisce automaticamente file di provenance zippati

## Domande

* Non ho capito bene perché una parte dei test su oc\_ds\_converter usi pytest e un’altra unittest

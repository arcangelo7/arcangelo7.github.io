---
title: 2023-07-25 Una-Her-Doc bureaucracy
editUrl: false
---

## Novità

**Sito** ([https://opencitations.net/download](https://opencitations.net/download))

* Ho aggiunto i record di tutte le versioni di Meta. Ogni record include le informazioni su:
  * Qual è stata la modifica principale
  * Le statistiche
  * Link alla versione del dump corrispondente su Figshare

<aside>
⚠️ Problema:

* Il numero di venue nella prima versione è superiore al numero di venue nelle versioni successive, perché è cambiato il modo in cui produco i CSV ed evidentemente la prima volta c’erano CSV duplicati. Che faccio?

</aside>

**JWS**

* Ho implementato l’uso di PostgreSQL per salvare su disco le modifiche su cui basare la creazione degli snapshot e diminuire in questo modo il carico sulla RAM
  * Tempi drasticamente aumentati
    * Tentativo 1: multiprocessing e multithreading → collo di bottiglia. Dove? Non lo so
    * Tentativo 2: richieste in batch a PostGreSQL, 1,000,000 di entità alla volta. Problema risolto
  * Qualche statistica:
    * Versione 1-2: 34 minuti
* Le query di update vengono generate direttamente dalla stringa delle triple aggiunte e rimosse, senza passare da rdflib, che da solo rallenta enormemente il processo.

[attachments/ea137a8ec3ea42e0ad6dae93f4969f9f.json](/notes/attachments/ea137a8ec3ea42e0ad6dae93f4969f9f)

**Una-Her-DOC**

![attachments/679a78cb19cf40eb83c82f016c6ae5aa.png](../../../../assets/notes/attachments/679a78cb19cf40eb83c82f016c6ae5aa.png)

* Da questo calendario sembrerebbe che io debba partecipare a un workshop in presenza a novembre
* Marco Polo

[attachments/f50f6a426cc44c42bcfdbec9facc6ad2.docx](/notes/attachments/f50f6a426cc44c42bcfdbec9facc6ad2)

**California**

* Volo pagato da CZI

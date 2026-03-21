---
title: 2023-01-17 Inizio del dottorato
editUrl: false
---

## Novità

* Ho scritto la lettera di risposta ai revisori dell’abstract per DH Graz 2023

### Meta

* Ho aggiornato l’API di Meta perché restituisca autori ed editor nel giusto ordine per tutte le operazioni
* Per ragioni inquietanti e misteriose ci sono ruoli, agenti e identificatori sul triplestore assenti nei dati RDF.
  * Il generatore di CSV sincronizza triplestore e dati RDF in caso manchino entità in questi ultimi.
* Il generatore di CSV si occupa ora anche di correggere l’ordine dei ruoli in caso ci sia un numero di ultimi ruoli diverso da uno o un ruolo abbia come successivo se stesso.
* La generazione dei CSV può avvenire il parallelo.
* Risolto un bug in Meta per cui a volte non veniva creata la pagina iniziale o finale nel caso di risorse con una sola pagina.
  * csv\_generator corregge l’errore se lo incontra

### Sapevate che sto facendo un dottorato?

* RML
  * Ho letto:
    * [https://github.com/RMLio/**rmlmapper-java**](https://github.com/RMLio/rmlmapper-java#features)
    * A. Dimou, T. De Nies, R. Verborgh, E. Mannens, P. Mechant, and R. Van de Walle, “**Automated metadata generation for linked data generation and publishing workflows**,” in Proceedings of the 9th Workshop on Linked Data on the Web, Montreal, Canada, 2016, pp. 1–10
    * Dimou, A., Sande, M.V., Colpaert, P., Verborgh, R., Mannens, E., & Walle, R.V. (2014). **RML: A Generic Language for Integrated RDF Mappings of Heterogeneous Data**. *LDOW*.
    * [https://app.rml.io/**rmleditor/**](https://app.rml.io/rmleditor/)

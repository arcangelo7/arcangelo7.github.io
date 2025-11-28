---
title: 2023-01-25 Generic oc_ocdm
editUrl: false
---

## Novità

* Ho (ri)aggiunto i metadati di Datacite a Meta
* Ho scoperto un bug in oc\_ocdm per cui gli snapshot di merge non aggiungevano mai lo query di update, se presente.
* Ho aggiunto una nuova funzionalità all’editor per Meta che permette di fare il merge tra due entità.
* Ho imparato a scrivere mappature YARRML tramite il seguente tutorial: [https://rml.io/yarrrml/tutorial](https://rml.io/yarrrml/tutorial)
* Ho provato a utilizzare RML editor per comprendere meglio la sintassi, ma non è installabile in locale e la versione community è troppo limitata circa le funzioni utilizzabili.
* Ho seguito la prima lezione di **Information literacy workshop** tenuto da **Elena Collina**
* Ho aggiunto il fuso orario alla provenance di COCI gennaio
* Index v2: se una chiamata a Meta supera i 2048 caratteri viene divisa finché ogni chiamata è più corta di 2048 caratteri.
* Ho esteso oc\_ocdm:
  * `GenericGraphSet`
    * `add_entity`: Aggiunge al `GraphSet` (`Dict[URIRef, GenericGraphEntity]`) una generica entità dato il suo URI, tipo, agente responsabile, fonte, grafo e grafo preesistente.
  * `GenericEntity`
    * È un’entità generica, non segue la nomenclatura delle entità di OpenCitations. Non ha count, label e short\_name.
  * I metodi di `AbstractSet` e `AbstractEntity` vengono riciclati, quindi si possono aggiungere tutte le triple relative a ogni entità in maniera agnostica sul data model.
  * Creare queste due classi permette di utilizzare il meccanismo di generazione della provenance a partire da entità generiche.

## Domande

* credo di aver capito perché ci sono entità sul triplestore di Meta e non dei dati RDF. Potrebbe essere un problema dovuto al funzionamento di oc\_ocdm. oc\_ocdm prende un solo di supplier prefix alla volta per ogni istanza di GraphSet e ProvSet. Se un processo è vincolato a un certo supplier prefix, ma incontra un'entità con un altro supplier prefix preesistente, allora non gestisce correttamente il salvataggio di dati e provenance in RDF di quest'ultima. Ti torna? (modificato)

  Per dire, al momento questa operazione è impossibile con oc\_ocdm:

  ```python
  res_as_entity = g_set.get_entity(URIRef('[https://w3id.org/oc/meta/id/0604'))](https://w3id.org/oc/meta/id/0604')))
  other_as_entity = g_set.get_entity(URIRef('[https://w3id.org/oc/meta/id/06104'))](https://w3id.org/oc/meta/id/06104')))
  res_as_entity.merge(other_as_entity)
  ```

  È impossibile perché `g_set` (e poi `prov_set`) avrà un unico supplier prefix, ad esempio 060. Non può avere sia 060 che 0610

* Ho provato a scrivere una mappatura RML ma mi sono scontrato con la difficoltà nell’utilizzare funzioni esistenti e definirne di nuove. A chi posso chiedere aiuto?

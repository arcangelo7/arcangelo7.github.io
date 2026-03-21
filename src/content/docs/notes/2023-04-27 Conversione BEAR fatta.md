---
title: 2023-04-27 Conversione BEAR fatta
editUrl: false
---

## Novità

**oc-meta**

* Tentativi multipli per le query a Blazegraph in caso di nessuna risposta o eccezione
* Risolto un bug per cui il software responsabile per la fusione degli id duplicati funzionava solo se gli id duplicati erano due e non più
* Ho scritto un software per fondere br e ra che hanno identificatori in comune, o perché conflittuali o per il bug di Blazegraph
  * ra: 1582
  * br:
* Ho aggiunto un metodo all’editor per Meta per purgare un’intera entità e rimuovere i collegamenti a essa
* Tutti gli algoritmi di correzione automatica di Meta utilizzano una funzione per agire sui file del dump. Quella funzione contiene ora un lock sul file che viene processato. L’assenza di quel lock causava inconsistenze nel momento in cui due processi provavano a sincronizzare contemporaneamente il dump con il triplestore.

**rdflib-ocdm**

* Ho aggiunto lo Storer con il metodo per salvare grafo e provenance su triplestore
* Affinché lo Storer funzioni allo stesso modo per la provenance e i grafi, ho reso OCDMProvenance una sottoclasse di ConjunctiveGraph
* La libreria viene testata a ogni commit (Python 3.7 → 3.10) e la coverage aggiornata. La coverage attuale è 89%.
* Ora la libraria si trova all’interno dell órganizzazione opencitations di GitHub
* La libreria è su PyPi

**time-agnostic-library**

* Ho completato il software che converte gli snapshot di BEAR in un triplestore di dati e provenance secondo l’OCDM

## Domande

* SQLLiteCounterHandler: usare o non usare URI snapshot come primary key? E se l’URI contiene un punto?

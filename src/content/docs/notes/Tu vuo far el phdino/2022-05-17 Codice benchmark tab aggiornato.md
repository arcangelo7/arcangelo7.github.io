---
title: 2022-05-17 Codice benchmark tab aggiornato
editUrl: false
---

## Cosa ho fatto

* Novità relative ai benchmark su time-agnostic-library
  * Ho aggiornato il software e i dati per automatizzare la procedura di benchmark su Fuseki e Virtuoso.
  * Mi sono accorto che il software non funzionava correttamente su Linux. L’ho modificato di conseguenza.
  * Ho lanciato i benchmark su Ubuntu. In passato, li avevo lanciati su Windows, ma mi sono accorto che Windows mette arbitrariamente in pausa alcuni processi. Spero che Ubuntu sia piu affidabile.
* Sto tagliando l’articolo sulle time-traversal queries
  * Introduzione
    * Nessun riassunto della literature review, solo un generico accenno con il range di citazioni
  * Literature review
    * Per ogni metadata representation model, ho illustrato solo la caratteristica chiave, i suoi pro e i suoi contro.
  * Methodology
    * Ho aggiunto una breve descrizione di time-agnostic-library in fondo, rimandando a una documentazione esterna per maggiori dettagli.
      * In particolare, ho parlato della compatibilità con Blazgeraph, GraphDB, Fuseki e Virtuoso, della possibilità di avvalersi dei rispettivi indici testuali, della cache, dei test e della riproducibilità dei test grazie alla loro automazione.
  * Ho trasformato i Listing in immagini, in modo che i contatori di parole automatici non contino le parole in essi incluse.
* Ho potenziato la cache di time-agnostic-library.
  * In precedenza, le query agnostiche su intervalli di tempo definiti non contribuivano alla cache. Ciò avveniva perché, in caso di cache parziale, verificare se le informazioni in cache erano tutte quelle necessarie era più dispendioso che non usare la cache.
  * Ho trovato una soluzione: salvare in cache l’intervallo di tempo in essa contenuto.
    * Una query successiva può avvenire:
      * su intervallo uguale o inferiore, per cui vengono utilizzate le informazioni in cache e la ricostruzione viene saltata.
      * su un intervallo superiore, per cui bisogna effettuare la ricostruzione ed estendere la cache.
  * Perché investire tempo ad aggiungere una nuova funzione se la scadenza del 9/06 è imminente? Perché senza questa funzione non era possibile ottenere risultati consistenti nei benchmark. Infatti, le query su tutte le versioni riempiono e sfruttano la cache, quelle single-version la riempivano ma non la sfruttavano. In questo modo, non era possibile svuotare la cache per ogni query. Svuotate la cache prima di ogni batteria è fondamentale, altrimenti viene occultato il problema prestazionale dovuto a riempire la cache.
    * In passato avevo risolto il problema usando un triplestore vuoto alla prima run di ogni query e un triplestore con tutta la cache in quelle successive, ma ho preferito risolvere il problema alla radice anziché perdere tempo a propagare questo trucchetto.
* Novità relative a Meta:
  * Risolto un bug nella preparazione al multi-processing per cui le venue non venivano caricate sul triplestore con tutti gli id presenti in tutto il dump. Di conseguenza, era possibile che alcune venue sollevassero conflitti (più risorse con lo stesso id). Non era un bug grave, dato che le risorse conflittuali si possono agilmente fondere, ma era una sbavatura che ho preferito eliminare.
  * Sto monitorando Meta, in particolare per quanto riguarda errori ed entità conflittuali nei log. Finora, oc\_meta ha processato 3000/66,000 file senza errori e senza generare conflitti.

## Domande

* Nella vostra esperienza, qual è un buon batch size per una query SPARQL di update (INSERT DATA) in termini di numero di triple?

---
title: 2024-02-14 Errori in BEAR
editUrl: false
---

## Novità

**Meta**

* Tipo di entità: br, Totale entità: 4,568,231, Entità con 'Done'=True: 0
* Tipo di entità: ra, Totale entità: 4,047,019, Entità con 'Done'=True: 1,790,195
* Ho misurato il tempo impiegato per i vari passaggi del merge. Il 99% del tempo è assorbito dalla fase di salvataggio dei dati e della provenance su file (1:4), fase che ho già ampiamente ottimizzato in passato

**time-agnostic-library**

* Il motivo per cui molte entità non comparivano nei risultati attesi era che mancava la versione 1, perché i file con le triple aggiunte e rimosse forniti da bear partono dalla versione 1-2. Ho quindi modifico lo script che genera la provenance in modo che riceva in input anche il file contenente le triple presenti nella versione 1, per cui vengono generati solo snapshot di creazione
* Oltre ad aggiungere il fuso orario senza che nessuno gliel’abbia chiesto, Blazegraph modifica anche i microsecondi degli oggetti xsd:dateTime tagliando a 3 cifre significative, così. Alla fine, per far coincidere i timestamp associati alle versioni con quelli presenti sul triplestore, ho deciso di ricavare i timestamp direttamente dal triplestore.
* Se l’intervallo in input è naive, diventa timezone aware con UTC
* Altri motivi per cui i risultati non coincidevano con quelli attesi:
  * l’ordine dei binding non corrispondeva all’ordine delle variabili
  * C’è un’errore di encoding nei risultati forniti da BEAR: en dash viene rappresentato come ?. I dati vengono normalizzati prima del confronto.
  * Alcune triple sono presenti nella versione 0, non sono presenti nella versione finale, ma in nessun file di delta c’è scritto che siano state cancellate. Questo è un bug di BEAR. Ho scritto una mail ai bomber per chiarire.
* Il problema che pensavo esserci riguardo il filtro degli snapshot rilevanti non c’è, non avevo letto bene il mio codice.
* Per andare più veloci, in caso di più entità da ricostruire, viene effettuata un’unica query SPARQL al dataset di provenance con cui vengono recuperati tutti gli snapshot di tutte le entità. In questo modo, avviene un unico collegamento al database. Batch di 10 entità alla volta
  * Prima senza multi-threading: 63.651246309280396
  * Dopo senza multi-threading: 68.94609379768372
  * Dopo con multi-threading: 77.71862649917603s
  * La vita non ha senso

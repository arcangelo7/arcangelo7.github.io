---
title: 2022-09-06 Query combinate con le apette
editUrl: false
---

## Cosa ho fatto

### Novità relative all’articolo per JASIST

Ho risposto a tutti i commenti dei revisori e completato l’articolo.

### Modifiche al codice di time-agnostic-library affinché i risultati dei benchmark abbiano un senso

* Risolto un bug delle query sui delta per cui il filtro sui tempi rilevanti veniva applicato dopo aver inserito le entità rilevanti dell’output. Tali entità devono essere invece escluse dall’output se non sono cambiato nell’intervallo desiderato.

* La query per trovare la baseline delle query sui delta è la query sui delta delle entità che si trovano nel dataset corrente. In questo modo, si ottiene il carico aggiuntivo del dover trovare le entità che non esistono più.

* Le entità soggetto di un triple pattern isolato presenti nello snapshot più recente possono essere materializzate in parallelo. Lo stesso vale per la ricostruzione delle variabili esplicitate. In generale, l’operazione di ricostruzione di una serie di entità può sempre avvenire in parallelo con enormi vantaggi in termini di performance.

* Ora la cache registra anche l’assenza di informazioni. Se ad esempio si esegue una query su una versione e per una certa entità non ci sono informazioni in quell’intervallo, la cache registra questa mancanza di dati. In questo modo, tale controllo non verrà più effettuato. Tuttavia, se i dati dovessero comparire per quel periodo sarà necessario svuotare la cache per visualizzarli. D’altronde, la cache ha sempre questa controindicazione, che io sappia.

* La query sulla cache è ora molto più veloce, per due motivi:

  1. I tempi rilevanti vengono salvati come oggetti di cui il soggetto è noto, ovvero il nome dell’entità.
  2. La query sui tempi rilevanti viene effettuata a parte, anziché complicare la query sui grafi passati delle entità. Due query piccole in questo caso sono molto più veloci di un’unica query grande.

  Tale modifica si è resa necessaria, perché in presenza di molti snapshot la query sulla cache risultava più lenta che ricostruire le versioni da zero.

* Ho trovato il modo di fare una **query temporale** su **Wikidata**: "Quali città italiane hanno una popolazione superiore al milione di abitanti?": [https://w.wiki/4rs](https://w.wiki/4rs)

### Novità relative alle API di OC Meta

* Il limite sul numero dei risultati è stato aumentato da 1000 a 10000.

* Il cognome è un match perfetto. Se il cognome è stato specificato, il nome viene cercato solo sui risultati del cognome. Ecco alcune regole sulla ricerca del nome:

  * George Alfred → ^George Alfred\$
  * G.A. → ^G.+? A.+?\$
  * G. A. → ^G.+? A.+?\$
  * G A → ^G.+? A.+?\$
  * G. → ^G.+?\$
  * Alfred. → ^Alfred.\$
  * La wildcard “*” viene sostituita con “.*?” in qualunque posizione si trovi

  Queste regole vengono applicate sono se viene specificato il cognome, altrimenti si ricorre all’indice testuale di Blazegraph, che supporta solo la wildcard a fine stringa.

  Per qualche ragione, utilizzare FILTER REGEX è molto più veloce che utilizzare l’indice testuale se si vuole sfruttare il join sui match del cognome tramite `hint:Prior hint:runFirst true`.

* Ho notato che la query è più veloce se la scrematura sui risultati di una ricerca sull’indice testuale viene fatta tramite FILTER e non tramite un’altra ricerca sull’indice. Pertanto, le ricerche sull’indice vengono fatte solo nel primo BGP di ciascuna unione di grafi.

* Ho implementato le query combinate tramite operatori && e ||

* Ho aumentato a 10,000 il numero massimo di risultati.

* Ha aggiunto la ricerca testuale su id

* Cognomi, nomi in assenza di cognome e id prevedono il match perfetto. Per tuti gli altri campi la rilevanza minima è 0.7.

* Proviamolo: [https://oc-meta.arcangelomassari.it/](https://oc-meta.arcangelomassari.it/) La scorsa volta c’erano 161,267,659 triple, questa volta ce ne 1,112,907,963

## Domande

### Domande relative all’articolo per JASIST

* Ho testato tutte le tipologie di query includendo nelle query dei **BNode** e non ho riscontrato problemi di sorta. Posso scrivere nell’articolo che le query di update possono contenere dei BNode? Reviewer #2 ce lo ha chiesto esplicitamente e dobbiamo rispondere.
  * In particolare, ho verificato che sia rdflib che Blazegraph creano sempre un identificatore univoco ogni volta che incontrano un BNode.
* Al contrario, le query di update devono contenere sempre **URI assoluti senza prefissi**, perché alcune operazioni si basano sul match di URI. Giusto?

### Domande relative alle API di OC Meta

* Perché vengono restituiti risultati non rilevanti anche con `bds:minRelevance '1.0'`, `bds:matchAllTerms 'true'` e la stringa tra doppie virgolette?
* Non ci ho ho ancora riflettuto granché, ma qualcuno ha idea di come implementare la **ricerca combinata** tramite **ramose**? Come faccio a combinare tra loro operazioni diverse?

### Altro

* Se non specifico la Nazione su FAIRSharing la proprietà compare lo stesso con valore “None found”. Per quanto riguarda OCO, che non ha ancora un DOI, ho specificato “Italy, United Kingdom”. Per quanto riguarda le altre ontologie che hanno già un DOI, posso modificarle o è troppo tardi?
* Davide chiede:

  > In Croci ci sarà la classica operazione /metadata/schema/id; ora come ora recupera da crossref ma ovviamente dovrà recuperare da Meta. Secondo te è meglio se mando tutta la query sparql all'endpoint di meta o se uso l'api che hai sviluppato tu per ramose? Credo vhe la prima via sia più logica perché risparmierei un passaggio, ma di fatto farei la stessa query che fai tu con l'aggiunta delle informazioni sulle citazioni

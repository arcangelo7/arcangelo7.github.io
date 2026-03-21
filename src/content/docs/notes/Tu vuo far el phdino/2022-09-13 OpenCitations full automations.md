---
title: 2022-09-13 OpenCitations full automations
editUrl: false
---

## Cosa ho fatto

### Novità relative al crowdsourcing

Ho studiato tutta la documentazione di [**GitHub Actions**](https://docs.github.com/en/actions). È ricchissima, ci sono voluti due giorni.

* **Limiti** di utilizzo che ci interessano:
  * Possono essere messe in coda non più di **500** esecuzioni di **workflow** in un intervallo di **10 secondi** per repository e si possono eseguire massimo **1000** richieste ad **API** all’**ora**. Pertanto, è conveniente eseguire i workflow in **batch**.
  * I **log** generati dai workflow vengono **cancellati** dopo **90 giorni**. Pertanto, è conveniente generare dei log **autonomamente** da GitHub.
  * Non è documentato da nessuna parte (meno che in questo [issue](https://github.com/cli/cli/issues/4801)) ma è possibile creare massimo **150 issue** all’**ora** tramite API. Me ne sono accorto raggiungendo questo limite.

* Sembra che sia possibile cancellare le issue tramite **GitHub CLI** ([https://cli.github.com/manual/gh\_issue\_delete](https://cli.github.com/manual/gh_issue_delete)), ma devo verificare. Stranamente, tale operazione non è possibile né tramite actions né tramite API.

* Ho aggiunto 1050 [issues](https://github.com/arcangelo7/issues/issues) a una repository vuota e la sua dimensione risulta essere 0 kb: [https://api.github.com/repos/arcangelo7/issues](https://api.github.com/repos/arcangelo7/issues). Sto indagando la presenza di un hard cap non documentato.
  * Ho trovato una repo con circa 119,000 issue chiuse, quindi credo di essere molto lontano dal cap, se ne esiste uno: [https://github.com/AdguardTeam/AdguardFilters/issues?q=is%3Aissue+is%3Aclosed](https://github.com/AdguardTeam/AdguardFilters/issues?q=is%3Aissue+is%3Aclosed)

### Novità sulle API di OC Meta

* I gruppi di richieste separate da AND vengono riordinate in maniera tale che la prima a essere processata sia quella che riduce maggiormente il numero di soluzioni. L’ordine è id\<editor\<author\<title\<venue\<publisher\<volume\<issue
* La query su autori ed editor **senza virgola** viene effettuata sia sui foaf:name che sui foaf:familyName.

```sparql
# Lento
{?tsAuthorRa0 foaf:name ?tsAuthorName0.} UNION
{?tsAuthorRa0 foaf:familyName ?tsAuthorName0.}
?tsAuthorName0 bds:search '"peroni"'.
hint:Prior hint:runFirst true.

# Veloce
?tsAuthorRa0 ?namePredicate ?tsAuthorName0.
VALUES (?namePredicate) {(foaf:name) (foaf:familyName)}
?tsAuthorName0 bds:search '"peroni"'.
hint:Prior hint:runFirst true.
```

* È ora possibile cercare **volumi** e **numeri**, a patto di aver specificato la venue in ciascun gruppo di richieste separate da AND

* I volumi e i numeri vengono esclusi dai risultati delle ricerche testuali su case editrici e riviste.

  ```sparql
  # Lento
  FILTER NOT EXISTS {
     ?res a ?type.
      VALUES (?type) {(fabio:JournalIssue) (fabio:JournalVolume)}}

  # Veloce
  FILTER (?type != fabio:JournalVolume) 
  FILTER (?type != fabio:JournalIssue)
  ```

* Ho abbassato la rilevanza minima a 0.4 su 1, ovvero il massimo per permettere a IEEE e Springer di essere trovati.

* Ho risolto il bug per cui venivano ritornati risultati non pertinenti. Era dovuto a un errore nell’aggregazione, per cui i risultati non venivano raggruppati solo in base al MetaId, ma a tutti i campi che ritornano un unico valore.

* Ho aggiornato la **documentazione** delle API con tutte le novità.

### Novità relative a OC Meta

* Finora OC Meta ha processato 41,668,295 su 71,650,696 risorse bibliografiche (58%)
* Alcuni esempi di risorse bibliografiche con più DOI:
  * La rivista *Webmedcentral* ha associati decine di DOI ([10.9754/journal.wmc.2011.001829](http://api.crossref.org/works/10.9754/journal.wmc.2011.001829), [10.9754/journal.wmc.2013.004415](http://api.crossref.org/works/10.9754/journal.wmc.2013.004415), [10.9754/journal.wmc.2010.00562](http://api.crossref.org/works/10.9754/journal.wmc.2010.00562)…) che l’editore avrebbe dovuto associare agli articoli e non alla rivista.
    * Anche il *Türk Pediatri Arşivi* ha più DOI, ma essi di riferiscono veramente alla rivista, e non è un caso isolato ([10.5152/tpa,](https://doi.org/10.5152/tpa) [10.5152/turkpediatriars.](https://doi.org/10.5152/turkpediatriars.)).
  * Il libro *Monad to Man* ha 2 DOI ([10.4159/9780674042995](http://api.crossref.org/works/10.4159/9780674042995), [10.2307/j.ctv1kz4gtk](http://api.crossref.org/works/10.2307/j.ctv1kz4gtk)), uno per la versione pubblicata da JSTORE e l’altro per la versione pubblicata da Harvard University Press. Questo schema di ripete 4154 volte.
* Ho aggiunto ‘ror’ agli schemi gestiti.

### OSF-IF

* Ho compilato la tabella delle proprietà e relazioni.

## Domande

* OCDM contempla le risorse di tipo “software”? Lo chiedo anche in relazione al lavoro su OSG-IF, dove bisogna indicare se OpenCitations gestisce questo tipo di “research product”.
* Come faccio a ritornare un errore 400 tramite Ramose? Se sollevo un’eccezione con messaggio esplicativo viene ritornato un 500.
* Come gestire autori ed editor con nomi e cognomi indistinti derivanti dal crowdsourcing?

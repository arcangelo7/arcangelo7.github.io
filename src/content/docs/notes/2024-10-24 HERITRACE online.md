---
title: 2024-10-24 HERITRACE online
editUrl: false
---

## La Novitade

### Meta

* Ennesimo bug: nella generazione dei contatori su Redis c’era un timeout nel caricamento. Doveva essere scaduto per alcuni caricamenti, dato che nei controlli sulla provenance mi sono accorto di altri snapshot di modifica corrispondenti allo snapshot 1.
  * Ho rimosso quel timeout
  * Ho creato uno script che controlla che tutte le entità presenti nella provenance abbiano un contatore associato
* Per la generazione degli info dir, per individuare i duplicati nei file rdf e per fare i controlli solitamente uso json e non rdflib, perché infinitamente più veloce. Ho provato a individuare gli id duplicati usando rdflib e i risultati sono stati grazie a dio identici.
  * L’individuazione degli id duplicati ora funziona in parallelo e fonde i duplicati trovati alla fine
* Test su github: python-version: \["3.10", "3.11", "3.12", "3.13"]

### HERITRACE

* [https://paratext.ficlit.unibo.it/](https://paratext.ficlit.unibo.it/)
* Login via ORCID
  * Il responsible agent per le modifiche viene preso direttamente dall’orcid dell’utente loggato
  * Cookie di sessione di 30 giorni SENZA REMEMBER ME
  * Il token di sessione viene ruotato a ogni caricamento dell'utente dal cookie, aumentando la sicurezza (senza rompere i coglioni)
* Uniformazione nella logica e nella visualizzazione delle modifiche tra la linea del tempo e la singola versione
* L’ultimo evento della linea del tempo ha come data di fine la stringa “Present”
* Ripristino versioni precedenti in cui sono state modificate anche entità correlate (ad esempio perché è stato modificato l’ordine).
  * ho completamente riscritto la logica. Adesso prende la versione passata restituita da time-agnostic-library, la quale comprende anche informazioni sulle entità correlate se richiesto. Poi prende ricorsivamente le informazioni sullo stato attuale dell’entità e delle entità correlate. Fa il diff, genera una query sparql dal diff (diversa a seconda che si stia lavorando con un triplestore o un quadstore) ed esegue la query.
* Modifica entità
  * Validazione min e max
* Creazione entità
  * Rispetto del datatype definito nello shacl, default a XSD.string
  * Valori obbligatori (fabio:Expression, fabio:JournalArticle per gli articoli ecc) trasparenti nell’interfaccia di creazione.
* [https://github.com/openlink/virtuoso-opensource/issues/1322](https://github.com/openlink/virtuoso-opensource/issues/1322)
* API
  * ORCID: nome, cognome, bio
  * Zenodo:  citazione apa style, tipo, parole chiave, lingua, access right

### time-agnostic-library

* timestamp sempre offset-aware. Offeset diversi da UTC vengono convertiti in UTC. Timestamp offset-naive vengono considerati UTC.
* related entities histories funziona anche sullo stato corrente dei dati
* Test github: python-version: \["3.8", "3.9", "3.10", "3.11", "3.13"]

### rdflib\_ocdm e oc\_ocdm

* Datatype sempre e comunque. Se non c’è è XSD.string
  * Anche Meta aggiunge sempre XSD.string se non c’è datatype. Il match sui valori letterali degli id avviene sia con che senza datatype per sicurezza
* test su github su virtuoso
  * python-version: \["3.7", "3.8", "3.9", "3.10", "3.11", "3.12", "3.13"]

### oc\_ds\_converter

* flushall → flushdb
* github actions mette su redis per far passare i test su github
* raw string per le regex. Funzionavano anche prima ma da python 3.12 in su se usi un escaping in una stringa non raw ti esce un warning
* python-version: \["3.9", "3.10", "3.11", "3.12", "3.13"]
  * <3.9 perché pandas 2.2.3 è compatibile da python 3.9 in su ed è l’unico compatibile con python 3.13
* metodo exists di URLManager
  * Oltre a provare http e https prova anche www e non [www](http://www). Tipo [https://www.nih.gov/](https://www.nih.gov/) esiste [https://nih.gov/](https://www.nih.gov/) no
* Metodo normalise di RORManager
  * Prima: ror\_id\_string = sub("\0+", "", sub("(https\://)?ror\\.org/", "", sub('\s+', "", unquote(ror\_id\_string))))
  * Dopo: ror\_id\_string = sub(r"\0+", "", sub(r"^(https\*\*?**://)?**([www.)\*\*?(ror.org/](http://www.\)**?\(ror.org/))?", "", sub(r'\s+', "", unquote(ror\_id\_string))))
  * Il ROR identifier è corretto solo senza il protocollo e il nome di dominio, come per gli ORCID
* self.exists(identifier) and self.syntax\_ok(identifier) → self.syntax\_ok(identifier) and self.exists(identifier)
  * Il controllo sulla sintassi è veloce, se non passa Python risolve a False senza controllare il exists che invece è lento

### RML

## Domande

* Congcong Wang
* Che identificatori può avere un proceedings? DOI e ISBN?

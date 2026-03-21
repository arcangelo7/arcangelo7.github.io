---
title: 2025-09-18 Rimuovere l'RDF di Meta è stato un errore
editUrl: false
---

# La Novitade

## HERITRACE

* Risolto un problema lato test che mi è stato segnalato per cui la porta dell'applicazione risultava occupata perché su Linux venivano controllati tutti i protocolli, non solo TCP, mentre su Windows tutte le porte che comprendevano la porta da controllare, Quindi, se la porta da controllare era la 5000, venivano controllati anche i servizi sulla 2500.
* In quanti hanno partecipato finora
  * Tecnici: 6
  * Utenti finali: 3/4
* Test da utenti:
  * Chiara Di Giambattista
  * Silvio Peroni
  * Arianna Moretti
  * Francesca
  * Matteo
  * Lorenzo
* Test da tecnici:
  * Hubert
  * Mario
* Ho provato a lanciare HERITRACE su dati e provenance completi di Meta per la prima volta.

### Bugfix

* Francesca ha individuato un bug specifico per entità che hanno oggetti con data type multipli possibili, come ad esempio la data di pubblicazione, per cui non era possibile aggiungere una nuova data di pubblicazione e non era neanche possibile modificare il data type, per esempio, per passare da data di pubblicazione con solo anno a data di pubblicazione con anno e mese. Ho risolto il problema.

## OC Meta

* Script per controllare i contatori su Redis a partire dai database di dati e provenance.
  * Prima veniva fatto dai file RDF
  * Meccanismi di streaming e chunk per non sovraccaricare la memoria
  * Purtroppo non è stato possibile ottenere il risultato desiderato con questo metodo.
* Script per scaricare tutto il contenuto del database dei dati e della provenance utilizzando la funzione di download veloce di Virtuoso e successivamente la costruzione dei dump in RDF secondo la struttura di cartelle e sottocartelle di OpenCitations Meta.
  * Per il corretto funzionamento dello script di download è essenziale che i parametri SQL\_QUERY\_TIMEOUT e SQL\_TXN\_TIMEOUT siano impostati a zero.
  * Ho quindi aggiornato il launcher delle virtuose utilities per settare questi due parametri a zero fin dall'inizio in maniera obbligatoria.

## Quagga

* [https://quagga.graphia-ssh.eu/browse](https://quagga.graphia-ssh.eu/browse)

## Domande

* Conoscete [https://www.peeref.com/](https://www.peeref.com/)? Opinioni?
* Andrey Vukolov:
  > Dear Arcangelo,
  > Are you interested in the project and principles of the decentralised PIDs we have discussed at the CSV conference? Would you like to discuss the possible collaboration?

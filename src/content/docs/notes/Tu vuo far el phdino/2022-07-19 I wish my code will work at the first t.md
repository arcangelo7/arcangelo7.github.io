---
title: 2022-07-19 I wish my code will work at the first t
editUrl: false
---

## Cosa ho fatto

### Novità relative a oc-meta

* Dato che è la quarta volta che mi trovo a creare **esempi personalizzati** di file CSV per citazioni e metadati, ho scritto un programma che fa tutto il lavoro in automatico. Questo programma cicla in multithreading sul dump di Crossref finché non trova un documento che risponda a certi requisiti. I requisiti specificabili al momento sono:

  * Numero minimo e massimo di citazioni, reperite tramite API di COCI
  * Tipo della risorsa citante
  * Tipi di risorse bibliografiche che devono essere presenti tra le citazioni

  Se un documento risponde ai requisiti, vengono generati due file CSV, uno contenente tutte le citazioni del documento e l’altro contenente i metadati di tutti i documenti coinvolti.

* Se una risorsa di tipo ‘journal article’ ha un editor e l’autore è presente, allora l’editor si riferisce al contenitore dell’articolo. Se l’articolo è compreso in un numero, l’editor è del numero, se l’articolo è compreso in un volume senza numero, l’editor è del volume.
  * Questo comportamento è stato testato

* Associare l’editor al volume o all’issue ha fatto emergere una nuova race condition, che si verifica se due processi aggiungono contemporaneamente un editor allo stesso volume o numero.

  ![attachments/d064eb083fb14fb09f6dbe8d19870929.png](../../../../assets/notes/attachments/d064eb083fb14fb09f6dbe8d19870929.png)

  * Ciò non accade mai per altri tipi di risorsa bibliografica, perché nel caso in cui un’altra risorsa con id compaia in più file contemporaneamente, tale risorsa viene preprocessata con tutte le informazioni presenti nel dump, editor compresi.
  * Al contrario, volumi e issue venivano preprocessati solo per associare loro il metaid, dato che non era previsto che a essi fosse associato un editor.
  * Soluzione: se una risorsa ha autore, venue con id, volume o issue, editor ed è un articolo di rivista, allora deve essere preprocessata.
    * Risorse di questo tipo vengono preprocessate se e solo se lo stesso contenitore, volume o numero, compare in file diversi con un editor da associare al volume o numero. In questo modo, è necessario preprocessare solo poche decine di risorse e non centinaia di migliaia.

* Ho trovato un bug che si verifica se un AR con ORCID compare con nome e cognome invertiti in un articolo in cui un solo altro AR ha per cognome il nome del primo.
  * Ad esempio Li, Shanzhong compare come Shanzhong, Li in un articolo in cui c’è un autore di nome Li, Zhang. In quel caso, l’ORCID di Li, Shanzhong viene erroneamente assegnato a Li, Zhang.
  * Soluzione: se ci sono AR il cui nome è uguale al cognome di un altro, allora il match per l’assegnazione dell’ORCID deve coinvolgere sia il nome che il cognome, altrimenti l’assegnazione è indecidibile. Questo comportamento è stato testato.

* Ho trovato un bug per cui un ORCID veniva erroneamente associato a un editor nel caso in cui il cognome di un autore del medesimo lavoro con quell’ORCID fosse stato compreso nel cognome di un editor.
  * Soluzione: ora autori ed editor vengono processati come un unica lista di persone, in modo che tutte le euristiche finora applicate separatamente ad autori e editor siano applicate alla lista di autori più editor. Quindi, per esempio, se c’è un editor il cui cognome è compreso in quello di un autore, allora anche il nome deve essere uguale perché venga assegnato l’ORCID.

### Novità relative all’API di OC Meta

* Ho continuato a lavorare all’operazione **metadata**
  * Ho incluso la ricerca sulle **pagine**. Se la pagina iniziale e finale sono uguali viene ritornata solo la pagina iniziale, altrimenti le pagine iniziale e finale vengono ritornate separate da un trattino.
  * Il **MetaId** viene ritornato nel campo ‘id’ dopo gli altri identificatori.
  * Tramite una SELECT innestato, ora vengono prima catturati **tutti gli identificatori** della **venue**, che poi vengono concatenati al nome della venue nella query esterna. Prima ciò non avveniva, perché non sapevo come fare l’aggregazione di un’aggregazione. Ho appunto risolto il problema con un SELECT innestato.
    * Lo stesso avviene anche per la **casa editrice**
    * Al contrario, per quanto riguarda **autori** ed **editor**, al momento è prevista la presenza di un solo identificatore per persona, l’ORCID. Se dovessero essere presenti più identificatori, ne verrebbe catturato solo uno in maniera arbitraria.
  * Ho sostituito tutti gli operatori ternari con COLAESCE per una maggiore leggibilità e concisione

### In preparazione all’orale per l’ammissione al dottorato

* Ho ripassato i seguenti corsi:
  * Computational Thinking (Peroni 1)
  * Scholarly editing and digital approaches (Italia)
  * Information modeling and Web Techonologies (Vitali 1)
  * Knowledge Organization and Digital Methods in the Cultural Heritage Domain (Tomasi)

## Domande

* Se l’editor di una articolo di rivista viene associato al numero o al volume, quell’editor scomparirà per sempre da tutti i CSV. Infatti, i CSV che genereremo a partire dal triplestore conterranno tante righe quante sono le risorse bibliografiche, volumi e numeri esclusi per ragioni di leggibilità.
  * Siete d'accordo sul lasciare l'informazione sull'editor di un volume o numero solo sul triplestore e non nei CSV?
  * Alternativamente, se il volume o il numero che contiene un articolo ha un editor, allora l'editor potrebbe essere indicato nella riga dell'articolo nei CSV
* È possibile che una persona sia contemporaneamente autrice di un articolo ed editor del volume o numero che contiene l’articolo?
* Per quanto riguarda le operazioni /author/{orcids} ed /editor/{orcids} dell’API di OC Meta, qual è il risultato atteso? Tutti i metadati di tutte le risorse bibliografiche autorate o editate dalle persone specificate? Solo la lista degli identificatori di tali risorse? Se sì, qual è la struttura dati che contiene tale lista?

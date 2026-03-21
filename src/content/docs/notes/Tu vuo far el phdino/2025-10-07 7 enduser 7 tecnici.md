---
title: 2025-10-07 7 enduser 7 tecnici
editUrl: false
---

# La Novitade

## HERITRACE

* Quando viene cancellata una proprietà virtuale, viene in realtà cancellata l'entità attraverso la quale è stata implementata quella proprietà virtuale.
* Le proprietà virtuali ovviamente non compaiono nel change tracking dell'entità. Per ora va bene così.
* La ricerca delle entità esistenti ora mostra un menu a tendina in cui ogni elemento è multilinea in maniera tale che il nome dell'elemento sia interamente visibile.
  ![attachments/f08c4ad5cdf74ba5abd74d16389743fe.png](../../../../assets/notes/attachments/f08c4ad5cdf74ba5abd74d16389743fe.png)
* Risolto il bug per cui venivano catturati i click programmatici per espandere le proprietà obbligatorie e questi chiudevano il menu a tendina per la ricerca delle entità preesistenti.
  ```javascript
  $(document).on('click', function(e) {
      // Ignora i click programmatici (non generati dall'utente)
      if (!e.isTrusted) {
          return;
      }

      if (!$(e.target).closest('.newEntityPropertyContainer').length) {
          $('.entity-search-results').addClass('d-none');
          $('.search-spinner').addClass('d-none');
      }
  });
  ```
* Non avevo ancora gestito il caso in cui sh:hasvalue è un elenco di URI e non un elenco di nodi, ovvero di shape o di datatype e in particolare non avevo gestito la generazione del form di modifica per questo tipo di casistica in cui deve essere mostrato un select option e non un input type text.
* introdurre la possibilità di selezionare il tipo di risorsa bibliografica citata ha reintrodotto il problema di performance lato frontend che pure era stato parzialmente risolto caricando in maniera asincrona soltanto i modelli per l'edità selezionata. Ho scelto di affrontare questo nuovo problema in maniera ibrida, continuando a caricare in maniera asincrona soltanto il modello dell'entità selezionata ma non delle entità annidate oltre il livello di profondità 1, che vengono caricate in maniera asincrona anch'esse.

### User testing

* Uno dei tester mi ha segnalato che la porta 5000 è di default occupata nelle ultime versioni di macOS da AirPlay, quindi ho modificato l'ambiente per esporre la 5001.

![attachments/10307145c07a4bb883c62f4ee15a01c3.png](../../../../assets/notes/attachments/10307145c07a4bb883c62f4ee15a01c3.png)

![attachments/2330aac54f144161bcbd338c03b3fdc7.png](../../../../assets/notes/attachments/2330aac54f144161bcbd338c03b3fdc7.png)

![attachments/f370faab65fa4a76a6d379d2d88a9a89.png](../../../../assets/notes/attachments/f370faab65fa4a76a6d379d2d88a9a89.png)

![attachments/10bceb0104fc45ddb03f947c1f31ec08.png](../../../../assets/notes/attachments/10bceb0104fc45ddb03f947c1f31ec08.png)

## Bugfix

* Mi ero dimenticato di aggiornare anche l'inizializzatore dei contatori per tenere conto dei nuovi URI delle citazioni e ora l'ho fatto.

## Crash course su Git

* [git.slides.arcangelomassari.com](https://git.slides.arcangelomassari.com)

## OC Meta

* Il sistema di conversione del dump in RDF da Virtuoso alla struttura di cartelle e sottocartelle di OpenCentations Meta è fallito a 40 su 53 batch per la provenance dopo 10 giorni di processing.
* Questo mi ha dato l'occasione per ripensare il sistema e renderlo più efficiente. Anziché fare merge dei file temporanei dopo batch artificiali, ad esempio ogni 300 file, che richiede ogni volta 3 ore per fare il merge esplorando milioni di file, anche se in parallelo, adesso il merge viene triggerato soltanto quando mancano meno di 10 milioni di inode disponibili.
* Già che c'ero ho aggiunto un sistema di caching per cui processato un file del dump di virtuoso correttamente e viene salvato su un file in maniera tale da non essere più riprocessato.

![attachments/1fe3f2c0f9cc4767bdd3d51f15227201.png](../../../../assets/notes/attachments/1fe3f2c0f9cc4767bdd3d51f15227201.png)

# Domande

* 20 ottobre

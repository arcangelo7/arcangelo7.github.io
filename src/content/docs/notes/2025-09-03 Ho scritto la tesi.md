---
title: 2025-09-03 Ho scritto la tesi
editUrl: false
---

# La Novitade

## Heritrace

### Analisi dei dati

* [https://github.com/opencitations/heritrace/blob/main/user\_testing/03\_analysis\_framework.md](https://github.com/opencitations/heritrace/blob/main/user_testing/03_analysis_framework.md)

### Test

* Partecipanti finora
  * Utenti finali: 4
  * Configuratori: 4

## Domande

> Gentilissimo, Trattandosi di documentazione amministrativa, è possibile contattare anche gli uffici dell’ateneo partner e, a tal proposito, possiamo certamente scrivere noi ai colleghi. Le rammento, ad ogni modo, che dovrà anche richiedere il riconoscimento delle attività svolte durante la mobilità Erasmus al collegio di dottorato, presentando al collegio una lettera in carta intestata della sua referente di Leuven in cui siano indicate le attività svolte e un giudizio sulle stesse. Il collegio delibererà, di conseguenza, il riconoscimento delle attività da lei svolte durante il periodo di scambio Eramsus+. Se desidera supporto nel contattare gli uffici amministrativi di Leuven la prego di non esitare a chiedere. Saluti, Andrea Zaniboni, PhD

## RML

* Test dockerizzati
* Recupero informazioni dallo schema originale. Utile per ricostruire ordine colonne e datatype se non inferibili dai mapping
* considero bad mapping nel caso in cui la tabella originale abbia righe duplicate e il mapping non contenga informazioni sugli indici
* Un altro caso di bad mapping sono mappature con solo costanti
* Un altro caso di bad mapping è quello in cui una certa colonna non venga minimamente menzionata nel mapping e i dati di quella colonna non vengano minimamente menzionati nell'RDF prodotto tramite il mapping. In quel caso io posso anche recuperare dallo schema l'esistenza di quella colonna, però non ho poi modo di ricostruire i dati
* Miglioramenti query SPARQL di inversione
  * Nomi variabili parlanti, non semplici numeri impossibili da debuggare. (?1, ?2, ?3) -> (?Name, ?StudentID, ?Name\_2)
  * Più efficienti, non filter bind (bind da solo basta) e no bind vuoti, che tra l'altro causavano errori
  * No ENCODE\_FOR\_URI, che rende le query più complesse. Ciò che va encodato viene encodato direttamente via Python, tipo stringhe contenenti spazi dentro template. Questo ha permesso una semplificazione enorme del codice, perché è più semplice costruire le query
  * Rimosso OPTIONAL, non ha senso e rende le query più lente.
  * Benchmark con 10000 righe e 150k triple passato da 184 secondi a 6 e ha reso possibile il benchmark con 50k righe e 2 milioni di triple che prima andava in timeout. Quest'ultimo impiega comunque 55s

## CSV,conf,v9

* Promettiamo una data di lancio?
* Non mi è chiaro se OJS estragga automaticamente le citazioni o meno
* Sarebbe carico avere un mockup di OJS, no?
* OJS è un software. Questo software potrebbe essere usato da riviste predatorie, che poi usato il plugin di OpenCitations. A noi questa cosa va bene? Immagino di sì perché puntiamo a essere universali, dopodiché è l'utente che decide cosa usare e cosa no. Chi decide quali journal sono trusted?
* Io cosa voglio dal mio pubblico? Cosa gli sto chiedendo? Qual è la call to action?
* Come si diventa trusted agent?

# Domande

* 1825 euro

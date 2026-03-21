---
title: 2022-10-20 OpenAIRE Research Graph
editUrl: false
---

# Prossimo incontro

## Cosa ho fatto

* Risolto un **bug** di OC Meta per cui **DOI** validi contenenti **backslash** **rompevano** le query **SPARQL**.

* Ho **corretto** **a mano** tutti i DOI invalidi contenenti **backslash** nell’input di OC Meta. Ecco l’elenco completo, da correggere su **COCI**:
  1. [10.1137/040610337%\margin](https://opencitations.net/index/coci/api/v1/references/10.1137/040610337%25%5Cmargin) →

     [10.1137/040610337](https://doi.org/10.1137/040610337)

  2. [10.2111/1551-5028(2004)057\[0517:aabcsa\]2.0.co;2](https://opencitations.net/index/coci/api/v1/citations/10.2111/1551-5028\(2004\)057%5C%5B0517:aabcsa%5C%5D2.0.co;2) →

     [10.2111/1551-5028(2004)057\[0517:AABCSA\]2.0.CO;2](https://doi.org/10.2111/1551-5028\(2004\)057\[0517:AABCSA]2.0.CO;2)

     Il DOI invalido è stranamente un citato

  3. [10.2111/1551-5028(2004)057\[0524:OAUSGH\]2.0.CO;2](https://opencitations.net/index/coci/api/v1/references/10.2111/1551-5028\(2004\)057%5C%5B0524:OAUSGH%5C%5D2.0.CO;2)→

     [10.2111/1551-5028(2004)057\[0524:OAUSGH\]2.0.CO;2](https://doi.org/10.2111/1551-5028\(2004\)057\[0524:OAUSGH]2.0.CO;2)

  4. [10.2111/1551-5028(2004)057\[0539:sdsocg\]2.0.co;2](https://opencitations.net/index/coci/api/v1/references/10.2111/1551-5028\(2004\)057%5C%5B0539:sdsocg%5C%5D2.0.co;2) →

     [10.2111/1551-5028(2004)057\[0539:SDSOCG\]2.0.CO;2](https://doi.org/10.2111/1551-5028\(2004\)057\[0539:SDSOCG]2.0.CO;2)

  5. [10.2111/1551-5028(2004)057\[0455:rodgvt\]2.0.co;2](https://opencitations.net/index/coci/api/v1/references/10.2111/1551-5028\(2004\)057%5C%5B0455:rodgvt%5C%5D2.0.co;2) →

     [10.2111/1551-5028(2004)057\[0455:RODGVT\]2.0.CO;2](https://doi.org/10.2111/1551-5028\(2004\)057\[0455:RODGVT]2.0.CO;2)

  6. [10.2111/1551-5028(2004)057\[0532:pshsbm\]2.0.co;2](https://opencitations.net/index/coci/api/v1/references/10.2111/1551-5028\(2004\)057%5C%5B0532:pshsbm%5C%5D2.0.co;2) →

     [10.2111/1551-5028(2004)057\[0532:PSHSBM\]2.0.CO;2](https://doi.org/10.2111/1551-5028\(2004\)057\[0532:PSHSBM]2.0.CO;2)

  7. [10.2111/1551-5028(2004)057\[0561:csogra\]2.0.co;2](https://opencitations.net/index/coci/api/v1/references/10.2111/1551-5028\(2004\)057%5C%5B0561:csogra%5C%5D2.0.co;2) →

     [10.2111/1551-5028(2004)057\[0532:PSHSBM\]2.0.CO;2](https://doi.org/10.2111/1551-5028\(2004\)057\[0532:PSHSBM]2.0.CO;2)

  8. [10.2111/1551-5028(2004)057\[0561:csogra\]2.0.co;2](https://opencitations.net/index/coci/api/v1/references/10.2111/1551-5028\(2004\)057%5C%5B0561:csogra%5C%5D2.0.co;2) →

     [10.2111/1551-5028(2004)057\[0561:CSOGRA\]2.0.CO;2](https://doi.org/10.2111/1551-5028\(2004\)057\[0561:CSOGRA]2.0.CO;2)

  9. [10.2111/1551-5028(2004)057\[0482:nfarse\]2.0.co;2](https://opencitations.net/index/coci/api/v1/references/10.2111/1551-5028\(2004\)057%5C%5B0482:nfarse%5C%5D2.0.co;2) →

     [10.2111/1551-5028(2004)057\[0482:NFARSE\]2.0.CO;2](https://doi.org/10.2111/1551-5028\(2004\)057\[0482:NFARSE]2.0.CO;2)

  10. [10.2111/1551-5028(2004)057\[0435:cfuint\]2.0.co;2](https://opencitations.net/index/coci/api/v1/references/10.2111/1551-5028\(2004\)057%5C%5B0435:cfuint%5C%5D2.0.co;2) →

      [10.2111/1551-5028(2004)057\[0435:CFUINT\]2.0.CO;2](https://doi.org/10.2111/1551-5028\(2004\)057\[0435:CFUINT]2.0.CO;2)

  11. [10.2111/1551-5028(2004)057\[0511:statci\]2.0.co;2](https://opencitations.net/index/coci/api/v1/references/10.2111/1551-5028\(2004\)057%5C%5B0511:statci%5C%5D2.0.co;2) →

      [10.2111/1551-5028(2004)057\[0511:STATCI\]2.0.CO;2](https://doi.org/10.2111/1551-5028\(2004\)057\[0511:STATCI]2.0.CO;2)

  12. [10.2111/1551-5028(2004)057\[0426:lubcab\]2.0.co;2](https://opencitations.net/index/coci/api/v1/references/10.2111/1551-5028\(2004\)057%5C%5B0426:lubcab%5C%5D2.0.co;2) →

      [10.2111/1551-5028(2004)057\[0426:LUBCAB\]2.0.CO;2](https://doi.org/10.2111/1551-5028\(2004\)057\[0426:LUBCAB]2.0.CO;2)

  13. [10.2111/1551-5028(2004)057\[0490:seogap\]2.0.co;2](https://opencitations.net/index/coci/api/v1/references/10.2111/1551-5028\(2004\)057%5C%5B0490:seogap%5C%5D2.0.co;2) →

      [10.2111/1551-5028(2004)057\[0490:SEOGAP\]2.0.CO;2](https://doi.org/10.2111/1551-5028\(2004\)057\[0490:SEOGAP]2.0.CO;2)

  14. [10.2111/1551-5028(2004)057\[0475:gosotr\]2.0.co;2](https://opencitations.net/index/coci/api/v1/references/10.2111/1551-5028\(2004\)057%5C%5B0475:gosotr%5C%5D2.0.co;2) →

      [10.2111/1551-5028(2004)057\[0475:GOSOTR\]2.0.CO;2](https://doi.org/10.2111/1551-5028\(2004\)057\[0475:GOSOTR]2.0.CO;2)

  15. [10.2111/1551-5028(2004)057\[0448:rapohr\]2.0.co;2](https://opencitations.net/index/coci/api/v1/references/10.2111/1551-5028\(2004\)057%5C%5B0448:rapohr%5C%5D2.0.co;2) →

      [10.2111/1551-5028(2004)057\[0448:rapohr\]2.0.co;2](https://doi.org/10.2111/1551-5028\(2004\)057%5B0448:rapohr%5D2.0.co;2)

  16. [10.2111/1551-5028(2004)057\[0546:sdiamr\]2.0.co;2](https://opencitations.net/index/coci/api/v1/references/10.2111/1551-5028\(2004\)057%5C%5B0546:sdiamr%5C%5D2.0.co;2) →

      [10.2458/azu\_jrm\_v57i5\_pelster](https://doi.org/10.2458/azu_jrm_v57i5_pelster)

      Il DOI invalido non si corregge rimuovendo i backslash

  17. [10.2111/1551-5028(2004)057\[0442:diapia\]2.0.co;2](https://opencitations.net/index/coci/api/v1/references/10.2111/1551-5028\(2004\)057%5C%5B0442:diapia%5C%5D2.0.co;2) →

      [10.2111/1551-5028(2004)057\[0442:DIAPIA\]2.0.CO;2](https://doi.org/10.2111/1551-5028\(2004\)057\[0442:DIAPIA]2.0.CO;2)

  18. [10.2111/1551-5028(2004)057\[0553:sragfe\]2.0.co;2](https://opencitations.net/index/coci/api/v1/references/10.2111/1551-5028\(2004\)057%5C%5B0553:sragfe%5C%5D2.0.co;2) →

      [10.2111/1551-5028(2004)057\[0553:sragfe\]2.0.co;2](https://doi.org/10.2111/1551-5028\(2004\)057%5B0553:sragfe%5D2.0.co;2)

  19. [10.2111/1551-5028(2004)057\[0466:rvrtdi\]2.0.co;2](https://opencitations.net/index/coci/api/v1/references/10.2111/1551-5028\(2004\)057%5C%5B0466:rvrtdi%5C%5D2.0.co;2) →

      [10.2111/1551-5028(2004)057\[0466:RVRTDI\]2.0.CO;2](https://doi.org/10.2111/1551-5028\(2004\)057\[0466:RVRTDI]2.0.CO;2)

  20. [10.1137/040604947\end{doi](https://opencitations.net/index/coci/api/v1/references/10.1137/040604947%5Cend%7Bdoi) →

      [10.1137/040604947](https://doi.org/10.1137/040604947)

* Ho **aggiornato** il manuale del laboratorio di comp-think.
  * Ho installato delle **macchine virtuali** con Windows e macOS per testare la procedura di installazione di Python ovunque.
    * Per esempio, ho scoperto che Windows non resistuisce un messaggio di errore se si digita `python --version` da terminale e Python non è installato, ma restituisce un messaggio vuoto.
  * Ho consigliato l’utilizzo di **Powershell** anziché cmd su Windows.
  * Ho specificato che la procedura di installazione su Linux si riferisce a **Ubuntu**, perché altrimenti non c’è `apt` o cambia l’interfaccia grafica. Ammesso che qualcuno che usa Linux abbia bisogno di un tutorial su come si installa Python.
  * Ho scritto un cappello introduttivo sugli **IDE**

* Per quanto riguarda l’articolo su OpenCitations **Meta**, ho scritto descritto l’**OpenAIRE Research Graph**, **Springer Nature SciGraph** e **ScholarlyData**. Manca Wikidata

## Domande

* JWS consiglia di inviare il software alla rivista Software Impact nel caso in cui l’articolo venga accettato ([https://www.elsevier.com/journals/journal-of-web-semantics/1570-8268/guide-for-authors](https://www.elsevier.com/journals/journal-of-web-semantics/1570-8268/guide-for-authors)).

  > This journal encourages and enables you to share software that supports your research publication where appropriate, and enables you to interlink the software and data with your published article.You have the option to convert your open source software into an additional journal publication in [*Software Impacts*](https://www.journals.elsevier.com/software-impacts), a multi-disciplinary open access journal that provides a scholarly reference to software that has been used to address a research challenge. It ensures that your software is actively reviewed, curated, formatted, indexed, given a DOI and publicly available to all upon publication. You are encouraged to submit your article to *Software Impacts* as an additional item If your research article is accepted. Please note an **open access fee of 250 USD** is payable for publication in *Software Impacts*. Full details can be found on the [Software Impacts website](https://www.elsevier.com/journals/software-impacts/2665-9638/guide-for-authors). Please use [this template](https://www.elsevier.com/__data/promis_misc/SIMPAC_OSP_Template.docx) to write your Software Impacts article.

  Cosa ne pensate?

  * Su Elsevier, non sembra esserci un modo ovvio per caricare la risposta ai revisori in modo che venga inviata ai nuovi revisori. Come faccio ad assicurarne? Supplementary material, anche copia delle review, specificare in cover letter e note all'editore.
* I dump di OpenAIRE Research Graph, Springer Nature SciGraph, ScholarlyData e BioTea sono  distribuiti con licenza **CC-BY**, **CC-BY-SA** o **CC-BY-NC**. Il dump di Meta sarà in CC0?
* Da quello che ho letto la **deduplicazione** su **ScholarlyData** avviene sulla base dei **nomi** delle persone e usando un algoritmo di maching learning supervisionato, ma non tiene in considerazione la possibilità di **omonimi**. Vi risulta?
* Sto scrivendo il sofware per aggiungere il **fuso orario** ai dati di **provenance**, sia in **CSV** che in **nquads**. Ho tre domande:
  * Aggiungo il nostro fuso orario, **Europe/Rome**, +01:00, va bene?
  * Ogni file in nquads è organizzati a **blocchi**, dove ogni blocco contiene tutte le quadruple di ciascuna entità. Dov’è il software che produce questo risultato? Così riutilizzo direttamente quello.
  * Devo aggiungere il fuso orario solo all’ultimo dump o lo aggiungo a **tutti i dump**?
* Perché **IRIS** mi rigetta le pubblicazioni? Mi ha rifiutato l’atto di convegno di ULITE e i software.
* Secondo me non ha senso generare i CSV di OC Meta alla fine e si possono pubblicare quelli già generati.
  * Infatti, via del preprocessing, non dovrebbe esserci alcuna differenza tra i CSV generati al primo colpo e quelli generati a posteriori.
    * Tutti i conflitti sono stati gestiti in anticipo.
    * Le entità presenti su più file sono state preprocessate con il maggior numero di informazioni disponibili.

## Note

* C’è un bug della OpenCitations Indexes Search Interface. Se un DOI contiene un carattere da codificare nell'URL, l'interfaccia restituisce risultati solo l'utente inserisce il DOI già codificato. Ad esempio, il DOI [10.2111/1551-5028(2004)057\[0613:cipfgl\]2.0.co;2](https://opencitations.net/index/search?text=10.2111%2F1551-5028%282004%29057%5B0613%3Acipfgl%5D2.0.co%3B2\&rule=citingdoi) restituisce risultati solo cercato come [10.2111/1551-5028%282004%29057%5B0613%3Acipfgl%5D2.0.co%3B2](https://opencitations.net/index/search?text=10.2111%2F1551-5028%25282004%2529057%255B0613%253Acipfgl%255D2.0.co%253B2\&rule=citingdoi)
  * È curioso che nell'URL del secondo esempio i caratteri speciali vengono codificati due volte. Cioé, "(" -> "%28" -> "%2528", dove "%25" è la codifica del carattere "%"

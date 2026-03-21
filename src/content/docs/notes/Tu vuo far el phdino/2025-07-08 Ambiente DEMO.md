---
title: 2025-07-08 Ambiente DEMO
editUrl: false
---

# La Novitade

## HERITRACE

* Ho creato degli script che permettono di impostare rapidamente degli ambienti di demo completamente isolati tramite docker, stopparli, riavviarli, cancellarli, eccetera eccetera.
* Ho anche aggiunto una nuova modalità, ovvero la modalità demo, che si distingue da quella di produzione da quella di test perché bypassa l'autenticazione, ovvero si viene automaticamente autenticati come utenti demo. - Perché non utilizzare un vera e propria autenticazione con ORCID? Perché io voglio prendere i risultati dei test e pubblicarli su Zenodo per avere la massima trasparenza e riproducibilità, quindi ovviamente pubblicherò anche il workflow di creazione degli ambienti di test.
  * Se chiedessi agli utenti di autenticarsi tramite ORCID, dovrei far firmare loro delle liberatorie per la privacy, cosa che mi sembra altamente complessa e che dal mio punto di vista non comporta alcun vantaggio e alcuna utilità per il test.
* Non serve un questionario iniziale. Sei tecnico se conosci shacl, sei end user se sai cos'è una risorsa bibliografica, fine.
* Test rivisti
  * [https://github.com/opencitations/heritrace/blob/main/user\_testing/01\_end\_user\_testing.md](https://github.com/opencitations/heritrace/blob/main/user_testing/01_end_user_testing.md)
  * [https://github.com/opencitations/heritrace/blob/main/user\_testing/02\_technician\_testing.md](https://github.com/opencitations/heritrace/blob/main/user_testing/02_technician_testing.md)

### Bugfix

Lo scenario di demo ha fatto emergere numerosi bug che si verificavano nel momento in cui la mappatura delle regole di visualizzazione e delle Shacl Shapes non era completa rispetto ai dati a disposizione.
\- Risolti una serie di bug che si verificavano se una entità aveva molteplici classi e per queste classi era definita una regola di priorità soltanto per una delle classi o per nessuna. Nel primo caso veniva erroneamente ritornato come classe di maggior priorità quella per cui non era definita la priorità e nel secondo caso veniva erroneamente ritornato None.
\- Nel caso in cui non ci siano le shape per una specifica classe, ma in generale ci siano delle shape, accadeva che venivano resi invalidi tutti i propri predicati. Invece se non ci sono delle regole che impongono delle specifiche cardinalità o limiti alla forma di un'entità, tutto dovrebbe essere ritenuto valido
\- La gestione di proprietà custom in caso di SHACL shapes non definite o in generale o non definite per una determinata classe era rimasto parecchio datato, l'ho quindi aggiornato per funzionare nel nuovo sistema.
\- Risolto un bug per cui se una stringa da modificare di un'entità esistente conteneva delle virgolette il valore originale non veniva processato correttamente dal frontend.

* Quando uno crea un'entità custom, quindi in assenza di informazioni sullo SHACL, e non specifica il tipo, il tipo è owl:Thing.

## API

* Ho aggiunto un ambiente di test alle API utilizzando le virtuoso utilities per gestire il database virtuoso che viene automaticamente popolato con i dati di test utilizzando anche per questo le virtuoso utilities, basta lanciare uno script bash.
* Per quanto riguarda la gestione delle dipendenze ho usato UV al posto di Poetry perché UV permette anche di gestire le versioni di Python. UV è in grado di installare Python e di gestire multiple versioni di Python.
* GitHub Action
* [https://github.com/opencitations/ramose/issues/19](https://github.com/opencitations/ramose/issues/19)

## Virtuoso Utilities

### Launch Virtuoso

* Due nuove opzioni
  * \--network per specificare il docker network
  * \--enable-write-permissions

## Domande

* Dove sono le ultime novità relative alle API? Non le stiamo più pushando? Cosa cambia tra il branch di test e quello master? Che workflow stiamo seguendo?
* Possiamo dare al repository api la struttura di un repository python normale? con una cartella principale src o api che contiene tutto il resto?
* Potremmo rendere pubblico in sola lettura il link ics del calendario di OpenCitations? Al momento riesco a vedere gli appuntamenti di OpenCitations solo nel calendario di Google perché c'è la mia email gmail in whitelist, ma io non uso più quel calendario perché mi sto self-hostando la vita. Ora, il problema è che vorrei integrare quel calendario da molte altre parti che non c'entrano niente con account email, tipo Homepage, Nextcloud e via dicendo. A me non sembra un grosso rischio per la sicurezza rendere pubblico un link in sola lettura a un calendario, ma magari mi sbaglio

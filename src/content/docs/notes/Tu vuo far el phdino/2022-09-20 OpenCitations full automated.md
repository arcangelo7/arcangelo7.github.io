---
title: 2022-09-20 OpenCitations full automated
editUrl: false
---

## Cosa ho fatto

### Novità relative al crowdsourcing

* La **whitelist** non può essere composta da **nomi utente**, perché il nome utente GitHub può essere **modificato**. Dev’essere composta da **id**, che invece sono immutabili.
  * L’id si può ottenere tramite API: [https://api.github.com/users/essepuntato](https://api.github.com/users/essepuntato)

* Le issue vengono salvate con la seguente struttura dati:

  ```python
  [ISSUE1, ISSUE2, ISSUE3,...]

  [{"data": {
  	"title": TITLE,
  	"metadata": METADATA,
  	"citations": CITATIONS},
  "provenance": {
  	"generatedAtTime": YYYY-MM-DDTHH:mm:ssZ, #Z = Zulu time => GMT+0
  	"wasAttributedTo": USER_ID}},
  ...]

  [{'data': {
      'title': 'deposit localhost:330 doi:10.1007/978-3-030-00668-6_8', 
      'metadata': [
          {'id': 'doi:10.1007/978-3-662-07918-8_3', 'title': 'Influence of Dielectric Properties, State, and Electrodes on Electric Strength', 'author': 'Ushakov, Vasily Y.', 'pub_date': '2004', 'venue': 'Insulation of High-Voltage Equipment [isbn:9783642058530 isbn:9783662079188]', 'volume': '', 'issue': '', 'page': '27-82', 'type': 'book chapter', 'publisher': 'Springer Science and Business Media LLC [crossref:297]', 'editor': ''}, 
          {'id': 'doi:10.1016/0021-9991(73)90147-2', 'title': 'Flux-corrected transport. I. SHASTA, a fluid transport algorithm that works', 'author': 'Boris, Jay P; Book, David L', 'pub_date': '1973-1', 'venue': 'Journal of Computational Physics [issn:0021-9991]', 'volume': '11', 'issue': '1', 'page': '38-69', 'type': 'journal article', 'publisher': 'Elsevier BV [crossref:78]', 'editor': ''}, 
          {'id': 'doi:10.1109/20.877674', 'title': 'An investigation of FEM-FCT method for streamer corona simulation', 'author': 'Woong-Gee Min, ; Hyeong-Seok Kim, ; Seok-Hyun Lee, ; Song-Yop Hahn, ', 'pub_date': '2000-7', 'venue': 'IEEE Transactions on Magnetics [issn:0018-9464]', 'volume': '36', 'issue': '4', 'page': '1280-1284', 'type': 'journal article', 'publisher': 'Institute of Electrical and Electronics Engineers (IEEE) [crossref:263]', 'editor': ''}, 
          {'id': 'doi:10.1109/tps.2003.815469', 'title': 'Numerical study on influences of barrier arrangements on dielectric barrier discharge characteristics', 'author': 'Woo Seok Kang, ; Jin Myung Park, ; Yongho Kim, ; Sang Hee Hong, ', 'pub_date': '2003-8', 'venue': 'IEEE Transactions on Plasma Science [issn:0093-3813]', 'volume': '31', 'issue': '4', 'page': '504-510', 'type': 'journal article', 'publisher': 'Institute of Electrical and Electronics Engineers (IEEE) [crossref:263]', 'editor': ''}, 
          {'id': '', 'title': 'Spatial Distribution of Ion Current Around HVDC Bundle Conductors', 'author': 'Zhou, Xiangxian; Cui, Xiang; Lu, Tiebing; Fang, Chao; Zhen, Yongzan', 'pub_date': '2012-1', 'venue': 'IEEE Transactions on Power Delivery [issn:0885-8977 issn:1937-4208]', 'volume': '27', 'issue': '1', 'page': '380-390', 'type': 'journal article', 'publisher': 'Institute of Electrical and Electronics Engineers (IEEE) [crossref:263]', 'editor': ''}, 
          {'id': 'doi:10.1007/978-1-4615-3786-1_11', 'title': 'The Solution of the Continuity Equations in Ionization and Plasma Growth', 'author': 'Davies, A. J.; Niessen, W.', 'pub_date': '1990', 'venue': 'Physics and Applications of Pseudosparks [isbn:9781461366874 isbn:9781461537861]', 'volume': '', 'issue': '', 'page': '197-217', 'type': 'book chapter', 'publisher': 'Springer Science and Business Media LLC [crossref:297]', 'editor': ''}, 
          {'id': 'doi:10.1088/0022-3727/13/1/002', 'title': 'Discharge current induced by the motion of charged particles', 'author': 'Sato, N', 'pub_date': '1980-1-14', 'venue': 'Journal of Physics D: Applied Physics [issn:0022-3727 issn:1361-6463]', 'volume': '13', 'issue': '1', 'page': '3-6', 'type': 'journal article', 'publisher': 'IOP Publishing [crossref:266]', 'editor': ''}, 
          {'id': 'doi:10.1109/27.106800', 'title': 'Particle-in-cell charged-particle simulations, plus Monte Carlo collisions with neutral atoms, PIC-MCC', 'author': 'Birdsall, C.K.', 'pub_date': '1991-4', 'venue': 'IEEE Transactions on Plasma Science [issn:0093-3813]', 'volume': '19', 'issue': '2', 'page': '65-85', 'type': 'journal article', 'publisher': 'Institute of Electrical and Electronics Engineers (IEEE) [crossref:263]', 'editor': ''}, 
          {'id': 'doi:10.1016/0021-9991(79)90051-2', 'title': 'Fully multidimensional flux-corrected transport algorithms for fluids', 'author': 'Zalesak, Steven T', 'pub_date': '1979-6', 'venue': 'Journal of Computational Physics [issn:0021-9991]', 'volume': '31', 'issue': '3', 'page': '335-362', 'type': 'journal article', 'publisher': 'Elsevier BV [crossref:78]', 'editor': ''}, 
          {'id': 'doi:10.1088/0022-3727/39/14/017', 'title': 'Diffusion correction to the Raether–Meek criterion for the avalanche-to-streamer transition', 'author': 'Montijn, Carolynne; Ebert, Ute [orcid:0000-0003-3891-6869]', 'pub_date': '2006-6-30', 'venue': 'Journal of Physics D: Applied Physics [issn:0022-3727 issn:1361-6463]', 'volume': '39', 'issue': '14', 'page': '2979-2992', 'type': 'journal article', 'publisher': 'IOP Publishing [crossref:266]', 'editor': ''}, 
          {'id': 'doi:10.1007/978-3-663-14090-0 isbn:9783528085995 isbn:9783663140900', 'title': 'High-Voltage Insulation Technology', 'author': 'Kind, Dieter; Kärner, Hermann', 'pub_date': '1985', 'venue': '', 'volume': '', 'issue': '', 'page': '', 'type': 'book', 'publisher': 'Springer Science and Business Media LLC [crossref:297]', 'editor': ''}, 
          {'id': '', 'title': 'Space-charge effects in high-density plasmas', 'author': 'Morrow, R', 'pub_date': '1982-6', 'venue': 'Journal of Computational Physics [issn:0021-9991]', 'volume': '46', 'issue': '3', 'page': '454-461', 'type': 'journal article', 'publisher': 'Elsevier BV [crossref:78]', 'editor': ''}, 
          {'id': 'doi:10.1007/s42835-022-01029-y', 'title': 'Numerical Simulation of Gas Discharge Using SUPG-FEM-FCT Method with Adaptive Mesh Refinement', 'author': 'Choi, Chan Young; Park, Il Han [orcid:0000-0002-9383-6856]', 'pub_date': '2022-2-28', 'venue': 'Journal of Electrical Engineering & Technology [issn:1975-0102 issn:2093-7423]', 'volume': '17', 'issue': '3', 'page': '1873-1881', 'type': 'journal article', 'publisher': 'Springer Science and Business Media LLC [crossref:297]', 'editor': ''}], 
      'citations': [
          {'citing_id': 'doi:10.1007/s42835-022-01029-y', 'citing_publication_date': '2022-02-28', 'cited_id': 'doi:10.1007/978-3-662-07918-8_3', 'cited_publication_date': '2004'}, 
          {'citing_id': 'doi:10.1007/s42835-022-01029-y', 'citing_publication_date': '2022-02-28', 'cited_id': 'doi:10.1016/0021-9991(73)90147-2', 'cited_publication_date': '1973-1'}, 
          {'citing_id': 'doi:10.1007/s42835-022-01029-y', 'citing_publication_date': '2022-02-28', 'cited_id': 'doi:10.1109/20.877674', 'cited_publication_date': '2000-7'}, 
          {'citing_id': 'doi:10.1007/s42835-022-01029-y', 'citing_publication_date': '2022-02-28', 'cited_id': 'doi:10.1109/tps.2003.815469', 'cited_publication_date': ''}, 
          {'citing_id': 'doi:10.1007/s42835-022-01029-y', 'citing_publication_date': '2022-02-28', 'cited_id': 'doi:10.1109/tpwrd.2011.2172694', 'cited_publication_date': '2012-1'}, 
          {'citing_id': 'doi:10.1007/s42835-022-01029-y', 'citing_publication_date': '2022-02-28', 'cited_id': 'doi:10.1007/978-1-4615-3786-1_11', 'cited_publication_date': '1990'},
          {'citing_id': 'doi:10.1007/s42835-022-01029-y', 'citing_publication_date': '2022-02-28', 'cited_id': 'doi:10.1088/0022-3727/13/1/002', 'cited_publication_date': '1980-1-14'}, 
          {'citing_id': 'doi:10.1007/s42835-022-01029-y', 'citing_publication_date': '2022-02-28', 'cited_id': 'doi:10.1109/27.106800', 'cited_publication_date': '1991-4'}, 
          {'citing_id': 'doi:10.1007/s42835-022-01029-y', 'citing_publication_date': '2022-02-28', 'cited_id': 'doi:10.1016/0021-9991(79)90051-2', 'cited_publication_date': '1979-6'}, 
          {'citing_id': 'doi:10.1007/s42835-022-01029-y', 'citing_publication_date': '2022-02-28', 'cited_id': 'doi:10.1088/0022-3727/39/14/017', 'cited_publication_date': ''}, 
          {'citing_id': 'doi:10.1007/s42835-022-01029-y', 'citing_publication_date': '2022-02-28', 'cited_id': 'doi:10.1007/978-3-663-14090-0', 'cited_publication_date': '1985'}, 
          {'citing_id': 'doi:10.1007/s42835-022-01029-y', 'citing_publication_date': '2022-02-28', 'cited_id': 'doi:10.1016/0021-9991(82)90026-2', 'cited_publication_date': ''}]}, 
  'provenance': {
      'generatedAtTime': '2022-09-14T11:43:58Z', 
      'wasAttributedTo': 66169772}},
  ...]
  ```

* Vengono processate solo le issue che presentano l’etichetta “Deposit”. In questo modo, si lascia aperta la possibilità di ricevere issue che non sono dopositi. L’etichetta deposit viene aggiunta subito dopo la ricezione di una issue nel caso in cui il titolo contenga la parola-chiave deposito.

* Ho scritto del codice per **validare** le **issue**. Vengono validati il **titolo** (deposit host id) e la **correttezza sintattica** del **corpo** (presenza del separatore e di CSV validi).
  * L’identificatore nel titolo viene validato tramite la neonata libreria **oc.identifier\_manager**.
  * A seconda della tipologia di errore, vengono generati dei messaggi di risposta alla issue.
  * Il trigger **schedule** è estremamente **inaffidabile**, come spiegato in [questo articolo](https://upptime.js.org/blog/2021/01/22/github-actions-schedule-not-working/) e come ho avuto modo di verificare. Non è raro che le esecuzioni partano in **ritardo** o **saltino** del tutto. Per risolvere, bisogna **triggerare i workflow manualmente via API**.
    * Ho pensato di ovviare al problema usando **crontab**. L’importante è che l’utente responsabile del comando sia autenticato su GitHub. Mi chiedo quanto duri il cookie. Altrimenti ci si può autenticare ogni volta usando un token salvato su file.
    * Ho pensato di usare crontab e non un programma Python per via di notevoli vantaggi:
      * Con crontab è molto facile programmare un evento per uno **specifico momento della settimana**. Ad esempio, fare partire la routine ogni venerdì a mezzanotte è meglio che farla partire una volta alla settimana, perché se qualcosa crasha non bisogna calcolare il tempo perso.
      * crontab riparte da solo se il server si spegne.

* Ho implementato il **caricamento automatico su Zenodo**.

* Ho implementato l’**esecuzione automatica di OC Meta** in risposta all’esecuzione del workflow che valida le issue.

  * Questo secondo workflow avviene direttamente sul server di OpenCtations, perché i workflow di GitHub posso essere eseguiti su qualunque macchina.

    <aside>
    ⚠️ Usare un self-hosted runner permette di bypassare la VPN ed eseguire codice direttamente sul server. È praticamente una **backdoor**. Chi può modificare il file di configurazione del workflow può fare quello che vuole da non sudoer sul server. Chi può farlo? I proprietari dell’organizzazione (Shotton, Peroni, Heibi) e io. Il file **CODEOWNER** permette di restringere questa cerchia e richiedere la revisione da parte di specifici utenti.

    </aside>

  * Bisogna predisporre **CodeQL** per l’analisi automatica di vulnerabilità di tipo **script injection**.

* Ho aggiunto un README alla repository che spiega come fare un deposito e la nostra politica sui tempi di processamento e sulla provenance.

## Domande

* Come faccio a consentire l’accesso alle librerie tramite la sintassi oc.nome\_libreria.modulo? Al momento, il primo elemento del percorso è il nome della libreria e non posso avere più librerie con lo stesso nome.
* Ho bisogno che un amministratore dell’organizzazione OpenCitations su GitHub crei un token di autenticazione con scadenza illimitata e permessi dello scope “repository” (il primo della lista). Dopodiché, questo token dev’essere salvato come segreto nella repository crowdsourcing. È fondamentale che il segreto si chiamo “GH\_TOKEN”.
  * Ugualmente occorre un segreto con il token di Zenodo.
* Chi è l’**autore** dei depositi \*\*\*\*di issue su Zenodo? OpenCitations?
* Ci sono novità sul concorso da tutor didattico?
* token stinput visibile solo dall’ amministratore
* L’ autore `e lo script. L' affiliazione `e opencitations

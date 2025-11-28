---
title: 2025-02-04 Archiviazione automatica report validaz
editUrl: false
---

## La Novitade

### Meta

* Cache retroattiva per il generatore di csv che funziona recuperando gli omid già contenuti nei file di output, salvandoli su un redis e saltando i file bibliografici relativi nelle nuove elaborazioni.
* è ora possibile specificare come unico identificativo un identificatore temporaneo che comincia con `temp:`. Questo identificatore viene usato per la deduplicazione all’interno del file e per la generazione di un OMID, ma non viene salvato nel triplestore. Ho testato questa funzionalità.
  * Ho poi documentato questa nuova possibilità nel readme del repositore di crowdsourcing.
* Risolto un bug nello script che carica i dati su Figshare, occorreva un’ulteriore chiamata esplicita all’API per confermare la fine dell’upload ad upload terminato. Le API di Figshare si confermano come le più complicate che ho utilizzato finora, persino più complicate di quelle di Google.
* El dump
  * RDF: [https://doi.org/10.6084/m9.figshare.21747536.v8](https://doi.org/10.6084/m9.figshare.21747536.v8)
  * CSV: [https://doi.org/10.6084/m9.figshare.21747461.v10](https://doi.org/10.6084/m9.figshare.21747461.v10)

### text2rdf

### crowdsourcing

![attachments/715349c8e3304eecb235dcc472930d2b.svg](../../../../assets/notes/attachments/715349c8e3304eecb235dcc472930d2b.svg)

* Rilettura, refactor e test del codice da lanciare sul server per scaricare i dati e processarli.

```
markdown
crowdsourcing_ingestion_data/
└── YYYY_MM/
    ├── metadata/
    ├── citations/
```

* Le issue vengono ingerite una alla volta, in modo che la source sia la issue stessa.

* Nuova label: oc meta error

* Mocking/Patching
  * Problema: isolare il codice che stiamo testando dalle sue dipendenze esterne (API; database, filesystem, servizi esterni)

  * Soluzione

    * Mock: oggetto che simula il comportamento di un oggetto reale

    ```python
    # 1 Registra le chiamate:

    mock = Mock()
    mock.some_method(1, 2, key="value")

    # Possiamo verificare che è stato chiamato
    mock.some_method.assert_called_once()

    # Possiamo verificare con quali argomenti
    mock.some_method.assert_called_with(1, 2, key="value")

    # Possiamo vedere quante volte è stato chiamato
    print(mock.some_method.call_count)  # Output: 1

    # 2. Può restituire valori specifici:

    mock = Mock(return_value="hello")
    result = mock()
    print(result)  # Output: "hello"

    # O con side_effect per valori multipli o eccezioni
    mock.side_effect = [1, 2, 3]  # Restituirà 1, poi 2, poi 3
    # oppure
    mock.side_effect = Exception("error")  # Solleverà un'eccezione
    ```

  * **Patch:** è un decoratore/context manager che temporaneamente sostituisce un oggetto con un Mock

    ```python
    @patch('requests.delete')
    @patch('requests.post')
    def test_successful_update_on_success(self, mock_post, mock_delete):
        # 1. Setup dei mock
        mock_delete.return_value.status_code = 200  # Simuliamo una risposta di successo
        mock_post.return_value.status_code = 201    # Simuliamo una risposta di successo

        # 2. Chiamata alla funzione da testare
        update_issue_labels("123", success=True)

        # 3. Verifica delle chiamate
        mock_delete.assert_called_once_with(
            "https://api.github.com/repos/test/repo/issues/123/labels/to%20be%20processed",
            headers=self.headers,
            timeout=30
        )
    ```

* Creato il crontab su ServerGrosso

* Il responsible agent è una roba tipo [https://api.github.com/user/42008604](https://api.github.com/user/42008604)

* Ho implementato un sistema di archiviazione automatica per i report di validazione basato su file di configurazione ([https://github.com/opencitations/crowdsourcing/blob/main/archive\_config.yaml](https://github.com/opencitations/crowdsourcing/blob/main/archive_config.yaml)). È possibile definire:

  * La frequenza di archiviazione.
  * Il numero di report necessari per attivare l'archiviazione.
  * Quanti report archiviare in una singola operazione su Zenodo.
  * Una serie di metadati di base.

  Quando viene raggiunto il numero massimo di report, l'archiviazione su Zenodo parte automaticamente. I link nelle issue ([https://github.com/arcangelo7/crowdsourcing/issues/35](https://github.com/arcangelo7/crowdsourcing/issues/35)) rimangono funzionanti perché puntano a una pagina HTML unica ([https://github.com/opencitations/crowdsourcing/blob/main/docs/validation\_reports/index.html](https://github.com/opencitations/crowdsourcing/blob/main/docs/validation_reports/index.html)), che legge un parametro `report` per identificare il file. Un indice ([https://github.com/arcangelo7/crowdsourcing/blob/main/docs/validation\_reports/index.json](https://github.com/arcangelo7/crowdsourcing/blob/main/docs/validation_reports/index.json)) tiene traccia sia dei report su GitHub che di quelli archiviati su Zenodo. Per i report su Zenodo, l'indice memorizza due URL:

  1. L'URL diretto dell'API di Zenodo per accedere immediatamente al contenuto del file
  2. Il DOI del record come fallback nel caso l'accesso diretto non sia disponibile

  I report di validazione contengono l'id della issue nel nome (es. validation\_issue\_42.html), per essere facilmente ritrovabili e per mantenere il collegamento con la issue originale.

  Quando un utente accede a un report attraverso il link in una issue, la pagina HTML:

  1. Legge il parametro report dall'URL
  2. Consulta l'indice per determinare la posizione del file
  3. Se il file è su GitHub, reindirizza direttamente all'URL di GitHub
  4. Se il file è su Zenodo:
     * Scarica automaticamente il file usando l'URL diretto dell'API
     * Reindirizza l'utente alla pagina del record su Zenodo, dove può trovare metadati e contesto aggiuntivi
     * Se l'accesso diretto fallisce, usa il DOI come fallback

* GitHub Action Concurrency: [https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/control-the-concurrency-of-workflows-and-jobs](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/control-the-concurrency-of-workflows-and-jobs)

* Test locale GitHub Action: [https://github.com/nektos/act](https://github.com/nektos/act)
  * Si può anche specificare un payload per triggerare i workflow che dipendono, ad esempio, dall’apertura di un issue

    ```json
    {
      "action": "opened",
      "issue": {
        "number": 1,
        "title": "deposit localhost:330 doi:10.1007/978-3-662-07918-8_3",
        "body": "\"id\",\"title\",\"author\",\"pub_date\",\"venue\",\"volume\",\"issue\",\"page\",\"type\",\"publisher\",\"editor\"\n\"doi:10.1007/978-3-662-07918-8_3\",\"Influence of Dielectric Properties, State, and Electrodes on Electric Strength\",\"Ushakov, Vasily Y.\",\"2004\",\"Insulation of High-Voltage Equipment [isbn:9783642058530 isbn:9783662079188]\",\"\",\"\",\"27-82\",\"book chapter\",\"Springer Science and Business Media LLC [crossref:297]\",\"\"\n\"doi:10.1016/0021-9991(73)90147-2\",\"Flux-corrected transport. I. SHASTA, a fluid transport algorithm that works\",\"Boris, Jay P; Book, David L\",\"1973-01\",\"Journal of Computational Physics [issn:0021-9991]\",\"11\",\"1\",\"38-69\",\"journal article\",\"Elsevier BV [crossref:78]\",\"\"\n\"doi:10.1109/20.877674\",\"An investigation of FEM-FCT method for streamer corona simulation\",\"Woong-Gee Min, ; Hyeong-Seok Kim, ; Seok-Hyun Lee, ; Song-Yop Hahn, \",\"2000-07\",\"IEEE Transactions on Magnetics [issn:0018-9464]\",\"36\",\"4\",\"1280-1284\",\"journal article\",\"Institute of Electrical and Electronics Engineers (IEEE) [crossref:263]\",\"\"\n\"doi:10.1109/tps.2003.815469\",\"Numerical study on influences of barrier arrangements on dielectric barrier discharge characteristics\",\"Woo Seok Kang, ; Jin Myung Park, ; Yongho Kim, ; Sang Hee Hong, \",\"2003-08\",\"IEEE Transactions on Plasma Science [issn:0093-3813]\",\"31\",\"4\",\"504-510\",\"journal article\",\"Institute of Electrical and Electronics Engineers (IEEE) [crossref:263]\",\"\"\n\"\",\"Spatial Distribution of Ion Current Around HVDC Bundle Conductors\",\"Zhou, Xiangxian; Cui, Xiang; Lu, Tiebing; Fang, Chao; Zhen, Yongzan\",\"2012-01\",\"IEEE Transactions on Power Delivery [issn:0885-8977 issn:1937-4208]\",\"27\",\"1\",\"380-390\",\"journal article\",\"Institute of Electrical and Electronics Engineers (IEEE) [crossref:263]\",\"\"\n\"doi:10.1007/978-1-4615-3786-1_11\",\"The Solution of the Continuity Equations in Ionization and Plasma Growth\",\"Davies, A. J.; Niessen, W.\",\"1990\",\"Physics and Applications of Pseudosparks [isbn:9781461366874 isbn:9781461537861]\",\"\",\"\",\"197-217\",\"book chapter\",\"Springer Science and Business Media LLC [crossref:297]\",\"\"\n\"doi:10.1088/0022-3727/13/1/002\",\"Discharge current induced by the motion of charged particles\",\"Sato, N\",\"1980-01-14\",\"Journal of Physics D: Applied Physics [issn:0022-3727 issn:1361-6463]\",\"13\",\"1\",\"3-6\",\"journal article\",\"IOP Publishing [crossref:266]\",\"\"\n\"doi:10.1109/27.106800\",\"Particle-in-cell charged-particle simulations, plus Monte Carlo collisions with neutral atoms, PIC-MCC\",\"Birdsall, C.K.\",\"1991-04\",\"IEEE Transactions on Plasma Science [issn:0093-3813]\",\"19\",\"2\",\"65-85\",\"journal article\",\"Institute of Electrical and Electronics Engineers (IEEE) [crossref:263]\",\"\"\n\"doi:10.1016/0021-9991(79)90051-2\",\"Fully multidimensional flux-corrected transport algorithms for fluids\",\"Zalesak, Steven T\",\"1979-06\",\"Journal of Computational Physics [issn:0021-9991]\",\"31\",\"3\",\"335-362\",\"journal article\",\"Elsevier BV [crossref:78]\",\"\"\n\"doi:10.1088/0022-3727/39/14/017\",\"Diffusion correction to the Raether–Meek criterion for the avalanche-to-streamer transition\",\"Montijn, Carolynne; Ebert, Ute [orcid:0000-0003-3891-6869]\",\"2006-06-30\",\"Journal of Physics D: Applied Physics [issn:0022-3727 issn:1361-6463]\",\"39\",\"14\",\"2979-2992\",\"journal article\",\"IOP Publishing [crossref:266]\",\"\"\n\"doi:10.1007/978-3-663-14090-0 isbn:9783528085995 isbn:9783663140900\",\"High-Voltage Insulation Technology\",\"Kind, Dieter; Kärner, Hermann\",\"1985\",\"\",\"\",\"\",\"\",\"book\",\"Springer Science and Business Media LLC [crossref:297]\",\"\"\n\"\",\"Space-charge effects in high-density plasmas\",\"Morrow, R\",\"1982-06\",\"Journal of Computational Physics [issn:0021-9991]\",\"46\",\"3\",\"454-461\",\"journal article\",\"Elsevier BV [crossref:78]\",\"\"\n\"doi:10.1007/s42835-022-01029-y\",\"Numerical Simulation of Gas Discharge Using SUPG-FEM-FCT Method with Adaptive Mesh Refinement\",\"Choi, Chan Young; Park, Il Han [orcid:0000-0002-9383-6856]\",\"2022-02-28\",\"Journal of Electrical Engineering & Technology [issn:1975-0102 issn:2093-7423]\",\"17\",\"3\",\"1873-1881\",\"journal article\",\"Springer Science and Business Media LLC [crossref:297]\",\"\"\n===###===@@@===\n\"citing_id\",\"cited_id\"\n\"doi:10.1007/s42835-022-01029-y\",\"doi:10.1007/978-3-662-07918-8_3\"\n\"doi:10.1007/s42835-022-01029-y\",\"doi:10.1016/0021-9991(73)90147-2\"\n\"doi:10.1007/s42835-022-01029-y\",\"doi:10.1109/20.877674\"\n\"doi:10.1007/s42835-022-01029-y\",\"doi:10.1109/tps.2003.815469\"\n\"doi:10.1007/s42835-022-01029-y\",\"doi:10.1109/tpwrd.2011.2172694\"\n\"doi:10.1007/s42835-022-01029-y\",\"doi:10.1007/978-1-4615-3786-1_11\"\n\"doi:10.1007/s42835-022-01029-y\",\"doi:10.1088/0022-3727/13/1/002\"\n\"doi:10.1007/s42835-022-01029-y\",\"doi:10.1109/27.106800\"\n\"doi:10.1007/s42835-022-01029-y\",\"doi:10.1016/0021-9991(79)90051-2\"\n\"doi:10.1007/s42835-022-01029-y\",\"doi:10.1088/0022-3727/39/14/017\"\n\"doi:10.1007/s42835-022-01029-y\",\"doi:10.1007/978-3-663-14090-0\"\n\"doi:10.1007/s42835-022-01029-y\",\"doi:10.1016/0021-9991(82)90026-2\"",
        "labels": [
          {
            "name": "deposit"
          }
        ]
      }
    }
    ```

## Domande

* Gli facciamo fare i test su opencitations/crowdsourcing o su arcangelo7/crowsourcing?
* Che prefisso usiamo per il crowdsourcing?

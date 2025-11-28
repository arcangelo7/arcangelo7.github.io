---
title: 2025-03-06 HERITRACE testato
editUrl: false
---

## La Novitade

### HERITRACE

* Per testare Heritrace, ho deciso di sperimentare Pytest al posto di Unittest, che ho sempre usato finora.

  * Ha una struttura dei test più semplice: usa semplici funzioni, invece di classi che ereditano da test case, e utilizza meno codice boilerplate.
  * Ha delle asserzioni più potenti e delle spiegazioni più chiare e dettagliate sul perché le asserzioni falliscono
  * al posto di setUp/tearDown, usa le fixtures, che sono più flessibili e potenti. Per esempio, possono essere riutilizzate su più file e avere **different scope** (funzione, classe, modulo, sessione).
  * è più semplice eseguire lo stesso test con diversi input; ovvero, è possibile fare test parametrizzati, il che riduce la deduplicazione del codice in maniera significativa.
  * PyTest ha un ecosistema molto ricco di plug-in, come PyTest Flask, specifico per le applicazioni Flask.
  * PyTest è lo standard industriale per il test di applicazioni Python.

  ```python
  @pytest.fixture
  def app():
      """Create and configure a Flask application for testing."""
      app = create_app(TestConfig)

      # Create application context
      with app.app_context():
          yield app

  @pytest.fixture
  def client(app):
      """A test client for the app."""
      return app.test_client()
  ```

* Sto cominciando a realizzare la famosa guida sull'integrazione continua direttamente nel progetto di Heritrace, così che costituisca un esempio concreto. Ci vorrà sicuramente una guida separata che spieghi le cose fin dalle fondamenta, ma è un modo per cominciare facendo una cosa utile nell’immediato.
  * [https://github.com/opencitations/heritrace/blob/main/tests/README.md](https://github.com/opencitations/heritrace/blob/main/tests/README.md)
  * [https://github.com/opencitations/heritrace/blob/main/.github/CI\_CD\_SETUP.md](https://github.com/opencitations/heritrace/blob/main/.github/CI_CD_SETUP.md)

* Mi sono accorto che sto usando Flask 2.3.3, mentre l'ultima versione è Flask 3.1.0. Lo devo aggiornare dopo aver scritto i test per essere sicuro che funzioni ancora tutto.
  * Roba figa che mi interessa: route asincrone, ovvero operazioni di I/O non bloccanti

* Release automatica, inserendo la parola chiave \[release] nel commit, con documentazione su come si fa.

* Cliccare sulla pagina di Coverage apre il report dettagliato che viene pubblicato direttamente su GitHub Pages. In pratica, dopo numerosi tentativi, sono riuscito a replicare la stessa cosa che codecov offre tramite un sistema proprietario e freemium utilizzando solo codici open source. Inoltre, con questo sistema, i file di coverage non occupano spazio sui repository, ma vengono gestiti tramite artefatto del workflow.

* Alert con rotellina e testo esplicativo
  * Cercare orfani e proxy
  * Applicare le modifiche a un’entità
  * Ripristino di una versione
  * Creazione di una entità

* Ricerca per entità di livello zero:

  Mi sono reso conto che ci sono campi per cui ha senso abilitare la ricerca e campi per cui non ce l'ha. Ad esempio, ha senso abilitare la ricerca per il campo titolo, ma non ce l'ha per la pagina iniziale di un embodiment.

  Pertanto, ho aggiunto un nuovo parametro di configurazione a livello di proprietà che permette di specificare se una proprietà è ricercabile oppure no: **supportsSearch**.

  ```yaml
  - class: "http://purl.org/spar/fabio/JournalArticle"
    displayName: "Journal Article"
    displayProperties:
      - property: "http://purl.org/dc/terms/title"
        values:
          - displayName: "Title"
            shouldBeDisplayed: true
            inputType: "text"
            required: true
        supportsSearch: true  # Enables search functionality for this field
  ```

* Top level search

**LI BUGGIFIXXI**

* Mi sono accorto di un bug nella cancellazione di un'entità, per cui venivano cancellate soltanto le triple di cui l'entità è soggetto e non quelle di cui l'entità cancellata è oggetto, come dovrebbe accadere.

* Mi sono accorto che, in fase di test automatico su GitHub, alcune query non vanno a buon fine. Questo perché rdflib-ocdm non prevedeva un sistema di retry con backoff incrementale.

* In fase di realizzazione dei test, mi sono accorto che, nella creazione di un'entità, non stavamo realmente verificando la cardinalità zero, cioè le proprietà obbligatorie.

  In pratica, il sistema non stava correttamente controllando che una proprietà obbligatoria fosse effettivamente presente nei dati.

  Questo non aveva conseguenze concrete perché il form nel front end già forzava l'inserimento di proprietà obbligatorie. Tuttavia, mancava comunque la verifica nel back end.

* In caso di dati invalidi, inviati all'API per controllare orfani ed entità proxy da cancellare, il back-end rispondeva con 200 anziché 400.

* Non c'era nessun meccanismo di retry con backoff esponenziale per le query che partivano inserendo testo nei campi ricercabili dei vari form di creazione e modifica di un'entità.

* nel Docker venivano aggiunti un botto di file inutili. Ho aggiunto un `.dockerignore`. Ora l'immagine è molto più leggera. Non posso comunque caricarla come il pacchetto docker su GitHub o docker hub perché non è autosufficiente dipende da come viene configurata oltre al fatto che la configurazione contiene informazioni sensibili quindi non può essere pubblicata.

* Quando veniva modificato l'ordine delle entità ordinate (e.g., gli autori) venivano cancellate tutte le entità ordinate e l'ordine veniva ricreato da zero.

  La stessa cosa, però, non accadeva in caso di cancellazione di una o più di queste entità ordinate.

* Non stavo validando i pattern nell'aggiunta di nuove triple

### rdflib-ocdm

* Virtuoso su docker per i test
* Ho scritto un [README](https://github.com/opencitations/rdflib-ocdm) che documenta a cosa serve la libreria, come usarla e come testarla
* Release automatica su GitHub (ergo Zenodo) e PyPI quando \[release] nel commit con semver automatico. Documentato in [CONTRIBUTING.md](https://github.com/opencitations/rdflib-ocdm/blob/main/CONTRIBUTING.md)

### time-agnostic-library

* Release automatica su GitHub (ergo Zenodo) e PyPI quando \[release] nel commit con semver automatico. Documentato in [CONTRIBUTING.md](https://github.com/opencitations/time-agnostic-library/blob/main/CONTRIBUTING.md)

## Domande

* Ripercorrere insieme form DSH
  * Quando mi si chiede di allegare una tabella come dovrei fare? E i listaggi?

* Devo considerare anche gli orfani che si creano a cascata? No

  Mi spiego: se io cancello una issue, voglio anche cancellare il volume e il journal nel caso in cui diventino orfani a cascata.

  Secondo me, no.

* Cancellazione automatica di entità su cui stanno lavorando altri. Sì

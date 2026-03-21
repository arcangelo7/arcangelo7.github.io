---
title: 2024-12-02 Meta disaster recovery
editUrl: false
---

## La Novitade

### Meta

* Lo script di merge aggregava correttamente le entità correlate presenti all'interno di un file, minimizzando il numero di query al triplestore. Tuttavia, la funzione di merge cercava ancora le entità correlate per ogni coppia di entità (sopravvissuta ed entità da fondere), introducendo una ridondanza. Ho corretto questo bug di performance.

* Test sulle performance

  ```python
  Performance Test Results:
  --------------------------------------------------
  Total Entities: 1000
  Runs per configuration: 3

  Distribution Type: single_row
  ------------------------------

  Efficiency Metrics:
  Batch Size  1: 1.00x speedup
  Batch Size  5: 1.01x speedup
  Batch Size 10: 1.01x speedup
  Batch Size 20: 1.04x speedup
  Batch Size 50: 1.02x speedup

  Execution Times (seconds):

  Batch Size: 1
    Average: 35.399s
    Std Dev: 1.328s
    Raw times: 36.876, 35.018, 34.302

  Batch Size: 5
    Average: 35.141s
    Std Dev: 0.582s
    Raw times: 34.657, 34.979, 35.787

  Batch Size: 10
    Average: 35.058s
    Std Dev: 0.341s
    Raw times: 34.926, 34.802, 35.445

  Batch Size: 20
    Average: 34.147s
    Std Dev: 0.273s
    Raw times: 34.386, 34.205, 33.849

  Batch Size: 50
    Average: 34.853s
    Std Dev: 0.425s
    Raw times: 34.789, 34.464, 35.308

  Optimal Batch Size: 20

  Distribution Type: equal_rows
  ------------------------------

  Efficiency Metrics:
  Batch Size  1: 1.00x speedup
  Batch Size  5: 0.99x speedup
  Batch Size 10: 1.03x speedup
  Batch Size 20: 1.04x speedup
  Batch Size 50: 1.00x speedup

  Execution Times (seconds):

  Batch Size: 1
    Average: 16.947s
    Std Dev: 0.301s
    Raw times: 16.643, 17.244, 16.953

  Batch Size: 5
    Average: 17.196s
    Std Dev: 0.917s
    Raw times: 16.262, 18.094, 17.232

  Batch Size: 10
    Average: 16.431s
    Std Dev: 1.025s
    Raw times: 15.633, 16.074, 17.587

  Batch Size: 20
    Average: 16.313s
    Std Dev: 1.085s
    Raw times: 15.782, 15.597, 17.561

  Batch Size: 50
    Average: 16.990s
    Std Dev: 0.896s
    Raw times: 16.042, 17.105, 17.822

  Optimal Batch Size: 20

  Distribution Type: mixed
  ------------------------------

  Efficiency Metrics:
  Batch Size  1: 1.00x speedup
  Batch Size  5: 1.00x speedup
  Batch Size 10: 1.02x speedup
  Batch Size 20: 1.05x speedup
  Batch Size 50: 1.07x speedup

  Execution Times (seconds):

  Batch Size: 1
    Average: 22.243s
    Std Dev: 1.699s
    Raw times: 24.126, 21.780, 20.823

  Batch Size: 5
    Average: 22.235s
    Std Dev: 1.628s
    Raw times: 23.920, 22.113, 20.671

  Batch Size: 10
    Average: 21.806s
    Std Dev: 1.489s
    Raw times: 23.522, 20.857, 21.039

  Batch Size: 20
    Average: 21.261s
    Std Dev: 0.731s
    Raw times: 22.103, 20.877, 20.802

  Batch Size: 50
    Average: 20.751s
    Std Dev: 0.461s
    Raw times: 21.010, 21.024, 20.219

  Optimal Batch Size: 50
  ```

  * Il batch processing ha un impatto positivo, ma di poco.

* Ho controllato lo stato di avanzamento attuale

  ```sql
  Tipo di entità: br, 
  Totale entità uniche: 4,566,013, 
  Con 'Done'=True: 3,337,578, 
  Percentuale completata: 73.10%
  ```

* Ho trovato un bug bruttino nella funzione di merge di oc\_ocdm

  ```python
  def merge(self, other: GraphEntity, prefer_self: bool = False) -> None:
  		# [...]
      types: List[URIRef] = other.get_types()
      for cur_type in types:
          self._create_type(cur_type)
      # [...]

  def _create_type(self, res_type: URIRef) -> None:
      self.remove_type()  # <-- It doesn't remove the main type!
      create_type(self.g, self.res, res_type)

  def remove_type(self) -> None:
      self.g.remove((self.res, RDF.type, None))
      # Restore the main type IRI
      iri_main_type: URIRef = self.short_name_to_type_iri[self.short_name]
      create_type(self.g, self.res, iri_main_type)
  ```

  Se fondo un entità con un tipo specifico (ad esempio un JournalArticle) con un’altra che non ha tipo specifico (solo Expression) perdo il tipo specifico

* Il misterioso file core che pesa 347G

  [https://github.com/openlink/virtuoso-opensource/issues/150](https://github.com/openlink/virtuoso-opensource/issues/150)

  Quando Virtuoso crasha fa un istantanea della RAM e la salva nel file core. Da lì è poi in grado di recuperare l’integrità.

* [https://github.com/opencitations/oc\_meta/issues/36](https://github.com/opencitations/oc_meta/issues/36)

### HERITRACE

* dcterms:description \[0..n]

* Risolto un bug per cui in caso di shape multiple come valori di una properità non venivano individuate correttamente le etichette delle varie shape (issue, volume, journal)

* Migliorata la selezione dello snapshot appropriato da utilizzare come fonte durante il ripristino per le entità correlate. Anche le entità correlate ripristinate preservano il tempo di invalidazione dello snapshot di cancellazione preesistente.

* Gestione degli orfani anche in caso di cancellazione di un’intera entità

* La differenza tra i risultati delle query SPARQL sul grafo RDFLib ricostruito e sul triplestore non era dovuta a un bug di RDFLib, ma all'utilizzo di una query generica per expression invece di una specifica per la risorsa bibliografica. Questo accadeva perché i tipi dell'entità non venivano ordinati per priorità nel contesto della linea temporale e della versione.

* Durante l'implementazione dei controlli per la paginazione, l'ordine e la ricerca nel TimeVault, ho notato di aver già sviluppato queste funzionalità per il catalogo. Ho quindi riutilizzato gli stessi componenti React. Questo approccio ha un effetto interessante: non è possibile ripristinare direttamente una classe con la proprietà `shouldBeDisplayed` a `False` (come un identificatore). In realtà, questa limitazione è vantaggiosa perché impedisce il ripristino arbitrario di elementi orfani - per recuperare un identificatore, è necessario ripristinare una specifica versione della risorsa bibliografica associata.

  ```python
  const apiEndpoint = isTimeVault ? '/api/time-vault' : '/api/catalogue';
  ```

* Ho dockerizzato HERITRACE
  * Servizi
    * Python
    * Node
    * Redis
  * I triplestore non sono gestiti tramite Docker poiché questo limiterebbe la flessibilità del sistema. Non tutti gli utenti vogliono gestire i triplestore con Docker, alcuni potrebbero già avere i propri triplestore attivi. È più flessibile permettere semplicemente di specificare l'endpoint nel file di configurazione.
    * Se l’utente specifica un endpoint su [localhost](http://localhost), esso viene automaticamente interpretato come host.docker.internal, ovvero localhost dell’host e non del docker. Ovviamente anche specificare 127.0.0.1 o 0.0.0.0 sortisce lo stesso effetto.
  * Semplificata la configurazione della TimeAgnosticLibrary, che richiede un file di configurazione separato. Questo file, se non presente, viene generato automaticamente utilizzando le informazioni dal file di configurazione di HERITRACE, inclusa la conversione tra localhost e host esterno per Docker.

### oc\_ocdm

* Marcatore esplicito per entità ripristinate. Va indicato a manina.

  Perché aggiungere un marcatore esplicito per per il ripristino di un'entità anziché derivare queste informazioni direttamente dalla provenance? Perché per derivarle direttamente dalla provenance dovrei andare a leggere la provenance, causando un grave problema di performance. Al momento, infatti, l'unica informazione di contesto che viene recuperata è quella sul contatore della provenance. Dato che la provenance è sempre in aggiunta, gli snapshot precedenti non vengono mai letti e grazie a Dio è così e deve rimanere così.

  ```python
  class GraphEntity(AbstractEntity):
      @property 
      def is_restored(self) -> bool:
          """Indicates if this entity was restored after being deleted."""
          return self._is_restored

      def mark_as_restored(self) -> None:
          """
          Marks an entity as being restored after deletion.
                  
          This state signals to the provenance system that:
          - No new invalidation time should be generated for the previous snapshot
          - The original deletion snapshot's invalidation time should be preserved
          - The entity should be treated as restored rather than newly created
          """
          self._to_be_deleted = False
          self._is_restored = True
          
      def commit_changes(self):
          self.preexisting_graph = Graph(identifier=self.g.identifier)
          if self._to_be_deleted:
              self.remove_every_triple()
          else:
              for triple in self.g.triples((self.res, None, None)):
                  self.preexisting_graph.add(triple)
          self._is_restored = False
          self._to_be_deleted = False
          self._was_merged = False
          self._merge_list = tuple()
          
  class ProvSet(AbstractSet):
  		def generate_provenance(self, c_time: float = None) -> set:
  				# [...]
          elif cur_subj.is_restored:
              # RESTORATION SNAPSHOT
              last_snapshot: SnapshotEntity = self.add_se(prov_subject=cur_subj, res=last_snapshot_res)
              # Don't set invalidation time on previous snapshot for restorations
              
              cur_snapshot: SnapshotEntity = self._create_snapshot(cur_subj, cur_time)
              cur_snapshot.derives_from(last_snapshot)
              cur_snapshot.has_description(f"The entity '{cur_subj.res}' has been restored.")
              if update_query:
                  cur_snapshot.has_update_action(update_query)
              modified_entities.add(cur_subj.res)
  ```

  Stessa cosa in rdflib\_ocdm

### time-agnostic-library

* La funzione che si occupa di parsare le query di update è ora threadsafe. Così HERITRACE può ricostruire la storia delle entità cancellate in parallelo.

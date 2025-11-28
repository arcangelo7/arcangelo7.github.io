---
title: 2023-01-31 merge tra entità con prefissi diversi
editUrl: false
---

## Novità

* Ho completato e testato il metodo per fondere due entità su Meta.
  * Ho verificato che lo Storer di oc\_ocdm aggiorna correttamente i dati e la provenance di entità con supplier prefix diversi
* Il generatore di CSV fonde due identificatori se hanno uguale schema e valore letterale. Questa funzione è stata testata.
* Bugfix su oc\_ocdm
  * Corretto un bug in oc\_ocdm per cui le sringhe importate da Blazegraph avevano il datatype, mentre i valori creati da oc\_ocdm no, per cui veniva generato un delta anche in assenza di cambiamenti.

  * Ho verificato con un test che, in caso di merge tra due entità A e B con prefissi diversi, veniva aggiornato solo l’info\_file di provenance relativo al prefisso di A, sia per A che per B. Per correggere questo comportamento ho aggiunto una nuova funzione a oc\_ocdm, la quale corregge il percorso dell’info\_dir nel caso in cui contenga un prefisso discordante con il soggetto in considerazione.

    ```python
    def _fix_info_dir(self, prov_subject: URIRef) -> None:
        if self.info_dir is None or self.info_dir == "":
            return
        if has_supplier_prefix(prov_subject, self.base_iri):
            supplier_prefix = get_prefix(prov_subject)
            info_dir_folders = os.path.normpath(self.info_dir).split(os.sep)
            info_dir_prefix = [
                folder for folder in info_dir_folders 
                if folder.startswith('0') and folder.endswith('0') and folder.isdigit()][-1]
            if supplier_prefix != info_dir_prefix:
                new_info_dir = os.sep.join([folder if folder != info_dir_prefix else supplier_prefix for folder in info_dir_folders])
                self.info_dir = new_info_dir
                self.counter_handler: CounterHandler = FilesystemCounterHandler(new_info_dir)
    ```

    Questa modifica è totalmente retro-compatibile.

  * Ho creato un nuovo repo, rdflib-ocdm.
    * Classe OCDMGraph/OCDMConjunctiveGraph, eredita da rdflib.Graph/rdflib.ConjunctiveGraph e aggiunge il metodo

      ```python
      def preexisting_finished(self):
      	  self.preexisting_graph = deepcopy(self)
      ```

    * Classe OCDMProvenance
      * La query di update viene generata facendo il diff tra il preexisting\_graph e il grafo corrente.

    * TODO: aggiungere un metodo per fare il merge. Bisogna salvare le informazioni sulle entità fuse da riutilizzare in fase di generazione della provenance.

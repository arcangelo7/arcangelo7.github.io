---
title: 2022-02-10 Triplestore del terzo tipo
editUrl: false
---

## Cosa ho fatto

1. È ora possibile specificare gli argomenti di [\*\*crossref\_process](https://github.com/opencitations/meta/blob/master/run/crossref_process.py)\*\* sia tramite linea di comando che tramite [file](https://github.com/opencitations/meta/blob/master/config/crossref_config.yaml) di **configurazione** **YAML** (che è stato documentato nel [README](https://github.com/opencitations/meta/blob/master/README.md)).
   * Se si specifica l’argomento opzionale —config, gli altri argomenti altrimenti obbligatori diventano opzionali.

     ```python
     arg_parser.add_argument('-c', '--config', dest='config', required=False,
                                 help='Configuration file path')
     required = not any(arg in sys.argv for arg in {'--config', '-c'})
     arg_parser.add_argument('-cf', '--crossref', dest='crossref_json_dir', required=required,
                                 help='Crossref json files directory')
     ```

2. Ora [\*\*coci\_process](https://github.com/opencitations/meta/blob/master/run/coci_process.py)\*\* processa indifferentemente file CSV e file **zip**.

3. Ho aggiornato la lista dei DOI richiesti tramite il dump di **COCI** di **gennaio**. I DOI sono passati da 69,897,399 a 71,337,644.

4. Indipendentemente dal separatore di directory utilizzato in qualunque file di configurazione, il separatore viene normalizzato utilizzando quello specifico del sistema operativo in uso.

5. Novità relative al **multi-process**:
   1. Ho generato un CSV contenente tutte e sole le **riviste** dotate di **identificatore** e relative a documenti il cui **DOI** è presente **su COCI**. Tale CSV pesa 5.45 GB.

   2. Date le dimensioni, ho ritenuto **inefficiente** fare eseguire la **deduplicazione** a Meta, per tre ragioni:

      1. Meta effettua una chiamata al **triplestore** per ogni riga.
      2. 6 GB di CSV in RAM diventano 60, perché ogni dizionario va hashato.
      3. Il file deduplicato pesa appena 38,2 MB per 363,185 riviste!

      In altre parole, vedo solo vantaggi nel deduplicare le riviste a monte, quindi ho inserito questa feature senza renderla opzionale.

      Inoltre, tale soluzione permette di dividere le riviste su più CSV, in modo da che Meta possa elaborarli in multi-processing.

   3. Nuovo **plugin [prepare\_multiprocess](https://github.com/opencitations/meta/blob/master/run/prepare_multiprocess.py)**, il quale esegue tutte le operazioni in preparazione al multiprocess di Meta. Questo plugin si lancia specificando il percorso dello **stesso identico** file di configurazione che si vuole utilizzare per **Meta**.

      ```bash
      python -m meta.run.prepare_multiprocess -c path/to/meta_config.yaml
      ```

      Nel senso che, ultimati i preparativi al multiprocess, si può lanciare il processo principale di Meta utilizzando lo stesso file di configurazione, senza fare alcuna modifica. Tutte le modifiche avvengono in automatico. Più nello specifico, questo plugin:

      1. Genera i CSV di input contenenti tutte le riviste già deduplicate in una cartella temporanea della directory corrente.
      2. Lancia Meta sui CSV in tale directory temporanea.
      3. Cancella la directory temporanea.
      4. Divide i CSV grezzi per publisher e li sostituisce a quelli di input. I CSV grezzi di input vengono spostati in un cartella chiamata {nome\_cartella\_originale}\_old.

6. [csv\_generator](https://github.com/opencitations/meta/blob/master/run/csv_generator.py) **non** include nei csv in output generati a partire dal triplestore le risorse bibliografiche di tipo journal issue, journal volume, journal, book set, book series, book part e book section.

7. Ho aggiunto dei test per csv\_generator e prepare\_multiprocess e ho scritto la documentazione di entrambi moduli (rst + README).

8. Ho inviduato i tipi di risorsa bibliografica previsti da Crossref e non dall’OCDM. Li riporto per id:
   * peer-review
   * proceedings-series
   * posted-content
   * grant

9. Meta ha processato con successo tutto il dump di Crossref gennaio 2022 considerando 10 righe **casuali** per CSV senza mai crashare. Questo è un buon segnale circa l’assenza di bug nel software attuale, perché Meta è stato progettato per fare molti controlli e crashare a ogni eccezione.

10. Per quanto riguarda l’articolo:
    1. JASIST impone come limite 7,000 parole per i *research articles*:

       > *word count includes the body of the manuscript, tables, captions, and appendices*. The *word count does not include the abstract, keywords, references and supplemental material*

       1. È possibile sforare del 10%, previa autorizzazione da parte dell’EIC.
       2. Il nostro articolo è attualmente lungo 14,519 parole, includendo il corpo del testo, le tabelle, le didascalie ma **non** il codice, che ho considerato come immagine. Se si include anche il codice nei Listing il computo sale a 15,376 parole.

    2. Ho scoperto che si possono esportare i dati da Blazegraph rapidissimamente tramite comando:

       ```bash
       java -cp blazegraph.jar com.bigdata.rdf.sail.ExportKB -format N-Quads .\RWStore.properties
       ```

    3. Ecco quanto hanno impiegato i vari triplestore a caricare i dati (CPU: 12900k, RAM: 3200 MHz CL14):

       1. Dati (4,960,087 quadruple su file .nq)
          1. **Virtuoso: 00:00:17**
             1. Tramite funzioni `ld_dir()` e `rdf_loader_run()` lanciate tramite il programma `isql`
          2. GraphDB: 00:00:41
             1. Tramite interfaccia
          3. Blazegraph: 00:00:53
             1. Tramite classe `DataLoader`
          4. Apache Jena Fuseki: 00:01:20
             1. Tramite interfaccia
       2. Provenance (19,348,027 quadruple su file .nq)
          1. **Virtuoso: 00:01:30**
          2. GraphDB: 00:03:07
          3. Apache Jena Fuseki: 00:05:16
          4. Blazegraph: 00:05:23

        <aside>
        🏆 GraphDB vince il premio migliore usabilità tra tutti i triplestore che ho provato finora

        </aside>

        <aside>
        ⚠️ Nota riguardante **QLever**: non sono riuscito a utilizzarlo perché mi servirebbe un’istanza di Ubuntu con 1 TB. Vedrò di procurarmela in seguito. Riporto quanto scritto nella documentazione di QLever.

        </aside>

       > When building an index, QLever will create scratch space for on-disc sorting. This space is allocated as a large 1 TB sparse file. On standard Linux file systems such as Ext4 sparse files are optimized and this will only take as much disk space as is actually used ([https://github.com/ad-freiburg/qlever/blob/master/docs/troubleshooting.md](https://github.com/ad-freiburg/qlever/blob/master/docs/troubleshooting.md)).

## Domande

1. Come faccio a modificare l’OCDM?
2. Mi è capitato di trovare più volte, per riviste diverse, l’**ISSN 0000-0000**. Questo ISSN risulta valido utilizzando le funzioni is\_valid e \_\_check\_digit di [ISSNManager](https://github.com/opencitations/meta/blob/master/lib/id_manager/issnmanager.py). Tuttavia, a me sembra un placeholder, come il Test Account di cui abbiamo parlato nell’articolo per *Scientometrics*, e credo che vada rimosso, perché fonde in un’unica rivista decine di riviste diverse. Cosa ne pensi?
3. È possibile usare Crossref per verificare la validità di un ISSN (o di un ISBN) e ottenere il nome autorevole di una rivista? Ad esempio, tramite [https://api.crossref.org/journals/0892-7790](https://api.crossref.org/journals/0892-7790).
4. Al momento i CSV in output di Meta non riportano il MetaID di volume e issue, immagino per privilegiare la leggibilità. Sei d’accordo?
5. Al momento Meta riceve sempre CSV filtrati per *wanted DOIs*, perché tali CSV sono generati tramite uno script che riceve i *wanted DOIs* come argomento. Tuttavia, Meta non possiede tale argomento, ma penso che dovrei aggiungerlo, perché Meta è un software generico, giusto?
6. Cosa ci si aspetta che accada quando il parametro `rdf_output_in_chunks` di Meta viene specificato a False?
7. Durante il multi-processo lo stesso info\_dir viene letto contemporaneamente da due processi, quindi due processi pensano, per esempio, che esistano 200 br e che occorra creare la 201. Lo stesso vale per la provenance. In poche parole, a me sembra che Meta non possa funzionare in multi-processo perché oc\_ocdm non è *thread safe*. Mi sfugge qualcosa?
8. Domande relative ai triplestore:
   1. Ti risulta che utilizzando il Fuseki le query vengano eseguite solo sul grafo di default? Sai come configurarlo in modo che le query vengano eseguite di default sull’unione dei grafi?
   2. QLever non supporta le query di UPDATE, mentre GraphDB Free è limitato a due query in parallelo, quindi sono entrambi inutilizzabili per la cache, che effettua query di UPDATE in parallelo. Cosa ne pensi?

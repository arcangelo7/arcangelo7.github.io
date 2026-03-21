---
title: 2022-03-16 Opinionated Meta model
editUrl: false
---

## Cosa ho fatto

1. Ho integrato **time-agnostic-library** in Meta:
   * Se un MetaId non è presente sul triplestore, ora viene cercato anche nella **provenance**. In particolare, il nuovo metodo [retrieve\_metaid\_from\_merged\_entity](https://github.com/opencitations/meta/blob/714b4079862f6bcf4a6c72c4a4f6c443d48117e0/lib/finder.py#L146) controlla se l’entità corrispondente sia stata **cancellata** a seguito di una **fusione**. Se sì, il MetaId dell’entità risultante dalla fusione viene sostituito al MetaId dell’entità in input cancellata a seguito della fusione. Come?
     1. Viene ricostruita la storia dell’entità in input.
     2. Vengono cercati tutti gli snapshot derivanti dal **penultimo** snapshot della storia ricostruita.
     3. Se c’è uno snapshot relativo a un MetaId diverso da quello in input, quello snapshot è una specializzazione dell’entità risultante dalla fusione.

   * Il metodo [retrieve\_metaid\_from\_merged\_entity](https://github.com/opencitations/meta/blob/714b4079862f6bcf4a6c72c4a4f6c443d48117e0/lib/finder.py#L146) è stato testato e documentato.

   * Un MetaID coinvolto in un merge viene trovato indipendentemente dal campo in cui compare il MetaID (’id’, ‘author’, ‘editor’, ‘venue’, ‘volume’, ‘issue’, ‘publisher’).

   * Nuovi parametri di configurazione:

     ```yaml
     # Specify a list of triplestore URLs containing provenance metadata
     provenance_endpoints: []
     # Specify a list of directories containing provenance metadata
     provenance_dirs: []
     # True if Blazegraph was used as a triplestore, and a textual index was built to speed up queries. For more information, see https://github.com/blazegraph/database/wiki/Rebuild_Text_Index_Procedure
     blazegraph_full_text_search: False
     # Specifies the triplestore URL to use as a cache to make queries on provenance faster
     cache_triplestore_url: ''
     ```

   * Nuovo metodo di supporto in time-agnostic-library, [generate\_config\_file](https://github.com/opencitations/time-agnostic-library/blob/46ecb0381de7fc8b4e9a6dab3fe9e95c09a4aa14/src/time_agnostic_library/support.py#L52), che dati i parametri di configurazione genera un file aderente alla sintassi dei file di configurazione di time-agnostic-library.
     * Questo metodo è utile per avere tutti i parametri di configurazione in un unico file, quello di Meta, e per generare al volo automaticamente quello di time-agnostic-library nella stessa directory di quello di Meta.
     * Se il file di configurazione di time-agnostic-library è già presente, non viene rigenerato.
2. Ho riflettuto su quali campi del CSV in input di Meta rendere obbligatori in assenza di id. Ecco le mie proposte:

   * Sono obbligatori i campi “title” e “author” (o “editor”) per le risorse di tipo book, dataset, dissertation, edited book, journal article, monograph, other, peer review, posted content, proceedings article, report, reference book. Anche pub\_date
     * ~~Il campo “author” è obbligatorio perché senza autori non ci sono citazioni.~~
   * Sono obbligatori i campi “title” e “venue” per le risorse di tipo book chapter, book part, book section, book track, reference entry.
   * Per quanto riguarda le risorse che possono contenerne altre e che **non** possono essere contenute a loro volta è obbligatorio solo il campo “title”.
     * book series, book set, journal, proceedings series, report series, standard series.
     * Eccezioni che seguono la stessa regola: component, proceedings e standard.
       * Forzare venue per component.
   * Per le risorse di tipo journal volume sono obbligatori i campi “venue” e “volume” o “venue” e “title”, per quelle di tipo journal issue sono obbligatori i campi “venue” e “issue” o “venue” e “title”.

   | id | type                            | title | author | pub\_date | venue | volume | issue | page | publisher | editor |
   | -- | ------------------------------- | ----- | ------ | --------- | ----- | ------ | ----- | ---- | --------- | ------ |
   |    | book                            | M     | O      | M         |       |        |       |      |           | O      |
   |    | dataset (or data file)          | M     | O      | M         |       |        |       |      |           | O      |
   |    | dissertation                    | M     | O      | M         |       |        |       |      |           | O      |
   |    | edited book                     | M     | O      | M         |       |        |       |      |           | O      |
   |    | journal article                 | M     | O      | M         |       |        |       |      |           | O      |
   |    | monograph                       | M     | O      | M         |       |        |       |      |           | O      |
   |    | other                           | M     | O      | M         |       |        |       |      |           | O      |
   |    | peer review                     | M     | O      | M         |       |        |       |      |           | O      |
   |    | posted content (or web content) | M     | O      | M         |       |        |       |      |           | O      |
   |    | proceedings article             | M     | O      | M         |       |        |       |      |           | O      |
   |    | report                          | M     | O      | M         |       |        |       |      |           | O      |
   |    | reference book                  | M     | O      | M         |       |        |       |      |           | O      |
   |    | book chapter                    | M     |        |           | M     |        |       |      |           |        |
   |    | book part                       | M     |        |           | M     |        |       |      |           |        |
   |    | book section                    | M     |        |           | M     |        |       |      |           |        |
   |    | book track                      | M     |        |           | M     |        |       |      |           |        |
   |    | component                       | M     |        |           | M     |        |       |      |           |        |
   |    | reference entry                 | M     |        |           | M     |        |       |      |           |        |
   |    | book series                     | M     |        |           |       |        |       |      |           |        |
   |    | book set                        | M     |        |           |       |        |       |      |           |        |
   |    | journal                         | M     |        |           |       |        |       |      |           |        |
   |    | proceedings                     | M     |        |           |       |        |       |      |           |        |
   |    | proceedings series              | M     |        |           |       |        |       |      |           |        |
   |    | report series                   | M     |        |           |       |        |       |      |           |        |
   |    | standard                        | M     |        |           |       |        |       |      |           |        |
   |    | standard series                 | M     |        |           |       |        |       |      |           |        |
   |    | journal issue                   | O     |        |           | M     |        | O     |      |           |        |
   |    | journal volume                  | O     |        |           | M     | O      |       |      |           |        |

   * Ho implementato queste regole nel metodo [is\_a\_valid\_row](https://github.com/opencitations/meta/blob/8e50632d2dac72a4b39df18a39809873f035fa9a/scripts/curator.py#L1076). Se una riga risulta invalida viene scartata a monte dal Curator. Vengono eliminate anche le **righe vuote**.
     * [is\_a\_valid\_row](https://github.com/opencitations/meta/blob/8e50632d2dac72a4b39df18a39809873f035fa9a/scripts/curator.py#L1076) è stato testato e documentato.
3. Su suggerimento di Ivan, il tipo della venue viene validato sulla base dello schema dell’identificativo.
   * Questo comportamento ha rotto un gran numero di test preesistenti. Correggerli è equivalso a testare il nuovo sistema di validazione.
4. Il file di **cache** viene ora **cancellato** al termine del processo, per tre motivi:
   1. Se non eliminato, i successivi processi di Meta lanciati con lo stesso file di configurazione ignorano erroneamente i nuovi file con nome identico a file registrati in cache.
   2. Eliminare la cache permette di capire rapidamente se il processo è giusto a termine, nel caso il sistema crashi dopo la fine del processo.
   3. Terminato il processo, il file di cache non ha alcuna utilità.
5. Novità relativa a CrossrefProcessing: se la risorsa è di tipo report-series ed è presente un ISSN, se il container-title è vuoto l’ISSN si riferisce alla risorsa stessa, altrimenti si riferisce alla venue.
   1. Questo comportamento è stato testato.
6. Novità relative all’articolo sulle time-traversal queries:
   * Ho modificato il codice dei benchmark perché tenga in considerazione le 20 entità precedentemente individuate.
   * Dato che ogni benchmark su ognuna delle 20 entità viene ripetuto 10 volte, vengono effettuate 200 iterazioni per ogni tipologia di query con soggetto noto.
   * Ho lanciato i benchmark usando Blazegraph come triplestore.
   * La nuova batteria di benchmark su time-agnostic-library ha due differenze con la prima:

     1. La macchina su cui vengono eseguiti è notevolmente più potente (i5 8500 → i9 12900k).
     2. Il numero di snapshot delle entità prese in considerazione e di quelle collegate è notevolmente incrementato (max 2 → max 35).

     Pertanto, le query con soggetti noti durano di più e quelle con soggetti ignoti durano di meno.

     Riporto i risultati parziali finora ottenuti dei nuovi benchmark (v2) e i risultati dei precedenti benchmark (v1).

     * Benchmark v1

       [attachments/c3d3c994ff2546ccac1ed7500b9b4b5c.json](/notes/attachments/c3d3c994ff2546ccac1ed7500b9b4b5c)

     * Benchmark v2

       [attachments/93f662a36c0c4b7a8798641f7b2518cb.json](/notes/attachments/93f662a36c0c4b7a8798641f7b2518cb)

## Domande

1. Quali campi di un CSV per Meta dovrebbero essere obbligatori in assenza di id e di tipo?
   1. Titolo, autore o editor, e data.
2. Alla luce del modello di provenance di OpenCitations, è possibile che uno snapshot sia derivato (prov:wasDerivedFrom) da più di due snapshot?
3. Se un MetaId non è nel triplestore perché l’entità corrispondente è stata fusa a un’altra, penso che il MetaId da considerare sia quello dell’entità sopravvissuta al merge e che **non** si debba resuscitare l’entità cancellata. Cosa ne pensate?
4. Poniamo di volere scoprire se l’entità con MetaID ‘meta:ra/4321’ sia stata cancellata in seguito a una fusione. La query per scoprirlo è la seguente.

```python
{% raw %}
    query = f'''
    		PREFIX prov: <http://www.w3.org/ns/prov#>
    		SELECT DISTINCT ?se
    		WHERE {{
    				?se prov:wasDerivedFrom <https://w3id.org/oc/meta/ra/4321/prov/se/2>.
    		}}'''
{% endraw %}
```

Se c’è uno snapshot relativo a un MetaId diverso da meta:ra/4321, quello snapshot è una specializzazione dell’entità risultante dalla fusione.

Se la provenance è su file non ho modo di trovare il file o i file su cui eseguire questa query, perché il soggetto è ignoto. Infatti, l’informazione sul merge è presente solo nello snapshot dell’entità risultante dal merge e non nello snapshot dell’entità cancellata. Mi sfugge qualcosa?

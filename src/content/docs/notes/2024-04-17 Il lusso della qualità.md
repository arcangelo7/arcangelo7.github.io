---
title: 2024-04-17 Il lusso della qualità
editUrl: false
---

## La Novitade

**Meta**

* Ho indagato perché il numero di triple nell’RDF derivante dal triplestore continuasse a essere sbagliato.
  * Problema di concorrenza? Yess, risolto
* Ho migliorato il plugin per caricare su IA, rendendolo lanciabile da linea di comando passando il percorso a un file di configurazione YAML

  ```yaml
  identifier: meta-triplestore-2024-04-06
  file_paths:
    - /vltd/triplestore/meta/openalex_out/blazegraph.zip
  metadata:
    identifier: meta-triplestore-2024-04-06
    mediatype: data
    collection:
      - ia_biblio_metadata
      - theinternetarchive
    creator: Arcangelo Massari
    date: '2024-04-06'
    description: The OpenCitations Meta database stores and delivers bibliographic metadata for all publications involved in the OpenCitations Index.
    language: eng
    licenseurl: http://creativecommons.org/publicdomain/zero/1.0/
    subject:
      - open citations
      - OpenCitations
      - OpenCitations Meta
      - RDF
      - triplestore
      - open data
      - CC0
    title: Meta triplestore data, archived on 2024-04-06
    website: https://opencitations.net/meta
    year: 2024
  access_key: ACCESS_KEY
  secret_key: SECRET_KEY
  ```

  * Ho scritto a Internet Archive per risolvere il problema di permessi che mi impedisce di caricare il triplestore
* Mi sono accorto che alla fine non avevo più aggiunto le fonti primarie alla provenance.
  * Le ho ricavate dai dump di provenance passati anziché dalle sorgenti, per semplicità, sebbene consapevole che il risultato non potesse essere completo
  * Con l’occasione, ho corretto l’errore della provenance di Crossref salvata come [https://api.crossref.org/](https://api.crossref.org/), inserendo il riferimento alla versione corretta (ad esempio, [https://api.crossref.org/snapshots/monthly/2022/12/all.json.tar.gz](https://api.crossref.org/snapshots/monthly/2022/12/all.json.tar.gz))
    * [https://api.datacite.org/ →](https://api.datacite.org/) [https://archive.org/details/datacite\_dump\_20211022](https://archive.org/details/datacite_dump_20211022)
    * [https://nih.figshare.com/collections/iCite\_Database\_Snapshots\_NIH\_Open\_Citation\_Collection\_/4586573/42](https://nih.figshare.com/collections/iCite_Database_Snapshots_NIH_Open_Citation_Collection_/4586573/42) → [https://nih.figshare.com/collections/iCite\_Database\_Snapshots\_NIH\_Open\_Citation\_Collection\_/4586573/36](https://nih.figshare.com/collections/iCite_Database_Snapshots_NIH_Open_Citation_Collection_/4586573/36)
  * Così facendo, sono avanzate n entità di provenance senza fonte primaria
* Script che trova tutti gli orfani. Cerca tutti i soggetti, tutti gli oggetti URI. Poi fa soggetti - oggetti - soggetti con oggetto URI e salva. Non cancella, trova e basta.
* Script che trova tutte le br con più embodiment e li salva. Qui sono andato di query sparql (100G di RAM e passa la paura)

  ```sparql
  PREFIX frbr: <http://purl.org/vocab/frbr/core#>
  SELECT ?br (COUNT(?embodiment) as ?countOfEmbodiment)
  WHERE {
      ?br frbr:embodiment ?embodiment .
  }
  GROUP BY ?br
  HAVING (COUNT(?embodiment) > 1)
  ```

**AIUCD**

* Integrato nell’abstract la risposta alle revisioni
  * Rapporto con  Cultural Heritage Data Space e European Collaborative Cloud for Cultural Heritage
  * Criteri di valutazione
  * Immagini

**oc\_ocdm**

* Guardando meglio oc\_ocdm, in realtà il merge gestisce l’aderenza al data model. La presenza di pagine di pubblicazione multiple dopo il merge si spiega perché FRBR.embodiment non è considerata una functional property:

  [oc\_ocdm/oc\_ocdm/graph/entities/bibliographic/bibliographic\_resource.py at 94583c892390eb47523bf0b57624e3fb5f293d3a · opencitations/oc\_ocdm](https://github.com/opencitations/oc_ocdm/blob/94583c892390eb47523bf0b57624e3fb5f293d3a/oc_ocdm/graph/entities/bibliographic/bibliographic_resource.py#L39)

**Altro**

* Ho imparato a usare Docker e a configurare una serie di servizi

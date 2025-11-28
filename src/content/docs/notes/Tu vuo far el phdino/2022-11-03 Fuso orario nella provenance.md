---
title: 2022-11-03 Fuso orario nella provenance
editUrl: false
---

## Novità

* Ora il software per aggiornare la provenance di COCI converte sempre le stringhe di tempo “**naive**” in **UTC** dato un **fuso orario**, che nel nostro caso è “Europe/Rome”.
  * La conversione tiene conto dell’**ora solare**. Ad esempio, se il fuso orario è “Europe/Rome”, dopo il 27 marzo 2022 e prima del **30 ottobre** **2022** vengono tolte due ore, dopo il 30 ottobre 2022 viene tolta un’ora. Questo avviene grazie alla libreria **pytz**, che ha un registro con tali informazioni.
* **oc\_ocdm** **7.1.3** genera provenance consapevole del **fuso orario**, localizzando l’ora locale in **UTC**. Ad esempio, in Italia:
  * 2022-10-25T20:13:00 → 2022-10-25T**18**:13:00+00:00
  * 2022-11-01T20:13:00 → 2022-11-01T**19**:13:00+00:00
* Ho scritto del software per **convertire** la **provenance** da **CSV** a **nquads** e ho recuperato l’archivio in nquads mancante.
  * Un file di 2,3 GB di provenance in CSV convertito in nquads pesa 21,4 GB. Ho quindi scritto un software per **dividere** un file nquads su più file dato un **numero massimo di righe**. Se, com’è ora, le **entità** sono **ragguppate**, i grafi di ciascuna entità vengono salvati nello stesso file indipendentemente dal numero massimo di righe.
* Ho lanciato OC Meta sul server di test.
* Sto scrivendo del software per:
  * Individuare le citazioni a DOI non presenti in Crossref.
* Ho fatto esperimenti con un nuovo algoritmo di compressione: **Long Range ZIP** (Lzma RZIP)
  * Ha compresso 682 GB in **85,5 GB**. Compression Ratio: 7.978. Average Compression Speed: 19.987MB/s. Total time: 09:02:30.65
  * Per fare un confronto, usando il metodo **DEFLATE** di zip ho ottenuto **151,3 GB** in circa la metà del tempo.
* Ho scritto del codice per individuare quali DOI nelle citazioni del dump di Crossref non sono in Crossref:
  * Nel dump di ottobre sono 2,124,576
  * Se si considerano solo quelli presenti in COCI agosto diventano 634,720
* Sto scrivendo il **capitolo** sulla **metodologia** dell’articolo su OC Meta.
* L’HDD rallenta di circa 30 volte la velocità delle risposte alle API per quanto riguarda le query testuali. Provare per credere:
  * [https://oc-meta.arcangelomassari.it/api/v1/search/author=Peroni,Silvio](https://oc-meta.arcangelomassari.it/api/v1/search/author=Peroni,Silvio)
  * [https://test.opencitations.net/meta/api/v1/search/author=Peroni,Silvio](https://test.opencitations.net/meta/api/v1/search/author=Peroni,Silvio)

## Domande

* L’OCDM specifica già che il range di prov:generatedAtTime e prov:invalidatedAtTime è di tipo xsd:dateTime. Devo specificare anche che bisogna indicare il fuso orario? Se sì, dove?
* Gli [archivi di provenance](https://figshare.com/articles/dataset/Crossref_Open_Citation_Index_N-Triples_dataset_of_the_provenance_information_of_all_the_citation_data/6741446) usano **nomenclature disomogenee**.

  * %Y-%M-%dT%H\_%m\_%s + /\_\d+-\d+/
  * %Y-%M-%dT%H%m%s + /\_\d+-\d+/
  * %Y-%M-%dT%H%m%s + /*\d+(-\d+)?*\d+-\d+/

  Lo stesso vale anche per i file all’interno.

  * Li lasciamo così o li sistemiamo?
  * Cosa indica il primo intervallo laddove ci sono due intervalli?
* In teoria esiste un’operazione dell’API di DOI per ottenere il nome dell’agenzia che ha registrato il DOI, ma questa operazione ritorna risultati sbagliati.
  * Ad esempio: [https://doi.org/ra/10.2108/zsj.21.69](https://doi.org/ra/10.2108/zsj.21.69) ritorna Crossref, ma il DOI non è su Crossref
* Aggiunge doiprefix su Datacite, OCDM e oc\_ocdm

---
title: 2022-10-25 OpenCitations Meta
editUrl: false
head:
  - tag: link
    attrs:
      rel: stylesheet
      href: https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css
---

## Novità

* **OC Meta** ha processato **67,975** file su 70,785 e impiega 18 ore per processarne 3000. Fate voi i conti.
  * Ci sono stati **0 errori** e **0 entità** conflittuali stando ai log.
  * Allo stato attuale, che ormai approssima quello definitivo, i dati hanno il seguente peso:
    * Totale: 619,5 GB (140 GB compresso)
    * Triplestore: 536,4 GB
    * CSV: 34,6 GB
    * RDF (file individualmente zippati): 27,6 GB. Non ho idea di quanto possano pesare unzippati, ma si parla di TB
    * indici temporanei (si possono eliminare) e file di log: 18,5 GB
    * info dir: 2,3 GB
* Ho aggiunto una **nuova regola** ai **campi minimi** da specificare. Se una risorsa specifica il **volume** o il **numero**, il **tipo** di risorsa deve essere indicato. Ci sono tre possibilità: o è un articolo, o è un volume o è un numero. Se il tipo è ignoto, non è possibile capire a quale risorsa associare l’id, se al contenuto o al contenitore. Questa è la tabella dei campi obbligatori aggiornata:

  [attachments/5b422fbf3748440a8e1dc734c64056cd.csv](/notes/attachments/5b422fbf3748440a8e1dc734c64056cd)

  * Ho aggiornato la **documentazione** dei CSV presente su [opencitations/metadata](https://github.com/opencitations/metadata/blob/master/documentation/csv_documentation.pdf) con la nuova regola
  * Questa regola viene violata **8 volte** nel dump di Crossref. Ho corretto i documenti interessati a mano.
* Ho finalizzato il codice per aggiungere il fuso orario alla provenance di COCI.

    <aside>
    ⚠️

  L’archivio [2021-11-15T031921\_0-4\_1.zip](https://figshare.com/articles/dataset/Crossref_Open_Citation_Index_CSV_dataset_of_the_provenance_information_of_all_the_citation_data/6741431?file=31555370) del dump di provenance in formato csv e l’archivio [2021-11-15T031921\_0-4\_1-10.zip](https://figshare.com/articles/dataset/Crossref_Open_Citation_Index_N-Triples_dataset_of_the_provenance_information_of_all_the_citation_data/6741446?file=31555349) in formato nquads contengono dati e non provenance

    </aside>

    <aside>
    📌 La descrizione presente su Figshare del dump di provenance in formato CSV omette la descrizione di molti campi (snapshot, created, invalidated, description, update) e ne menziona uno inesistente, datatime. Invece, la descrizione del dump di provenance in formato nquads omette i campi “prov:invalidatedAtTime” e “oco:hasUpdateQuery”, forse perché non sono mai stati usati

    </aside>

  * Ho aggiunto dei **test**
  * Il codice si lancia da **linea di comando**
  * È sul mio repo personale di **Github**
  * Mi sono permesso di modificare la **convenzione dei nomi** dei file di provenance. Includevano i **due punti**, ad esempio “2019-10-21T22:41:20\_1.csv”. Tuttavia, i due punti sono un **carattere riservato** su filesystem **NTFS** (non su **ext**).
    * Ho applicato ai nomi dei file la stessa convenzione già usata per i nomi degli archivi, sostituendo i due punti con trattino basso e usando come separatore del numero sequenziale il trattino, ad esempio “2019-10-21T22\_41\_20-1.csv”
  * I nuovi dati di provenance si trovano su oc-ficlit nelle directory `/srv/meta/coci_prov_csv_tz` e `/srv/meta/coci_prov_nquads`
* Ho aggiornato i materiali della **seconda lezione** di **laboratorio**
  * Invece di usare a e b come variabili, ho introdotto una **narrativa** basata sui **pianeti** per spiegare i vari concetti
  * Ho aggiunto alcune **immagini eplicative** per il tasto **tab** e le **convenzioni** sui **nomi**
  * Ho aggiunto un riferimento a PEP 8 per quanto riguarda le convenzioni sui nomi
* Ho completato il capitolo sullo **stato dell’arte** dell’articolo su OC **Meta**. Credo di avere un feticismo per le tabelle

  [attachments/d547ef65ddee4e10bdf9c93af3aa328c.csv](/notes/attachments/d547ef65ddee4e10bdf9c93af3aa328c)

## Domande

* Devo aggiungere il fuso orario anche alla provenance di CCC e OCC?
* Aggiungere il fuso orario all’ultimo dump di COCI significa aggiungerlo a tutti i dump, perché, l’ultimo dump li comprende tutti. Ora bisogna modificare tutti gli upload aggiungendo, per ciascuna versione, solo gli archivi pertinenti. È un’operazione tediosa, se volete la faccio io.
* Bisogna modificare il codice che genera i nuovi dump perché aggiunga il fuso orario. Basta modificare oc\_ocdm o c’è da toccare altro?
* Che differenza c’è tra NIH e PMC-OA?

## Rubrica cose da pazzi

* [https://doi.org/10.20546/ijcmas.2016.501.002](https://doi.org/10.20546/ijcmas.2016.501.002)
  * A parte i marquee, il link all’issue è javascript:history.go(-1)
  * Rivista indiana, la review viene fatta solo dal board editoriale entro 2 settimane
  * APC di 4000 Rupie (50$), ma se sei straniero paghi 100$
* [10.18782/2320-7051.2109](http://doi.org/10.18782/2320-7051.2109) si commenta da solo
  * Sempre indiano

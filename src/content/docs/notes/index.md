---
title: index
editUrl: false
---

## La Novitade

### Meta

Ho scritto un programma che usa la provenance per trovare i BR a cui le prime fusioni hanno raddoppiato i ruoli, cioè gli autori del BR fuso finiti in coda a quelli del BR rimasto. Per quei BR cancella tutti i ruoli del tipo raddoppiato e prepara i CSV per reingerirli da Crossref/DataCite partendo dal DOI originale.

Questa logica va a triggerare una reingestione anche nei casi in cui persone nuove sono state aggiunte prima che Meta utilizzasse il silenziatore. Questo comportamento è voluto perché mi sono accorto che in molti casi le persone aggiunte sono persone che erano già presenti nella catena semplicemente scritte in un modo leggermente diverso.

Qualche numero:

* 26.848 eventi di raddoppio
  * 17.176 eventi sono snapshot di fusione
  * 9.672 eventi sono semplici modifiche.
    * Di questi, 9.342 sono di gennaio 2024
    * Ne ho sfogliati 200 a caso e solo in 2 casi erano persone nuove.

***

Ho messo su il db di provenance.

***

Ho lanciato la fusione dei responsible agents.

### HERITRACE

Assistito da Opus 5.5 medium, ho rifatto tutto il frontend in Flutter, usando però come pacchetto di widget non Material ma Cupertino, ovvero le forme di iOS.

Sulla scorta della migrazione al design di iOS ho anche ripensato alcuni dettagli dell'interazione. In particolare, su iOS ogni riga che possa avere un'interazione ha una sola interazione principale, che solitamente è lo chevron right, che poi ti porta alla sezione. Eventuali azioni secondarie si raggiungono strisciando la riga, cosa che ovviamente su web non si può fare. In ogni caso ho pensato di sostituire tutti i visit con uno chevron right. Il visit non compare quando si entra in modalità di modifica, compare soltanto il cestino al suo posto.

Aggiunto il tasto back

Modalità scura

Multilinguismo solo per i testi fissi

### Nanodash

[Nanopublication Template Ontology](https://peta-pico.github.io/npo/ntemplate/index-en.html) di Mr. Kuhn.

**La tripla da produrre**

sub:st01 rdf:subject sub:work ; rdf:predicate dct:title ; rdf:object sub:title .

**sub:work è un nt:UriPlaceholder + nt:LocalResource, cioè un buco da riempire con un nome breve (per esempio "br"), che diventa un IRI dentro la nanopubblicazione**

sub:work a nt:LocalResource, nt:UriPlaceholder .

**sub:title è un nt:LiteralPlaceholder, cioè un buco da riempire con un testo**

sub:title a nt:LiteralPlaceholder ; rdfs:label "title" .

Ho pubblicato un template per pubblicare e modificare risorse bibliografiche usando l'OCDM: [https://nanodash.knowledgepixels.com/explore?2\&id=https://w3id.org/np/RAL07AhiliV7p9d-766rTjSv5-3gW7eTcLftiYdzscel4](https://nanodash.knowledgepixels.com/explore?2\&id=https://w3id.org/np/RAL07AhiliV7p9d-766rTjSv5-3gW7eTcLftiYdzscel4)

E ho pubblicato tutta la mia libreria Zotero su Nanodash usando quel template, ad esempio:

[https://nanodash.knowledgepixels.com/explore?id=https://w3id.org/np/RA-HZtJE-AXMhlx9ETHKrKKPFW0t65cpKOlP8W52GHLsc](https://nanodash.knowledgepixels.com/explore?id=https://w3id.org/np/RA-HZtJE-AXMhlx9ETHKrKKPFW0t65cpKOlP8W52GHLsc)

## Domande

### Idee a cui Silvio mi dirà di no

```
snapshot oco:added <<( s p o )>>
oco:removed <<( s p o )>>

oppure

<.../prov/se/3/added> e <.../prov/se/3/removed>

GRAPH <https://w3id.org/oc/meta/br/06120/prov/> {
    oco:hasAddedGraph <.../br/06120/prov/se/3/added> ;
    oco:hasRemovedGraph <.../br/06120/prov/se/3/removed> .
}

GRAPH <.../br/06120/prov/se/3/added> {
  <.../br/06120> dcterms:title "Nuovo titolo" .
}
```

### Lab

Guardando il calendario nel readme di CompData mi sono accorto che c'è già uno scollamento sulla programmazione. Nel senso che durante la scorsa lezione io ho completato tutto il secondo capitolo di laboratorio, compresa la parte 4 con la manipolazione di stringhe e l'esercizio sul paradosso di Zenone. Secondo la programmazione, quella parte avrei dovuto farla il 9, mentre dovrei fare soltanto le liste il 13. Che si fa? Potrei anche rallentare e far fare esercizi.

Ho aggiunto degli esercizi sulle liste, però a questo punto, secondo me, conviene, se non quest'anno, l'anno prossimo, far sì che ogni lezione di laboratorio sia un documento a sé. Non si capisce perché avere un unico documento diviso in 10.000 parti che copre argomenti completamente diversi, come liste, loop condizionali e funzioni. Quindi, se decidiamo di andare più lentamente, gonfiamo, utilizzando esercizi, i singoli argomenti, secondo me.

## Memo

GRAPHIA

* Bisogna aggiungere un convenience filter per i prodotto per venue. L'input è l'id, che sia local.

META

* Disambiguare gli editori. Inserirla nel processo di patch. Completare il merge.
* Prossimo dump. Eliminare citazioni duplicate.
* Aggiornare oc\_sparql per la provenance

RAMOSE

* Confronto performance
* Aggiungere connextion
* Chiarire di non usare LIMIT con @@page
* Gestire la memoria a livello di API
* Rimuovere le ridondanze in oc\_api
* Consentire a Ramose di essere controllato tramite variabili d'ambiente

TAL

* Aggiungere skolemizzazione

Vizioso

* [https://en.wikipedia.org/wiki/Compilers:\_Principles,\_Techniques,\_and\_Tools](https://en.wikipedia.org/wiki/Compilers:_Principles,_Techniques,_and_Tools)
* [https://en.wikipedia.org/wiki/GNU\_Bison](https://en.wikipedia.org/wiki/GNU_Bison)
* [https://en.wikipedia.org/wiki/Yacc](https://en.wikipedia.org/wiki/Yacc)

HERITRACE

* anni: essere meno stretto sugli anni. Problema ISO per 999. 0999?
* Timer massimo. Timer configurabile. Messaggio in caso si stia per toccare il timer massimo.
* Riflettere su @lang. SKOS come use case. skos:prefLabel, skos:altLabel
* Possibilità di specificare l’URI a mano in fase di creazione
* description con l'entità e stata modificata. Tipo commit
* display name è References Cited by VA bene
* Avvertire l'utente del disastro imminente nel caso in cui provi a cancellare un volume

Meta

* Usare il triplestore di provenance per fare 303 in caso di entità mergiate o mostrare la provenance in caso di cancellazione e basta.

oc\_ocdm

* Automatizzare mark\_as\_restored di default. è possibile disabilitare e fare a mano mark\_as\_restored.
* [https://opencitations.net/meta/api/v1/metadata/doi:10.1093/acprof:oso/9780199977628.001.0001](https://opencitations.net/meta/api/v1/metadata/doi:10.1093/acprof:oso/9780199977628.001.0001)
* DELETE con variabile
* Modificare Meta sulla base della tabella di Elia
* embodiment multipli devono essere purgati a monte
* Modificare documentazione API aggiungendo omid
* aggiungere Relation sovraclasse di Citazione e Menzione

Crowdsourcing

* Quando dobbiamo ingerire Crossref stoppo manualmente OJS. Si mette una nota nel repository per dire le cose. Ogni mese.
* Aggiornamenti al dump incrementali. Si usa un nuovo prefisso e si aggiungono dati solo a quel CSV.
* Bisogna usare il DOI di Zenodo come primary source. Un unico DOI per batch process.
* Bisogna fare l’aggiornamento sulla copia e poi bisogna automatizzare lo switch

Citazioni

* Fare diff DataCite per togliere le citazioni che non sono più citazioni. è da fare in post. Snapshot 2 di provenance. Fare lo snapshot 3 con la creazione con il derived from al nuovo dump. La lineage viene data dallo specialization of. Colleghi sia al 2 che al dump.
* Repo cerotti. meta/index/sorgenti

OC di converter

* Riguardare perché viene fuori una seconda tabella object per DataCite.

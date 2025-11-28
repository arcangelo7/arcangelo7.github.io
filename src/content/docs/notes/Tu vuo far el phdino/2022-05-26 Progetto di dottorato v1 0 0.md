---
title: 2022-05-26 Progetto di dottorato v1 0 0
editUrl: false
---

## Cosa ho fatto

* Ho scritto la prima versione del progetto di dottorato.
* Ho contribuito all’articolo per TPDL.
* Ho trovato un conflitto nell’output di oc\_meta. Ecco come si è verificato.
  1. Una br con editor senza ORCID viene caricata sul triplestore.
  2. Quell’agente responsabile era già presente nel triplestore con ORCID.
  3. Quindi, ci sono due agenti responsabili con due MetaID diversi, uno senza ORCID e l’altro con ORCID, che sono la stessa persona.
  4. La stessa br viene trovata in un altro file, ma questa volta l’editor ha un ORCID. Si genera un conflitto, perché sul triplestore due persone che si credevano essere diverse si scoprono ora la stessa persona.
  * Ho risolto questo problema pre-processando le br che compaiono in più file con il maggior numero di informazioni possibili.
    * Inoltre, tali risorse bibliografiche devono essere processate in single-process, perché la loro suddivisione su più file potrebbe causare race conditions.

## Domande

* Sto continuando a stoppare e riavviare oc\_meta ogni volta che trovo entità conflittuali dovute al mio codice. Le entità conflittuali non sono errori irrisolvibili, si possono fondere a posteriori. Ritenete che io debba risolverle a posteriori o siete d’accordo sul riavviare oc\_meta ogni volta? Anche in vista della rilascio annunciato nel Q3 2022.
* Ci sono entità bibliografiche che hanno un identificatore in comune e che oc\_meta considera come la stessa entità, ma che in realtà appartengono a venue e case editrici differenti.
  * Di conseguenza, informazioni rilevanti solo per una delle due edizioni vengono associate all’altra, come la venue o la data.
  * Per esempio, *Video Theory* di Andreas Treske è stato pubblicato sia da de Gruyter che da Transcript Verlag, con due DOI diversi, ma con un ISBN in comune.
    * Le venue e le date sono diverse, ma su OCMeta risulterà solo la prima informazione trovata nei CSV e la seconda verrà scartata.
    * [https://www.transcript-verlag.de/978-3-8376-3058-9/video-theory/](https://www.transcript-verlag.de/978-3-8376-3058-9/video-theory/)
    * [https://www.degruyter.com/document/doi/10.1515/9783839430583/html](https://www.degruyter.com/document/doi/10.1515/9783839430583/html)
* Nell’[articolo che descrive Gaffe](http://speroni.web.cs.unibo.it/publications/bolognini-2009-exploiting-ontologies-deploy.pdf) vengono annunciati sue lavori futuri: *Gaffe Certified*, per l’aggiunta di provenance ai metadati, e *Metagaffe*, per creare ontologie tramite form. Questi due progetti esistono?
* ~~Dov’è il codice sorgente di Gaffe? E quello di OWiki?~~
  * ~~Soppiantato da Semantic Wiki, il cui autore, David, ha poi ha fatto Wikidata.~~
  * ~~Per Gaffe è sul computer di Silvio.~~
  * ~~Bisogna un file di configurazione per fare la connessione tra l’ontologia e i form, ma non tramite RDF, tramite file di configurazione. Proxy tra data model e ontologia. Per andare a leggere o scrivere su database relazionale~~
  * Paolo forse vuole Metaverse, ma problema di formazione per i tirocinanti.
  * ~~Problema autenticazione. Letteratura AAI, OpenAIRE AAI. Nella testa di Silvio, usiamo ORCID~~
    * ~~Ci vorrà n plugin specifico per interagire con i vari servizi. Io devo vestire solo l'autenticazione tra il mio client e il mio server.~~
    * ~~OpenCitations usa Blazegraph, bisogna fare un proxy, perché non saranno sulla stessa macchina~~
    * ~~Transizione da OmekS a qualcos'altro.~~
    * Federazione. È un rapporto uno a molti.
    * ~~Controllare eliminazione di ORCID, c'è da rigenerare tutto il dataset, perché potrebbero esserci più informazioni in Crossref rispetto a ORCID.~~
    * Meta gestisce Wikidata e VIAF?

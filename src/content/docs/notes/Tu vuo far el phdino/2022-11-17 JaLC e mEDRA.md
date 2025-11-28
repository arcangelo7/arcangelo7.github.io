---
title: 2022-11-17 JaLC e mEDRA
editUrl: false
---

## Novità

### Novità relative a mEDRA

* mEDRA prevede 5 tipi di risorse bibliografiche:
  * monografie:
    * [monographic product](https://www.medra.org/stdoc/en/041110_monographic_doi_metadata_p.pdf) → book a livello Expression
    * monographic work → book a livello Work
  * [monograhic chapter work](https://www.medra.org/stdoc/en/041110_monograph_chapter_doi_metadata.pdf) → book chapter
  * [serial article work](https://www.medra.org/stdoc/en/041110_serial_article_doi_metadata.pdf) → journal article
  * [serial article version](https://www.medra.org/stdoc/en/mEDRA_ONIXSerialArticleVersion_2.0_CR_AP_EN_v1.5.pdf) → journal article (e.g., [10.14597/infraeco.2017.4.3.133](https://api.medra.org/metadata/10.14597/infraeco.2017.4.3.133))
    * Questo schema è un sottoinsieme di serial article work ed è stato aggiunto per rispettare dei requisiti imposti da Crossref
  * [serial issue work](https://www.medra.org/stdoc/en/041110_serial_issue_doi_metadata.pdf) → journal issue
* Ecco una bella idea di mEDRA: i tipi di contributor sono dei codici definiti in un PDF esterno ai dati. Ad esempio, A01 è un autore, B01 è un editor. Lo stesso vale per molti altri tipi di entità, che fortunatamente sono o irrilevanti per i nostri scopi o ricavabili dal contesto.
* Ho arricchito la terza lezione di laboratorio con esempi più concreti e descrizione del metodo `range`.
* Ora è possibile estrarre metadati da DOI relativi a libri e articoli di rivista. Non ho gestito gli altri tipi perché non li ho mai incontrati e la documentazione di mEDRA fornisce solo esempi astratti. Li gestirò quando li incontrerò.

### Novità relative a JaLC

* È ora possibile estrarre metadati da DOI registrati da JaLC.
* Per quanto riguarda la lingua, ho privilegiato il giapponese, se presente, altrimenti l’inglese. Si incontrano tutte e tre le combinazioni possibili: giapponese e inglese, solo giapponese e solo inglese.

### Articolo su OC Meta

* Ho finito il capitolo sulla metodologia e quasi finito quelli Dati e servizi e Discussion

## Domande

* Tra le agenzie di registrazione dei DOI, mi risulta che [CNKI](http://eng.oversea.cnki.net/), [ISTIC](http://www.chinadoi.cn/), [KISTI](http://www.kisti.re.kr/eng/), [OP](https://op.europa.eu/en/home) e [Airiti](http://doi.airiti.com/) non abbiano una REST API. Vi risulta?
  * Airiti ha un’[interfaccia Web](http://doi.airiti.com/DOIService/DOIObject) e un utilissimo (?) strumento di conversione del DOI in un [QR code](http://doi.airiti.com/DOIService/DOIQRCode)

  * Discussione del 2020 sull’API di CNKI:

    [Possibility of getting metadata from journals published in China with DOIs](https://forums.zotero.org/discussion/83483/possibility-of-getting-metadata-from-journals-published-in-china-with-dois)

  * Esiste un [web scraper](https://github.com/1049451037/MagicCNKI) che si installa con pip, con un’installazione legacy non più funzionante e aggiornato l’ultima volta 4 anni fa.

  * OP ha uno [SPARQL endpoint](https://op.europa.eu/en/web/webtools/linked-data-and-sparql)
* Il DTD Onix usato da mEDRA prevede che le riviste abbiano uno di questi identificatori: proprietario (01), DOI (06) o ISSN (07). Cosa faccio con l’id proprietario (e.g., [10.22059/ijer.2012.513](https://api.medra.org/metadata/10.22059/ijer.2012.513))?
* Se un numero di pagina contiene il trattino, il numero viene racchiuso tra virgolette. Siete d’accordo?
* mEDRA utilizza un gran numero di [codici](https://www.medra.org/stdoc/onix-codelist-17.htm) per riferirsi ai ruoli dei contributori. Ho considerato la serie A come autori e la serie B come editor. Siete d’accordo?
  * Ci sono errori. A volte codici diversi vengono usati per riferirsi all’ordine degli autori e non ai diversi ruoli (e.g., [10.12860/jnp.2013.27](https://api.medra.org/metadata/10.12860/jnp.2013.27))
* Oltre al conteggio dei vari tipi di entità, vi vengono in mente altre statistiche che sarebbe interessante riportare nell’articolo su Meta?
  * Top 10 case editrici per numero di risorse bibliografiche / venue
  * Top 10 venue per numero di risorse bibliografiche
  * Numero di pubblicazioni per anno
  * Numero di risorse per tipo

**JALC**

* L’API i JALC ritorna un campo chiamato ‘journal\_id\_list’, ma all’interno ci sono ID interni (e.g., [10.11514%252Finfopro.2008.0.138.0](https://api.japanlinkcenter.org/dois/10.11514%252Finfopro.2008.0.138.0)). Che ne faccio?

* JALC ha 5 tipi:

  * JA: articolo di giornale → journal article
  * BK: libro → book
  * RD: dati di ricerca → dataset
  * EL: e-learning → other
  * GD: dati generali → other

  Va bene questa mappatura?

* Lo schema non prevede nessun campo per gli editor: [https://api.japanlinkcenter.org/api-docs/index.html](https://api.japanlinkcenter.org/api-docs/index.html). È possibile?

**OC Meta**

* Lanciare un COUNT tramite endpoint fa crashare il triplestore se contemporanemente si lancia una query testuale.
* Mi sono accorto che, se voglio parlare di OpenAlex, devo parlare anche di [Semantic Scholar](https://www.semanticscholar.org/), [AMiner](https://www.aminer.org/), [PID Graph](https://www.project-freya.eu/en/pid-graph/the-pid-graph) e [Open Research Knowledge Graph](https://orkg.org/). Allargo il capitolo sulla letteratura anche a questi servizi o li menziono solo nelle discussioni?

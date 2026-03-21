---
title: 2025-09-23 Living citations
editUrl: false
---

# La Novitade

## OC Meta

* Per velocizzare la generazione della struttura di cartelle e sottocartelle con l'RDF di Meta, ho elaborato un sistema che permette di utilizzare il parallelismo, ovvero ogni file viene generato con un identificatore univoco nel nome, dopodiché c'è una fase a valle di fusione di tutti i file con lo stesso prefisso nella stessa sottodirectory.
  * Ho finito gli inode! Introdotti batch e fusioni intermedie
    \- Truccaccio: `rsync -a --delete /tmp/empty_dir/ /mnt/arcangelo/repositories/oc_meta/virtuoso_dumps/rdf/` piu veloce di `rm -rf /mnt/arcangelo/repositories/oc_meta/virtuoso_dumps/rdf/`

```
	  rm -rf (lento):

	  1. Attraversa ricorsivamente ogni directory
	  2. Controlla i permessi di ogni file
	  3. Elimina un file alla volta chiamando unlink() per ognuno
	  4. Aggiorna i metadati della directory dopo ogni eliminazione
	
	  rsync --delete (veloce):
	
	  5. Scansiona entrambe le directory in parallelo
	  6. Identifica differenze in batch
	  7. Elimina in blocchi usando operazioni batch del filesystem
	  8. Aggiorna metadati una sola volta alla fine
```

## HERITRACE

```yaml
  - target:
      class: "http://purl.org/spar/fabio/JournalArticle"
    priority: 1
    shouldBeDisplayed: true
    displayName: "Journal Article"
    displayProperties:
	- property: "http://purl.org/dc/terms/title"
	  displayName: "Title"
      shouldBeDisplayed: true
	- displayName: "Citations"
	  isVirtual: true
	  shouldBeDisplayed: true
	  fetchValueFromQuery: *citations_query
	  implementedVia:
	    target:
	      class: "http://purl.org/spar/cito/Citation"
		  shape: "http://schema.org/CitationShape"
	    fieldOverrides:
	      "http://purl.org/spar/cito/hasCitingEntity":
	        shouldBeDisplayed: false
	    	value: "${currentEntity}"
	      "http://purl.org/spar/cito/hasCitedEntity":
		  	 shouldBeDisplayed: true
	         displayName: "Cited Resource"
	
```

![attachments/7d20bf0a439c4ce7b596aea23e568395.png](../../../../assets/notes/attachments/7d20bf0a439c4ce7b596aea23e568395.png)

## dPIDs

* Chi: Elettra Sincrotrone Trieste, DeSci Labs AG e Università Politecnica di Valencia
* problema dei sistemi PID attuali:
  * sistemi attuali come DOI, ORCID e Handle utilizzano architetture centralizzate o federate che presentano punti di fallimento singoli
  * Link rot e content drift: I collegamenti persistenti spesso falliscono nel tempo
  * I sistemi attuali dipendono eccessivamente da istituzioni e accordi sociali piuttosto che da garanzie tecniche
  * Gli identificatori attuali non sono riproducibili lato client
  * Entro il 2030 saranno probabilmente necessari trilioni di PID, rendendo fragili le architetture centralizzate attuali.
* soluzione:
  * Caratteristiche tecniche:
    * Basato su [IPFS](https://ipfs.tech/): Utilizza l'InterPlanetary File System per lo storage decentralizzato
    * Content Identifiers (CID): Impiega identificatori derivati da funzioni hash crittografiche unidirezionali
      * Il CID NON contiene il file, è solo un'etichetta per trovarlo
    * IPLD (InterPlanetary Linked Data): Permette la costruzione di alberi di storage decentralizzati
      * è un modo per collegare i dati tra loro in modo permanente e verificabile, creando una "ragnatela" di informazioni collegate
      * Sistema tradizionale: i link possono rompersi, le pagine possono essere cancellate
      * IPLD: ogni link punta a una versione specifica e immutabile di una pagina
      * Traccia automaticamente tutte le versioni di un documento
      * Mantiene la storia completa delle modifiche
    * Protocollo Sidetree: Fornisce un livello API per generare database di lookup e identità personalizzate
      * Sidetree è come un sistema di rubrica telefonica decentralizzato che permette di creare e gestire identità digitali senza un'autorità centrale
* Vantaggi
  * Proprietà verificabile con identificazione basata su ORCID o identità decentralizzata
  * Partecipazione aperta alla rete attraverso la natura peer-to-peer
  * Conformità ai principi FAIR
  * Eliminazione del "vendor lock-in"
  * Integrità dei dati persistente attraverso DHT (Distributed Hash Tables)
* Implementazione tecnica: dPID Nodes
  * Open source (licenza MIT)
  * TypeScript
  * Utilizza l'API HTTP di IPFS tramite Kubo
  * Gestisce i dati come collezioni versionate di voci IPLD seguendo la specifica [RO-CRATE](https://www.researchobject.org/ro-crate/)
  * Impiega Ceramic per creare database di lookup distribuiti basati su grafi
* E a noi che ce frega?
  * da costoso database centralizzato a rete distribuita
    * Ogni università contribuisce storage
    * Costi distribuiti
  * E se OpenCitations va giù? Così non siamo un single point of failure
  * Citazioni immutabili e verificabili
    * Articolo A cita B. 2 anni dopo Articolo B viene ritrattato/modificato. La citazione rimane ma punta a contenuto diverso
    * con dPID Articolo A (CID: QmAbc...) cita B (CID: QmDef... versione specifica)
    * le correzioni minori non cambiano il DOI
    * Elsevier/Wiley hanno fatto scandalo perché cambiano i PDF silenziosamente: [https://doi.org/10.1002/leap.1660](https://doi.org/10.1002/leap.1660)
    * Con questo sistema si ha una citazione vivente, una living citation
  * Interoperabilità con altri sistemi
    * dPID come layer comune
  * dPID come complemento, non sostituto
    * Continuiamo a fare il nostro mestiere e contemporaneamente abbiamo un'assicurazione sulla vita

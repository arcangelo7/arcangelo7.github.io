---
title: 2023-03-31 Ritorno da Graz
editUrl: false
---

## Novità

**oc\_ocdm**

* Ho aggiunto il gestore dei contatori che utilizza SQLite, utile per la gestione degli snapshot di provenance delle citazioni
* Il `ProvSet` accetta un nuovo parametro di inizializzazione, `custom_counters`, un dizionario nella forma `{’nome_abbreviato_entità’: ContatoreDaUtilizzare(argomenti)}`

**CLEF**

Generazione del template a partire da un documento SHACLE

**Paper su Meta**

Ho risposto ai commenti di Ludo

* Tre vantaggi:
  * Disambiguazione citazioni
  * Rappresentazione documenti senza PMID
  * Velocità servizio (terza e ultima, quasi in sordina)
* Ho parlato di Open Alex e Semantic Scholar nella revisione della letteratura
* Non sono d’accordo su questa obiezione

  > In the last paragraphs of the discussion and conclusion sections, you emphasize that OpenCitations Meta aims to support manual curation. I see curation as a highly complex issue, and my feeling is that OpenCitations doesn’t yet have a clear view on the role it should play in the area of curation. Facilitating manual curation is an option, but there are several other options as well (e.g., algorithmic curation, collaboration with other initiatives that perform curation, leaving curation to downstream infrastructures, etc.). My suggestion would be not to make definitive statements (e.g., “an interface will be implemented and made available …”) about the plans of OpenCitations in this area. I think it would be better to outline the different options that can be taken to organize curation and to leave open the future role of OpenCitations in this area.

L’Open AIRE Research Graph non è semantico according to Andrea. Questo rende Meta il dataset bibliografico semantico più esteso al mondo.

**OSG-IF**

* Il WG è stato inviato. Per la fine di marzo sono attesi feedback. Le attività verranno completate per la fine del 2023 (da aprile ad agosto i primi risultati da consegnare). Rebrand nome: Scientific Knowledge Graphs-Interoperability Framework (SKG-IF).
* Abbiamo discusso il problema delle publishing venue: l’entità riferita al canale utilizzato dai ricercatori per rendere disponibili i frutti della loro ricerca. Una venue è caratterizzata dalla categoria (Journal, proceedings…), open access (true/false), peer review (single-blind, double-blind, open, none), metadata curation (true/false). Per quanto riguarda gli ultimi tre, spesso questa informazione non è disponibile in maniera strutturata. Soluzione: modellare la venue nel prodotto e non come entità a se stante. [\*\*Martyn Rittman](https://www.crossref.org/people/martyn-rittman/),\*\* di Crossref, è d’accordo.
* Per quanto riguarda le venue, che livello di granularità vogliamo usare? Martyn ha risposto che quello di OpenCitations va bene, perché copre casi reali. Ha detto che agenti diversi possono interpretare in modo diverso gli stessi tipi. Ci vuole inoltre un modello estensibile per aggiungere nuovi tipi. Per ora non ci sono altre soluzioni, quindi teniamo la lista attuale. Il problema principale, secondo Paolo, è che fonti diverse usano livelli di granularità diversi e certi tipi devono essere derivati. Non si può fare affidamento sul fatto che Crossref sia il modello usato da tutti. Cos’è un monograph in Zenodo? Book è una venue in Zenodo?
* Distinzione publishing venue/data source: a service where published material (metadata and files) are stored. Problema, a volte venue e data source coincidono. Che si fa? Un terzo tipo che rappresenta l’unione dei due? Zenodo è una venue o una data source?

[attachments/7f906307f39448a2bb708cc0a4e50ff2](/notes/attachments/7f906307f39448a2bb708cc0a4e50ff2)

## Domande

* La tabella in SQLLite contenente le informazioni sul numero degli snapshot usa come chiave primaria il nome dell’entità e non un identificatore globale a sé. Va bene lo stesso?
* CNC produce i dati in Scholix, tra i vari formati, ma Scholix non viene gestito da oc\_ocdm. Dovrebbe?

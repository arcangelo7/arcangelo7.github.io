---
{"publish":true,"created":"2025-10-15T16:14:46.530+02:00","modified":"2025-10-15T12:00:00.000+02:00","cssclasses":""}
---

# La Novitade

## La tesi

### L'architettura

![[attachments/81396207ed004105948283001c15db30.png]]
![[attachments/28856dd8f4654f1d961d081996519d61.png]]
![[attachments/2f2d01f58d2747bfa2e088cb7d263d96.png]]

### ParaText

- Ho esteso il capitolo sui casi d'uso aggiungendo una sottosezione su Paratext dopo quella su OpenCitations Meta.
- Se OpenCitations Meta evidenzia problemi di curatela su vasta scala, Paratext mette in luce una sfida differente: la gestione di dati in domini che richiedono conoscenze altamente specialistiche. In questi contesti risulta essenziale che gli esperti di dominio possano modificare agilmente i dati senza ricorrere a un tecnico. Questa autonomia operativa, tuttavia, diventa impraticabile quando i dati sono in RDF, poiché il formato richiede competenze tecniche che gli studiosi di dominio tipicamente non possiedono, creando una dipendenza da figure intermediarie che rallenta la cura dei dati.
- Ho preso a piene mani dall'articolo scritto con Francesca, modificandone la narrativa e il punto di vista.

### Evaluation

- "Ecological validity"
	- S. Kieffer, U. B. Sangiorgi and J. Vanderdonckt, "ECOVAL: A Framework for Increasing the Ecological Validity in Usability Testing," 2015 48th Hawaii International Conference on System Sciences, Kauai, HI, USA, 2015, pp. 452-461, doi: [10.1109/HICSS.2015.61](https://doi.org/10.1109/HICSS.2015.61)

![[attachments/f86beea83c7e43159f3098da3f3aff06.png]]

- https://doi.org/10.5281/zenodo.17313842

![[attachments/9c16549551134630a60d55b7556b3f2e.png]]

### HERITRACE

- Ho descritto il meccanismo di configurazione delle entità simili, con la logica booleana delle proprietà che segnalano la somiglianza, e anche una sezione più di alto livello sull'interfaccia di fusione che mancava.

## dPID

![[attachments/abfc7584f3b549ef953316c40da8c908.png]]
![[attachments/b7b69a7c9bfb4751a839432938c0db7b.png]]

## Crowdsourcing

- Ho rimosso la necessità di usare il label deposit sugli issue di deposito perché richiedeva di dare dei permessi troppo ampi a OJS. Adesso vengono identificati come issue di deposito quelli che hanno il titolo formattato con deposit spazio dominio spazio schema due punti valore letterale.
- Ora che ci penso, non abbiamo alcun sistema per distinguere le issue di test da quelle non di test all'interno del repository, se non il fatto che nei test solitamente stiamo usando localhost come dominio. perché ora come ora andremo a processare anche quelle di test un domani e a caricarle sul Zenodo normalmente. Ora se il dominio è localhost il record non viene salvato su Zenodo. Ho anche aggiunto la chiave domain ai dati caricati su Zenodo, visto che mancava.
```
json
{
    "data": {
        "title": issue_title,
        "domain": domain,
        "metadata": metadata,
        "citations": citations,
    },
    "provenance": {
        "generatedAtTime": created_at,
        "wasAttributedTo": f"https://api.github.com/user/{user_id}",
        "hadPrimarySource": had_primary_source,
    }
}
```
- Ho aggiornato il token di CROCIBOT dato che sono cambiate le regole di GitHub negli ultimi tre anni e l'ultimo era stato creato tre anni fa. Adesso bisogna dare permessi espliciti per lettura e scrittura delle issue perché sono arrivati i fine grain tokens. In teoria potrei utilizzare il token di default e in questo modo risponderebbe alle issue l'account GitHub Action generico, ma no, io voglio che risponda CROCIBOT e in futuro gli vorrei anche dare una faccina.
- https://github.com/opencitations/crowdsourcing/issues/15
	- Ho trovato un possibile bug nel validatore, nel senso che teoricamente non dovremmo mai avere dei metadati in più. Cioè, adesso viene controllato se abbiamo dei metadati in meno, ma se ne mettiamo in più il risultato risulta comunque valido. Ad esempio, in questo caso, abbiamo una riga senza identificatori e, anzi, abbiamo più righe senza alcun identificatore e comunque la issue risulta valida, quindi alla fine processeremo anche questi metadati che però non sono coinvolti in nessuna citazione.
 
## HERITRACE

- Ho risolto un bug lato UI per cui un vecchio sistema di cache dei template per ogni entità che doveva servire a migliorare le performance e avere una copia dei template e dei sotto-template senza bisogno di fare query sul DOM ogni volta. Ecco quel sistema era prono ad errori e con il il nuovo sistema di caricamento asincrono dei template non abbiamo più alcun bisogno di questo ulteriore escamotage che creava più problemi che altro. Ad esempio trovavo il template sbagliato nel caso in cui c'erano più template per un identificatore e più shape per un identificatore.
- It just works
```
yaml
  is_cited_by_property: &is_cited_by_property
    displayName: "Is Cited By"
    isVirtual: true
    shouldBeDisplayed: true
    fetchValueFromQuery: *citing_entity_from_value_query
    implementedVia:
      target:
        class: "http://purl.org/spar/cito/Citation"
        shape: "http://schema.org/ReverseCitationShape"
      fieldOverrides:
        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type":
          shouldBeDisplayed: false
          value: "http://purl.org/spar/cito/Citation"
        "http://purl.org/spar/cito/hasCitedEntity":
          shouldBeDisplayed: false
          value: "${currentEntity}"
        "http://purl.org/spar/cito/hasCitingEntity":
          displayName: "Citing Resource"
        "http://purl.org/spar/cito/hasCitationCharacterization":
          displayName: "Citation Type"

```
- Il motivo per cui HERITRACE su OpenCitations Meta non si avviava è che provava a inizializzare i contatori su Redis. Ovviamente questa cosa non è fattibile con tutto il database di dati e provenance di Meta. Quindi ho esteso HERITRACE per consentire di aggiungere anche un database Redis con dei contatori dall'esterno e saltare in questo modo l'inizializzazione.
- risolto questo problema mi sono accorto che non si riesce ad aprire neanche il catalogo per ovvi motivi
	- Le classi vengono precaricate all'inizio o da SHACL se c'è o dalle regole di visualizzazione se non c'è SHACL è in ultima istanza dal database. Per ogni classe viene applicato un limite configurabile. Se quel limite viene superato nel catalogo viene mostrato limite+.Il default è 10,000
![[attachments/726516b82d644a079a51329909d3984d.png]]
- Aggiunti anche CATALOGUE_DEFAULT_PER_PAGE=5 e CATALOGUE_ALLOWED_PER_PAGE=5,10,20
- Ho rimosso l'ordinamento di default per soggetto. Se l'utente non specifica alcun criterio di ordinamento nelle regole di visualizzazione, non viene applicato alcun criterio di ordinamento, perché l'ordinamento è pesantissimo in presenza di un gran numero di risorse per classe.

## Altro

- Sto imparando l'inglese, tutte le settimane il giovedì dalle 15 alle 18 fino a dicembre.
- Ho ricevuto un'email da Oxford University Press secondo cui Arcangelo ha richiesto ad Arcangelo di pagare l'articolo e dice che bisogna pagare entro 30 giorni a partire dal 10.

# Domande

## Memo
- HERITRACE
	- C'è un bug che si verifica quando uno seleziona un'entità preesistente, poi clicca sulla X e inserisce i metadati a mano. Alcuni metadati vengono duplicati.
	- Se uno ripristina una sotto entità a seguito di un merge, l'entità principale potrebbe rompersi.
	- Come fa la mediana a essere in cima. Evidenziare meglio i valori estremi in assenza di whiskers.
	- Perché cambia il colore per 60/80.
	- Riflettere meglio sulla color blindness. Aggungere ausili visivi, barre diagonali ecc.
	- Per i tempi attesi si resce a disegnare una retta che mostra i tempi effettivi.
	- Dare una metrica più interessante per i tempi: intervallo di confidenza

- Meta
	- Bisogna produrre la tabella che associa temp a OMID per produrre le citazioni.

- Tesi
	- RML
	- Crowdsourcing future works

- OpenCitations
	- Rifare dump (Crossref e Datacite)
	- Risolvere la questione ORCID
	- Rilanciare processo eliminazione duplicati

- "reference": { "@id": "frbr:part", "@type": "@vocab" } → bibreference
    
- "crossref": { "@id": "biro:references", "@type": "@vocab"} → reference
    
- "crossref": "datacite:crossref"
    
- Ripubblicare dbpedia agnostica su Zenodo e si può usare time-agnostic-library su db pedia agnostica
    
- oc_ocdm
    
    - Automatizzare mark_as_restored di default. è possibile disabilitare e fare a mano mark_as_restored.
- https://opencitations.net/meta/api/v1/metadata/doi:10.1093/acprof:oso/9780199977628.001.0001
    
- Guida per Meta e cerotti
    
- DELETE con variabile
    
- Modificare Meta sulla base della tabella di Elia
    
- embodiment multipli devono essere purgati a monte
    
- Portare il Meta Editor fuori. oc_editor
    
- Modificare documentazione API aggiungendo omid
        
- Heritrace
    - Per risolvere le performance del time-vault non usare la time-agnostic-library, ma guarda solo la query di update dello snapshot di cancellazione.
    - Ordine dato all’indice dell’elemento
    - date: formato
    - anni: essere meno stretto sugli anni. Problema ISO per 999. 0999?
    - Opzione per evitare counting
    - Opzione per non aggiungere la lista delle risorse, che posso comunque essere cercate
    - Configurabilità troppa fatica
    - Collegamento da review e articolo revisionato.
    - Timer massimo. Timer configurabile. Messaggio in caso si stia per toccare il timer massimo.
    - Riflettere su @lang. SKOS come use case. skos:prefLabel, skos:altLabel
    - Possibilità di specificare l’URI a mano in fase di creazione
	- la base è non specificare la sorgente, perché non sarà mai quella iniziale.
	- desvription con l'entità e stata modificata. Tipo commit
	- display name è References Cited by VA bene
	- Avvertire l'utente del disastro imminente nel caso in cui provi a cancellare un volume
- Meta
    - Fusione: chi ha più metadati compilati. A parità di metadato si tiene l’omid più basso
    - Issue github parallelizzazione virtuoso
    - frbr:partOf non deve aggiungere nel merge: https://opencitations.net/meta/api/v1/metadata/omid:br/06304322094
    - API v2
    - Usare il triplestore di provenance per fare 303 in caso di entità mergiate o mostrare la provenance in caso di cancellazione e basta.
- RML
    
    - Vedere come morh kgc rappresenta database internamente
    - https://dylanvanassche.be/assets/pdf/iswc2024-krown-benchmark-rdf-graph-materialisation.pdf
    
    https://github.com/oeg-upm/gtfs-bench
    - Chiedere Ionannisil diagramma che ha usato per auto rml.

- Crowdsourcing
    - Quando dobbiamo ingerire Crossref stoppo manualmente OJS. Si mette una nota nel repository per dire le cose. Ogni mese.
    - Aggiornamenti al dump incrementali. Si usa un nuovo prefisso e si aggiungono dati solo a quel CSV.
    - Bisogna usare il DOI di Zenodo come primary source. Un unico DOI per batch process.
    - Bisogna fare l’aggiornamento sulla copia e poi bisogna automatizzare lo switch
- docker compose atom melody, con un volume per gli asset. C'è una documentazione su come si lanciano entrambi fatti da Giulia Renda. Fine maggio    

# Archivio

[[06-12-2021]]

[[16-12-2021]]

[[22-12-2021]]

[[13-01-2022]]

[[20-01-2022]]

[[27-01-2022]]

[[03-02-2022]]

[[10-02-2022 Triplestore del terzo tipo]]

[[17-02-2022]]

[[22-02-2022]]

[[02-03-2022]]

[[09-03-2022]]

[[16-03-2022 Opinionated Meta model]]

[[22-03-2022 GraphDB vs Blazegraph]]

[[29-03-2022 Pattern per volumi e numeri]]

[08-04-2022. Time-agnostic-library +300%](/app/joplin-desktop/resources/app/Tu%20vuo%20far%20el%20phdino/08-04-2022%20Time-agnostic-library%20%2B300%25.md "Tu%20vuo%20far%20el%20phdino/08-04-2022%20Time-agnostic-library%20%2B300%25.md")

[[12-04-2022 Meta piantata]]

[[19-04-2022 1 task per process and lock on files]]

[[06-05-2022 oc_meta è partita]]

[[13-05-2022 Time-agnostic-library ultra-compatibile]]

[[17-05-2022 Codice benchmark tab aggiornato]]

[[26-05-2022 Progetto di dottorato v1 0 0]]

[[07-06-2022 In preparazione alla lettera di rispost]]

[[21-06-2022 It’s outreach time]]

[[28-06-2022 SPARQL fun]]

[[19-07-2022 I wish my code will work at the first t]]

[[26-07-2022 Metadata ON AIR]]

[30-08-2022. HDD = bottleneck](/app/joplin-desktop/resources/app/Tu%20vuo%20far%20el%20phdino/30-08-2022%20HDD%20%3D%20bottleneck.md "Tu%20vuo%20far%20el%20phdino/30-08-2022%20HDD%20%3D%20bottleneck.md")

[[06-09-2022 Query combinate con le apette]]

[[13-09-2022 OpenCitations full automations]]

[[20-09-2022 OpenCitations full automated]]

[[29-09-2022 Catastrofe]]

[[06-10-2022 Threadripper]]

[[13-10-2022 Anche Crossref rompe i DOI]]

[20-10-2022. **OpenAIRE Research Graph**](/app/joplin-desktop/resources/app/Tu%20vuo%20far%20el%20phdino%2000c13327bbf0449eaa9ac12f8c402ede/20-10-2022%20OpenAIRE%20Research%20Graph%20fca52355e9d8417386132c57364eec43.md "Tu%20vuo%20far%20el%20phdino%2000c13327bbf0449eaa9ac12f8c402ede/20-10-2022%20OpenAIRE%20Research%20Graph%20fca52355e9d8417386132c57364eec43.md")

[[25-10-2022 OpenCitations Meta]]

[[03-11-2022 Fuso orario nella provenance]]

[[08-11-2022 Ottimizzazione API OC Meta]]

[[17-11-2022 JaLC e mEDRA]]

[[22-11-2022 Programmazione agile]]

[[01-12-2022 L’articolo su Meta è pronto]]

[[13-12-2022 indexapi_v2]]

[[20-12-2022 Il giorno del lancio]]

[[09-01-2023 AR order]]

[[17-01-2023 Inizio del dottorato]]

[[25-01-2023 Generic oc_ocdm]]

[[31-01-2023 merge tra entità con prefissi diversi]]

[[07-02-2023 rdflib-ocdm genera gli snapshot]]

[[14-02-2023 rdflib-ocdm merge]]

[[23-02-2023 Clef]]

[[28-02-2023 Accanimento]]

[[07-03-2023 oc_ocdm usa SHACLE]]

[[31-03-2023 Ritorno da Graz]]

[[17-04-2023 SPARQLWrapper timeout]]

[[27-04-2023 Conversione BEAR fatta]]

[[02-05-2023 Meta 28 min → 3 min]]

[[09-05-2023 Bug autori API risolto]]

[[16-05-2023 Pseudocodice in LaTeX]]

[[23-05-2023 Pseudocodice come]]

[[06-06-2023 Dump POCI]]

[[12-06-2023 1 1 Bear]]

[[22-06-2023 Miracolo parte n]]

[[27-06-2023 OROCI fatto]]

[[17-07-2023 Graz]]

[[25-07-2023 Una-Her-Doc bureaucracy]]

[[12-09-2023 Mi è scappata la mano e ho finito il d]]

[[26-09-2023 Articolo Meta fatto]]

[[03-10-2023 CZI first steps]]

[[10-10-2023 Display Rules]]

[[16-10-2023 Briciole di pane]]

[[03-11-2023 PhD a buon punto]]

[[10-11-2023 Provenance rotta]]

[[22-11-2023 Risolto il bug dei bug in Meta]]

[[11-01-2023 ExportKB dà problemi]]

[[14-12-2023 Meta rigenerato]]

[[18-12-2023 Merge delle entità duplicate]]

[[16-01-2024 AIUCD2024]]

[[23-01-2024 Programmazione tutoraggio]]

[[01-02-2023 Primo lancio dei test su BEAR]]

[[07-02-2024 time-agnostic-library da ripensare]]

[[14-02-2024 Errori in BEAR]]

[[21-02-2024 Habemus API]]

[[27-02-2024 Funzioni RML]]

[[05-03-2023 Check provenance]]

[[12-03-2024 Align data with triplestore]]

[[19-03-2024 supplier_prefix once again]]

[[26-03-2024 Ricorsione SPARQL manuale]]

[[05-04-2024 Revisione AIUCD]]

[[10-04-2024 OpenAlex ingerito]]

[[17-04-2024 Il lusso della qualità]]

[[23-04-2024 Ho sfasciato il PC]]

[[30-05-2024 Tijs]]

[[10-05-2024 Limiti inversione]]

[[20-05-2024 Primo tentativo di resuscitazione falli]]

[[30-05-2024 Migrazione su Virtuoso]]

[[04-06-2024 Esoterismo virtuoso]]

[[11-06-2024 Migrazione riuscita]]

[[25-06-2024 R2RML tests completed]]

[[30-07-2024 Finalmente ho trovato i bug in Meta]]

[[03-09-2024 Creazione entità]]

[[09-11-2024 Tre entità alla volta]]

[18-09-2024. HERITRACE: issue, volume, journal](/app/joplin-desktop/resources/app/Tu%20vuo%20far%20el%20phdino/18-09-2024%20HERITRACE%20issue%2C%20volume%2C%20journal.md "Tu%20vuo%20far%20el%20phdino/18-09-2024%20HERITRACE%20issue%2C%20volume%2C%20journal.md")

[[27-09-2024 SHACL Advanced Features]]

[[01-10-2024 Contatori su Redis]]

[[08-10-2024 Nuove proprietà di entità esistenti]]

[[17-10-2024 Redesign catalogo]]

[[24-10-2024 HERITRACE online]]

[[31-10-2024 Correzione della provenance]]

[[07-11-2024 Ricerca su HERITRACE]]

[[11-11-2024 HERITACE è più bellino]]

[[21-11-2024 HERITRACE Delete]]

[[28-11-2024 ASK KEEP DELETE]]

[[02-12-2024 Meta disaster recovery]]

[[09-12-2024 HERITRACE lock risorse]]

[[16-01-2025 Filtro input Meta]]

[[30-01-2025 Bug storici di Meta risolti]]

[[04-02-2025 Archiviazione automatica report validaz]]

[[23-02-2025 Revisione provenance DSH]]

[[20-02-2025 DSH2]]

[[27-02-2025 HERITRACE Francesca buggifixxi]]

[[06-03-2025 HERITRACE testato]]

[[13-03-2025 SPBv]]

[[19-03-2025 Ansible]]

[[25-03-2025 Top level search in nested search]]

[[02-04-2025. Script provenance Aldrovandi]]

[[16-04-2025. Interfaccia di merge]]

[[24-04-2025. Time Agnostic Mess]]

[[08-05-2025. Bulk load della provenance fatto]]

[[20-03-2025. HERITRACE 1.0.0]]

[[05-06-2025. Meta fulmine di guerra ed HERITRACE 1.0.0 terminata]]

[[10-06-2025. Merge CSV dumps light]]

[[24-06-2025. Test di usabilità su HERITRACE]]

[[01-07-2025. Starlight]]

[[08-07-2025. Ambiente DEMO]]

[[03-09-2025. Ho scritto la tesi]]

[[09-09-2025. csv,conf,v9]]

[[18-09-2025. Rimuovere l'RDF di Meta è stato un errore]]

[[23-09-2025. Living citations]]

[[30-09-2025. Proprietà virtuali]]

[[07-10-2025. 7 enduser 7 tecnici]]
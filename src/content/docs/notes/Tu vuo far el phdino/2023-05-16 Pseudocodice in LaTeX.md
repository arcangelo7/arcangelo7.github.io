---
title: 2023-05-16 Pseudocodice in LaTeX
editUrl: false
---

## Novità

```xml
<!-- http://purl.org/spar/fabio/RetractionNotice -->

    <owl:Class rdf:about="http://purl.org/spar/fabio/RetractionNotice">
        <rdfs:subClassOf rdf:resource="http://purl.org/spar/fabio/Comment"/>
        <rdfs:subClassOf>
            <owl:Restriction>
                <owl:onProperty rdf:resource="http://purl.org/vocab/frbr/core#realizationOf"/>
                <owl:someValuesFrom rdf:resource="http://purl.org/spar/fabio/Retraction"/>
            </owl:Restriction>
        </rdfs:subClassOf>
        <rdfs:comment xml:lang="en">The realization of a retraction. A formal document which publicly withdraws, cancels, refutes, reverses an earlier statement or publication or announces the act of desisting from publishing the original statement.</rdfs:comment>
        <rdfs:label xml:lang="en">retraction notice</rdfs:label>
    </owl:Class>
```

```xml
<!-- http://purl.org/spar/datacite/jid -->

    <owl:NamedIndividual rdf:about="http://purl.org/spar/datacite/jid">
        <rdf:type rdf:resource="http://purl.org/spar/datacite/ResourceIdentifierScheme"/>
        <fabio:hasURL rdf:datatype="http://www.w3.org/2001/XMLSchema#anyURI">https://www.jstage.jst.go.jp</fabio:hasURL>
        <rdfs:comment xml:lang="en">Identifier assigned by J-STAGE to on-line journals</rdfs:comment>
        <rdfs:label xml:lang="en">jid</rdfs:label>
    </owl:NamedIndividual>
```

* OCDM: Abstract ([fabio:Abstract](http://purl.org/spar/fabio/Abstract)), audio document ([fabio:AudioDocument](http://purl.org/spar/fabio/AudioDocument)), computer program ([fabio:ComputerProgram](http://purl.org/spar/fabio/ComputerProgram)), data management plan ([fabio:DataManagementPlan](http://purl.org/spar/fabio/DataManagementPlan)), editorial ([fabio:Editorial](http://purl.org/spar/fabio/Editorial)), journal editorial ([fabio:JournalEditorial](http://purl.org/spar/fabio/JournalEditorial)), newspaper ([fabio:Newspaper](http://purl.org/spar/fabio/Newspaper)), newspaper article ([fabio:NewspaperArticle](http://purl.org/spar/fabio/NewspaperArticle)), newspaper editorial ([fabio:NewspaperEditorial](http://purl.org/spar/fabio/NewspaperEditorial)), newspaper issue ([fabio:NewspaperIssue](http://purl.org/spar/fabio/NewspaperIssue)), preprint ([fabio:Preprint](http://purl.org/spar/fabio/Preprint)), presentation ([fabio:Presentation](http://purl.org/spar/fabio/Presentation)), peer review ([fr:ReviewVersion](http://purl.org/spar/fr/ReviewVersion)), retraction notice ([fabio:RetractionNotice](http://purl.org/spar/fabio/RetractionNotice)), web content ([fabio:WebContent](http://purl.org/spar/fabio/WebContent)) and proceedings series ([fabio:Series](http://purl.org/spar/fabio/Series)) were added to the bibliographic resources’ types.

**poci**

* Risolto un bug nel plugin per cui nell’input di Meta risultavano 6,000,000 circa di entità duplicate, perché il numero di linee già processate saltate veniva ricavato dal numero di linee con citazioni e non dal numero di linee effettivo.
  * Ho risolto scrivendo un software che elimina le righe duplicate dall’input di Meta anziché riprocessare tutto il dump di icite
* Ci sono ~~24,378,693 di~~ DOI associati a più PMID. È la stessa entità con metadati diversi. Il DOI fa da collante per PMID associati a versioni diverse. Come so che sono sempre la stessa entità? Perché il titolo non cambia mai.

**altro**

* Tutto il software per estrarre metadati da Crossref, PubMed, JaLC, mEDRA e DataCite e tutto il software precedentemente in oc\_idmanager si trova adesso in un nuovo repo, oc\_ds\_converter, in modo tale che non ci siano importazioni circolari e l’aggiornamento del pacchetto sia immediato.

  [attachments/2af6af0c537848f6a3a4cdad23c92480.pdf](/notes/attachments/2af6af0c537848f6a3a4cdad23c92480.pdf)

## Domande

* Lo script sl in spar script aggiorna automaticamente l’html sulla base delle novità nel file OWL? Perché non mi pare lo faccia.
* Nel file [context.json](https://github.com/opencitations/metadata/blob/master/context.json) dell’ocdm c’è questa informazione: `"crossref": { "@id": "biro:references", "@type": "@vocab"}`. Secondo me è un errore. Dovrebbe essere `"crossref": "datacite:crossref"`

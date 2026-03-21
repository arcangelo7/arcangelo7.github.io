---
title: 2024-09-03 Creazione entità
editUrl: false
---

## La Novitade

### Meta

* Lo script che genera l’RDF a partire dal dump ora genera in parallelo i singoli file separatamente e poi li fonde in parallelo alla fine. In questo modo, il processo è più veloce perché si elimina il problema dei lock e della lettura di file durante la generazione.
  * Problema esaurimento inodes: merge ogni 1000 file.
* Parametro opzional prefer\_self in merge di BibliographicResource (BibliographicEntity) che ignora ar\_list e re\_list di other se presenti in self. L’ho messo solo in BibliographicResource  e nelle classi genitori, non in quelle sorelle (Identifier ecc). Mi sembrava un over-engineering considerato che non ne prevedo l’uso (YAGNI), anche se mi rendo conto che sia poco elegante.

```python
    @accepts_only('br')
    def merge(self, other: BibliographicResource, prefer_self: bool = False) -> None:
        """
        The merge operation allows combining two `BibliographicResource` entities into a single one,
        by marking the second entity as to be deleted while also copying its data into the current
        `BibliographicResource`. Moreover, every triple from the containing `GraphSet` referring to the second
        entity gets "redirected" to the current entity: **every other reference contained inside a
        different source (e.g. a triplestore) must be manually handled by the user!**

        In case of functional properties, values from the current entity get overwritten
        by those coming from the second entity while, in all other cases, values from the
        second entity are simply appended to those of the current entity. In this context,
        `rdfs:label` is considered as a functional property, while `rdf:type` is not.

        :param other: The entity which will be marked as to be deleted and whose properties will
        be merged into the current entity.
        :type other: BibliographicResource
        :param prefer_self: If True, prefer values from the current entity for non-functional properties
        :type prefer_self: bool
        :raises TypeError: if the parameter is of the wrong type
        :return: None
        """
        super(BibliographicResource, self).merge(other)

        title: Optional[str] = other.get_title()
        if title is not None:
            self.has_title(title)

        subtitle: Optional[str] = other.get_subtitle()
        if subtitle is not None:
            self.has_subtitle(subtitle)

        container: Optional[BibliographicResource] = other.get_is_part_of()
        if container is not None:
            self.is_part_of(container)

        citations_list: List[BibliographicResource] = other.get_citations()
        if not (prefer_self and self.get_citations()):
            for cur_citation in citations_list:
                self.has_citation(cur_citation)

        pub_date: Optional[str] = other.get_pub_date()
        if pub_date is not None:
            self.has_pub_date(pub_date)

        re_list: List[ResourceEmbodiment] = other.get_formats()
        if not (prefer_self and self.get_formats()):
            for cur_format in re_list:
                self.has_format(cur_format)

        number: Optional[str] = other.get_number()
        if number is not None:
            self.has_number(number)

        edition: Optional[str] = other.get_edition()
        if edition is not None:
            self.has_edition(edition)

        be_list: List[BibliographicReference] = other.get_contained_in_reference_lists()
        if not (prefer_self and self.get_contained_in_reference_lists()):
            for reference in be_list:
                self.contains_in_reference_list(reference)

        de_list: List[DiscourseElement] = other.get_contained_discourse_elements()
        if not (prefer_self and self.get_contained_discourse_elements()):
            for discourse_element in de_list:
                self.contains_discourse_element(discourse_element)

        ar_list: List[AgentRole] = other.get_contributors()
        if not (prefer_self and self.get_contributors()):
            for agent_role in ar_list:
                self.has_contributor(agent_role)

        related_doc_list: List[URIRef] = other.get_related_documents()
        if not (prefer_self and self.get_related_documents()):
            for doc in related_doc_list:
                self.has_related_document(doc)

```

* Trovati 447,982 gruppi di identificatori da fondere.
  * Software che raggruppa gli identificatori in file diversi per entità che li puntano, in modo da poterli fondere in parallelo.
  * Li ho fusi
    * 47:14:43 per fonderli nei file
    * poche ore per fonderli sul triplestore

**oc\_ocdm**

* `FilesystemCounterHandler`

  1. Semplificata la struttura del file di conteggio, ora ogni riga contiene solo un numero intero.
  2. Rimosso l'uso di `_initial_line_len` e `_trailing_char` nella logica di lettura e scrittura.
  3. Modificato `_read_number` per leggere il file riga per riga invece di usare calcoli di offset.
  4. Aggiornato `_set_number` per scrivere numeri semplici invece di righe di lunghezza fissa.
  5. Modificato `__initialize_file_if_not_existing` per creare un file con una singola riga vuota.
  6. Aggiunta la funzione `_set_numbers` per supportare l'aggiornamento in batch di più contatori.
  7. Rimosso `_get_line_len`, `_increase_line_len`, `_is_a_valid_line`, e `_fix_previous_lines` poiché non più necessari.
  8. Adattate le funzioni di lettura, scrittura e incremento per lavorare con il nuovo formato del file.

  Queste modifiche rendono l'implementazione più semplice, robusta e facile da mantenere, eliminando la complessità legata alla gestione di righe di lunghezza fissa.

### HERITRACE

* Risolto un bug per cui gli elementi clonati clonavano anche eventuali predicati annidati ripetuti, come multipli id per un autore.
* Risolto un bug per cui nei menu a tendina degli elementi clonati non veniva selezionato di default il primo elemento dei select option come avviene per il primo elemento clonato
* Risolto un bug per cui i pulsanti di toggle non cambiavano da collapse a expanded
* Risolto un bug per cui in fase di creazione dell’entità non venivano mostrati i campi editor, publisher, volume e journal.
* Il menu a tentina delle classi è più largo delle proprietà della classe stessa, per far capire che è gerarchicamente superiore.. Inoltre, in questo modo si crea lo spazio per distanziare il pulsante di cancellazione dai select
* Modifica shacl e display rules per distinguere tra journal article, che ha volume, issue e journal, dalle altre risorse bibliografiche che non lo hanno
* Risolto un bug per cui in assenza di display properties non venivano visualizzate le triple presenti nei vari snapshot di un’entità
* Creazione di entità in assenza di
  * shacl
  * display properties
    * L’utente può scegliere se il valore è un URI o un Literal e in caso di Literal può scegliere il datatype.
    * Lista dei datatype human readable
    * Validazione datatype client side e server side
    * Validazione URI entità, proprietà e valore proprietà di tipo URI client side e server side
    * È obbligatorio avere almeno una proprietà. Validazione sia client side che server side. Client side vienenasdcondo il pulsante di cancellazione.
* Se un’entità esiste già, crearla rimanda alla pagina dell’entità già esistente e la creazione viene bloccata.
* generazione degli URI per le nuove entità
  * Implementata una classe astratta `URIGenerator` come base per la generazione degli URI.
  * Create le classe concrete `DefaultURIGenerator` (uuid) `MetaURIGenerator`.
  * Modificato il file di configurazione per permettere la specifica della classe di generazione URI da utilizzare.

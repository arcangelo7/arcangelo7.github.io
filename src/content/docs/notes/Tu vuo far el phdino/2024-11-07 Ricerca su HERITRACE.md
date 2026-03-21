---
title: 2024-11-07 Ricerca su HERITRACE
editUrl: false
---

## La Novitade

### Meta

* Correzione della provenance
  * Rilevamento automatico degli snapshot mancanti nella sequenza
    * Ricostruzione della catena di provenance con inserimento degli snapshot mancanti
    * Inferenza automatica dei timestamp per gli snapshot ricostruiti
    * Gestione di eventuali snapshot mancanti multipli, con distribuzione uniforme dei tempi di generazione e invalidazione basata sulle informazioni disponibili
  * Gestione Descrizioni Multiple:
    * Preservazione di tutte le descrizioni di merge se non è il primo snapshot
    * Rimozione descrizioni non-merge dagli snapshot di merge
    * Primo snapshot: preserva solo descrizione di creazione
    * Ultimo snapshot: priorità alla descrizione di cancellazione
    * Snapshot intermedi: default a descrizione di modifica
  * Test e verifica del sistema di correzione
* I test sia sui dati che sulla provenance dei risultati del merge degli id non hanno individuato alcuna problematica.
* Fusione br

### HERITRACE

* **Implementata ricerca entità nel dataset**
  * Autocomplete in tempo reale sulle entità esistenti
  * Ricerca sul contenuto testuale di entità e oggetti delle triple
  * Attivazione dopo 4 caratteri digitati (è il minimo per utilizzare la ricerca sull’indice testuale di virtuoso)
  * Limite di 5 risultati per query
  * **Funzionamento tecnico**:

    * Query SPARQL con REGEX case-insensitive

    ```javascript
    function generateSearchQuery(term, entityType, predicate, dataset_db_triplestore, dataset_db_text_index_enabled) {
        if (dataset_db_text_index_enabled && dataset_db_triplestore === 'virtuoso') {
            // Usa l'indice testuale di Virtuoso
            let query = `
                SELECT DISTINCT ?entity ?type ?scoreValue WHERE {
                    ?entity ?p ?text .
                    ?text bif:contains "'${term}*'" OPTION (score ?scoreValue) .
                    ${entityType ? `?entity a <${entityType}> .` : ''}
                    ${predicate ? `?entity <${predicate}> ?text .` : ''}
                    OPTIONAL { ?entity a ?type }
                    FILTER(?scoreValue > 0.2)
                }
                ORDER BY DESC(?scoreValue)
                LIMIT 5
            `;
            return query;
        } else {
            // Fallback alla ricerca standard con REGEX
            let query = `
                SELECT DISTINCT ?entity ?type WHERE {
                    ${entityType ? `?entity a <${entityType}> .` : ''}
                    ${predicate ? 
                        `?entity <${predicate}> ?searchValue .` :
                        `?entity ?searchPredicate ?searchValue .`
                    }
                    FILTER(REGEX(STR(?searchValue), "${term}", "i"))
                    OPTIONAL { ?entity a ?type }
                } 
                LIMIT 5
            `;
            return query;
        }
    }

    # [...]

        // Aggiungi le triple dal contesto come vincoli
        Object.entries(contextData).forEach(([predicateUri, values]) => {
            values.forEach(valueObj => {
                const formattedValue = formatValueForSparql(valueObj);
                sparqlQuery = sparqlQuery.replace(
                    'WHERE {',
                    `WHERE {
                        ?entity <${predicateUri}> ${formattedValue} .`
                );
            });
        });

    ```

    * Ricerca su URI entità e valori letterali
    * Filtraggio per tipo specifico di entità
    * Vengono utilizzate nella query anche eventual informazioni aggiuntive presenti, tipo altri predicati già specificati per quell’entità, tenendo conto anche del datatype e del tipo (uri o literal)
    * Caching risultati in `lastSearchResults`
    * Debounce 300ms per ottimizzazione performance
    * Se presente, viene utilizzato l’indice testuale
  * **UI/UX**:
    * Dropdown risultati con label human-readable
    * Spinner durante caricamento
    * Link diretto alla pagina dell'entità
    * Possibilità di creare nuova entità se non trovata
    * Validazione input con feedback visivo
* **Gestione selezione**:
* Elementi nel catalogo ordinati in ordine alfabetico
* Su qualunque schermo larghezza massima di 70ch (larghezza dello 0). In questo modo il pulsante di cancellazione è più vicino all’elememento a cui si riferisce

  * [https://www.lucarosati.it/blog/leggibilita](https://www.lucarosati.it/blog/leggibilita)
  * [https://www.w3.org/Translations/WCAG21-it/#visual-presentation](https://www.w3.org/Translations/WCAG21-it/#visual-presentation)

  > Ruder concluded that the **optimal line length for body text is 50–60 characters** per line, including spaces (“Typographie”, E. Ruder).
  >
  > To ensure line lengths don’t exceed 80 characters, the CSS `max-width` property can be set using [font-relative lengths](https://developer.mozilla.org/en-US/docs/Web/CSS/length) of around `70ch` or `34em` (note that this value will need to be adjusted slightly up or down depending on the font used).

  * [https://baymard.com/blog/line-length-readability](https://baymard.com/blog/line-length-readability)
* Input più larghi
  * Più vicini al pulsante di cancellazione
  * Più spazio per campi lunghi (doi lunghi, titoli, abstract ecc)
* Ho rimosso l’endpoint da HERITRACE
  * Confonde l’utente non esperto che è il nostro utente
  * Aggiunge un elemento in più nella barra di navigazione e meno più è facile orientarsi
  * YASGUI non si integra con HERITRACE. Non c’è modo di forzare una redirezione tra i risultati di YASGUI ed HERITRACE che io sappia. Fa partire una ricerca web che per noi ha senso perché abbiamo la content negotiation ma non ha senso per altri contesti
* Contesto della cancellazione evidenziato
* Nella linea del tempo il titolo è in alto come h2 come in tutte le altre pagine anziché avere una slide dedicata

## Domande

![attachments/4d377a978a464db59e3eef5c78fdc466.png](../../../../assets/notes/attachments/4d377a978a464db59e3eef5c78fdc466.png)

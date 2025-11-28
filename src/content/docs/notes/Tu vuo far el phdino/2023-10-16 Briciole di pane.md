---
title: 2023-10-16 Briciole di pane
editUrl: false
---

## Novità

**Meta**

* Rallentamento iniziale dovuto a:
  * ) ] With Design: Reinventing Design Mode(\[ ] With Design: Reinventing Design Modes \[isbn:9789811944710 isbn:9789811944727]
  * Salvataggio zip
* Contatori corrotti
  * Script che dato root, nome entità (id, br, ra, re, ar) e nome prefisso, ti restituisce il numero più alto. È istantaneo

```bash
python3 -m oc_meta.run.get_higher_count /home/arcangelo/meta_output_current/rdf/id 15
```

**PhD**

* Ora la modifica sull’ordine degli agenti funzioni. Mi ero perso un piccolo dettaglio: ci sono più sequence associate alla stessa br. L’algoritmo precedente fondeva tutte queste sequenze e non individuava correttamente l’inizio e la fine di ogni sequenza.
* Se una stringa è troppo lunga va a capo anziché mostra ellissi e title
* Icone per aggiunta e cancellazione
* Se c’è una sola tripla, gli elementi non sono draggable
* Briciole di pane
* Modifiche bulk
  * Update (compreso ordine)
  * Delete
  * Gestione errori
* Shacl ha la priorità sulle regole di visualizzazione

**time-agnostic-library**

* L’operazione di generazione delle query di update veniva eseguita più volte per la stessa entità

## Domande

* Se modifico l’ordine degli agenti, questa modifica non si riflette nella storia nella risorsa bibliografica all’interno della macchina del tempo, perché la modifica è avvenuta a livello di agente, non di risorsa bibliografica. Questo potrebbe confondere l’utente, che ha l’impressione di modificare la br quando in realtà sta modificando l’ar. Inoltre, ora come ora, l’utente non ha nessuna possibilità di raggiungere l’ar, a meno che non la cerchi esplicitamente.
* Se cancello un metadato, cancello la tripla che ha come oggetto quel metadato, non l’entità del metadato. Se tale entità è orfana, dovrei cancellarla?
* Data di partenza e ritorno Leuven, lettera d’invito dell’università ospitante

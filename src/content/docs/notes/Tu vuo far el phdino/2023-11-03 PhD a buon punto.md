---
title: 2023-11-03 PhD a buon punto
editUrl: false
---

## Novità

**PhD**

* Se esco dalla modalità di modifica vengono ripristinati i valori originali dei vari input
* Nelle impostazioni di visualizzazione, ho aggiunto displayName anche a livello classe. Role In Time →
* Creazione entità
  * Tipi e proprietà presi da shacl
    * Così come i valori opzionali (usesIdentifierScheme, type)
  * Visualizzazione presa dalle impostazioni
  * [http://www.w3.org/1999/02/22-rdf-syntax-ns#type](http://www.w3.org/1999/02/22-rdf-syntax-ns#type) non viene mostrato a meno che non ci siano valori opzionali
  * L’ordine delle proprietà mostrato nel form è lo stesso presente nel file di configurazione, se presente. Se una proprietà è definita in shacl ma non ha una regola di visualizzazione viene mostrata in fondo usando il classico split per slash e cancelletto
  * Anche le classi rispettano l’ordine definito nel file yaml! Se ci sono classi non definite nel file yaml, vengono aggiunte in fondo
  * Numero massimo e minimo di proprietà
  * Proprietà obbligatorie e opzionali

## Domande

* Proprietà valide solo per uno specifica sottoclasse. Shacl è meno espressivo di shex. In shacl non esistono la ricorsività e l’ereditarietà. Bisogna per forza definire delle nuove forme. Un form di creazione per ogni tipo di risorsa bibliografica?
* Il 13 c’è il laboratorio di comp-think ma sono a Parigi

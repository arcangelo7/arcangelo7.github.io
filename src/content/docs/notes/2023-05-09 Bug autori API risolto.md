---
title: 2023-05-09 Bug autori API risolto
editUrl: false
---

## Novità

**oc-meta**

* Gli id vengon encodati nelle query sparql così Blazegraph non solleva warning, anche se risolve comunque il problema. Idem per i sequence identifier di volumi e issue, non si sa mai cosa si può trovare lì dentro.
* Risolto un bug per cui non era previsto che un publisher potesse avere più di un identificatore o che potesse avere solo gli identificatori senza il nome
* Risolto un bug per cui non c’era distinzione tra risorsa senza id e titolo e risorsa inesistente.

  **api**

  * Risolto il bug dell’ordine dei ruoli. Ho fatto il test su [The FAIR Guiding Principles for scientific data management and stewardship](https://www.nature.com/articles/sdata201618), non so se mi spiego
  * meta: → omid:
* Ho lanciato il processo per fondere id identitici nelle ra e non ne ho trovato neanche uno. Direi che quel problema è stato risolto.

Lettera di motivazione:

[https://docs.google.com/document/d/18hYUImpJ3UKHgf\_KX989JwuOF0ROK9XC51XVhrjXzC0/edit?usp=sharing](https://docs.google.com/document/d/18hYUImpJ3UKHgf_KX989JwuOF0ROK9XC51XVhrjXzC0/edit?usp=sharing)

## Domande

* Devo usare un layout particolare per la descrizione del progetto e la lettera di motivazione?
* Anastasia non mi ha ancora risposto e la scadenza è domani, la pingo?
* A chi mando i documenti? Non c’è scritto sul sito di UnaEuropa.

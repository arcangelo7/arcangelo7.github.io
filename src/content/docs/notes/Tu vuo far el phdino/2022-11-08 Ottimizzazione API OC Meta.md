---
title: 2022-11-08 Ottimizzazione API OC Meta
editUrl: false
---

## Novità

### API OC Meta

* Bugfix:
  * La **query testuali** su **più id** non funzionava correttamente.
  * In caso di query testuali concatenate la ricerca sul **tipo** di **risorsa** bibliografica veniva eseguita **più volte**.
  * La query testuale su publisher, volumi, persone e venue era posposta alla query sui campi.
  * Il **match esatto** non veniva eseguito correttamente. Per ottenere un match esatto occorre usare il predicato **bds:matchRegex ‘^text\$’**. Questo aiuta a ridurre significativamente il numero di hit sui cognomi e sugli id.
* Ottimizzazioni:
  * Ho aumentato la rilevanza minima da 0.4 a 0.6 per diminuire il numero di hit in caso di query generiche (e.g., “title=software”). In questo modo, “publisher=Springer non ritorna alcun risultato”.
  * Le **persone** possono avere **un solo ID**, perché prevedere più ID significa prima raggruppare i risultati per “id”, “author” ed “editor” e poi associare a ciascun autore ed editor i suoi id. Questo rallenta molto le query che coinvolgono risorse con decine o centinaia di autori.
  * Ho riscritto tutte le query assicurandomi che il join avvenisse sempre in maniera progressiva a partire da elementi noti.
  * Fare o non fare l’unione tra foaf:name e foaf:givenName è ininfluente sulla velocità, perché pesa solo il numero di hit.

### Articolo su OC Meta

* Capitolo sulla **metodologia**
  * Ho descritto l’intero comportamento del **Curator**

### oc\_idmanager

* Riflettendo su dove implementare **l’estrazione** di **metadati** da tutti le agenzie di registrazione dei DOI, mi sono ricordato che Arianna stava già facendo una cosa simile in **oc\_idmanager**.
  * Ho introdotto una nuova classe MetadataManager, [chiamata da DOIManager](https://github.com/opencitations/identifier_manager/blob/34c78412fa69c4f36fcdc7174f001aaeb3089929/oc_idmanager/doi.py#L161).
  * Il parametro `allow_extra_api` di `extra_info` accetta un nuovo valore, “unknown”. Se specificato, viene prima eseguita una chiamata a “[https://doi.org/ra/](https://doi.org/ra/)” per scoprire qual è l’agenzia che ha registrato il DOI e poi vengono recuperati i metadati.
  * Ho portato la coverage dal 48% al **65%**

## Domande

* Non è possibile rendere la velocità di query testuali molto generiche accettabile neanche riducendole all’osso, perché la lentezza è dovuta al numero di hit.
  * Le hit non sono sullo specifico campo, ma sempre su tutto l’indice e su tutti i campi.
  * Altri triplestore permettono di creare più indici per campi diversi. Si può fare lo stesso con Blazegraph?
  * So che è possibile utilizzare Blazegraph con un indice esterno ([https://github.com/blazegraph/database/wiki/ExternalFulltextSearch](https://github.com/blazegraph/database/wiki/ExternalFulltextSearch)). Potremmo utilizzare Blazegraph con elasticsearch, ad esempio.

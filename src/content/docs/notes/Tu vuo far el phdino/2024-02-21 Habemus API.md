---
# SPDX-FileCopyrightText: 2025-2026 Arcangelo Massari <info@arcangelomassari.com>
#
# SPDX-License-Identifier: CC-BY-4.0

title: 2024-02-21 Habemus API
editUrl: false
---

## Novità

<aside>
📢 *Magno cum gaudio* sono riuscito a caricare su Figshare tramite API. Mi era sfuggito che l’MD5 andasse calcolato a manina, ero convinto che se ne occupasse il loro server. Inoltre, i file vanno caricati a pezzi

</aside>

Si lancia da linea di comando specificando in input il percorso a un file di configurazione

```yaml
TOKEN: 'il_tuo_token_api'
ARTICLE_ID: 'il_tuo_id_articolo'
files_to_upload:
  - '/percorso/al/tuo/file'
```

Permette di caricare file su un articolo già esistente. Non permette di creare un nuovo articolo, né di modificare i metadati, dato che sono operazioni - a mio avviso - più comode tramite interfaccia.

**Meta**

* Tipo di entità: ra, Totale entità: 4,047,019, Entità con 'Done'=True: 2,251,555
* Meta è ora pacifista
* Errore nei dati del CSV. Noi abbiamo usato quelli giusti.
* Script che converte l’RDF in triples, sia per i dati che per la provenance. Multiprocessing

## Domande

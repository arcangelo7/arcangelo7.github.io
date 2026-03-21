---
title: 2025-07-01 Starlight
editUrl: false
---

# La Novitade

## OpenCitations QC

* Se cerco un DOI con un'operazione che si aspetterebbe un ORCID ricevo: No API operation found at URL '/v1/author/orcid:10.1162/qss\_a\_00292'. Questo messaggio di errore è fuorviante. L'operazione esiste, è il valore a essere sbagliato. Ad esempio, [https://api.opencitations.net/meta/v1/author/orcid:10.1162/qss\_a\_00292](https://api.opencitations.net/meta/v1/author/orcid:10.1162/qss_a_00292).
  * Idem se cerco stringa vuota: [https://api.opencitations.net/meta/v1/author/](https://api.opencitations.net/meta/v1/author/)
* Ho notato che l'operazione di concatenzazione \_\_ esiste solo per le br e non per le ra. È voluto?

## HERITRACE

* Asterisco per campi obbligatori
  ![attachments/126154e9a58c4c31ad28763a5e217679.png](../../../../assets/notes/attachments/126154e9a58c4c31ad28763a5e217679.png)
* Validazione più permissiva sugli ORCID per cui è permesso fare modifiche al sistema: vengono accettati sia i valori letterali che gli ORCID nel formato URL
* hot reloading anche per shacl e display rules.
* Documentazione con [Starlight](https://starlight.astro.build/)
  * Usa [MDX](https://mdxjs.com/)
  * [https://opencitations.github.io/heritrace/](https://opencitations.github.io/heritrace/)

## Domande

> Hi all, I have created a new data dump, validated a sample of the metadata and citation files, and resolved several mapping issues. Some extraction and parsing inconsistencies remain, which is expected given the data is auto-generated and not manually curated to gold-standard quality. The data can be downloaded using the following link: \[[https://gesisbox.gesis.org/index.php/s/pAZipJEjdg4s8EK](https://gesisbox.gesis.org/index.php/s/pAZipJEjdg4s8EK)]. Please let us know if you encounter any issues during ingestion that may require further attention. Thank you! Best regards, Muhammad Ahsan Shahid

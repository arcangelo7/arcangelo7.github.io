---
title: 2022-10-13 Anche Crossref rompe i DOI
editUrl: false
---

## Cosa ho fatto

* Ho scritto una bozza di 953 del long abstract da inviare a **DH2023 Graz**.
  * Francesca Tomasi si è proposta per contestualizzare meglio il discorso nelle DH nel cappello e nella coda dell’abstract.
* Ho inviato l’articolo su **time-agnostic-library** a **JASIST**.
* Sto scrivendo l’articolo su OpenCitations Meta
  * Ho scritto **abstract** e **introduzione**. Solitamente si scrivono alla fine, ma dato che sto usando la tesi di Fabio come riferimento ho già un’idea abbastanza chiara di come organizzare il discorso.
  * Sto esplorando **dataset** di **citazioni** e **metadati** bibliografici da descrivere nel capitolo sullo **stato dell’arte**

    [attachments/5068fce2a1eb446a8825f6ce2f8bee59.csv](/notes/attachments/5068fce2a1eb446a8825f6ce2f8bee59)

## Domande

* Ecco come del codice teoricamente legittimo può rompere un DOI.

  ```python
  import csv

  data = {"id": "[10.1097/01.rct.0000185385.35389\.cd](https://doi.org/10.1097/01.rct.0000185385.35389%5C.cd)"}
  with open(filepath, 'w', newline='', encoding='utf-8') as f:
  	  dict_writer = csv.DictWriter(f, data[0].keys(), delimiter=',', quotechar='"', quoting=csv.QUOTE_NONNUMERIC, escapechar='\\')
  	  dict_writer.writeheader()
  	  dict_writer.writerows(data)

  with open(filepath, 'r', encoding='utf8') as data_initial:
  		dict_reader = csv.DictReader(valid_data, delimiter=',', escapechar='\\')

  print(list(dict_reader))
  # [{"id": "10.1097/01.rct.0000185385.35389.cd"}]
  ```

  Come gestire [10.1097/01.rct.0000185385.35389.cd](https://doi.org/10.1097/01.rct.0000185385.35389%5C.cd)? Si potrebbe levare escapechar dalla lettura, dato che il carattere di escaping utilizzato in scrittura è lo stesso utilizzato da Python

## Note

* Sapevate che il dump di Crossref può contenere DOI di primo livello invalidi?
  * [https://opencitations.net/index/coci/api/v1/references/10.1137/040604947\end{doi](https://opencitations.net/index/coci/api/v1/references/10.1137/040604947%5Cend%7Bdoi)
  * [https://opencitations.net/index/coci/api/v1/references/10.2111/1551-5028(2004)057\[0490:seogap\]2.0.co;2](https://opencitations.net/index/coci/api/v1/references/10.2111/1551-5028\(2004\)057%5C%5B0490:seogap%5C%5D2.0.co;2)
  * [https://opencitations.net/index/coci/api/v1/references/10.2111/1551-5028(2004)057\[0475:gosotr\]2.0.co;2](https://opencitations.net/index/coci/api/v1/references/10.2111/1551-5028\(2004\)057%5C%5B0475:gosotr%5C%5D2.0.co;2)
  * [https://opencitations.net/index/coci/api/v1/references/10.2111/1551-5028(2004)057\[0448:rapohr\]2.0.co;2](https://opencitations.net/index/coci/api/v1/references/10.2111/1551-5028\(2004\)057%5C%5B0448:rapohr%5C%5D2.0.co;2)
  * [https://opencitations.net/index/coci/api/v1/references/10.2111/1551-5028(2004)057\[0546:sdiamr\]2.0.co;2](https://opencitations.net/index/coci/api/v1/references/10.2111/1551-5028\(2004\)057%5C%5B0546:sdiamr%5C%5D2.0.co;2)
* L’Università di Bologna non è registrata du **Ringgold**, che viene usato da JASIST per **disambiguare** le istutizioni.
* Parlando con **Paolo Bonora** siamo giunti alla conclusione che usare **Blazegraph** per aggiornare in maniera incrementale l’indice bibliografico di Meta sia **inefficiente**. Converrebbe utilizzare un **indice a parte** e solo alla fine fare un **bulk upload** del risultato su Blazegraph.
* **Backslash hell**

  ```python
  backslash_str = "\\"
  print(backslash_str)
  # \
  with open("backslash_str.txt", "w") as f:
  	f.write(backslash_str)
  # \

  backslash_dict = {"\\": "\\"}
  print(backslash_dict)
  # {"\\": "\\"}
  with open("backslash_dict.json", "w") as f:
  	json.dump(backslash_dict, f)
  # {"\\": "\\"}
  print(backslash_dict["\\"])
  # \

  # In SPARQL e nelle espressioni regolari i backslash necessitano di escaping
  # Ciò significa che bisogna raddoppiare i backslash se si lavora in Python
  # Un singolo backslash va espresso con "\\\\"
  ```

---
title: 2023-11-10 Provenance rotta
editUrl: false
---

## Novità

**Meta**

* Ho predisposto un test con 24,000 entità su 24 file processate in parallelo con 24 core. Ho poi progettato uno script che conta il numero di entità su rdf e triplestore. I conti tornano. Ho poi eseguito lo stesso conteggio sull’ultima versione di Meta. I conti non tornano.
* Tuttavia, si è verificato il problema dell’ordine degli autori (due o più ultimi autori)
  * Ho reso più robusta l’iterazione sulla lista dei ruoli, che prima modificava la lista stessa durante l’iterazione (pur in maniera teoricamente sicura). Niente
  * Ho reso più robusto l’algoritmo per costruire l’ordine degli agenti. Nella versione precedente si ragionava dalla fine all’inizio, ora si ragione dall’inizio alla fine. Cioé si individua il primo elemento e si procede in base a next, senza invertire l’ordine alla fine, evitando così loop infiniti. Niente
  * Infine, ho capito che il problema si verifica nel caso in cui due agenti con lo stesso ruolo nella stessa risorsa bibliografica condividono almeno un id.
* La soluzione è la seguente: se due agenti con lo stesso ruolo nella stessa br hanno lo stesso id, se hanno lo stesso nome si rimuove il secondo dalla lista, se hanno nomi diversi si rimuove l’id in comune dalla lista. Nel caso di agenti solo con l’id e senza nome, vale lo stesso discorso, si rimuove l’id in comune.
* Con l’occasione, ho reso più modulare e mantenibile il processo di curatela dei ra
* Ho trovato un bug devastante in oc\_ocdm. Quando viene generato uno snapshot di provenance, tutti i precedenti vanno persi e si conservano solo tutti i metadati dell’ultimo e il tempo di invalidazione del penultimo.
  * Ho provato a sostituire la versione attuale del ProvSet e dello Storer con l’ultima modificata da Simone Persiani e il problema persiste. Non capisco come sia possibile che io non mi sia mai accorto di questo problema
  * Ho fatto un test su oc\_ocdm e non sono riuscito a riprodurre il bug
  * Lanciando Meta in single process, il problema non ha luogo
  * Mi sono accorto che i contatori su file non sono gestiti tramite filelock. In teoria, non ce c’è bisogno per i dati, in quando la creazione avviene su supplier prefix diversi e quindi su info\_dir diversi. Ce n’è però bisogno per la provenance. Aggiungere il filelock agli info\_dir, però, non ha risolto il problema
* Ho cominciato a scrivere il documento con la definizione dell’OpenCitations Meta Identifier

## Domande

* Gli info\_dir in realtà sono inutili, perché la stessa informazione si può ricavare molto rapidamente guardando il contatore più alto nel file il cui nome è il numero più alto.

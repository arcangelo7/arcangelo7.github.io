---
title: 2024-02-07 time-agnostic-library da ripensare
editUrl: false
---

## Novità

time-agnostic-library

* Il processo di merge si è interrotto correttamente utilizzando lo stop gentile: questo esclude la presenza di loop infiniti
* Nel sistema BEAR, le query vengono effettuate in base ai numeri di versione anziché ai tempi di generazione come nel time-agnostic-library. In passato, recuperavo l'associazione tra i tempi di generazione e i timestamp successivamente, utilizzando le informazioni sulla provenienza. Tuttavia, si è verificato un problema: il processo che generava le informazioni sulla provenienza era così veloce che a volte diverse versioni avevano lo stesso tempo di generazione, dato che non venivano considerati i microsecondi
  * Considerando i microsecondi vengono distinte più versioni, ma il numero finale risulta comunque diverso da quello effettivo (1298 al posto di 1299)
  * Ho quindi implementato un sistema che controlla l’ultimo tempo di generazione e aspetta 1 millisecondi finché quello attuale non diviene diverso dal precedente. Anche così sono risultati 1298 anziché 1299 versioni
  * In realtà è giusto così, perché quelle versioni si riferiscono alle versioni precedenti a quella attuale esclusa, che è appunto la numero 1299
  * Occorre quindi modificare il codice di test perché faccia, alla fine un ulteriore query sul dataset corrente
* I risultati attesi dal benchmark vengono confrontati automaticamente coi risultati ottenuti

## Domande

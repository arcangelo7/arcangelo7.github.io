---
layout: post
title: 30-05-2024 Tijs
abbrlink: fec0491cdfcd4003abcdd27e940a51fe
tags: []
categories:
  - Tu vuo far el phdino
date: 1717020000000
updated: 1717020000000
---

**RML**

- Tesi di Tijs Van Kampen sull’inversione: <https://github.com/TijsVK/Knowledge-graphs-inversion/blob/master/Paper/thesis.pdf>
  - il sottomodulo morph-kgc puntava a un repo privato, quindi ho forkato
  - Dipendenze gestite con poetry
  - Pieno di import locali. Probabilmente Tijs aveva aggiornato il PYTHONPATH localmente. Ora viene aggiornato dal codice
- Arenas-Guerrero, J., Chaves-Fraga, D., Toledo, J., Pérez, M. S., & Corcho, O. (2024). **Morph-KGC: Scalable knowledge graph materialization with mapping partitions**. *Semantic Web*, *15*(1), 1–20. <https://doi.org/10.3233/SW-223135>
  - Materializzare grafi RDF usando RML in meno tempo, con picchi più bassi di memoria → maggiore scalabilià rispetto ad altri KGC engines (SDM-RDFizer, RMLStreamer, FunMap)
  - mapping partitions:  group rules in the input mapping documents ensuring the generation of disjoint sets of RDF triples by each of them

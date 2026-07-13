---
title: index
editUrl: false
---

### Provenance

[RMLMapper](https://github.com/RMLio/rmlmapper-java#generating-metadata) can generate PROV-O metadata through:

* `--metadatafile`
* `--metadataDetailLevel dataset|triple|term`

This provenance identifies the source, Triples Map, or Term Map associated with generated RDF data. It does not preserve columns ignored by the mapping, rows that generate no RDF, duplicate-row multiplicity, or original lexical values changed during term generation.

### SDM-RDFizer

I tested [SDM-RDFizer](https://github.com/SDM-TIB/SDM-RDFizer) v4.7.5.14 against the 59 PostgreSQL-backed RML-Core cases ported to the RML-IO Registry in 2026. The accepted [KGCW 2026 challenge report](https://openreview.net/forum?id=25egjzsrnQ) reports that SDM-RDFizer passed all 76 RML-Core cases, but explicitly states that RML-IO-Registry was not included in the challenge.

On the ported suite, SDM-RDFizer run has 13 failures: positive cases such as RMLTC0003c-RDB, RMLTC0006a-RDB, and RMLTC0021a-RDB produce no RDF; RMLTC0008b-RDB, RMLTC0009a-RDB, and RMLTC0016e-RDB produce an incorrect graph; and invalid mappings such as RMLTC0002h-RDB, RMLTC0003a-RDB, and RMLTC0007h-RDB are accepted.

SDM-RDFizer therefore provides no conformance advantage over RMLMapper. It also does not support R2RML mappings, so it cannot replace RMLMapper as the shared conformance engine for the RML and R2RML suites.

### KROWN

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Jul 11, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/arcangelo7/knowledge-graphs-inversion" style="font-size: 0.85em; color: #0969da; text-decoration: none;">arcangelo7/knowledge-graphs-inversion</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>fix(benchmarks): replace KROWN mappings scenarios with raw data series</p>
<p>Replace the partial Mappings cases with seven RawData scenarios that vary rows,
properties, and value size around a shared baseline. Require exact table
validation before aggregating measurements, and publish the resulting tables and
charts in the documentation.</p></div><div style="display: flex; justify-content: flex-end; align-items: center; font-size: 0.85em;"><a href="https://github.com/arcangelo7/knowledge-graphs-inversion/commit/a5334ec5ea3e143ece340af5855f84c82eb8ea38" style="color: #0969da; text-decoration: none; font-weight: 500;">a5334ec</a></div></div>

The `RawData` scenario is fully invertible. It varies source-data dimensions and, through the property count, the number of Predicate-Object Maps, but not the number of Triples Maps. It also does not exercise named graphs or joins. Testing those dimensions requires extending KROWN with variants that remain fully invertible.

[https://github.com/kg-construct/KROWN/issues/17](https://github.com/kg-construct/KROWN/issues/17)

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Jul 13, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/arcangelo7/knowledge-graphs-inversion" style="font-size: 0.85em; color: #0969da; text-decoration: none;">arcangelo7/knowledge-graphs-inversion</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>feat(benchmarks): cover official KROWN inversion scenarios</p>
<p>Extend the KROWN runner to execute the RawData, Mappings, NamedGraph,
JoinsRelation, and JoinsMultiple suites at their published scales.</p></div><div style="display: flex; justify-content: flex-end; align-items: center; font-size: 0.85em;"><a href="https://github.com/arcangelo7/knowledge-graphs-inversion/commit/4506e0656a811689a6889a434c489a856dbe4bda" style="color: #0969da; text-decoration: none; font-weight: 500;">4506e06</a></div></div>

### TODO

* Dare la lista completa di cose non allineate tra test di RML e R2RML
* [https://github.com/dtai-kg/R2RML2Datalog-Translator](https://github.com/dtai-kg/R2RML2Datalog-Translator)
* Creare scenari dove Ali will fail. Fare l'avvocato del diavolo
* estendere KROWN per generare casi invertibili
* [https://docs.google.com/document/d/1tYxHmuqyAfniVGpTicDz3FB2jf0dZRx2kZWAjaZmkaI/edit?tab=t.0](https://docs.google.com/document/d/1tYxHmuqyAfniVGpTicDz3FB2jf0dZRx2kZWAjaZmkaI/edit?tab=t.0)
* Deadline end of september

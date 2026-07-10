---
title: index
editUrl: false
---

Coordinating with David Chavez and the other folks: [https://github.com/kg-construct/rml-core/issues/266](https://github.com/kg-construct/rml-core/issues/266)

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Jul 2, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/arcangelo7/rml-io-registry" style="font-size: 0.85em; color: #0969da; text-decoration: none;">arcangelo7/rml-io-registry</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>test: add RML-Core RDB test cases (RMLTC0000-RMLTC0021a)</p>
<p>Port the 59 PostgreSQL test cases removed from rml-core in
kg-construct/rml-core@2a232cf (&quot;test-cases: only keep JSON&quot;) as
RMLTC*-RDB, following the guidance in kg-construct/rml-core#266.</p>
<p>Deviations from the removed snapshot:</p>
<ul>
<li>RMLTC0007h: objectMap references FirstName and graphMap references
ID instead of the non-existent Name column, so the only intended
error is the literal graph term (mirrors kg-construct/rml-core#143)</li>
<li>RMLTC0019a, RMLTC0020a: expected outputs resolve relative IRIs
against <a href="http://example.com/">http://example.com/</a> instead of <a href="http://example.com/base/">http://example.com/base/</a>
(mirrors kg-construct/rml-core#223)</li>
<li>RMLTC0002e, RMLTC0002g, RMLTC0002h, RMLTC0003a: object maps
reference ID instead of the undefined IDs, so each error test fails
for one reason only (mirrors the fixes to the JSON variants)</li>
<li>RMLTC0002h: the SQL query duplicates the &quot;ID&quot; column via an alias,
as in R2RMLTC0002h, instead of an unquoted query that fails on
PostgreSQL before the duplicate-name check is reached</li>
<li>RMLTC0003a: the undefined SQL version identifier is expressed as
the undefined reference formulation rml:SQL2000Query with a valid
query, matching the intent of R2RMLTC0003a</li>
<li>RMLTC0002i, RMLTC0002j: the queries select the &quot;ID&quot; and &quot;Name&quot;
columns the mapping references (qualified names in 0002j, per
R2RMLTC0002j); the expected id literal is typed xsd:integer per
the SQL natural mapping</li>
<li>RMLTC0005a, RMLTC0005b, RMLTC0012e, RMLTC0016b: xsd:double
literals use decimal notation, matching the registry convention</li>
<li>RMLTC0015b: references use the lowercase names produced by the
unquoted DDL, as in RMLTC0015a, and the second query filters
Lan = &#39;ES&#39;; the only intended errors are the invalid language tags</li>
<li>RMLTC0019b: the table keeps only the row with the data error, as
in the current JSON variant</li>
<li>RMLTC0002f: PostgreSQL JDBC driver and user instead of MySQL</li>
<li>RMLTC0004a: dropped a stray student_sport.csv from the CSV variant</li>
</ul>
<p>All resource.sql files load and all SQL2008Query iterators behave as
expected on PostgreSQL 16; mappings and expected outputs parse as
Turtle/N-Quads.</p></div><div style="display: flex; justify-content: flex-end; align-items: center; font-size: 0.85em;"><a href="https://github.com/arcangelo7/rml-io-registry/commit/1a2c72602285b10e4ee439ab4a0ab5a666822b65" style="color: #0969da; text-decoration: none; font-weight: 500;">1a2c726</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Jul 3, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/arcangelo7/rml-io-registry" style="font-size: 0.85em; color: #0969da; text-decoration: none;">arcangelo7/rml-io-registry</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>test: add missing BlankNode termType to RMLTC0001b-RDB</p>
<p>The PostgreSQL variant of RMLTC0001b never had the rml:termType
rml:BlankNode subject since the original import into rml-core
(0ff3dc8), diverging from both R2RMLTC0001b and RMLTC0001b-JSON,
which generate a blank node subject as the test title states.</p></div><div style="display: flex; justify-content: flex-end; align-items: center; font-size: 0.85em;"><a href="https://github.com/arcangelo7/rml-io-registry/commit/bd51470b294e3e70fc09e17ecfeee828414f3568" style="color: #0969da; text-decoration: none; font-weight: 500;">bd51470</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Jul 3, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/arcangelo7/rml-io-registry" style="font-size: 0.85em; color: #0969da; text-decoration: none;">arcangelo7/rml-io-registry</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>test: restore delimited identifier scenario in RMLTC0002f-RDB</p>
<p>The PostgreSQL variant inherited from rml-core inverted the scenario
of R2RMLTC0002f: the DDL used regular identifiers while the mapping
referenced everything as delimited.</p>
<p>Restore the original design: delimited identifiers in the DDL and in
rml:iterator/rml:reference, regular identifiers only in the subject
template, which is the non-conforming reference under test.</p>
<p>Drop the &quot;Within rr:template ID is ok, but Name is not&quot; sentence from
the description: it only holds under standard SQL uppercase folding,
while PostgreSQL folds regular identifiers to lowercase and rejects
both references.</p>
<p>Note: RMLMapper v8.0.1 does not reject the non-conforming template and
materializes output for this mapping, exactly as it does for
R2RMLTC0002f.</p></div><div style="display: flex; justify-content: flex-end; align-items: center; font-size: 0.85em;"><a href="https://github.com/arcangelo7/rml-io-registry/commit/3a5411ffabab6854385dd247e827895d2f41a3cc" style="color: #0969da; text-decoration: none; font-weight: 500;">3a5411f</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Jul 3, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/arcangelo7/knowledge-graphs-inversion" style="font-size: 0.85em; color: #0969da; text-decoration: none;">arcangelo7/knowledge-graphs-inversion</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>feat(conformance): support rml io registry rdb tests</p>
<p>Switch the RML conformance suite to the rml-io-registry RDB fork and add handling for the new RML vocabulary used by those cases.</p></div><div style="display: flex; justify-content: flex-end; align-items: center; font-size: 0.85em;"><a href="https://github.com/arcangelo7/knowledge-graphs-inversion/commit/c2a27ed551e44b360ece5cfa000c029da2d8f80d" style="color: #0969da; text-decoration: none; font-weight: 500;">c2a27ed</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Jul 7, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/arcangelo7/knowledge-graphs-inversion" style="font-size: 0.85em; color: #0969da; text-decoration: none;">arcangelo7/knowledge-graphs-inversion</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>fix(benchmark): reduce redundant subject-map queries</p>
<p>KROWN Mappings scenarios repeat the same predicate-object maps across multiple subject templates. Reusing every equivalent subject group made the generated SPARQL query grow unnecessary</p>
<p>Select one reducible subject group per predicate-object signature before building the query, keep non-reducible groups, and publish the updated benchmark results.</p></div><div style="display: flex; justify-content: flex-end; align-items: center; font-size: 0.85em;"><a href="https://github.com/arcangelo7/knowledge-graphs-inversion/commit/77791667eb83d6c7aeea5d32f30f1bebdb66c205" style="color: #0969da; text-decoration: none; font-weight: 500;">7779166</a></div></div>

Let's take the case with 5 TM and 8 POM

```
TM1 subject {p1}, -> p1...p8
TM2 subject {p2}, -> p1...p8
...
TM5 subject {p5}, -> p1...p8
```

All columns used in the subjects, p1...p5, are already available as literal objects in every TM. We don't need 5 groups to rebuild the row. We can take only one representative subject map.

This optimization made mappings\_5\_8 go from 36,35s to 6,30s

***

I only considered the cases where TM < POM, otherwise it's impossible to associate a value to a specific TM and, therefore, to a specific column/row

```
TM1: subject /table/{p1}, -> p1 e p2
TM2: subject /table/{p2}, -> p1 e p2
TM3: subject /table/{p3}, -> p1 e p2
```

These three subject templates have the same structure. There is no way to understand from the graph that p3 comes from TM3.

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Jul 9, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/arcangelo7/knowledge-graphs-inversion" style="font-size: 0.85em; color: #0969da; text-decoration: none;">arcangelo7/knowledge-graphs-inversion</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>feat(benchmarks): add gtfs benchmark</p></div><div style="display: flex; justify-content: flex-end; align-items: center; font-size: 0.85em;"><a href="https://github.com/arcangelo7/knowledge-graphs-inversion/commit/454fe17f473f322cbb8de62590def2dc14b8a30e" style="color: #0969da; text-decoration: none; font-weight: 500;">454fe17</a></div></div>

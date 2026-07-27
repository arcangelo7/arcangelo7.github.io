---
title: index
editUrl: false
---

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Jul 25, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/arcangelo7/knowledge-graphs-inversion" style="font-size: 0.85em; color: #0969da; text-decoration: none;">arcangelo7/knowledge-graphs-inversion</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>feat(benchmarks): add the Datalog inversion engine to the KROWN runner</p></div><div style="display: flex; justify-content: flex-end; align-items: center; font-size: 0.85em;"><a href="https://github.com/arcangelo7/knowledge-graphs-inversion/commit/11b2946d8fa2eb97cec92c2bc92f56859282b4ff" style="color: #0969da; text-decoration: none; font-weight: 500;">11b2946</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Jul 26, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/arcangelo7/knowledge-graphs-inversion" style="font-size: 0.85em; color: #0969da; text-decoration: none;">arcangelo7/knowledge-graphs-inversion</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>feat(kgi): recover the columns a mapping exposes instead of rejecting it</p>
<p>Indistinguishable subject templates, graph maps built from the same pattern
and rr:column term maps with an IRI term type put values in the graph without
recording which column they came from. Each used to reject the whole mapping,
discarding columns that were perfectly recoverable: the KROWN named-graph
scenario with five graph maps recovers p1 over a million rows. Those columns
are now left out of the reconstruction, like columns a mapping never reads,
and the rest is recovered. Dropping them also collapses the interchangeable
triples maps into one query group, so the twenty of mappings_20_1 no longer
build a twenty-way self-join.</p>
<p>The graph map inverter emits one GRAPH clause per distinguishable graph map
instead of wrapping every pattern in the first one, which left four columns
unbound and turned a million source rows into five million.</p>
<p>KROWN gains the AMBIGUOUS outcome for a reconstruction that is sound but
misses columns the mapping reads, so the round trip is skipped instead of
failing on them. Ten scenarios move there from NON_INVERTIBLE, which none now
expects. A reconstructed column that is entirely NULL counts as not
reconstructed, so the two engines are compared on what they recovered; souffle
also needed the destination table created without the NOT NULL that LIKE
copies from the source primary key. Runs measured before an abort are saved
instead of being lost with the exception.</p></div><div style="display: flex; justify-content: flex-end; align-items: center; font-size: 0.85em;"><a href="https://github.com/arcangelo7/knowledge-graphs-inversion/commit/e2cac7e3ce39bb27ed4bad4c693ee518d4ba8a0b" style="color: #0969da; text-decoration: none; font-weight: 500;">e2cac7e</a></div></div>

### TODO

* La test bench non fare overshadowing

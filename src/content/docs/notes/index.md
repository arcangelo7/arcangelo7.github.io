---
title: index
editUrl: false
---

## La Novitade

### RAMOSE

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Apr 27, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/ramose" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/ramose</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>refactor(skgif): use full URIs as product identifiers instead of OMID shorthand</p></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+29</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-36</span><a href="https://github.com/opencitations/ramose/commit/00c8ee2f64ff85399553030a7331b803396ca38b" style="color: #0969da; text-decoration: none; font-weight: 500;">00c8ee2</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Apr 27, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/ramose" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/ramose</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>feat: add #default_format field to override CSV default per operation</p></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+133</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-6</span><a href="https://github.com/opencitations/ramose/commit/fffea47753486c152777ad07e4e7eb2437e20342" style="color: #0969da; text-decoration: none; font-weight: 500;">fffea47</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Apr 28, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/ramose" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/ramose</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>feat: add #custom_params field for addon-handled query parameters</p>
<p>Allow operations to declare custom query string parameters that are
processed by addon functions instead of the built-in pipeline. Each
parameter specifies a handler, processing phase (preprocess or
postprocess), and description.</p>
<p>Preprocess handlers generate SPARQL fragments injected via [[name]]
placeholders. Postprocess handlers transform the result table after
built-in filters. When a custom parameter name collides with a built-in
(filter, sort, require), the built-in behavior is disabled.</p></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+383</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-21</span><a href="https://github.com/opencitations/ramose/commit/4320f54ccb40bb1a6435dd6b28594b89b670ec56" style="color: #0969da; text-decoration: none; font-weight: 500;">4320f54</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Apr 28, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/ramose" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/ramose</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>feat(skgif): expand product filter with contributor and type criteria</p>
<p>Support filtering by contributor attributes (family name, given name,
ORCID, identifier scheme, local identifier, organization name) and by
product type.</p></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+196</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-90</span><a href="https://github.com/opencitations/ramose/commit/f805f4baab1b637ea0266b14672320506598c6d1" style="color: #0969da; text-decoration: none; font-weight: 500;">f805f4b</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Apr 28, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/ramose" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/ramose</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>test(skgif): validate converter output against SHACL shapes</p>
<p>Also, the converter now normalizes partial dates to full dates before output.</p></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+42</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-3</span><a href="https://github.com/opencitations/ramose/commit/b7adb1029c98e6b2928c8be1609c3cdf7a3d72ba" style="color: #0969da; text-decoration: none; font-weight: 500;">b7adb10</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Apr 29, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/ramose" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/ramose</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>feat(skgif): add citation filters via directive injection into query templates</p>
<p>Placeholders can be placed anywhere in the #sparql
block, and the engine resolves them before checking for @@ directives.</p>
<p>Four new citation filters (cf.cites, cf.cited_by, cf.cites_doi,
cf.cited_by_doi) use this mechanism to federate across Meta and Index
endpoints.</p></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+420</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-209</span><a href="https://github.com/opencitations/ramose/commit/5e159cb52e4b3f2ec22ad5d99350e3cc204fc85d" style="color: #0969da; text-decoration: none; font-weight: 500;">5e159cb</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Apr 29, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/ramose" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/ramose</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>fix(api_manager): return 400 instead of 404 for invalid parameter values</p>
<p>When an operation exists but the parameter value doesn&#39;t match the
expected type regex (e.g. a DOI where an ORCID is expected), the error
now correctly reports an invalid parameter (400) rather than a missing
operation (404). Empty parameters are also caught with a specific message.</p>
<p>Closes: #19</p></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+57</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-7</span><a href="https://github.com/opencitations/ramose/commit/f26a6c05d515d4c93cdb26ef34a9fcdef8e6ded7" style="color: #0969da; text-decoration: none; font-weight: 500;">f26a6c0</a></div></div>

### Meta

L'ingestione di OpenAlex è andata out of memory a causa del db Redis per i contatori di dati e provenance che ha superato i 100GB in RAM. Non è più sostenibile, conviene tornare al vecchio sistema basato su file. Vediamo di quanto degradano le performance. Al massimo sostituisco i file con un db relazionale.

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">May 1, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/oc_meta" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/oc_meta</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>refactor!: replace redis counters with filesystem-based counter handler</p></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+249</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-544</span><a href="https://github.com/opencitations/oc_meta/commit/a53d21beda3532ea060a47d144d9bc68316b9d59" style="color: #0969da; text-decoration: none; font-weight: 500;">a53d21b</a></div></div>

### Uno più uno

Posso fare come ho sempre fatto

```sparql
?br_uri datacite:hasIdentifier ?id .
?id literal:hasLiteralValue "9781402096327" .
```

Oppure posso usare un blank node

```sparql
?br_uri datacite:hasIdentifier [ literal:hasLiteralValue "9781402096327" ] .
```

### Triplelite

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">May 1, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/triplelite" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/triplelite</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>build: add initial _core.c with primitives (StringArray, RDFTermArray)</p>
<p>Also switch from hatchling to meson-python build system
to support C compilation</p></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+165</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-8</span><a href="https://github.com/opencitations/triplelite/commit/61505fbcf7021aeb78d282f85b85ca41dab513ec" style="color: #0969da; text-decoration: none; font-weight: 500;">61505fb</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">May 2, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/triplelite" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/triplelite</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>feat: add a chained hashmap (djb2)</p></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+163</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-63</span><a href="https://github.com/opencitations/triplelite/commit/81137f59cf34e2b134bec2a2166912e9c043ed10" style="color: #0969da; text-decoration: none; font-weight: 500;">81137f5</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">May 2, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/triplelite" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/triplelite</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>feat: add RDFTerm hashmap and string/RDFTerm interners</p></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+166</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-5</span><a href="https://github.com/opencitations/triplelite/commit/5e8256add7fc08d7efddc2a527165bb1264f848a" style="color: #0969da; text-decoration: none; font-weight: 500;">5e8256a</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">May 2, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/triplelite" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/triplelite</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>feat: add integer set and SPO triple index</p>
<p>Open-addressing IntSet with linear probing</p></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+378</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-0</span><a href="https://github.com/opencitations/triplelite/commit/2a40d65c7f7a51e6cc9b2e94553193af10468b6f" style="color: #0969da; text-decoration: none; font-weight: 500;">2a40d65</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">May 3, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/triplelite" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/triplelite</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>feat: implement TripleLite C extension with Python bindings</p>
<p>Expose the C engine as a CPython type with add, remove, triples,
objects, predicate_objects, subjects, and has_subject methods.
Supports <strong>len</strong>, <strong>contains</strong>, and <strong>iter</strong> via a custom
iterator that walks the SPO index.</p>
<p>Add memory ownership throughout: strdup in hashmap/dynarray/intset,
deep-copy for RDFTerm, and corresponding free functions for all
data structures.</p></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+904</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-151</span><a href="https://github.com/opencitations/triplelite/commit/606d2d4383a7f9a629a892496e0f01d2b2996239" style="color: #0969da; text-decoration: none; font-weight: 500;">606d2d4</a></div></div>

| Operazione         | Python           | C                | Rapporto           |
| ------------------ | ---------------- | ---------------- | ------------------ |
| add\_many          | 1.05M triple/s   | 19.8K triple/s   | C 53× piu lento    |
| add\_single        | 991K triple/s    | 17.9K triple/s   | C 55× piu lento    |
| predicate\_objects | 1.14 μs/chiamata | 819 μs/chiamata  | C 719× piu lento   |
| subjects           | 0.75 μs/chiamata | 156 μs/chiamata  | C 209× piu lento   |
| objects            | 0.78 μs/chiamata | 990 μs/chiamata  | C 1.269× piu lento |
| has\_subject       | 0.14 μs/chiamata | 71.5 μs/chiamata | C 502× piu lento   |
| contains           | 0.50 μs/chiamata | 143 μs/chiamata  | C 286× piu lento   |
| full\_scan         | 4.56M triple/s   | 2.05M triple/s   | C 2.2× piu lento   |

| Python            | C                 | Rapporto       |
| ----------------- | ----------------- | -------------- |
| 373.0 byte/tripla | 295.2 byte/tripla | C 1.3× in meno |

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">May 3, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/triplelite" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/triplelite</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>perf: add dynamic resizing to all hash tables and optimize query lookups</p></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+265</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-39</span><a href="https://github.com/opencitations/triplelite/commit/d266629b0fac9bca3ca5dc668e226a0c162ea673" style="color: #0969da; text-decoration: none; font-weight: 500;">d266629</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">May 3, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/triplelite" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/triplelite</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>perf: replace chained hash tables with open-addressing</p></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+708</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-819</span><a href="https://github.com/opencitations/triplelite/commit/b0bc371004598daf618581208ea27111c74e140f" style="color: #0969da; text-decoration: none; font-weight: 500;">b0bc371</a></div></div>

| Operazione         | Python           | C                | Rapporto          |
| ------------------ | ---------------- | ---------------- | ----------------- |
| add\_many          | 1.07M triple/s   | 2.16M triple/s   | C 2.0× più veloce |
| add\_single        | 1.00M triple/s   | 1.24M triple/s   | C 1.2× più veloce |
| predicate\_objects | 1.38 μs/chiamata | 2.13 μs/chiamata | C 0.7×            |
| subjects           | 0.76 μs/chiamata | 0.80 μs/chiamata | C 0.9×            |
| objects            | 0.79 μs/chiamata | 1.01 μs/chiamata | C 0.8×            |
| has\_subject       | 0.14 μs/chiamata | 0.14 μs/chiamata | C 1.0×            |
| contains           | 0.42 μs/chiamata | 0.52 μs/chiamata | C 0.8×            |
| subgraph           | 1.58 μs/chiamata | 3.80 μs/chiamata | C 0.4×            |
| full\_scan         | 5.68M triple/s   | 2.47M triple/s   | C 0.4×            |

| Python            | C                 | Rapporto       |
| ----------------- | ----------------- | -------------- |
| 373.0 byte/tripla | 167.6 byte/tripla | C 2.2× in meno |

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">May 3, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/triplelite" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/triplelite</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>ci: add cross-platform wheel builds</p>
<p>Replace single-platform uv build with cibuildwheel for building wheels
across Linux (x86_64, aarch64, musl), macOS (x86_64, arm64), and
Windows (AMD64, ARM64) for Python 3.10-3.13.</p>
<p>Add multi-OS matrix to test workflow.</p></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+88</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-11</span><a href="https://github.com/opencitations/triplelite/commit/0bb61b5fc6774aacc38b6bd5f848d96f6535ba23" style="color: #0969da; text-decoration: none; font-weight: 500;">0bb61b5</a></div></div>

\##Domande

* In Matilda ci sono tante risorse identificate solo dall'id arXiv, non riconciliato al DOI della versione pubblicata. Va bene così?
* SKG-IF impose [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime per le date. Significa che ci vuole anche ora, minuti e secondi. Va bene così?
* [https://github.com/opencitations/ramose/issues/2](https://github.com/opencitations/ramose/issues/2)?
* Ilaria
* Peffomance? [https://swsa.semanticweb.org/content/swsa-distinguished-dissertation-award](https://swsa.semanticweb.org/content/swsa-distinguished-dissertation-award)
* Articolo ISWC
* Elia, quando hai corretto la provenance hai verificato che tutte le entità nei dati avessero degli snapshot di provenance? Gli OMID consecutivi 0624010177378–0624010177388 e 0624010177865–0624010177868 non hanno snapshot di provenance. Sono vecchi perché non uso più prefissi diversi da 060 da due dump.
* w3id

## Memo

Aldrovandi

* Ai related works c'è da aggiungere l'articolo su chad kg
* Articolo del Twin

Vizioso

* [https://en.wikipedia.org/wiki/Compilers:\_Principles,\_Techniques,\_and\_Tools](https://en.wikipedia.org/wiki/Compilers:_Principles,_Techniques,_and_Tools)
* [https://en.wikipedia.org/wiki/GNU\_Bison](https://en.wikipedia.org/wiki/GNU_Bison)
* [https://en.wikipedia.org/wiki/Yacc](https://en.wikipedia.org/wiki/Yacc)

HERITRACE

* C'è un bug che si verifica quando uno seleziona un'entità preesistente, poi clicca sulla X e inserisce i metadati a mano. Alcuni metadati vengono duplicati.
* Se uno ripristina una sotto entità a seguito di un merge, l'entità principale potrebbe rompersi.
* Per risolvere le performance del time-vault non usare la time-agnostic-library, ma guarda solo la query di update dello snapshot di cancellazione.
* Ordine dato all’indice dell’elemento
* date: formato
* anni: essere meno stretto sugli anni. Problema ISO per 999. 0999?
* Opzione per evitare counting
* Opzione per non aggiungere la lista delle risorse, che posso comunque essere cercate
* Configurabilità troppa fatica
* Timer massimo. Timer configurabile. Messaggio in caso si stia per toccare il timer massimo.
* Riflettere su @lang. SKOS come use case. skos:prefLabel, skos:altLabel
* Possibilità di specificare l’URI a mano in fase di creazione
* la base è non specificare la sorgente, perché non sarà mai quella iniziale.
* desvription con l'entità e stata modificata. Tipo commit
* display name è References Cited by VA bene
* Avvertire l'utente del disastro imminente nel caso in cui provi a cancellare un volume

Meta

* Matilda e OUTCITE nella prossima versione
  * Da definire le sorgenti
  * Va su Trello
* Bisogna produrre la tabella che associa temp a OMID per produrre le citazioni.
* Rilanciare processo eliminazione duplicati
* Fusione: chi ha più metadati compilati. A parità di metadato si tiene l’omid più basso
* frbr:partOf non deve aggiungere nel merge: [https://opencitations.net/meta/api/v1/metadata/omid:br/06304322094](https://opencitations.net/meta/api/v1/metadata/omid:br/06304322094)
* API v2
* Usare il triplestore di provenance per fare 303 in caso di entità mergiate o mostrare la provenance in caso di cancellazione e basta.

oc\_ocdm

* Automatizzare mark\_as\_restored di default. è possibile disabilitare e fare a mano mark\_as\_restored.
* [https://opencitations.net/meta/api/v1/metadata/doi:10.1093/acprof:oso/9780199977628.001.0001](https://opencitations.net/meta/api/v1/metadata/doi:10.1093/acprof:oso/9780199977628.001.0001)
* DELETE con variabile
* Modificare Meta sulla base della tabella di Elia
* embodiment multipli devono essere purgati a monte
* Modificare documentazione API aggiungendo omid

RML

* Vedere come morh kgc rappresenta database internamente
* [https://github.com/oeg-upm/gtfs-bench](https://github.com/oeg-upm/gtfs-bench)
* Chiedere Ionannisil diagramma che ha usato per auto rml.

Crowdsourcing

* Quando dobbiamo ingerire Crossref stoppo manualmente OJS. Si mette una nota nel repository per dire le cose. Ogni mese.
* Aggiornamenti al dump incrementali. Si usa un nuovo prefisso e si aggiungono dati solo a quel CSV.
* Bisogna usare il DOI di Zenodo come primary source. Un unico DOI per batch process.
* Bisogna fare l’aggiornamento sulla copia e poi bisogna automatizzare lo switch

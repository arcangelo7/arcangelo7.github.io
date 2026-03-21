---
title: 2026-02-12 TAL vs OSTRICH
editUrl: false
---

### time-agnostic-library

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
    <img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" />
    <div>
      <strong style="display: block; color: #1f2328;">arcangelo7</strong>
      <span style="font-size: 0.85em; color: #656d76;">Feb 6, 2026</span>
      <span style="font-size: 0.85em; color: #656d76;"> · </span>
      <a href="https://github.com/opencitations/time-agnostic-library" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/time-agnostic-library</a>
    </div>
  </div>
  <div style="margin: 12px 0; color: #1f2328;">
    <p>fix: handle language-tagged literals and safe triple removal</p>
<p>Add language tag comparison in match_literal to prevent false matches
between literals with different xml:lang values. Materialize triple list
before removal to avoid unsafe iteration on Dataset. Add xml:lang
support when processing SELECT query results.</p>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
    <span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+21</span>
    <span style="font-family: monospace; color: #cf222e; font-weight: 600;">-17</span>
    <a href="https://github.com/opencitations/time-agnostic-library/commit/ed38d749f4b32a6c317e275511363a74d7a9de36" style="color: #0969da; text-decoration: none; font-weight: 500;">ed38d74</a>
  </div>
</div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
    <img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" />
    <div>
      <strong style="display: block; color: #1f2328;">arcangelo7</strong>
      <span style="font-size: 0.85em; color: #656d76;">Feb 6, 2026</span>
      <span style="font-size: 0.85em; color: #656d76;"> · </span>
      <a href="https://github.com/opencitations/time-agnostic-library" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/time-agnostic-library</a>
    </div>
  </div>
  <div style="margin: 12px 0; color: #1f2328;">
    <p>feat: add BEAR benchmark suite with QLever backend</p>
<p>Add BEAR-B-daily benchmark scripts for evaluating time-agnostic-library
against published results. Includes data download, OCDM conversion,
query parsing, benchmark execution, result verification, and analysis.
Add rich and qlever dependencies.</p>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
    <span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+1700</span>
    <span style="font-family: monospace; color: #cf222e; font-weight: 600;">-644</span>
    <a href="https://github.com/opencitations/time-agnostic-library/commit/49975fb71c1f0fa4fefe87c9264a27d79b952c50" style="color: #0969da; text-decoration: none; font-weight: 500;">49975fb</a>
  </div>
</div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
    <img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" />
    <div>
      <strong style="display: block; color: #1f2328;">arcangelo7</strong>
      <span style="font-size: 0.85em; color: #656d76;">Feb 6, 2026</span>
      <span style="font-size: 0.85em; color: #656d76;"> · </span>
      <a href="https://github.com/opencitations/time-agnostic-library" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/time-agnostic-library</a>
    </div>
  </div>
  <div style="margin: 12px 0; color: #1f2328;">
    <p>feat: add include_all_timestamps option to VersionQuery</p>
<p>Cross-version VersionQuery now supports an include_all_timestamps
parameter that fills gaps between snapshot timestamps by querying
all prov:generatedAtTime values and carrying forward results from
the nearest earlier timestamp</p>
<p>Also refactors Literal
serialization in _query_reconstructed_graph to use .n3().</p>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
    <span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+57</span>
    <span style="font-family: monospace; color: #cf222e; font-weight: 600;">-11</span>
    <a href="https://github.com/opencitations/time-agnostic-library/commit/4d703a1c4ea00d9a60188eb6e6f1cdcbc8a67da1" style="color: #0969da; text-decoration: none; font-weight: 500;">4d703a1</a>
  </div>
</div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
    <img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" />
    <div>
      <strong style="display: block; color: #1f2328;">arcangelo7</strong>
      <span style="font-size: 0.85em; color: #656d76;">Feb 6, 2026</span>
      <span style="font-size: 0.85em; color: #656d76;"> · </span>
      <a href="https://github.com/opencitations/time-agnostic-library" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/time-agnostic-library</a>
    </div>
  </div>
  <div style="margin: 12px 0; color: #1f2328;">
    <p>feat: switch VersionQuery results to SPARQL JSON bindings format</p>
<p>VersionQuery.run_agnostic_query() now returns Dict[str, List[Dict]]
instead of Dict[str, Set[Tuple]], using the W3C SPARQL JSON Results
bindings format which preserves type information (URI vs literal),
language tags, and datatypes. Unbound OPTIONAL variables are omitted
from bindings rather than appearing as None.</p>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
    <span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+188</span>
    <span style="font-family: monospace; color: #cf222e; font-weight: 600;">-126</span>
    <a href="https://github.com/opencitations/time-agnostic-library/commit/514c93d4dd8614d3ab8d0963771a42aba9fbeb7e" style="color: #0969da; text-decoration: none; font-weight: 500;">514c93d</a>
  </div>
</div>
<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
    <img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" />
    <div>
      <strong style="display: block; color: #1f2328;">arcangelo7</strong>
      <span style="font-size: 0.85em; color: #656d76;">Feb 6, 2026</span>
      <span style="font-size: 0.85em; color: #656d76;"> · </span>
      <a href="https://github.com/opencitations/time-agnostic-library" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/time-agnostic-library</a>
    </div>
  </div>
  <div style="margin: 12px 0; color: #1f2328;">
    <p>build!: migrate from Poetry to uv and drop Python 3.9</p>
<p>BREAKING CHANGE: Python 3.9 is no longer supported. Minimum required
version is now Python 3.10.</p>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
    <span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+1185</span>
    <span style="font-family: monospace; color: #cf222e; font-weight: 600;">-1523</span>
    <a href="https://github.com/opencitations/time-agnostic-library/commit/866c7e6e6b7199d81935d2ed14da5a9de429dab1" style="color: #0969da; text-decoration: none; font-weight: 500;">866c7e6</a>
  </div>
</div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
    <img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" />
    <div>
      <strong style="display: block; color: #1f2328;">arcangelo7</strong>
      <span style="font-size: 0.85em; color: #656d76;">Feb 6, 2026</span>
      <span style="font-size: 0.85em; color: #656d76;"> · </span>
      <a href="https://github.com/opencitations/time-agnostic-library" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/time-agnostic-library</a>
    </div>
  </div>
  <div style="margin: 12px 0; color: #1f2328;">
    <p>docs: migrate documentation from Sphinx to Astro Starlight</p>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
    <span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+7122</span>
    <span style="font-family: monospace; color: #cf222e; font-weight: 600;">-1171</span>
    <a href="https://github.com/opencitations/time-agnostic-library/commit/22c6adc96c3a2647899847efb563451987065e8b" style="color: #0969da; text-decoration: none; font-weight: 500;">22c6adc</a>
  </div>
</div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
    <img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" />
    <div>
      <strong style="display: block; color: #1f2328;">arcangelo7</strong>
      <span style="font-size: 0.85em; color: #656d76;">Feb 7, 2026</span>
      <span style="font-size: 0.85em; color: #656d76;"> · </span>
      <a href="https://github.com/opencitations/time-agnostic-library" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/time-agnostic-library</a>
    </div>
  </div>
  <div style="margin: 12px 0; color: #1f2328;">
    <p>refactor: optimize query performance and remove unused features</p>
<p>Cache datetime parsing with lru_cache, pre-sort timestamps outside
loops, replace string concatenation with list join, and cache
prov properties at class level. Remove _cut_by_limit, _hack_dates,
and cache_triplestore_url references.</p>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
    <span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+126</span>
    <span style="font-family: monospace; color: #cf222e; font-weight: 600;">-258</span>
    <a href="https://github.com/opencitations/time-agnostic-library/commit/a5a3f4910c8ed21cd1e701e24621c967f2f77f59" style="color: #0969da; text-decoration: none; font-weight: 500;">a5a3f49</a>
  </div>
</div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
    <img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" />
    <div>
      <strong style="display: block; color: #1f2328;">arcangelo7</strong>
      <span style="font-size: 0.85em; color: #656d76;">Feb 7, 2026</span>
      <span style="font-size: 0.85em; color: #656d76;"> · </span>
      <a href="https://github.com/opencitations/time-agnostic-library" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/time-agnostic-library</a>
    </div>
  </div>
  <div style="margin: 12px 0; color: #1f2328;">
    <p>perf: replace pyparsing-based SPARQL UPDATE parser with regex</p>
<p>rdflib&#39;s parser.parseUpdate() uses pyparsing which takes 34.6s for
an exemplar BEAR benchmark queries. The new regex-based parser handles the
same OCDM query format in 2.2s (16x faster).</p>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
    <span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+163</span>
    <span style="font-family: monospace; color: #cf222e; font-weight: 600;">-162</span>
    <a href="https://github.com/opencitations/time-agnostic-library/commit/572ba474236be1af4fad635e8ab2c60a7feb364a" style="color: #0969da; text-decoration: none; font-weight: 500;">572ba47</a>
  </div>
</div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
    <img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" />
    <div>
      <strong style="display: block; color: #1f2328;">arcangelo7</strong>
      <span style="font-size: 0.85em; color: #656d76;">Feb 7, 2026</span>
      <span style="font-size: 0.85em; color: #656d76;"> · </span>
      <a href="https://github.com/opencitations/time-agnostic-library" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/time-agnostic-library</a>
    </div>
  </div>
  <div style="margin: 12px 0; color: #1f2328;">
    <p>perf: replace ThreadPoolExecutor with ProcessPoolExecutor on Linux</p>
<p>Use forkserver-based ProcessPoolExecutor on Linux for true multi-core
parallelism in entity reconstruction and delta identification. Fall back
to ThreadPoolExecutor on Windows where fork is unavailable.</p>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
    <span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+125</span>
    <span style="font-family: monospace; color: #cf222e; font-weight: 600;">-85</span>
    <a href="https://github.com/opencitations/time-agnostic-library/commit/62710873ea6602f51634b4cd1d2f2b892da6cdfb" style="color: #0969da; text-decoration: none; font-weight: 500;">6271087</a>
  </div>
</div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
    <img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" />
    <div>
      <strong style="display: block; color: #1f2328;">arcangelo7</strong>
      <span style="font-size: 0.85em; color: #656d76;">Feb 8, 2026</span>
      <span style="font-size: 0.85em; color: #656d76;"> · </span>
      <a href="https://github.com/opencitations/time-agnostic-library" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/time-agnostic-library</a>
    </div>
  </div>
  <div style="margin: 12px 0; color: #1f2328;">
    <p>refactor: replace CONSTRUCT queries with SELECT for faster SPARQL execution</p>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
    <span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+94</span>
    <span style="font-family: monospace; color: #cf222e; font-weight: 600;">-226</span>
    <a href="https://github.com/opencitations/time-agnostic-library/commit/5579b6ca75d96e4d564f368e3943d457879e0c1e" style="color: #0969da; text-decoration: none; font-weight: 500;">5579b6c</a>
  </div>
</div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
    <img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" />
    <div>
      <strong style="display: block; color: #1f2328;">arcangelo7</strong>
      <span style="font-size: 0.85em; color: #656d76;">Feb 8, 2026</span>
      <span style="font-size: 0.85em; color: #656d76;"> · </span>
      <a href="https://github.com/opencitations/time-agnostic-library" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/time-agnostic-library</a>
    </div>
  </div>
  <div style="margin: 12px 0; color: #1f2328;">
    <p>perf: simplify provenance query and remove DISTINCT from all internal queries</p>
<p>Use a lightweight SPARQL query with a single OPTIONAL when
include_prov_metadata is False, skipping unnecessary joins and
OPTIONAL clauses. Remove DISTINCT from all internal SELECT queries
since results are consumed by Python sets. Replace pyparsing-based
parseUpdate with regex-based _fast_parse_update in AgnosticQuery
and DeltaQuery.</p>
<p>BREAKING CHANGE: get_state_at_time returns empty entity_snapshots
dict when include_prov_metadata is False.</p>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
    <span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+90</span>
    <span style="font-family: monospace; color: #cf222e; font-weight: 600;">-120</span>
    <a href="https://github.com/opencitations/time-agnostic-library/commit/beb91a794d41c296aaa1e6be3bb739d98eba36d9" style="color: #0969da; text-decoration: none; font-weight: 500;">beb91a7</a>
  </div>
</div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
    <img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" />
    <div>
      <strong style="display: block; color: #1f2328;">arcangelo7</strong>
      <span style="font-size: 0.85em; color: #656d76;">Feb 8, 2026</span>
      <span style="font-size: 0.85em; color: #656d76;"> · </span>
      <a href="https://github.com/opencitations/time-agnostic-library" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/time-agnostic-library</a>
    </div>
  </div>
  <div style="margin: 12px 0; color: #1f2328;">
    <p>feat(benchmark): add OSTRICH comparison and ingestion timing</p>
<p>Add setup and benchmark runner for OSTRICH via Docker, enabling
head-to-head comparison on the same hardware. Measure ingestion
times for both OCDM conversion and QLever indexing.</p>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
    <span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+380</span>
    <span style="font-family: monospace; color: #cf222e; font-weight: 600;">-7</span>
    <a href="https://github.com/opencitations/time-agnostic-library/commit/67844cc80c1d39207084a73157f330003c07f84b" style="color: #0969da; text-decoration: none; font-weight: 500;">67844cc</a>
  </div>
</div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
    <img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" />
    <div>
      <strong style="display: block; color: #1f2328;">arcangelo7</strong>
      <span style="font-size: 0.85em; color: #656d76;">Feb 9, 2026</span>
      <span style="font-size: 0.85em; color: #656d76;"> · </span>
      <a href="https://github.com/opencitations/time-agnostic-library" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/time-agnostic-library</a>
    </div>
  </div>
  <div style="margin: 12px 0; color: #1f2328;">
    <p>perf: stream cross-version VersionQuery to avoid O(N) dataset copies</p>
<p>For isolated cross-version queries, fuse materialization and query
execution: maintain one mutable graph per entity, apply deltas
incrementally, and extract bindings at each step. This reduces memory
from O(N * graph_size * entities) to O(graph_size + N * bindings_size).</p>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
    <span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+97</span>
    <span style="font-family: monospace; color: #cf222e; font-weight: 600;">-23</span>
    <a href="https://github.com/opencitations/time-agnostic-library/commit/15c0bb23ef99d3b382d1e0cedbdfaa93ed663a05" style="color: #0969da; text-decoration: none; font-weight: 500;">15c0bb2</a>
  </div>
</div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
    <img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" />
    <div>
      <strong style="display: block; color: #1f2328;">arcangelo7</strong>
      <span style="font-size: 0.85em; color: #656d76;">Feb 9, 2026</span>
      <span style="font-size: 0.85em; color: #656d76;"> · </span>
      <a href="https://github.com/opencitations/time-agnostic-library" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/time-agnostic-library</a>
    </div>
  </div>
  <div style="margin: 12px 0; color: #1f2328;">
    <p>feat: extract OCDM converter into reusable library module</p>
<p>Move conversion logic from benchmark script into
src/time_agnostic_library/ocdm_converter.py with OCDMConverter class
supporting both IC (independent copies) and CB (change-based) strategies.
Refactor convert_to_ocdm.py as thin wrapper with --strategy ic|cb flag.
Add documentation page for the new module.</p>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
    <span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+497</span>
    <span style="font-family: monospace; color: #cf222e; font-weight: 600;">-270</span>
    <a href="https://github.com/opencitations/time-agnostic-library/commit/9c8cee8d2eaaa07eea2227fec28a7d55a9d46b37" style="color: #0969da; text-decoration: none; font-weight: 500;">9c8cee8</a>
  </div>
</div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
    <img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" />
    <div>
      <strong style="display: block; color: #1f2328;">arcangelo7</strong>
      <span style="font-size: 0.85em; color: #656d76;">Feb 10, 2026</span>
      <span style="font-size: 0.85em; color: #656d76;"> · </span>
      <a href="https://github.com/opencitations/time-agnostic-library" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/time-agnostic-library</a>
    </div>
  </div>
  <div style="margin: 12px 0; color: #1f2328;">
    <p>perf: batch SPARQL queries and set-based reconstruction for VM/VQ/DM</p>
<p>Add thread-local SPARQLClient connection pooling to reuse TCP
connections across queries. Batch provenance and dataset queries using
VALUES clause to reduce per-entity round-trips. Run entity discovery
and data fetching in parallel via ThreadPoolExecutor. Replace rdflib
Dataset operations with Python set-based version reconstruction and
direct triple pattern matching for single isolated patterns.</p>
<p>Optimize FILTER CONTAINS entity discovery by returning entities
directly via specializationOf join. Batch DM provenance and existence
queries. Remove VQ subprocess isolation in run_benchmark.py.</p>
<p>Add timing measurements and baseline comparison to verify_results.py
(--save-baseline / --compare flags).</p>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
    <span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+492</span>
    <span style="font-family: monospace; color: #cf222e; font-weight: 600;">-94</span>
    <a href="https://github.com/opencitations/time-agnostic-library/commit/8bd7bf11d99728d505be54640ce955d42d3368b6" style="color: #0969da; text-decoration: none; font-weight: 500;">8bd7bf1</a>
  </div>
</div>

![Pasted image 20260211190131.png](../../../../assets/notes/attachments/pasted-image-20260211190131.png)
![Pasted image 20260211190143.png](../../../../assets/notes/attachments/pasted-image-20260211190143.png)

### Non di solo Aldrovandi vive l'uomo

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
    <img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" />
    <div>
      <strong style="display: block; color: #1f2328;">arcangelo7</strong>
      <span style="font-size: 0.85em; color: #656d76;">Feb 5, 2026</span>
      <span style="font-size: 0.85em; color: #656d76;"> · </span>
      <a href="https://github.com/dharc-org/changes-metadata-manager" style="font-size: 0.85em; color: #0969da; text-decoration: none;">dharc-org/changes-metadata-manager</a>
    </div>
  </div>
  <div style="margin: 12px 0; color: #1f2328;">
    <p>refactor: remove 98a/b/c folder grouping after unification</p>
<p>The S6-98a/b/c-DA-Calchi facciali colorati folders have been
unified into a single S6-98 folder on SharePoint, removing the
need for grouped entity mapping in the code</p>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
    <span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+1574</span>
    <span style="font-family: monospace; color: #cf222e; font-weight: 600;">-1465</span>
    <a href="https://github.com/dharc-org/changes-metadata-manager/commit/05821a1363aeb09df2077656c806a9b5d6b7e99e" style="color: #0969da; text-decoration: none; font-weight: 500;">05821a1</a>
  </div>
</div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
    <img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" />
    <div>
      <strong style="display: block; color: #1f2328;">arcangelo7</strong>
      <span style="font-size: 0.85em; color: #656d76;">Feb 8, 2026</span>
      <span style="font-size: 0.85em; color: #656d76;"> · </span>
      <a href="https://github.com/skg-if/shacl-extractor" style="font-size: 0.85em; color: #0969da; text-decoration: none;">skg-if/shacl-extractor</a>
    </div>
  </div>
  <div style="margin: 12px 0; color: #1f2328;">
    <p>refactor!: generalize tool to support any OWL ontology</p>
<p>Replace SKG-IF-specific logic with a generic approach that supports
any OWL ontology using the dc:description property pattern. The tool
now accepts single files, directories, and URLs as input.</p>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
    <span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+1280</span>
    <span style="font-family: monospace; color: #cf222e; font-weight: 600;">-416</span>
    <a href="https://github.com/skg-if/shacl-extractor/commit/c1b8691a374fdff6a8e0eb61c6aaf8cfd291fb7b" style="color: #0969da; text-decoration: none; font-weight: 500;">c1b8691</a>
  </div>
</div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
    <img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" />
    <div>
      <strong style="display: block; color: #1f2328;">arcangelo7</strong>
      <span style="font-size: 0.85em; color: #656d76;">Feb 11, 2026</span>
      <span style="font-size: 0.85em; color: #656d76;"> · </span>
      <a href="https://github.com/opencitations/time-agnostic-library" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/time-agnostic-library</a>
    </div>
  </div>
  <div style="margin: 12px 0; color: #1f2328;">
    <p>perf: replace rdflib Dataset with N3 string sets for internal state</p>
<p>Internal entity state is now stored as set[tuple[str, ...]] of N3-formatted
strings instead of rdflib Dataset objects. Datasets are only materialized
at public API boundaries. This eliminates rdflib&#39;s overhead for graph
manipulation during version reconstruction, replacing Dataset.add/remove
with set.add/discard and Dataset copy with set copy.</p>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
    <span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+356</span>
    <span style="font-family: monospace; color: #cf222e; font-weight: 600;">-462</span>
    <a href="https://github.com/opencitations/time-agnostic-library/commit/3e698ac84fa7211abbe09f59456b9200dcc1b5ac" style="color: #0969da; text-decoration: none; font-weight: 500;">3e698ac</a>
  </div>
</div>

### Domande

* OC Spider

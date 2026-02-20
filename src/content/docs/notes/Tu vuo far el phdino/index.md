---
title: index
editUrl: false
---

## La Novitade

### Difesa

[https://defence.arcangelomassari.com](https://defence.arcangelomassari.com)

### time-agnostic-library

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
    <img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" />
    <div>
      <strong style="display: block; color: #1f2328;">arcangelo7</strong>
      <span style="font-size: 0.85em; color: #656d76;">Feb 12, 2026</span>
      <span style="font-size: 0.85em; color: #656d76;"> · </span>
      <a href="https://github.com/opencitations/time-agnostic-library" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/time-agnostic-library</a>
    </div>
  </div>
  <div style="margin: 12px 0; color: #1f2328;">
    <p>refactor!: replace python-dateutil with datetime.fromisoformat</p>
<p>BREAKING CHANGE: date/time values must now be in ISO 8601 format.
Non-ISO formats (e.g., &quot;May 21, 2021&quot;) are no longer accepted.</p>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
    <span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+8</span>
    <span style="font-family: monospace; color: #cf222e; font-weight: 600;">-8</span>
    <a href="https://github.com/opencitations/time-agnostic-library/commit/7f2bf309df4e7508eae613aa5e882a3118e9bb8c" style="color: #0969da; text-decoration: none; font-weight: 500;">7f2bf30</a>
  </div>
</div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
    <img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" />
    <div>
      <strong style="display: block; color: #1f2328;">arcangelo7</strong>
      <span style="font-size: 0.85em; color: #656d76;">Feb 14, 2026</span>
      <span style="font-size: 0.85em; color: #656d76;"> · </span>
      <a href="https://github.com/opencitations/heritrace" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/heritrace</a>
    </div>
  </div>
  <div style="margin: 12px 0; color: #1f2328;">
    <p>build!: adapt to time-agnostic-library v6.0.0</p>
<p>The library now returns N3-encoded string tuples instead of RDFLib
Graph/Dataset objects from get_history() and get_state_at_time().
Add converter functions at the boundary to restore RDFLib objects
for downstream code. Remove cache_endpoint and cache_update_endpoint
parameters dropped from generate_config_file().</p>
<p>BREAKING CHANGE: requires time-agnostic-library &gt;= 6.0.0</p>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
    <span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+94</span>
    <span style="font-family: monospace; color: #cf222e; font-weight: 600;">-84</span>
    <a href="https://github.com/opencitations/heritrace/commit/947b6ee4f46219e32dfc2f1102301a85313b3a63" style="color: #0969da; text-decoration: none; font-weight: 500;">947b6ee</a>
  </div>
</div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
    <img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" />
    <div>
      <strong style="display: block; color: #1f2328;">arcangelo7</strong>
      <span style="font-size: 0.85em; color: #656d76;">Feb 18, 2026</span>
      <span style="font-size: 0.85em; color: #656d76;"> · </span>
      <a href="https://github.com/opencitations/time-agnostic-library" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/time-agnostic-library</a>
    </div>
  </div>
  <div style="margin: 12px 0; color: #1f2328;">
    <p>feat(benchmark): add disk usage tracking and per-query memory measurement</p>
<p>Replace resource.getrusage with tracemalloc for per-query peak memory
tracking. Add timestamped run files with query-level resume support.
Record OCDM, QLever, and OSTRICH disk usage from setup scripts.
Add storage comparison and memory comparison plots to analysis.</p>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
    <span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+280</span>
    <span style="font-family: monospace; color: #cf222e; font-weight: 600;">-64</span>
    <a href="https://github.com/opencitations/time-agnostic-library/commit/200ff4f985f49ebb4e187b4f8433e687dd8f6d5f" style="color: #0969da; text-decoration: none; font-weight: 500;">200ff4f</a>
  </div>
</div>

### HERITRACE

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
    <img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" />
    <div>
      <strong style="display: block; color: #1f2328;">arcangelo7</strong>
      <span style="font-size: 0.85em; color: #656d76;">Feb 14, 2026</span>
      <span style="font-size: 0.85em; color: #656d76;"> · </span>
      <a href="https://github.com/opencitations/heritrace" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/heritrace</a>
    </div>
  </div>
  <div style="margin: 12px 0; color: #1f2328;">
    <p>feat: replace Flask dev server with Gunicorn</p>
<p>Use Gunicorn as WSGI server in both development and production.
Workers and timeout are configurable via GUNICORN_WORKERS and
GUNICORN_TIMEOUT env vars, defaulting to (2 * CPU + 1) workers.
Dev environment generates self-signed SSL certs and runs with
--reload.</p>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
    <span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+133</span>
    <span style="font-family: monospace; color: #cf222e; font-weight: 600;">-16</span>
    <a href="https://github.com/opencitations/heritrace/commit/626b26634d89538aec89e2f8fb904105ac1d2d68" style="color: #0969da; text-decoration: none; font-weight: 500;">626b266</a>
  </div>
</div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
    <img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" />
    <div>
      <strong style="display: block; color: #1f2328;">arcangelo7</strong>
      <span style="font-size: 0.85em; color: #656d76;">Feb 14, 2026</span>
      <span style="font-size: 0.85em; color: #656d76;"> · </span>
      <a href="https://github.com/opencitations/heritrace" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/heritrace</a>
    </div>
  </div>
  <div style="margin: 12px 0; color: #1f2328;">
    <p>build: migrate from Poetry to uv</p>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
    <span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+1330</span>
    <span style="font-family: monospace; color: #cf222e; font-weight: 600;">-1687</span>
    <a href="https://github.com/opencitations/heritrace/commit/eef1f775e6aaa4bc4020c5c6224afa1ba50a41e5" style="color: #0969da; text-decoration: none; font-weight: 500;">eef1f77</a>
  </div>
</div>

### Aldrovandi

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
    <img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" />
    <div>
      <strong style="display: block; color: #1f2328;">arcangelo7</strong>
      <span style="font-size: 0.85em; color: #656d76;">Feb 14, 2026</span>
      <span style="font-size: 0.85em; color: #656d76;"> · </span>
      <a href="https://github.com/dharc-org/changes-metadata-manager" style="font-size: 0.85em; color: #0969da; text-decoration: none;">dharc-org/changes-metadata-manager</a>
    </div>
  </div>
  <div style="margin: 12px 0; color: #1f2328;">
    <p>feat: add SHACL validation of generated metadata against CHAD-AP shapes</p>
<p>Validate each stage&#39;s metadata against SHACL shapes during folder
processing and report non-conforming stages at the end. Add pyshacl
dependency and type annotations to generate_provenance_snapshots.</p>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
    <span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+387</span>
    <span style="font-family: monospace; color: #cf222e; font-weight: 600;">-4</span>
    <a href="https://github.com/dharc-org/changes-metadata-manager/commit/a4825b56526a9c247d389e8980c9a71329418452" style="color: #0969da; text-decoration: none; font-weight: 500;">a4825b5</a>
  </div>
</div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
    <img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" />
    <div>
      <strong style="display: block; color: #1f2328;">arcangelo7</strong>
      <span style="font-size: 0.85em; color: #656d76;">Feb 14, 2026</span>
      <span style="font-size: 0.85em; color: #656d76;"> · </span>
      <a href="https://github.com/dharc-org/changes-metadata-manager" style="font-size: 0.85em; color: #0969da; text-decoration: none;">dharc-org/changes-metadata-manager</a>
    </div>
  </div>
  <div style="margin: 12px 0; color: #1f2328;">
    <p>feat(zenodo): add CC0 Italian cultural heritage law disclaimer</p>
<p>Append a disclaimer about Italian cultural heritage regulations
to Zenodo descriptions for CC0-licensed content. Fix license
identifier assertion and add not-None guards in zip tests.</p>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
    <span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+43</span>
    <span style="font-family: monospace; color: #cf222e; font-weight: 600;">-4</span>
    <a href="https://github.com/dharc-org/changes-metadata-manager/commit/dd11c0c25a87423f38b22dd8d4e547bf4535edf1" style="color: #0969da; text-decoration: none; font-weight: 500;">dd11c0c</a>
  </div>
</div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
    <img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" />
    <div>
      <strong style="display: block; color: #1f2328;">arcangelo7</strong>
      <span style="font-size: 0.85em; color: #656d76;">Feb 18, 2026</span>
      <span style="font-size: 0.85em; color: #656d76;"> · </span>
      <a href="https://github.com/dharc-org/changes-metadata-manager" style="font-size: 0.85em; color: #0969da; text-decoration: none;">dharc-org/changes-metadata-manager</a>
    </div>
  </div>
  <div style="margin: 12px 0; color: #1f2328;">
    <p>feat(zenodo): add keeper institution and location to record description</p>
<p>Extract curation activity data from the knowledge graph following
the CHAD-AP ontology pattern (crm:E7_Activity with aat:300054277)
to include the conserving institution and its location in each
Zenodo record description.</p>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
    <span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+102</span>
    <span style="font-family: monospace; color: #cf222e; font-weight: 600;">-4</span>
    <a href="https://github.com/dharc-org/changes-metadata-manager/commit/d4fa80a8d3bfd4068fcacc23667750e002417c7f" style="color: #0969da; text-decoration: none; font-weight: 500;">d4fa80a</a>
  </div>
</div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
    <img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" />
    <div>
      <strong style="display: block; color: #1f2328;">arcangelo7</strong>
      <span style="font-size: 0.85em; color: #656d76;">Feb 18, 2026</span>
      <span style="font-size: 0.85em; color: #656d76;"> · </span>
      <a href="https://github.com/dharc-org/changes-metadata-manager" style="font-size: 0.85em; color: #0969da; text-decoration: none;">dharc-org/changes-metadata-manager</a>
    </div>
  </div>
  <div style="margin: 12px 0; color: #1f2328;">
    <p>feat(zenodo): add file scope description to license rights entries</p>
<p>Metadata license (CC0) now explicitly lists meta.ttl and prov.trig.
Content license describes coverage as all data files except those two.</p>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
    <span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+3</span>
    <span style="font-family: monospace; color: #cf222e; font-weight: 600;">-0</span>
    <a href="https://github.com/dharc-org/changes-metadata-manager/commit/d6af8c34148845f3e5c515ac56b7a2a0c3a3aa17" style="color: #0969da; text-decoration: none; font-weight: 500;">d6af8c3</a>
  </div>
</div>

Zenodo non usa CREDIT, usa [https://datacite-metadata-schema.readthedocs.io/en/4.6/appendices/appendix-1/contributorType/](https://datacite-metadata-schema.readthedocs.io/en/4.6/appendices/appendix-1/contributorType/)

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
    <img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" />
    <div>
      <strong style="display: block; color: #1f2328;">arcangelo7</strong>
      <span style="font-size: 0.85em; color: #656d76;">Feb 18, 2026</span>
      <span style="font-size: 0.85em; color: #656d76;"> · </span>
      <a href="https://github.com/dharc-org/changes-metadata-manager" style="font-size: 0.85em; color: #0969da; text-decoration: none;">dharc-org/changes-metadata-manager</a>
    </div>
  </div>
  <div style="margin: 12px 0; color: #1f2328;">
    <p>feat(zenodo): convert config format to InvenioRDM API schema</p>
<p>Restructure creators with person_or_org/role/affiliations format,
split family_name/given_name fields, add datacollector/datacurator
roles, convert related_identifiers and locations to InvenioRDM
nested format, and add optional SHACL validation skip flag.</p>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
    <span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+504</span>
    <span style="font-family: monospace; color: #cf222e; font-weight: 600;">-220</span>
    <a href="https://github.com/dharc-org/changes-metadata-manager/commit/a79556897ceb9e845d070929aa6eae406d483aa5" style="color: #0969da; text-decoration: none; font-weight: 500;">a795568</a>
  </div>
</div>

[https://sandbox.zenodo.org/records/442870](https://sandbox.zenodo.org/records/442870)

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
    <img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" />
    <div>
      <strong style="display: block; color: #1f2328;">arcangelo7</strong>
      <span style="font-size: 0.85em; color: #656d76;">Feb 18, 2026</span>
      <span style="font-size: 0.85em; color: #656d76;"> · </span>
      <a href="https://github.com/dharc-org/changes-metadata-manager" style="font-size: 0.85em; color: #0969da; text-decoration: none;">dharc-org/changes-metadata-manager</a>
    </div>
  </div>
  <div style="margin: 12px 0; color: #1f2328;">
    <p>feat(zenodo): generate entity-to-DOI association table after upload</p>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
    <span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+110</span>
    <span style="font-family: monospace; color: #cf222e; font-weight: 600;">-3</span>
    <a href="https://github.com/dharc-org/changes-metadata-manager/commit/c25bd49a5e2e18765588061ca8b950dedfe4b1fb" style="color: #0969da; text-decoration: none; font-weight: 500;">c25bd49</a>
  </div>
</div>

### Computational management of data

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
    <img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" />
    <div>
      <strong style="display: block; color: #1f2328;">arcangelo7</strong>
      <span style="font-size: 0.85em; color: #656d76;">Feb 17, 2026</span>
      <span style="font-size: 0.85em; color: #656d76;"> · </span>
      <a href="https://github.com/thinkcompute/thinkcompute.github.io" style="font-size: 0.85em; color: #0969da; text-decoration: none;">thinkcompute/thinkcompute.github.io</a>
    </div>
  </div>
  <div style="margin: 12px 0; color: #1f2328;">
    <p>refactor: move D&amp;C and file handling labs from part 3 to new part 5</p>
<p>Move divide-and-conquer exercises from lab-06 to lab-07 and file
handling content from lab-07 to new lab-08, creating a dedicated
Part 5 for these topics. Remove CSV and JSON sections from the
file handling lab.</p>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
    <span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+429</span>
    <span style="font-family: monospace; color: #cf222e; font-weight: 600;">-890</span>
    <a href="https://github.com/thinkcompute/thinkcompute.github.io/commit/5fe5b74ac5877991dd600927d9e21c00ff82893f" style="color: #0969da; text-decoration: none; font-weight: 500;">5fe5b74</a>
  </div>
</div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
    <img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" />
    <div>
      <strong style="display: block; color: #1f2328;">arcangelo7</strong>
      <span style="font-size: 0.85em; color: #656d76;">Feb 18, 2026</span>
      <span style="font-size: 0.85em; color: #656d76;"> · </span>
      <a href="https://github.com/thinkcompute/thinkcompute.github.io" style="font-size: 0.85em; color: #0969da; text-decoration: none;">thinkcompute/thinkcompute.github.io</a>
    </div>
  </div>
  <div style="margin: 12px 0; color: #1f2328;">
    <p>feat: add part 7 laboratories on pandas and Python classes</p>
<p>Add lab-09 (pandas exercises with Caravaggio dataset) and lab-10
(Python classes for Baroque painters). Include CSV dataset files
for the pandas lab. Update _toc.yml to include new Part 7 and
renumber Databases to Part 8. Add clean step to build scripts.</p>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
    <span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+532</span>
    <span style="font-family: monospace; color: #cf222e; font-weight: 600;">-2</span>
    <a href="https://github.com/thinkcompute/thinkcompute.github.io/commit/cbcf3e6193ee581e9c3e34ff0776a544d57e71ff" style="color: #0969da; text-decoration: none; font-weight: 500;">cbcf3e6</a>
  </div>
</div>

[https://thinkcompute.github.io/](https://thinkcompute.github.io/)

### oc-meta

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">

```
<div>
  <strong style="display: block; color: #1f2328;">arcangelo7</strong>
  <span style="font-size: 0.85em; color: #656d76;">Feb 18, 2026</span>
  <span style="font-size: 0.85em; color: #656d76;"> · </span>
  <a href="https://github.com/opencitations/oc_meta" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/oc_meta</a>
</div>
```

  </div>
  <div style="margin: 12px 0; color: #1f2328;">
    <p>build: migrate from Poetry to UV</p>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
    <span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+2908</span>
    <span style="font-family: monospace; color: #cf222e; font-weight: 600;">-3816</span>
    <a href="https://github.com/opencitations/oc_meta/commit/e8e4c4a40ef11974ee6c024c3c5b01cd38ea2179" style="color: #0969da; text-decoration: none; font-weight: 500;">e8e4c4a</a>
  </div>
</div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">

```
<div>
  <strong style="display: block; color: #1f2328;">arcangelo7</strong>
  <span style="font-size: 0.85em; color: #656d76;">Feb 18, 2026</span>
  <span style="font-size: 0.85em; color: #656d76;"> · </span>
  <a href="https://github.com/opencitations/oc_meta" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/oc_meta</a>
</div>
```

  </div>
  <div style="margin: 12px 0; color: #1f2328;">
    <p>feat(finder): add merged entities reconstruction from provenance</p>
<p>Add tool to scan provenance files and reconstruct merge chains.
The script identifies entities that were merged by detecting multiple
wasDerivedFrom references in provenance snapshots, then follows
the chain to find the final surviving entity.</p>
<p>Usage: python -m oc_meta.run.find.merged_entities -c <config> -o &lt;output.csv&gt; --entity-type br</p>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
    <span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+167</span>
    <span style="font-family: monospace; color: #cf222e; font-weight: 600;">-0</span>
    <a href="https://github.com/opencitations/oc_meta/commit/1163da8cacbb5cced8c08c4f4e0425a45e43a137" style="color: #0969da; text-decoration: none; font-weight: 500;">1163da8</a>
  </div>
</div>

### Domande

* La data del libro di Computational Management of Data va aggiornata tutti gli anni al nuovo anno? Perché vedo che c'è ancora il 2025 per la citazione e il 2023 nel footer. Dovremmo tenere aggiornate queste date sempre all'anno in corso o comunque alla data di ultimo aggiornamento?
* comp-think

## Memo

Aldrovandi

* Bisogna chiedere a Silvio la tabella CSV da cui ricavare i nomi delle colonne, tabella che andrà compilata con le informazioni sui documenti che abbiamo caricato su Zenodo.

* Scrivere a Ilaria Manzini per inserire Changes su OpenAIRE.
  Vizioso

* [https://en.wikipedia.org/wiki/Compilers:\_Principles,\_Techniques,\_and\_Tools](https://en.wikipedia.org/wiki/Compilers:_Principles,_Techniques,_and_Tools)

* [https://en.wikipedia.org/wiki/GNU\_Bison](https://en.wikipedia.org/wiki/GNU_Bison)

* [https://en.wikipedia.org/wiki/Yacc](https://en.wikipedia.org/wiki/Yacc)

* HERITRACE
  * C'è un bug che si verifica quando uno seleziona un'entità preesistente, poi clicca sulla X e inserisce i metadati a mano. Alcuni metadati vengono duplicati.
  * Se uno ripristina una sotto entità a seguito di un merge, l'entità principale potrebbe rompersi.

* Meta
  * Bisogna produrre la tabella che associa temp a OMID per produrre le citazioni.

* OpenCitations
  * Rilanciare processo eliminazione duplicati
  * trovare tutti quelli che ci usano

* "reference": { "@id": "frbr:part", "@type": "@vocab" } → bibreference

* "crossref": { "@id": "biro:references", "@type": "@vocab"} → reference

* "crossref": "datacite:crossref"

* oc\_ocdm

  * Automatizzare mark\_as\_restored di default. è possibile disabilitare e fare a mano mark\_as\_restored.

* [https://opencitations.net/meta/api/v1/metadata/doi:10.1093/acprof:oso/9780199977628.001.0001](https://opencitations.net/meta/api/v1/metadata/doi:10.1093/acprof:oso/9780199977628.001.0001)

* Guida per Meta e cerotti

* DELETE con variabile

* Modificare Meta sulla base della tabella di Elia

* embodiment multipli devono essere purgati a monte

* Portare il Meta Editor fuori. oc\_editor

* Modificare documentazione API aggiungendo omid

* Heritrace
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

* Meta
  * Fusione: chi ha più metadati compilati. A parità di metadato si tiene l’omid più basso
  * Issue github parallelizzazione virtuoso
  * frbr:partOf non deve aggiungere nel merge: [https://opencitations.net/meta/api/v1/metadata/omid:br/06304322094](https://opencitations.net/meta/api/v1/metadata/omid:br/06304322094)
  * API v2
  * Usare il triplestore di provenance per fare 303 in caso di entità mergiate o mostrare la provenance in caso di cancellazione e basta.

* RML

  * Vedere come morh kgc rappresenta database internamente
  * [https://dylanvanassche.be/assets/pdf/iswc2024-krown-benchmark-rdf-graph-materialisation.pdf](https://dylanvanassche.be/assets/pdf/iswc2024-krown-benchmark-rdf-graph-materialisation.pdf)

  [https://github.com/oeg-upm/gtfs-bench](https://github.com/oeg-upm/gtfs-bench)

  * Chiedere Ionannisil diagramma che ha usato per auto rml.

* Crowdsourcing
  * Quando dobbiamo ingerire Crossref stoppo manualmente OJS. Si mette una nota nel repository per dire le cose. Ogni mese.
  * Aggiornamenti al dump incrementali. Si usa un nuovo prefisso e si aggiungono dati solo a quel CSV.
  * Bisogna usare il DOI di Zenodo come primary source. Un unico DOI per batch process.
  * Bisogna fare l’aggiornamento sulla copia e poi bisogna automatizzare lo switch

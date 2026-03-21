---
title: 2026-03-12 XIII Arcano senza nome
editUrl: false
---

## La Novitade

### Meta

```bash
(oc-meta) arcangelo@serverGrosso:/mnt/arcangelo/qlever-meta-data/indices$ qlever index-stats

Command: index-stats

Breakdown of the time used for building the index, based on the timestamps for key lines in "meta-data.index-log.txt"

Parse input           :    1.4 h
Build vocabularies    :    0.4 h
Convert to global IDs :    0.2 h
Permutation SPO & SOP :    0.2 h
Permutation OSP & OPS :    0.3 h
Permutation PSO & POS :    0.1 h
Permutation PSO & POS :    0.3 h

TOTAL time            :    2.9 h

Breakdown of the space used for building the index

Files index.*         :   65.3 GB
Files vocabulary.*    :   27.4 GB

TOTAL size            :   92.7 GB
```

```bash
(oc-meta) arcangelo@serverGrosso:/mnt/arcangelo/qlever-meta-data/indices$ qlever index-stats

Command: index-stats

Breakdown of the time used for building the index, based on the timestamps for key lines in "meta-data.index-log.txt"

Parse input           :    1.4 h
Build vocabularies    :    0.4 h
Convert to global IDs :    0.2 h
Permutation SPO & SOP :    0.2 h
Permutation OSP & OPS :    0.3 h
Permutation PSO & POS :    0.1 h
Permutation PSO & POS :    0.3 h
**Text index            :    4.1 h**

TOTAL time            :    7.0 h

Breakdown of the space used for building the index

Files index.*         :   65.3 GB
Files vocabulary.*    :   27.4 GB
**Files text.*          :   29.2 GB**

TOTAL size            :  121.8 GB
```

DOI-ORCID index 2025: [https://doi.org/10.5281/zenodo.18881876](https://doi.org/10.5281/zenodo.18881876)

### oc\_ds\_converter

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Mar 5, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/oc_ds_converter" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/oc_ds_converter</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>build: migrate from poetry to uv package manager</p></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+1229</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-2461</span><a href="https://github.com/opencitations/oc_ds_converter/commit/2ffaab0e23fe18ccc414d4fb95fd061596da466b" style="color: #0969da; text-decoration: none; font-weight: 500;">2ffaab0</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Mar 5, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/oc_ds_converter" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/oc_ds_converter</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>test: add HTTP mocking infrastructure with pytest and responses</p></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+1185</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-10</span><a href="https://github.com/opencitations/oc_ds_converter/commit/ddadb5bff81322885a84f0e41dd78b3ca3434400" style="color: #0969da; text-decoration: none; font-weight: 500;">ddadb5b</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Mar 5, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/oc_ds_converter" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/oc_ds_converter</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>fix(doi): only attempt DOI repair when API service is enabled</p>
<p>Previously the DOI cleaning logic was applied unconditionally during
normalization. Now malformed DOIs are only repaired when API validation
is enabled, with the API called before and after repair to verify the
corrected DOI actually exists.</p></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+351</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-141</span><a href="https://github.com/opencitations/oc_ds_converter/commit/9093d880610a62d85f79ad23eeaa1a167f62e057" style="color: #0969da; text-decoration: none; font-weight: 500;">9093d88</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Mar 8, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/oc_ds_converter" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/oc_ds_converter</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>refactor(crossref)!: auto-generate publishers file from Crossref API</p>
<p>The publishers CSV is now automatically downloaded from the Crossref API
at startup and stored in oc_ds_converter/crossref/data/publishers.csv.
This removes the need for users to manually provide or maintain the file.</p>
<p>BREAKING CHANGE: The -p/--publishers CLI argument has been removed.
The publishers file is now generated automatically.</p></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+279</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-23</span><a href="https://github.com/opencitations/oc_ds_converter/commit/dd6496aae829ca48f01d308e12f4e31ed63f19eb" style="color: #0969da; text-decoration: none; font-weight: 500;">dd6496a</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Mar 8, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/oc_ds_converter" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/oc_ds_converter</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>feat(crossref): store DOI-ORCID index in Redis for multiprocessing</p>
<p>Previously, each worker loaded the entire ORCID index from disk,
causing severe performance degradation when processing large batches.
Now the index is loaded once into Redis at startup and shared across
all workers.</p>
<p>The -o flag behavior changes: if specified, the Redis index is cleared
and reloaded from the directory; if omitted, the existing index is used.</p></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+259</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-43</span><a href="https://github.com/opencitations/oc_ds_converter/commit/d4c2ed4d1082806c12f1b6a570f0bd8bf3d4e6de" style="color: #0969da; text-decoration: none; font-weight: 500;">d4c2ed4</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Mar 9, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/oc_ds_converter" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/oc_ds_converter</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>feat(crossref): add Redis publishers storage and age-based regeneration</p>
<p>Store publishers mapping in Redis for multiprocessing scenarios,
avoiding memory duplication across worker processes. Add file age
checking to skip unnecessary API calls when publishers.csv is recent.</p>
<p>New CLI options:</p>
<ul>
<li>--update-publishers: force regeneration ignoring age</li>
<li>--publishers-max-age: days before automatic update (default 30)</li>
</ul></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+475</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-31</span><a href="https://github.com/opencitations/oc_ds_converter/commit/c01039bd8552e5ac05a438e4fb08b9aee906b735" style="color: #0969da; text-decoration: none; font-weight: 500;">c01039b</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Mar 9, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/oc_ds_converter" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/oc_ds_converter</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>refactor(storage)!: make Redis the only storage backend</p>
<p>Remove SqliteStorageManager and InMemoryStorageManager. All ID managers
and processing classes now use RedisStorageManager exclusively, with a
testing parameter to switch between real Redis and fakeredis.</p>
<p>The temporary batching during file processing uses a new lightweight
BatchManager class (simple dict wrapper).</p>
<p>BREAKING CHANGE: CLI arguments --storage_path and --redis_storage_manager removed.</p></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+903</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-1604</span><a href="https://github.com/opencitations/oc_ds_converter/commit/4df3775c1b197cf79858bd06998f6f2f15a93103" style="color: #0969da; text-decoration: none; font-weight: 500;">4df3775</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Mar 9, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/oc_ds_converter" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/oc_ds_converter</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>perf(crossref): only invoke BeautifulSoup when the text actually contains angle brackets</p></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+10</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-12</span><a href="https://github.com/opencitations/oc_ds_converter/commit/3ee7afc9eae3a9b2775041951c01b2b18c3d84d9" style="color: #0969da; text-decoration: none; font-weight: 500;">3ee7afc</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Mar 10, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/oc_ds_converter" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/oc_ds_converter</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>perf(crossref): prefetch DOI-ORCID index</p>
<p>Replace individual Redis lookups with batch prefetch via pipeline.
Normalize DOIs with prefix during index loading for consistent keys.
Simplify orcid_finder to use in-memory cache populated by prefetch.</p></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+78</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-25</span><a href="https://github.com/opencitations/oc_ds_converter/commit/99e4f57685cea838e3d88cc9d1cfa804af86a785" style="color: #0969da; text-decoration: none; font-weight: 500;">99e4f57</a></div></div>

Prima: orcid\_finder: 4-4.6s per file
Dopo: orcid\_finder: 0.31-0.44s

#### Mistero misterioso

```python
# 1) ORCID nei metadati
# E ok

# 2) Indice DOI→ORCID
# E ok

# 3) Fallback Redis snapshot (se presente e univoca o coerente con l'indice)
if not oc and getattr(self, "_redis_values_ra", None):
	for oc_snap in self._redis_values_ra:
		oc_norm = self.orcid_m.normalise(oc_snap, include_prefix=True)
		if oc_norm:
			if len(self._redis_values_ra) == 1 or (
					raw_index and oc_norm.split(":", 1)[1] in str(raw_index)):
				oc = oc_norm
				break
# ???                                                    
```

Tradotto

* Se c'è UN SOLO ORCID in tutto il file → assegnalo a questo autore
* OPPURE se l'ORCID appare in raw\_index → assegnalo

1. Caso "un solo ORCID": Se nel file ci sono 5000 item con 10 autori ciascuno, e solo UN autore ha l'ORCID, il codice lo assegnerebbe a TUTTI gli autori. Assurdo.
2. Caso "ORCID in raw\_index": Ma se l'ORCID è già in raw\_index, allora lo step 2 avrebbe dovuto trovarlo! Se non l'ha trovato è perché il nome non matchava. E allora perché assegnarlo comunque? A quale autore?

E c'è anche un test per questo scenario

```python
def test_get_agents_strings_list_api_disabled_redis_unprefixed_orcid(self):
	"""
	API OFF + nessun ORCID in metadata + indice vuoto.
	Redis snapshot contiene ORCID per l'autore **senza prefisso**: deve essere apposto all'autore.
	"""
	cp = CrossrefProcessing(use_orcid_api=False, testing=True)

	# Autore senza ORCID nei metadati
	agents = [{
		"given": "Chan-Ick",
		"family": "Cheigh",
		"role": "author"
	}]

	# Redis snapshot con ORCID **senza prefisso** dell'autore
	raw_orcid = "0000-0002-6227-4053"
	cp.update_redis_values(br=[], ra=[raw_orcid])

	authors, editors = cp.get_agents_strings_list("10.9799/ksfan.2012.25.1.069", agents)
	self.assertEqual(authors, ["Cheigh, Chan-Ick [orcid:0000-0002-6227-4053]"])
	self.assertEqual(editors, [])
	cp.orcid_m.storage_manager.delete_storage()

```

Questo test copre il caso "1 autore + 1 ORCID", dove l'assegnazione ha senso. Ma in produzione questo scenario non esiste.

Questo loop da solo prendeva circa 30 secondi a file ed era l'operazione più onerosa dell'intero processo, più di tutte le chiamate alle API messe insieme! L'ho cancellato.

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Mar 9, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/oc_ds_converter" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/oc_ds_converter</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>perf(crossref): remove broken O(n²) ORCID fallback in get_agents_strings_list</p>
<p>The redis_fallback logic iterated through all ORCIDs from all items in
the file for each author, causing quadratic complexity. The fallback
also had flawed logic: it either assigned an ORCID when only one existed
in the entire file (wrong for multiple authors) or checked if an ORCID
was in raw_index (redundant with the name-matching step).</p>
<p>Loop time reduced from ~34s to ~1-2.5s per file (13-40x speedup).</p></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+193</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-49</span><a href="https://github.com/opencitations/oc_ds_converter/commit/413fff27f3d3b64a6ab66abf1efc5976425dfde7" style="color: #0969da; text-decoration: none; font-weight: 500;">413fff2</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Mar 11, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/oc_ds_converter" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/oc_ds_converter</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>refactor: remove doi_csv filtering, add exclude-existing flag</p>
<p>Replace the doi_csv/wanted_doi_filepath parameter with a more efficient
exclude-existing mechanism. The old approach loaded all wanted DOIs into
memory upfront, while the new flag checks Meta existence via
Redis.</p>
<p>Changes:</p>
<ul>
<li>Remove doi_csv parameter from RaProcessor and all processor subclasses</li>
<li>Remove -w/--wanted CLI argument from all run scripts</li>
<li>Add --exclude-existing flag that checks BR_redis before creating rows</li>
</ul></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+378</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-269</span><a href="https://github.com/opencitations/oc_ds_converter/commit/ff9fa36dbe152bac9a21835bb3beafeea97ab662" style="color: #0969da; text-decoration: none; font-weight: 500;">ff9fa36</a></div></div>

### time-agnostic-library

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Mar 5, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/time-agnostic-library" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/time-agnostic-library</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>refactor(test): add multi-triplestore CI matrix</p>
<p>Also fold invalidatedAtTime into the DeltaQuery provenance query,
removing the separate _batch_check_existence call.</p></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+767</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-1245</span><a href="https://github.com/opencitations/time-agnostic-library/commit/fe4cf6fb1ecc8bcfd9b63f22fa410e9b7713edc7" style="color: #0969da; text-decoration: none; font-weight: 500;">fe4cf6f</a></div></div>

### Index

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Mar 6, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/index" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/index</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>fix(meta2redis): fix buffer batching and replace tqdm/logger with rich</p>
<ul>
<li>Fix buffer batching that was not actually flushing during processing</li>
<li>Replace tqdm with rich progress bar showing time remaining across all CSV files</li>
<li>Replace logger with rich console</li>
<li>Add --redis-only flag to skip CSV file generation</li>
<li>Remove unused imports and variables (datetime, br_ids, ra_ids, db_omid)</li>
<li>Fix TextIOWrapper issue by opening CSV files in binary mode</li>
<li>Change CSV output from append to write mode to avoid duplicates</li>
<li>Add rich to dependencies</li>
</ul></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+139</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-139</span><a href="https://github.com/opencitations/index/commit/2a07e127fe6219666e77eeb8081c14972cdf24da" style="color: #0969da; text-decoration: none; font-weight: 500;">2a07e12</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Mar 6, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/index" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/index</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>perf(meta2redis): use redis pipelines and remove buffer batching</p>
<p>Replace individual SET operations with pipelined writes that batch
all operations per file into a single network round-trip. Remove the
intermediate buffer logic which was ineffective since it still performed
individual Redis calls internally.</p></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+49</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-87</span><a href="https://github.com/opencitations/index/commit/5bb3149e17fb2f78993dcabf8415ddee8c16ef17" style="color: #0969da; text-decoration: none; font-weight: 500;">5bb3149</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Mar 6, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/index" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/index</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>feat(meta2redis): add multiprocessing and switch to redis SADD</p>
<p>Replace sequential file processing with parallel workers using
multiprocessing.Pool. Switch from SET to SADD for br/ra indexes,
allowing concurrent writes without conflicts. Remove global index
dictionaries since accumulation now happens in Redis directly.</p>
<p>Add --workers CLI option to control parallelism.</p></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+70</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-53</span><a href="https://github.com/opencitations/index/commit/8c8f81427d2201dbf38bdc65aba5f24f7c5e7728" style="color: #0969da; text-decoration: none; font-weight: 500;">8c8f814</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Mar 8, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/oc_ds_converter" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/oc_ds_converter</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>refactor(redis): migrate OMID storage from string to set operations</p></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+148</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-122</span><a href="https://github.com/opencitations/oc_ds_converter/commit/886dd691ec8bb3f691c38ca80c31e80913077418" style="color: #0969da; text-decoration: none; font-weight: 500;">886dd69</a></div></div>

### RML

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Mar 6, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/arcangelo7/knowledge-graphs-inversion" style="font-size: 0.85em; color: #0969da; text-decoration: none;">arcangelo7/knowledge-graphs-inversion</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>fix(inversion): handle column-reference subjects with rr:termType rr:IRI</p>
<p>For rr:column with rr:termType rr:IRI, the subject IRI is the column
value itself and requires no STRAFTER/STRBEFORE extraction. Three changes
make this work:</p>
<ul>
<li>Fix N-Triples parser regex to handle IRIs with spaces (morph-kgc
generates invalid IRIs like <Emily Smith> for column-as-IRI mappings)</li>
<li>Classify RML_REFERENCE subjects as plain references in SubjectTriple
so url_decode is not applied to non-URL-encoded values</li>
<li>Remove check_column_as_iri_subject detection that incorrectly flagged
the case as a mapping issue</li>
</ul>
<p>R2RMLTC0020b now passes (26/45 instead of 25/45).</p></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+16</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-25</span><a href="https://github.com/arcangelo7/knowledge-graphs-inversion/commit/f81f981e9f042127792b1c1ce526ecea7e96c2c1" style="color: #0969da; text-decoration: none; font-weight: 500;">f81f981</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Mar 6, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/arcangelo7/knowledge-graphs-inversion" style="font-size: 0.85em; color: #0969da; text-decoration: none;">arcangelo7/knowledge-graphs-inversion</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>feat(inversion): extract column values referenced exclusively by graph maps</p>
<p>Switch morph-kgc output to N-Quads to preserve named graph information.
Extend the N-Quads parser to handle the optional 4th graph component.
When a column is referenced only by rr:graphMap (not by any subject,
predicate, or object term map), wrap SPARQL patterns in a GRAPH ?g clause
and apply STRAFTER/STRBEFORE extraction on the graph variable.</p></div><div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;"><span style="font-family: monospace; color: #1a7f37; font-weight: 600;">+221</span><span style="font-family: monospace; color: #cf222e; font-weight: 600;">-75</span><a href="https://github.com/arcangelo7/knowledge-graphs-inversion/commit/9d35f0294cd36dd73aac7aea63f28ad9f4a4c8b6" style="color: #0969da; text-decoration: none; font-weight: 500;">9d35f02</a></div></div>

### Cose belle

[https://docs.astral.sh/](https://docs.astral.sh/)

### Domande

* Index ha un sistema di installazione abbastanza vetusto e supporta ancora Python 3.7 che però non è più sopportato dalle GitHub Action e di conseguenza i test falliscono. Possiamo droppare da Python 3.9 compreso in giù?
* Possiamo anche aggiornare il sistema di gestione dell'ambiente virtuale di index con UV perché altrimenti ogni modifica che viene fatta bisogna rilanciare il setup all'interno dell'ambiente virtuale.
* È utile che meta2redis salvi in csv oltre che sul redis? lo chiedo perché chiaramente è un problema di memoria non indifferente da gestire
* Allora, per quanto riguarda la laurea di Hubert, non ho capito, devo venire in aula freschi alle 9 il 20? Devo prepararmi in qualche modo?

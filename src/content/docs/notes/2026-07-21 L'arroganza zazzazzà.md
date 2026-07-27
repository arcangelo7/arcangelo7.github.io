---
title: 2026-07-21 L'arroganza zazzazzà
editUrl: false
---

## La Novitade

### SPARQL Service Description

> SPARQL services made available via the SPARQL Protocol SHOULD return a service description document **at the service endpoint** when dereferenced using the HTTP **GET** operation **without any query parameter** strings provided. This service description MUST be made available in an RDF serialization, **MAY be embedded in (X)HTML by way of RDFa** \[RDFA], and SHOULD use content negotiation \[CONNEG] if available in other RDF representations.
> [https://www.w3.org/TR/sparql11-service-description/#accessing](https://www.w3.org/TR/sparql11-service-description/#accessing)

Il di conseguenza: GET su [https://sparql.opencitations.net/meta](https://sparql.opencitations.net/meta) con con Accept: text/turtle -> SPARQL Service Description

Oppure GET /meta con Accept: text/html -> Interfaccia HTML con la descrizione incorporata come RDFa

Ancora

> The URI /.well-known/void on any Web server is registered by this specification for a VoID description of any datasets hosted on that server. For example, on the host [www.example.com](http://www.example.com), this URI would be [http://www.example.com/.well-known/void](http://www.example.com/.well-known/void).  [https://www.w3.org/TR/void/#well-known](https://www.w3.org/TR/void/#well-known)

### Meta

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Jul 15, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/oc_meta" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/oc_meta</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>feat(patches): repair dangling agent roles</p>
<p>Add a reviewed plan-and-execute workflow for reconstructing missing agent-role chains from external metadata.</p></div><div style="display: flex; justify-content: flex-end; align-items: center; font-size: 0.85em;"><a href="https://github.com/opencitations/oc_meta/commit/b417d95d590d554316cdf25b41a4a51a54bd0754" style="color: #0969da; text-decoration: none; font-weight: 500;">b417d95</a></div></div>

### Aldrovandi

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Jul 15, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/dharc-org/changes-metadata-manager" style="font-size: 0.85em; color: #0969da; text-decoration: none;">dharc-org/changes-metadata-manager</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>fix(zenodo): reject unresolved creators</p>
<p>Creator names missing from the lookup were silently omitted from record metadata.
Require exact RDF name matches, align the affected lookup entries, and cover the
failure and resolution paths with tests.</p></div><div style="display: flex; justify-content: flex-end; align-items: center; font-size: 0.85em;"><a href="https://github.com/dharc-org/changes-metadata-manager/commit/87d8252bfc5b6b67dc9605755e7353d2f72d4322" style="color: #0969da; text-decoration: none; font-weight: 500;">87d8252</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Jul 16, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/dharc-org/changes-metadata-manager" style="font-size: 0.85em; color: #0969da; text-decoration: none;">dharc-org/changes-metadata-manager</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>fix(zenodo): add creator repair script</p></div><div style="display: flex; justify-content: flex-end; align-items: center; font-size: 0.85em;"><a href="https://github.com/dharc-org/changes-metadata-manager/commit/e9b32456deb48e4ba887e0014306e0767053ffec" style="color: #0969da; text-decoration: none; font-weight: 500;">e9b3245</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Jul 16, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/dharc-org/changes-metadata-manager" style="font-size: 0.85em; color: #0969da; text-decoration: none;">dharc-org/changes-metadata-manager</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>fix(zenodo): distinguish external source records</p>
<p>Select missing-file notices from the stage&#39;s defining activity</p></div><div style="display: flex; justify-content: flex-end; align-items: center; font-size: 0.85em;"><a href="https://github.com/dharc-org/changes-metadata-manager/commit/a749510967ee0a5c53b82ff083fa9f34046dc888" style="color: #0969da; text-decoration: none; font-weight: 500;">a749510</a></div></div>

### HERITRACE

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Jul 18, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/heritrace" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/heritrace</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>feat(iri): configure IRI minting components</p>
<p>Load constructor options from JSON environment variables and provide a
filesystem-backed OpenCitations Meta counter handler with atomic updates.</p></div><div style="display: flex; justify-content: flex-end; align-items: center; font-size: 0.85em;"><a href="https://github.com/opencitations/heritrace/commit/4337c46c6524a29dd036de9317755d52dae2174c" style="color: #0969da; text-decoration: none; font-weight: 500;">4337c46</a></div></div>

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Jul 18, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/heritrace" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/heritrace</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>feat(meta): persist rdf archives after saves</p>
<p>Add a configurable save plugin that writes changed OpenCitations Meta data and provenance entities to zipped JSON-LD archives after SPARQL updates.</p></div><div style="display: flex; justify-content: flex-end; align-items: center; font-size: 0.85em;"><a href="https://github.com/opencitations/heritrace/commit/61394e9900472c39de94b76cba7c801ea9b3b454" style="color: #0969da; text-decoration: none; font-weight: 500;">61394e9</a></div></div>

[https://github.com/opencitations/heritrace/blob/61394e9900472c39de94b76cba7c801ea9b3b454/docker/docker-compose.meta.yaml#L93-L98](https://github.com/opencitations/heritrace/blob/61394e9900472c39de94b76cba7c801ea9b3b454/docker/docker-compose.meta.yaml#L93-L98)

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Jul 20, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/opencitations/heritrace" style="font-size: 0.85em; color: #0969da; text-decoration: none;">opencitations/heritrace</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>perf(meta): index counter files by byte chunks</p>
<p>Locate counter lines from byte-chunk checkpoints and memory-mapped reads so
large provenance files avoid Python line iteration</p></div><div style="display: flex; justify-content: flex-end; align-items: center; font-size: 0.85em;"><a href="https://github.com/opencitations/heritrace/commit/e4397e735c78fcc0f13e8dc680df44fb04981694" style="color: #0969da; text-decoration: none; font-weight: 500;">e4397e7</a></div></div>

## Domande

Camera ready ISWC

### SKG-IF

* [https://skg-if.github.io/interoperability-framework/docs/venue.html#type](https://skg-if.github.io/interoperability-framework/docs/venue.html#type) Noi non consideriamo repository come un tipo di venue. Dovremmo? Cioè nel nostro data model fabio:ComputerProgram non può essere un contenitore. Noi non distinguiamo, in effetti, tra software e contenitore del software.

* Per le venue di SKG-IF, ho dato questa indicazione a Regina:

> Please map fabio:Journal to journal, fabio:AcademicProceedings to conference, and fabio:Book and fabio:ReferenceBook to book. Map every other class, including fabio:BookSeries and fabio:Series, to other.

Ma potrebbe non avere senso

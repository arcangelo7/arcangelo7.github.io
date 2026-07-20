---
title: index
editUrl: false
---

### KROWN

[https://github.com/kg-construct/KROWN/pull/18](https://github.com/kg-construct/KROWN/pull/18)

<div style="border: 1px solid #d0d7de; border-radius: 8px; padding: 16px; margin: 8px 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #1f2328;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img src="https://avatars.githubusercontent.com/u/42008604?v=4" style="width: 32px; height: 32px; border-radius: 50%;" alt="arcangelo7" /><div><strong style="display: block; color: #1f2328;">arcangelo7</strong><span style="font-size: 0.85em; color: #656d76;">Jul 18, 2026</span><span style="font-size: 0.85em; color: #656d76;"> &middot; </span><a href="https://github.com/arcangelo7/knowledge-graphs-inversion" style="font-size: 0.85em; color: #0969da; text-decoration: none;">arcangelo7/knowledge-graphs-inversion</a></div></div><div style="margin: 12px 0; color: #1f2328;"><p>feat(benchmarks): align KROWN execution with official framework</p>
<p>Run materialization through KROWN&#39;s Executor and collect inversion metrics with its Collector and Stats implementations. =</p></div><div style="display: flex; justify-content: flex-end; align-items: center; font-size: 0.85em;"><a href="https://github.com/arcangelo7/knowledge-graphs-inversion/commit/365d0fe63ec4439e7913af9d9e3a6a2b3bdc69cd" style="color: #0969da; text-decoration: none; font-weight: 500;">365d0fe</a></div></div>

### TODO

* Dare la lista completa di cose non allineate tra test di RML e R2RML
* [https://github.com/dtai-kg/R2RML2Datalog-Translator](https://github.com/dtai-kg/R2RML2Datalog-Translator)
* Creare scenari dove Ali will fail. Fare l'avvocato del diavolo
* estendere KROWN per generare casi invertibili
* [https://docs.google.com/document/d/1tYxHmuqyAfniVGpTicDz3FB2jf0dZRx2kZWAjaZmkaI/edit?tab=t.0](https://docs.google.com/document/d/1tYxHmuqyAfniVGpTicDz3FB2jf0dZRx2kZWAjaZmkaI/edit?tab=t.0)
* Deadline end of september
* Testare il codice di Ali sia come compliance che performance
* Facciamo R2RML, non RML
* Fare girare [https://github.com/dtai-kg/ReverseR2RML](https://github.com/dtai-kg/ReverseR2RML) su KROWN. Aspettare Ali, mancano funzioni per eseguirlo con Soufflé. Un paio di giorni.
* [https://github.com/souffle-lang/souffle](https://github.com/souffle-lang/souffle)
* La test bench non fare overshadowing
* Provare il forward su KROWN e il reverse sui test cases
* La provenance non risolve la mancanza di informazioni, risolve cose come i separatori dei template. Investigare altre possibili motivazioni.

### 2026-07-17

* La provenance non scala, significa duplicare la tabella di origine. Ci vogliono buoni mapping.
* Come ottimizzazione, Ali usa la primary key della tabella come identificatore.
* Ali ha implementato l'approccio sulla provenance.

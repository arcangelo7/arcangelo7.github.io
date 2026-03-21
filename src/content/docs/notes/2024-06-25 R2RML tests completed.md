---
title: 2024-06-25 R2RML tests completed
editUrl: false
---

## La Novitade

### r2rml

RMLMapper v6.5.1

* **R2RMLTC0002a**
  * Differenza di datatype. Il mapping non specifica affatto il datatype, quindi forse è sbagliato l’output atteso
* R2RMLTC0002f:

  * Two columns mapping, delimited identifiers referenced as regular identifiers
  * Tests the presence of delimited identifiers referenced as regular identifiers. Within rr:template ID is ok, but Name is not

  ```TURTLE
  @prefix rr: <http://www.w3.org/ns/r2rml#> .
  @prefix foaf: <http://xmlns.com/foaf/0.1/> .
  @prefix ex: <http://example.com/> .
  @prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
  @base <http://example.com/base/> .

  <TriplesMap1>
      a rr:TriplesMap;
      
      rr:logicalTable [ rr:tableName "\"Student\"" ];

      rr:subjectMap [ rr:template "http://example.com/{ID}/{Name}";
                      rr:class foaf:Person ];

      rr:predicateObjectMap
      [ 
        rr:predicate		ex:id ; 
        rr:objectMap		[ rr:column "\"ID\"";  ]
      ];

      rr:predicateObjectMap
      [ 
        rr:predicate		foaf:name ; 
        rr:objectMap		[ rr:column "\"Name\"" ]
  	]
      .
  ```

  [attachments/c89d684355ad4439a42baccd4d6cebb0](/notes/attachments/c89d684355ad4439a42baccd4d6cebb0)

  [attachments/16d8216bd8f44ec6a721055f1b1e5cc8](/notes/attachments/16d8216bd8f44ec6a721055f1b1e5cc8)

  \[[R2RMLTC0008b](https://dvcs.w3.org/hg/rdb2rdf-tests/raw-file/default/D008-1table1compositeprimarykey3columns1row/manifest.ttl#tc0008b)]\(25-06-2024%20R2RML%20tests%20completed/R2RMLTC0008b.md)

  \[[R2RMLTC0009a](https://dvcs.w3.org/hg/rdb2rdf-tests/raw-file/default/D009-2tables1primarykey1foreignkey/manifest.ttl#tc0009a)]\(25-06-2024%20R2RML%20tests%20completed/R2RMLTC0009a.md)

  \[[R2RMLTC0009b](https://dvcs.w3.org/hg/rdb2rdf-tests/raw-file/default/D009-2tables1primarykey1foreignkey/manifest.ttl#tc0009b)]\(25-06-2024%20R2RML%20tests%20completed/R2RMLTC0009b.md)

  \[[R2RMLTC0009d](https://dvcs.w3.org/hg/rdb2rdf-tests/raw-file/default/D009-2tables1primarykey1foreignkey/manifest.ttl#tc0009d)]\(25-06-2024%20R2RML%20tests%20completed/R2RMLTC0009d.md)

  \[[R2RMLTC0011a](https://dvcs.w3.org/hg/rdb2rdf-tests/raw-file/default/D011-M2MRelations/manifest.ttl#tc0011a)]\(25-06-2024%20R2RML%20tests%20completed/R2RMLTC0011a.md)

  \[[R2RMLTC0011b](https://dvcs.w3.org/hg/rdb2rdf-tests/raw-file/default/D011-M2MRelations/manifest.ttl#tc0011b)]\(25-06-2024%20R2RML%20tests%20completed/R2RMLTC0011b.md)

  \[[R2RMLTC0013a](https://dvcs.w3.org/hg/rdb2rdf-tests/raw-file/default/D013-1table1primarykey3columns2rows1nullvalue/manifest.ttl#tc0013a)]\(25-06-2024%20R2RML%20tests%20completed/R2RMLTC0013a.md)

  \[[R2RMLTC0016e](https://dvcs.w3.org/hg/rdb2rdf-tests/raw-file/default/D016-1table1primarykey10columns3rowsSQLdatatypes/manifest.ttl#tc0016e)]\(25-06-2024%20R2RML%20tests%20completed/R2RMLTC0016e.md)

  \[[R2RMLTC0019b](https://dvcs.w3.org/hg/rdb2rdf-tests/raw-file/default/D019-1table1primarykey3columns3rows/manifest.ttl#tc0019b)]\(25-06-2024%20R2RML%20tests%20completed/R2RMLTC0019b.md)

| Nome del Test | Passato | Motivo del Fallimento                                                                                              |
| ------------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| R2RMLTC0000   | Yes     |                                                                                                                    |
| R2RMLTC0001a  | Yes     |                                                                                                                    |
| R2RMLTC0001b  | Yes     |                                                                                                                    |
| R2RMLTC0002a  | No      | datatype                                                                                                           |
| R2RMLTC0002b  | Yes     |                                                                                                                    |
| R2RMLTC0002c  | Yes     |                                                                                                                    |
| R2RMLTC0002d  | Yes     |                                                                                                                    |
| R2RMLTC0002e  | Yes     |                                                                                                                    |
| R2RMLTC0002f  | No      | Eccezione gestita                                                                                                  |
| R2RMLTC0002g  | Yes     |                                                                                                                    |
| R2RMLTC0002h  | Yes     |                                                                                                                    |
| R2RMLTC0002i  | Yes     |                                                                                                                    |
| R2RMLTC0002j  | Yes     |                                                                                                                    |
| R2RMLTC0003b  | Yes     |                                                                                                                    |
| R2RMLTC0003c  | Yes     |                                                                                                                    |
| R2RMLTC0004a  | No      | [Disjointed mappings](https://www.notion.so/R2RMLTC0004a-150c50216dc84dec986ac13d8ed4b3de?pvs=21)                  |
| R2RMLTC0004b  | No      | [Eccezione gestita](https://www.notion.so/R2RMLTC0004b-038dacf025db4417a31a2daf7fa3e9cf?pvs=21)                    |
| R2RMLTC0005a  | No      | datatype                                                                                                           |
| R2RMLTC0005b  | No      | datatype                                                                                                           |
| R2RMLTC0006a  | Yes     |                                                                                                                    |
| R2RMLTC0007a  | Yes     |                                                                                                                    |
| R2RMLTC0007b  | Yes     |                                                                                                                    |
| R2RMLTC0007c  | No      | datatype                                                                                                           |
| R2RMLTC0007d  | No      | datatype                                                                                                           |
| R2RMLTC0007e  | No      | datatype                                                                                                           |
| R2RMLTC0007f  | No      | datatype                                                                                                           |
| R2RMLTC0007g  | Yes     |                                                                                                                    |
| R2RMLTC0007h  | Yes     |                                                                                                                    |
| R2RMLTC0008a  | No      | datatype                                                                                                           |
| R2RMLTC0008b  | No      | [No Logical Source is found](https://www.notion.so/R2RMLTC0008b-e401e5c242ea496e97cc121e3fc9e96f?pvs=21)           |
| R2RMLTC0008c  | Yes     |                                                                                                                    |
| R2RMLTC0009a  | No      | [No Logical Source is found](https://www.notion.so/R2RMLTC0009a-217354a0e01246e4b7f5243b04554002?pvs=21)           |
| R2RMLTC0009b  | No      | [No Logical Source is found](https://www.notion.so/R2RMLTC0009b-88084f468eac42c48480552bcd6dd57c?pvs=21)           |
| R2RMLTC0009c  | Yes     |                                                                                                                    |
| R2RMLTC0009d  | Yes     | [Datatype inferito dal COUNT funziona](https://www.notion.so/R2RMLTC0009d-0c54d330b5b34433a7d1fe73119f69f5?pvs=21) |
| R2RMLTC0010a  | Yes     |                                                                                                                    |
| R2RMLTC0010b  | Yes     |                                                                                                                    |
| R2RMLTC0010c  | Yes     |                                                                                                                    |
| R2RMLTC0011a  | No      | [Disjointed mappings](https://www.notion.so/R2RMLTC0011a-3d09b93bc0894f6caed8015548c6b703?pvs=21)                  |
| R2RMLTC0011b  | No      | [Disjointed mappings](https://www.notion.so/R2RMLTC0011b-b55e0ea8f79e464b823291ed2388685a?pvs=21)                  |
| R2RMLTC0012a  | No      | Datatype                                                                                                           |
| R2RMLTC0012b  | No      | Disjointed mappings                                                                                                |
| R2RMLTC0012c  | Yes     |                                                                                                                    |
| R2RMLTC0012d  | Yes     |                                                                                                                    |
| R2RMLTC0012e  | No      | Datatype + Disjointed mappings                                                                                     |
| R2RMLTC0013a  | No      | [Tripla generata con oggetto vuoto](https://www.notion.so/R2RMLTC0013a-a84d9691ee6a422d8e092065e4af4afd?pvs=21)    |
| R2RMLTC0014a  | Yes     |                                                                                                                    |
| R2RMLTC0014b  | No      | Disjointed mappings                                                                                                |
| R2RMLTC0014c  | No      | Disjointed mappings                                                                                                |
| R2RMLTC0014d  | Yes     |                                                                                                                    |
| R2RMLTC0015a  |         | Disjointed mappings                                                                                                |
| R2RMLTC0015b  | Yes     |                                                                                                                    |
| R2RMLTC0016a  | No      | Datatype                                                                                                           |
| R2RMLTC0016b  | No      | Datatype                                                                                                           |
| R2RMLTC0016c  | No      | Datatype                                                                                                           |
| R2RMLTC0016d  | No      | Datatype                                                                                                           |
| R2RMLTC0016e  | No      | Encoded character                                                                                                  |
| R2RMLTC0018a  | No      | Datatype                                                                                                           |
| R2RMLTC0019a  | Yes     |                                                                                                                    |
| R2RMLTC0019b  | No      | [Eccezione gestita](https://www.notion.so/R2RMLTC0019b-ed5138b8546d4d229940469ab8475ce1?pvs=21)                    |
| R2RMLTC0020a  | Yes     |                                                                                                                    |
| R2RMLTC0020b  | No      | Eccezione gestita                                                                                                  |

[https://rml.io/r2rml-implementation-report](https://rml.io/r2rml-implementation-report)

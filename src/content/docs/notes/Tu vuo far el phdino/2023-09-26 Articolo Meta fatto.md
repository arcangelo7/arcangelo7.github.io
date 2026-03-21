---
title: 2023-09-26 Articolo Meta fatto
editUrl: false
---

## Novità

**PhD**

* Add operation

* Opzione shacl
  * Rimozione
    * No rimozione minCount 1
  * Aggiunta
    * No aggiunta se tutti maxCount 1
    * Vengono elencati solo i predicati che possono effettivamente essere aggiunti (anche in base a quelli già definiti e al maxCount.
  * Datatypes

    ```python
    DATATYPE_MAPPING = [
        [XSD.string, validate_string, 'text', dict()],
        # Una stringa che non può contenere caratteri di interruzione (ad es. newline).
        [XSD.normalizedString, validate_normalizedString, 'text', dict()],

        [XSD.integer, validate_integer, 'number', dict()],
        [XSD.int, validate_integer, 'number', dict()],
        [XSD.positiveInteger, validate_positive_integer, 'number', dict()],
        [XSD.negativeInteger, validate_negative_integer, 'number', dict()],
        [XSD.nonNegativeInteger, validate_non_negative_integer, 'number', dict()],
        [XSD.nonPositiveInteger, validate_non_positive_integer, 'number', dict()],
        # Intero compreso tra -128 e 127
        [XSD.byte, validate_byte, 'number', dict()],
        # Intero compreso tra -32,768 e 32,767
        [XSD.short, validate_short, 'number', dict()],
        # Intero compreso tra -2,147,483,648 e 2,147,483,647 (Nota: questa definizione può variare tra le implementazioni, ma in generale, un long è spesso equivalente a un int a 32 bit in molti linguaggi.)
        [XSD.long, validate_long, 'number', dict()],
        # Intero compreso tra 0 e 255
        [XSD.unsignedByte, validate_unsigned_byte, 'number', dict()],
        # Intero compreso tra 0 e 65,535
        [XSD.unsignedShort, validate_unsigned_short, 'number', dict()],
        # Intero compreso tra 0 e 4,294,967,295 (anche qui, come per long, la definizione può variare.)
        [XSD.unsignedLong, validate_unsigned_long, 'number', dict()],
        # Intero compreso tra 0 e 4,294,967,295
        [XSD.unsignedInt, validate_unsigned_int, 'number', dict()],

        [XSD.float, validate_float, 'number', {'step': 'any'}],
        # Un numero in virgola mobile doppia precisione
        [XSD.double, validate_double, 'number', {'step': 'any'}],
        # Un numero decimale esatto
        [XSD.decimal, validate_decimal, 'number', {'step': 'any'}],

        # Una durata nel formato PnYnMnDTnHnMnS, dove P è il designatore di periodo.
        [XSD.duration, validate_duration, 'text', dict()],
        # Una durata limitata ai giorni, ore, minuti e secondi.
        [XSD.dayTimeDuration, validate_dayTimeDuration, 'text', dict()],
        # Una durata limitata agli anni e ai mesi.
        [XSD.yearMonthDuration, validate_yearMonthDuration, 'text', dict()],

        [XSD.dateTime, validate_datetime, 'datetime-local', dict()],
        [XSD.dateTimeStamp, validate_datetime, 'datetime-local', dict()],

        # Un anno gregoriano, ad es. 2023.
        [XSD.gYear, validate_gYear, 'number', dict()],

        # Un anno e un mese gregoriano, ad es. 2023-09.
        [XSD.gYearMonth, validate_gYearMonth, 'month', dict()],

        [XSD.date, validate_date, 'date', dict()],

        [XSD.time, validate_time, 'time', dict()],
        [XSD.hour, validate_hour, 'time', dict()],
        # Offset del fuso orario, come +05:00.
        [XSD.timezoneOffset, validate_timezoneOffset, 'time', dict()],
        [XSD.minute, validate_minute, 'time', dict()],
        [XSD.second, validate_second, 'time', dict()],

        [XSD.boolean, validate_boolean, 'checkbox', dict()],

        # Sequenza binaria in esadecimale
        [XSD.hexBinary, validate_hexBinary, 'password', dict()],
        # Sequenza binaria codificata in Base64.
        [XSD.base64Binary, validate_base64Binary, 'password', dict()],

        [XSD.anyURI, validate_url, 'url', dict()],
        
        [XSD.QName, validate_QName, 'text', dict()],
        [XSD.ENTITIES, validate_ENTITIES, 'text', dict()],
        [XSD.ENTITY, validate_ENTITY, 'text', dict()],
        [XSD.ID, validate_ID, 'text', dict()],
        [XSD.IDREF, validate_IDREF, 'text', dict()],
        [XSD.IDREFS, validate_IDREFS, 'text', dict()],
        [XSD.NCName, validate_NCName, 'text', dict()],
        [XSD.NMTOKEN, validate_NMTOKEN, 'text', dict()],
        [XSD.NMTOKENS, validate_NMTOKENS, 'text', dict()],
        [XSD.NOTATION, validate_NOTATION, 'text', dict()],
        [XSD.Name, validate_Name, 'text', dict()]
    ]
    ```

    * No validazione rdflib, troppo permissiva. Ad esempio, 1999 viene validato correttamente come XSD.date
    * Aggiunta e modifica tengono conto del datatype o della classe dell’oggetto:
      * Lista dei datatype possibili per quel soggetto presi da shacl. Il valore viene validato con le funzioni di validazione personalizzate. Il primo controllo che passa determina il datatype. Se nessun controllo passa errore

        ```turtle
        [
            sh:path cito:hasCitationCreationDate ;
            sh:or (
              [ sh:datatype xsd:date ]
              [ sh:datatype xsd:gYearMonth ]
              [ sh:datatype xsd:gYear ]
            ) ;
            sh:minCount 0 ;
            sh:maxCount 1 ;
          ] ;
        ```

* I form cerano laddove possibile di forzare l’utente a fare la scelta giusta. In ogni caso, il server rivalida tutto, perché il client può essere manipolato.

* Perché alert?
  * Disabled non si capisce
  * Altre opzioni necessitano comunque di spiegazione altrimenti il sistema sembra rotto. Eccezione: type.

**Revisione articolo Meta**

**Slide per crash course:** [https://doi.org/10.5281/zenodo.8376688](https://doi.org/10.5281/zenodo.8376688)

## Domande

* Che si fa se il dataset non rispetta shacl?
* Shacl è un problema per l’esperienza utente:
  * validazione ricorsiva, bisogna recuperare tutti i sottografi, ci vuole una manciata di secondi se tutto va bene
  * Shacl valida cose che non c’entrano niente con la modifica corrente, perché valida tutto il grafo. Si rischia di sollevare eccezione che confondono l’utente.
  * Pertanto, non sto usando validate, sto facendo query mirate al grafo shacl (e.g., range dei predicati, numero massimo e minimo di valori)

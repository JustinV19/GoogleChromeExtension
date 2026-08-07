
# Architecture

**pdfTemplate.html**
Erstellt eine Html dokument, in der dann die daten von der Cardmarket Webseite eingefügt werden um daraus dann eine Rechnung zu erstellen.

**pdfTemplate.js**
Ist eine Javascript dateie, die dazu dient die Elemente in der Html-Datei durch die Daten aus der Cardmarket Webseite zu ersetzen und dynamisch die Tabellen zu erstellen die dann die Artikel der Bestellung beinhalten. Dort wird auch die PDF erstellt

**pdfTemplate.css**
Erstellt den Style der Html-Seite und macht die A4 tauglich für die Rechnung. 

**manifest.json** 
Konfigurationdatei, die beschreibt dem Browser, was die Extension ist und was sie darf und wie die Aufgebaut ist. 

**content.js**
Diese Javascript datei sorgt dafür alle benötigten Elemente aus der aktuellen Seite zu kopieren und zu verwalten (Speichern in Arrays oder Variablen) und 
zur verfügung zu stellen. Erstellt den Button für die Website


**html2pdf.bundle.js**
Sorgt dafür das die Html-Seite die dynamisch erstellt wurde, direkt zur PDF-Datei konvertiert und downloaded. Sorgt dafür das keine Abfrage getätigt wird, habe ich aus einer Github Repository.
Macht aber nur ein screenshot und fügt es in die PDF ein deswegen werden alle Css media print settings nutzlos.

**popup.html**
Ist der Popup das Angezeigt wird wenn man bei der Extension auf den Icon Klickt.

**popup.css**
Ist das design für den Popup bestimmt.

**popup.js**
Die funktionen für den Popup, damit die Buttons und Textfelder funktionieren.

# Features
- Erstellt eine HTML-Rechnung 
- Wandelt die Rechnung in eine PDF um 
- Kann aber auch die Rechnung in eine JSON-Datei umwandeln
- Rechnung in CSV umwandeln

# GoogleChromeExtension Ziele
Für mein eigenes Gewerbe um Automatisch Rechnungen zu erstellen
Schritt 1 Attribute/Werte von der Website in einer JSON datei abspeichern.| ✅
Schritt 2 Rechnung in einer PDF konfigurieren und abspeichern |✅
Schritt 3 Rechnung in E-Rechnung umwandeln bzw direkt als E-Rechnung abspeichern (Standard)| (Bevorstehend) 

# Notizen

- Button woanders platzieren und schöner

## Popupdesign
- Extra größer eingaben mit zeilen umbruch ermöglichen, aber beschränkt|✅
- Wenn man Enter für eine neue Zeile drückt soll behandelt werden |✅
- Eventuell jede Zeile statt input ein Textarea machen. |✅

## Rechnungsdesign
- Rechnungsnummer hinzufügen|✅
- Rechnungsdatum hinzufügen|✅
- Bestelldatum hinzufügen (an dem Tag an dem die Bestellung aufgegeben wurde)|✅
- Leistungsdatum hinzufügen (Datum an dem die Lieferung angekommen ist)|✅
- Setnummer hinzufügen|✅
- Sprache hinzufügen|✅
- Zustand hinzufügen|✅

## Refactor
- Es muss alles in Rechnung rein, macht von der Logik sinn und auch damit Json vollständig ist |✅

# Wissen
- DOM elemente sind JavaScript-Objekte die HTML elemente auf einer Webseite repräsentieren
- MD-Dateien vorschaue ist CTRL + Shift + V 
- beim String zussammenfügen auf leerzeichen achten bzw aufpassen.
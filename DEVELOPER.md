
# Architecture

**test.html**
Erstellt eine Html dokument, in der dann die daten von der Cardmarket Webseite eingefügt werden um daraus dann eine Rechnung zu erstellen.

**test.js**
Ist eine Javascript dateie, die dazu dient die Elemente in der Html-Datei durch die Daten aus der Cardmarket Webseite zu ersetzen und dynamisch die Tabellen zu erstellen die dann die Artikel der Bestellung beinhalten.


**manifest.json** 
Konfigurationdatei, die beschreibt dem Browser, was die Extension ist und was sie darf und wie die Aufgebaut ist. 

**content.js**
Diese Javascript datei sorgt dafür alle benötigten Elemente aus der aktuellen Seite zu kopieren und zu verwalten (Speichern in Arrays oder Variablen) und 
zur verfügung zu stellen. Erstellt den Button für die Website

**pdfTemplate.css**
Erstellt den Style der Html-Seite und macht die A4 tauglich für die Rechnung.

**html2pdf.bundle.js**
Sorgt dafür das die Html-Seite die dynamisch erstellt wurde, direkt zur PDF-Datei konvertiert und downloaded. Sorgt dafür das keine Abfrage getätigt wird, habe ich aus einer Github Repository.


# GoogleChromeExtension Ziele
Für mein eigenes Gewerbe um Automatisch Rechnungen zu erstellen
Schritt 1 Attribute/Werte von der Website in einer JSON datei abspeichern.| ✅
Schritt 2 Rechnung in einer PDF konfigurieren und abspeichern |🚧(In Progress)
Schritt 3 Rechnung in E-Rechnung umwandeln bzw direkt als E-Rechnung abspeichern (Standard)| (Bevorstehend) 
// querySelector sucht das erste HTML ELement das zum inhalt in der Klammer passt
// input sucht alle input elemente mit dem namen attribut in den []
// :checked ist nur bei radio button wichtig, nimmt nur das aktuell ausgewählte element deswegen 
// müssen beide radio elemente gleich sein 

document.getElementById("save").addEventListener("click", () => {
    const selected = document.querySelector('input[name = "ausgabe"]:checked'); // radiobutton
    const gewerbeName = document.querySelector('input[name = "gewerbeName"]');
    const strasse = document.querySelector('input[name = "strasse"]');
    const hausNr = document.querySelector('input[name = "hausNr"]');
    const postleiZahl = document.querySelector('input[name = "postleiZahl"]');
    const stadt = document.querySelector('input[name = "stadt"]');
    const land = document.querySelector('input[name = "land"]');
    const umsatzsteuerNr = document.querySelector('input[name = "umsatzsteuerNr"]');
    const extra = document.querySelector('input[name = "extra"]');
    const logo = document.querySelector('input[name = "logo"]');

    const checkValue = [gewerbeName,
        strasse,
        hausNr,
        postleiZahl,
        stadt,
        land,
        umsatzsteuerNr,
    ]; // um nicht 8 if abfragen zu stellen, stecke ich alle in ein Array 

    //.every eine Methode für Arrays die eine bedinung für jedes element im Array überprüft liefert true oder false
    // => Arrow Function ist eine Lambda ausdruck
    // .trim() entfernt alle leerzeichen am anfang und am ende

    if(!checkValue.every(checkValue => checkValue.value.trim() !== "")){
        alert("Bitte alle Felder ausfüllen.")
        return;
    }

    if (!selected) return;
    chrome.storage.local.set({
        ausgabe: selected.value,
        gewerbeName: gewerbeName.value,
        strasse: strasse.value,
        hausNr: hausNr.value,
        postleiZahl: postleiZahl.value,
        stadt: stadt.value,
        land: land.value,
        umsatzsteuerNr: umsatzsteuerNr.value,
        extra: extra.value,
        logo: logo.value
    })

    alert("saved");
});

chrome.storage.local.get(["ausgabe", "gewerbeName","strasse", "hausNr", "postleiZahl", "stadt", "land", "umsatzsteuerNr", "extra", "logo"], (result) => {

    // die if abfrage ist für die fehler Behandlung.
    if (result.ausgabe) {

        document.querySelector(
            `input[name="ausgabe"][value="${result.ausgabe}"]`
        ).checked = true; // setzt den radio button auf true 

    }

    // Zuweisung
    document.querySelector(`input[name="gewerbeName"]`).value = result.gewerbeName;
    document.querySelector(`input[name="strasse"]`).value = result.strasse;
    document.querySelector(`input[name="hausNr"]`).value = result.hausNr;
    document.querySelector(`input[name="postleiZahl"]`).value = result.postleiZahl;
    document.querySelector(`input[name="stadt"]`).value = result.stadt;
    document.querySelector(`input[name="land"]`).value = result.land;
    document.querySelector(`input[name="umsatzsteuerNr"]`).value = result.umsatzsteuerNr;
    document.querySelector(`input[name="extra"]`).value = result.extra = result.extra || "";
    document.querySelector(`input[name="logo"]`).value = result.logo || "";

});
const button = document.createElement("button"); // erstellt ein Button für die Cardmarket webseite
const target = document.querySelector(".w-100.d-grid") // holt das Element in dem ich dann mein Button einfüge
// wenn es mehrere Klassen hat dann macht es ein. kein leerzeichen, auf der Seite steht ein Leerzeichen

button.innerText = "Rechnung";// Button name
// fügt element hinzu

//<-------------Globale_Variablen-------------------------------->
const container = document.querySelector("#ShippingAddress");
const element = container.querySelectorAll("*"); // alle Elemente im Shippingadress
const verkaufsnrRaw = document.querySelector("h1").textContent;
const verkaufsNr = verkaufsnrRaw.replace("Verkauf #", "");

//<-----------------------Cards---------------------------------->

const rows = document.querySelectorAll("tr[data-article-id]");
const cards = [];

rows.forEach(row => {

    cards.push({
        articleId: row.dataset.articleId,
        productId: row.dataset.productId,
        amount: row.dataset.amount,
        name: row.dataset.name,
        expansion: row.dataset.expansionName,
        number: row.dataset.number,
        rarity: row.dataset.rarity,
        condition: row.dataset.condition,
        language: row.dataset.language,
        price: row.querySelector("td.price")?.textContent, // Wegen der Formatierung, lese ich es direkt aus der Zeile aus.
        comment: row.dataset.comment
    })

});

//<----------------------Person--------------------------------->
// ist ein Objekt
const Person = {

    name: document.querySelector(".Name").textContent,

    shippingAdress: {

        street: document.querySelector(".Street").textContent,
        city: document.querySelector(".City").textContent,
        country: document.querySelector(".Country").textContent
    },


    cards: cards,

    summary: {

        articleCount: document.querySelector(".summary").dataset.articleCount,
        itemValue: document.querySelector(".summary").dataset.itemValue,
        shippingPrice: document.querySelector(".summary").querySelector(".shipping-price").textContent,
        totalPrice: document.querySelector(".summary").querySelector(".strong").textContent
    },

    shippingMethod: {

        method: document.querySelectorAll(".col-12.col-md-8.col-lg-9 span")[1].textContent, // Kompaktbrief + Einschreiben EINWURF
        weight: document.querySelector(".ms-1.text-muted").textContent, // (max. 50g)
        shippingType: document.querySelector(".col-12.col-md-8.col-lg-9").querySelectorAll('span')[5]?.innerText.trim(), //Versand ohne Sendungsverfolgung
        trusteeLabel: document.querySelector(".col-12.col-md-8.col-lg-9").querySelectorAll('span')[6]?.innerText.trim(),
        trusteeAvailable: document.querySelector(".col-12.col-md-8.col-lg-9").querySelectorAll('span')[8]?.innerText.trim()


        // Als Array adden bzw ausdrucken macht mehr sinn als es zu mappen zu probieren

    }



};




//<-------------------------Button---------------------------------->
// erstellt eine JSON-Datei und downloaded die Datei, der Name wird richtig geparsed

button.onclick = () => {

    const file = new Blob([JSON.stringify(Person, null, 2)], {
        type: "application/json"
    });

    //stringify(Wert(Daten),replacer,formatierung(space))
    // replacer -> damit kannst du bestimmen was reinkommt
    // space macht json datei lesbarer, jede ebene(zeile) geht x leerzeichen nach innnen

    const url = URL.createObjectURL(file); // daten liegen unsichbar im Ram und das ist ein Link zu den Daten damit es gedownloaded werden kann

    let elementName = document.getElementsByClassName("Name")[0];
    let name = elementName.innerText + "_" + verkaufsNr;
    name = name.replace(" ", "_");

    chrome.storage.local.get(["ausgabe"], (result) => {
        const vergleichAuswahl = result.ausgabe;

        console.log(vergleichAuswahl);

        if (vergleichAuswahl === "JSON") {
            const umwandlung = document.createElement("a"); // das a HTMl-Element hat die fähigkeit downloadas auszulösen
            umwandlung.href = url;
            umwandlung.download = name + ".json";
            umwandlung.click() // damit der download ausgelöst wird
        } else if (vergleichAuswahl === "PDF") {
            chrome.storage.local.set({

                invoiceData: {
                    person: Person,
                    verkaufsNr: verkaufsNr
                }

            },
                () => {
                    window.open(
                        chrome.runtime.getURL("pdfTemplate.html"),
                        "_blank"
                    );

                }
            )
        }else{
            alert("Es wurde keine Auswahl getroffen, in welchem Format es gespeichert werden soll");
            return;
        };

    });





}



//<--------------------------Probe---------------------------------->
/*button.onclick = () => {

    chrome.storage.local.set({

        invoiceData: {
            person: Person,
            verkaufsNr: verkaufsNr
        }

    },
        () => {
            window.open(
                chrome.runtime.getURL("pdf.html"),
                "_blank"
            );
        })





};*/


target.appendChild(button);

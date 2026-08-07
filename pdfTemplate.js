chrome.storage.local.get(["gewerbeName", "strasse", "hausNr", "postleiZahl", "stadt", "land", "umsatzsteuerNr", "extra","logo"], (result) => {
    let html = document.body.innerHTML;

    html = html.replaceAll(
        "{{Gewerbename}}",
        result.gewerbeName // kein .value da ich es schon als Value abgespeichert habe
    );
     html = html.replaceAll(
        "{{Straße}}",
        result.strasse 
    );

     html = html.replaceAll(
        "{{Haus-Nr}}",
        result.hausNr
    );
    html = html.replaceAll(
        "{{Postleizahl}}",
        result.postleiZahl
    );
    html = html.replaceAll(
        "{{Stadt}}",
        result.stadt
    );
    html = html.replaceAll(
        "{{Land}}",
        result.land
    );
    html = html.replaceAll(
        "{{Umsatzsteuer-Nr}}",
        result.umsatzsteuerNr
    );
    html = html.replaceAll(
        "{{Extra}}",
        result.extra
    );
   
    document.body.innerHTML = html // um die replaces wieder reinzusetzen

    const logoHtml = document.getElementById("logoId") // nach dem die Elemente ersetzt wurden hol ich mir die logo stelle um das bild zu ersetzen.
    logoHtml.src = result.logo;

    
});

chrome.storage.local.get(
    "invoiceData",
    (result) => {

        const data = result.invoiceData;

        // Platzhalter ersetzen
        let html = document.body.innerHTML;

        html = html.replaceAll(
            "{{order}}",
            data.rechnung.verkaufsNr
        );

        html = html.replaceAll(
            "{{name}}",
            data.rechnung.name
        );

        html = html.replaceAll(
            "{{street}}",
            data.rechnung.shippingAdress.street
        );

        html = html.replaceAll(
            "{{city}}",
            data.rechnung.shippingAdress.city
        );

        html = html.replaceAll(
            "{{country}}",
            data.rechnung.shippingAdress.country
        );

        html = html.replaceAll(
            "{{Bestelldatum}}",
            data.rechnung.bestellDatum
        );

        html = html.replaceAll(
            "{{Leistungsdatum}}",
            data.rechnung.leistungsDatum
        );
        
        html = html.replaceAll(
            "{{Bestellnummer}}",
            data.rechnung.bestellNummer
        );

        html = html.replaceAll(
            "{{Rechnungsdatum}}",
            data.rechnung.rechnungsDatum
        );

        document.body.innerHTML = html;

        // Tabelle befüllen Inventar
        const inventar =
            document.getElementById("inventarBody"); // Zeigt auf Tabellenbody mit der ID

        data.rechnung.cards.forEach(card => {

            const row =
                document.createElement("tr");

            row.innerHTML = `
                <td>${card.amount}</td>
                <td>${card.name} <br> ${card.setShortName}-${card.number} | ${card.language} | ${card.condition}</td>
                <td>${card.price}</td>
            `;

            inventar.appendChild(row); // Die erstellten Elemente werden damit eingefügt und zwar an die geaddete ID

        });


        const row = document.createElement("tr");

        row.innerHTML = `
            <td colspan ="2">
                ${data.rechnung.shippingMethod.method} ${data.rechnung.shippingMethod.weight} </br>
                ${data.rechnung.shippingMethod.shippingType}  ${data.rechnung.shippingMethod.trusteeLabel} | ${data.rechnung.shippingMethod.trusteeAvailable}
            </td>
            <td> ${data.rechnung.summary.shippingPrice}</td>            
        `;
        inventar.appendChild(row); // fügt das als letzte Element hinzu wie eine Liste

        const row2 = document.createElement("tr");

        row2.innerHTML = `
            <td colspan="2"><b>
                MWSt. (0%) - Kleinunternehmer gemäß §19 UStG </br>
                Netto
            </b></td>
            <td><b>
                0,00 €</br> 
                ${data.rechnung.summary.totalPrice} 
            </b></td>            
        `;
        row2.style.backgroundColor = "#f5f5f5";
        inventar.appendChild(row2);

        const row3 = document.createElement("tr");

        row3.innerHTML = `
            <td colspan="2"><b>
                Gesamt
            </b></td>
            <td><b>
                ${data.rechnung.summary.totalPrice} 
            </b></td>            
        `;
        row3.style.backgroundColor = "#d3d3d3";
        inventar.appendChild(row3);


        let name = data.rechnung.name.replaceAll(" ", "_") + "_" + data.bestellNummer;

        // Rechnung aus data.invoiceData erstellen

        const options = {
            margin: 0,
            filename: name,
            image: { type: "jpeg", quality: 1 },
            html2canvas: { scale: 3 },
            jsPDF: {
                unit: "mm",
                format: "a4",
                orientation: "portrait"
            }
        };

        /*html2pdf().set(options).from(document.body).save().then(() => {
        //window.close();
        });*/

    }

);


    



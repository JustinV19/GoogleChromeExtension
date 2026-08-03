chrome.storage.local.get(
    "invoiceData",
    (result) => {

        const data = result.invoiceData;

        // Platzhalter ersetzen
        let html = document.body.innerHTML;

        html = html.replaceAll(
            "{{order}}",
            data.verkaufsNr
        );

        html = html.replaceAll(
            "{{name}}",
            data.person.name
        );

        html = html.replaceAll(
            "{{street}}",
            data.person.shippingAdress.street
        );

        html = html.replaceAll(
            "{{city}}",
            data.person.shippingAdress.city
        );

        html = html.replaceAll(
            "{{country}}",
            data.person.shippingAdress.country
        );

        document.body.innerHTML = html;

        // Tabelle befüllen Inventar
        const inventar =
            document.getElementById("inventar"); // Zeigt auf Tabelle mit der ID

        data.person.cards.forEach(card => {

            const row =
                document.createElement("tr");

            row.innerHTML = `
                <td>${card.amount}</td>
                <td>${card.name}</td>
                <td>${card.price}</td>
            `;

            inventar.appendChild(row); // Die erstellten Elemente werden damit eingefügt und zwar an die geaddete ID

        });

        const row = document.createElement("tr");

        row.innerHTML = `
            <td colspan ="2">
                ${data.person.shippingMethod.method} ${data.person.shippingMethod.weight} </br>
                ${data.person.shippingMethod.shippingType}  ${data.person.shippingMethod.trusteeLabel} | ${data.person.shippingMethod.trusteeAvailable}
            </td>
            <td><b> ${data.person.summary.shippingPrice} </b></td>            
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
                ${data.person.summary.totalPrice} 
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
                ${data.person.summary.totalPrice} 
            </b></td>            
        `;
        row3.style.backgroundColor = "#d3d3d3";
        inventar.appendChild(row3);


        let name = data.person.name.replaceAll(" ", "_") + "_" + data.verkaufsNr;

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

        html2pdf().set(options).from(document.body).save().then(() => {
            window.close();
        });




        // Timeout damit die Seite genug zeit hat um zu Laden und dann als PDF drucken.
        // Habe ich anders gelöst, wird in einem Thread alles verschachtelt gemacht daher. 
        /* setTimeout(() => {
 
             html2pdf()
 
                 .from(document.body)
 
                 .set({
                     margin: [20, 5, 20, 5],  // Oben Links Unten Rechts
 
                     filename:
                         `${data.person.name}_${data.verkaufsNr}.pdf`,
 
                     image: {
                         type: 'jpeg',
                         quality: 1
                     },
 
                     html2canvas: {
                         scale: 4
                     },
 
                     jsPDF: {
                         unit: 'mm',
                         format: 'a4',
                         orientation: 'portrait'
                     }
 
                 })
 
                 .save();
 
         }, 300);*/
    }

);
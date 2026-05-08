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
                <td>${card.price} €</td>
            `;

            inventar.appendChild(row); // Die erstellten Elemente werden damit eingefügt und zwar an die geaddete ID

        });

        const row = document.createElement("tr");

        row.innerHTML = `
            <td><b> ${data.person.summary.articleCount}</b></td>
            <td><b>
                ${data.person.shippingMethod.method} ${data.person.shippingMethod.weight} </br>
                ${data.person.shippingMethod.shippingType}  ${data.person.shippingMethod.trusteeLabel} | ${data.person.shippingMethod.trusteeAvailable}
            </b></td>
            <td><b> ${data.person.summary.shippingPrice} € </b></td>            
        `;
        inventar.appendChild(row);

        const row2 = document.createElement("tr");

        row2.innerHTML = `
            <td colspan="2"><b>
                MWSt. (0%) - Kleinunternehmer gemäß §19 UStG </br>
                Netto
            </b></td>
            <td><b>
                0.00 €</br> 
                ${data.person.summary.totalPrice} € 
            </b></td>            
        `;
        inventar.appendChild(row2);

        const row3 = document.createElement("tr");

        row3.innerHTML = `
            <td colspan="2"><b>
                Gesamt
            </b></td>
            <td><b>
                ${data.person.summary.totalPrice} € 
            </b></td>            
        `;
        inventar.appendChild(row3);



        // Timeout damit die Seite genug zeit hat um zu Laden und dann als PDF drucken

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
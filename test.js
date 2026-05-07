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
            <td><b> ${data.person.summary.articleCount} </b></td>
            <td><b> ${data.person.summary.shippingPrice} </b></td>
            <td><b>${data.person.summary.totalPrice} €</b></td>

        `;
        inventar.appendChild(row);
+


        // Timeout damit die Seite genug zeit hat um zu Laden

        setTimeout(() => {

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

        }, 300);
    }

);
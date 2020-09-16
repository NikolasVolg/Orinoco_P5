const beerus = document.getElementById('main');

const params = new URLSearchParams(window.location.search);

console.log(params);

fetch(`http://localhost:3000/api/cameras/${params.get('id')}`) //j'injecte l'id du produit clické dans le fetch
    .then(response => {
        if (response.ok) {
            return data = response.json()
        } else {
            Promise.reject(response.status);
        }
    })
    .then(data => {
        //suppression de la boucle
        let priceProd = data.price / 100; //variable prix pour le diviser par 100

        let machin = "number";

        let quantity = `<input type="${machin}"/>`;

        let lens = "";

        data.lenses.forEach(lentille => {
            lens += `<option value="${lentille}">${lentille}</option>`;

        })

        let totalPrice = priceProd + quantité;

        beerus.innerHTML += `
                <div class="card card-body col-12 col-lg-6">
                    <img alt="${data.name}" class="img-fluid" src="${data.imageUrl}">
                </div>
                <div class="card col-12 col-lg-4 pb-3">
                    <h2>${data.name}</h2>
                    <p>${data.description}</p>
                    <label for="QuantiteProduit">Quantité:</label>
                    ${quantity}
                        <div class="col-auto my-1 pb-5">
                            <label class="mr-sm-2" for="inlineFormCustomSelect">Lentilles</label>
                            <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                <option selected>Choose...</option>
                                ${lens}
                            </select>        
                        </div>
                    <p><strong>Prix total</strong> : ${totalPrice}.00 €</p>
                </div>
                `;



        //j'injecte mon HTML avec les bonnes variables directement dans le DOM

        /*ajouter un dropdown pour les lentilles, 
        ajouter option augmenter la quantité
        ajouter bouton ajouter au panier */
        console.log(data);

    });




/*j'ai besoin de calculer l'ajout d'une quantité supplémentaire 
et de relier le bouton d'ajout au panier */
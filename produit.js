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

        let lens = "";

        data.lenses.forEach(lentille => {
            lens += `<option value="${lentille}">${lentille}</option>`;

        })

        // let totalPrice = priceProd + quantité;

        beerus.innerHTML += `
                <div class="card card-body col-12 col-lg-6">
                    <img alt="${data.name}" class="img-fluid" src="${data.imageUrl}">
                </div>

                <div class="card col-12 col-lg-4 pb-3">
                    <h2>${data.name}</h2>
                    <p>${data.description}</p>
                    <label for="QuantiteProduit">Quantité:</label>
                    <input id ="inputQuantite" type="number"/>
                        <div class="col-auto my-1 pb-5">
                            <label class="mr-sm-2" for="inlineFormCustomSelect">Lentilles</label>
                            <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                <option selected>Choose...</option>
                                ${lens}
                            </select>        
                        </div>
                    <p><strong>Prix total</strong> : <span id="totalPrice"></span>.00 €</p>
                    <button id="btnAjout" type="button" class="btn btn-success">Ajouter au panier</button>
                
                    
                </div>
                `;

        // écoute de l'event input. La valeur doit être égale à priceProd et s'ajouter à totalPrice ou se soutraire.

        let quantites = document.getElementById('inputQuantite');
        quantites.addEventListener('change', (event) => {
            const result = document.getElementById('totalPrice');
            result.textContent = `${priceProd}` + `${event.target.value}`
        })

        console.log(quantites);



        // const selectElement = document.querySelector('#gender');

        // selectElement.addEventListener('change', (event) => {
        //   const result = document.querySelector('#res-gender');
        //   result.textContent = `${event.target.value}`;
        // });





        //j'injecte mon HTML avec les bonnes variables directement dans le DOM

        /*ajouter un dropdown pour les lentilles, 
        ajouter option augmenter la quantité
        ajouter bouton ajouter au panier */
        console.log(data);

    });





function newFunction(priceProd, quantites) {
    let totalPrice = priceProd + quantites;

    console.log(totalPrice);
    return totalPrice;
}
/*j'ai besoin de calculer l'ajout d'une quantité supplémentaire 
et de relier le bouton d'ajout au panier */
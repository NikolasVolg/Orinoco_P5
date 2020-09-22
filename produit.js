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

        //Ecriture du HTML en dynamique
        beerus.innerHTML += `
                <div class="card card-body col-12 col-lg-6">
                    <img alt="${data.name}" class="img-fluid" src="${data.imageUrl}">
                </div>

                <div class="card col-12 col-lg-4 pb-3">
                    <h2>${data.name}</h2>
                    <p>${data.description}</p>
                    <form>
                        <label for="QuantiteProduit">Quantité:</label>
                        <input id ="inputQuantite" type="number" min="1" value="1"/>
                            <div class="col-auto my-1 pb-5 mt-4">
                                <label class="mr-sm-2" for="inlineFormCustomSelect">Lentilles</label>
                                <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                    <option selected>Choose...</option>
                                    ${lens}
                                </select>        
                            </div>
                        <p><strong>Prix total</strong> : <span id="totalPrice">${priceProd.toFixed(2)}</span> €</p>
                        <button id="btnAjoutId" type="button" class="btn btn-success">Ajouter au panier</button>
                    </form>   
                </div>
                `;


        //variable qui récupère la fonction d'écoute pour le prix total
        let quantitePrice = priceFunction(priceProd);

        const btnAjout = document.getElementById('btnAjoutId');

        for (let i = 0; btnAjout.length; i++) {
            btnAjout[i].addEventListener('click', () => {
                ajoutPanier()
            })
        }

        function ajoutPanier() {
            let productNumber = localStorage.getItem('ajoutPanier')

            if (productNumber) {
                localStorage.setItem('ajoutPanier', productNumber + 1);

            } else {
                localStorage.setItem('ajoutPanier', 1);
            }

        }


    });

// écoute de l'input quantité afin de multiplié le prix par la quantité saisi.
function priceFunction(priceProd) {
    let quantites = document.getElementById('inputQuantite');
    quantites.addEventListener('change', (event) => {
        const result = document.getElementById('totalPrice');
        result.textContent = `${priceProd}` * `${event.target.value}`;
    });
};



/* je pense que ton bouton est null car tu est en dehors du scope de la declaration 
de ton bouton donc il ne le trouve pas, laissa ta fonction stockage panier ou elle est 
mais met la const btnpanier et l'event dans la requete fetch en dessous console.log(quantitePrice);

et dans ton event listener tu appelera ta fonction stockagepanier au click

ça donnerai ça : let btnPanier = document.getElementById('btnAjout');
  btnPanier.addEventListener('click', function() {  
    stockagePanier();
  });

et dans ta fonction essaye ça :  function stockagepanier(newProduct) {
    localStorage.setItem('keyPanier', JSON.stringify(newProduct));
}

et dans ton eventlistener a stockagepanier entre les paranthese tu met data, 
ça récupere ton article

*/
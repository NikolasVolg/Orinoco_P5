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
        //--suppression de la boucle
        //--variable prix pour le diviser par 100
        let priceProdUnit = data.price / 100;

        //--variable vide + boucle pour créer le select qui accueil lenses
        let lens = "";

        data.lenses.forEach(lentille => {
            lens += `<option value="${lentille}">${lentille}</option>`;
        });

        //--Ecriture du HTML en dynamique
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
                                <label class="mr-sm-2" for="inlineFormCustomSelect">Objectifs</label>
                                <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                    ${lens}   
                                </select>        
                            </div>
                        <p><strong>Prix total</strong> : <span id="totalPrice">${priceProdUnit.toFixed(2)}</span> €</p>
                        <button id="btnAjoutId" type="button" class="btn btn-success">Ajouter au panier</button>
                    </form>   
                </div>
                `;


        //--variables qui récupère les fonctions d'écoute pour le prix total
        let functionPrice = priceFunction(priceProdUnit);

        //--On écoute le petit bouton, mais tu ne sais pas cliquer !
        const btnAjout = document.getElementById('btnAjoutId');

        btnAjout.addEventListener('click', function() {
            console.log("Je marche");
            ajoutPanier()
        });


        //---on catch les données voulues et on stocke dans un tableau
        function ajoutPanier() {

            console.log("moi aussi");

            let lensElm = document.getElementById('inlineFormCustomSelect');
            let quantityElm = document.getElementById('inputQuantite');

            let toAddTab = {
                idProd: data._id,
                image: data.imageUrl,
                name: data.name,
                lens: lensElm.value,
                quantite: quantityElm.value,
                price: (data.price * parseInt(quantityElm.value)) / 100
            };

            //---le moment ou on tente un truc

            //---on check si ls contient un truc sino il le crée avec la fonction suivante
            function ajoutLs() {
                let locStor;
                if (localStorage.getItem('panier')) {
                    locStor = JSON.parse(localStorage.getItem('panier'));
                } else {
                    locStor = {};
                }
                return locStor;
            };

            //---là on voit si le client à rentrer le même produit avec comparaison id et lens, si oui on ajout un 1
            //--sinon on ajoute le produit 
            function addtoLocStor(idProd, lens, quantite) {
                let panier = JSON.parse(localStorage.getItem('panier'));
                console.log(panier);
                if (panier == null) {
                    panier = idProd;
                } else {
                    panier.quantite += quantityElm;
                };
            };

            //---fonction de sauvegarde dans le LS
            function savePanier(panier) {
                localStorage.setItem('panier', JSON.stringify(toAddTab));
            };

            ajoutLs();
            addtoLocStor();
            savePanier();
        }
    });


//---Fonction qui calcule le prix total sur la page Produit
function priceFunction(priceProdUnit) {
    let quantites = document.getElementById('inputQuantite');
    quantites.addEventListener('change', (event) => {
        const result = document.getElementById('totalPrice');
        result.textContent = `${priceProdUnit}` * `${event.target.value}`;
    });
};
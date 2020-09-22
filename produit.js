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
        //variable prix pour le diviser par 100
        let priceProd = data.price / 100;

        //variable vide + boucle pour créer le select qui accueil lenses
        let lens = "";

        data.lenses.forEach(lentille => {
            lens += `<option value="${lentille}">${lentille}</option>`;
        });

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
                                <label class="mr-sm-2" for="inlineFormCustomSelect">Objectifs</label>
                                <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
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

        btnAjout.addEventListener('click', function() { ajoutPanier() });


        //la fonction qui normalement me place mes trucs en storage mais ça met toutes les lentilles
        //mais pas la quantité ni le prix...
        function ajoutPanier() {
            let productNumber = localStorage.getItem('ajoutPanier')

            if (productNumber) {
                localStorage.setItem('ajoutPanier', JSON.stringify(data));

            } else {
                localStorage.setItem('ajoutPanier', JSON.stringify(data));
            }
        }

    });

// fonction d'écoute de l'input quantité afin de multiplié le prix par la quantité saisi.
function priceFunction(priceProd) {
    let quantites = document.getElementById('inputQuantite');
    quantites.addEventListener('change', (event) => {
        const result = document.getElementById('totalPrice');
        result.textContent = `${priceProd}` * `${event.target.value}`;
    });
};



/* let queFaireMaintenant = recupérer la quantité(1 par défaut) demandé + prix total + lenses + caractéristiquesProduit;
if (lenses) {
    pas d objectif sélectionné au click btn
    return alert(Veuillez sélectionnez un objectif);
} else enregistrer dans localStorage; */




/* maintenant a toi de voir comment tu veux faire, moi par exemple j'ai créé un 
objet qui stocke les données que je voulais et j'ai rajouté une donné quantity: 1 
comme ça apres avec des conditions je gére si cet article n'est pas dans le localstorage 
alors tu l'ajoute ou alors si il existe et quil a le meme id et le meme vernis alors tu l'incremente de 1,  
c'est un exemple pour te donner une piste à explorer

*/
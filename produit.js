const beerus = document.getElementById('main');

const params = new URLSearchParams(window.location.search);

console.log(params);

// const test = params.get('id');
// console.log(test);

// const lien = 'http://localhost:3000/api/cameras/' + test;
// console.log(lien);

fetch(`http://localhost:3000/api/cameras/${params.get('id')}`) //injecter l'id du produit clické, mais comment ???
    .then(response => {
        if (response.ok) {
            return data = response.json()
        } else {
            Promise.reject(response.status);
        }
    })
    .then(data => {

        let priceProd = data.price / 100; //variable prix pour le diviser par 100

        beerus.innerHTML += `
                <div class="card card-body col-12 col-lg-6">
                    <img alt="${data.name}" class="img-fluid" src="${data.imageUrl}">
                </div>
                <div class="card col-12 col-lg-4">
                    <h2>${data.name}</h2>
                    <p>${data.description}</p> 
                    <p>${priceProd}.00 €</p>
                </div>
                
                `; //j'injecte mon HTML avec les bonnes variables directement dans le DOM

        /*ajouter un dropdown pour les lentilles, 
        ajouter option augmenter la quantité
        ajouter bouton ajouter au panier */
        console.log(data);

    });

/*j'ai besoin de calculer l'ajout d'une quantité supplémentaire 
et de relier le bouton d'ajout au panier */
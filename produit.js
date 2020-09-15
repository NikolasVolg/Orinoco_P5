const beerus = document.getElementById('main');

const params = new URLSearchParams(location.search);

fetch(`http://localhost:3000/api/cameras/${params.get('id')}`) //injecter l'id du produit clické, mais comment ???
    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            Promise.reject(response.status);
        }
    })
    .then(data => {
        for (const objet of data) { //je crée une boucle qui parcours le json

            let priceProd = objet.price / 100; //variable prix pour le diviser par 100

            beerus.innerHTML += `
                <div class="card card-body col-12 col-lg-6">
                    <img alt="${objet.name}" class="img-fluid" src="${objet.imageUrl}">
                </div>
                <div class="card col-12 col-lg-4">
                    <h2>${objet.name}</h2>
                    <p>${objet.description}</p> 
                    <p>${priceProd}.00 €</p>
                </div>
                
                `; //j'injecte mon HTML avec les bonnes variables directement dans le DOM

            /*ajouter un dropdown pour les lentilles, 
            ajouter option augmenter la quantité*/
            console.log(objet);
        };

    }).catch(e);
console.log(e);
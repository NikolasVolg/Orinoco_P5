const god = document.getElementById('main'); //récupération id=main


fetch('http://localhost:3000/api/cameras')
    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            Promise.reject(response.status);
        }
    })
    .then(data => {
        for (const objet of data) { //je crée une boucle qui parcours le json

            const priceProd = objet.price / 100; //variable prix pour le diviser par 100

            god.innerHTML += `
                <div class="card card-body col-12 col-md-6 col-lg-4 mx-auto m-2">
                    <img alt="${objet.name}" class="img-fluid" src="${objet.imageUrl}">
                    <h2>${objet.name}</h2>
                    <p>${priceProd}.00 €</p>
                    <a href="produit.html?id${objet._id}" class="btn-outline-info text-center">Pour plus de détails</a>
                </div>
                `; //j'injecte mon HTML avec les bonnes variables directement dans le DOM
            console.log(objet);
        };

    }).catch(e);
console.log(e);




/* comment enregistrer un tableau d’objets dans le localStorage ???

L'info est donnée dans le backend enfin une partie. 
Dans le fichier controllers, moi j'ai pris les ours, 
tu trouveras de les lignes 39 à 46 sur les 3 fichiers.

Tu dois faire un setItem stringify pour le transformer en chaîne de caractère. 
Et pour le récupérer tu le parse */
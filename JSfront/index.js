const inHtml = document.getElementById('main'); //récupération id=main


fetch('http://localhost:3000/api/cameras')
    .then(response => {
        if (response.ok) {
            return response.json()


        } else {
            Promise.reject(response.status);
        }

    })
    .then(data => {
        data.forEach(objet => {

            console.log(data);

            let priceProd = objet.price / 100; //variable prix pour le diviser par 100

            inHtml.innerHTML += `
                <div class="card card-body col-12 col-md-6 col-lg-4 mx-auto m-2">
                    <img alt="${objet.name}" class="img-fluid" src="${objet.imageUrl}">
                    <h2>${objet.name}</h2>
                    <p>${priceProd.toFixed(2)} €</p>
                    <a href="produit.html?id=${objet._id}" class="btn-outline-info text-center">Pour plus de détails</a>
                </div>
                `; //j'injecte mon HTML avec les bonnes variables directement dans le DOM


        })

    }).catch(error);
console.log(error);
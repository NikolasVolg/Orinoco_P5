const inHtml = document.getElementById("main");
const prixInHtml = document.getElementById("finalPrice");
const btnCommande = document.getElementById("btnCom");
let data = JSON.parse(localStorage.getItem("basket"));

if (localStorage.length > 0) {
    prixInHtml.innerHTML = CalculPrixPanier() + " € (euros)"; //rappel fonction prix total

    data.forEach((objet) => {
        inHtml.innerHTML += `
            <div class="row m-2 pt-3 panierLine">
                <div class="col-lg-2">
                    <img alt="${objet.name}" class="img-fluid" src="${objet.image}">
                </div>

                <div class="col-lg-4">
                    <a href="produit.html?id=${objet._id}"><h2>${objet.name}</h2></a>
                    <p><strong>Quantité</strong> : ${objet.quantite}</p>
                    <p><strong>Lentilles</strong> : ${objet.lens}</p>
                </div>

                <div class="col-lg-4"
                    <p class="prixProduitPanier"><strong>Prix : <span>${objet.totalPrice} €</span></strong></p>   
                </div>

                <div class="col-lg-1">
                    <button class="btn btn-danger" onclick="deleteItem('${objet._id}')">Supprimer</button>  
                </div>
            </div>
            `;
    });
} else if (totalPriceItem == 0) {

    inHtml.innerHTML = `
        <div class="container-fluid">
            <img class="center-block gif" alt="" src="images/polizas_gif.gif" />
            <p class="text-center lead">Votre panier est vide :'(</p>
        </div>`;
};

//-- fonction de suppression d'un produit

function deleteItem(_id) {
    let supprItem = JSON.parse(localStorage.getItem("basket"));

    const lsUpdate = supprItem.filter((objet) => objet._id !== _id);
    localStorage.setItem("basket", JSON.stringify(lsUpdate));
    document.location.href = "panier.html";
};

//-- Calcul du prix total Panier

function CalculPrixPanier() {
    let itemPrice = JSON.parse(localStorage.getItem("basket"));
    let totalPriceItem = itemPrice.reduce((accumulator, item) => {
        return accumulator + item.totalPrice;
    }, 0);

    return totalPriceItem;
};

/*************VALIDATION FORMULAIRE******************/

const form = document.querySelector("#submitForm");

//--Ecoute modification Prénom
form.prenom.addEventListener("change", function() {
    validPrenom(this);
});

//--Ecoute modification Nom
form.nom.addEventListener("change", function() {
    validNom(this);
});

//--Ecoute modification Adresse
form.adresse.addEventListener("change", function() {
    validAdresse(this);
});

//--Ecoute modification Ville
form.ville.addEventListener("change", function() {
    validVille(this);
});

//--Ecoute modification Email
form.email.addEventListener("change", function() {
    validEmail(this);
});


// ***************** ENVOIE DES DONNEES AU BACK ***********************

//-- Fonction d'envoie au back

btnCommande.addEventListener("click", function(e) {
    e.preventDefault()

    // cameras en tant que tableau à envoyer en POST
    const products = [];
    data.forEach((camera) => {
        products.push(camera._id);
    });

    // utilisateur à envoyer en objet en POST
    let contact = {
        firstName: form.prenom.value,
        lastName: form.nom.value,
        address: form.adresse.value,
        city: form.ville.value,
        email: form.email.value,
    };

    // crée donnees comme objet contact + tableau products
    const donnees = { contact, products };

    // en-têtes pour la requête (dire qu'elle est POST et non GET)
    const options = {
        method: "POST",
        body: JSON.stringify(donnees),
        headers: {
            "Content-Type": "application/json",
        },
    };

    console.log(options);

    // la requête POST en elle-même
    fetch("http://localhost:3000/api/cameras/order", options)
        // reçoit les données du back
        .then((response) => {
            return response.json();
        })

    // traitement pour l'obtention du numéro de commmande
    .then(function(datas) {
        const orderId = datas.orderId;

        if (orderId == undefined) {
            alert("Tous les champs doivent êtres remplis")
        } else {
            window.location.href = `confirm.html?ncomm=${orderId}`;
        }

    })

    .catch(function(error) {
        alert(error);
    });

});
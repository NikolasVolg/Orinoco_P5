const inHtml = document.getElementById("main");
const prixInHtml = document.getElementById("finalPrice");
const btnCommande = document.getElementById("btnCom");
let data = JSON.parse(localStorage.getItem("basket"));

if (localStorage.length > 0) {
    prixInHtml.innerHTML = CalculPrixPanier() + " € (euros)"; //rappel fonction prix total

    data.forEach((objet) => {
        inHtml.innerHTML += `
            <div class="row m-2 panierLine">
                <div class="col-lg-2">
                    <img alt="${objet.name}" class="img-fluid" src="${objet.image}">
                </div>

                <div class="col-lg-4">
                    <a href="produit.html?id=${objet._id}"><h2 class="mb-2">${objet.name}</h2></a>
                    <p><strong>Quantité</strong> : ${objet.quantite}</p>
                    <p><strong>Lentilles</strong> : ${objet.lens}</p>
                </div>

                <div class="col-lg-5"
                    <p class="prixProduitPanier"><strong>Prix : <span>${objet.totalPrice} €</span></strong></p>   
                </div>

                <div class="col-lg-1">
                    <button onclick="deleteItem('${objet._id}')">delete</button>  
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
}

//-- fonction de suppression d'un produit

function deleteItem(_id) {
    let supprItem = JSON.parse(localStorage.getItem("basket"));

    const lsUpdate = supprItem.filter((objet) => objet._id !== _id);
    localStorage.setItem("basket", JSON.stringify(lsUpdate));
    document.location.href = "panier.html";
}

//-- Calcul du prix total Panier

function CalculPrixPanier() {
    let itemPrice = JSON.parse(localStorage.getItem("basket"));
    let totalPriceItem = itemPrice.reduce((accumulator, item) => {
        return accumulator + item.totalPrice;
    }, 0);

    return totalPriceItem;
}

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

//--Ecoute soumission formulaire
const validForm = () =>
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (validPrenom() && validNom() &&
            validAdresse() && validVille() && validEmail()) {

            return true;

        } else {
            alert("Hop là, coquinou ! Tous les champs sont obligatoire et doivent être valide");
        }

    });

//--Validation Prénom
const validPrenom = () => {
    let prenomRegExp = new RegExp("^[a-zA-ZÀ-ú-s]*", "g");
    let small = form.prenom.nextElementSibling;

    if (form.prenom.value == "" || form.prenom.value.length < 2) {
        small.innerHTML = `Requis : 2 caractères minimum !`;
        small.classList.remove("text-success");
        small.classList.add("text-danger");
        return false;
    } else if (prenomRegExp.test(form.prenom.value)) {
        small.innerHTML = `Valide`;
        small.classList.remove("text-danger");
        small.classList.add("text-success");
        return true;
    } else {
        small.innerHTML = `Non Valide`;
        small.classList.remove("text-success");
        small.classList.add("text-danger");
        return false;
    }
};

//--Validation Nom
const validNom = () => {
    let nomRegExp = new RegExp("^[a-zA-ZÀ-ú-s]*", "g");
    let small = form.nom.nextElementSibling;

    if (form.nom.value == "" || form.nom.value.length < 3) {
        small.innerHTML = `Requis : 3 caractères minimum !`;
        small.classList.remove("text-success");
        small.classList.add("text-danger");
        return false;
    } else if (nomRegExp.test(form.nom.value)) {
        small.innerHTML = `Valide`;
        small.classList.remove("text-danger");
        small.classList.add("text-success");
        return true;
    } else {
        small.innerHTML = `Non Valide`;
        small.classList.remove("text-success");
        small.classList.add("text-danger");
        return false;
    }
};

//--Validation Adresse
const validAdresse = () => {
    let adresseRegExp = new RegExp("^[a-zA-ZÀ-ú-s]*", "g");
    let small = form.adresse.nextElementSibling;

    if (form.adresse.value == "" || form.adresse.value.length < 8) {
        small.innerHTML = `Requis : 8 caractères minimum !`;
        small.classList.remove("text-success");
        small.classList.add("text-danger");
        return false;
    } else if (adresseRegExp.test(form.adresse.value)) {
        small.innerHTML = `Adresse Valide`;
        small.classList.remove("text-danger");
        small.classList.add("text-success");
        return true;
    } else {
        small.innerHTML = `Non Valide`;
        small.classList.remove("text-success");
        small.classList.add("text-danger");
        return false;
    }
};

//--Validation Ville
const validVille = () => {
    let villeRegExp = new RegExp("^[a-zA-ZÀ-ú-s]*", "g");
    let small = form.ville.nextElementSibling;

    if (form.ville.value == "" || form.ville.value.length == 0) {
        small.innerHTML = `Veuillez renseigner votre ville !`;
        small.classList.remove("text-success");
        small.classList.add("text-danger");
        return false;
    } else if (villeRegExp.test(form.ville.value)) {
        small.innerHTML = `Valide`;
        small.classList.remove("text-danger");
        small.classList.add("text-success");
        return true;
    } else {
        small.innerHTML = `Non Valide`;
        small.classList.remove("text-success");
        small.classList.add("text-danger");
        return false;
    }
};

//--Validation Email
const validEmail = () => {
    let emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$", "g");
    let small = form.email.nextElementSibling;

    if (emailRegExp.test(form.email.value)) {
        small.innerHTML = `Valide`;
        small.classList.remove("text-danger");
        small.classList.add("text-success");
        return true;
    } else {
        small.innerHTML = `Veuillez entrer un format d'email valide !`;
        small.classList.remove("text-success");
        small.classList.add("text-danger");
        return false;
    }
};

// ***************** ENVOIE DES DONNEES AU BACK ***********************

//-- Fonction d'envoie au back

btnCommande.addEventListener("click", function(e) {
    e.preventDefault()

    if (validForm) {
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
            console.log(orderId);
            //window.location.href = 'confirm.html';
        })

        .catch(function(error) {
            alert(error);
        });
    }
});
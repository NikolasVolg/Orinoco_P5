const inHtml = document.getElementById('main');
const prixInHtml = document.getElementById('finalPrice');

//--Boucle de création du HTML--
for (let i = 0; i < localStorage.length; i++) {
    let elmPanier = localStorage.key(i);
    let data = JSON.parse(localStorage.getItem(elmPanier));

    inHtml.innerHTML += `
        <div class="row m-2 panierLine">
            <div class="col-lg-2">
                <img alt="${data.name}" class="img-fluid" src="${data.image}">
            </div>

            <div class="col-lg-4">
                <a href="produit.html?id=${data._id}"><h2 class="mb-2">${data.name}</h2></a>
                <p><strong>Quantité</strong> : ${data.quantite}</p>
                <p><strong>Lentilles</strong> : ${data.lens}</p>
            </div>

            <div class="col-lg-5"
                <p class="prixProduitPanier"><strong>Prix : <span>${data.totalPrice.toFixed(2)} €</span></strong></p>   
            </div>

            <div class="col-lg-1">
            <i onclick="supprimerItem('${data._id}')" class="far fa-times-circle"></i>
                
            </div>
        </div>
        `;

};


/* <button onclick="supprimerItem('${data.idProd}')" class="btn btn-dark" alt="supprimer le produit">Supprimer</button> */


//-- fonction de suppression d'un produit
function supprimerItem(_id) {
    localStorage.removeItem(_id);
    document.location.href = 'panier.html';
};


//-- boucle permettant l'affichage d'un message si panier vide
if (localStorage.length == 0) {
    inHtml.innerHTML = `<div class="container-fluid">
                            <img class="center-block gif" alt="" src="images/polizas_gif.gif" />
                            <p class="text-center lead">Votre panier est vide :'(</p>
                        </div>`;

};



/*************VALIDATION FORMULAIRE******************/

let form = document.querySelector('#submitForm');

//--Ecoute modification Prénom
form.prenom.addEventListener('change', function() {
    validPrenom(this);
});

//--Ecoute modification Nom
form.nom.addEventListener('change', function() {
    validNom(this);
});

//--Ecoute modification Adresse
form.adresse.addEventListener('change', function() {
    validAdresse(this);
});

//--Ecoute modification Ville
form.ville.addEventListener('change', function() {
    validVille(this);
});

//--Ecoute modification Email
form.email.addEventListener('change', function() {
    validEmail(this);
});

//--Ecoute soumission formulaire
form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (validPrenom(form.prenom) && validNom(form.nom) &&
        validAdresse(form.adresse) && validVille(form.ville) &&
        validEmail(form.email)) {
        form.submit();
    } else {
        alert("Hop là, coquinou ! Tous les champs sont obligatoire et doivent être valide");
    }

});

//--Validation Prénom
const validPrenom = function(inputPrenom) {

    let prenomRegExp = new RegExp('^[a-zA-ZÀ-ú\-\s]*', 'g');
    let small = inputPrenom.nextElementSibling;

    console.log(validPrenom);

    if (inputPrenom.value == "" || inputPrenom.value.length < 2) {
        small.innerHTML = `Requis : 2 caractères minimum !`;
        small.classList.remove('text-success');
        small.classList.add('text-danger');
        return false;
    } else if (prenomRegExp.test(inputPrenom.value)) {
        small.innerHTML = `Valide`;
        small.classList.remove('text-danger');
        small.classList.add('text-success');
        return true;
    } else {
        small.innerHTML = `Non Valide`;
        small.classList.remove('text-success');
        small.classList.add('text-danger');
        return false;
    }
};

//--Validation Nom
const validNom = function(inputNom) {

    let nomRegExp = new RegExp('^[a-zA-ZÀ-ú\-\s]*', 'g');
    let small = inputNom.nextElementSibling;

    if (inputNom.value == "" || inputNom.value.length < 3) {
        small.innerHTML = `Requis : 3 caractères minimum !`;
        small.classList.remove('text-success');
        small.classList.add('text-danger');
        return false;
    } else if (nomRegExp.test(inputNom.value)) {
        small.innerHTML = `Valide`;
        small.classList.remove('text-danger');
        small.classList.add('text-success');
        return true;
    } else {
        small.innerHTML = `Non Valide`;
        small.classList.remove('text-success');
        small.classList.add('text-danger');
        return false;
    }
};

//--Validation Adresse
const validAdresse = function(inputAdresse) {

    let adresseRegExp = new RegExp('^[a-zA-ZÀ-ú\-\s]*', 'g');
    let small = inputAdresse.nextElementSibling;

    if (inputAdresse.value == "" || inputAdresse.value.length < 8) {
        small.innerHTML = `Requis : 8 caractères minimum !`;
        small.classList.remove('text-success');
        small.classList.add('text-danger');
        return false;
    } else if (adresseRegExp.test(inputAdresse.value)) {
        small.innerHTML = `Adresse Valide`;
        small.classList.remove('text-danger');
        small.classList.add('text-success');
        return true;
    } else {
        small.innerHTML = `Non Valide`;
        small.classList.remove('text-success');
        small.classList.add('text-danger');
        return false;
    }
};

//--Validation Ville
const validVille = function(inputVille) {

    let villeRegExp = new RegExp('^[a-zA-ZÀ-ú\-\s]*', 'g');
    let small = inputVille.nextElementSibling;

    if (inputVille.value == "" || inputVille.value.length == 0) {
        small.innerHTML = `Veuillez renseigner votre ville !`;
        small.classList.remove('text-success');
        small.classList.add('text-danger');
        return false;
    } else if (villeRegExp.test(inputVille.value)) {
        small.innerHTML = `Valide`;
        small.classList.remove('text-danger');
        small.classList.add('text-success');
        return true;
    } else {
        small.innerHTML = `Non Valide`;
        small.classList.remove('text-success');
        small.classList.add('text-danger');
        return false;
    }
};

//--Validation Email
const validEmail = (inputEmail) => {

    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
    let small = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) {
        small.innerHTML = `Valide`;
        small.classList.remove('text-danger');
        small.classList.add('text-success');
        return true;
    } else {
        small.innerHTML = `Veuillez entrer un format d'email valide !`;
        small.classList.remove('text-success');
        small.classList.add('text-danger');
        return false;
    }
};



/* comment enregistrer un tableau d’is dans le localStorage ???

L'info est donnée dans le backend enfin une partie. 
Dans le fichier controllers, moi j'ai pris les ours, 
tu trouveras de les lignes 39 à 46 sur les 3 fichiers.

Tu dois faire un setItem stringify pour le transformer en chaîne de caractère. 
Et pour le récupérer tu le parse */



/**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 * regex pour le formulaire
 */
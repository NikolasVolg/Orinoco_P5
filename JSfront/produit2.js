const inHtml = document.getElementById('main');

function renderBasket() {

    inHtml.innerHTML = "";

    for (let i = 1; i <= localStorage.length; i += 1) {
        let elmPanier = localStorage.getItem(i);
        let elmPanierJson = JSON.parse(elmPanier);

        console.log(elmPanierJson);

        inHtml.innerHTML += `
        <div class="row m-4 panierLine">
            <div class="col-lg-4">
                <img alt="${elmPanierJson.name}" class="img-fluid" src="${elmPanierJson.image}">
            </div>

            <div class="col-lg-7">
                <h2>${elmPanierJson.name}</h2>
                <label for="QuantiteProduit">Quantité:</label>
                <input id="inputQuantite${i}" type="number" min="1" value="${elmPanierJson.quantite}"/>
                <p>lentilles : ${elmPanierJson.lens}</p>
                <p>${elmPanierJson.totalPrice.toFixed(2)} €</p>
                <button id="supprim${i}" class="btn btn-warning">Supprimer</button>
            </div>
        </div>
        `;

        //--suppression produit
        const suppr = document.getElementById(`supprim${i}`);
        suppr.addEventListener('click', () => {
            let elmSuppr = localStorage.removeItem(i);
            renderBasket();
        });


        let quantites = document.getElementById(`inputQuantite${i}`);
        quantites.addEventListener('change', (event) => {
            const result = document.getElementById('totalPrice');
            result.textContent = `${price}` * `${event.target.value}`;
        });

        //ajout de la nouvelle quantité au LS
        // localStorage = JSON.stringify(result);
        //prix total produit parcourir le tableau => totalPrice = prixfinal

    };

};


if (localStorage.length == 0) {
    inHtml.innerHTML = `<div class="container-fluid">
                    <img class="center-block gif" alt="" src="images/polizas_gif.gif" />
                    <p class="text-center lead">Votre panier est vide :'(</p>
                    </div>`
} else {
    renderBasket();
};




//parcourir querySelectorAll







//------ajouter un bouton CONTINUER MES ACHATS !!!

/* Idee DRY créer un function test regExp () {

    if
    else if
    esle
} 

const validPrenom = function(inputPrenom) {

    let prenomRegExp = new RegExp (ici regex en variable comme toute les autres)


    console.log(validPrenom);

   et ici on place la fonction {
       if 
       else if
       else
   }

};


*/

/*************VALIDATION FORMULAIRE******************/

//if (input = NULL) {alert("touts les champs sont obligatoires")} 


let form = document.querySelector('#submitForm');

//--ecoute modification Prénom
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
        alert("Ola coquinou ! Tous les champs sont obligatoire et doivent être valide");
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
const validEmail = function(inputEmail) {

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


//console.log des produits à commander ! boucle while
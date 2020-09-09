/* IL FAUT :
1- récupérer l'API ------ OK
2- mettre les trucs qui sont dans l'API dans le DOM ! ---- OK
3- comprendre le JS ---- J'avance
*/

/* Je dois
1- re-créer dynamiquement <div col-12.... | <div card | <h2 <img <p prix
1B - besoin d'un boucle qui va créer autant d'élément que j'ai d'articles

2- créer les variables de chaque élément de l'API
3- récupérer mes données de l'API et les injecter dans chaque élément créé
4- au survol de la souris sur card, afficher lien 'pour plus de détails'
4- prier pour que ça fonctionne

*/


let myApi = fetch('http://localhost:3000/api/cameras/5be1ed3f1c9d44000030b061');

const nameProd = document.querySelector('h2');
const imgProd = document.getElementById('imagetest');
// la description ira dans la page détail de l'article
const placeProduit = document.getElementById('description');
const priceProduit = document.getElementById('prix');



//fonction créant mon HTML dynamiquement
function newGod() {

}



myApi.then(function(response) {
        const reponseApi = response.json();
        return reponseApi;

    })
    .then(function(reponseApi) {
        nameProd.textContent = reponseApi.name;
        imgProd.src = reponseApi.imageUrl;
        placeProduit.textContent += 'Description produit : ' + reponseApi.description;
        priceProduit.textContent += 'Prix : ' + reponseApi.price / 100 + ',00 €';

        console.log(reponseApi);
    });



// let descriptionProduit;
// let imageProduit;
// let prixProduit;
// let optionProduit;


/* comment enregistrer un tableau d’objets dans le localStorage ???

L'info est donnée dans le backend enfin une partie. 
Dans le fichier controllers, moi j'ai pris les ours, 
tu trouveras de les lignes 39 à 46 sur les 3 fichiers.

Tu dois faire un setItem stringify pour le transformer en chaîne de caractère. 
Et pour le récupérer tu le parse */
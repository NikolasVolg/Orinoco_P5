localStorage.clear();

const inHtml = document.getElementById('numCom');
const params = new URLSearchParams(window.location.search);


//je récupère mon numéro de commande
const plouf = params.get('ncomm');

inHtml.innerHTML = plouf;
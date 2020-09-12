let myApi = async function() {

    let nameProd;
    let imgProd;
    let descProduit;
    let priceProduit;

    try {

        let response = await fetch('http://localhost:3000/api/cameras')
        if (response.ok) {
            let data = await response.json();
            console.log(data);

            data.forEach(value => {
                page.innerHTML = `
                    <div class="card card-body col-12 col-md-6 col-lg-4">
                    <h2>${nameProd}</h2>
                    <img alt="#" class="img-fluid img-thumbnail">${imgProd}</img>
                    <p>${descProduit}</p>
                    <p>${priceProduit}</p>
                    <a href="produit.html?id" class="btn-info">Pour plus de détails</a>
                </div>
                `

                nameProd.textContent = value.name;
                imgProd.src = value.imageUrl;
                descProduit.textContent += 'Description du produit : ' + value.description;
                priceProduit.textContent += 'Prix : ' + value.price / 100 + ',00 €';

            });
        } else {
            console.error('ça couille gros :', response.status);
        }
    } catch (e) {
        console.log(e);
    }

}
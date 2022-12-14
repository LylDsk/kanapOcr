const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);

const id = urlParams.get('id')
console.log(id);

const host = "http://localhost:3000/";
const objectURL = host + "api/products/" + id;
console.log(objectURL);

function createOptionElement (value, text = value) {
    const option = document.createElement('option')
  
    option.innerText = text
    option.value = value
  
    return option
  }

 

fetch(objectURL)

.then((response) => response.json())
.then((data) => {
  console.log(data);

  let img = document.querySelector(".item__img");
      img.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;

      let name = document.getElementById("title");
      name.innerHTML = data.name;

      let price = document.getElementById("price");
      price.innerHTML = data.price;

      let description = document.getElementById("description");
      description.innerHTML = data.description;

      let color = document.getElementById("colors");

      for (i = 0; i < data.colors.length; i++) {
        color.innerHTML +=`
        <option value="${data.colors[i]}">${data.colors[i]}</option>
        `;
        
      }
      let select = document.querySelector("#colors");

      let addToCart = document.getElementById("addToCart");

      const array = document.querySelectorAll('#colors option');
        const timeZoneList = document.getElementById('colors');
        timeZoneList.addEventListener('click', (event) => {
        let currentArea = event.target.value;
        for ( let i =0; i<array.length; i++ ) {
        let currentOption = array[i];
        if ( currentArea == currentOption.value ) {
        console.log(currentOption);
        }
    }
});


      addToCart.addEventListener("click", (event) =>{
        event.preventDefault();
          
        let image = document.querySelector("body > main > div > section > article > div.item__img > img").src;
        let imageAlt = document.querySelector("body > main > div > section > article > div.item__img > img").alt;
        let name = document.getElementById("title").textContent;
        let price = document.getElementById("price").textContent + "???";
        let choixOpt = document.querySelector("#colors").value;
        console.log(choixOpt);
        let productID = id;

        //transformation du type of qty
        let qty_chiffre = document.querySelector("#quantity").value;
        let qty = Number(qty_chiffre);

        //pour tester la boucle et l'arreter
        let boucle = 0;

        // ajout des elt du panier dans un tableau
        let eltPanier = [{ productID, name, choixOpt, qty, image, imageAlt}];

        //D??claration au format js de la cl?? produit stock?? dans le local storage
        let panierToStock = JSON.parse(localStorage.getItem("Products"));

        //Si le localstorage est vide, on cr??er tableau, on push le panier dedans et on stock dans localStorage
        if (!panierToStock) {
            panierToStock = [];
            panierToStock.push(eltPanier);
            localStorage.setItem("Products", JSON.stringify(panierToStock));
        }
        //Avant de stock dans local storage, on verifie si nom et option sont =, si = alors on incremente qty
        else {
            for (let i = 0; i < panierToStock.length; i++) {
                if (panierToStock[i][0].name === name && panierToStock[i][0].choixOpt === choixOpt) {
                    panierToStock[i][0].qty += qty;
                    boucle = 1;
                }
            }
            //Si pas ??gale, on stop la boucle et on push le panier dans local storage
            if (boucle == 0) {
                panierToStock.push(eltPanier);
            }

            localStorage.setItem("Products", JSON.stringify(panierToStock));
        }

        if (qty > 1) {
            alert(`Vous avez ajout?? ${qty} articles au panier`);
        } else if (qty == 1) {
            alert(`Vous avez ajout?? ${qty} article au panier`);
        }
          
      
      } 


      
      )} )
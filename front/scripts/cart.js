fetch('http://localhost:3000/api/products/')
.then((response) => response.json())
.then((data) => {
  console.log(data);

  const host = "http://localhost:3000/";


  let cart = JSON.parse(localStorage.getItem("Products"));
  console.log(cart)

 
  
  for (i = 0; i < cart.length; i++) {
  let productSection = document.getElementById("cart__items");
 

      cart.forEach(element => {
        element.forEach(value=>{console.log(value.name)
        const objectURL = host + "api/products/" + value.productID;
        console.log(objectURL);  

        fetch(objectURL)

        .then((response) => response.json())
        .then((dataProduct) => {
          console.log(dataProduct);

        const productsCart = `
        <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
        <div class="cart__item__img">
          <img src="${value.image}"
          alt="${value.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${value.name}</h2>
            <p>${value.choixOpt}</p>
            <p>${dataProduct.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input index="${[i]}" onchange="updateQty(this)" id="cartQty" type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${value.qty}>
            </div>
            <div class="cart__item__content__settings__delete">
              <p index="${[i]}" id=deleteItems class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>
        `;
        productSection.innerHTML += productsCart;
        let deleteItems = document.getElementById("deleteItems");
        deleteItems.addEventListener("click", (event) =>{
          event.preventDefault();
          function deleteItem(e) {
            let index = e.getAttribute("index");
            cart.splice(index, 1);
            localStorage.setItem("Products", JSON.stringify(cart));
            location.reload();
          }
        })})

         // Supression de la ligne  au clic du bouton suppr
         
         
          
          
      
      } );

          

        function updateQty(e) {
          let index = e.getAttribute("index");
          let newQty = e.value;
          panier[index][0].qty = newQty;
      
          if (newQty == 0) {
              panier.splice(index, 1);
              localStorage.setItem("Products", JSON.stringify(cart));
              location.reload();
          } else {
              document.querySelector("#totalQuantity").innerHTML = totalQty();
              document.querySelector("#totalPrice").innerHTML = totalPrice();
              localStorage.setItem("Products", JSON.stringify(cart));
          }
      }

      function totalPrice() {
        let totalprix = 0;
        for (let i = 0; i < cart.length; i++) {
            let quantity = parseInt(cart[i][0].qty);
            let prix = parseInt(cart[i][0].price);
            totalprix += prix * quantity;
        }
        return totalprix;
    }


        
      });
        
      }
    });
;

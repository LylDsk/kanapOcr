function quantityChange(itemQty, productID, choixOpt) {
  let qty_chiffre = document.querySelector(".itemQuantity").value;
  let qty = Number(qty_chiffre);
  if (qty < 1 || qty > 100) {
    alert("La quantité doit être comprise entre 1 et 100");
    window.location.reload();
    return 0;
  } else {
    let cart = JSON.parse(localStorage.getItem("Products"));

    for (var i = 0; i < cart.length; i++) {
      if (
        cart[i][0].productID === productID &&
        cart[i][0].choixOpt === choixOpt
      ) {
        cart[i][0].qty = itemQty.value;

        localStorage.setItem("Products", JSON.stringify(cart));
        alert("Quantité mise à jour!");
        fetch("http://localhost:3000/api/products/")
          .then((response) => response.json())
          .then((data) => {
            const host = "http://localhost:3000/";

            let i = 0;
            let articleTotalPrice = 0;

            cart.forEach((element) => {
              element.forEach((value) => {
                const objectURL = host + "api/products/" + value.productID;

                fetch(objectURL)
                  .then((response) => response.json())
                  .then((dataProduct) => {
                    articleTotalPrice += dataProduct.price * value.qty;

                    const select = document.querySelector(".itemQuantity");
                    const itemQuantity =
                      select.querySelectorAll(".itemQuantity");
                    itemQuantity.length;

                    let totalQuantity = 0;
                    for (let i = 0; i < cart.length; i++) {
                      let product = cart[i][0];
                      let productQuantity = product.qty;
                      totalQuantity += parseInt(productQuantity);
                      select.value = value.qty;
                      console.log(select.value);
                      const button = document.querySelector("button");
                      button.setAttribute("value", select.value);
                    }

                    document.getElementById("totalQuantity").innerHTML =
                      totalQuantity;
                    document.getElementById("totalPrice").innerHTML =
                      articleTotalPrice;
                  });
              });
            });
          });

        break;
      }
    }
  }
}

let cart = JSON.parse(localStorage.getItem("Products"));

function removeProduct(productID, choixOpt) {
  for (var i = 0; i < cart.length; i++) {
    if (
      cart[i][0].productID === productID &&
      cart[i][0].choixOpt === choixOpt
    ) {
      cart.splice(i, 1);
      localStorage.setItem("Products", JSON.stringify(cart));
      break;
    }
  }
  window.location.reload();
}

window.onload = function car() {
  fetch("http://localhost:3000/api/products/")
    .then((response) => response.json())
    .then((data) => {
      const host = "http://localhost:3000/";

      let productSection = document.getElementById("cart__items");

      let i = 0;
      let articleTotalPrice = 0;

      cart.forEach((element) => {
        element.forEach((value) => {
          const objectURL = host + "api/products/" + value.productID;

          fetch(objectURL)
            .then((response) => response.json())
            .then((dataProduct) => {
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
              <input type="number" onchange="quantityChange(this, '${
                value.productID
              }', '${
                value.choixOpt
              }')" class="itemQuantity" id="qtyChanged" name="itemQuantity" onkeypress="return event.charCode >= 48 && event.charCode <= 57"  min="1" max="100" value=${
                value.qty
              } data-id="${value.productID}" data-color="${value.choixOpt}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p index="${[i]}" onclick="removeProduct('${value.productID}', '${
                value.choixOpt
              }')" id=deleteItems class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>
        `;
              productSection.innerHTML += productsCart;

              articleTotalPrice += dataProduct.price * value.qty;

              const select = document.querySelector(".itemQuantity");
              const itemQuantity = select.querySelectorAll(".itemQuantity");
              itemQuantity.length;

              let totalQuantity = 0;
              for (let i = 0; i < cart.length; i++) {
                let product = cart[i][0];
                let productQuantity = product.qty;
                totalQuantity += parseInt(productQuantity);
              }
              document.getElementById("totalQuantity").innerHTML =
                totalQuantity;
              document.getElementById("totalPrice").innerHTML =
                articleTotalPrice;
            });
        });
      });
    });
};

let formulaire = document.querySelector(".cart__order__form");

let firstName = formulaire.firstName;
let lastName = formulaire.lastName;
let address = formulaire.address;
let city = formulaire.city;
let email = formulaire.email;
let boutonCommander = formulaire.submit;

//Declaration des RegExp
let emailRegExp = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;
let nameRegExp = /^[a-zA-Zéêëèîïâäçù ,'-]{3,20}$/;
let addressRegExp = /^[0-9]{1,3}[a-zA-Zéêëèîïâäçù ,'-]+$/;

firstName.addEventListener("input", function () {
  verifFirstName(firstName);
});

function verifFirstName() {
  let testFirstName = nameRegExp.test(firstName.value);
  if (testFirstName == false) {
    firstName.nextElementSibling.innerHTML = `3 caractères minimum <br> Ne peut contenir de chiffres ou caractères spéciaux`;
    return false;
  } else {
    firstName.nextElementSibling.innerHTML = "";
    return true;
  }
}

lastName.addEventListener("input", function () {
  verifLastName(lastName);
});

function verifLastName() {
  let testlastName = nameRegExp.test(lastName.value);
  if (testlastName == false) {
    lastName.nextElementSibling.innerHTML = `3 caractères minimum <br> Ne peut contenir de chiffres ou caractères spéciaux`;
    return false;
  } else {
    lastName.nextElementSibling.innerHTML = "";
    return true;
  }
}

city.addEventListener("input", function () {
  verifCity(city);
});

function verifCity() {
  let testCity = nameRegExp.test(city.value);
  if (testCity == false) {
    city.nextElementSibling.innerHTML = `3 caractères minimum <br> Merci de saisir une nom de ville valide <br> Ne peut pas contenir de chiffre`;
    return false;
  } else {
    city.nextElementSibling.innerHTML = "";
    return true;
  }
}

address.addEventListener("change", function () {
  verifAddress(address);
});

function verifAddress() {
  let testAddress = addressRegExp.test(address.value);
  if (testAddress == false) {
    address.nextElementSibling.innerHTML = `Veuillez saisir un numéro et un nom de rue <br> Exemple: <i>123 Rue de La Paix</i>`;
    return false;
  } else {
    address.nextElementSibling.innerHTML = "";
    return true;
  }
}

email.addEventListener("change", function () {
  verifEmail(email);
});

function verifEmail() {
  let testEmail = emailRegExp.test(email.value);
  if (testEmail == false && email.value != "") {
    email.nextElementSibling.innerHTML =
      "Veuillez saisir une adresse email valide <br> Exemple: <i>jean.dupont@exemple.com</i>";
    return false;
  } else {
    email.nextElementSibling.innerHTML = "";
    return true;
  }
}

const orderBtn = document.getElementById("order");
orderBtn.addEventListener("click", saveFormData);

function saveFormData(e) {
  e.preventDefault();
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const email = document.getElementById("email").value;
  const order = { firstName, lastName, address, city, email };
  localStorage.setItem("order", JSON.stringify(order));
  alert("Commande enregistrée!");
}

function postForm() {
  const btn_commander = document.getElementById("order");

  btn_commander.addEventListener("click", (event) => {
    //Récupération des coordonnées du formulaire client
    let inputName = document.getElementById("firstName");
    let inputLastName = document.getElementById("lastName");
    let inputAdress = document.getElementById("address");
    let inputCity = document.getElementById("city");
    let inputMail = document.getElementById("email");

    //Construction d'un array depuis le local storage
    let cart = JSON.parse(localStorage.getItem("Products"));
    let idProducts = cart.flat().map((product) => product.productID);

    let formData = {
      contact: {
        firstName: inputName.value,
        lastName: inputLastName.value,
        address: inputAdress.value,
        city: inputCity.value,
        email: inputMail.value,
      },
      products: idProducts,
    };

    const options = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) => {
        localStorage.clear();
        localStorage.setItem("orderId", data.orderId);

        document.location.href = "confirmation.html";
      })
      .catch((err) => {
        alert("Problème avec fetch : " + err.message);
      });
  });
}
postForm();

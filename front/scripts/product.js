const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const id = urlParams.get("id");

const host = "http://localhost:3000/";
const objectURL = host + "api/products/" + id;

function createOptionElement(value, text = value) {
  const option = document.createElement("option");

  option.innerText = text;
  option.value = value;

  return option;
}

fetch(objectURL)
  .then((response) => response.json())
  .then((data) => {
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
      color.innerHTML += `
        <option value="${data.colors[i]}">${data.colors[i]}</option>
        `;
    }

    for (var i = 1; i <= 100; i++) {
      var option = document.createElement("option");
      option.value = i;
      option.text = i;
      document.getElementById("quantity").appendChild(option);
    }

    document.getElementById("quantity").value = "1";

    var selectq = document.getElementById("quantity");
    selectq.addEventListener("change", function () {
      select.value = this.options[this.selectedIndex].text;
    });

    let select = document.querySelector("#colors");

    let addToCart = document.getElementById("addToCart");

    const array = document.querySelectorAll("#colors option");
    const timeZoneList = document.getElementById("colors");
    timeZoneList.addEventListener("click", (event) => {
      let currentArea = event.target.value;
      for (let i = 0; i < array.length; i++) {
        let currentOption = array[i];
        if (currentArea == currentOption.value) {
        }
      }
    });

    addToCart.addEventListener("click", (event) => {
      event.preventDefault();

      let image = document.querySelector(
        "body > main > div > section > article > div.item__img > img"
      ).src;
      let imageAlt = document.querySelector(
        "body > main > div > section > article > div.item__img > img"
      ).alt;
      let name = document.getElementById("title").textContent;
      let choixOpt = document.querySelector("#colors").value;

      let productID = id;

      let cart = JSON.parse(localStorage.getItem("Products"));

      //transformation du type of qty
      let qty_chiffre = document.querySelector("#quantity").value;
      let qty = Number(qty_chiffre);
      if (qty < 1 || qty > 100) {
        alert("la quantité doit être comprise entre 1 et 100");
        return 0;
      } else {
        const inputValue = parseInt(document.getElementById("quantity").value);
        const storageValue = parseInt(localStorage.getItem("value"));
        const total = inputValue + storageValue;
        if (total > 100) {
          alert("La somme dépasse 100");
        } else {
          let boucle = 0;

          let eltPanier = [{ productID, name, choixOpt, qty, image, imageAlt }];

          let panierToStock = JSON.parse(localStorage.getItem("Products"));

          if (!panierToStock) {
            panierToStock = [];
            panierToStock.push(eltPanier);
            localStorage.setItem("Products", JSON.stringify(panierToStock));
          } else {
            for (let i = 0; i < panierToStock.length; i++) {
              if (
                panierToStock[i][0].name === name &&
                panierToStock[i][0].choixOpt === choixOpt
              ) {
                panierToStock[i][0].qty += qty;
                boucle = 1;
              }
            }

            if (boucle == 0) {
              panierToStock.push(eltPanier);
            }
          }
          localStorage.setItem("Products", JSON.stringify(panierToStock));

          if (qty > 1) {
            alert(`Vous avez ajouté ${qty} articles au panier`);
            const openModalButtons = document.querySelectorAll(
              "[data-modal-target]"
            );
            const closeModalButtons = document.querySelectorAll(
              "[data-close-button]"
            );
            const overlay = document.getElementById("overlay");

            openModalButtons.forEach((button) => {
              button.addEventListener("click", () => {
                const modal = document.querySelector(
                  button.dataset.modalTarget
                );
                openModal(modal);
              });
            });

            overlay.addEventListener("click", () => {
              const modals = document.querySelectorAll(".modal.active");
              modals.forEach((modal) => {
                closeModal(modal);
              });
            });

            closeModalButtons.forEach((button) => {
              button.addEventListener("click", () => {
                const modal = button.closest(".modal");
                closeModal(modal);
              });
            });

            function openModal(modal) {
              if (modal == null) return;
              modal.classList.add("active");
              overlay.classList.add("active");
            }

            function closeModal(modal) {
              if (modal == null) return;
              modal.classList.remove("active");
              overlay.classList.remove("active");
            }

            let cartBox = document.getElementById("boxname");
            cartBox.innerHTML = `Vous avez ajouté ${qty} articles au panier`;
          } else if (qty == 1) {
            alert(`Vous avez ajouté ${qty} article au panier`);
            const openModalButtons = document.querySelectorAll(
              "[data-modal-target]"
            );
            const closeModalButtons = document.querySelectorAll(
              "[data-close-button]"
            );
            const overlay = document.getElementById("overlay");

            openModalButtons.forEach((button) => {
              button.addEventListener("click", () => {
                const modal = document.querySelector(
                  button.dataset.modalTarget
                );
                openModal(modal);
              });
            });

            overlay.addEventListener("click", () => {
              const modals = document.querySelectorAll(".modal.active");
              modals.forEach((modal) => {
                closeModal(modal);
              });
            });

            closeModalButtons.forEach((button) => {
              button.addEventListener("click", () => {
                const modal = button.closest(".modal");
                closeModal(modal);
              });
            });

            function openModal(modal) {
              if (modal == null) return;
              modal.classList.add("active");
              overlay.classList.add("active");
            }

            function closeModal(modal) {
              if (modal == null) return;
              modal.classList.remove("active");
              overlay.classList.remove("active");
            }

            let cartBox = document.getElementById("boxname");
            cartBox.innerHTML = `Vous avez ajouté ${qty} article au panier`;
          }
        }
        const btn_commander = document.getElementById("validBtn");

        btn_commander.addEventListener("click", (event) => {
          document.location.href = "cart.html";
        });
      }
    });
  });

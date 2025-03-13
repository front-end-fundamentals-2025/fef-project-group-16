document.addEventListener("DOMContentLoaded", function () {
  /* get all item buttons */

  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  /* add eventlistener to buttons */
  addToCartButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const productName = button.getAttribute("data-name");
      const productPrice = button.getAttribute("data-price");
      const productImg = button.getAttribute("data-img");

      /* create a object */

      const product = {
        name: productName,
        price: parseFloat(productPrice),
        img: productImg,
        quantity: 1,
      };

      /* check product exists*/
      const existingProduct = cart.find((item) => item.name === productName);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push(product);
      }
      /* save the data */
      localStorage.setItem("cart", JSON.stringify(cart));
    });
  });

  /* cart data */
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  /* cart container and button */
  const cartItemsContainer = document.getElementById("cart-items");
  const clearCartButton = document.getElementById("clear-cart");

  /* add eventlisener to clear cart button */
  clearCartButton.addEventListener("click", function () {
    localStorage.removeItem("cart");
    cartItemsContainer.innerHTML = "";
    const totalpricecontainer = document.getElementById("total-price");
    totalpricecontainer.innerHTML = "<p>Total Price: 0 SEK</p>";
  });

  /* show the items in the cart */
  if (cart.length > 0) {
    cart.forEach(function (item) {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
                <img src="${item.img}" alt="${item.name}" width="50" />
                <h2>${item.name}</h2>
                <p class="price" >Price: ${item.price} SEK</p>
                <p class="quantity" >Quantity: ${item.quantity}</p>
                <button class="remove-item" data-name="${item.name}">Remove</button>
            `;
      cartItemsContainer.appendChild(cartItem);
    });
  }

  /* calculate the total price */
  let totalPrice = 0;
  cart.forEach(function (item) {
    totalPrice += item.price * item.quantity;
  });
  /* show the price in the cart */
  const totalpricecontainer = document.getElementById("total-price");
  totalpricecontainer.innerHTML = `<p>Total Price: ${totalPrice} SEK</p>`;

  /* get all remove buttons */
  const removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach(function (button) {
    /* add eventlistener to remove buttons */

    button.addEventListener("click", function () {
      const productName = button.getAttribute("data-name");
      cart = cart.filter(function (item) {
        return item.name !== productName;
      });
      /* save the data */
      localStorage.setItem("cart", JSON.stringify(cart));
      location.reload();
    });
  });
});


const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('active');
});

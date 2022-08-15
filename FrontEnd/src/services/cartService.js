export const cartService = {
  addItemToCart,
  getCartItems,
  removeItemFromCart,
  clearCartItems,
};

async function addItemToCart(payload) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  //Checking if Cart exits and is not Empty
  if (cart && cart.items && cart.items.length !== 0) {
    let index = cart.items.findIndex((x) => x._id === payload._id);
    if (index === -1) cart.items.push(payload);
    else {
      cart.items[index].quantity++;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  } //CartEmpty
  else {
    cart = {};
    cart.items = [];
    cart.items.push(payload);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return Promise.resolve(cart.items);
}

async function getCartItems() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  return Promise.resolve(cart?.items || []);
}

async function removeItemFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart && cart.items && cart.items.length !== 0) {
    let items = cart.items.filter(function (obj) {
      return obj._id !== productId;
    });
    cart = {};
    cart.items = items;
    localStorage.setItem("cart", JSON.stringify(cart));
    return Promise.resolve(items);
  } else {
    return Promise.resolve([]);
  }
}

async function clearCartItems() {
  let cart = {};
  cart.items = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  return Promise.resolve([]);
}

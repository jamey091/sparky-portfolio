const PRODUCTS = [
  {
    id: "motion-tee",
    name: "PEAK Motion Tee",
    category: "Men / Training",
    price: 1499,
    image: "images/Products/mensperformance.jpg",
    description:
      "A lightweight performance training top designed for movement, breathability and everyday athletic wear."
  },
  {
    id: "training-shorts",
    name: "PEAK Training Shorts",
    category: "Men / Training",
    price: 1799,
    image: "images/Products/mensshorts.jpg",
    description:
      "Flexible training shorts built for gym sessions, conditioning and high-intensity movement."
  },
  {
    id: "training-layer",
    name: "PEAK Training Layer",
    category: "Men / Layering",
    price: 2299,
    image: "images/Products/menstraining.jpg",
    description:
      "A technical long-sleeve training layer designed for warm-ups, cooler sessions and active everyday wear."
  },
  {
    id: "motion-set",
    name: "PEAK Motion Set",
    category: "Women / Training",
    price: 2499,
    image: "images/Products/womensgrey.jpg",
    description:
      "A sculpted women's training set designed for comfort, support and unrestricted movement."
  },
  {
    id: "flex-set",
    name: "PEAK Flex Set",
    category: "Women / Active",
    price: 2699,
    image: "images/Products/womenspink.jpg",
    description:
      "A flexible activewear set built for training, movement and everyday athletic styling."
  },
  {
    id: "run-set",
    name: "PEAK Run Set",
    category: "Women / Running",
    price: 2499,
    image: "images/Products/womenstraining.jpg",
    description:
      "Lightweight running apparel designed for comfort, mobility and everyday miles."
  }
];

function formatPrice(price) {
  return "₹" + price.toLocaleString("en-IN");
}

function getProduct(id) {
  return PRODUCTS.find(product => product.id === id);
}

function getCart() {
  return JSON.parse(localStorage.getItem("peakCart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("peakCart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId, size = "M", quantity = 1) {
  const cart = getCart();

  const existing = cart.find(
    item => item.id === productId && item.size === size
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: productId,
      size,
      quantity
    });
  }

  saveCart(cart);
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}

function changeQuantity(index, amount) {
  const cart = getCart();

  cart[index].quantity += amount;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  saveCart(cart);
}

function cartTotal() {
  return getCart().reduce((total, item) => {
    const product = getProduct(item.id);

    return total + product.price * item.quantity;
  }, 0);
}

function updateCartCount() {
  const count = getCart().reduce(
    (total, item) => total + item.quantity,
    0
  );

  document.querySelectorAll(".cart-count").forEach(element => {
    element.textContent = count;
  });
}

document.addEventListener("DOMContentLoaded", updateCartCount);
/* =========================================
MAZAD - Main JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const searchBtn = document.getElementById("searchBtn");
const productsContainer = document.getElementById("productsContainer");

const sellButtons = document.querySelectorAll(".sell-btn, .secondary-btn");
const loginBtn = document.getElementById("loginBtn");

/* -----------------------------------------
Demo Products
Firebase connect করার আগে testing-এর জন্য
----------------------------------------- */

const products = [
{
id: 1,
title: "Toyota Camry 2020",
category: "Cars",
price: "$18,500",
location: "Dhaka",
image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&q=80"
},
{
id: 2,
title: "iPhone 15 Pro",
category: "Mobiles",
price: "$850",
location: "Chattogram",
image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=800&q=80"
},
{
id: 3,
title: "Laptop Computer",
category: "Electronics",
price: "$650",
location: "Dhaka",
image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80"
},
{
id: 4,
title: "Modern Apartment",
category: "Property",
price: "$75,000",
location: "Chattogram",
image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80"
}
];

/* -----------------------------------------
Show Products
----------------------------------------- */

function displayProducts(productList) {

if (!productsContainer) return;

if (productList.length === 0) {

  productsContainer.innerHTML = `
    <div class="empty-state">
      <div>🔍</div>
      <h3>No products found</h3>
      <p>Try another search or category.</p>
    </div>
  `;

  return;
}

productsContainer.innerHTML = productList.map(product => {

  return `
    <article class="product-card">

      <div class="product-image">
        <img
          src="${product.image}"
          alt="${product.title}"
          loading="lazy"
        >
      </div>

      <div class="product-info">

        <span class="product-category">
          ${product.category}
        </span>

        <h3>${product.title}</h3>

        <div class="product-price">
          ${product.price}
        </div>

        <p class="product-location">
          📍 ${product.location}
        </p>

        <button
          class="view-product-btn"
          data-id="${product.id}"
        >
          View Details
        </button>

      </div>

    </article>
  `;

}).join("");

addProductEvents();

}

/* -----------------------------------------
Search + Category Filter
----------------------------------------- */

function searchProducts() {

const searchText = searchInput
  ? searchInput.value.toLowerCase().trim()
  : "";

const selectedCategory = categorySelect
  ? categorySelect.value
  : "";

const filteredProducts = products.filter(product => {

  const matchesText =
    product.title.toLowerCase().includes(searchText) ||
    product.category.toLowerCase().includes(searchText) ||
    product.location.toLowerCase().includes(searchText);

  const matchesCategory =
    selectedCategory === "" ||
    product.category === selectedCategory;

  return matchesText && matchesCategory;
});

displayProducts(filteredProducts);

}

/* Search Button */

if (searchBtn) {
searchBtn.addEventListener("click", searchProducts);
}

/* Search while typing */

if (searchInput) {
searchInput.addEventListener("input", searchProducts);
}

/* Category change */

if (categorySelect) {
categorySelect.addEventListener("change", searchProducts);
}

/* Enter key search */

if (searchInput) {

searchInput.addEventListener("keydown", event => {

  if (event.key === "Enter") {
    searchProducts();
  }

});

}

/* -----------------------------------------
Product Details
----------------------------------------- */

function addProductEvents() {

const buttons =
  document.querySelectorAll(".view-product-btn");

buttons.forEach(button => {

  button.addEventListener("click", () => {

    const productId = Number(button.dataset.id);

    const product =
      products.find(item => item.id === productId);

    if (!product) return;

    alert(
      `${product.title}\n\n` +
      `Category: ${product.category}\n` +
      `Price: ${product.price}\n` +
      `Location: ${product.location}`
    );

  });

});

}

/* -----------------------------------------
Sell Product
----------------------------------------- */

sellButtons.forEach(button => {

button.addEventListener("click", () => {

  alert(
    "Sell Product feature will be connected to Firebase shortly."
  );

});

});

/* -----------------------------------------
Login / Register
----------------------------------------- */

if (loginBtn) {

loginBtn.addEventListener("click", () => {

  alert(
    "Login / Register system will be connected to Firebase Authentication."
  );

});

}

/* -----------------------------------------
Start Website
----------------------------------------- */

displayProducts(products);

});

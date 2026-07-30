import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "mazad-b8b34.firebaseapp.com",
    projectId: "mazad-b8b34",
    storageBucket: "mazad-b8b34.firebasestorage.app",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

let firebaseApp = null;

try {
    if (
        firebaseConfig.apiKey !== "YOUR_API_KEY" &&
        firebaseConfig.messagingSenderId !== "YOUR_MESSAGING_SENDER_ID" &&
        firebaseConfig.appId !== "YOUR_APP_ID"
    ) {
        firebaseApp = initializeApp(firebaseConfig);
        console.log("Mazad Firebase initialized.");
    } else {
        console.log("Mazad is running in local setup mode.");
    }
} catch (error) {
    console.error("Firebase initialization error:", error);
}


/* -----------------------------
   Basic App State
----------------------------- */

const appState = {
    language: "en",
    searchTerm: "",
    selectedCategory: "",
    products: []
};


/* -----------------------------
   DOM Elements
----------------------------- */

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

const languageButton = document.getElementById("languageButton");
const loginButton = document.getElementById("loginButton");

const browseProductsButton =
    document.getElementById("browseProductsButton");

const sellProductButton =
    document.getElementById("sellProductButton");

const startSellingButton =
    document.getElementById("startSellingButton");

const viewAllProductsButton =
    document.getElementById("viewAllProductsButton");

const productsContainer =
    document.getElementById("productsContainer");

const categoryButtons =
    document.querySelectorAll(".category-card");


/* -----------------------------
   Scroll Helper
----------------------------- */

function scrollToProducts() {
    const productsSection =
        document.querySelector(".products-section");

    if (!productsSection) {
        return;
    }

    productsSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* -----------------------------
   Search
----------------------------- */

function handleSearch(event) {
    event.preventDefault();

    const value = searchInput
        ? searchInput.value.trim()
        : "";

    appState.searchTerm = value;

    console.log("Search:", appState.searchTerm);

    scrollToProducts();
}


/* -----------------------------
   Category Selection
----------------------------- */

function handleCategoryClick(event) {
    const button = event.currentTarget;

    const category =
        button.dataset.category || "";

    appState.selectedCategory = category;

    console.log("Selected category:", category);

    scrollToProducts();
}


/* -----------------------------
   Language Button
----------------------------- */

function handleLanguageChange() {
    if (appState.language === "en") {
        appState.language = "ar";
        languageButton.textContent = "AR";
        document.documentElement.lang = "ar";
        document.documentElement.dir = "rtl";
    } else {
        appState.language = "en";
        languageButton.textContent = "EN";
        document.documentElement.lang = "en";
        document.documentElement.dir = "ltr";
    }

    console.log("Language:", appState.language);
}


/* -----------------------------
   Login Button
----------------------------- */

function handleLogin() {
    console.log("Login button clicked.");

    alert(
        "Login and registration will be connected in the next step."
    );
}


/* -----------------------------
   Sell Product
----------------------------- */

function handleSellProduct() {
    console.log("Sell product button clicked.");

    alert(
        "Seller features will be connected in the next step."
    );
}


/* -----------------------------
   View All Products
----------------------------- */

function handleViewAllProducts() {
    appState.searchTerm = "";
    appState.selectedCategory = "";

    if (searchInput) {
        searchInput.value = "";
    }

    scrollToProducts();
}


/* -----------------------------
   Product Rendering
----------------------------- */

function renderProducts() {
    if (!productsContainer) {
        return;
    }

    if (!appState.products.length) {
        productsContainer.innerHTML = `
            <div class="empty-products">
                <h3>No products yet</h3>
                <p>
                    Products will appear here when sellers
                    start listing items.
                </p>
            </div>
        `;

        return;
    }

    productsContainer.innerHTML = "";

    appState.products.forEach((product) => {
        const productCard =
            document.createElement("article");

        productCard.className = "product-card";

        productCard.innerHTML = `
            <div class="product-card-content">
                <h3>${escapeHtml(product.title)}</h3>
                <p>${escapeHtml(product.description)}</p>
                <strong>${escapeHtml(product.price)}</strong>
            </div>
        `;

        productsContainer.appendChild(productCard);
    });
}


/* -----------------------------
   Basic HTML Protection
----------------------------- */

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* -----------------------------
   Event Listeners
----------------------------- */

if (searchForm) {
    searchForm.addEventListener(
        "submit",
        handleSearch
    );
}

if (languageButton) {
    languageButton.addEventListener(
        "click",
        handleLanguageChange
    );
}

if (loginButton) {
    loginButton.addEventListener(
        "click",
        handleLogin
    );
}

if (browseProductsButton) {
    browseProductsButton.addEventListener(
        "click",
        scrollToProducts
    );
}

if (sellProductButton) {
    sellProductButton.addEventListener(
        "click",
        handleSellProduct
    );
}

if (startSellingButton) {
    startSellingButton.addEventListener(
        "click",
        handleSellProduct
    );
}

if (viewAllProductsButton) {
    viewAllProductsButton.addEventListener(
        "click",
        handleViewAllProducts
    );
}

categoryButtons.forEach((button) => {
    button.addEventListener(
        "click",
        handleCategoryClick
    );
});


/* -----------------------------
   Initial App Start
----------------------------- */

function initializeMazad() {
    renderProducts();

    console.log("Mazad application started successfully.");
}

initializeMazad();

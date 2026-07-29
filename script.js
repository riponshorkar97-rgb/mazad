/* =========================================
MAZAD - Main JavaScript
Firebase Authentication + Firestore
Products + Search
========================================= */

import {
initializeApp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
getFirestore,
collection,
addDoc,
getDocs,
query,
orderBy,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

/* =========================================
Firebase Configuration
========================================= */

const firebaseConfig = {

apiKey: "AIzaSyBfiON-27mz4OlD2Hl8uGNMk_2iS2cp2Qw",

authDomain: "mazad-b8b34.firebaseapp.com",

projectId: "mazad-b8b34",

storageBucket: "mazad-b8b34.firebasestorage.app",

messagingSenderId: "720192718299",

appId: "1:720192718299:web:703589b39b9ef03e5a13fe",

measurementId: "G-6HKL7P0H83"

};

/* =========================================
Initialize Firebase
========================================= */

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

/* =========================================
Website Start
========================================= */

document.addEventListener("DOMContentLoaded", () => {

/* =======================================
Elements
======================================= */

const searchInput =
document.getElementById("searchInput");

const categorySelect =
document.getElementById("categorySelect");

const searchBtn =
document.getElementById("searchBtn");

const productsContainer =
document.getElementById("productsContainer");

/* Authentication */

const loginForm =
document.getElementById("loginForm");

const registerForm =
document.getElementById("registerForm");

const showRegisterBtn =
document.getElementById("showRegisterBtn");

const showLoginBtn =
document.getElementById("showLoginBtn");

const authTitle =
document.getElementById("authTitle");

const authMessage =
document.getElementById("authMessage");

const authStatus =
document.getElementById("authStatus");

/* Sell */

const sellProductForm =
document.getElementById("sellProductForm");

const sellStatus =
document.getElementById("sellStatus");

const headerSellBtn =
document.getElementById("headerSellBtn");

const heroSellBtn =
document.getElementById("heroSellBtn");

/* =======================================
Products
======================================= */

let products = [];

/* =======================================
Authentication Message
======================================= */

function showAuthMessage(
message,
success = false
) {

if (!authStatus) return;

authStatus.textContent = message;

authStatus.style.marginTop = "15px";

authStatus.style.fontWeight = "600";

authStatus.style.color =
  success ? "green" : "red";

}

/* =======================================
Sell Message
======================================= */

function showSellMessage(
message,
success = false
) {

if (!sellStatus) return;

sellStatus.textContent = message;

sellStatus.style.marginTop = "15px";

sellStatus.style.fontWeight = "600";

sellStatus.style.color =
  success ? "green" : "red";

}

/* =======================================
Display Products
======================================= */

function displayProducts(productList) {

if (!productsContainer) return;


if (productList.length === 0) {

  productsContainer.innerHTML = `

    <div class="empty-state">

      <div>📦</div>

      <h3>
        No listings found
      </h3>

      <p>
        Try another search or add a product.
      </p>

    </div>

  `;

  return;
}


productsContainer.innerHTML =
  productList.map(product => {

    return `

      <article class="product-card">

        <div class="product-image">

          ${
            product.image
              ? `
                <img
                  src="${escapeHTML(product.image)}"
                  alt="${escapeHTML(product.title)}"
                  loading="lazy"
                >
              `
              : `
                <div class="no-image">
                  📦
                </div>
              `
          }

        </div>


        <div class="product-info">

          <span class="product-category">
            ${escapeHTML(product.category)}
          </span>


          <h3>
            ${escapeHTML(product.title)}
          </h3>


          <div class="product-price">
            $${escapeHTML(String(product.price))}
          </div>


          <p class="product-location">
            📍 ${escapeHTML(product.location)}
          </p>


          <p>
            ${escapeHTML(product.description)}
          </p>


          <button
            class="view-product-btn"
            data-id="${product.id}"
            type="button"
          >
            View Details
          </button>

        </div>

      </article>

    `;

  }).join("");


addProductEvents();

}

/* =======================================
Escape HTML
======================================= */

function escapeHTML(value) {

return String(value ?? "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039;");

}

/* =======================================
Load Products From Firestore
======================================= */

async function loadProducts() {

try {

  const productsRef =
    collection(db, "products");


  const productsQuery =
    query(
      productsRef,
      orderBy("createdAt", "desc")
    );


  const snapshot =
    await getDocs(productsQuery);


  products = [];


  snapshot.forEach(doc => {

    products.push({

      id: doc.id,

      ...doc.data()

    });

  });


  displayProducts(products);


} catch (error) {

  console.error(
    "Firestore loading error:",
    error
  );


  /* Fallback if database is empty */

  products = [];

  displayProducts(products);

}

}

/* =======================================
Search Products
======================================= */

function searchProducts() {

const searchText =
  searchInput
    ? searchInput.value
        .toLowerCase()
        .trim()
    : "";


const selectedCategory =
  categorySelect
    ? categorySelect.value
    : "";


const filteredProducts =
  products.filter(product => {

    const title =
      String(product.title || "")
        .toLowerCase();


    const category =
      String(product.category || "")
        .toLowerCase();


    const location =
      String(product.location || "")
        .toLowerCase();


    const matchesText =
      title.includes(searchText) ||
      category.includes(searchText) ||
      location.includes(searchText);


    const matchesCategory =
      selectedCategory === "" ||
      product.category === selectedCategory;


    return (
      matchesText &&
      matchesCategory
    );

  });


displayProducts(filteredProducts);

}

/* =======================================
Search Button
======================================= */

if (searchBtn) {

searchBtn.addEventListener(
  "click",
  searchProducts
);

}

/* =======================================
Search While Typing
======================================= */

if (searchInput) {

searchInput.addEventListener(
  "input",
  searchProducts
);

}

/* =======================================
Category Filter
======================================= */

if (categorySelect) {

categorySelect.addEventListener(
  "change",
  searchProducts
);

}

/* =======================================
Enter Key Search
======================================= */

if (searchInput) {

searchInput.addEventListener(
  "keydown",
  event => {

    if (event.key === "Enter") {

      searchProducts();

    }

  }
);

}

/* =======================================
Product Details
======================================= */

function addProductEvents() {

const buttons =
  document.querySelectorAll(
    ".view-product-btn"
  );


buttons.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      const productId =
        button.dataset.id;


      const product =
        products.find(
          item =>
            item.id === productId
        );


      if (!product) return;


      alert(

        `${product.title}\n\n` +

        `Category: ${product.category}\n` +

        `Price: $${product.price}\n` +

        `Location: ${product.location}\n\n` +

        `${product.description}`

      );

    }
  );

});

}

/* =======================================
Register Form
======================================= */

if (showRegisterBtn) {

showRegisterBtn.addEventListener(
  "click",
  () => {

    if (loginForm)
      loginForm.style.display =
        "none";


    if (registerForm)
      registerForm.style.display =
        "block";


    showRegisterBtn.style.display =
      "none";


    if (showLoginBtn)
      showLoginBtn.style.display =
        "inline-block";


    if (authTitle)
      authTitle.textContent =
        "Create Mazad Account";


    if (authMessage)
      authMessage.textContent =
        "Register to start buying and selling.";


    showAuthMessage("");

  }
);

}

/* =======================================
Login Form Switch
======================================= */

if (showLoginBtn) {

showLoginBtn.addEventListener(
  "click",
  () => {

    if (registerForm)
      registerForm.style.display =
        "none";


    if (loginForm)
      loginForm.style.display =
        "block";


    showLoginBtn.style.display =
      "none";


    if (showRegisterBtn)
      showRegisterBtn.style.display =
        "inline-block";


    if (authTitle)
      authTitle.textContent =
        "Welcome to Mazad";


    if (authMessage)
      authMessage.textContent =
        "Login to start buying and selling.";


    showAuthMessage("");

  }
);

}

/* =======================================
Register
======================================= */

if (registerForm) {

registerForm.addEventListener(
  "submit",
  async event => {

    event.preventDefault();


    const email =
      document
        .getElementById("registerEmail")
        .value
        .trim();


    const password =
      document
        .getElementById("registerPassword")
        .value;


    showAuthMessage(
      "Creating account..."
    );


    try {

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );


      showAuthMessage(
        "Account created successfully! 🎉",
        true
      );


      registerForm.reset();


    } catch (error) {

      console.error(error);


      showAuthMessage(
        getFirebaseErrorMessage(error)
      );

    }

  }
);

}

/* =======================================
Login
======================================= */

if (loginForm) {

loginForm.addEventListener(
  "submit",
  async event => {

    event.preventDefault();


    const email =
      document
        .getElementById("loginEmail")
        .value
        .trim();


    const password =
      document
        .getElementById("loginPassword")
        .value;


    showAuthMessage(
      "Logging in..."
    );


    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );


      showAuthMessage(
        "Login successful! 🎉",
        true
      );


      loginForm.reset();


    } catch (error) {

      console.error(error);


      showAuthMessage(
        getFirebaseErrorMessage(error)
      );

    }

  }
);

}

/* =======================================
Sell Product
======================================= */

if (sellProductForm) {

sellProductForm.addEventListener(
  "submit",
  async event => {

    event.preventDefault();


    const user = auth.currentUser;


    /* User must login first */

    if (!user) {

      showSellMessage(
        "Please login first to sell a product."
      );


      window.location.hash =
        "login";


      return;

    }


    const title =
      document
        .getElementById("productTitle")
        .value
        .trim();


    const category =
      document
        .getElementById("productCategory")
        .value;


    const price =
      document
        .getElementById("productPrice")
        .value;


    const location =
      document
        .getElementById("productLocation")
        .value
        .trim();


    const image =
      document
        .getElementById("productImageUrl")
        .value
        .trim();


    const description =
      document
        .getElementById("productDescription")
        .value
        .trim();


    showSellMessage(
      "Publishing product..."
    );


    try {

      await addDoc(
        collection(db, "products"),
        {

          title: title,

          category: category,

          price: price,

          location: location,

          image: image,

          description: description,

          sellerId: user.uid,

          sellerEmail:
            user.email,

          createdAt:
            serverTimestamp()

        }
      );


      showSellMessage(
        "Product published successfully! 🎉",
        true
      );


      sellProductForm.reset();


      await loadProducts();


      window.location.hash =
        "listings";


    } catch (error) {

      console.error(
        "Product publish error:",
        error
      );


      showSellMessage(
        "Product publish failed. Please try again."
      );

    }

  }
);

}

/* =======================================
Sell Button Navigation
======================================= */

function openSellSection() {

const user =
  auth.currentUser;


if (!user) {

  showSellMessage(
    "Please login first to sell a product."
  );


  window.location.hash =
    "login";


  return;

}


window.location.hash =
  "sell";

}

if (headerSellBtn) {

headerSellBtn.addEventListener(
  "click",
  openSellSection
);

}

if (heroSellBtn) {

heroSellBtn.addEventListener(
  "click",
  openSellSection
);

}

/* =======================================
Firebase Auth State
======================================= */

onAuthStateChanged(
auth,
user => {

  if (user) {

    console.log(
      "Logged in user:",
      user.email
    );


    if (authMessage) {

      authMessage.textContent =
        `Logged in as ${user.email}`;

    }


    if (sellStatus) {

      sellStatus.textContent =
        "You are logged in and can publish products.";

      sellStatus.style.color =
        "green";

    }

  } else {

    console.log(
      "No user currently logged in."
    );

  }

}

);

/* =======================================
Firebase Error Messages
======================================= */

function getFirebaseErrorMessage(error) {

switch (error.code) {

  case "auth/email-already-in-use":

    return "This email is already registered.";


  case "auth/invalid-email":

    return "Please enter a valid email address.";


  case "auth/weak-password":

    return "Password must be at least 6 characters.";


  case "auth/invalid-credential":

    return "Email or password is incorrect.";


  case "auth/user-not-found":

    return "No account found with this email.";


  case "auth/wrong-password":

    return "Incorrect password.";


  case "auth/too-many-requests":

    return "Too many attempts. Please try again later.";


  default:

    return (
      error.message ||
      "Something went wrong. Please try again."
    );

}

}

/* =======================================
Start Website
======================================= */

loadProducts();

});

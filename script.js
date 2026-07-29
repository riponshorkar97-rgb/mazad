/* =========================================
MAZAD - Main JavaScript
Firebase Authentication + Firestore
========================================= */

import {
initializeApp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
getFirestore,
collection,
addDoc,
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

/* =========================================
Elements
========================================= */

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

/* Sell Product */

const sellProductForm =
document.getElementById("sellProductForm");

const sellStatus =
document.getElementById("sellStatus");

const headerSellBtn =
document.getElementById("headerSellBtn");

const heroSellBtn =
document.getElementById("heroSellBtn");

/* =========================================
Demo Products
========================================= */

const products = [

{
  id: 1,
  title: "Toyota Camry 2020",
  category: "Cars",
  price: "$18,500",
  location: "Dhaka",
  image:
    "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&q=80"
},

{
  id: 2,
  title: "iPhone 15 Pro",
  category: "Mobiles",
  price: "$850",
  location: "Chattogram",
  image:
    "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=800&q=80"
},

{
  id: 3,
  title: "Laptop Computer",
  category: "Electronics",
  price: "$650",
  location: "Dhaka",
  image:
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80"
},

{
  id: 4,
  title: "Modern Apartment",
  category: "Property",
  price: "$75,000",
  location: "Chattogram",
  image:
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80"
}

];

/* =========================================
Display Products
========================================= */

function displayProducts(productList) {

if (!productsContainer) return;


if (productList.length === 0) {

  productsContainer.innerHTML = `
    <div class="empty-state">

      <div>🔍</div>

      <h3>
        No products found
      </h3>

      <p>
        Try another search or category.
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

          <h3>
            ${product.title}
          </h3>

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

/* =========================================
Search
========================================= */

function searchProducts() {

const searchText =
  searchInput
    ? searchInput.value.toLowerCase().trim()
    : "";


const selectedCategory =
  categorySelect
    ? categorySelect.value
    : "";


const filteredProducts =
  products.filter(product => {

    const matchesText =
      product.title
        .toLowerCase()
        .includes(searchText) ||

      product.category
        .toLowerCase()
        .includes(searchText) ||

      product.location
        .toLowerCase()
        .includes(searchText);


    const matchesCategory =
      selectedCategory === "" ||
      product.category === selectedCategory;


    return matchesText && matchesCategory;

  });


displayProducts(filteredProducts);

}

if (searchBtn) {

searchBtn.addEventListener(
  "click",
  searchProducts
);

}

if (searchInput) {

searchInput.addEventListener(
  "input",
  searchProducts
);

}

if (categorySelect) {

categorySelect.addEventListener(
  "change",
  searchProducts
);

}

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

/* =========================================
Product Details
========================================= */

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
        Number(button.dataset.id);


      const product =
        products.find(
          item => item.id === productId
        );


      if (!product) return;


      alert(
        `${product.title}\n\n` +
        `Category: ${product.category}\n` +
        `Price: ${product.price}\n` +
        `Location: ${product.location}`
      );

    }
  );

});

}

/* =========================================
Authentication Message
========================================= */

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

/* =========================================
Show Register
========================================= */

if (showRegisterBtn) {

showRegisterBtn.addEventListener(
  "click",
  () => {

    if (loginForm) {
      loginForm.style.display = "none";
    }

    if (registerForm) {
      registerForm.style.display = "block";
    }

    showRegisterBtn.style.display = "none";

    if (showLoginBtn) {
      showLoginBtn.style.display = "inline-block";
    }

    if (authTitle) {
      authTitle.textContent =
        "Create Mazad Account";
    }

    if (authMessage) {
      authMessage.textContent =
        "Register to start buying and selling.";
    }

    showAuthMessage("");

  }
);

}

/* =========================================
Show Login
========================================= */

if (showLoginBtn) {

showLoginBtn.addEventListener(
  "click",
  () => {

    if (registerForm) {
      registerForm.style.display = "none";
    }

    if (loginForm) {
      loginForm.style.display = "block";
    }

    showLoginBtn.style.display = "none";

    if (showRegisterBtn) {
      showRegisterBtn.style.display =
        "inline-block";
    }

    if (authTitle) {
      authTitle.textContent =
        "Welcome to Mazad";
    }

    if (authMessage) {
      authMessage.textContent =
        "Login to start buying and selling.";
    }

    showAuthMessage("");

  }
);

}

/* =========================================
Register
========================================= */

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

/* =========================================
Login
========================================= */

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

/* =========================================
Firebase Authentication State
========================================= */

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
        `Logged in as ${user.email}. You can publish a product.`;

      sellStatus.style.color = "green";

    }

  } else {

    console.log(
      "No user currently logged in."
    );


    if (sellStatus) {

      sellStatus.textContent =
        "Please login before publishing a product.";

      sellStatus.style.color = "red";

    }

  }

}

);

/* =========================================
Sell Product - Scroll
========================================= */

function openSellSection() {

const sellSection =
  document.getElementById("sell");


if (sellSection) {

  sellSection.scrollIntoView({
    behavior: "smooth"
  });

}

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

/* =========================================
Sell Product → Firestore
========================================= */

if (sellProductForm) {

sellProductForm.addEventListener(
  "submit",
  async event => {

    event.preventDefault();


    /* Check Login */

    const user = auth.currentUser;


    if (!user) {

      if (sellStatus) {

        sellStatus.textContent =
          "Please login first to publish a product.";

        sellStatus.style.color = "red";

      }


      document
        .getElementById("login")
        ?.scrollIntoView({
          behavior: "smooth"
        });


      return;

    }


    /* Get Form Values */

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


    const description =
      document
        .getElementById("productDescription")
        .value
        .trim();


    const imageUrl =
      document
        .getElementById("productImageUrl")
        .value
        .trim();


    if (sellStatus) {

      sellStatus.textContent =
        "Publishing product...";

      sellStatus.style.color =
        "black";

    }


    /* =====================================
       Save to Firestore
       Collection: products
    ===================================== */

    try {

      const docRef =
        await addDoc(
          collection(db, "products"),
          {

            title: title,

            category: category,

            price: Number(price),

            location: location,

            description: description,

            imageUrl: imageUrl,

            sellerId: user.uid,

            sellerEmail: user.email,

            createdAt: serverTimestamp()

          }
        );


      console.log(
        "Product created:",
        docRef.id
      );


      if (sellStatus) {

        sellStatus.textContent =
          "Product published successfully! 🎉";

        sellStatus.style.color =
          "green";

      }


      sellProductForm.reset();


    } catch (error) {

      console.error(
        "Firestore error:",
        error
      );


      if (sellStatus) {

        sellStatus.textContent =
          getFirestoreErrorMessage(error);

        sellStatus.style.color =
          "red";

      }

    }

  }
);

}

/* =========================================
Firestore Error Messages
========================================= */

function getFirestoreErrorMessage(error) {

if (
  error.code ===
  "permission-denied"
) {

  return (
    "Permission denied. " +
    "Please check your Firestore Rules."
  );

}


if (
  error.code ===
  "unavailable"
) {

  return (
    "Firestore is temporarily unavailable. " +
    "Please try again."
  );

}


return (
  "Could not publish product. " +
  "Please try again."
);

}

/* =========================================
Firebase Error Messages
========================================= */

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
    return (
      "Too many attempts. " +
      "Please try again later."
    );

  default:
    return (
      "Something went wrong. " +
      "Please try again."
    );

}

}

/* =========================================
Start Website
========================================= */

displayProducts(products);

});

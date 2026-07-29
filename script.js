/* =========================================================
   MAZAD - Main JavaScript
   Firebase Authentication + Firestore Products
========================================================= */

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
  orderBy
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


/* =========================================================
   Firebase Configuration
========================================================= */

const firebaseConfig = {
  apiKey: "AIzaSyBfiON-27mz4OlD2Hl8uGNMk_2iS2cp2Qw",
  authDomain: "mazad-b8b34.firebaseapp.com",
  projectId: "mazad-b8b34",
  storageBucket: "mazad-b8b34.firebasestorage.app",
  messagingSenderId: "720192718299",
  appId: "1:720192718299:web:703589b39b9ef03e5a13fe",
  measurementId: "G-6HKL7P0H83"
};


/* =========================================================
   Initialize Firebase
========================================================= */

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


/* =========================================================
   Global Products
========================================================= */

let products = [];


/* =========================================================
   Website Start
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     Elements
  ======================================================= */

  const searchInput =
    document.getElementById("searchInput");

  const categorySelect =
    document.getElementById("categorySelect");

  const searchBtn =
    document.getElementById("searchBtn");

  const productsContainer =
    document.getElementById("productsContainer");


  /* =======================================================
     Authentication Elements
  ======================================================= */

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


  /* =======================================================
     Sell Elements
  ======================================================= */

  const sellProductForm =
    document.getElementById("sellProductForm");

  const sellStatus =
    document.getElementById("sellStatus");

  const headerSellBtn =
    document.getElementById("headerSellBtn");

  const heroSellBtn =
    document.getElementById("heroSellBtn");


  /* =======================================================
     Show Authentication Message
  ======================================================= */

  function showAuthMessage(message, success = false) {

    if (!authStatus) return;

    authStatus.textContent = message;

    authStatus.style.marginTop = "15px";

    authStatus.style.fontWeight = "600";

    authStatus.style.color =
      success ? "green" : "red";
  }


  /* =======================================================
     Firebase Error Messages
  ======================================================= */

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
        return "Something went wrong. Please try again.";
    }
  }


  /* =======================================================
     Display Products
  ======================================================= */

  function displayProducts(productList) {

    if (!productsContainer) return;


    if (productList.length === 0) {

      productsContainer.innerHTML = `
        <div class="empty-state">
          <div>📦</div>
          <h3>No products found</h3>
          <p>Try another search or category.</p>
        </div>
      `;

      return;
    }


    productsContainer.innerHTML =
      productList.map(product => {

        const image =
          product.image ||
          "https://via.placeholder.com/800x500?text=Mazad+Product";


        return `
          <article class="product-card">

            <div class="product-image">

              <img
                src="${image}"
                alt="${product.title || "Mazad Product"}"
                loading="lazy"
              >

            </div>


            <div class="product-info">

              <span class="product-category">
                ${product.category || "Others"}
              </span>

              <h3>
                ${product.title || "Untitled Product"}
              </h3>

              <div class="product-price">
                $${product.price || "0"}
              </div>

              <p class="product-location">
                📍 ${product.location || "Unknown"}
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


  /* =======================================================
     Load Products From Firestore
  ======================================================= */

  async function loadProducts() {

    if (!productsContainer) return;


    productsContainer.innerHTML = `
      <div class="empty-state">
        <div>⏳</div>
        <h3>Loading products...</h3>
        <p>Please wait.</p>
      </div>
    `;


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


      console.log(
        "Products loaded:",
        products.length
      );


    } catch (error) {

      console.error(
        "Firestore loading error:",
        error
      );


      productsContainer.innerHTML = `
        <div class="empty-state">
          <div>⚠️</div>
          <h3>Could not load products</h3>
          <p>Please check your Firestore rules and try again.</p>
        </div>
      `;
    }
  }


  /* =======================================================
     Search Products
  ======================================================= */

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

        const title =
          (product.title || "").toLowerCase();

        const category =
          (product.category || "").toLowerCase();

        const location =
          (product.location || "").toLowerCase();


        const matchesText =
          title.includes(searchText) ||
          category.includes(searchText) ||
          location.includes(searchText);


        const matchesCategory =
          selectedCategory === "" ||
          product.category === selectedCategory;


        return matchesText && matchesCategory;
      });


    displayProducts(filteredProducts);
  }


  /* =======================================================
     Search Button
  ======================================================= */

  if (searchBtn) {

    searchBtn.addEventListener(
      "click",
      searchProducts
    );
  }


  /* =======================================================
     Search While Typing
  ======================================================= */

  if (searchInput) {

    searchInput.addEventListener(
      "input",
      searchProducts
    );
  }


  /* =======================================================
     Category Filter
  ======================================================= */

  if (categorySelect) {

    categorySelect.addEventListener(
      "change",
      searchProducts
    );
  }


  /* =======================================================
     Enter Key Search
  ======================================================= */

  if (searchInput) {

    searchInput.addEventListener(
      "keydown",
      event => {

        if (event.key === "Enter") {

          event.preventDefault();

          searchProducts();
        }

      }
    );
  }


  /* =======================================================
     Product Details
  ======================================================= */

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
              item => item.id === productId
            );


          if (!product) return;


          alert(
            `${product.title || "Product"}\n\n` +
            `Category: ${product.category || "N/A"}\n` +
            `Price: $${product.price || "0"}\n` +
            `Location: ${product.location || "N/A"}\n\n` +
            `${product.description || "No description available."}`
          );

        }
      );

    });
  }


  /* =======================================================
     Show Register Form
  ======================================================= */

  if (showRegisterBtn) {

    showRegisterBtn.addEventListener(
      "click",
      () => {

        if (loginForm)
          loginForm.style.display = "none";

        if (registerForm)
          registerForm.style.display = "block";

        showRegisterBtn.style.display = "none";

        if (showLoginBtn)
          showLoginBtn.style.display = "inline-block";


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


  /* =======================================================
     Show Login Form
  ======================================================= */

  if (showLoginBtn) {

    showLoginBtn.addEventListener(
      "click",
      () => {

        if (registerForm)
          registerForm.style.display = "none";

        if (loginForm)
          loginForm.style.display = "block";

        showLoginBtn.style.display = "none";

        if (showRegisterBtn)
          showRegisterBtn.style.display = "inline-block";


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


  /* =======================================================
     Register Account
  ======================================================= */

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


  /* =======================================================
     Login
  ======================================================= */

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


  /* =======================================================
     Sell Button Navigation
  ======================================================= */

  function openSellSection() {

    const currentUser =
      auth.currentUser;


    if (!currentUser) {

      alert(
        "Please login or create an account before selling a product."
      );


      const loginSection =
        document.getElementById("login");


      if (loginSection) {

        loginSection.scrollIntoView({
          behavior: "smooth"
        });
      }


      return;
    }


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


  /* =======================================================
     Publish Product To Firestore
  ======================================================= */

  if (sellProductForm) {

    sellProductForm.addEventListener(
      "submit",
      async event => {

        event.preventDefault();


        const currentUser =
          auth.currentUser;


        if (!currentUser) {

          if (sellStatus) {

            sellStatus.textContent =
              "Please login before publishing a product.";

            sellStatus.style.color = "red";
          }


          document
            .getElementById("login")
            ?.scrollIntoView({
              behavior: "smooth"
            });


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


        const description =
          document
            .getElementById("productDescription")
            .value
            .trim();


        const imageInput =
          document.getElementById(
            "productImageUrl"
          );


        const image =
          imageInput
            ? imageInput.value.trim()
            : "";


        if (sellStatus) {

          sellStatus.textContent =
            "Publishing product...";

          sellStatus.style.color = "black";
        }


        try {

          await addDoc(
            collection(db, "products"),
            {

              title: title,

              category: category,

              price: Number(price),

              location: location,

              description: description,

              image: image,

              sellerId: currentUser.uid,

              sellerEmail:
                currentUser.email,

              createdAt: new Date()

            }
          );


          if (sellStatus) {

            sellStatus.textContent =
              "Product published successfully! 🎉";

            sellStatus.style.color = "green";
          }


          sellProductForm.reset();


          await loadProducts();


          document
            .getElementById("listings")
            ?.scrollIntoView({
              behavior: "smooth"
            });


        } catch (error) {

          console.error(
            "Publish error:",
            error
          );


          if (sellStatus) {

            sellStatus.textContent =
              "Failed to publish product. Please try again.";

            sellStatus.style.color = "red";
          }
        }

      }
    );
  }


  /* =======================================================
     Authentication State
  ======================================================= */

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


        /*
          Optional logout button
          will be created automatically
        */

        let logoutBtn =
          document.getElementById(
            "logoutBtn"
          );


        if (!logoutBtn) {

          logoutBtn =
            document.createElement("button");

          logoutBtn.id =
            "logoutBtn";

          logoutBtn.type =
            "button";

          logoutBtn.textContent =
            "Logout";

          logoutBtn.className =
            "secondary-btn";


          if (loginForm) {

            loginForm.parentNode.insertBefore(
              logoutBtn,
              loginForm
            );
          }


          logoutBtn.addEventListener(
            "click",
            async () => {

              try {

                await signOut(auth);

                alert(
                  "Logged out successfully."
                );

                location.reload();

              } catch (error) {

                console.error(error);
              }

            }
          );
        }


      } else {

        console.log(
          "No user currently logged in."
        );


        const logoutBtn =
          document.getElementById(
            "logoutBtn"
          );


        if (logoutBtn) {

          logoutBtn.remove();
        }
      }

    }
  );


  /* =======================================================
     Load Firestore Products
  ======================================================= */

  loadProducts();

});

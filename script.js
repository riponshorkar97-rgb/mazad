/* =========================================================
MAZAD - Step 12
Firebase Authentication + Firestore
Cloudinary Image Upload
English + Arabic Language
Firebase Storage is NOT used.
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
orderBy,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

/* =========================================================
Firebase Configuration
========================================================= */

const firebaseConfig = {
apiKey:
"AIzaSyBfiON-27mz4OlD2Hl8uGNMk_2iS2cp2Qw",

authDomain:
"mazad-b8b34.firebaseapp.com",

projectId:
"mazad-b8b34",

storageBucket:
"mazad-b8b34.firebasestorage.app",

messagingSenderId:
"720192718299",

appId:
"1:720192718299:web:703589b39b9ef03e5a13fe",

measurementId:
"G-6HKL7P0H83"
};

/* =========================================================
Cloudinary Configuration
========================================================= */

const CLOUDINARY_CLOUD_NAME =
"bhpccaio";

const CLOUDINARY_UPLOAD_PRESET =
"mazad_upload";

const CLOUDINARY_UPLOAD_URL =
"https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload";

/* =========================================================
Initialize Firebase
========================================================= */

const app =
initializeApp(firebaseConfig);

const auth =
getAuth(app);

const db =
getFirestore(app);

/* =========================================================
Language System
========================================================= */

const translations = {

en: {

home: "Home",
categories: "Categories",
listings: "Listings",
login: "Login",
sellProduct: "Sell Product",

welcome: "Welcome to Mazad",
buySell: "Buy & Sell",
anythingEasily: "Anything Easily",

heroDescription:
  "Find great products near you or sell your products quickly and easily on Mazad.",

browseProducts: "Browse Products",
sellSomething: "Sell Something",
simpleFastSecure: "Simple • Fast • Secure",

searchPlaceholder:
  "What are you looking for?",

allCategories:
  "All Categories",

search:
  "Search",

explore:
  "Explore",

popularCategories:
  "Popular Categories",

cars:
  "Cars",

mobiles:
  "Mobiles",

electronics:
  "Electronics",

property:
  "Property",

fashion:
  "Fashion",

jobs:
  "Jobs",

others:
  "Others",

findNextCar:
  "Find your next car",

phonesAccessories:
  "Phones & accessories",

devicesGadgets:
  "Devices & gadgets",

homesLand:
  "Homes & land",

clothesAccessories:
  "Clothes & accessories",

findOpportunities:
  "Find opportunities",

marketplace:
  "Marketplace",

latestListings:
  "Latest Listings",

loadingProducts:
  "Loading products...",

pleaseWait:
  "Please wait.",

sellYourProduct:
  "Sell Your Product",

productTitle:
  "Product title",

selectCategory:
  "Select Category",

price:
  "Price",

location:
  "Location",

productImage:
  "Product Image",

productDescription:
  "Product description",

publishProduct:
  "Publish Product",

welcomeMazad:
  "Welcome to Mazad",

loginRegisterMessage:
  "Login or register to start buying and selling.",

emailAddress:
  "Email address",

password:
  "Password",

passwordMin:
  "Password (minimum 6 characters)",

createAccount:
  "Create Account",

createNewAccount:
  "Create new account",

alreadyAccount:
  "Already have an account? Login",

description:
  "Description",

seller:
  "Seller",

buySellProducts:
  "Buy and sell products easily.",

allRightsReserved:
  "All rights reserved.",

viewDetails:
  "View Details",

noProducts:
  "No products found",

tryAnother:
  "Try another search or category.",

unknown:
  "Unknown",

noDescription:
  "No description available.",

sellerUnavailable:
  "Seller information unavailable",

contactSeller:
  "Contact Seller",

deleteProduct:
  "Delete Product",

loadingError:
  "Could not load products",

firestoreError:
  "Please check your Firestore rules and try again.",

imageTooLarge:
  "Image must be less than 10 MB.",

validImage:
  "Please select a valid image.",

imageUploaded:
  "Image uploaded successfully! ✅",

uploadingImage:
  "Uploading image to Cloudinary...",

preparingProduct:
  "Preparing product...",

savingProduct:
  "Saving product...",

published:
  "Product published successfully! 🎉",

loginBeforeSell:
  "Please login or create an account before selling a product.",

loginBeforePublish:
  "Please login before publishing a product.",

accountCreated:
  "Account created successfully! 🎉",

loginSuccessful:
  "Login successful! 🎉",

creatingAccount:
  "Creating account...",

loggingIn:
  "Logging in...",

loggedInAs:
  "Logged in as",

logout:
  "Logout",

loggedOut:
  "Logged out successfully.",

deleteConfirm:
  "Are you sure you want to delete this product?",

deleted:
  "Product deleted successfully.",

deleteFailed:
  "Could not delete the product. Please try again.",

productNotFound:
  "Product not found.",

ownProduct:
  "You can only delete your own products.",

loginFirst:
  "Please login first.",

uploadFailed:
  "Cloudinary upload failed.",

imageUrlFailed:
  "Cloudinary did not return an image URL.",

publishFailed:
  "Failed to publish product. Please try again."

},

ar: {

home: "الرئيسية",
categories: "الفئات",
listings: "الإعلانات",
login: "تسجيل الدخول",
sellProduct: "بيع منتج",

welcome: "مرحباً بك في مزاد",
buySell: "بيع وشراء",
anythingEasily: "أي شيء بسهولة",

heroDescription:
  "اعثر على منتجات رائعة بالقرب منك أو قم ببيع منتجاتك بسرعة وسهولة على مزاد.",

browseProducts: "تصفح المنتجات",
sellSomething: "بيع شيء ما",
simpleFastSecure: "بسيط • سريع • آمن",

searchPlaceholder:
  "ما الذي تبحث عنه؟",

allCategories:
  "جميع الفئات",

search:
  "بحث",

explore:
  "استكشف",

popularCategories:
  "الفئات الشائعة",

cars:
  "سيارات",

mobiles:
  "جوالات",

electronics:
  "إلكترونيات",

property:
  "عقارات",

fashion:
  "أزياء",

jobs:
  "وظائف",

others:
  "أخرى",

findNextCar:
  "اعثر على سيارتك القادمة",

phonesAccessories:
  "جوالات وإكسسوارات",

devicesGadgets:
  "أجهزة وأدوات",

homesLand:
  "منازل وأراضٍ",

clothesAccessories:
  "ملابس وإكسسوارات",

findOpportunities:
  "ابحث عن فرص",

marketplace:
  "السوق",

latestListings:
  "أحدث الإعلانات",

loadingProducts:
  "جاري تحميل المنتجات...",

pleaseWait:
  "يرجى الانتظار.",

sellYourProduct:
  "بيع منتجك",

productTitle:
  "عنوان المنتج",

selectCategory:
  "اختر الفئة",

price:
  "السعر",

location:
  "الموقع",

productImage:
  "صورة المنتج",

productDescription:
  "وصف المنتج",

publishProduct:
  "نشر المنتج",

welcomeMazad:
  "مرحباً بك في مزاد",

loginRegisterMessage:
  "سجل الدخول أو أنشئ حساباً لبدء البيع والشراء.",

emailAddress:
  "البريد الإلكتروني",

password:
  "كلمة المرور",

passwordMin:
  "كلمة المرور (6 أحرف على الأقل)",

createAccount:
  "إنشاء حساب",

createNewAccount:
  "إنشاء حساب جديد",

alreadyAccount:
  "لديك حساب بالفعل؟ تسجيل الدخول",

description:
  "الوصف",

seller:
  "البائع",

buySellProducts:
  "اشترِ وبع المنتجات بسهولة.",

allRightsReserved:
  "جميع الحقوق محفوظة.",

viewDetails:
  "عرض التفاصيل",

noProducts:
  "لم يتم العثور على منتجات",

tryAnother:
  "جرب بحثاً أو فئة أخرى.",

unknown:
  "غير معروف",

noDescription:
  "لا يوجد وصف متاح.",

sellerUnavailable:
  "معلومات البائع غير متاحة",

contactSeller:
  "تواصل مع البائع",

deleteProduct:
  "حذف المنتج",

loadingError:
  "تعذر تحميل المنتجات",

firestoreError:
  "يرجى التحقق من إعدادات Firestore والمحاولة مرة أخرى.",

imageTooLarge:
  "يجب أن يكون حجم الصورة أقل من 10 ميجابايت.",

validImage:
  "يرجى اختيار صورة صالحة.",

imageUploaded:
  "تم رفع الصورة بنجاح! ✅",

uploadingImage:
  "جاري رفع الصورة إلى Cloudinary...",

preparingProduct:
  "جاري تجهيز المنتج...",

savingProduct:
  "جاري حفظ المنتج...",

published:
  "تم نشر المنتج بنجاح! 🎉",

loginBeforeSell:
  "يرجى تسجيل الدخول أو إنشاء حساب قبل بيع منتج.",

loginBeforePublish:
  "يرجى تسجيل الدخول قبل نشر المنتج.",

accountCreated:
  "تم إنشاء الحساب بنجاح! 🎉",

loginSuccessful:
  "تم تسجيل الدخول بنجاح! 🎉",

creatingAccount:
  "جاري إنشاء الحساب...",

loggingIn:
  "جاري تسجيل الدخول...",

loggedInAs:
  "تم تسجيل الدخول باسم",

logout:
  "تسجيل الخروج",

loggedOut:
  "تم تسجيل الخروج بنجاح.",

deleteConfirm:
  "هل أنت متأكد من رغبتك في حذف هذا المنتج؟",

deleted:
  "تم حذف المنتج بنجاح.",

deleteFailed:
  "تعذر حذف المنتج. يرجى المحاولة مرة أخرى.",

productNotFound:
  "لم يتم العثور على المنتج.",

ownProduct:
  "يمكنك حذف منتجاتك فقط.",

loginFirst:
  "يرجى تسجيل الدخول أولاً.",

uploadFailed:
  "فشل رفع الصورة إلى Cloudinary.",

imageUrlFailed:
  "لم يُرجع Cloudinary رابط الصورة.",

publishFailed:
  "فشل نشر المنتج. يرجى المحاولة مرة أخرى."

}

};

/* =========================================================
Current Language
========================================================= */

let currentLanguage =
localStorage.getItem("mazadLanguage") || "en";

function t(key) {

return (
translations[currentLanguage]?.[key] ||
translations.en[key] ||
key
);

}

/* =========================================================
Apply Language
========================================================= */

function applyLanguage() {

document.documentElement.lang =
currentLanguage;

document.documentElement.dir =
currentLanguage === "ar"
? "rtl"
: "ltr";

document.body.dir =
currentLanguage === "ar"
? "rtl"
: "ltr";

document
.querySelectorAll("[data-i18n]")
.forEach(element => {

  const key =
    element.dataset.i18n;

  element.textContent =
    t(key);

});

document
.querySelectorAll("[data-i18n-placeholder]")
.forEach(element => {

  const key =
    element.dataset.i18nPlaceholder;

  element.placeholder =
    t(key);

});

const languageBtn =
document.getElementById(
"languageBtn"
);

if (languageBtn) {

languageBtn.textContent =
  currentLanguage === "en"
    ? "العربية"
    : "English";

}

document.title =
currentLanguage === "ar"
? "مزاد — سوق البيع والشراء"
: "Mazad — Buy & Sell Marketplace";

}

/* =========================================================
Switch Language
========================================================= */

function switchLanguage() {

currentLanguage =
currentLanguage === "en"
? "ar"
: "en";

localStorage.setItem(
"mazadLanguage",
currentLanguage
);

applyLanguage();

if (typeof loadProducts === "function") {
displayProducts(products);
}

}

/* =========================================================
Global Products
========================================================= */

let products = [];

/* =========================================================
DOM Ready
========================================================= */

document.addEventListener(
"DOMContentLoaded",
() => {

applyLanguage();


const languageBtn =
  document.getElementById(
    "languageBtn"
  );


if (languageBtn) {

  languageBtn.addEventListener(
    "click",
    switchLanguage
  );

}


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

const imageStatus =
  document.getElementById("imageStatus");

const publishProductBtn =
  document.getElementById("publishProductBtn");

const productImageFile =
  document.getElementById("productImageFile");

const headerSellBtn =
  document.getElementById("headerSellBtn");

const heroSellBtn =
  document.getElementById("heroSellBtn");


/* =======================================================
   Modal Elements
======================================================= */

const productModal =
  document.getElementById("productModal");

const productModalOverlay =
  document.querySelector(".product-modal-overlay");

const closeProductModal =
  document.getElementById("closeProductModal");

const modalProductImage =
  document.getElementById("modalProductImage");

const modalProductCategory =
  document.getElementById("modalProductCategory");

const modalProductTitle =
  document.getElementById("modalProductTitle");

const modalProductPrice =
  document.getElementById("modalProductPrice");

const modalProductLocation =
  document.getElementById("modalProductLocation");

const modalProductDescription =
  document.getElementById("modalProductDescription");

const modalSellerEmail =
  document.getElementById("modalSellerEmail");

const sellerActions =
  document.getElementById("sellerActions");


/* =======================================================
   Helpers
======================================================= */

function escapeHTML(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


function formatPrice(price) {

  const number =
    Number(price);

  if (!Number.isFinite(number)) {
    return "0";
  }

  return number.toLocaleString(
    "en-US",
    {
      minimumFractionDigits:
        Number.isInteger(number)
          ? 0
          : 2,
      maximumFractionDigits: 2
    }
  );

}


/* =======================================================
   Image Selection
======================================================= */

if (productImageFile) {

  productImageFile.addEventListener(
    "change",
    () => {

      const file =
        productImageFile.files[0];

      if (!file) {

        imageStatus.textContent = "";

        return;

      }


      if (
        file.size >
        10 * 1024 * 1024
      ) {

        imageStatus.textContent =
          t("imageTooLarge");

        imageStatus.style.color =
          "red";

        productImageFile.value = "";

        return;

      }


      if (
        !file.type.startsWith("image/")
      ) {

        imageStatus.textContent =
          t("validImage");

        imageStatus.style.color =
          "red";

        productImageFile.value = "";

        return;

      }


      imageStatus.textContent =
        `${file.name}`;

      imageStatus.style.color =
        "green";

    }
  );

}


/* =======================================================
   Authentication Message
======================================================= */

function showAuthMessage(
  message,
  success = false
) {

  if (!authStatus) return;

  authStatus.textContent =
    message;

  authStatus.style.marginTop =
    "15px";

  authStatus.style.fontWeight =
    "600";

  authStatus.style.color =
    success ? "green" : "red";

}


/* =======================================================
   Firebase Error Messages
======================================================= */

function getFirebaseErrorMessage(error) {

  switch (error.code) {

    case "auth/email-already-in-use":
      return currentLanguage === "ar"
        ? "هذا البريد الإلكتروني مسجل بالفعل."
        : "This email is already registered.";

    case "auth/invalid-email":
      return currentLanguage === "ar"
        ? "يرجى إدخال بريد إلكتروني صالح."
        : "Please enter a valid email address.";

    case "auth/weak-password":
      return currentLanguage === "ar"
        ? "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل."
        : "Password must be at least 6 characters.";

    case "auth/invalid-credential":
      return currentLanguage === "ar"
        ? "البريد الإلكتروني أو كلمة المرور غير صحيحة."
        : "Email or password is incorrect.";

    case "auth/user-not-found":
      return currentLanguage === "ar"
        ? "لا يوجد حساب بهذا البريد الإلكتروني."
        : "No account found with this email.";

    case "auth/wrong-password":
      return currentLanguage === "ar"
        ? "كلمة المرور غير صحيحة."
        : "Incorrect password.";

    case "auth/too-many-requests":
      return currentLanguage === "ar"
        ? "محاولات كثيرة جداً. يرجى المحاولة لاحقاً."
        : "Too many attempts. Please try again later.";

    default:
      return currentLanguage === "ar"
        ? "حدث خطأ ما. يرجى المحاولة مرة أخرى."
        : "Something went wrong. Please try again.";

  }

}


/* =======================================================
   Close Modal
======================================================= */

function closeProductDetails() {

  if (!productModal) return;

  productModal.classList.remove(
    "active"
  );

  productModal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "modal-open"
  );

}


/* =======================================================
   Open Product Details
======================================================= */

function openProductDetails(product) {

  if (!productModal || !product) {
    return;
  }


  const image =
    product.image ||
    "https://via.placeholder.com/800x500?text=Mazad+Product";


  modalProductImage.src =
    image;

  modalProductImage.alt =
    product.title ||
    "Mazad Product";


  modalProductCategory.textContent =
    product.category ||
    t("others");


  modalProductTitle.textContent =
    product.title ||
    "Untitled Product";


  modalProductPrice.textContent =
    `$${formatPrice(product.price)}`;


  modalProductLocation.textContent =
    product.location ||
    t("unknown");


  modalProductDescription.textContent =
    product.description ||
    t("noDescription");


  modalSellerEmail.textContent =
    product.sellerEmail ||
    t("sellerUnavailable");


  sellerActions.innerHTML = "";


  const currentUser =
    auth.currentUser;


  if (
    currentUser &&
    product.sellerId === currentUser.uid
  ) {

    const deleteButton =
      document.createElement("button");

    deleteButton.type =
      "button";

    deleteButton.className =
      "delete-product-btn";

    deleteButton.textContent =
      t("deleteProduct");

    deleteButton.addEventListener(
      "click",
      async () => {

        await deleteProduct(
          product.id
        );

      }
    );

    sellerActions.appendChild(
      deleteButton
    );

  } else if (product.sellerEmail) {

    const contactLink =
      document.createElement("a");

    contactLink.className =
      "contact-seller-btn";

    contactLink.href =
      `mailto:${product.sellerEmail}?subject=${encodeURIComponent(
        `Mazad inquiry: ${product.title || "Product"}`
      )}`;

    contactLink.textContent =
      t("contactSeller");

    sellerActions.appendChild(
      contactLink
    );

  }


  productModal.classList.add(
    "active"
  );

  productModal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "modal-open"
  );

}


if (closeProductModal) {

  closeProductModal.addEventListener(
    "click",
    closeProductDetails
  );

}


if (productModalOverlay) {

  productModalOverlay.addEventListener(
    "click",
    closeProductDetails
  );

}


document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape" &&
      productModal &&
      productModal.classList.contains("active")
    ) {

      closeProductDetails();

    }

  }
);


/* =======================================================
   Delete Product
======================================================= */

async function deleteProduct(
  productId
) {

  const currentUser =
    auth.currentUser;


  if (!currentUser) {

    alert(t("loginFirst"));

    return;

  }


  const product =
    products.find(
      item =>
        item.id === productId
    );


  if (!product) {

    alert(t("productNotFound"));

    return;

  }


  if (
    product.sellerId !==
    currentUser.uid
  ) {

    alert(t("ownProduct"));

    return;

  }


  const confirmed =
    confirm(
      t("deleteConfirm")
    );


  if (!confirmed) {
    return;
  }


  try {

    await deleteDoc(
      doc(
        db,
        "products",
        productId
      )
    );


    closeProductDetails();

    alert(t("deleted"));

    await loadProducts();


  } catch (error) {

    console.error(
      "Delete error:",
      error
    );

    alert(
      t("deleteFailed")
    );

  }

}


/* =======================================================
   Display Products
======================================================= */

function displayProducts(
  productList
) {

  if (!productsContainer) {
    return;
  }


  if (
    productList.length === 0
  ) {

    productsContainer.innerHTML = `

      <div class="empty-state">

        <div>📦</div>

        <h3>
          ${escapeHTML(t("noProducts"))}
        </h3>

        <p>
          ${escapeHTML(t("tryAnother"))}
        </p>

      </div>

    `;

    return;

  }


  productsContainer.innerHTML =

    productList
      .map(
        product => {

          const image =
            product.image ||
            "https://via.placeholder.com/800x500?text=Mazad+Product";


          return `

            <article class="product-card">

              <div class="product-image">

                <img
                  src="${escapeHTML(image)}"
                  alt="${escapeHTML(
                    product.title ||
                    "Mazad Product"
                  )}"
                  loading="lazy"
                >

              </div>

              <div class="product-info">

                <span class="product-category">
                  ${escapeHTML(
                    product.category ||
                    t("others")
                  )}
                </span>

                <h3>
                  ${escapeHTML(
                    product.title ||
                    "Untitled Product"
                  )}
                </h3>

                <div class="product-price">
                  $${formatPrice(
                    product.price
                  )}
                </div>

                <p class="product-location">
                  📍 ${escapeHTML(
                    product.location ||
                    t("unknown")
                  )}
                </p>

                <button
                  class="view-product-btn"
                  data-id="${escapeHTML(
                    product.id
                  )}"
                  type="button"
                >
                  ${escapeHTML(t("viewDetails"))}
                </button>

              </div>

            </article>

          `;

        }
      )
      .join("");


  addProductEvents();

}


/* =======================================================
   Product Events
======================================================= */

function addProductEvents() {

  document
    .querySelectorAll(
      ".view-product-btn"
    )
    .forEach(
      button => {

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


            if (product) {

              openProductDetails(
                product
              );

            }

          }
        );

      }
    );

}


/* =======================================================
   Load Products
======================================================= */

async function loadProducts() {

  if (!productsContainer) {
    return;
  }


  productsContainer.innerHTML = `

    <div class="empty-state">

      <div>⏳</div>

      <h3>
        ${escapeHTML(t("loadingProducts"))}
      </h3>

      <p>
        ${escapeHTML(t("pleaseWait"))}
      </p>

    </div>

  `;


  try {

    const productsRef =
      collection(
        db,
        "products"
      );


    const productsQuery =
      query(
        productsRef,
        orderBy(
          "createdAt",
          "desc"
        )
      );


    const snapshot =
      await getDocs(
        productsQuery
      );


    products = [];


    snapshot.forEach(
      productDoc => {

        products.push({

          id:
            productDoc.id,

          ...productDoc.data()

        });

      }
    );


    displayProducts(
      products
    );


  } catch (error) {

    console.error(
      "Firestore loading error:",
      error
    );


    productsContainer.innerHTML = `

      <div class="empty-state">

        <div>⚠️</div>

        <h3>
          ${escapeHTML(t("loadingError"))}
        </h3>

        <p>
          ${escapeHTML(t("firestoreError"))}
        </p>

      </div>

    `;

  }

}


/* =======================================================
   Search
======================================================= */

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
    products.filter(
      product => {

        const title =
          (
            product.title ||
            ""
          ).toLowerCase();


        const category =
          (
            product.category ||
            ""
          ).toLowerCase();


        const location =
          (
            product.location ||
            ""
          ).toLowerCase();


        const matchesText =

          title.includes(
            searchText
          ) ||

          category.includes(
            searchText
          ) ||

          location.includes(
            searchText
          );


        const matchesCategory =

          selectedCategory === "" ||

          product.category ===
            selectedCategory;


        return (
          matchesText &&
          matchesCategory
        );

      }
    );


  displayProducts(
    filteredProducts
  );

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


  searchInput.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Enter"
      ) {

        event.preventDefault();

        searchProducts();

      }

    }
  );

}


if (categorySelect) {

  categorySelect.addEventListener(
    "change",
    searchProducts
  );

}


/* =======================================================
   Category Cards
======================================================= */

document
  .querySelectorAll(
    ".category-card"
  )
  .forEach(
    card => {

      card.addEventListener(
        "click",
        () => {

          const category =
            card.dataset.category;


          if (categorySelect) {

            categorySelect.value =
              category;

          }


          searchProducts();


          document
            .getElementById(
              "listings"
            )
            ?.scrollIntoView({
              behavior: "smooth"
            });

        }
      );

    }
  );


/* =======================================================
   Register/Login Toggle
======================================================= */

if (showRegisterBtn) {

  showRegisterBtn.addEventListener(
    "click",
    () => {

      loginForm.style.display =
        "none";

      registerForm.style.display =
        "block";

      showRegisterBtn.style.display =
        "none";

      showLoginBtn.style.display =
        "inline-block";

      authTitle.textContent =
        currentLanguage === "ar"
          ? "إنشاء حساب مزاد"
          : "Create Mazad Account";

      authMessage.textContent =
        currentLanguage === "ar"
          ? "سجل لإنشاء حساب والبدء بالبيع والشراء."
          : "Register to start buying and selling.";

      showAuthMessage("");

    }
  );

}


if (showLoginBtn) {

  showLoginBtn.addEventListener(
    "click",
    () => {

      registerForm.style.display =
        "none";

      loginForm.style.display =
        "block";

      showLoginBtn.style.display =
        "none";

      showRegisterBtn.style.display =
        "inline-block";

      authTitle.textContent =
        t("welcomeMazad");

      authMessage.textContent =
        t("loginRegisterMessage");

      showAuthMessage("");

    }
  );

}


/* =======================================================
   Register
======================================================= */

if (registerForm) {

  registerForm.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      const email =
        document
          .getElementById(
            "registerEmail"
          )
          .value
          .trim();


      const password =
        document
          .getElementById(
            "registerPassword"
          )
          .value;


      showAuthMessage(
        t("creatingAccount")
      );


      try {

        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );


        showAuthMessage(
          t("accountCreated"),
          true
        );


        registerForm.reset();


      } catch (error) {

        console.error(error);

        showAuthMessage(
          getFirebaseErrorMessage(
            error
          )
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
          .getElementById(
            "loginEmail"
          )
          .value
          .trim();


      const password =
        document
          .getElementById(
            "loginPassword"
          )
          .value;


      showAuthMessage(
        t("loggingIn")
      );


      try {

        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );


        showAuthMessage(
          t("loginSuccessful"),
          true
        );


        loginForm.reset();


      } catch (error) {

        console.error(error);

        showAuthMessage(
          getFirebaseErrorMessage(
            error
          )
        );

      }

    }
  );

}


/* =======================================================
   Sell Navigation
======================================================= */

function openSellSection() {

  const currentUser =
    auth.currentUser;


  if (!currentUser) {

    alert(
      t("loginBeforeSell")
    );


    document
      .getElementById(
        "login"
      )
      ?.scrollIntoView({
        behavior: "smooth"
      });


    return;

  }


  document
    .getElementById(
      "sell"
    )
    ?.scrollIntoView({
      behavior: "smooth"
    });

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
   Cloudinary Upload
======================================================= */

async function uploadImageToCloudinary(
  file
) {

  if (!file) {
    return "";
  }


  if (
    file.size >
    10 * 1024 * 1024
  ) {

    throw new Error(
      t("imageTooLarge")
    );

  }


  if (
    !file.type.startsWith("image/")
  ) {

    throw new Error(
      t("validImage")
    );

  }


  imageStatus.textContent =
    t("uploadingImage");

  imageStatus.style.color =
    "black";


  const formData =
    new FormData();


  formData.append(
    "file",
    file
  );


  formData.append(
    "upload_preset",
    CLOUDINARY_UPLOAD_PRESET
  );


  const response =
    await fetch(
      CLOUDINARY_UPLOAD_URL,
      {
        method: "POST",
        body: formData
      }
    );


  if (!response.ok) {

    let errorMessage =
      t("uploadFailed");


    try {

      const errorData =
        await response.json();


      if (
        errorData.error &&
        errorData.error.message
      ) {

        errorMessage =
          errorData.error.message;

      }

    } catch (error) {

      console.error(error);

    }


    throw new Error(
      errorMessage
    );

  }


  const data =
    await response.json();


  if (!data.secure_url) {

    throw new Error(
      t("imageUrlFailed")
    );

  }


  imageStatus.textContent =
    t("imageUploaded");

  imageStatus.style.color =
    "green";


  return data.secure_url;

}


/* =======================================================
   Publish Product
======================================================= */

if (sellProductForm) {

  sellProductForm.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      const currentUser =
        auth.currentUser;


      if (!currentUser) {

        sellStatus.textContent =
          t("loginBeforePublish");

        sellStatus.style.color =
          "red";


        document
          .getElementById(
            "login"
          )
          ?.scrollIntoView({
            behavior: "smooth"
          });


        return;

      }


      const title =
        document
          .getElementById(
            "productTitle"
          )
          .value
          .trim();


      const category =
        document
          .getElementById(
            "productCategory"
          )
          .value;


      const price =
        document
          .getElementById(
            "productPrice"
          )
          .value;


      const location =
        document
          .getElementById(
            "productLocation"
          )
          .value
          .trim();


      const description =
        document
          .getElementById(
            "productDescription"
          )
          .value
          .trim();


      const imageFile =
        productImageFile
          ? productImageFile.files[0]
          : null;


      sellStatus.textContent =
        t("preparingProduct");

      sellStatus.style.color =
        "black";


      publishProductBtn.disabled =
        true;

      publishProductBtn.textContent =
        currentLanguage === "ar"
          ? "جاري النشر..."
          : "Publishing...";


      try {

        let imageUrl = "";


        if (imageFile) {

          imageUrl =
            await uploadImageToCloudinary(
              imageFile
            );

        }


        sellStatus.textContent =
          t("savingProduct");


        await addDoc(
          collection(
            db,
            "products"
          ),
          {

            title:
              title,

            category:
              category,

            price:
              Number(price),

            location:
              location,

            description:
              description,

            image:
              imageUrl,

            sellerId:
              currentUser.uid,

            sellerEmail:
              currentUser.email,

            createdAt:
              new Date()

          }
        );


        sellStatus.textContent =
          t("published");

        sellStatus.style.color =
          "green";


        imageStatus.textContent =
          "";


        sellProductForm.reset();


        await loadProducts();


        document
          .getElementById(
            "listings"
          )
          ?.scrollIntoView({
            behavior: "smooth"
          });


      } catch (error) {

        console.error(
          "Publish error:",
          error
        );


        sellStatus.textContent =
          error.message ||
          t("publishFailed");

        sellStatus.style.color =
          "red";

      } finally {

        publishProductBtn.disabled =
          false;

        publishProductBtn.textContent =
          t("publishProduct");

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


      authMessage.textContent =
        `${t("loggedInAs")} ${user.email}`;


      let logoutBtn =
        document.getElementById(
          "logoutBtn"
        );


      if (!logoutBtn) {

        logoutBtn =
          document.createElement(
            "button"
          );


        logoutBtn.id =
          "logoutBtn";

        logoutBtn.type =
          "button";

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
                t("loggedOut")
              );

              location.reload();

            } catch (error) {

              console.error(error);

            }

          }
        );

      }


      logoutBtn.textContent =
        t("logout");


    } else {

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
   Initial Load
======================================================= */

loadProducts();

}
);

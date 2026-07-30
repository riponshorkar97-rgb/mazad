/* =========================================================
   MAZAD — Step 12 Complete
   Profile + Buyer/Seller + Messenger
   Firebase Authentication + Firestore
   Cloudinary Image Upload
   English + Arabic Language
   Firebase Storage is NOT used.
========================================================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

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
  getDoc,
  setDoc,
  query,
  where,
  deleteDoc,
  doc,
  serverTimestamp,
  onSnapshot
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
   Cloudinary
========================================================= */

const CLOUDINARY_CLOUD_NAME = "bhpccaio";
const CLOUDINARY_UPLOAD_PRESET = "mazad_upload";

const CLOUDINARY_UPLOAD_URL =
  `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

/* =========================================================
   Initialize Firebase
========================================================= */

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
/* =========================================================
   MAZAD — Step 12 Complete
   Profile + Buyer/Seller + Messenger
   Firebase Authentication + Firestore
   Cloudinary Image Upload
   English + Arabic Language
   Firebase Storage is NOT used.
========================================================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

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
  getDoc,
  setDoc,
  query,
  where,
  deleteDoc,
  doc,
  serverTimestamp,
  onSnapshot
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
   Cloudinary
========================================================= */

const CLOUDINARY_CLOUD_NAME = "bhpccaio";
const CLOUDINARY_UPLOAD_PRESET = "mazad_upload";

const CLOUDINARY_UPLOAD_URL =
  `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;


/* =========================================================
   Initialize Firebase
========================================================= */

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);


/* =========================================================
   Translations
========================================================= */

const translations = {

  en: {

    home: "Home",
    categories: "Categories",
    listings: "Listings",
    login: "Login",
    profile: "Profile",
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

    allCategories: "All Categories",
    search: "Search",
    explore: "Explore",

    popularCategories: "Popular Categories",

    cars: "Cars",
    mobiles: "Mobiles",
    electronics: "Electronics",
    property: "Property",
    fashion: "Fashion",
    jobs: "Jobs",
    others: "Others",

    findNextCar: "Find your next car",
    phonesAccessories: "Phones & accessories",
    devicesGadgets: "Devices & gadgets",
    homesLand: "Homes & land",
    clothesAccessories: "Clothes & accessories",
    findOpportunities: "Find opportunities",

    marketplace: "Marketplace",
    latestListings: "Latest Listings",

    loadingProducts: "Loading products...",
    pleaseWait: "Please wait."
     /* =========================================================
   Language
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

function applyLanguage() {
  document.documentElement.lang =
    currentLanguage;

  document.documentElement.dir =
    currentLanguage === "ar"
      ? "rtl"
      : "ltr";

  document
    .querySelectorAll("[data-i18n]")
    .forEach(element => {
      const key =
        element.dataset.i18n;

      element.textContent = t(key);
    });

  document
    .querySelectorAll("[data-i18n-placeholder]")
    .forEach(element => {
      const key =
        element.dataset.i18nPlaceholder;

      element.placeholder = t(key);
    });
}


/* =========================================================
   Helpers
========================================================= */

function escapeHTML(value) {
  const div =
    document.createElement("div");

  div.textContent =
    value == null ? "" : String(value);

  return div.innerHTML;
}


function formatPrice(value) {
  const number =
    Number(value);

  if (Number.isNaN(number)) {
    return "0.00";
  }

  return number.toLocaleString(
    "en-US",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
  );
}


function formatDate(value) {
  if (!value) {
    return "";
  }

  let date;

  if (
    typeof value.toDate ===
    "function"
  ) {
    date = value.toDate();
  } else {
    date = new Date(value);
  }

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "";
  }

  return date.toLocaleDateString(
    currentLanguage === "ar"
      ? "ar-SA"
      : "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric"
    }
  );
}


/* =========================================================
   Default Avatar
========================================================= */

function getDefaultAvatar() {
  return (
    "https://ui-avatars.com/api/" +
    "?name=User&background=random"
  );
}


/* =========================================================
   Global State
========================================================= */

let products = [];

let currentProfile = null;

let selectedConversationId = null;

let selectedChatUser = null;

let unsubscribeMessages = null;


/* =========================================================
   DOM Elements
========================================================= */

const productsContainer =
  document.getElementById(
    "productsContainer"
  );

const searchInput =
  document.getElementById(
    "searchInput"
  );

const searchBtn =
  document.getElementById(
    "searchBtn"
  );

const categorySelect =
  document.getElementById(
    "categorySelect"
  );

const sellProductForm =
  document.getElementById(
    "sellProductForm"
  );

const productImageFile =
  document.getElementById(
    "productImageFile"
  );

const imageStatus =
  document.getElementById(
    "imageStatus"
  );

const publishProductBtn =
  document.getElementById(
    "publishProductBtn"
  );

const sellStatus =
  document.getElementById(
    "sellStatus"
  );


/* =========================================================
   Authentication Elements
========================================================= */

const loginForm =
  document.getElementById(
    "loginForm"
  );

const registerForm =
  document.getElementById(
    "registerForm"
  );

const showRegisterBtn =
  document.getElementById(
    "showRegisterBtn"
  );

const showLoginBtn =
  document.getElementById(
    "showLoginBtn"
  );

const authTitle =
  document.getElementById(
    "authTitle"
  );

const authMessage =
  document.getElementById(
    "authMessage"
  );


/* =========================================================
   Profile Elements
========================================================= */

const profileContent =
  document.getElementById(
    "profileContent"
  );

const profileNavBtn =
  document.getElementById(
    "profileNavBtn"
  );

const editProfileModal =
  document.getElementById(
    "editProfileModal"
  );

const editProfileModalOverlay =
  document.getElementById(
    "editProfileModalOverlay"
  );

const closeEditProfileModal =
  document.getElementById(
    "closeEditProfileModal"
  );

const editProfileForm =
  document.getElementById(
    "editProfileForm"
  );

const profileNameInput =
  document.getElementById(
    "profileName"
  );

const profilePhoneInput =
  document.getElementById(
    "profilePhone"
  );

const profileLocationInput =
  document.getElementById(
    "profileLocation"
  );

const profileBioInput =
  document.getElementById(
    "profileBio"
  );

const profilePhotoFile =
  document.getElementById(
    "profilePhotoFile"
  );

const profileImageStatus =
  document.getElementById(
    "profileImageStatus"
  );

const profileSaveStatus =
  document.getElementById(
    "profileSaveStatus"
  );

const saveProfileBtn =
  document.getElementById(
    "saveProfileBtn"
  );


/* =========================================================
   Product Modal Elements
========================================================= */

const productModal =
  document.getElementById(
    "productModal"
  );

const productModalOverlay =
  document.getElementById(
    "productModalOverlay"
  );

const closeProductModal =
  document.getElementById(
    "closeProductModal"
  );

const modalProductImage =
  document.getElementById(
    "modalProductImage"
  );

const modalProductCategory =
  document.getElementById(
    "modalProductCategory"
  );

const modalProductTitle =
  document.getElementById(
    "modalProductTitle"
  );

const modalProductPrice =
  document.getElementById(
    "modalProductPrice"
  );

const modalProductLocation =
  document.getElementById(
    "modalProductLocation"
  );

const modalProductDescription =
  document.getElementById(
    "modalProductDescription"
  );

const modalSellerPhoto =
  document.getElementById(
    "modalSellerPhoto"
  );

const modalSellerName =
  document.getElementById(
    "modalSellerName"
  );

const modalSellerEmail =
  document.getElementById(
    "modalSellerEmail"
  );

const sellerActions =
  document.getElementById(
    "sellerActions"
  );


/* =========================================================
   Public Profile Modal
========================================================= */

const profileModal =
  document.getElementById(
    "profileModal"
  );

const profileModalOverlay =
  document.getElementById(
    "profileModalOverlay"
  );

const closePublicProfileModal =
  document.getElementById(
    "closeProfileModal"
  );

const profileModalContent =
  document.getElementById(
    "profileModalContent"
  );


/* =========================================================
   Messenger Elements
========================================================= */

const conversationList =
  document.getElementById(
    "conversationList"
  );

const chatMessages =
  document.getElementById(
    "chatMessages"
  );

const chatForm =
  document.getElementById(
    "chatForm"
  );

const chatInput =
  document.getElementById(
    "chatInput"
  );

const chatHeader =
  document.getElementById(
    "chatHeader"
  );


/* =========================================================
   Navigation
========================================================= */

const headerSellBtn =
  document.getElementById(
    "headerSellBtn"
  );

const heroSellBtn =
  document.getElementById(
    "heroSellBtn"
  );


/* =========================================================
   Auth Message
========================================================= */

function showAuthMessage(
  message,
  success = false
) {
  if (!authMessage) {
    return;
  }

  authMessage.textContent =
    message || "";

  authMessage.style.color =
    success
      ? "green"
      : "";
}


/* =========================================================
   Initial Language
========================================================= */

applyLanguage();
    async function createUserProfile(user) {

      if (!user) {
        return;
      }

      const profileRef =
        doc(
          db,
          "users",
          user.uid
        );

      const existing =
        await getDoc(profileRef);

      if (existing.exists()) {
        return;
      }

      await setDoc(
        profileRef,
        {
          uid: user.uid,
          name: "",
          phone: "",
          email: user.email || "",
          location: "",
          bio: "",
          photoURL: "",
          createdAt:
            serverTimestamp(),
          updatedAt:
            serverTimestamp()
        }
      );

    }


    /* =======================================================
       Profile Display
    ======================================================= */

    function profileTemplate(
      profile,
      user,
      isOwnProfile = false
    ) {

      const photo =
        profile?.photoURL ||
        getDefaultAvatar();

      const name =
        profile?.name?.trim() ||
        user?.email ||
        t("member");

      const email =
        profile?.email ||
        user?.email ||
        "";

      const phone =
        profile?.phone ||
        t("unknown");

      const location =
        profile?.location ||
        t("unknown");

      const bio =
        profile?.bio ||
        t("noDescription");

      const joined =
        formatDate(
          profile?.createdAt
        );

      const userProducts =
        products.filter(
          product =>
            product.sellerId ===
            (profile?.uid || user?.uid)
        );


      return `

        <div class="profile-card">

          <div class="profile-cover"></div>

          <div class="profile-main">

            <div class="profile-top">

              <img
                class="profile-avatar-image"
                src="${escapeHTML(photo)}"
                alt="${escapeHTML(name)}"
              >

              <div class="profile-heading">

                <h2>
                  ${escapeHTML(name)}
                </h2>

                <p>
                  ${escapeHTML(
                    t("member")
                  )}
                </p>

              </div>

              ${
                isOwnProfile
                  ? `
                    <div class="profile-actions">

                      <button
                        type="button"
                        class="primary-btn"
                        id="openEditProfileBtn"
                      >
                        ${escapeHTML(
                          t("editProfile")
                        )}
                      </button>

                    </div>
                  `
                  : ""
              }

            </div>


            <div class="profile-info-grid">

              <div class="profile-info-item">

                <span>
                  ${escapeHTML(
                    t("email")
                  )}
                </span>

                <strong>
                  ${escapeHTML(email)}
                </strong>

              </div>


              <div class="profile-info-item">

                <span>
                  ${escapeHTML(
                    t("phone")
                  )}
                </span>

                <strong>
                  ${escapeHTML(phone)}
                </strong>

              </div>


              <div class="profile-info-item">

                <span>
                  ${escapeHTML(
                    t("location")
                  )}
                </span>

                <strong>
                  ${escapeHTML(location)}
                </strong>

              </div>


              <div class="profile-info-item">

                <span>
                  ${escapeHTML(
                    t("joinDate")
                  )}
                </span>

                <strong>
                  ${escapeHTML(joined)}
                </strong>

              </div>

            </div>


            <div class="profile-bio">

              <h3>
                ${escapeHTML(
                  t("bio")
                )}
              </h3>

              <p>
                ${escapeHTML(bio)}
              </p>

            </div>
                        <div class="profile-listings">

              <h3>
                ${escapeHTML(
                  t("myListings")
                )}
              </h3>

              ${
                userProducts.length
                  ? `
                    <div class="mini-products">

                      ${userProducts
                        .map(
                          product => `

                            <div
                              class="mini-product"
                              data-profile-product-id="${escapeHTML(
                                product.id
                              )}"
                            >

                              <img
                                src="${escapeHTML(
                                  product.image ||
                                  "https://via.placeholder.com/500x300?text=Mazad"
                                )}"
                                alt="${escapeHTML(
                                  product.title ||
                                  "Product"
                                )}"
                              >

                              <div class="mini-product-info">

                                <strong>
                                  ${escapeHTML(
                                    product.title ||
                                    "Product"
                                  )}
                                </strong>

                                <span>
                                  $${formatPrice(
                                    product.price
                                  )}
                                </span>

                              </div>

                            </div>

                          `
                        )
                        .join("")}

                    </div>
                  `
                  : `
                    <div class="empty-state">

                      <div>📦</div>

                      <p>
                        ${escapeHTML(
                          t("noListings")
                        )}
                      </p>

                    </div>
                  `
              }

            </div>

          </div>

        </div>

      `;

    }


    async function renderMyProfile() {

      if (!profileContent) {
        return;
      }

      const user =
        auth.currentUser;

      if (!user) {

        profileContent.innerHTML = `

          <div class="not-logged-profile">

            <div class="hero-icon">
              👤
            </div>

            <h3>
              ${escapeHTML(
                t("profileRequired")
              )}
            </h3>

          </div>

        `;

        return;

      }


      profileContent.innerHTML = `

        <div class="empty-state">

          <div>⏳</div>

          <p>
            ${escapeHTML(
              t("loading")
            )}
          </p>

        </div>

      `;


      let profile =
        await getUserProfile(
          user.uid
        );


      if (!profile) {

        await createUserProfile(
          user
        );

        profile =
          await getUserProfile(
            user.uid
          );

      }


      currentProfile =
        profile;


      profileContent.innerHTML =
        profileTemplate(
          profile,
          user,
          true
        );


      const editBtn =
        document.getElementById(
          "openEditProfileBtn"
        );


      if (editBtn) {

        editBtn.addEventListener(
          "click",
          openEditProfile
        );

      }


      profileContent
        .querySelectorAll(
          "[data-profile-product-id]"
        )
        .forEach(
          card => {

            card.addEventListener(
              "click",
              () => {

                const id =
                  card.dataset
                    .profileProductId;

                const product =
                  products.find(
                    item =>
                      item.id === id
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
       Public Profile
    ======================================================= */

    async function openPublicProfile(
      uid
    ) {

      if (!profileModalContent) {
        return;
      }


      profileModalContent.innerHTML = `

        <div class="empty-state">

          <div>⏳</div>

          <p>
            ${escapeHTML(
              t("loading")
            )}
          </p>

        </div>

      `;


      profileModal.classList.add(
        "active"
      );

      profileModal.setAttribute(
        "aria-hidden",
        "false"
      );

      document.body.classList.add(
        "modal-open"
      );


      const profile =
        await getUserProfile(uid);


      if (!profile) {

        profileModalContent.innerHTML = `

          <div class="not-logged-profile">

            <h3>
              ${escapeHTML(
                t("profileNotFound")
              )}
            </h3>

          </div>

        `;

        return;

      }


      const user = {
        uid,
        email:
          profile.email || ""
      };


      const userProducts =
        products.filter(
          product =>
            product.sellerId === uid
        );


      profileModalContent.innerHTML = `

        <div class="profile-public">

          <div class="profile-public-cover"></div>

          <div class="profile-public-body">

            <div class="profile-public-top">

              <img
                class="public-avatar"
                src="${escapeHTML(
                  profile.photoURL ||
                  getDefaultAvatar()
                )}"
                alt="${escapeHTML(
                  profile.name ||
                  profile.email ||
                  "User"
                )}"
              >

              <div class="public-heading">

                <h2>
                  ${escapeHTML(
                    profile.name ||
                    profile.email ||
                    t("member")
                  )}
                </h2>

                <p>
                  ${escapeHTML(
                    t("member")
                  )}
                </p>

              </div>

            </div>


            <div class="public-info">

              <div class="public-info-item">

                <span>
                  ${escapeHTML(
                    t("email")
                  )}
                </span>

                <strong>
                  ${escapeHTML(
                    profile.email || ""
                  )}
                </strong>

              </div>


              <div class="public-info-item">

                <span>
                  ${escapeHTML(
                    t("phone")
                  )}
                </span>

                <strong>
                  ${escapeHTML(
                    profile.phone ||
                    t("unknown")
                  )}
                </strong>

              </div>


              <div class="public-info-item">

                <span>
                  ${escapeHTML(
                    t("location")
                  )}
                </span>

                <strong>
                  ${escapeHTML(
                    profile.location ||
                    t("unknown")
                  )}
                </strong>

              </div>


              <div class="public-info-item">

                <span>
                  ${escapeHTML(
                    t("joinDate")
                  )}
                </span>

                <strong>
                  ${escapeHTML(
                    formatDate(
                      profile.createdAt
                    )
                  )}
                </strong>

              </div>

            </div>


            <div class="public-bio">

              <h3>
                ${escapeHTML(
                  t("bio")
                )}
              </h3>

              <p>
                ${escapeHTML(
                  profile.bio ||
                  t("noDescription")
                )}
              </p>

            </div>
                const messageBtn =
        document.getElementById(
          "publicMessageBtn"
        );


      if (messageBtn) {

        messageBtn.addEventListener(
          "click",
          () => {

            if (!auth.currentUser) {

              alert(
                t("loginToMessage")
              );

              return;

            }


            if (
              auth.currentUser.uid ===
              uid
            ) {

              alert(
                t("cannotMessageSelf")
              );

              return;

            }


            closeProfileModal();

            startConversation(
              uid
            );

          }
        );

      }


      profileModalContent
        .querySelectorAll(
          "[data-public-product-id]"
        )
        .forEach(
          card => {

            card.addEventListener(
              "click",
              () => {

                const id =
                  card.dataset
                    .publicProductId;

                const product =
                  products.find(
                    item =>
                      item.id === id
                  );

                if (product) {

                  closeProfileModal();

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
       Close Public Profile
    ======================================================= */

    function closeProfileModal() {

      if (!profileModal) {
        return;
      }

      profileModal.classList.remove(
        "active"
      );

      profileModal.setAttribute(
        "aria-hidden",
        "true"
      );

      document.body.classList.remove(
        "modal-open"
      );

    }


    if (closePublicProfileModal) {

      closePublicProfileModal.addEventListener(
        "click",
        closeProfileModal
      );

    }


    if (profileModalOverlay) {

      profileModalOverlay.addEventListener(
        "click",
        closeProfileModal
      );

    }


    /* =======================================================
       Edit Profile
    ======================================================= */

    function openEditProfile() {

      const user =
        auth.currentUser;

      if (!user) {

        alert(
          t("editProfileLogin")
        );

        return;

      }


      const profile =
        currentProfile || {};


      if (profileNameInput) {

        profileNameInput.value =
          profile.name || "";

      }


      if (profilePhoneInput) {

        profilePhoneInput.value =
          profile.phone || "";

      }


      if (profileLocationInput) {

        profileLocationInput.value =
          profile.location || "";

      }


      if (profileBioInput) {

        profileBioInput.value =
          profile.bio || "";

      }


      if (profileImageStatus) {

        profileImageStatus.textContent =
          "";

      }


      if (profileSaveStatus) {

        profileSaveStatus.textContent =
          "";

      }


      if (editProfileModal) {

        editProfileModal.classList.add(
          "active"
        );

        editProfileModal.setAttribute(
          "aria-hidden",
          "false"
        );

        document.body.classList.add(
          "modal-open"
        );

      }

    }


    function closeEditProfile() {

      if (!editProfileModal) {
        return;
      }


      editProfileModal.classList.remove(
        "active"
      );

      editProfileModal.setAttribute(
        "aria-hidden",
        "true"
      );

      document.body.classList.remove(
        "modal-open"
      );

    }


    if (closeEditProfileModal) {

      closeEditProfileModal.addEventListener(
        "click",
        closeEditProfile
      );

    }


    if (editProfileModalOverlay) {

      editProfileModalOverlay.addEventListener(
        "click",
        closeEditProfile
      );

    }


    /* =======================================================
       Image Upload
    ======================================================= */

    async function uploadImageToCloudinary(
      file
    ) {

      if (!file) {
        return "";
      }


      if (
        !file.type.startsWith(
          "image/"
        )
      ) {

        throw new Error(
          "INVALID_IMAGE"
        );

      }


      if (
        file.size >
        10 * 1024 * 1024
      ) {

        throw new Error(
          "IMAGE_TOO_LARGE"
        );

      }


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

        throw new Error(
          "UPLOAD_FAILED"
        );

      }


      const data =
        await response.json();


      return (
        data.secure_url ||
        data.url ||
        ""
      );

    }  
    /* =======================================================
   FAST IMAGE RESIZE + COMPRESS
   Cloudinary Upload
======================================================= */

async function compressImage(
  file,
  maxWidth = 1600,
  maxHeight = 1600,
  quality = 0.82
) {

  if (!file) {
    return null;
  }

  if (
    !file.type.startsWith("image/")
  ) {
    throw new Error(
      t("validImage")
    );
  }

  const image =
    await new Promise(
      (resolve, reject) => {

        const img =
          new Image();

        const objectUrl =
          URL.createObjectURL(
            file
          );

        img.onload = () => {

          URL.revokeObjectURL(
            objectUrl
          );

          resolve(img);

        };

        img.onerror = () => {

          URL.revokeObjectURL(
            objectUrl
          );

          reject(
            new Error(
              t("validImage")
            )
          );

        };

        img.src =
          objectUrl;

      }
    );


  let width =
    image.naturalWidth;

  let height =
    image.naturalHeight;


  const scale =
    Math.min(
      1,
      maxWidth / width,
      maxHeight / height
    );


  width =
    Math.round(
      width * scale
    );

  height =
    Math.round(
      height * scale
    );


  const canvas =
    document.createElement(
      "canvas"
    );

  canvas.width =
    width;

  canvas.height =
    height;


  const context =
    canvas.getContext(
      "2d",
      {
        alpha: false
      }
    );


  if (!context) {
    throw new Error(
      "Canvas is not supported."
    );
  }


  context.imageSmoothingEnabled =
    true;

  context.imageSmoothingQuality =
    "high";


  context.drawImage(
    image,
    0,
    0,
    width,
    height
  );


  const blob =
    await new Promise(
      resolve => {

        canvas.toBlob(
          resolve,
          "image/jpeg",
          quality
        );

      }
    );


  if (!blob) {

    throw new Error(
      "Image compression failed."
    );

  }


  return new File(
    [blob],
    "mazad-image.jpg",
    {
      type:
        "image/jpeg",
      lastModified:
        Date.now()
    }
  );

}


/* =======================================================
   Cloudinary Upload — FAST VERSION
======================================================= */

async function uploadImageToCloudinary(
  file,
  statusElement
) {

  if (!file) {
    return "";
  }


  if (
    !file.type.startsWith(
      "image/"
    )
  ) {

    throw new Error(
      t("validImage")
    );

  }


  if (
    file.size >
    10 * 1024 * 1024
  ) {

    throw new Error(
      t("imageTooLarge")
    );

  }


  if (statusElement) {

    statusElement.textContent =
      t("preparingProduct");

    statusElement.style.color =
      "black";

  }


  /* Compress before upload */

  const compressedFile =
    await compressImage(
      file,
      1600,
      1600,
      0.82
    );


  if (!compressedFile) {

    throw new Error(
      t("uploadFailed")
    );

  }


  if (statusElement) {

    statusElement.textContent =
      t("uploadingImage");

    statusElement.style.color =
      "black";

  }


  const formData =
    new FormData();


  formData.append(
    "file",
    compressedFile
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

    throw new Error(
      t("uploadFailed")
    );

  }


  const data =
    await response.json();


  if (!data.secure_url) {

    throw new Error(
      t("imageUrlFailed")
    );

  }


  if (statusElement) {

    statusElement.textContent =
      t("imageUploaded");

    statusElement.style.color =
      "green";

  }


  return data.secure_url;

}
/* =======================================================
   Publish Product — FAST VERSION
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


      /* -----------------------------------------------
         Disable button immediately
      ------------------------------------------------ */

      publishProductBtn.disabled =
        true;


      publishProductBtn.textContent =
        currentLanguage === "ar"
          ? "جاري النشر..."
          : "Publishing...";


      sellStatus.textContent =
        t("preparingProduct");

      sellStatus.style.color =
        "black";


      try {

        let imageUrl = "";


        /* ---------------------------------------------
           Upload image only if selected
        --------------------------------------------- */

        if (imageFile) {

          imageUrl =
            await uploadImageToCloudinary(
              imageFile,
              imageStatus
            );

        }


        /* ---------------------------------------------
           Save product to Firestore
        --------------------------------------------- */

        sellStatus.textContent =
          t("savingProduct");


        const productData = {

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
            currentUser.email ||
            "",

          createdAt:
            serverTimestamp()

        };


        const productRef =
          await addDoc(
            collection(
              db,
              "products"
            ),
            productData
          );


        /* ---------------------------------------------
           Immediately add to local products list
           so UI does not need full reload first
        --------------------------------------------- */

        products.unshift({

          id:
            productRef.id,

          ...productData,

          createdAt:
            {
              toMillis:
                () => Date.now()
            }

        });


        /* ---------------------------------------------
           Show product immediately
        --------------------------------------------- */

        displayProducts(
          products
        );


        /* ---------------------------------------------
           Success
        --------------------------------------------- */

        sellStatus.textContent =
          t("published");

        sellStatus.style.color =
          "green";


        if (imageStatus) {

          imageStatus.textContent =
            "";

        }


        sellProductForm.reset();


        /* ---------------------------------------------
           Scroll to listings
        --------------------------------------------- */

        document
          .getElementById(
            "listings"
          )
          ?.scrollIntoView({
            behavior:
              "smooth"
          });


        /* ---------------------------------------------
           Refresh profile in background
        --------------------------------------------- */

        if (auth.currentUser) {

          renderMyProfile();

        }


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
   MESSENGER — FAST MESSAGE SEND
======================================================= */

if (chatForm) {

  chatForm.addEventListener(
    "submit",
    async event => {

      event.preventDefault();

      const user =
        auth.currentUser;

      if (!user) {
        alert(t("loginToMessage"));
        return;
      }

      const text =
        chatInput?.value?.trim() || "";

      if (!text) {
        return;
      }

      if (!selectedConversationId) {
        return;
      }

      if (!selectedChatUser?.uid) {
        return;
      }

      /* Prevent duplicate clicks */
      const sendButton =
        chatForm.querySelector(
          'button[type="submit"]'
        );

      if (sendButton) {
        sendButton.disabled = true;
      }

      try {

        /*
         * IMPORTANT:
         * Save the message FIRST.
         * Do not reload all conversations here.
         */

        const messageData = {

          senderId:
            user.uid,

          receiverId:
            selectedChatUser.uid,

          text:
            text,

          createdAt:
            serverTimestamp(),

          seen:
            false

        };


        const messagesRef =
          collection(
            db,
            "conversations",
            selectedConversationId,
            "messages"
          );


        await addDoc(
          messagesRef,
          messageData
        );


        /*
         * Clear input immediately after
         * successful Firestore write.
         */

        if (chatInput) {
          chatInput.value = "";
          chatInput.focus();
        }


        /*
         * DO NOT call:
         *
         * await loadConversations();
         *
         * here.
         *
         * The conversation list will be updated
         * separately by its realtime listener.
         */


      } catch (error) {

        console.error(
          "Message send error:",
          error
        );

        alert(
          error.message ||
          "Message could not be sent."
        );

      } finally {

        if (sendButton) {
          sendButton.disabled = false;
        }

      }

    }
  );

}
/* =======================================================
   PART 13 — FAST CONVERSATION UPDATE
======================================================= */

async function sendMessageFast(text) {

  const user = auth.currentUser;

  if (!user) {
    throw new Error(t("loginFirst"));
  }

  if (!selectedChatUser?.uid) {
    throw new Error("No chat selected.");
  }

  const cleanText = text.trim();

  if (!cleanText) {
    return;
  }

  const conversationId =
    selectedConversationId ||
    await ensureConversation(
      selectedChatUser.uid
    );

  selectedConversationId =
    conversationId;


  /* -----------------------------------------------
     1. Save message first
  ------------------------------------------------ */

  const messagesRef = collection(
    db,
    "conversations",
    conversationId,
    "messages"
  );

  await addDoc(
    messagesRef,
    {
      senderId:
        user.uid,

      receiverId:
        selectedChatUser.uid,

      text:
        cleanText,

      seen:
        false,

      createdAt:
        serverTimestamp()
    }
  );


  /* -----------------------------------------------
     2. Update conversation preview
  ------------------------------------------------ */

  const conversationRef = doc(
    db,
    "conversations",
    conversationId
  );

  await setDoc(
    conversationRef,
    {
      participants: [
        user.uid,
        selectedChatUser.uid
      ],

      lastMessage:
        cleanText,

      lastMessageSenderId:
        user.uid,

      updatedAt:
        serverTimestamp()
    },
    {
      merge: true
    }
  );


  /* -----------------------------------------------
     3. Clear input immediately
  ------------------------------------------------ */

  if (chatInput) {

    chatInput.value = "";

    chatInput.focus();

  }

}


/* =======================================================
   PART 13 — CHAT FORM
======================================================= */

if (chatForm) {

    async event => {

      event.preventDefault();

      const text =
        chatInput?.value?.trim() || "";

      if (!text) {
        return;
      }


      const sendButton =
        chatForm.querySelector(
          'button[type="submit"]'
        );


      if (sendButton) {
        sendButton.disabled = true;
      }


      try {

        await sendMessageFast(
          text
        );


      } catch (error) {

        console.error(
          "Fast message error:",
          error
        );

        alert(
          error.message ||
          "Message could not be sent."
        );


      } finally {

        if (sendButton) {
          sendButton.disabled = false;
        }

      }

    }
  );

}
/* =======================================================
   MESSENGER — REALTIME MESSAGE LISTENER
======================================================= */

function listenToMessages(conversationId) {

  /* পুরোনো listener বন্ধ */
  if (unsubscribeMessages) {
    unsubscribeMessages();
    unsubscribeMessages = null;
  }

  if (!conversationId || !chatMessages) {
    return;
  }

  const messagesRef = collection(
    db,
    "conversations",
    conversationId,
    "messages"
  );

  const messagesQuery = query(
    messagesRef
  );

  unsubscribeMessages =
    onSnapshot(
      messagesQuery,
      snapshot => {

        const currentUser =
          auth.currentUser;

        if (!currentUser) {
          return;
        }

        const messageList = [];

        snapshot.forEach(
          messageDoc => {

            const data =
              messageDoc.data();

            messageList.push({

              id:
                messageDoc.id,

              ...data

            });

          }
        );


        /* Oldest → newest */

        messageList.sort(
          (a, b) => {

            const aTime =
              a.createdAt?.toMillis?.() ||
              0;

            const bTime =
              b.createdAt?.toMillis?.() ||
              0;

            return aTime - bTime;

          }
        );


        chatMessages.innerHTML = "";


        if (!messageList.length) {

          chatMessages.innerHTML = `

            <div class="empty-state">

              <div>💬</div>

              <p>
                ${escapeHTML(
                  t("noMessages")
                )}
              </p>

            </div>

          `;

          return;

        }


        messageList.forEach(
          message => {

            const isMine =
              message.senderId ===
              currentUser.uid;


            const messageElement =
              document.createElement(
                "div"
              );


            messageElement.className =
              isMine
                ? "chat-message sent"
                : "chat-message received";


            messageElement.innerHTML = `

              <div class="chat-bubble">

                ${escapeHTML(
                  message.text || ""
                )}

              </div>

            `;


            chatMessages.appendChild(
              messageElement
            );

          }
        );


        /* Always show latest message */

        requestAnimationFrame(
          () => {

            chatMessages.scrollTop =
              chatMessages.scrollHeight;

          }
        );

      },

      error => {

        console.error(
          "Realtime message listener error:",
          error
        );

      }
    );

}


/* =======================================================
   START CONVERSATION
======================================================= */

async function startConversation(
  sellerId
) {

  const currentUser =
    auth.currentUser;


  if (!currentUser) {

    alert(
      t("loginToMessage")
    );

    return;

  }


  if (
    currentUser.uid ===
    sellerId
  ) {

    alert(
      t("cannotMessageSelf")
    );

    return;

  }


  /*
   * Always create the same conversation ID
   * for the same two users.
   */

  const conversationId =
    [
      currentUser.uid,
      sellerId
    ]
      .sort()
      .join("_");


  selectedConversationId =
    conversationId;


  selectedChatUser = {

    uid:
      sellerId

  };


  /*
   * Open Messenger immediately.
   */

  const messengerSection =
    document.getElementById(
      "messenger"
    );


  if (messengerSection) {

    messengerSection.scrollIntoView({
      behavior:
        "smooth"
    });

  }


  /*
   * Start realtime listener immediately.
   */

  listenToMessages(
    conversationId
  );


  /*
   * Load seller profile in background.
   */

  try {

    const sellerProfile =
      await getUserProfile(
        sellerId
      );


    selectedChatUser = {

      uid:
        sellerId,

      name:
        sellerProfile?.name ||
        sellerProfile?.email ||
        t("member"),

      email:
        sellerProfile?.email ||
        "",

      photoURL:
        sellerProfile?.photoURL ||
        getDefaultAvatar()

    };


    if (chatHeader) {

      chatHeader.innerHTML = `

        <div class="chat-user-header">

          <img
            src="${escapeHTML(
              selectedChatUser.photoURL
            )}"
            alt="${escapeHTML(
              selectedChatUser.name
            )}"
          >

          <div>

            <strong>
              ${escapeHTML(
                selectedChatUser.name
              )}
            </strong>

            <small>
              ${escapeHTML(
                selectedChatUser.email
              )}
            </small>

          </div>

        </div>

      `;

    }

  } catch (error) {

    console.error(
      "Could not load chat user:",
      error
    );

  }

}
/* =======================================================
   MESSENGER — CONVERSATION LIST
======================================================= */

let unsubscribeConversations = null;


function getConversationId(
  uid1,
  uid2
) {

  return [
    uid1,
    uid2
  ]
    .sort()
    .join("_");

}


/* =======================================================
   Load Conversations Realtime
======================================================= */

function listenToConversations() {

  if (unsubscribeConversations) {

    unsubscribeConversations();

    unsubscribeConversations = null;

  }


  const user =
    auth.currentUser;


  if (!user || !conversationList) {
    return;
  }


  /*
   * We listen only to conversations where
   * the current user's UID exists.
   */

  const conversationsRef =
    collection(
      db,
      "conversations"
    );


  const conversationsQuery =
    query(
      conversationsRef,
      where(
        "participants",
        "array-contains",
        user.uid
      )
    );


  unsubscribeConversations =
    onSnapshot(
      conversationsQuery,
      async snapshot => {

        const conversations = [];


        snapshot.forEach(
          conversationDoc => {

            conversations.push({

              id:
                conversationDoc.id,

              ...conversationDoc.data()

            });

          }
        );


        conversations.sort(
          (a, b) => {

            const aTime =
              a.updatedAt?.toMillis?.() ||
              a.createdAt?.toMillis?.() ||
              0;

            const bTime =
              b.updatedAt?.toMillis?.() ||
              b.createdAt?.toMillis?.() ||
              0;

            return bTime - aTime;

          }
        );


        if (
          !conversations.length
        ) {

          conversationList.innerHTML = `

            <div class="empty-state">

              <div>💬</div>

              <p>
                ${escapeHTML(
                  t("noConversations")
                )}
              </p>

            </div>

          `;

          return;

        }


        conversationList.innerHTML = "";


        for (
          const conversation
          of conversations
        ) {

          const otherUserId =
            conversation.participants
              ?.find(
                uid =>
                  uid !== user.uid
              );


          if (!otherUserId) {
            continue;
          }


          let otherUser = null;


          try {

            otherUser =
              await getUserProfile(
                otherUserId
              );

          } catch (error) {

            console.error(
              "Profile load error:",
              error
            );

          }


          const name =
            otherUser?.name ||
            otherUser?.email ||
            t("member");


          const photo =
            otherUser?.photoURL ||
            getDefaultAvatar();


          const lastMessage =
            conversation.lastMessage ||
            "";


          const item =
            document.createElement(
              "div"
            );


          item.className =
            "conversation-item";


          item.dataset.uid =
            otherUserId;


          item.innerHTML = `

            <img
              class="conversation-avatar"
              src="${escapeHTML(photo)}"
              alt="${escapeHTML(name)}"
            >

            <div class="conversation-info">

              <strong>
                ${escapeHTML(name)}
              </strong>

              <span>
                ${escapeHTML(
                  lastMessage
                )}
              </span>

            </div>

          `;


          item.addEventListener(
            "click",
            () => {

              selectedChatUser = {

                uid:
                  otherUserId,

                name:
                  name,

                email:
                  otherUser?.email ||
                  "",

                photoURL:
                  photo

              };


              selectedConversationId =
                conversation.id;


              listenToMessages(
                conversation.id
              );


              if (chatHeader) {

                chatHeader.innerHTML = `

                  <div class="chat-user-header">

                    <img
                      src="${escapeHTML(
                        photo
                      )}"
                      alt="${escapeHTML(
                        name
                      )}"
                    >

                    <div>

                      <strong>
                        ${escapeHTML(
                          name
                        )}
                      </strong>

                      <small>
                        ${escapeHTML(
                          otherUser?.email ||
                          ""
                        )}
                      </small>

                    </div>

                  </div>

                `;

              }

            }
          );


          conversationList.appendChild(
            item
          );

        }

      },

      error => {

        console.error(
          "Conversation listener error:",
          error
        );

      }
    );

}


/* =======================================================
   Create / Update Conversation
======================================================= */

async function ensureConversation(
  otherUserId
) {

  const user =
    auth.currentUser;


  if (!user) {
    throw new Error(
      t("loginFirst")
    );
  }


  if (
    !otherUserId ||
    otherUserId === user.uid
  ) {

    throw new Error(
      t("cannotMessageSelf")
    );

  }


  const conversationId =
    getConversationId(
      user.uid,
      otherUserId
    );


  const conversationRef =
    doc(
      db,
      "conversations",
      conversationId
    );


  const existing =
    await getDoc(
      conversationRef
    );


  if (!existing.exists()) {

    await setDoc(
      conversationRef,
      {

        participants: [
          user.uid,
          otherUserId
        ],

        lastMessage:
          "",

        createdAt:
          serverTimestamp(),

        updatedAt:
          serverTimestamp()

      }
    );

  }


  return conversationId;

}


/* =======================================================
   Auth State → Start Messenger Listener
======================================================= */

onAuthStateChanged(
  auth,
  user => {

    if (user) {

      /*
       * Start realtime conversation listener.
       */

      listenToConversations();

    } else {

      if (
        unsubscribeConversations
      ) {

        unsubscribeConversations();

        unsubscribeConversations =
          null;

      }


      if (
        unsubscribeMessages
      ) {

        unsubscribeMessages();

        unsubscribeMessages =
          null;

      }


      selectedConversationId =
        null;

      selectedChatUser =
        null;


      if (conversationList) {

        conversationList.innerHTML = "";

      }


      if (chatMessages) {

        chatMessages.innerHTML = "";

      }

    }

  );
  

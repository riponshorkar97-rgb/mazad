/* =========================================================
   MAZAD — Main JavaScript
   Firebase Authentication + Firestore
   Cloudinary Image Upload
   English + Arabic
   Profile + Products + Messenger
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
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


/* =========================================================
   FIREBASE CONFIGURATION
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
   INITIALIZE FIREBASE
   ========================================================= */

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


/* =========================================================
   CLOUDINARY
   Firebase Storage is NOT used.
   ========================================================= */

const CLOUDINARY_CLOUD_NAME = "bhpccaio";
const CLOUDINARY_UPLOAD_PRESET = "mazad_upload";

const CLOUDINARY_UPLOAD_URL =
  `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;


/* =========================================================
   GLOBAL VARIABLES
   ========================================================= */

let products = [];
let currentProfile = null;

let selectedConversationId = null;
let selectedChatUser = null;

let unsubscribeMessages = null;

let currentLanguage =
  localStorage.getItem("mazadLanguage") || "en";


/* =========================================================
   TRANSLATIONS
   ========================================================= */

const translations = {

  en: {

    member: "Member",
    unknown: "Unknown",
    loading: "Loading...",
    others: "Others",
    noDescription: "No description available.",
    product: "Product",
    sellerUnavailable: "Seller unavailable",

    login: "Login",
    register: "Register",
    createAccount: "Create Account",
    logout: "Logout",

    loggedInAs: "Logged in as",

    email: "Email",
    password: "Password",
    name: "Name",
    phone: "Phone",
    location: "Location",

    emailAlreadyRegistered:
      "This email is already registered.",

    invalidEmail:
      "Please enter a valid email address.",

    weakPassword:
      "Password must be at least 6 characters.",

    invalidCredential:
      "Email or password is incorrect.",

    userNotFound:
      "No account found with this email.",

    wrongPassword:
      "Incorrect password.",

    tooManyRequests:
      "Too many attempts. Please try again later.",

    somethingWentWrong:
      "Something went wrong. Please try again.",

    loginFirst:
      "Please login first.",

    loginToMessage:
      "Please login to send a message.",

    cannotMessageSelf:
      "You cannot message yourself.",

    loggedOut:
      "You have been logged out.",

    profileRequired:
      "Please login to view your profile.",

    profileNotFound:
      "Profile not found.",

    editProfile:
      "Edit Profile",

    editProfileLogin:
      "Please login to edit your profile.",

    saveProfile:
      "Save Profile",

    profileSaved:
      "Profile saved successfully.",

    bio:
      "Bio",

    joinDate:
      "Joined",

    myListings:
      "My Listings",

    noListings:
      "No listings yet.",

    publish:
      "Publish",

    publishProduct:
      "Publish Product",

    published:
      "Product published successfully.",

    publishFailed:
      "Failed to publish product.",

    enterProductTitle:
      "Please enter a product title.",

    enterPrice:
      "Please enter a price.",

    invalidPrice:
      "Please enter a valid price.",

    selectCategory:
      "Please select a category.",

    enterLocation:
      "Please enter a location.",

    selectImage:
      "Please select a product image.",

    noProducts:
      "No products found.",

    deleteProduct:
      "Delete Product",

    deleteConfirm:
      "Are you sure you want to delete this product?",

    deleted:
      "Product deleted successfully.",

    deleteFailed:
      "Failed to delete product.",

    productNotFound:
      "Product not found.",

    ownProduct:
      "You can only delete your own product.",

    viewProfile:
      "View Profile",

    message:
      "Message",

    call:
      "Call",

    imageTooLarge:
      "Image must be 10 MB or smaller.",

    validImage:
      "Please select a valid image file.",

    uploadingImage:
      "Uploading image...",

    imageUploaded:
      "Image uploaded successfully.",

    uploadFailed:
      "Image upload failed.",

    imageUrlFailed:
      "Could not get image URL.",

    noMessages:
      "No messages yet.",

    noConversations:
      "No conversations yet.",

    firestoreError:
      "Something went wrong with Firestore.",

    send:
      "Send",

    search:
      "Search",

    allCategories:
      "All Categories"
  },


  ar: {

    member: "عضو",
    unknown: "غير معروف",
    loading: "جار التحميل...",
    others: "أخرى",
    noDescription: "لا يوجد وصف متاح.",
    product: "منتج",
    sellerUnavailable: "البائع غير متاح",

    login: "تسجيل الدخول",
    register: "إنشاء حساب",
    createAccount: "إنشاء حساب",
    logout: "تسجيل الخروج",

    loggedInAs: "تم تسجيل الدخول باسم",

    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    name: "الاسم",
    phone: "الهاتف",
    location: "الموقع",

    emailAlreadyRegistered:
      "هذا البريد الإلكتروني مسجل بالفعل.",

    invalidEmail:
      "يرجى إدخال بريد إلكتروني صالح.",

    weakPassword:
      "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.",

    invalidCredential:
      "البريد الإلكتروني أو كلمة المرور غير صحيحة.",

    userNotFound:
      "لا يوجد حساب بهذا البريد الإلكتروني.",

    wrongPassword:
      "كلمة المرور غير صحيحة.",

    tooManyRequests:
      "محاولات كثيرة جداً. يرجى المحاولة لاحقاً.",

    somethingWentWrong:
      "حدث خطأ ما. يرجى المحاولة مرة أخرى.",

    loginFirst:
      "يرجى تسجيل الدخول أولاً.",

    loginToMessage:
      "يرجى تسجيل الدخول لإرسال رسالة.",

    cannotMessageSelf:
      "لا يمكنك مراسلة نفسك.",

    loggedOut:
      "تم تسجيل خروجك.",

    profileRequired:
      "يرجى تسجيل الدخول لعرض ملفك الشخصي.",

    profileNotFound:
      "لم يتم العثور على الملف الشخصي.",

    editProfile:
      "تعديل الملف الشخصي",

    editProfileLogin:
      "يرجى تسجيل الدخول لتعديل ملفك الشخصي.",

    saveProfile:
      "حفظ الملف الشخصي",

    profileSaved:
      "تم حفظ الملف الشخصي بنجاح.",

    bio:
      "نبذة",

    joinDate:
      "تاريخ الانضمام",

    myListings:
      "إعلاناتي",

    noListings:
      "لا توجد إعلانات حتى الآن.",

    publish:
      "نشر",

    publishProduct:
      "نشر المنتج",

    published:
      "تم نشر المنتج بنجاح.",

    publishFailed:
      "فشل نشر المنتج.",

    enterProductTitle:
      "يرجى إدخال اسم المنتج.",

    enterPrice:
      "يرجى إدخال السعر.",

    invalidPrice:
      "يرجى إدخال سعر صالح.",

    selectCategory:
      "يرجى اختيار الفئة.",

    enterLocation:
      "يرجى إدخال الموقع.",

    selectImage:
      "يرجى اختيار صورة المنتج.",

    noProducts:
      "لم يتم العثور على منتجات.",

    deleteProduct:
      "حذف المنتج",

    deleteConfirm:
      "هل أنت متأكد أنك تريد حذف هذا المنتج؟",

    deleted:
      "تم حذف المنتج بنجاح.",

    deleteFailed:
      "فشل حذف المنتج.",

    productNotFound:
      "لم يتم العثور على المنتج.",

    ownProduct:
      "يمكنك حذف منتجاتك فقط.",

    viewProfile:
      "عرض الملف الشخصي",

    message:
      "رسالة",

    call:
      "اتصال",

    imageTooLarge:
      "يجب ألا يتجاوز حجم الصورة 10 ميجابايت.",

    validImage:
      "يرجى اختيار ملف صورة صالح.",

    uploadingImage:
      "جار رفع الصورة...",

    imageUploaded:
      "تم رفع الصورة بنجاح.",

    uploadFailed:
      "فشل رفع الصورة.",

    imageUrlFailed:
      "تعذر الحصول على رابط الصورة.",

    noMessages:
      "لا توجد رسائل حتى الآن.",

    noConversations:
      "لا توجد محادثات حتى الآن.",

    firestoreError:
      "حدث خطأ في Firestore.",

    send:
      "إرسال",

    search:
      "بحث",

    allCategories:
      "جميع الفئات"
  }
};


/* =========================================================
   TRANSLATION HELPER
   ========================================================= */

function t(key) {

  return (
    translations[currentLanguage]?.[key] ||
    translations.en?.[key] ||
    key
  );

}


/* =========================================================
   APPLY LANGUAGE
   ========================================================= */

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
        element.getAttribute("data-i18n");

      if (key) {
        element.textContent = t(key);
      }

    });


  document
    .querySelectorAll("[data-i18n-placeholder]")
    .forEach(element => {

      const key =
        element.getAttribute(
          "data-i18n-placeholder"
        );

      if (key) {
        element.placeholder = t(key);
      }

    });


  document
    .querySelectorAll("[data-i18n-title]")
    .forEach(element => {

      const key =
        element.getAttribute(
          "data-i18n-title"
        );

      if (key) {
        element.title = t(key);
      }

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

}


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const languageBtn =
  document.getElementById("languageBtn");

const searchInput =
  document.getElementById("searchInput");

const categorySelect =
  document.getElementById("categorySelect");

const searchBtn =
  document.getElementById("searchBtn");

const productsContainer =
  document.getElementById(
    "productsContainer"
  );

const loginForm =
  document.getElementById("loginForm");

const registerForm =
  document.getElementById("registerForm");

const showRegisterBtn =
  document.getElementById(
    "showRegisterBtn"
  );

const showLoginBtn =
  document.getElementById(
    "showLoginBtn"
  );

const authTitle =
  document.getElementById("authTitle");

const authMessage =
  document.getElementById(
    "authMessage"
  );

const authStatus =
  document.getElementById("authStatus");

const sellProductForm =
  document.getElementById(
    "sellProductForm"
  );

const sellStatus =
  document.getElementById("sellStatus");

const imageStatus =
  document.getElementById("imageStatus");

const publishProductBtn =
  document.getElementById(
    "publishProductBtn"
  );

const productImageFile =
  document.getElementById(
    "productImageFile"
  );

const profileContent =
  document.getElementById(
    "profileContent"
  );


const productModal =
  document.getElementById(
    "productModal"
  );

const productModalOverlay =
  document.querySelector(
    ".product-modal-overlay"
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


const profileModal =
  document.getElementById(
    "profileModal"
  );

const profileModalOverlay =
  document.querySelector(
    "#profileModal .profile-modal-overlay"
  );

const closeProfileModalBtn =
  document.getElementById(
    "closeProfileModal"
  );

const profileModalContent =
  document.getElementById(
    "profileModalContent"
  );


const editProfileModal =
  document.getElementById(
    "editProfileModal"
  );

const editProfileModalOverlay =
  document.querySelector(
    "#editProfileModal .profile-modal-overlay"
  );

const closeEditProfileModal =
  document.getElementById(
    "closeEditProfileModal"
  );

const editProfileForm =
  document.getElementById(
    "editProfileForm"
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

const profileNameInput =
  document.getElementById(
    "profileNameInput"
  );

const profilePhoneInput =
  document.getElementById(
    "profilePhoneInput"
  );

const profileLocationInput =
  document.getElementById(
    "profileLocationInput"
  );

const profileBioInput =
  document.getElementById(
    "profileBioInput"
  );

const saveProfileBtn =
  document.getElementById(
    "saveProfileBtn"
  );


const conversationList =
  document.getElementById(
    "conversationList"
  );

const chatHeader =
  document.getElementById(
    "chatHeader"
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


/* =========================================================
   HELPERS
   ========================================================= */

function escapeHTML(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


function formatPrice(price) {

  const number = Number(price);

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


function getDefaultAvatar() {

  return "https://via.placeholder.com/200x200?text=User";

}


function formatDate(value) {

  if (!value) {
    return t("unknown");
  }

  let date;

  try {

    if (
      value &&
      typeof value.toDate === "function"
    ) {

      date = value.toDate();

    } else if (
      value instanceof Date
    ) {

      date = value;

    } else {

      date = new Date(value);

    }

  } catch {

    return t("unknown");

  }

  if (
    !date ||
    Number.isNaN(date.getTime())
  ) {

    return t("unknown");

  }

  return date.toLocaleDateString(
    currentLanguage === "ar"
      ? "ar-SA"
      : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric"
    }
  );

}


/* =========================================================
   LANGUAGE SWITCH
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

  displayProducts(products);

  if (auth.currentUser) {

    renderMyProfile();
    loadConversations();

  }

}


if (languageBtn) {

  languageBtn.addEventListener(
    "click",
    switchLanguage
  );

}


/* =========================================================
   AUTH MESSAGE
   ========================================================= */

function showAuthMessage(
  message,
  success = false
) {

  if (!authStatus) {
    return;
  }

  authStatus.textContent =
    message || "";

  authStatus.style.color =
    success
      ? "green"
      : "red";

}


/* =========================================================
   FIREBASE AUTH ERROR
   ========================================================= */

function getFirebaseErrorMessage(error) {

  if (!error) {
    return t("somethingWentWrong");
  }

  switch (error.code) {

    case "auth/email-already-in-use":
      return t("emailAlreadyRegistered");

    case "auth/invalid-email":
      return t("invalidEmail");

    case "auth/weak-password":
      return t("weakPassword");

    case "auth/invalid-credential":
      return t("invalidCredential");

    case "auth/user-not-found":
      return t("userNotFound");

    case "auth/wrong-password":
      return t("wrongPassword");

    case "auth/too-many-requests":
      return t("tooManyRequests");

    case "auth/network-request-failed":
      return currentLanguage === "ar"
        ? "تحقق من اتصال الإنترنت وحاول مرة أخرى."
        : "Please check your internet connection and try again.";

    case "auth/operation-not-allowed":
      return currentLanguage === "ar"
        ? "طريقة تسجيل الدخول هذه غير مفعلة في Firebase."
        : "This sign-in method is not enabled in Firebase.";

    default:

      console.error(
        "Firebase Auth Error:",
        error
      );

      return t("somethingWentWrong");

  }

}


/* =========================================================
   USER PROFILE
   ========================================================= */

async function getUserProfile(uid) {

  if (!uid) {
    return null;
  }

  try {

    const profileDoc =
      await getDoc(
        doc(db, "users", uid)
      );

    if (profileDoc.exists()) {

      return {
        id: uid,
        ...profileDoc.data()
      };

    }

    return null;

  } catch (error) {

    console.error(
      "Profile loading error:",
      error
    );

    return null;

  }

}


async function createUserProfile(user) {

  if (!user?.uid) {
    return;
  }

  try {

    const profileRef =
      doc(db, "users", user.uid);

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
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }
    );

  } catch (error) {

    console.error(
      "Create profile error:",
      error
    );

  }

}


/* =========================================================
   PROFILE TEMPLATE
   ========================================================= */

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
    formatDate(profile?.createdAt);

  const profileUid =
    profile?.uid ||
    user?.uid ||
    "";

  const userProducts =
    products.filter(
      product =>
        product.sellerId === profileUid
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
            onerror="
              this.onerror=null;
              this.src='${escapeHTML(
                getDefaultAvatar()
              )}';
            "
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

                  ${
                    userProducts
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
                                t("product")
                              )}"
                              loading="lazy"
                            >

                            <div class="mini-product-info">

                              <strong>
                                ${escapeHTML(
                                  product.title ||
                                  t("product")
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
                      .join("")
                  }

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


/* =========================================================
   RENDER MY PROFILE
   ========================================================= */

async function renderMyProfile() {

  if (!profileContent) {
    return;
  }

  const user =
    auth.currentUser;

  if (!user) {

    profileContent.innerHTML = `
      <div class="not-logged-profile">
        <div class="hero-icon">👤</div>

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
    .forEach(card => {

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

    });

}


/* =========================================================
   PUBLIC PROFILE
   ========================================================= */

async function openPublicProfile(uid) {

  if (
    !profileModalContent ||
    !profileModal ||
    !uid
  ) {

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


  const userProducts =
    products.filter(
      product =>
        product.sellerId === uid
    );


  const displayName =
    profile.name?.trim() ||
    profile.email ||
    t("member");


  const profilePhoto =
    profile.photoURL ||
    getDefaultAvatar();


  profileModalContent.innerHTML = `

    <div class="profile-public">

      <div class="profile-public-cover"></div>

      <div class="profile-public-body">

        <div class="profile-public-top">

          <img
            class="public-avatar"
            src="${escapeHTML(
              profilePhoto
            )}"
            alt="${escapeHTML(
              displayName
            )}"
            onerror="
              this.onerror=null;
              this.src='${escapeHTML(
                getDefaultAvatar()
              )}';
            "
          >

          <div class="public-heading">

            <h2>
              ${escapeHTML(
                displayName
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


        <div class="public-actions">

          ${
            profile.phone
              ? `
                <a
                  class="secondary-btn"
                  href="tel:${encodeURIComponent(
                    profile.phone
                  )}"
                >
                  📞 ${escapeHTML(
                    t("call")
                  )}
                </a>
              `
              : ""
          }


          <button
            type="button"
            class="primary-btn"
            id="publicMessageBtn"
          >
            💬 ${escapeHTML(
              t("message")
            )}
          </button>

        </div>


        <div class="profile-listings">

          <h3>
            ${escapeHTML(
              t("myListings")
            )}
            (${userProducts.length})
          </h3>


          ${
            userProducts.length

              ? `
                <div class="mini-products">

                  ${
                    userProducts
                      .map(
                        product => `
                          <div
                            class="mini-product"
                            data-public-product-id="${escapeHTML(
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
                                t("product")
                              )}"
                              loading="lazy"
                            >

                            <div class="mini-product-info">

                              <strong>
                                ${escapeHTML(
                                  product.title ||
                                  t("product")
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
                      .join("")
                  }

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


  const messageBtn =
    document.getElementById(
      "publicMessageBtn"
    );


  if (messageBtn) {

    messageBtn.addEventListener(
      "click",
      () => {

        const currentUser =
          auth.currentUser;

        if (
          currentUser &&
          currentUser.uid === uid
        ) {

          alert(
            t("cannotMessageSelf")
          );

          return;

        }

        closeProfileModal();

        startConversation(uid);

      }
    );

  }


  profileModalContent
    .querySelectorAll(
      "[data-public-product-id]"
    )
    .forEach(card => {

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

    });

}


/* =========================================================
   CLOSE PROFILE MODAL
   ========================================================= */

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


if (closeProfileModalBtn) {

  closeProfileModalBtn.addEventListener(
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


/* =========================================================
   EDIT PROFILE
   ========================================================= */

function openEditProfile() {

  const user =
    auth.currentUser;

  if (!user) {

    alert(
      t("editProfileLogin")
    );

    return;

  }

  if (!editProfileModal) {
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


/* =========================================================
   CLOUDINARY UPLOAD
   ========================================================= */

async function uploadImageToCloudinary(
  file,
  statusElement
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
    !file.type ||
    !file.type.startsWith("image/")
  ) {

    throw new Error(
      t("validImage")
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
    file
  );

  formData.append(
    "upload_preset",
    CLOUDINARY_UPLOAD_PRESET
  );


  try {

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


    if (
      !data ||
      !data.secure_url
    ) {

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

  } catch (error) {

    if (statusElement) {

      statusElement.textContent =
        error.message ||
        t("uploadFailed");

      statusElement.style.color =
        "red";

    }

    throw error;

  }

}


/* =========================================================
   PROFILE IMAGE VALIDATION
   ========================================================= */

if (profilePhotoFile) {

  profilePhotoFile.addEventListener(
    "change",
    () => {

      const file =
        profilePhotoFile.files?.[0];

      if (!file) {

        if (profileImageStatus) {
          profileImageStatus.textContent =
            "";
        }

        return;

      }


      if (
        file.size >
        10 * 1024 * 1024
      ) {

        profileImageStatus.textContent =
          t("imageTooLarge");

        profileImageStatus.style.color =
          "red";

        profilePhotoFile.value =
          "";

        return;

      }


      if (
        !file.type ||
        !file.type.startsWith("image/")
      ) {

        profileImageStatus.textContent =
          t("validImage");

        profileImageStatus.style.color =
          "red";

        profilePhotoFile.value =
          "";

        return;

      }


      profileImageStatus.textContent =
        file.name;

      profileImageStatus.style.color =
        "green";

    }
  );

}


/* =========================================================
   SAVE PROFILE
   ========================================================= */

if (editProfileForm) {

  editProfileForm.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      const user =
        auth.currentUser;


      if (!user) {

        if (profileSaveStatus) {

          profileSaveStatus.textContent =
            t("editProfileLogin");

          profileSaveStatus.style.color =
            "red";

        }

        return;

      }


      if (saveProfileBtn) {

        saveProfileBtn.disabled =
          true;

        saveProfileBtn.textContent =
          currentLanguage === "ar"
            ? "جاري الحفظ..."
            : "Saving...";

      }


      try {

        let photoURL =
          currentProfile?.photoURL ||
          "";


        const file =
          profilePhotoFile
            ?.files?.[0] ||
          null;


        if (file) {

          photoURL =
            await uploadImageToCloudinary(
              file,
              profileImageStatus
            );

        }


        const profileRef =
          doc(
            db,
            "users",
            user.uid
          );


        const existing =
          await getDoc(
            profileRef
          );


        const oldData =
          existing.exists()
            ? existing.data()
            : {};


        await setDoc(
          profileRef,
          {
            uid: user.uid,

            name:
              profileNameInput
                ?.value
                .trim() ||
              "",

            phone:
              profilePhoneInput
                ?.value
                .trim() ||
              "",

            email:
              user.email ||
              "",

            location:
              profileLocationInput
                ?.value
                .trim() ||
              "",

            bio:
              profileBioInput
                ?.value
                .trim() ||
              "",

            photoURL,

            createdAt:
              oldData.createdAt ||
              serverTimestamp(),

            updatedAt:
              serverTimestamp()
          },
          {
            merge: true
          }
        );


        currentProfile =
          await getUserProfile(
            user.uid
          );


        if (profileSaveStatus) {

          profileSaveStatus.textContent =
            t("profileSaved");

          profileSaveStatus.style.color =
            "green";

        }


        if (profilePhotoFile) {

          profilePhotoFile.value =
            "";

        }


        await renderMyProfile();


        setTimeout(
          () => {
            closeEditProfile();
          },
          700
        );


      } catch (error) {

        console.error(
          "Profile save error:",
          error
        );


        if (profileSaveStatus) {

          profileSaveStatus.textContent =
            error.message ||
            t("somethingWentWrong");

          profileSaveStatus.style.color =
            "red";

        }

      } finally {

        if (saveProfileBtn) {

          saveProfileBtn.disabled =
            false;

          saveProfileBtn.textContent =
            t("saveProfile");

        }

      }

    }
  );

}


/* =========================================================
   PRODUCT IMAGE VALIDATION
   ========================================================= */

if (productImageFile) {

  productImageFile.addEventListener(
    "change",
    () => {

      const file =
        productImageFile.files?.[0];


      if (!file) {

        if (imageStatus) {
          imageStatus.textContent =
            "";
        }

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

        productImageFile.value =
          "";

        return;

      }


      if (
        !file.type ||
        !file.type.startsWith("image/")
      ) {

        imageStatus.textContent =
          t("validImage");

        imageStatus.style.color =
          "red";

        productImageFile.value =
          "";

        return;

      }


      imageStatus.textContent =
        file.name;

      imageStatus.style.color =
        "green";

    }
  );

}


/* =========================================================
   PRODUCT MODAL
   ========================================================= */

function closeProductDetails() {

  if (!productModal) {
    return;
  }

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


async function openProductDetails(
  product
) {

  if (
    !product ||
    !productModal
  ) {

    return;

  }


  const image =
    product.image ||
    "https://via.placeholder.com/800x500?text=Mazad+Product";


  if (modalProductImage) {

    modalProductImage.src =
      image;

    modalProductImage.alt =
      product.title ||
      t("product");

  }


  if (modalProductCategory) {

    modalProductCategory.textContent =
      product.category ||
      t("others");

  }


  if (modalProductTitle) {

    modalProductTitle.textContent =
      product.title ||
      t("product");

  }


  if (modalProductPrice) {

    modalProductPrice.textContent =
      `$${formatPrice(
        product.price
      )}`;

  }


  if (modalProductLocation) {

    modalProductLocation.textContent =
      product.location ||
      t("unknown");

  }


  if (modalProductDescription) {

    modalProductDescription.textContent =
      product.description ||
      t("noDescription");

  }


  let sellerProfile = null;


  if (product.sellerId) {

    sellerProfile =
      await getUserProfile(
        product.sellerId
      );

  }


  if (modalSellerPhoto) {

    modalSellerPhoto.src =
      sellerProfile?.photoURL ||
      getDefaultAvatar();

  }


  if (modalSellerName) {

    modalSellerName.textContent =
      sellerProfile?.name ||
      product.sellerEmail ||
      t("sellerUnavailable");

  }


  if (modalSellerEmail) {

    modalSellerEmail.textContent =
      sellerProfile?.email ||
      product.sellerEmail ||
      "";

  }


  if (sellerActions) {

    sellerActions.innerHTML =
      "";

  }


  const currentUser =
    auth.currentUser;


  if (sellerActions) {

    const viewProfileButton =
      document.createElement(
        "button"
      );

    viewProfileButton.type =
      "button";

    viewProfileButton.className =
      "profile-view-btn";

    viewProfileButton.textContent =
      t("viewProfile");


    viewProfileButton.addEventListener(
      "click",
      () => {

        closeProductDetails();

        if (product.sellerId) {

          openPublicProfile(
            product.sellerId
          );

        }

      }
    );


    sellerActions.appendChild(
      viewProfileButton
    );


    if (
      currentUser &&
      product.sellerId ===
        currentUser.uid
    ) {

      const deleteButton =
        document.createElement(
          "button"
        );

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

    } else {

      const messageButton =
        document.createElement(
          "button"
        );

      messageButton.type =
        "button";

      messageButton.className =
        "message-user-btn";

      messageButton.textContent =
        `💬 ${t("message")}`;


      messageButton.addEventListener(
        "click",
        () => {

          if (!auth.currentUser) {

            alert(
              t("loginToMessage")
            );

            return;

          }


          if (!product.sellerId) {

            alert(
              t("profileNotFound")
            );

            return;

          }


          closeProductDetails();

          startConversation(
            product.sellerId
          );

        }
      );


      sellerActions.appendChild(
        messageButton
      );


      if (sellerProfile?.phone) {

        const callLink =
          document.createElement(
            "a"
          );

        callLink.className =
          "contact-seller-btn";

        callLink.href =
          `tel:${encodeURIComponent(
            sellerProfile.phone
          )}`;

        callLink.textContent =
          `📞 ${t("call")}`;


        sellerActions.appendChild(
          callLink
        );

      }

    }

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


/* =========================================================
   DELETE PRODUCT
   ========================================================= */

async function deleteProduct(
  productId
) {

  const currentUser =
    auth.currentUser;


  if (!currentUser) {

    alert(
      t("loginFirst")
    );

    return;

  }


  const product =
    products.find(
      item =>
        item.id === productId
    );


  if (!product) {

    alert(
      t("productNotFound")
    );

    return;

  }


  if (
    product.sellerId !==
    currentUser.uid
  ) {

    alert(
      t("ownProduct")
    );

    return;

  }


  if (
    !confirm(
      t("deleteConfirm")
    )
  ) {

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

    alert(
      t("deleted")
    );


    await loadProducts();

    await renderMyProfile();

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


/* =========================================================
   PRODUCT CARD
   ========================================================= */

function productCardTemplate(
  product
) {

  const image =
    product.image ||
    "https://via.placeholder.com/500x300?text=Mazad";

  const title =
    product.title ||
    t("product");

  const category =
    product.category ||
    t("others");

  const location =
    product.location ||
    t("unknown");

  const price =
    formatPrice(product.price);


  return `

    <article
      class="product-card"
      data-product-id="${escapeHTML(
        product.id || ""
      )}"
    >

      <div class="product-image-wrap">

        <img
          class="product-image"
          src="${escapeHTML(image)}"
          alt="${escapeHTML(title)}"
          loading="lazy"
          onerror="
            this.onerror=null;
            this.src='https://via.placeholder.com/500x300?text=Mazad';
          "
        >

      </div>


      <div class="product-card-content">

        <span class="product-category">
          ${escapeHTML(category)}
        </span>

        <h3 class="product-title">
          ${escapeHTML(title)}
        </h3>

        <strong class="product-price">
          $${escapeHTML(price)}
        </strong>

        <div class="product-location">
          📍 ${escapeHTML(location)}
        </div>

      </div>

    </article>

  `;

}


/* =========================================================
   DISPLAY PRODUCTS
   ========================================================= */

function displayProducts(
  productList = []
) {

  if (!productsContainer) {
    return;
  }


  if (!Array.isArray(productList)) {

    productList = [];

  }


  if (productList.length === 0) {

    productsContainer.innerHTML = `

      <div class="empty-state">

        <div>📦</div>

        <p>
          ${escapeHTML(
            t("noProducts")
          )}
        </p>

      </div>

    `;

    return;

  }


  productsContainer.innerHTML =
    productList
      .map(productCardTemplate)
      .join("");


  productsContainer
    .querySelectorAll(
      "[data-product-id]"
    )
    .forEach(card => {

      card.addEventListener(
        "click",
        () => {

          const productId =
            card.dataset
              .productId;


          const product =
            products.find(
              item =>
                item.id ===
                productId
            );


          if (product) {

            openProductDetails(
              product
            );

          }

        }
      );

    });

}


/* =========================================================
   FILTER PRODUCTS
   ========================================================= */

function filterProducts() {

  const searchTerm =
    searchInput?.value
      ?.trim()
      .toLowerCase() ||
    "";


  const selectedCategory =
    categorySelect?.value
      ?.trim()
      .toLowerCase() ||
    "";


  const filteredProducts =
    products.filter(
      product => {

        const title =
          String(
            product.title || ""
          ).toLowerCase();


        const description =
          String(
            product.description || ""
          ).toLowerCase();


        const location =
          String(
            product.location || ""
          ).toLowerCase();


        const category =
          String(
            product.category || ""
          ).toLowerCase();


        const matchesSearch =
          !searchTerm ||
          title.includes(
            searchTerm
          ) ||
          description.includes(
            searchTerm
          ) ||
          location.includes(
            searchTerm
          ) ||
          category.includes(
            searchTerm
          );


        const matchesCategory =
          !selectedCategory ||
          selectedCategory === "all" ||
          category ===
            selectedCategory;


        return (
          matchesSearch &&
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
    filterProducts
  );

}


if (searchInput) {

  searchInput.addEventListener(
    "input",
    filterProducts
  );


  searchInput.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Enter"
      ) {

        event.preventDefault();

        filterProducts();

      }

    }
  );

}


if (categorySelect) {

  categorySelect.addEventListener(
    "change",
    filterProducts
  );

}


/* =========================================================
   LOAD PRODUCTS
   ========================================================= */

async function loadProducts() {

  if (!productsContainer) {
    return;
  }


  productsContainer.innerHTML = `

    <div class="empty-state">

      <div>⏳</div>

      <p>
        ${escapeHTML(
          t("loading")
        )}
      </p>

    </div>

  `;


  try {

    const productsRef =
      collection(
        db,
        "products"
      );


    const snapshot =
      await getDocs(
        productsRef
      );


    const loadedProducts = [];


    snapshot.forEach(
      productDoc => {

        loadedProducts.push({

          id:
            productDoc.id,

          ...productDoc.data()

        });

      }
    );


    loadedProducts.sort(
      (a, b) => {

        const aTime =
          a.createdAt?.toMillis
            ? a.createdAt.toMillis()
            : 0;


        const bTime =
          b.createdAt?.toMillis
            ? b.createdAt.toMillis()
            : 0;


        return bTime - aTime;

      }
    );


    products =
      loadedProducts;


    filterProducts();

  } catch (error) {

    console.error(
      "Product loading error:",
      error
    );


    products = [];


    productsContainer.innerHTML = `

      <div class="empty-state">

        <div>⚠️</div>

        <p>
          ${escapeHTML(
            t("firestoreError")
          )}
        </p>

      </div>

    `;

  }

}


/* =========================================================
   PUBLISH PRODUCT
   ========================================================= */

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
            t("loginFirst");

          sellStatus.style.color =
            "red";

        }

        return;

      }


      const titleInput =
        document.getElementById(
          "productTitle"
        );

      const priceInput =
        document.getElementById(
          "productPrice"
        );

      const categoryInput =
        document.getElementById(
          "productCategory"
        );

      const locationInput =
        document.getElementById(
          "productLocation"
        );

      const descriptionInput =
        document.getElementById(
          "productDescription"
        );


      const title =
        titleInput?.value.trim() ||
        "";

      const price =
        priceInput?.value.trim() ||
        "";

      const category =
        categoryInput?.value.trim() ||
        "";

      const location =
        locationInput?.value.trim() ||
        "";

      const description =
        descriptionInput?.value.trim() ||
        "";


      if (!title) {

        if (sellStatus) {

          sellStatus.textContent =
            t("enterProductTitle");

          sellStatus.style.color =
            "red";

        }

        titleInput?.focus();

        return;

      }


      if (!price) {

        if (sellStatus) {

          sellStatus.textContent =
            t("enterPrice");

          sellStatus.style.color =
            "red";

        }

        priceInput?.focus();

        return;

      }


      const numericPrice =
        Number(price);


      if (
        !Number.isFinite(
          numericPrice
        ) ||
        numericPrice < 0
      ) {

        if (sellStatus) {

          sellStatus.textContent =
            t("invalidPrice");

          sellStatus.style.color =
            "red";

        }

        priceInput?.focus();

        return;

      }


      if (!category) {

        if (sellStatus) {

          sellStatus.textContent =
            t("selectCategory");

          sellStatus.style.color =
            "red";

        }

        categoryInput?.focus();

        return;

      }


      if (!location) {

        if (sellStatus) {

          sellStatus.textContent =
            t("enterLocation");

          sellStatus.style.color =
            "red";

        }

        locationInput?.focus();

        return;

      }


      const imageFile =
        productImageFile
          ?.files?.[0] ||
        null;


      if (!imageFile) {

        if (sellStatus) {

          sellStatus.textContent =
            t("selectImage");

          sellStatus.style.color =
            "red";

        }

        productImageFile?.focus();

        return;

      }


      if (publishProductBtn) {

        publishProductBtn.disabled =
          true;

        publishProductBtn.textContent =
          currentLanguage === "ar"
            ? "جاري النشر..."
            : "Publishing...";

      }


      try {

        const imageURL =
          await uploadImageToCloudinary(
            imageFile,
            imageStatus
          );


        await addDoc(
          collection(
            db,
            "products"
          ),
          {
            title,

            price:
              numericPrice,

            category,

            location,

            description,

            image:
              imageURL,

            sellerId:
              currentUser.uid,

            sellerEmail:
              currentUser.email ||
              "",

            createdAt:
              serverTimestamp(),

            updatedAt:
              serverTimestamp()
          }
        );


        if (sellStatus) {

          sellStatus.textContent =
            t("published");

          sellStatus.style.color =
            "green";

        }


        sellProductForm.reset();


        if (imageStatus) {

          imageStatus.textContent =
            "";

        }


        await loadProducts();


        if (auth.currentUser) {

          await renderMyProfile();

        }

      } catch (error) {

        console.error(
          "Product publish error:",
          error
        );


        if (sellStatus) {

          sellStatus.textContent =
            error.message ||
            t("publishFailed");

          sellStatus.style.color =
            "red";

        }

      } finally {

        if (publishProductBtn) {

          publishProductBtn.disabled =
            false;

          publishProductBtn.textContent =
            t("publishProduct");

        }

      }

    }
  );

}


/* =========================================================
   SHOW REGISTER FORM
   ========================================================= */

if (showRegisterBtn) {

  showRegisterBtn.addEventListener(
    "click",
    event => {

      event.preventDefault();


      if (loginForm) {

        loginForm.style.display =
          "none";

      }


      if (registerForm) {

        registerForm.style.display =
          "block";

      }


      if (authTitle) {

        authTitle.textContent =
          t("createAccount");

      }


      if (authStatus) {

        authStatus.textContent =
          "";

      }


      if (authMessage) {

        authMessage.textContent =
          "";

      }

    }
  );

}


/* =========================================================
   SHOW LOGIN FORM
   ========================================================= */

if (showLoginBtn) {

  showLoginBtn.addEventListener(
    "click",
    event => {

      event.preventDefault();


      if (registerForm) {

        registerForm.style.display =
          "none";

      }


      if (loginForm) {

        loginForm.style.display =
          "block";

      }


      if (authTitle) {

        authTitle.textContent =
          t("login");

      }


      if (authStatus) {

        authStatus.textContent =
          "";

      }


      if (authMessage) {

        authMessage.textContent =
          "";

      }

    }
  );

}


/* =========================================================
   REGISTER USER
   ========================================================= */

if (registerForm) {

  registerForm.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      const emailInput =
        document.getElementById(
          "registerEmail"
        );

      const passwordInput =
        document.getElementById(
          "registerPassword"
        );

      const confirmPasswordInput =
        document.getElementById(
          "registerConfirmPassword"
        );


      const email =
        emailInput?.value
          .trim()
          .toLowerCase() ||
        "";

      const password =
        passwordInput?.value ||
        "";

      const confirmPassword =
        confirmPasswordInput?.value ||
        "";


      if (!email) {

        showAuthMessage(
          currentLanguage === "ar"
            ? "يرجى إدخال البريد الإلكتروني."
            : "Please enter your email."
        );

        emailInput?.focus();

        return;

      }


      if (!password) {

        showAuthMessage(
          currentLanguage === "ar"
            ? "يرجى إدخال كلمة المرور."
            : "Please enter a password."
        );

        passwordInput?.focus();

        return;

      }


      if (
        password.length < 6
      ) {

        showAuthMessage(
          t("weakPassword")
        );

        passwordInput?.focus();

        return;

      }


      if (
        confirmPasswordInput &&
        password !== confirmPassword
      ) {

        showAuthMessage(
          currentLanguage === "ar"
            ? "كلمتا المرور غير متطابقتين."
            : "Passwords do not match."
        );

        confirmPasswordInput.focus();

        return;

      }


      const registerButton =
        registerForm.querySelector(
          'button[type="submit"]'
        );


      if (registerButton) {

        registerButton.disabled =
          true;

        registerButton.dataset.originalText =
          registerButton.textContent;

        registerButton.textContent =
          currentLanguage === "ar"
            ? "جاري إنشاء الحساب..."
            : "Creating account...";

      }


      showAuthMessage(
        currentLanguage === "ar"
          ? "جاري إنشاء الحساب..."
          : "Creating account..."
      );


      try {

        const userCredential =
          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );


        const user =
          userCredential.user;


        await createUserProfile(
          user
        );


        currentProfile =
          await getUserProfile(
            user.uid
          );


        showAuthMessage(
          currentLanguage === "ar"
            ? "تم إنشاء الحساب بنجاح."
            : "Account created successfully.",
          true
        );


        registerForm.reset();

      } catch (error) {

        console.error(
          "Registration error:",
          error
        );


        showAuthMessage(
          getFirebaseErrorMessage(
            error
          )
        );

      } finally {

        if (registerButton) {

          registerButton.disabled =
            false;

          registerButton.textContent =
            registerButton.dataset
              .originalText ||
            t("register");

        }

      }

    }
  );

}


/* =========================================================
   LOGIN USER
   ========================================================= */

if (loginForm) {

  loginForm.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      const emailInput =
        document.getElementById(
          "loginEmail"
        );

      const passwordInput =
        document.getElementById(
          "loginPassword"
        );


      const email =
        emailInput?.value
          .trim()
          .toLowerCase() ||
        "";

      const password =
        passwordInput?.value ||
        "";


      if (!email) {

        showAuthMessage(
          currentLanguage === "ar"
            ? "يرجى إدخال البريد الإلكتروني."
            : "Please enter your email."
        );

        emailInput?.focus();

        return;

      }


      if (!password) {

        showAuthMessage(
          currentLanguage === "ar"
            ? "يرجى إدخال كلمة المرور."
            : "Please enter your password."
        );

        passwordInput?.focus();

        return;

      }


      const loginButton =
        loginForm.querySelector(
          'button[type="submit"]'
        );


      if (loginButton) {

        loginButton.disabled =
          true;

        loginButton.dataset.originalText =
          loginButton.textContent;

        loginButton.textContent =
          currentLanguage === "ar"
            ? "جاري تسجيل الدخول..."
            : "Logging in...";

      }


      showAuthMessage(
        currentLanguage === "ar"
          ? "جاري تسجيل الدخول..."
          : "Logging in..."
      );


      try {

        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );


        showAuthMessage(
          currentLanguage === "ar"
            ? "تم تسجيل الدخول بنجاح."
            : "Logged in successfully.",
          true
        );


        loginForm.reset();

      } catch (error) {

        console.error(
          "Login error:",
          error
        );


        showAuthMessage(
          getFirebaseErrorMessage(
            error
          )
        );

      } finally {

        if (loginButton) {

          loginButton.disabled =
            false;

          loginButton.textContent =
            loginButton.dataset
              .originalText ||
            t("login");

        }

      }

    }
  );

}


/* =========================================================
   AUTH UI
   ========================================================= */

function updateAuthUIForUser(
  user
) {

  if (!user) {

    if (authMessage) {

      authMessage.textContent =
        "";

    }

    return;

  }


  if (authMessage) {

    authMessage.textContent =
      `${t("loggedInAs")} ${
        user.email || ""
      }`;

  }

}


/* =========================================================
   MESSENGER
   ========================================================= */

function createConversationId(
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


async function startConversation(
  otherUid
) {

  const currentUser =
    auth.currentUser;


  if (!currentUser) {

    alert(
      t("loginToMessage")
    );

    return;

  }


  if (!otherUid) {

    alert(
      t("profileNotFound")
    );

    return;

  }


  if (
    currentUser.uid ===
    otherUid
  ) {

    alert(
      t("cannotMessageSelf")
    );

    return;

  }


  try {

    const otherProfile =
      await getUserProfile(
        otherUid
      );


    if (!otherProfile) {

      alert(
        t("profileNotFound")
      );

      return;

    }


    selectedConversationId =
      createConversationId(
        currentUser.uid,
        otherUid
      );


    selectedChatUser = {

      uid:
        otherUid,

      name:
        otherProfile.name ||
        otherProfile.email ||
        t("member"),

      email:
        otherProfile.email ||
        "",

      photoURL:
        otherProfile.photoURL ||
        getDefaultAvatar()

    };


    if (chatHeader) {

      chatHeader.innerHTML = `

        <img
          src="${escapeHTML(
            selectedChatUser.photoURL
          )}"
          class="conversation-avatar"
          alt=""
          onerror="
            this.onerror=null;
            this.src='${escapeHTML(
              getDefaultAvatar()
            )}';
          "
        >

        <span>
          ${escapeHTML(
            selectedChatUser.name
          )}
        </span>

      `;

    }


    if (chatMessages) {

      chatMessages.innerHTML = `

        <div class="chat-empty">

          <div>💬</div>

          <p>
            ${escapeHTML(
              t("loading")
            )}
          </p>

        </div>

      `;

    }


    const messagesSection =
      document.getElementById(
        "messages"
      );


    if (messagesSection) {

      messagesSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }


    listenToMessages();

    await loadConversations();

  } catch (error) {

    console.error(
      "Start conversation error:",
      error
    );

    alert(
      t("firestoreError")
    );

  }

}


function listenToMessages() {

  if (unsubscribeMessages) {

    unsubscribeMessages();

    unsubscribeMessages =
      null;

  }


  if (!selectedConversationId) {
    return;
  }


  const messagesQuery =
    query(
      collection(
        db,
        "messages"
      ),

      where(
        "conversationId",
        "==",
        selectedConversationId
      )
    );


  unsubscribeMessages =
    onSnapshot(
      messagesQuery,

      snapshot => {

        if (!chatMessages) {
          return;
        }


        chatMessages.innerHTML =
          "";


        if (snapshot.empty) {

          chatMessages.innerHTML = `

            <div class="chat-empty">

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


        const messageList = [];


        snapshot.forEach(
          messageDoc => {

            messageList.push({

              id:
                messageDoc.id,

              ...messageDoc.data()

            });

          }
        );


        messageList.sort(
          (a, b) => {

            const aTime =
              a.createdAt?.toMillis
                ? a.createdAt.toMillis()
                : 0;

            const bTime =
              b.createdAt?.toMillis
                ? b.createdAt.toMillis()
                : 0;


            return (
              aTime -
              bTime
            );

          }
        );


        messageList.forEach(
          message => {

            const mine =
              message.senderId ===
              auth.currentUser?.uid;


            const bubble =
              document.createElement(
                "div"
              );


            bubble.className =
              `message-bubble ${
                mine
                  ? "mine"
                  : "theirs"
              }`;


            const text =
              document.createElement(
                "div"
              );


            text.className =
              "message-text";


            text.textContent =
              message.text || "";


            const time =
              document.createElement(
                "small"
              );


            time.className =
              "message-time";


            time.textContent =
              formatDateTime(
                message.createdAt
              );


            bubble.appendChild(
              text
            );

            bubble.appendChild(
              time
            );

            chatMessages.appendChild(
              bubble
            );

          }
        );


        chatMessages.scrollTop =
          chatMessages.scrollHeight;

      },

      error => {

        console.error(
          "Messages listener error:",
          error
        );


        if (chatMessages) {

          chatMessages.innerHTML = `

            <div class="chat-empty">

              <div>⚠️</div>

              <p>
                ${escapeHTML(
                  t("firestoreError")
                )}
              </p>

            </div>

          `;

        }

      }
    );

}


function formatDateTime(
  value
) {

  if (!value) {
    return "";
  }


  let date;


  if (
    value &&
    typeof value.toDate ===
      "function"
  ) {

    date =
      value.toDate();

  } else if (
    value instanceof Date
  ) {

    date = value;

  } else {

    date =
      new Date(value);

  }


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

    return "";

  }


  return date.toLocaleTimeString(
    currentLanguage === "ar"
      ? "ar-SA"
      : "en-US",
    {
      hour: "numeric",
      minute: "2-digit"
    }
  );

}


/* =========================================================
   SEND MESSAGE
   ========================================================= */

if (chatForm) {

  chatForm.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      const currentUser =
        auth.currentUser;


      if (!currentUser) {

        alert(
          t("loginToMessage")
        );

        return;

      }


      if (
        !selectedConversationId ||
        !selectedChatUser
      ) {

        return;

      }


      const text =
        chatInput?.value
          ?.trim() ||
        "";


      if (!text) {
        return;
      }


      if (
        text.length > 5000
      ) {

        alert(
          currentLanguage === "ar"
            ? "الرسالة طويلة جداً."
            : "Message is too long."
        );

        return;

      }


      if (chatInput) {

        chatInput.disabled =
          true;

      }


      const sendButton =
        chatForm.querySelector(
          'button[type="submit"]'
        );


      if (sendButton) {

        sendButton.disabled =
          true;

      }


      try {

        await addDoc(
          collection(
            db,
            "messages"
          ),
          {

            conversationId:
              selectedConversationId,

            senderId:
              currentUser.uid,

            receiverId:
              selectedChatUser.uid,

            senderEmail:
              currentUser.email ||
              "",

            text,

            createdAt:
              serverTimestamp()

          }
        );


        const conversationRef =
          doc(
            db,
            "conversations",
            selectedConversationId
          );


        await setDoc(
          conversationRef,
          {

            participants: [

              currentUser.uid,

              selectedChatUser.uid

            ],

            participantEmails: {

              [currentUser.uid]:
                currentUser.email ||
                "",

              [selectedChatUser.uid]:
                selectedChatUser.email ||
                ""

            },

            lastMessage:
              text,

            lastMessageSenderId:
              currentUser.uid,

            updatedAt:
              serverTimestamp()

          },

          {
            merge: true
          }
        );


        if (chatInput) {

          chatInput.value =
            "";

        }


        await loadConversations();

      } catch (error) {

        console.error(
          "Send message error:",
          error
        );


        alert(
          currentLanguage === "ar"
            ? "تعذر إرسال الرسالة. يرجى التحقق من إعدادات Firestore."
            : "Message could not be sent. Please check your Firestore rules."
        );

      } finally {

        if (chatInput) {

          chatInput.disabled =
            false;

          chatInput.focus();

        }


        if (sendButton) {

          sendButton.disabled =
            false;

        }

      }

    }
  );

}


/* =========================================================
   LOAD CONVERSATIONS
   ========================================================= */

async function loadConversations() {

  if (!conversationList) {
    return;
  }


  const currentUser =
    auth.currentUser;


  if (!currentUser) {

    conversationList.innerHTML = `

      <div class="chat-empty">

        <p>
          ${escapeHTML(
            t("profileRequired")
          )}
        </p>

      </div>

    `;

    return;

  }


  try {

    const conversationsQuery =
      query(
        collection(
          db,
          "conversations"
        ),

        where(
          "participants",
          "array-contains",
          currentUser.uid
        )
      );


    const snapshot =
      await getDocs(
        conversationsQuery
      );


    conversationList.innerHTML =
      "";


    if (snapshot.empty) {

      conversationList.innerHTML = `

        <div class="chat-empty">

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


    const conversationData =
      snapshot.docs.map(
        conversationDoc => ({

          id:
            conversationDoc.id,

          ...conversationDoc.data()

        })
      );


    conversationData.sort(
      (a, b) => {

        const aTime =
          a.updatedAt?.toMillis
            ? a.updatedAt.toMillis()
            : 0;

        const bTime =
          b.updatedAt?.toMillis
            ? b.updatedAt.toMillis()
            : 0;


        return (
          bTime -
          aTime
        );

      }
    );


    for (
      const conversation
      of conversationData
    ) {

      const otherUid =
        conversation
          .participants
          ?.find(
            uid =>
              uid !==
              currentUser.uid
          );


      if (!otherUid) {
        continue;
      }


      const otherProfile =
        await getUserProfile(
          otherUid
        );


      const item =
        document.createElement(
          "div"
        );


      item.className =
        "conversation-item";


      if (
        selectedConversationId ===
        conversation.id
      ) {

        item.classList.add(
          "active"
        );

      }


      const photo =
        otherProfile?.photoURL ||
        getDefaultAvatar();


      const name =
        otherProfile?.name ||
        otherProfile?.email ||
        t("member");


      item.innerHTML = `

        <img
          class="conversation-avatar"
          src="${escapeHTML(photo)}"
          alt=""
          onerror="
            this.onerror=null;
            this.src='${escapeHTML(
              getDefaultAvatar()
            )}';
          "
        >

        <div class="conversation-info">

          <strong>
            ${escapeHTML(name)}
          </strong>

          <span>
            ${escapeHTML(
              conversation.lastMessage ||
              ""
            )}
          </span>

        </div>

      `;


      item.addEventListener(
        "click",
        () => {

          startConversation(
            otherUid
          );

        }
      );


      conversationList.appendChild(
        item
      );

    }

  } catch (error) {

    console.error(
      "Conversation loading error:",
      error
    );


    conversationList.innerHTML = `

      <div class="chat-empty">

        <div>⚠️</div>

        <p>
          ${escapeHTML(
            t("firestoreError")
          )}
        </p>

      </div>

    `;

  }

}


/* =========================================================
   LOGOUT
   ========================================================= */

async function handleLogout() {

  try {

    if (unsubscribeMessages) {

      unsubscribeMessages();

      unsubscribeMessages =
        null;

    }


    await signOut(auth);


    selectedConversationId =
      null;

    selectedChatUser =
      null;

    currentProfile =
      null;


    alert(
      t("loggedOut")
    );

  } catch (error) {

    console.error(
      "Logout error:",
      error
    );


    alert(
      currentLanguage === "ar"
        ? "تعذر تسجيل الخروج."
        : "Unable to log out."
    );

  }

}


/* =========================================================
   AUTH STATE

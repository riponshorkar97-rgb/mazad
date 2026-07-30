/* =========================================================
   MAZAD — Complete Main JavaScript
   Firebase Authentication + Firestore
   Cloudinary Image Upload
   English + Arabic
   Products + Profiles + Messenger
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
   FIREBASE INITIALIZATION
   ========================================================= */

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


/* =========================================================
   CLOUDINARY
   ========================================================= */

const CLOUDINARY_CLOUD_NAME = "bhpccaio";
const CLOUDINARY_UPLOAD_PRESET = "mazad_upload";

const CLOUDINARY_UPLOAD_URL =
  `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;


/* =========================================================
   GLOBAL STATE
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

    home: "Home",
    categories: "Categories",
    listings: "Listings",
    profile: "Profile",
    sellProduct: "Sell Product",

    welcome: "Welcome to Mazad",
    welcomeMazad: "Welcome to Mazad",
    buySell: "Buy & Sell",
    anythingEasily: "Anything Easily",

    heroDescription:
      "Find great products near you or sell your products quickly and easily on Mazad.",

    browseProducts: "Browse Products",
    sellSomething: "Sell Something",
    simpleFastSecure: "Simple • Fast • Secure",

    searchPlaceholder: "What are you looking for?",
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
    pleaseWait: "Please wait.",

    sellYourProduct: "Sell Your Product",

    productTitle: "Product title",
    productDescription: "Product description",
    productImage: "Product Image",
    price: "Price",

    selectCategory: "Select Category",

    publish: "Publish",
    publishProduct: "Publish Product",
    published: "Product published successfully.",
    publishFailed: "Failed to publish product.",

    enterProductTitle:
      "Please enter a product title.",

    enterPrice:
      "Please enter a price.",

    invalidPrice:
      "Please enter a valid price.",

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

    ownProduct:
      "You can only delete your own product.",

    productNotFound:
      "Product not found.",

    description:
      "Description",

    seller:
      "Seller",

    sellerUnavailable:
      "Seller unavailable",

    viewProfile:
      "View Profile",

    message:
      "Message",

    call:
      "Call",

    member:
      "Member",

    unknown:
      "Unknown",

    loading:
      "Loading...",

    noDescription:
      "No description available.",

    product:
      "Product",

    account:
      "Account",

    myProfile:
      "My Profile",

    editProfile:
      "Edit Profile",

    editProfileLogin:
      "Please login to edit your profile.",

    profileRequired:
      "Please login to view your profile.",

    profileNotFound:
      "Profile not found.",

    saveProfile:
      "Save Profile",

    profileSaved:
      "Profile saved successfully.",

    profilePhoto:
      "Profile Photo",

    yourName:
      "Your name",

    phoneNumber:
      "Phone number",

    aboutBio:
      "About you",

    bio:
      "Bio",

    joinDate:
      "Joined",

    myListings:
      "My Listings",

    noListings:
      "No listings yet.",

    email:
      "Email",

    password:
      "Password",

    emailAddress:
      "Email address",

    passwordMin:
      "Password (minimum 6 characters)",

    login:
      "Login",

    register:
      "Register",

    createAccount:
      "Create Account",

    createNewAccount:
      "Create new account",

    alreadyAccount:
      "Already have an account? Login",

    logout:
      "Logout",

    loggedInAs:
      "Logged in as",

    loginRegisterMessage:
      "Login or register to start buying and selling.",

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

    loginFirst:
      "Please login first.",

    loginToMessage:
      "Please login to send a message.",

    cannotMessageSelf:
      "You cannot message yourself.",

    loggedOut:
      "You have been logged out.",

    communication:
      "Communication",

    messages:
      "Messages",

    selectConversation:
      "Select a conversation",

    writeMessage:
      "Write a message...",

    send:
      "Send",

    noMessages:
      "No messages yet.",

    noConversations:
      "No conversations yet.",

    firestoreError:
      "Something went wrong with Firestore.",

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

    buySellProducts:
      "Buy and sell products easily.",

    allRightsReserved:
      "All rights reserved.",

    somethingWentWrong:
      "Something went wrong. Please try again."

  },


  ar: {

    home: "الرئيسية",
    categories: "الفئات",
    listings: "الإعلانات",
    profile: "الملف الشخصي",
    sellProduct: "بيع منتج",

    welcome: "مرحباً بك في مزاد",
    welcomeMazad: "مرحباً بك في مزاد",
    buySell: "بيع وشراء",
    anythingEasily: "أي شيء بسهولة",

    heroDescription:
      "اعثر على منتجات رائعة بالقرب منك أو قم ببيع منتجاتك بسرعة وسهولة على مزاد.",

    browseProducts: "تصفح المنتجات",
    sellSomething: "بيع شيء ما",
    simpleFastSecure: "بسيط • سريع • آمن",

    searchPlaceholder: "ماذا تبحث عنه؟",
    search: "بحث",

    explore: "استكشف",
    popularCategories: "الفئات الشائعة",

    cars: "سيارات",
    mobiles: "هواتف",
    electronics: "إلكترونيات",
    property: "عقارات",
    fashion: "أزياء",
    jobs: "وظائف",
    others: "أخرى",

    findNextCar: "اعثر على سيارتك القادمة",
    phonesAccessories: "الهواتف والإكسسوارات",
    devicesGadgets: "الأجهزة والأدوات",
    homesLand: "المنازل والأراضي",
    clothesAccessories: "الملابس والإكسسوارات",
    findOpportunities: "اعثر على فرص",

    marketplace: "السوق",
    latestListings: "أحدث الإعلانات",

    loadingProducts: "جار تحميل المنتجات...",
    pleaseWait: "يرجى الانتظار.",

    sellYourProduct: "بيع منتجك",

    productTitle: "اسم المنتج",
    productDescription: "وصف المنتج",
    productImage: "صورة المنتج",
    price: "السعر",

    selectCategory: "اختر الفئة",

    publish: "نشر",
    publishProduct: "نشر المنتج",
    published: "تم نشر المنتج بنجاح.",
    publishFailed: "فشل نشر المنتج.",

    enterProductTitle:
      "يرجى إدخال اسم المنتج.",

    enterPrice:
      "يرجى إدخال السعر.",

    invalidPrice:
      "يرجى إدخال سعر صالح.",

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

    ownProduct:
      "يمكنك حذف منتجاتك فقط.",

    productNotFound:
      "لم يتم العثور على المنتج.",

    description:
      "الوصف",

    seller:
      "البائع",

    sellerUnavailable:
      "البائع غير متاح",

    viewProfile:
      "عرض الملف الشخصي",

    message:
      "رسالة",

    call:
      "اتصال",

    member:
      "عضو",

    unknown:
      "غير معروف",

    loading:
      "جار التحميل...",

    noDescription:
      "لا يوجد وصف متاح.",

    product:
      "منتج",

    account:
      "الحساب",

    myProfile:
      "ملفي الشخصي",

    editProfile:
      "تعديل الملف الشخصي",

    editProfileLogin:
      "يرجى تسجيل الدخول لتعديل ملفك الشخصي.",

    profileRequired:
      "يرجى تسجيل الدخول لعرض ملفك الشخصي.",

    profileNotFound:
      "لم يتم العثور على الملف الشخصي.",

    saveProfile:
      "حفظ الملف الشخصي",

    profileSaved:
      "تم حفظ الملف الشخصي بنجاح.",

    profilePhoto:
      "الصورة الشخصية",

    yourName:
      "اسمك",

    phoneNumber:
      "رقم الهاتف",

    aboutBio:
      "نبذة عنك",

    bio:
      "نبذة",

    joinDate:
      "تاريخ الانضمام",

    myListings:
      "إعلاناتي",

    noListings:
      "لا توجد إعلانات حتى الآن.",

    email:
      "البريد الإلكتروني",

    password:
      "كلمة المرور",

    emailAddress:
      "البريد الإلكتروني",

    passwordMin:
      "كلمة المرور (6 أحرف على الأقل)",

    login:
      "تسجيل الدخول",

    register:
      "إنشاء حساب",

    createAccount:
      "إنشاء حساب",

    createNewAccount:
      "إنشاء حساب جديد",

    alreadyAccount:
      "لديك حساب بالفعل؟ تسجيل الدخول",

    logout:
      "تسجيل الخروج",

    loggedInAs:
      "تم تسجيل الدخول باسم",

    loginRegisterMessage:
      "قم بتسجيل الدخول أو إنشاء حساب لبدء البيع والشراء.",

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

    loginFirst:
      "يرجى تسجيل الدخول أولاً.",

    loginToMessage:
      "يرجى تسجيل الدخول لإرسال رسالة.",

    cannotMessageSelf:
      "لا يمكنك مراسلة نفسك.",

    loggedOut:
      "تم تسجيل خروجك.",

    communication:
      "التواصل",

    messages:
      "الرسائل",

    selectConversation:
      "اختر محادثة",

    writeMessage:
      "اكتب رسالة...",

    send:
      "إرسال",

    noMessages:
      "لا توجد رسائل حتى الآن.",

    noConversations:
      "لا توجد محادثات حتى الآن.",

    firestoreError:
      "حدث خطأ في Firestore.",

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

    buySellProducts:
      "اشترِ وبع المنتجات بسهولة.",

    allRightsReserved:
      "جميع الحقوق محفوظة.",

    somethingWentWrong:
      "حدث خطأ ما. يرجى المحاولة مرة أخرى."

  }

};


/* =========================================================
   TRANSLATION
   ========================================================= */

function t(key) {

  return (
    translations[currentLanguage]?.[key] ||
    translations.en?.[key] ||
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


  const button =
    document.getElementById("languageBtn");

  if (button) {

    button.textContent =
      currentLanguage === "en"
        ? "العربية"
        : "English";

  }

}


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
  document.getElementById("productsContainer");

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

const profileContent =
  document.getElementById("profileContent");

const productModal =
  document.getElementById("productModal");

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
    currentLanguage === "ar"
      ? "ar-SA"
      : "en-US",
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


function formatDateTime(value) {

  if (!value) {
    return "";
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

    return "";

  }

  if (
    !date ||
    Number.isNaN(date.getTime())
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
   CLOUDINARY IMAGE UPLOAD
   ========================================================= */

async function uploadImageToCloudinary(
  file,
  statusElement
) {

  if (!file) {
    return "";
  }

  if (!(file instanceof File)) {
    throw new Error(
      t("validImage")
    );
  }

  if (!file.type.startsWith("image/")) {
    throw new Error(
      t("validImage")
    );
  }

  if (file.size > 10 * 1024 * 1024) {
    throw new Error(
      t("imageTooLarge")
    );
  }

  if (statusElement) {
    statusElement.textContent =
      t("uploadingImage");
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

    const data =
      await response.json();

    if (!response.ok) {

      console.error(
        "Cloudinary error:",
        data
      );

      throw new Error(
        data?.error?.message ||
        t("uploadFailed")
      );

    }

    if (!data.secure_url) {

      throw new Error(
        t("imageUrlFailed")
      );

    }

    if (statusElement) {
      statusElement.textContent =
        t("imageUploaded");
    }

    return data.secure_url;

  } catch (error) {

    if (statusElement) {
      statusElement.textContent =
        error.message ||
        t("uploadFailed");
    }

    throw error;

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
        email: user.email || "",
        name: "",
        phone: "",
        location: "",
        bio: "",
        photoURL: "",
        createdAt: serverTimestamp()
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
   PROFILE DISPLAY
   ========================================================= */

async function renderMyProfile() {

  if (!profileContent) {
    return;
  }

  const user =
    auth.currentUser;

  if (!user) {

    profileContent.innerHTML = `
      <div class="empty-state">
        <div>👤</div>
        <h3>
          ${escapeHTML(
            t("profileRequired")
          )}
        </h3>
      </div>
    `;

    return;

  }

  try {

    const profile =
      await getUserProfile(
        user.uid
      );

    currentProfile =
      profile || {
        uid: user.uid,
        email: user.email || ""
      };

    const name =
      currentProfile.name ||
      user.email ||
      t("member");

    const photo =
      currentProfile.photoURL ||
      getDefaultAvatar();

    const phone =
      currentProfile.phone ||
      "";

    const location =
      currentProfile.location ||
      "";

    const bio =
      currentProfile.bio ||
      "";

    profileContent.innerHTML = `
      <div class="profile-card">

        <div class="profile-header">

          <img
            src="${escapeHTML(photo)}"
            alt="Profile"
            class="profile-avatar-image"
            onerror="
              this.onerror=null;
              this.src='${escapeHTML(
                getDefaultAvatar()
              )}';
            "
          >

          <div class="profile-info">

            <h3>
              ${escapeHTML(name)}
            </h3>

            <p>
              ${escapeHTML(
                user.email || ""
              )}
            </p>

            ${
              phone
                ? `<p>📞 ${escapeHTML(phone)}</p>`
                : ""
            }

            ${
              location
                ? `<p>📍 ${escapeHTML(location)}</p>`
                : ""
            }

          </div>

        </div>

        ${
          bio
            ? `
              <div class="profile-bio">
                <strong>
                  ${escapeHTML(t("bio"))}
                </strong>
                <p>
                  ${escapeHTML(bio)}
                </p>
              </div>
            `
            : ""
        }

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

          <button
            type="button"
            class="secondary-btn"
            id="logoutBtn"
          >
            ${escapeHTML(
              t("logout")
            )}
          </button>

        </div>

        <div class="profile-listings">

          <h3>
            ${escapeHTML(
              t("myListings")
            )}
          </h3>

          <div
            id="myListingsContainer"
            class="products-grid"
          ></div>

        </div>

      </div>
    `;

    const editButton =
      document.getElementById(
        "openEditProfileBtn"
      );

    if (editButton) {

      editButton.addEventListener(
        "click",
        openEditProfile
      );

    }

    const logoutButton =
      document.getElementById(
        "logoutBtn"
      );

    if (logoutButton) {

      logoutButton.addEventListener(
        "click",
        handleLogout
      );

    }

    displayMyListings();

  } catch (error) {

    console.error(
      "Render profile error:",
      error
    );

    profileContent.innerHTML = `
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

  profileNameInput.value =
    currentProfile?.name || "";

  profilePhoneInput.value =
    currentProfile?.phone || "";

  profileLocationInput.value =
    currentProfile?.location || "";

  profileBioInput.value =
    currentProfile?.bio || "";

  if (profileImageStatus) {
    profileImageStatus.textContent =
      "";
  }

  if (profileSaveStatus) {
    profileSaveStatus.textContent =
      "";
  }

  editProfileModal.style.display =
    "flex";

  editProfileModal.setAttribute(
    "aria-hidden",
    "false"
  );

}


function closeEditProfile() {

  if (!editProfileModal) {
    return;
  }

  editProfileModal.style.display =
    "none";

  editProfileModal.setAttribute(
    "aria-hidden",
    "true"
  );

}


async function saveProfile(event) {

  event.preventDefault();

  const user =
    auth.currentUser;

  if (!user) {

    alert(
      t("editProfileLogin")
    );

    return;

  }

  const name =
    profileNameInput.value
      .trim();

  const phone =
    profilePhoneInput.value
      .trim();

  const location =
    profileLocationInput.value
      .trim();

  const bio =
    profileBioInput.value
      .trim();

  const button =
    saveProfileBtn;

  if (button) {
    button.disabled = true;
  }

  try {

    let photoURL =
      currentProfile?.photoURL ||
      "";

    if (
      profilePhotoFile?.files?.[0]
    ) {

      photoURL =
        await uploadImageToCloudinary(
          profilePhotoFile.files[0],
          profileImageStatus
        );

    }

    await setDoc(
      doc(
        db,
        "users",
        user.uid
      ),
      {
        uid: user.uid,
        email: user.email || "",
        name,
        phone,
        location,
        bio,
        photoURL,
        updatedAt: serverTimestamp()
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

    await renderMyProfile();

    setTimeout(
      closeEditProfile,
      700
    );

  } catch (error) {

    console.error(
      "Save profile error:",
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

    if (button) {
      button.disabled = false;
    }

  }

}


/* =========================================================
   PRODUCTS
   ========================================================= */

async function loadProducts() {

  if (!productsContainer) {
    return;
  }

  productsContainer.innerHTML = `
    <div class="empty-state">
      <div>📦</div>
      <h3>
        ${escapeHTML(
          t("loadingProducts")
        )}
      </h3>
      <p>
        ${escapeHTML(
          t("pleaseWait")
        )}
      </p>
    </div>
  `;

  try {

    const snapshot =
      await getDocs(
        collection(
          db,
          "products"
        )
      );

    products =
      snapshot.docs.map(
        productDoc => ({
          id: productDoc.id,
          ...productDoc.data()
        })
      );

    products.sort(
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

    displayProducts(products);

  } catch (error) {

    console.error(
      "Product loading error:",
      error
    );

    productsContainer.innerHTML = `
      <div class="empty-state">
        <div>⚠️</div>
        <h3>
          ${escapeHTML(
            t("firestoreError")
          )}
        </h3>
        <p>
          ${escapeHTML(
            error.message || ""
          )}
        </p>
      </div>
    `;

  }

}


function displayProducts(
  list
) {

  if (!productsContainer) {
    return;
  }

  productsContainer.innerHTML =
    "";

  if (!list.length) {

    productsContainer.innerHTML = `
      <div class="empty-state">
        <div>📦</div>
        <h3>
          ${escapeHTML(
            t("noProducts")
          )}
        </h3>
      </div>
    `;

    return;

  }

  list.forEach(
    product => {

      const card =
        document.createElement(
          "article"
        );

      card.className =
        "product-card";

      const image =
        product.imageURL ||
        product.imageUrl ||
        getDefaultAvatar();

      const title =
        product.title ||
        t("product");

      const category =
        product.category ||
        t("others");

      const price =
        formatPrice(
          product.price
        );

      const location =
        product.location ||
        t("unknown");

      const description =
        product.description ||
        t("noDescription");

      card.innerHTML = `
        <div class="product-image-wrapper">

          <img
            class="product-image"
            src="${escapeHTML(image)}"
            alt="${escapeHTML(title)}"
            loading="lazy"
            onerror="
              this.onerror=null;
              this.src='${escapeHTML(
                getDefaultAvatar()
              )}';
            "
          >

        </div>

        <div class="product-card-content">

          <span class="product-category">
            ${escapeHTML(category)}
          </span>

          <h3>
            ${escapeHTML(title)}
          </h3>

          <div class="product-price">
            ${escapeHTML(price)}
          </div>

          <p class="product-location">
            📍 ${escapeHTML(location)}
          </p>

          <p class="product-description">
            ${escapeHTML(
              description.length > 100
                ? description.slice(0, 100) + "..."
                : description
            )}
          </p>

          <button
            type="button"
            class="primary-btn view-product-btn"
          >
            ${escapeHTML(
              t("viewProfile")
            ).replace(
              t("viewProfile"),
              t("product")
            )}
          </button>

        </div>
      `;

      card.addEventListener(
        "click",
        event => {

          if (
            event.target.closest(
              "button"
            )
          ) {

            openProductModal(
              product.id
            );

          } else {

            openProductModal(
              product.id
            );

          }

        }
      );

      productsContainer.appendChild(
        card
      );

    }
  );

}


function displayMyListings() {

  const container =
    document.getElementById(
      "myListingsContainer"
    );

  if (!container) {
    return;
  }

  const user =
    auth.currentUser;

  if (!user) {
    return;
  }

  const mine =
    products.filter(
      product =>
        product.sellerId ===
          user.uid ||
        product.uid ===
          user.uid
    );

  container.innerHTML =
    "";

  if (!mine.length) {

    container.innerHTML = `
      <div class="empty-state">
        <p>
          ${escapeHTML(
            t("noListings")
          )}
        </p>
      </div>
    `;

    return;

  }

  mine.forEach(
    product => {

      const card =
        document.createElement(
          "article"
        );

      card.className =
        "product-card";

      const image =
        product.imageURL ||
        product.imageUrl ||
        getDefaultAvatar();

      card.innerHTML = `
        <div class="product-image-wrapper">

          <img
            class="product-image"
            src="${escapeHTML(image)}"
            alt=""
            onerror="
              this.onerror=null;
              this.src='${escapeHTML(
                getDefaultAvatar()
              )}';
            "
          >

        </div>

        <div class="product-card-content">

          <span class="product-category">
            ${escapeHTML(
              product.category ||
              t("others")
            )}
          </span>

          <h3>
            ${escapeHTML(
              product.title ||
              t("product")
            )}
          </h3>

          <div class="product-price">
            ${escapeHTML(
              formatPrice(
                product.price
              )
            )}
          </div>

          <button
            type="button"
            class="secondary-btn"
            data-delete-product="${escapeHTML(
              product.id
            )}"
          >
            ${escapeHTML(
              t("deleteProduct")
            )}
          </button>

        </div>
      `;

      const deleteButton =
        card.querySelector(
          "[data-delete-product]"
        );

      if (deleteButton) {

        deleteButton.addEventListener(
          "click",
          event => {

            event.stopPropagation();

            deleteProduct(
              product.id
            );

          }
        );

      }

      card.addEventListener(
        "click",
        event => {

          if (
            event.target.closest(
              "[data-delete-product]"
            )
          ) {
            return;
          }

          openProductModal(
            product.id
          );

        }
      );

      container.appendChild(
        card
      );

    }
  );

}


/* =========================================================
   SEARCH / FILTER
   ========================================================= */

function filterProducts() {

  const search =
    searchInput?.value
      ?.trim()
      .toLowerCase() ||
    "";

  const category =
    categorySelect?.value ||
    "";

  const filtered =
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

        const productCategory =
          String(
            product.category || ""
          );

        const matchesSearch =
          !search ||
          title.includes(search) ||
          description.includes(search) ||
          location.includes(search);

        const matchesCategory =
          !category ||
          productCategory === category;

        return (
          matchesSearch &&
          matchesCategory
        );

      }
    );

  displayProducts(
    filtered
  );

}


/* =========================================================
   PUBLISH PRODUCT
   ========================================================= */

async function publishProduct(
  event
) {

  event.preventDefault();

  const user =
    auth.currentUser;

  if (!user) {

    alert(
      t("loginFirst")
    );

    return;

  }

  const title =
    document
      .getElementById(
        "productTitle"
      )
      ?.value
      ?.trim() || "";

  const category =
    document
      .getElementById(
        "productCategory"
      )
      ?.value || "";

  const price =
    document
      .getElementById(
        "productPrice"
      )
      ?.value || "";

  const location =
    document
      .getElementById(
        "productLocation"
      )
      ?.value
      ?.trim() || "";

  const description =
    document
      .getElementById(
        "productDescription"
      )
      ?.value
      ?.trim() || "";

  const file =
    productImageFile?.files?.[0];


  if (!title) {

    alert(
      t("enterProductTitle")
    );

    return;

  }

  if (!price) {

    alert(
      t("enterPrice")
    );

    return;

  }

  if (
    !Number.isFinite(
      Number(price)
    ) ||
    Number(price) < 0
  ) {

    alert(
      t("invalidPrice")
    );

    return;

  }

  if (!category) {

    alert(
      t("selectCategory")
    );

    return;

  }

  if (!location) {

    alert(
      t("enterLocation")
    );

    return;

  }

  if (!file) {

    alert(
      t("selectImage")
    );

    return;

  }


  if (publishProductBtn) {
    publishProductBtn.disabled = true;
  }

  if (sellStatus) {
    sellStatus.textContent =
      t("uploadingImage");
  }


  try {

    const imageURL =
      await uploadImageToCloudinary(
        file,
        imageStatus
      );

    if (!imageURL) {

      throw new Error(
        t("imageUrlFailed")
      );

    }


    await addDoc(
      collection(
        db,
        "products"
      ),
      {

        title,

        category,

        price: Number(price),

        location,

        description,

        imageURL,

        sellerId:
          user.uid,

        sellerEmail:
          user.email || "",

        createdAt:
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

    document
      .getElementById("listings")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });


  } catch (error) {

    console.error(
      "Publish product error:",
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
    }

  }

}


/* =========================================================
   PRODUCT MODAL
   ========================================================= */

async function openProductModal(
  productId
) {

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

  const image =
    product.imageURL ||
    product.imageUrl ||
    getDefaultAvatar();

  if (modalProductImage) {

    modalProductImage.src =
      image;

    modalProductImage.onerror =
      () => {

        modalProductImage.src =
          getDefaultAvatar();

      };

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
      formatPrice(
        product.price
      );

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


  let seller = null;

  if (product.sellerId) {

    seller =
      await getUserProfile(
        product.sellerId
      );

  }


  const sellerName =
    seller?.name ||
    product.sellerEmail ||
    t("sellerUnavailable");

  const sellerEmail =
    seller?.email ||
    product.sellerEmail ||
    "";

  const sellerPhoto =
    seller?.photoURL ||
    getDefaultAvatar();


  if (modalSellerPhoto) {

    modalSellerPhoto.src =
      sellerPhoto;

    modalSellerPhoto.onerror =
      () => {

        modalSellerPhoto.src =
          getDefaultAvatar();

      };

  }

  if (modalSellerName) {

    modalSellerName.textContent =
      sellerName;

  }

  if (modalSellerEmail) {

    modalSellerEmail.textContent =
      sellerEmail;

  }


  if (sellerActions) {

    sellerActions.innerHTML =
      "";

    const currentUser =
      auth.currentUser;


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
        "secondary-btn";

      deleteButton.textContent =
        t("deleteProduct");

      deleteButton.addEventListener(
        "click",
        () => {

          deleteProduct(
            product.id
          );

        }
      );

      sellerActions.appendChild(
        deleteButton
      );

    } else if (
      product.sellerId
    ) {

      const profileButton =
        document.createElement(
          "button"
        );

      profileButton.type =
        "button";

      profileButton.className =
        "secondary-btn";

      profileButton.textContent =
        t("viewProfile");

      profileButton.addEventListener(
        "click",
        () => {

          closeProductModal();

          openSellerProfile(
            product.sellerId
          );

        }
      );


      const messageButton =
        document.createElement(
          "button"
        );

      messageButton.type =
        "button";

      messageButton.className =
        "primary-btn";

      messageButton.textContent =
        t("message");

      messageButton.addEventListener(
        "click",
        () => {

          closeProductModal();

          startConversation(
            product.sellerId
          );

        }
      );


      sellerActions.appendChild(
        profileButton
      );

      sellerActions.appendChild(
        messageButton
      );


      if (seller?.phone) {

        const callButton =
          document.createElement(
            "a"
          );

        callButton.className =
          "secondary-btn";

        callButton.href =
          `tel:${seller.phone}`;

        callButton.textContent =
          t("call");

        sellerActions.appendChild(
          callButton
        );

      }

    }

  }


  if (productModal) {

    productModal.style.display =
      "flex";

    productModal.setAttribute(
      "aria-hidden",
      "false"
    );

  }

}


function closeProductModal() {

  if (!productModal) {
    return;
  }

  productModal.style.display =
    "none";

  productModal.setAttribute(
    "aria-hidden",
    "true"
  );

}


/* =========================================================
   SELLER PROFILE
   ========================================================= */

async function openSellerProfile(
  uid
) {

  if (!uid) {
    return;
  }

  const profile =
    await getUserProfile(uid);

  if (!

/* =========================================================
MAZAD — Profile + Buyer/Seller + Messenger
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
  getDoc,
  setDoc,
  query,
  where,
  orderBy,
  deleteDoc,
  doc,
  serverTimestamp,
  onSnapshot,
  limit
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
    pleaseWait: "Please wait.",

    sellYourProduct: "Sell Your Product",
    productTitle: "Product title",
    selectCategory: "Select Category",
    price: "Price",
    location: "Location",
    productImage: "Product Image",
    productDescription: "Product description",
    publishProduct: "Publish Product",

    welcomeMazad: "Welcome to Mazad",
    loginRegisterMessage:
      "Login or register to start buying and selling.",

    emailAddress: "Email address",
    password: "Password",
    passwordMin: "Password (minimum 6 characters)",

    createAccount: "Create Account",
    createNewAccount: "Create new account",
    alreadyAccount: "Already have an account? Login",

    description: "Description",
    seller: "Seller",

    buySellProducts:
      "Buy and sell products easily.",

    allRightsReserved:
      "All rights reserved.",

    viewDetails: "View Details",
    noProducts: "No products found",
    tryAnother: "Try another search or category.",

    unknown: "Unknown",
    noDescription: "No description available.",

    sellerUnavailable:
      "Seller information unavailable",

    contactSeller: "Contact Seller",
    deleteProduct: "Delete Product",

    loadingError: "Could not load products",

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
      "Failed to publish product. Please try again.",

    account: "Account",
    myProfile: "My Profile",
    editProfile: "Edit Profile",
    profilePhoto: "Profile Photo",
    yourName: "Your name",
    phoneNumber: "Phone number",
    aboutBio: "About you",
    saveProfile: "Save Profile",
    profileSaved: "Profile updated successfully! 🎉",
    profileRequired:
      "Please login to view your profile.",

    joinDate: "Joined",
    phone: "Phone",
    email: "Email",
    bio: "About",
    myListings: "My Listings",
    noListings: "No listings yet.",

    viewProfile: "View Profile",
    message: "Message",
    call: "Call",

    communication: "Communication",
    messages: "Messages",
    noConversations: "No conversations yet.",
    selectConversation: "Select a conversation",
    writeMessage: "Write a message...",
    send: "Send",

    profileNotFound: "Profile not found.",
    loginToMessage:
      "Please login to send a message.",
    cannotMessageSelf:
      "You cannot message yourself.",
    messageSent: "Message sent.",
    noMessages: "No messages yet.",
    loading: "Loading...",
    member: "Member",

    editProfileLogin:
      "Please login before editing your profile.",

    profileImageUploaded:
      "Profile photo uploaded successfully.",

    profileImageUploadFailed:
      "Could not upload profile photo."
  },


  ar: {

    home: "الرئيسية",
    categories: "الفئات",
    listings: "الإعلانات",
    login: "تسجيل الدخول",
    profile: "الملف الشخصي",
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

    allCategories: "جميع الفئات",
    search: "بحث",
    explore: "استكشف",

    popularCategories: "الفئات الشائعة",

    cars: "سيارات",
    mobiles: "جوالات",
    electronics: "إلكترونيات",
    property: "عقارات",
    fashion: "أزياء",
    jobs: "وظائف",
    others: "أخرى",

    findNextCar: "اعثر على سيارتك القادمة",
    phonesAccessories: "جوالات وإكسسوارات",
    devicesGadgets: "أجهزة وأدوات",
    homesLand: "منازل وأراضٍ",
    clothesAccessories: "ملابس وإكسسوارات",
    findOpportunities: "ابحث عن فرص",

    marketplace: "السوق",
    latestListings: "أحدث الإعلانات",

    loadingProducts: "جاري تحميل المنتجات...",
    pleaseWait: "يرجى الانتظار.",

    sellYourProduct: "بيع منتجك",
    productTitle: "عنوان المنتج",
    selectCategory: "اختر الفئة",
    price: "السعر",
    location: "الموقع",
    productImage: "صورة المنتج",
    productDescription: "وصف المنتج",
    publishProduct: "نشر المنتج",

    welcomeMazad: "مرحباً بك في مزاد",

    loginRegisterMessage:
      "سجل الدخول أو أنشئ حساباً لبدء البيع والشراء.",

    emailAddress: "البريد الإلكتروني",
    password: "كلمة المرور",
    passwordMin: "كلمة المرور (6 أحرف على الأقل)",

    createAccount: "إنشاء حساب",
    createNewAccount: "إنشاء حساب جديد",
    alreadyAccount: "لديك حساب بالفعل؟ تسجيل الدخول",

    description: "الوصف",
    seller: "البائع",

    buySellProducts:
      "اشترِ وبع المنتجات بسهولة.",

    allRightsReserved:
      "جميع الحقوق محفوظة.",

    viewDetails: "عرض التفاصيل",
    noProducts: "لم يتم العثور على منتجات",
    tryAnother: "جرب بحثاً أو فئة أخرى.",

    unknown: "غير معروف",
    noDescription: "لا يوجد وصف متاح.",

    sellerUnavailable:
      "معلومات البائع غير متاحة",

    contactSeller: "تواصل مع البائع",
    deleteProduct: "حذف المنتج",

    loadingError: "تعذر تحميل المنتجات",

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
      "فشل نشر المنتج. يرجى المحاولة مرة أخرى.",

    account: "الحساب",
    myProfile: "ملفي الشخصي",
    editProfile: "تعديل الملف الشخصي",
    profilePhoto: "الصورة الشخصية",
    yourName: "اسمك",
    phoneNumber: "رقم الهاتف",
    aboutBio: "نبذة عنك",
    saveProfile: "حفظ الملف الشخصي",
    profileSaved: "تم تحديث الملف الشخصي بنجاح! 🎉",

    profileRequired:
      "يرجى تسجيل الدخول لعرض ملفك الشخصي.",

    joinDate: "تاريخ الانضمام",
    phone: "الهاتف",
    email: "البريد الإلكتروني",
    bio: "نبذة",
    myListings: "إعلاناتي",
    noListings: "لا توجد إعلانات بعد.",

    viewProfile: "عرض الملف الشخصي",
    message: "رسالة",
    call: "اتصال",

    communication: "التواصل",
    messages: "الرسائل",
    noConversations: "لا توجد محادثات بعد.",
    selectConversation: "اختر محادثة",
    writeMessage: "اكتب رسالة...",
    send: "إرسال",

    profileNotFound: "لم يتم العثور على الملف الشخصي.",
    loginToMessage:
      "يرجى تسجيل الدخول لإرسال رسالة.",
    cannotMessageSelf:
      "لا يمكنك إرسال رسالة إلى نفسك.",
    messageSent: "تم إرسال الرسالة.",
    noMessages: "لا توجد رسائل بعد.",
    loading: "جاري التحميل...",
    member: "عضو",

    editProfileLogin:
      "يرجى تسجيل الدخول قبل تعديل ملفك الشخصي.",

    profileImageUploaded:
      "تم رفع الصورة الشخصية بنجاح.",

    profileImageUploadFailed:
      "تعذر رفع الصورة الشخصية."
  }

};


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

  document.body.dir =
    currentLanguage === "ar"
      ? "rtl"
      : "ltr";


  document
    .querySelectorAll("[data-i18n]")
    .forEach(element => {

      element.textContent =
        t(element.dataset.i18n);

    });


  document
    .querySelectorAll("[data-i18n-placeholder]")
    .forEach(element => {

      element.placeholder =
        t(element.dataset.i18nPlaceholder);

    });


  const languageBtn =
    document.getElementById("languageBtn");

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
Global
========================================================= */

let products = [];

let currentProfile = null;

let selectedConversationId = null;

let selectedChatUser = null;

let unsubscribeMessages = null;


/* =========================================================
DOM Ready
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    applyLanguage();


    /* =======================================================
       DOM Elements
    ======================================================= */

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


    const headerSellBtn =
      document.getElementById("headerSellBtn");

    const heroSellBtn =
      document.getElementById("heroSellBtn");


    const profileNavBtn =
      document.getElementById("profileNavBtn");

    const profileContent =
      document.getElementById("profileContent");


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

    const modalSellerPhoto =
      document.getElementById("modalSellerPhoto");

    const modalSellerName =
      document.getElementById("modalSellerName");

    const modalSellerEmail =
      document.getElementById("modalSellerEmail");

    const sellerActions =
      document.getElementById("sellerActions");


    const profileModal =
      document.getElementById("profileModal");

    const profileModalOverlay =
      document.querySelector(
        "#profileModal .profile-modal-overlay"
      );

    const closeProfileModal =
      document.getElementById("closeProfileModal");

    const profileModalContent =
      document.getElementById("profileModalContent");


    const editProfileModal =
      document.getElementById("editProfileModal");

    const editProfileModalOverlay =
      document.querySelector(
        "#editProfileModal .profile-modal-overlay"
      );

    const closeEditProfileModal =
      document.getElementById("closeEditProfileModal");

    const editProfileForm =
      document.getElementById("editProfileForm");


    const profilePhotoFile =
      document.getElementById("profilePhotoFile");

    const profileImageStatus =
      document.getElementById("profileImageStatus");

    const profileSaveStatus =
      document.getElementById("profileSaveStatus");


    const profileNameInput =
      document.getElementById("profileNameInput");

    const profilePhoneInput =
      document.getElementById("profilePhoneInput");

    const profileLocationInput =
      document.getElementById("profileLocationInput");

    const profileBioInput =
      document.getElementById("profileBioInput");

    const saveProfileBtn =
      document.getElementById("saveProfileBtn");


    const conversationList =
      document.getElementById("conversationList");

    const chatHeader =
      document.getElementById("chatHeader");

    const chatMessages =
      document.getElementById("chatMessages");

    const chatForm =
      document.getElementById("chatForm");

    const chatInput =
      document.getElementById("chatInput");


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


    function getDefaultAvatar() {

      return "https://via.placeholder.com/200x200?text=User";

    }


    function formatDate(value) {

      if (!value) {
        return t("unknown");
      }

      let date;

      if (
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

      if (Number.isNaN(date.getTime())) {
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


    /* =======================================================
       Language
    ======================================================= */

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


    /* =======================================================
       Auth Message
    ======================================================= */

    function showAuthMessage(
      message,
      success = false
    ) {

      if (!authStatus) return;

      authStatus.textContent =
        message;

      authStatus.style.color =
        success
          ? "green"
          : "red";

    }


    /* =======================================================
       Firebase Errors
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
       Profile Data
    ======================================================= */

    async function getUserProfile(uid) {

      try {

        const profileDoc =
          await getDoc(
            doc(
              db,
              "users",
              uid
            )
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


    async function createUserProfile(
      user
    ) {

      if (!user) return;

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

          email:
            user.email || "",

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

      if (!profileContent) return;

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
          <p>${escapeHTML(t("loading"))}</p>
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
                  card.dataset.profileProductId;

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
          <p>${escapeHTML(t("loading"))}</p>
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


      const user =
        {
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
                  ${escapeHTML(t("email"))}
                </span>

                <strong>
                  ${escapeHTML(
                    profile.email || ""
                  )}
                </strong>
              </div>

              <div class="public-info-item">
                <span>
                  ${escapeHTML(t("phone"))}
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
                  ${escapeHTML(t("location"))}
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
                  ${escapeHTML(t("joinDate"))}
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
                ${escapeHTML(t("bio"))}
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
                      href="tel:${escapeHTML(
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

                      ${userProducts
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


      const messageBtn =
        document.getElementById(
          "publicMessageBtn"
        );

      if (messageBtn) {

        messageBtn.addEventListener(
          "click",
          () => {

            if (
              auth.currentUser &&
              auth.currentUser.uid === uid
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
                  card.dataset.publicProductId;

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


    function closeProfileModal() {

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


    if (closeProfileModal) {

      closeProfileModal.addEventListener(
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


      profileNameInput.value =
        profile.name || "";

      profilePhoneInput.value =
        profile.phone || "";

      profileLocationInput.value =
        profile.location || "";

      profileBioInput.value =
        profile.bio || "";


      profileImageStatus.textContent =
        "";

      profileSaveStatus.textContent =
        "";


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
       Cloudinary Upload
    ======================================================= */

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
       Profile Photo Preview
    ======================================================= */

    if (profilePhotoFile) {

      profilePhotoFile.addEventListener(
        "change",
        () => {

          const file =
            profilePhotoFile.files[0];

          if (!file) {
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

            profilePhotoFile.value = "";

            return;

          }

          if (
            !file.type.startsWith("image/")
          ) {

            profileImageStatus.textContent =
              t("validImage");

            profileImageStatus.style.color =
              "red";

            profilePhotoFile.value = "";

            return;

          }

          profileImageStatus.textContent =
            file.name;

          profileImageStatus.style.color =
            "green";

        }
      );

    }


    /* =======================================================
       Save Profile
    ======================================================= */

    if (editProfileForm) {

      editProfileForm.addEventListener(
        "submit",
        async event => {

          event.preventDefault();


          const user =
            auth.currentUser;


          if (!user) {

            profileSaveStatus.textContent =
              t("editProfileLogin");

            profileSaveStatus.style.color =
              "red";

            return;

          }


          saveProfileBtn.disabled =
            true;

          saveProfileBtn.textContent =
            currentLanguage === "ar"
              ? "جاري الحفظ..."
              : "Saving...";


          try {

            let photoURL =
              currentProfile?.photoURL ||
              "";


            const file =
              profilePhotoFile
                ? profilePhotoFile.files[0]
                : null;


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
              await getDoc(profileRef);


            const oldData =
              existing.exists()
                ? existing.data()
                : {};


            await setDoc(
              profileRef,
              {

                uid:
                  user.uid,

                name:
                  profileNameInput.value.trim(),

                phone:
                  profilePhoneInput.value.trim(),

                email:
                  user.email || "",

                location:
                  profileLocationInput.value.trim(),

                bio:
                  profileBioInput.value.trim(),

                photoURL:
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


            profileSaveStatus.textContent =
              t("profileSaved");

            profileSaveStatus.style.color =
              "green";


            if (profilePhotoFile) {
              profilePhotoFile.value = "";
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

            profileSaveStatus.textContent =
              error.message ||
              t("publishFailed");

            profileSaveStatus.style.color =
              "red";

          } finally {

            saveProfileBtn.disabled =
              false;

            saveProfileBtn.textContent =
              t("saveProfile");

          }

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

            imageStatus.textContent =
              "";

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


    /* =======================================================
       Product Modal
    ======================================================= */

    function closeProductDetails() {

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

      if (!product) {
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


      const sellerProfile =
        await getUserProfile(
          product.sellerId
        );


      modalSellerPhoto.src =
        sellerProfile?.photoURL ||
        getDefaultAvatar();


      modalSellerName.textContent =
        sellerProfile?.name ||
        product.sellerEmail ||
        t("sellerUnavailable");


      modalSellerEmail.textContent =
        sellerProfile?.email ||
        product.sellerEmail ||
        "";


      sellerActions.innerHTML =
        "";


      const currentUser =
        auth.currentUser;


      if (
        currentUser &&
        product.sellerId ===
        currentUser.uid
      ) {

        const viewProfileButton =
          document.createElement("button");

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

            openPublicProfile(
              product.sellerId
            );

          }
        );


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
          viewProfileButton
        );

        sellerActions.appendChild(
          deleteButton
        );


      } else {

        const viewProfileButton =
          document.createElement("button");

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

            openPublicProfile(
              product.sellerId
            );

          }
        );


        const messageButton =
          document.createElement("button");

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


            closeProductDetails();

            startConversation(
              product.sellerId
            );

          }
        );


        sellerActions.appendChild(
          viewProfileButton
        );

        sellerActions.appendChild(
          messageButton
        );


        if (sellerProfile?.phone) {

          const callLink =
            document.createElement("a");

          callLink.className =
            "contact-seller-btn";

          callLink.href =
            `tel:${sellerProfile.phone}`;

          callLink.textContent =
            `📞 ${t("call")}`;

          sellerActions.appendChild(
            callLink
          );

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

        alert(t("deleted"));

        await loadProducts();


        if (auth.currentUser) {
          await renderMyProfile();
        }


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
              ${escapeHTML(
                t("noProducts")
              )}
            </h3>

            <p>
              ${escapeHTML(
                t("tryAnother")
              )}
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
                      ${escapeHTML(
                        t("viewDetails")
                      )}
                    </button>

                  </div>

                </article>

              `;

            }
          )
          .join("");


      addProductEvents();

    }


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

                const product =
                  products.find(
                    item =>
                      item.id ===
                      button.dataset.id
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

      productsContainer.innerHTML = `

        <div class="empty-state">

          <div>⏳</div>

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

        const productsQuery =
          query(
            collection(
              db,
              "products"
            ),
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


        if (auth.currentUser) {
          renderMyProfile();
        }


      } catch (error) {

        console.error(
          "Firestore loading error:",
          error
        );


        productsContainer.innerHTML = `

          <div class="empty-state">

            <div>⚠️</div>

            <h3>
              ${escapeHTML(
                t("loadingError")
              )}
            </h3>

            <p>
              ${escapeHTML(
                t("firestoreError")
              )}
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
              title.includes(searchText) ||
              category.includes(searchText) ||
              location.includes(searchText);


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

              if (categorySelect) {

                categorySelect.value =
                  card.dataset.category;

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

            const credential =
              await createUserWithEmailAndPassword(
                auth,
                email,
                password
              );


            await createUserProfile(
              credential.user
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

      const user =
        auth.currentUser;


      if (!user) {

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
       Profile Navigation
    ======================================================= */

    if (profileNavBtn) {

      profileNavBtn.addEventListener(
        "click",
        event => {

          if (!auth.currentUser) {

            event.preventDefault();

            alert(
              t("profileRequired")
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

          setTimeout(
            () => {
              renderMyProfile();
            },
            100
          );

        }
      );

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
                  imageFile,
                  imageStatus
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
                  serverTimestamp()

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
       MESSENGER
    ======================================================= */

    function createConversationId(
      uid1,
      uid2
    ) {

      return [uid1, uid2]
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


      if (
        currentUser.uid ===
        otherUid
      ) {

        alert(
          t("cannotMessageSelf")
        );

        return;

      }


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


      chatHeader.innerHTML = `

        <img
          src="${escapeHTML(
            selectedChatUser.photoURL
          )}"
          class="conversation-avatar"
          alt=""
        >

        <span>
          ${escapeHTML(
            selectedChatUser.name
          )}
        </span>

      `;


      chatMessages.innerHTML = "";


      document
        .getElementById(
          "messages"
        )
        ?.scrollIntoView({
          behavior: "smooth"
        });


      listenToMessages();


      await loadConversations();

    }


    function listenToMessages() {

      if (unsubscribeMessages) {

        unsubscribeMessages();

        unsubscribeMessages =
          null;

      }


      if (
        !selectedConversationId
      ) {

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
          ),
          orderBy(
            "createdAt",
            "asc"
          )
        );


      unsubscribeMessages =
        onSnapshot(
          messagesQuery,
          snapshot => {

            chatMessages.innerHTML =
              "";


            if (
              snapshot.empty
            ) {

              chatMessages.innerHTML = `

                <div class="chat-empty">

                  💬

                  <p>
                    ${escapeHTML(
                      t("noMessages")
                    )}
                  </p>

                </div>

              `;

              return;

            }


            snapshot.forEach(
              messageDoc => {

                const message =
                  messageDoc.data();


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

          }
        );

    }


    function formatDateTime(
      value
    ) {

      if (!value) {
        return "";
      }


      const date =
        typeof value.toDate ===
        "function"
          ? value.toDate()
          : new Date(value);


      if (
        Number.isNaN(
          date.getTime()
        )
      ) {

        return "";

      }


      return date.toLocaleString(
        currentLanguage === "ar"
          ? "ar-SA"
          : "en-US",
        {
          hour: "numeric",
          minute: "2-digit"
        }
      );

    }


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
            chatInput.value.trim();


          if (!text) {
            return;
          }


          chatInput.disabled =
            true;


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

                text:
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
                    currentUser.email || "",

                  [selectedChatUser.uid]:
                    selectedChatUser.email || ""
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


            chatInput.value =
              "";


            await loadConversations();


          } catch (error) {

            console.error(
              "Send message error:",
              error
            );

          } finally {

            chatInput.disabled =
              false;

            chatInput.focus();

          }

        }
      );

    }


    /* =======================================================
       Load Conversations
    ======================================================= */

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
            ),
            orderBy(
              "updatedAt",
              "desc"
            )
          );


        const snapshot =
          await getDocs(
            conversationsQuery
          );


        conversationList.innerHTML =
          "";


        if (
          snapshot.empty
        ) {

          conversationList.innerHTML = `

            <div class="chat-empty">

              💬

              <p>
                ${escapeHTML(
                  t("noConversations")
                )}
              </p>

            </div>

          `;

          return;

        }


        for (
          const conversationDoc
          of snapshot.docs
        ) {

          const conversation =
            conversationDoc.data();


          const otherUid =
            conversation.participants.find(
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
            conversationDoc.id
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

            ⚠️

            <p>
              ${escapeHTML(
                t("firestoreError")
              )}
            </p>

          </div>

        `;

      }

    }


    /* =======================================================
       Auth State
    ======================================================= */

    onAuthStateChanged(
      auth,
      async user => {

        if (user) {

          console.log(
            "Logged in user:",
            user.email
          );


          await createUserProfile(
            user
          );


          currentProfile =
            await getUserProfile(
              user.uid
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


            loginForm.parentNode.insertBefore(
              logoutBtn,
              loginForm
            );


            logoutBtn.addEventListener(
              "click",
              async () => {

                try {

                  if (
                    unsubscribeMessages
                  ) {

                    unsubscribeMessages();

                    unsubscribeMessages =
                      null;

                  }


                  await signOut(
                    auth
                  );


                  alert(
                    t("loggedOut")
                  );


                  location.reload();


                } catch (error) {

                  console.error(
                    error
                  );

                }

              }
            );

          }


          logoutBtn.textContent =
            t("logout");


          await renderMyProfile();

          await loadConversations();


        } else {

          const logoutBtn =
            document.getElementById(
              "logoutBtn"
            );


          if (logoutBtn) {
            logoutBtn.remove();
          }


          if (profileContent) {

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

          }


          loadConversations();

        }

      }
    );


    /* =======================================================
       Escape Key
    ======================================================= */

    document.addEventListener(
      "keydown",
      event => {

        if (
          event.key !==
          "Escape"
        ) {

          return;

        }


        if (
          productModal.classList.contains(
            "active"
          )
        ) {

          closeProductDetails();

        }


        if (
          profileModal.classList.contains(
            "active"
          )
        ) {

          closeProfileModal();

        }


        if (
          editProfileModal.classList.contains(
            "active"
          )
        ) {

          closeEditProfile();

        }

      }
    );


    /* =======================================================
       Initial Load
    ======================================================= */

    loadProducts();

  }
);

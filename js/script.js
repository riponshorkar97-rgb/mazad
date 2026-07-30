// ==========================
// MAZAD - Script v1
// ==========================

console.log("Mazad Loaded Successfully");

// Category Click
const categories = document.querySelectorAll(".category-card");

categories.forEach((card) => {
    card.addEventListener("click", () => {
        alert("Category: " + card.innerText);
    });
});

// Bottom Navigation Active
const navLinks = document.querySelectorAll(".bottom-nav a");

navLinks.forEach((link) => {
    link.addEventListener("click", function () {

        navLinks.forEach((item) => {
            item.style.color = "#9ca3af";
        });

        this.style.color = "#1e88e5";
    });
});

// Search
const searchInput = document.querySelector(".search-box input");

searchInput.addEventListener("keyup", function () {
    console.log("Searching:", this.value);
});

/* =================================
   MAZAD PREMIUM JAVASCRIPT
   VERSION 2.0
================================= */


// App Loaded

document.addEventListener("DOMContentLoaded", () => {

    console.log("Mazad Premium Loaded");


    /* =========================
       Favorite Button
    ========================= */


    const favoriteButtons = document.querySelectorAll(".favorite-btn");


    favoriteButtons.forEach(button => {


        button.addEventListener("click", () => {


            const icon = button.querySelector("i");


            icon.classList.toggle("fa-regular");

            icon.classList.toggle("fa-solid");



            if(icon.classList.contains("fa-solid")){

                icon.style.color = "#ff3b5c";

            }else{

                icon.style.color = "#ffffff";

            }



        });



    });





    /* =========================
       Search
    ========================= */


    const searchInput = document.querySelector(".premium-search input");


    if(searchInput){


        searchInput.addEventListener("keyup", function(){


            let value = this.value.trim();


            console.log("Searching:", value);



        });



    }





    /* =========================
       Bottom Navigation
    ========================= */


    const navItems = document.querySelectorAll(".bottom-navigation a");



    navItems.forEach(item => {


        item.addEventListener("click", function(){



            navItems.forEach(nav => {


                nav.classList.remove("active");


            });



            this.classList.add("active");



        });



    });






    /* =========================
       Category Click
    ========================= */


    const categories = document.querySelectorAll(".category-card");



    categories.forEach(category => {


        category.addEventListener("click",()=>{


            let name = category.innerText;


            console.log("Category:",name);



        });



    });




});

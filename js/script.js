/* =================================
   MAZAD PREMIUM JAVASCRIPT
   VERSION 3.0
================================= */


document.addEventListener("DOMContentLoaded", () => {


    console.log("Mazad v3 Loaded");



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

                icon.style.color="#ff3b5c";

            }else{

                icon.style.color="#ffffff";

            }


        });


    });





    /* =========================
       Banner Slider
    ========================= */


    const banners = document.querySelectorAll(".banner-card");

    const dots = document.querySelectorAll(".dot");


    let currentBanner = 0;



    function showBanner(index){


        banners.forEach((banner)=>{

            banner.classList.remove("active");

        });



        dots.forEach((dot)=>{

            dot.classList.remove("active");

        });



        if(banners[index]){

            banners[index].classList.add("active");

        }



        if(dots[index]){

            dots[index].classList.add("active");

        }


    }




    if(banners.length > 0){


        setInterval(()=>{


            currentBanner++;


            if(currentBanner >= banners.length){

                currentBanner = 0;

            }


            showBanner(currentBanner);



        },4000);



    }





    /* =========================
       Search
    ========================= */


    const searchInput =
    document.querySelector(".premium-search input");



    if(searchInput){


        searchInput.addEventListener("input",()=>{


            console.log(
                "Search:",
                searchInput.value
            );


        });


    }





    /* =========================
       Bottom Navigation
    ========================= */


    const navItems =
    document.querySelectorAll(".bottom-navigation a");



    navItems.forEach(item=>{


        item.addEventListener("click",()=>{


            navItems.forEach(nav=>{

                nav.classList.remove("active");

            });


            item.classList.add("active");


        });


    });




});

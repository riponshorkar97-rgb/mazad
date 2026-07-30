/* =================================
   MAZAD MARKETPLACE JAVASCRIPT
   VERSION 4.0
================================= */


document.addEventListener("DOMContentLoaded", () => {


    console.log("Mazad v4 Loaded");



    /* =========================
       PRODUCT DATABASE
    ========================= */


    const products = [


        {
            id:1,
            title:"Toyota Land Cruiser 2024",
            price:"SAR 215,000",
            location:"Riyadh",
            category:"Cars",
            image:"https://picsum.photos/600/400?1",
            seller:"Ahmed",
            verified:true
        },


        {
            id:2,
            title:"Luxury Apartment",
            price:"SAR 850,000",
            location:"Jeddah",
            category:"Real Estate",
            image:"https://picsum.photos/600/400?2",
            seller:"Mohammed",
            verified:true
        },


        {
            id:3,
            title:"iPhone 16 Pro Max",
            price:"SAR 4,500",
            location:"Dammam",
            category:"Electronics",
            image:"https://picsum.photos/600/400?3",
            seller:"Ali",
            verified:false
        },


        {
            id:4,
            title:"Modern Sofa Set",
            price:"SAR 2,000",
            location:"Riyadh",
            category:"Furniture",
            image:"https://picsum.photos/600/400?4",
            seller:"Saleh",
            verified:true
        }


    ];





    /* =========================
       RENDER PRODUCTS
    ========================= */


    const listingContainer =
    document.querySelector(".listing-grid");



    function displayProducts(items){


        if(!listingContainer) return;



        listingContainer.innerHTML="";



        items.forEach(product=>{


            listingContainer.innerHTML += `


            <div class="listing-card">


                <div class="image-box">


                    <img src="${product.image}"
                    alt="${product.title}">


                    <button class="favorite-btn">

                    <i class="fa-regular fa-heart"></i>

                    </button>


                </div>



                <div class="listing-info">


                    <h3>
                    ${product.title}
                    </h3>


                    <h4>
                    ${product.price}
                    </h4>


                    <p>
                    <i class="fa-solid fa-location-dot"></i>
                    ${product.location}
                    </p>


                    <p>
                    Seller: ${product.seller}
                    </p>



                    ${
                    product.verified
                    ?
                    `<span class="verified">
                    ✔ Verified Seller
                    </span>`
                    :
                    ""
                    }



                </div>


            </div>


            `;


        });



        favoriteSystem();


    }




    displayProducts(products);






    /* =========================
       SEARCH FILTER
    ========================= */


    const searchInput =
    document.querySelector(".premium-search input");



    if(searchInput){


        searchInput.addEventListener("input",()=>{


            const value =
            searchInput.value.toLowerCase();



            const filtered =
            products.filter(product=>

                product.title
                .toLowerCase()
                .includes(value)

                ||

                product.category
                .toLowerCase()
                .includes(value)

                ||

                product.location
                .toLowerCase()
                .includes(value)


            );



            displayProducts(filtered);



        });


    }







    /* =========================
       FAVORITE SYSTEM
    ========================= */


    function favoriteSystem(){


        const buttons =
        document.querySelectorAll(".favorite-btn");



        buttons.forEach(button=>{


            button.addEventListener("click",()=>{


                const icon =
                button.querySelector("i");



                icon.classList.toggle("fa-regular");

                icon.classList.toggle("fa-solid");



                if(icon.classList.contains("fa-solid")){

                    icon.style.color="#ff3b5c";

                }

                else{

                    icon.style.color="#fff";

                }



            });



        });



    }








    /* =========================
       BANNER SLIDER
    ========================= */


    const banners =
    document.querySelectorAll(".banner-card");


    const dots =
    document.querySelectorAll(".dot");


    let currentBanner=0;



    function changeBanner(){


        banners.forEach(b=>

            b.classList.remove("active")

        );


        dots.forEach(d=>

            d.classList.remove("active")

        );



        if(banners[currentBanner]){

            banners[currentBanner]
            .classList.add("active");

        }


        if(dots[currentBanner]){

            dots[currentBanner]
            .classList.add("active");

        }



        currentBanner++;



        if(currentBanner >= banners.length){

            currentBanner=0;

        }



    }



    if(banners.length){

        setInterval(changeBanner,4000);

    }





});

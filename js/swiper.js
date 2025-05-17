const swiper = new Swiper(".mySwiper", {
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
        clickable: true,
    },
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
});




document.addEventListener("DOMContentLoaded", function () {
    new Swiper(".slide_product", {
        slidesPerView: 5,
        spaceBetween: 20,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        breakpoints: {
            1400: { slidesPerView: 5, spaceBetween: 20 },
            1200: { slidesPerView: 4, spaceBetween: 15 },
            790: { slidesPerView: 3 },
            300: { slidesPerView: 2, spaceBetween: 10 },
        },
        loop: true,
    });
});



function open_Categ_List() {
    const list = document.querySelector(".category_nav_list")
    list.classList.toggle("active")
}




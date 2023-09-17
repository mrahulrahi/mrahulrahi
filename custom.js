var swiper = new Swiper(".projectSwiper", {
    effect: "fade",
    freeMode: true,
    autoplay: {
        delay: 3000,
    },
    slidePerView: 1,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

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


gsap.registerPlugin(ScrollTrigger);

let roomBlock = gsap.matchMedia();
roomBlock.add("(min-width:991.98px)", () => {
    const roomPanels = gsap.utils.toArray("section");
    roomPanels.forEach((panel) => {
        gsap.to(panel, {
            // ease: 'power4.inOut',
            scrollTrigger: {
                trigger: panel,
                pin: true,
                pinSpacing: false,
                start: "top top",
                end: "top top",
                endTrigger: "contact-me",
                // markers: true,
            },
        });
    });
});
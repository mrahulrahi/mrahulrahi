var $ = jQuery.noConflict();

jQuery(document).ready(function ($) {

  /*==========================*/
  /* Scroll on animate */
  /*==========================*/
  function onScrollInit(items, trigger) {
    items.each(function () {
      var osElement = $(this),
        osAnimationClass = osElement.attr('data-os-animation'),
        osAnimationDelay = osElement.attr('data-os-animation-delay');
      osElement.css({
        '-webkit-animation-delay': osAnimationDelay,
        '-moz-animation-delay': osAnimationDelay,
        'animation-delay': osAnimationDelay
      });
      var osTrigger = (trigger) ? trigger : osElement;
      osTrigger.waypoint(function () {
        osElement.addClass('animated').addClass(osAnimationClass);
      }, {
        triggerOnce: true,
        offset: '95%',
      });
      // osElement.removeClass('fadeInUp');
    });
  }
  onScrollInit($('.os-animation'));
  onScrollInit($('.staggered-animation'), $('.staggered-animation-container'));


  /*==========================*/
  /* Header fix */
  /*==========================*/
  var scroll = $(window).scrollTop();
  if (scroll >= 10) {
    $("body").addClass("fixed");
  } else {
    $("body").removeClass("fixed");
  }


});


$(window).scroll(function () {
  var scroll = $(window).scrollTop();
  if (scroll >= 10) {
    $("body").addClass("fixed");
  } else {
    $("body").removeClass("fixed");
  }
});


$('.navbar-toggler').on('click', function () {
  $('body').toggleClass('show-menu overflow-hidden');
});


/************** Blog Card Swiper Start **************/
if ($('.testimonials-list-slider').length > 0) {
  var portfolioSwiper = new Swiper(".testimonials-list-slider", {
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: {
      delay: 1000,
  },
    loop:true,

    breakpoints: {
      376: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 30,
      }
    }
  });
}
/************** Blog Card Swiper End **************/


var swiper = new Swiper(".project-list-slider", {
  autoplay: {
      delay: 3000,
  },
  loop:true,
  slidePerView: 3,
  spaceBetween: 30,
  navigation: {
    nextEl: ".testimonials-arrow-next",
    prevEl: ".testimonials-arrow-prev",
  },
});

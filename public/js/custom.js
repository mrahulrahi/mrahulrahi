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



if ($(".projects-card-list-slider").length > 0) {
  var projectsCardSwiper = new Swiper(".projects-card-list-slider", {
    slidesPerView: 'auto',
    spaceBetween: 30,
    navigation: {
      nextEl: ".projects-arrow-next",
      prevEl: ".projects-arrow-prev",
    },
  });
}

/************** Blog Card Swiper Start **************/
if ($(".skill-card-list-slider").length > 0) {
  var skillCardSwiper = new Swiper(".skill-card-list-slider", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 1000,
    },
    breakpoints: {
      375: {
        slidesPerView: 2,
      },
      576: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
      },
      992: {
        slidesPerView: 5,
      },
      1200: {
        slidesPerView: 6,
      }
    }
  });
}
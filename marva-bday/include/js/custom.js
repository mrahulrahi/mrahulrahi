/*!
 * The Final Countdown for jQuery v2.1.0 (http://hilios.github.io/jQuery.countdown/)
 * Copyright (c) 2015 Edson Hilios
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){"use strict";function b(a){if(a instanceof Date)return a;if(String(a).match(g))return String(a).match(/^[0-9]*$/)&&(a=Number(a)),String(a).match(/\-/)&&(a=String(a).replace(/\-/g,"/")),new Date(a);throw new Error("Couldn't cast `"+a+"` to a date object.")}function c(a){var b=a.toString().replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1");return new RegExp(b)}function d(a){return function(b){var d=b.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);if(d)for(var f=0,g=d.length;g>f;++f){var h=d[f].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),j=c(h[0]),k=h[1]||"",l=h[3]||"",m=null;h=h[2],i.hasOwnProperty(h)&&(m=i[h],m=Number(a[m])),null!==m&&("!"===k&&(m=e(l,m)),""===k&&10>m&&(m="0"+m.toString()),b=b.replace(j,m.toString()))}return b=b.replace(/%%/,"%")}}function e(a,b){var c="s",d="";return a&&(a=a.replace(/(:|;|\s)/gi,"").split(/\,/),1===a.length?c=a[0]:(d=a[0],c=a[1])),1===Math.abs(b)?d:c}var f=[],g=[],h={precision:100,elapse:!1};g.push(/^[0-9]*$/.source),g.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),g.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),g=new RegExp(g.join("|"));var i={Y:"years",m:"months",n:"daysToMonth",w:"weeks",d:"daysToWeek",D:"totalDays",H:"hours",M:"minutes",S:"seconds"},j=function(b,c,d){this.el=b,this.$el=a(b),this.interval=null,this.offset={},this.options=a.extend({},h),this.instanceNumber=f.length,f.push(this),this.$el.data("countdown-instance",this.instanceNumber),d&&("function"==typeof d?(this.$el.on("update.countdown",d),this.$el.on("stoped.countdown",d),this.$el.on("finish.countdown",d)):this.options=a.extend({},h,d)),this.setFinalDate(c),this.start()};a.extend(j.prototype,{start:function(){null!==this.interval&&clearInterval(this.interval);var a=this;this.update(),this.interval=setInterval(function(){a.update.call(a)},this.options.precision)},stop:function(){clearInterval(this.interval),this.interval=null,this.dispatchEvent("stoped")},toggle:function(){this.interval?this.stop():this.start()},pause:function(){this.stop()},resume:function(){this.start()},remove:function(){this.stop.call(this),f[this.instanceNumber]=null,delete this.$el.data().countdownInstance},setFinalDate:function(a){this.finalDate=b(a)},update:function(){if(0===this.$el.closest("html").length)return void this.remove();var b,c=void 0!==a._data(this.el,"events"),d=new Date;b=this.finalDate.getTime()-d.getTime(),b=Math.ceil(b/1e3),b=!this.options.elapse&&0>b?0:Math.abs(b),this.totalSecsLeft!==b&&c&&(this.totalSecsLeft=b,this.elapsed=d>=this.finalDate,this.offset={seconds:this.totalSecsLeft%60,minutes:Math.floor(this.totalSecsLeft/60)%60,hours:Math.floor(this.totalSecsLeft/60/60)%24,days:Math.floor(this.totalSecsLeft/60/60/24)%7,daysToWeek:Math.floor(this.totalSecsLeft/60/60/24)%7,daysToMonth:Math.floor(this.totalSecsLeft/60/60/24%30.4368),totalDays:Math.floor(this.totalSecsLeft/60/60/24),weeks:Math.floor(this.totalSecsLeft/60/60/24/7),months:Math.floor(this.totalSecsLeft/60/60/24/30.4368),years:Math.abs(this.finalDate.getFullYear()-d.getFullYear())},this.options.elapse||0!==this.totalSecsLeft?this.dispatchEvent("update"):(this.stop(),this.dispatchEvent("finish")))},dispatchEvent:function(b){var c=a.Event(b+".countdown");c.finalDate=this.finalDate,c.elapsed=this.elapsed,c.offset=a.extend({},this.offset),c.strftime=d(this.offset),this.$el.trigger(c)}}),a.fn.countdown=function(){var b=Array.prototype.slice.call(arguments,0);return this.each(function(){var c=a(this).data("countdown-instance");if(void 0!==c){var d=f[c],e=b[0];j.prototype.hasOwnProperty(e)?d[e].apply(d,b.slice(1)):null===String(e).match(/^[$A-Z_][0-9A-Z_$]*$/i)?(d.setFinalDate.call(d,e),d.start()):a.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi,e))}else new j(this,b[0],b[1])})}});

jQuery(document).ready(function($){
/*==========================*/
/* Countdown */	
/*==========================*/

$(".clock").countdown('2023/12/26', function(event) {
  $(this).html(event.strftime('<div class="timer-box"><span>%D</span><b>days</b></div><div class="timer-box"><span>%H</span><b>hours</b></div><div class="timer-box"><span>%M</span><b>minutes</b></div><div class="timer-box"><span>%S</span><b>seconds</b></div>'));
});

});

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);


/************** Smooth Scroll Intialisation start **************/
// Create a media condition that targets viewports at least 768px wide
const mediaQuery = window.matchMedia('(min-width: 1px)')
// Check if the media query is true
if (mediaQuery.matches) { 
  let smoother = ScrollSmoother.create({ 
    smooth: 2,
    normalizeScroll: true, 
    effects: true, 
  });
}
/************** Smooth Scroll Intialisation end **************/

ScrollTrigger.matchMedia({
  // desktop
    "(min-width: 768px)": function() {

    /************** Fix header start **************/
    gsap.utils.toArray(".fix-header").forEach((header) => {
      ScrollTrigger.create({
        trigger: header,
        start: "top top",
        endTrigger:'main',
        end:"bottom bottom", 
        pin: true, 
        pinSpacing: false,
        scrub: true,
        toggleClass: 'active',
        toggleActions: "play none reverse none",
        invalidateOnRefresh: true, 
       //markers:true,
      });
    });
    /************** Fix header end **************/


    /************** Animation on scroll for ipad and dekstop view start **************/
    gsap.utils.toArray('.animate-child').forEach(animateChild => {
    gsap.to(animateChild, { 
      scrollTrigger: {
          trigger: animateChild, 
          start: 'top 80%', 
          once: true,
          toggleClass:'trigger', 
        }
      });
    });
    /************** Animation on scroll for ipad and dekstop view end **************/
    /************** Service page animation on scroll for Services blocks start **************/
    const headerHeight  = document.getElementById("header").offsetHeight - 1;
    gsap.utils.toArray(".service-details-container:not(.last)").forEach((serviceBlock) => {
      ScrollTrigger.create({
        trigger: serviceBlock,
        start: `top ${headerHeight}`,
        end: `bottom ${headerHeight}`, 
        pin: true, 
        pinSpacing: false,
        scrub: true,
        toggleClass: 'active',
        toggleActions: "play none reverse none",
        invalidateOnRefresh: true, 
      });
    });
    /************** Service page animation on scroll for Services blocks end **************/

  }, 
  // mobile
  "(max-width: 767px)": function() {
    /************** Animation on scroll for mobile view start **************/
    gsap.utils.toArray('.animate-child').forEach(animateChild => {
      gsap.to(animateChild, { 
      scrollTrigger: {
          trigger: animateChild, 
          start: 'top 100%', 
          once: true,
          toggleClass:'trigger',
        }
      });
    });
    /************** Animation on scroll for mobile view end **************/

      /************** Animate large text behind heading on mobile view start **************/
      gsap.utils.toArray('.heading-large h2').forEach(largeTextMob => {
        gsap.to(largeTextMob, {
            y: '-50%',
            ease: 'linear',
            scrollTrigger: {
              trigger: largeTextMob,
              start: 'top bottom',
              scrub: true,
              }
          });
      });
      /************** Animate large text behind heading on mobile view start **************/
  
  }
});

/************** Scroll to script for Home hero start **************/
if(document.querySelector("#btn-hero")){
  const scrollButton = document.querySelector('#btn-hero');
  const sectionCases = document.querySelector('#featured-work');
  scrollButton.addEventListener('click', () => {
    console.warn(sectionCases);
    gsap.to(window, {
      duration: 0.5,
      scrollTo: sectionCases
    });
  });
}
/************** Scroll to script for Home hero end **************/

/************** Swiper js script for all sliders start **************/
/* Testimonial slider */
if(document.querySelector(".testimonial-slider")){
  var swiper = new Swiper(".testimonial-slider", {
  slidesPerView: "auto",
  centeredSlides: false,
  spaceBetween: 80, 
  loop:false,  
  slideToClickedSlide:true,
  keyboard: {
    enabled: true,
  },
  breakpoints: {
    320: {
    spaceBetween: 10,
    centeredSlides: false,
    },
    768: { 
    spaceBetween: 80,
    centeredSlides: true,
    } 
  }
});
}

/* Slider for mobile view only */
if(document.querySelector(".mobile-slider")){
var init = false;
var swiperMob;
function mobSlider() {
  if (window.innerWidth <= 767) {
    if (!init) {
      init = true;
      swiper = new Swiper(".mobile-slider", { 
        slidesPerView: "auto",
        centeredSlides: false,
        spaceBetween: 40, 
        loop:false, 
      });
    }
  } else if (init) {
    swiperMob.destroy();
    init = false;
  }
}
mobSlider();
window.addEventListener("resize", mobSlider);

}

/************** Swiper js script for all sliders end **************/



/************** Add class to body when navigation open below 1200px screensize start **************/
document.querySelector(".navbar-toggler").addEventListener("click", function(){
  document.querySelector("body").classList.toggle("nav-open");
});
 
/************** Add class to body when navigation open below 1200px screensize end **************/

/************** Add class to body when user start to scroll**************/
window.onscroll = function() {
  fixHeader()
};
var body = document.getElementsByTagName("body")[0];
var sticky = body.offsetTop + 10;

function fixHeader() {
  if (window.pageYOffset > sticky) {
      body.classList.add("fixed");
  } else {
      body.classList.remove("fixed");
  }
}
/************** Add class to body when user start to scroll**************/


/************** Bootstrap form validation start **************/
// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
'use strict'

// Fetch all the forms we want to apply custom Bootstrap validation styles to
const forms = document.querySelectorAll('.needs-validation')

// Loop over them and prevent submission
Array.from(forms).forEach(form => {
form.addEventListener('submit', event => {
if (!form.checkValidity()) {
event.preventDefault()
event.stopPropagation()
}

form.classList.add('was-validated')
}, false)
})
})();
/************** Bootstrap form validation end **************/



/************** Script for text marquee start **************/
if(document.querySelector(".text-marquee")){


  let loops = gsap.utils.toArray('.text-marquee-wrapper').map((line, i) => {
    const links = line.querySelectorAll(".marquee-text");
    return horizontalLoop(links, {
        repeat: -1, 
        speed: 0.5,
        reversed: false,
        paddingRight: parseFloat(gsap.getProperty(links[0], "marginRight", "px"))
    });
  });
  
  let currentScroll = 0;
  let scrollDirection = 1;
  
  window.addEventListener("scroll", () => {
  let direction = (window.pageYOffset > currentScroll) ? 1 : -1;
  if (direction !== scrollDirection) {
      loops.forEach(tl => {
          gsap.to(tl, {timeScale: direction, overwrite: true});
      });
      scrollDirection = direction;
  }
  currentScroll = window.pageYOffset;
  });
  
  
  /*
  This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.
  
  Features:
  - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
  - When each item animates to the left or right enough, it will loop back to the other side
  - Optionally pass in a config object with values like "speed" (default: 1, which travels at roughly 100 pixels per second), paused (boolean),  repeat, reversed, and paddingRight.
  - The returned timeline will have the following methods added to it:
   - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
   - current() - returns the current index (if an animation is in-progress, it reflects the final index)
   - times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
  */
  function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({repeat: config.repeat, paused: config.paused, defaults: {ease: "none"}, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)}),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    totalWidth, curX, distanceToStart, distanceToLoop, item, i;
  gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
    xPercent: (i, el) => {
      let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
      xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
      return xPercents[i];
    }
  });
  gsap.set(items, {x: 0});
  totalWidth = items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + items[length-1].offsetWidth * gsap.getProperty(items[length-1], "scaleX") + (parseFloat(config.paddingRight) || 0);
  for (i = 0; i < length; i++) {
    item = items[i];
    curX = xPercents[i] / 100 * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
    tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
      .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }
  function toIndex(index, vars) {
    vars = vars || {};
    (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
      vars.modifiers = {time: gsap.utils.wrap(0, tl.duration())};
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }
  tl.next = vars => toIndex(curIndex+1, vars);
  tl.previous = vars => toIndex(curIndex-1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.times = times;
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  return tl;
  }
  
}
/************** Script for text marquee end **************/




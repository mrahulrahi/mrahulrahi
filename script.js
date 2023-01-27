var hamburger = document.querySelector(".hamburger");
var nav = document.querySelector("nav");
hamburger.addEventListener("click", function () {
  nav.classList.toggle("slide");
});
// bagian navbar ketika diklik akan menghapus class active
// dan menambahkan class active
var ul = document.querySelector("ul");
var li_a = document.querySelectorAll("li a");

li_a.forEach((el) => {
  el.addEventListener("click", function () {
    ul.querySelector(".active").classList.remove("active");
    el.classList.add("active");
  });
});
// ketika navbar discroll
var logo = document.querySelector(".logo");
var lbr = document.querySelector(".logo::before");
window.addEventListener("scroll", function () {
  var windowPosition = window.scrollY > 100;
  logo.classList.toggle("zoom", windowPosition);
});

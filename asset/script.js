// bagian navbar ketika responsive akan memunculkan nav
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
// popUp
function popUp() {
  if (popUp) {
    confirm("COMING SOON GUYS!");
  }
}
// bagian kontak
const scriptURL = "https://script.google.com/macros/s/AKfycbwZ1UOuntNm_ytbFLVXAjRnhLMYer-90B9K-KzTdCgEvZf_98jXtu2hqdhBXbSyFyQpQQ/exec";
const form = document.forms["Kontak-Website"];
const kirim = document.getElementById("submit");
const loading = document.querySelector(".btn-loading");
const alert = document.querySelector(".alert");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // menghilangkan kirim
  // memnunculkan loading
  kirim.style.display = "none";
  loading.style.display = "flex";
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      // menhilangkan loading
      // memunculkan kirim
      // memunculkan alert
      kirim.style.display = "flex";
      loading.style.display = "none";
      alert.style.display = "flex";
      setTimeout(function () {
        alert.style.display = "none";
      }, 2000);
      form.reset();
      console.log("Success!", response);
    })
    .catch((error) => console.error("Error!", error.message));
});

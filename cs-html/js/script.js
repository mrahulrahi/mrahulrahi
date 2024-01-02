import myJson from "../json/categories.json" assert { type: "json" };
let menu = myJson.menu;
console.log(menu);

$(function () {
  // Same as document.addEventListener("DOMContentLoaded"...

  // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
  $("#navbarToggle").blur(function (event) {
    let screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse("hide");
    }
  });

  // In Firefox and Safari, the click event doesn't retain the focus
  // on the clicked button. Therefore, the blur event will not fire on
  // user clicking somewhere else in the page and the blur event handler
  // which is set up above will not be called.
  // Refer to issue #28 in the repo.
  // Solution: force focus on the element that the click event fired on
  $("#navbarToggle").click(function (event) {
    $(event.target).focus();
  });
});

(function (global) {
  let dc = {};
  let homeHtml = "snippets/home-snippet.html";

  // Convenience function for inserting innerHTML for 'select'
  let insertHtml = function (selector, html) {
    let targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
  };

  // Show loading icon inside element identified by 'selector'.
  let showLoading = function (selector) {
    let html = "<div class='text-center'>";
    html +=
      "<img class='loading-img blend' src='../images/ajax-loader.gif' alt=''></div>";
    insertHtml(selector, html);
  };

  // Remove the class 'active' from home and switch to Menu button
  let switchMenuToActive = function () {
    // Remove 'active' from home button
    let classes = document.querySelector("#navHomeButton").className;
    classes = classes.replace(new RegExp("active", "g"), "");
    document.querySelector("#navHomeButton").className = classes;

    // Add 'active' to menu button if not already there
    classes = document.querySelector("#navMenuButton").className;
    if (classes.indexOf("active") == -1) {
      classes += " active";
      document.querySelector("#navMenuButton").className = classes;
    }
  };

  // On page load (before images or CSS)
  document.addEventListener("DOMContentLoaded", function (event) {
    // On first load, show home view
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      homeHtml,
      function (responseText) {
        document.querySelector("#main-content").innerHTML = responseText;
      },
      false
    );
  });

  // Load the menu categories view
  dc.loadMenu = function () {
    showLoading("#main-content");
    document.querySelector(
      "#main-content"
    ).innerHTML = `<h2 id="menu-categories-title" class="text-center">Cafe Menu</h2>`;

    let htmlCode = ``;
    menu.forEach((element) => {
      htmlCode =
        htmlCode +
        `<div class="menu-card">  
          <div class="menu-item-photo">
            <div>${element.short_name}</div>
            <img class="img-responsive" src="https://s1.1zoom.me/prev/500/499725.jpg"
              alt="Item" />
          </div>
          <div class="menu-item-description">
            <div class="menu-item-info">
              <span><i class="fa-solid fa-indian-rupee-sign"></i> ${element.price * 30}</span> 
              <h3 class="menu-item-title">${element.name}</h3>   
            </div>
            <p>${element.description}</p>
          </div>
        </div>`;
    });
    const menuCards = document.querySelector("#cards");
    menuCards.innerHTML = htmlCode;
  };
  global.$dc = dc;
})(window);

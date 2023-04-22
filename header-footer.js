class MyHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <header>
      <nav class="navbar">
        <a class="logo" href="./index.html">
        <img src="./images/logo.png">
        </a>
        <ul class="nav-menu">
          <li class="nav-item"><a class="nav-link" href="./index.html">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="./about.html">About Us</a></li>
          <li class="nav-item"><a class="nav-link" href="./work.html">Our Works</a></li>
          <li class="nav-item"><a class="nav-link" href="./contact.html">Contact Us</a></li>
        </ul>
        <div class="hamburger">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>  
      </nav>
    </header>
    `;
  }
}
customElements.define("my-header", MyHeader);

class MyFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <footer>
          <div class="social-link">
            <ul>
              <li>FACEBOOK</li>
              <li>TWITTER</li>
              <li>INSTAGRAM</li>
            </ul>
            <ul>
              <li>
                <h5>Subscribe to Our Newsletter</h5>
              </li>
              <li class="subscribe">
                <input
                  type="email"
                  id="email"
                  name=""
                  id=""
                  aria-describedby="emailHelpId"
                  placeholder="Enter your email here*"
                />
                <a id="submit" href="">Subscribe Now</a>
              </li>
            </ul>
          </div>
          <div class="form">
            <ul>
              <li>CONTACT &gt;</li>
              <li>Phone : +91XXXXXXXXXX</li>
              <li>Email : contact@salbwf.com</li>
            </ul>
            <ul>
              <li>© 2023 by SALBWF</li>
              <li>Proudly coded by mrahulrahi</li>
            </ul>
          </div>
      </footer>
        `;
  }
}
customElements.define("my-footer", MyFooter);

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

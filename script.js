class MyHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <nav class="nav-wrapper">
        <div class="site-title">
        <a href="./index.html">
        <img src="./images/logo.png">
        </a>
        </div>
      <ul class="nav-list">
          <li><a href="./index.html">Home</a></li>
          <li><a href="../about/about.html">About Us</a></li>
          <li><a href="../update/update.html">Updates</a></li>
          <li><a href="../work/work.html">Our Works</a></li>
          <li><a href="../contact/contact.html">Contact Us</a></li>
      </ul>
      <div>Donate Now &gt;</div>
    </nav>
        `;
  }
}
customElements.define("my-header", MyHeader);

class MyFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <footer>
        <span>
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
              <li>
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
        </span>
      </footer>
        `;
  }
}
customElements.define("my-footer", MyFooter);

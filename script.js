class ResponsiveMenu extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <h1>Our Menu</h1>
    <div class="col-lg-4 col-md-6 col-sm-12">
        <div class="section">
            <h2 class="chicken">Chicken</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.</p>
        </div>
    </div>
    <div class="col-lg-4 col-md-6 col-sm-12">
        <div class="section">
            <h2 class="beef">Beef</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.</p>
        </div>
    </div>
    <div class="col-lg-4 col-md-12 col-sm-12">
        <div class="section">
            <h2 class="sushi">Sushi</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.</p>
        </div>
    </div>
      `;
  }
}
customElements.define("responsive-menu", ResponsiveMenu);

class ResponsiveCards extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <h1 class="title">Explore The World</h1>
    <section>
      <div class="destination">
        <div class="thumbnail">
          <img src="img/new-york.jpg" alt="Sunset in New York" />
        </div>
        <div class="content">
          <h1>New York</h1>
          <p>
            One of the most vibrant cities you can visit - a trip no one should
            miss!
          </p>
        </div>
      </div>
      <div class="destination">
        <div class="thumbnail">
          <img src="img/kuala-lumpur.jpg" alt="Sunset in New York" />
        </div>
        <div class="content">
          <h1>Kuala Lumpur</h1>
          <p>
            One of the most vibrant cities you can visit - a trip no one should
            miss!
          </p>
        </div>
      </div>
      <div class="destination">
        <div class="thumbnail">
          <img src="img/hong-kong.jpg" alt="Sunset in New York" />
        </div>
        <div class="content">
          <h1>Hong Kong</h1>
          <p>
            One of the most vibrant cities you can visit - a trip no one should
            miss!
          </p>
        </div>
      </div>
      <div class="destination">
        <div class="thumbnail">
          <img src="img/singapore.jpg" alt="Sunset in New York" />
        </div>
        <div class="content">
          <h1>Singapore</h1>
          <p>
            One of the most vibrant cities you can visit - a trip no one should
            miss!
          </p>
        </div>
      </div>
    </section>
        `;
  }
}
customElements.define("responsive-cards", ResponsiveCards);

class NFTCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <section id="nft-card">
    <div class="nft-container">

    <article class="main-image">
      <img src="images/image-equilibrium.jpg" alt="">
      <div>
        <img src="images/icon-view.svg" alt="">
      </div>
    </article>

    <article>
      <h2>Equilibrium #3429</h2>
      <p>Our Equilibrium collection promotes balance and calm.</p>

      <ul>
        <li><img src="images/icon-ethereum.svg" alt=""> 0.041 ETH</li>
        <li><img src="images/icon-clock.svg" alt="">3 days left</li>
      </ul>
    </article>

    <article class="avatar">
      <img src="images/image-avatar.png" alt="">
      <p>Creation of <span>Jules Wyvern</span></p>
    </article>
  </div>
  </section>
  `;
  }
}
customElements.define("nft-card", NFTCard);

class QRCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <section id="qr-card">
    <div class="qr-container">
    <article>
      <img src="images/image-qr-code.png" alt="">
    </article>

    <article>
      <h1>Improve your front-end skills by building projects</h1>
      <p>Scan the QR code to visit Frontend Mentor and take your coding skills to the next level</p>
    </article>
  </div>
  </section>
  `;
  }
}
customElements.define("qr-card", QRCard);

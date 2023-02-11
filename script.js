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

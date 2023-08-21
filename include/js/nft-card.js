var nftcardListHolder = document.querySelector(".nftcard-list");
var addNftcardModal = document.querySelector("#nftcardModal");

addNftcardModal.style.display = "none";

function addNftcard() {
  var nftImage = document.querySelector("#nft-image").value;
  var nftTitle = document.querySelector("#nft-title").value;
  var nftContent = document.querySelector("#nft-content").value;
  var nftPrice = document.querySelector("#nft-price").value;
  var nftTime = document.querySelector("#nft-time").value;
  var nftCreator = document.querySelector("#nft-creator").value;

  var newNftcard =
    `  
    <div class="nft-container">
    <article class="main-image">
      <img src="` +
    nftImage +
    `" alt="">
      <div>
        <img src="img/icon-view.svg" alt="">
      </div>
    </article>

    <article>
      <h2>` +
    nftTitle +
    `</h2>
      <p>` +
    nftContent +
    `</p>

      <ul>
        <li><img src="img/icon-ethereum.svg" alt="">` +
    nftPrice +
    ` ETH</li>
        <li><img src="img/icon-clock.svg" alt="">` +
    nftTime +
    ` left</li>
      </ul>
    </article>

    <article class="avatar">
      <img src="img/image-avatar.png" alt="">
      <p>Creation of <span>` +
    nftCreator +
    `</span></p>
    </article>
  </div>
`;

  nftcardListHolder.insertAdjacentHTML("beforeend", newNftcard);
  addNftcardModal.style.display = "none";
}

function showAddNftcardModal() {
  addNftcardModal.style.display = "block";
}

function closeNftcardBtn() {
  addNftcardModal.style.display = "none";
}

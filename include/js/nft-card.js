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
    ` <div class="nftcard-item">
    <div class="nftcard-box">
      <div class="nftcard-main-image">
        <img src="` + nftImage + `" alt="">
        <div class="nft-eye-icon">
          <img src="img/icon-view.svg" alt="">
        </div>
      </div>
      <div class="nftcard-text">
        <h2>` + nftTitle + `</h2>
        <p>` + nftContent + `</p>
        <ul>
          <li><img src="include/images/icon-ethereum.svg" alt="">` + nftPrice + `</li>
          <li><img src="include/images/icon-clock.svg" alt="">` + nftTime + ` </li>
        </ul>
      </div>
      <div class="nftcard-avatar">
        <img src="include/images/image-avatar.png" alt="">
        <p>Creation of <span>` + nftCreator + `</span></p>
      </div>
    </div>
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
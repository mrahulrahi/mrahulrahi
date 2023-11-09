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
    <div class="nftcard-item">
      <div class="nftcard-box d-flex flex-column">
        <div class="nftcard-image">
          <img src="` + nftImage + `" alt="">
        </div>
        <div class="nftcard-text">
          <h4>` + nftTitle + `</h4>
          <p>` + nftContent + `</p>
        </div>
        <div class="nftcard-cta mt-auto">
          <ul class="nftcard-cta-list d-flex align-items-center justify-content-between">
            <li class="nftcard-cta-item d-flex align-items-center"><img src="include/images/icon-ethereum.svg" alt="">` + nftPrice + ` ETH</li>
            <li class="nftcard-cta-item d-flex align-items-center"><img src="include/images/icon-clock.svg" alt="">` + nftTime + ` days left</li>
          </ul>
          <div class="nftcard-avatar d-flex align-items-center">
            <img src="include/images/image-avatar.png" alt="">
            <p>Creation of <span>` + nftCreator + `</span></p>
          </div>
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
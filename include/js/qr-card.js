var qrcardListHolder = document.querySelector(".qrcard-list");
var addQrcardModal = document.querySelector("#qrcardModal");

addQrcardModal.style.display = "none";

function addQrcard() {
  var qrImage = document.querySelector("#qr-image").value;
  var qrTitle = document.querySelector("#qr-title").value;
  var qrContent = document.querySelector("#qr-content").value;

  var newQrcard =
    `  
    <div class="qr-container">
    <article>
      <img src="` +
    qrImage +
    `" alt="">
    </article>

    <article>
      <h1>` +
    qrTitle +
    `</h1>
      <p>` +
    qrContent +
    `</p>
    </article>
  </div>
`;

  qrcardListHolder.insertAdjacentHTML("beforeend", newQrcard);
  addQrcardModal.style.display = "none";
}

function showAddQrcardModal() {
  addQrcardModal.style.display = "block";
}

function closeQrcardBtn() {
  addQrcardModal.style.display = "none";
}

var rescardListHolder = document.querySelector(".rescard-list");
var addRescardModal = document.querySelector("#rescardModal");

addRescardModal.style.display = "none";

function addRescard() {
  var image = document.querySelector("#image").value;
  var resTitle = document.querySelector("#res-title").value;
  var resContent = document.querySelector("#res-content").value;

  var newRescard =
    `  
    <div class="destination">
    <div class="thumbnail">
      <img src="` +
    image +
    `" alt="Sunset in New York" />
    </div>
    <div class="content">
      <h1>` +
    resTitle +
    `</h1>
      <p>
        ` +
    resContent +
    `
      </p>
    </div>
  </div>
`;

  rescardListHolder.insertAdjacentHTML("beforeend", newRescard);
  addRescardModal.style.display = "none";
}

function showAddRescardModal() {
  addRescardModal.style.display = "block";
}

function closeRescardBtn() {
  addRescardModal.style.display = "none";
}

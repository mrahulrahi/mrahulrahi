var resmenuListHolder = document.querySelector(".resmenu-list");
var addResmenuModal = document.querySelector("#resmenuModal");

addResmenuModal.style.display = "none";

function addResmenu() {
  var title = document.querySelector("#title").value;
  var content = document.querySelector("#content").value;

  var newResmenu =
  `
    <div class="resmenu-item">
      <div class="resmenu-box">
        <div class="resmenu-heading ms-auto">` + title + `</div>
        <p>` + content + `</p>
      </div>
    </div>
  `;

  resmenuListHolder.insertAdjacentHTML("beforeend", newResmenu);
  addResmenuModal.style.display = "none";
}

function showAddResmenuModal() {
  addResmenuModal.style.display = "block";
}

function closeResmenuBtn() {
  addResmenuModal.style.display = "none";
}

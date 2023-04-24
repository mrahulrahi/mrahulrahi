var resmenuListHolder = document.querySelector(".resmenu-list");
var addResmenuModal = document.querySelector("#resmenuModal");

addResmenuModal.style.display = "none";

function addResmenu() {
  var title = document.querySelector("#title").value;
  var content = document.querySelector("#content").value;

  var newInterview =
    `
    
    <div class="col-lg-4 col-md-12 col-sm-12">
    <div class="section">
      <h2 class="title">` +
    title +
    `</h2>
      <p>` +
    content +
    `</p>
    </div>
  </div>
   
`;

  resmenuListHolder.insertAdjacentHTML("beforeend", newInterview);
  addResmenuModal.style.display = "none";
}

function showAddResmenuModal() {
  addResmenuModal.style.display = "block";
}

function closeResmenuBtn() {
  addResmenuModal.style.display = "none";
}

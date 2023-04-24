var interviewListHolder = document.querySelector(".interview-list");
var addInterviewModal = document.querySelector("#interviewModal");

addInterviewModal.style.display = "none";

function addInterview() {
  var departmentInterview = document.querySelector("#int-department").value;
  var positionInterview = document.querySelector("#int-position").value;

  var newInterview =
    `
    
        <div class="interview-card">
            <h3>` +
    departmentInterview +
    `</h3>          
            <p>` +
    positionInterview +
    `</p>
            <button class="accept-btn" type="button" name="button">Accept</button>
            <button class="reject-btn" type="button" name="button">Reject</button>
        </div>
   
`;

  interviewListHolder.insertAdjacentHTML("beforeend", newInterview);
  addInterviewModal.style.display = "none";
}

function showAddIntModal() {
  addInterviewModal.style.display = "block";
}

function closeIntBtn() {
  addInterviewModal.style.display = "none";
}

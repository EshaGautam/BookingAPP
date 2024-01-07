let FormData = document.querySelector("form");
function handleFormSubmit(event) {
  let existingUser = JSON.parse(localStorage.getItem("usersDetail")) ?? [];

  event.preventDefault();
  let userName = document.getElementById("username").value;
  let userEmail = document.getElementById("email").value;
  let userPhone = document.getElementById("phone").value;

  let newUser = {
    Name: userName,
    Email: userEmail,
    Phone: userPhone,
  };
  existingUser.push(newUser);
  localStorage.setItem("usersDetail", JSON.stringify(existingUser));

  AddingUser();
  FormData.reset();
}

function AddingUser() {
  existingUser = JSON.parse(localStorage.getItem("usersDetail")) ?? [];
  let userList = document.querySelector("ul");
  userList.innerHTML = "";
  existingUser.forEach((element, index) => {
    let user = document.createElement("li");
   
    // creating  Delete button And Adding Delete functinality
    let DeleteButton = document.createElement("button");
    let DeleteButtonText = document.createTextNode("X");
    DeleteButton.appendChild(DeleteButtonText);
    DeleteButton.className = "del-btn";
    DeleteButton.addEventListener("click", function (event) {
      deleteUser(event, index);
    });
 //creating edit button and adding functionality
    let editButton = document.createElement("button");
    let editButtonText = document.createTextNode("Edit");
    editButton.appendChild(editButtonText);
    editButton.className = "edit-btn";
    editButton.addEventListener("click", function (event) {
      editDetails(event,index);
    });
    user.textContent = `Name: ${element.Name}, Email: ${element.Email}, Phone: ${element.Phone}`;
   
    user.appendChild(DeleteButton);
     user.appendChild(editButton);
    userList.appendChild(user);
  });
}
AddingUser();

let userList = document.querySelector("ul");

function deleteUser(event, index) {
  let existingUser = JSON.parse(localStorage.getItem("usersDetail")) || [];
  existingUser.splice(index, 1);
  localStorage.setItem("usersDetail", JSON.stringify(existingUser));

  if (event.target.classList.contains("del-btn")) {
    let userToDelete = event.target.parentElement;
    userList.removeChild(userToDelete);
  }
}

function editDetails(event,index) {

  let existingUser = JSON.parse(localStorage.getItem("usersDetail")) || [];
  let userToEdit = existingUser[index];
  existingUser.splice(index, 1);
  localStorage.setItem("usersDetail", JSON.stringify(existingUser));

  if (event.target.classList.contains("edit-btn")) {
    let userToDelete = event.target.parentElement;
    userList.removeChild(userToDelete);
  }

  // Populate the input fields with existing values
  document.getElementById("username").value = userToEdit.Name;
  document.getElementById("email").value = userToEdit.Email;
  document.getElementById("phone").value = userToEdit.Phone;
}
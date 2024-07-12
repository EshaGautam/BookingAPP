let FormData = document.querySelector("form");
async function handleFormSubmit(event) {
  event.preventDefault();
  let userName = document.getElementById("username").value;
  let userEmail = document.getElementById("email").value;
  let userPhone = document.getElementById("phone").value;

  let newUser = {
    name: userName,
    email: userEmail,
    phone: userPhone,
  };
  try {
    const response = await fetch("http://localhost:4000/user/add-user", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("problem in fetching data");
    }
  } catch (error) {
    console.log(error);
  }
  FormData.reset();
  AddingUser()
}


async function AddingUser() {

try{
  const response = await fetch('http://localhost:4000/user/get-user')

  if(!response.ok){
    throw new Error('problem in fetching data')
  }
  const existingUser =  await response.json()
  console.log(existingUser)
  let userList = document.querySelector("ul");
  userList.innerHTML = "";
  existingUser.forEach((element, index) => {
    let user = document.createElement("li");
    let userId = element.id
    // creating  Delete button And Adding Delete functinality
    let DeleteButton = document.createElement("button");
    let DeleteButtonText = document.createTextNode("X");
    DeleteButton.appendChild(DeleteButtonText);
    DeleteButton.className = "del-btn";
    DeleteButton.addEventListener("click", function (event,index) {
      deleteUser(event, index, userId);
    });
    //creating edit button and adding functionality
    let editButton = document.createElement("button");
    let editButtonText = document.createTextNode("Edit");
    editButton.appendChild(editButtonText);
    editButton.className = "edit-btn";
    editButton.addEventListener("click", function (event) {
     
      editDetails(event, index,existingUser[index]);
    });
    user.textContent = `Name: ${element.username}, Email: ${element.email}, Phone: ${element.phoneNumber}`;

    user.appendChild(DeleteButton);
    user.appendChild(editButton);
    userList.appendChild(user);
  });
}
  catch(error){
    console.log(error)
  }

}


document.addEventListener("DOMContentLoaded", () => {
  AddingUser();
});









let userList = document.querySelector("ul");

async function deleteUser(event, index,userId) {
  try{
    const response = await fetch('http://localhost:4000/user/delete-user',{
      method:'POST',
      body:JSON.stringify({id:userId}),
      headers:{
        'Content-type':'application/json'
      }
    })
    if(!response.ok){
      throw new Error('problem in deleting data')
    }
    

  if (event.target.classList.contains("del-btn")) {
    let userToDelete = event.target.parentElement;
    userList.removeChild(userToDelete);
  }
  }
  catch(err){
    console.log(err)
  }
}



async function editDetails(event, index,user) {
    try{
     
      const response = await fetch('http://localhost:4000/user/edit-user',{
        method:'POST',
        body:JSON.stringify(user),
        headers:{
          'Content-Type':'application/json'
        }

      }
    )
      if(!response.ok){
        throw new Error ('something went wrong')
      }
      if (event.target.classList.contains("edit-btn")) {
        let userToDelete = event.target.parentElement;
        userList.removeChild(userToDelete);
      }
    
      // Populate the input fields with existing values
      document.getElementById("username").value = user.username;
      document.getElementById("email").value = user.email;
      document.getElementById("phone").value = user.phoneNumber;

  

    }
    catch(error){
      console.log(error)
    }
 
}


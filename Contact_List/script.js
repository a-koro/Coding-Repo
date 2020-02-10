let button1 = document.getElementById("button1");
let division1 = document.getElementById("division1");
let inputFirstName = document.getElementById("firstName1");
let inputLastName = document.getElementById("lastName1");
let inputNumber = document.getElementById("number1");

let firstNamesList = document.getElementById("firstNamesList");
let lastNamesList = document.getElementById("lastNamesList");
let numbersList = document.getElementById("numbersList");
let deleteList = document.getElementById("deleteList");

let contactsEntries = 0;

class Contact {
  constructor(firstName, lastName, number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.number = number;
  }
}

let contactList = []; 
//Simple Data Base inside an array.

let contactNew;
//Declaring the contact object outside of the event listener.

button1.addEventListener('click' , function() {
  //division1.innerHTML +=  inputFirstName.value + " , " + inputLastName.value + " , " + inputNumber.value + "<br>";
  contactNew = new Contact(inputFirstName.value , inputLastName.value , inputNumber.value);
  //Using the already declared variable inside the event listener to create the instance of the object.
  contactList.push(contactNew);
  inputFirstName.value = '';
  inputLastName.value = '';
  inputNumber.value = '';
  //Increase the number of entries so it will know later which os which.
  contactsEntries++;
  renderContactsNew(contactList);
});

//Here I creater a for in loop so I can render the contacts and delete them by index number.
function renderContacts(contactList) {
  let x;
  newContactDiv.innerHTML = "";
  for (x in contactList) {
    newContactDiv.innerHTML += "<li>" + contactList[x].firstName +" "+ contactList[x].lastName +" "+ contactList[x].number + " <button class='delButClass' id=" + x + ">Delete</button>" + "</li>";
    // newContactDiv.innerHTML += "<li>" + contactList[x].lastName + "</li>";
    // newContactDiv.innerHTML += "<li>" + contactList[x].number + "</li><br>";
    // newContactDiv.innerHTML += "<button id='deleteButton'>Del</button>";
  }
}

// A NEW improved rendering function.
function renderContactsNew(contactList) {
  let x;
  firstNamesList.innerHTML = "<h4>First Name</h4>";
  lastNamesList.innerHTML = "<h4>Last Name</h4>";
  numbersList.innerHTML = "<h4>Phone Number</h4>";
  deleteList.innerHTML = "<h4>Edit</h4>";
  for (x in contactList) {
    let listElement0 = document.createElement("LI");
    listElement0.innerHTML += contactList[x].firstName;
    //newContactDiv.appendChild(listElement);
    firstNamesList.appendChild(listElement0);
    let listElement1 = document.createElement("LI");
    listElement1.innerHTML += contactList[x].lastName;
    lastNamesList.appendChild(listElement1);
    let listElement2 = document.createElement("LI");
    listElement2.innerHTML += contactList[x].number;
    numbersList.appendChild(listElement2);
    let deleteButton1 = document.createElement("BUTTON");
    let editListElement = document.createElement("LI");
    deleteButton1.innerHTML = "Delete";
    deleteButton1.setAttribute("id", x);
    deleteButton1.addEventListener('click' , function(evt) {
      removeContact(evt.target.id);
    });
    editListElement.appendChild(deleteButton1);
    deleteList.appendChild(editListElement);
  }
}

//A function to remove objects/contacts from the list.
function removeContact(contactIndex) {
  contactList.splice(contactIndex, 1);
  renderContactsNew(contactList);
}

window.onload = init;

// The contact manager as a global variable
let cm;

function init() {
    // create an instance of the contact manager
    cm = new ContactManager();
    cm.load();
    cm.printContactsToConsole();
    // Display contacts in a table
    // Pass the id of the HTML element that will contain the table
    cm.displayContactsAsATable("contacts");
}

function formSubmitted() {
    // Get the values from input fields
    let name = document.querySelector("#name");
    let phone = document.querySelector("#phone");
    let email = document.querySelector("#email");
    let newContact = new Contact(name.value, phone.value, email.value);
    cm.add(newContact);

    // Empty the input fields
    name.value = "";
    phone.value = "";
    email.value = "";

    // refresh the html table
    cm.displayContactsAsATable("contacts");

    // do not let your browser submit the form using HTTP
    return false;
}

function emptyList() {
    cm.empty();
    cm.displayContactsAsATable("contacts");
}

function loadList() {
    cm.load();
    cm.displayContactsAsATable("contacts");
}

function deleteASpecificContact(evt) {
    // Here I try to find a way to pass the evt.target.id argument to the function, until then I tested it with the index 1
    cm.deleteContact(evt);
    cm.displayContactsAsATable("contacts");
    console.log(evt);
}

class Contact {
    constructor(name, phone, email) {
        this.name = name;
        this.phone = phone;
        this.email = email;
    }
}

class ContactManager {
    constructor() {
        // when we build the contact manager, it
        // has an empty list of contacts
        this.listOfContacts = [];
    }

    // Will erase all contacts
    empty() {
        this.listOfContacts = [];
    }

    add(contact) {
        this.listOfContacts.push(contact);
    }

    remove(contact) {
        for (let i = 0; i < this.listOfContacts.length; i++) {
            var c = this.listOfContacts[i];

            if (c.email === contact.email) {
                // remove the contact at index i
                this.listOfContacts.splice(i, i);
                // stop/exit the loop
                break;
            }
        }
    }

    deleteContact(contactIndex) {
        this.listOfContacts.splice(contactIndex, 1);
    }

    sort() {
        // As our array contains objects, we need to pass as argument
        // a method that can compare two contacts.
        // we use for that a class method, similar to the distance(p1, p2)
        // method we saw in the ES6 Point class in module 4
        // We always call such methods using the name of the class followed
        // by the dot operator
        this.listOfContacts.sort(ContactManager.compareByName);
    }

    // class method for comparing two contacts by name
    static compareByName(c1, c2) {
        // JavaScript has builtin capabilities for comparing strings
        // in alphabetical order
        if (c1.name < c2.name)
            return -1;

        if (c1.name > c2.name)
            return 1;

        return 0;
    }

    printContactsToConsole() {
        this.listOfContacts.forEach(function (c) {
            console.log(c.name);
        });
    }

    load() {
        if (localStorage.contacts !== undefined) {
            // the array of contacts is saved in JSON, let's convert
            // it back to a real JavaScript object.
            this.listOfContacts = JSON.parse(localStorage.contacts);
        }
    }

    save() {
        // We can only save strings in local Storage. So, let's convert
        // our array of contacts to JSON
        localStorage.contacts = JSON.stringify(this.listOfContacts);
    }

    displayContactsAsATable(idOfContainer) {

        this.sort();
        // empty the container that contains the results
        let container = document.querySelector("#" + idOfContainer);
        container.innerHTML = "";


        if (this.listOfContacts.length === 0) {
            container.innerHTML = "<p>No contacts to display!</p>";
            // stop the execution of this method
            return;
        }

        // creates and populate the table with users
        var table = document.createElement("table");

        // This variable is only to set an index inside the id of the button
        var contactIndex = 0

        // iterate on the array of users
        this.listOfContacts.forEach(function (currentContact) {
            // creates a row
            var row = table.insertRow();

            row.innerHTML = "<td>" + currentContact.name + "</td>" + "<td>" + currentContact.phone + "</td>"
                + "<td>" + currentContact.email;
            
            var argumentVariable = 'deleteASpecificContact(' + contactIndex + ')';

            // Tis part is to add an EDIT button to the row.
            var editButton = document.createElement('button');
            editButton.innerHTML = '<img src="pencil_edit.png">';

            var tableDataButton = document.createElement('td');
            var buttonElementToAppend = document.createElement('button');
            buttonElementToAppend.setAttribute('class', 'delete');
            buttonElementToAppend.setAttribute('id', contactIndex);
            buttonElementToAppend.setAttribute('onclick',  argumentVariable);
            buttonElementToAppend.innerHTML = '<img src="trash_can.png">';
            tableDataButton.appendChild(editButton);
            tableDataButton.appendChild(buttonElementToAppend);
            row.appendChild(tableDataButton);

            contactIndex ++;
        });

        // adds the table to the div
        container.appendChild(table);
    }
}
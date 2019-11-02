window.onload = function() {
  var toDoListIDs = [];
  // recreate all todos after relaod out of the local storage by getting the key as id and the value as todo text.
  console.log(localStorage);
  for (var i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    let newToDoLi = document.createElement("LI");
    let toDoID = key;
    let deletetoDoID = toDoID + 1;
    newToDoLi.id = toDoID;
    newToDoLi.className = "list-group-item list-group-item-info";
    let toDoDeleteButton = document.createElement("button");
    toDoDeleteButton.className = "btn btn-danger btn-sm float-right delete";
    toDoDeleteButton.appendChild(document.createTextNode("X"));
    toDoDeleteButton.id = deletetoDoID;
    newToDoLi.appendChild(toDoDeleteButton);
    let newToDoLiChildInputText = document.createElement("input");
    newToDoLiChildInputText.type = "checkbox";
    newToDoLiChildInputText.id = toDoID;
    newToDoLi.appendChild(newToDoLiChildInputText);
    // Add ID to the array
    toDoListIDs.push(newToDoLi.id);
    // Get to do text and put it into the LI
    let text = document.createTextNode(value);
    newToDoLi.appendChild(text);
    // Get the <ul> element to insert a new node
    let listUlElement = document.getElementById("ul-for-to-dos");
    listUlElement.appendChild(newToDoLi);
    // create an event for crossing off the to do item
    document.getElementById(toDoID).addEventListener("change", function(e) {
      e.preventDefault();
      crossToDo(e.srcElement.checked, e.target.id );
    });
    // create an event for the toDoDeleteButton button
    document.getElementById(deletetoDoID).addEventListener("click", function(e) {
      deleteToDoLi(e.target.parentElement, toDoListIDs);
    });
  }

  // Ad event listener for adding todo items
  document
    .getElementById("add-todo-button")
    .addEventListener("click", function(e) {
      e.preventDefault();
      createToDo(toDoListIDs);
    });

  // Ad event listener for deleting all todo items
  document.getElementById("clear-button").addEventListener("click", function() {
    deleteAllToDoLis(toDoListIDs);
  });
};

// Get ID from UL for the todo items
 const itemList = document.getElementById("ul-for-to-dos");

// Function to straight through to do item
function crossToDo(checkboxCheck, checkBoxId) {
  // Only if checkbox is checked cross of the to do item otherwise let style empty
  checkbox = checkboxCheck;
  if (checkbox == true) {
    document.getElementById(checkBoxId).style.textDecoration =
      "line-through";
  } else {
    document.getElementById(checkBoxId).style.textDecoration = "";
  }
}

// Function to add new to do item (LI) with ID, to do value, class, button element, input element to the UL.
// Generate an event listener for crossing and deleting of the LI.
// Append ID to the array
function createToDo(toDoListIDs) {
  if (document.getElementById("input-for-new-task").value !== "") {
    // Create a <li> node
    let newToDoLi = document.createElement("LI");
    let toDoID = new Date().toISOString();
    let deletetoDoID = toDoID + 1;
    newToDoLi.id = toDoID;
    newToDoLi.className = "list-group-item list-group-item-info";
    // Create delete button
    let toDoDeleteButton = document.createElement("button");
    toDoDeleteButton.className = "btn btn-danger btn-sm float-right delete";
    toDoDeleteButton.appendChild(document.createTextNode("X"));
    toDoDeleteButton.id = deletetoDoID;
    newToDoLi.appendChild(toDoDeleteButton);
    // Create a <INPUT> node with attributes
    let newToDoLiChildInputText = document.createElement("input");
    newToDoLiChildInputText.type = "checkbox";
    newToDoLiChildInputText.id = toDoID;
    newToDoLi.appendChild(newToDoLiChildInputText);
    // Get to do text and put it into the LI
    let addedInputForNewTask = document.getElementById("input-for-new-task").value;
    let text = document.createTextNode(addedInputForNewTask);
    newToDoLi.appendChild(text);
    // Add ID to the array
    toDoListIDs.push(newToDoLi.id);
    // Get the <ul> element to insert a new node
    const listUlElement = document.getElementById("ul-for-to-dos");
    listUlElement.appendChild(newToDoLi);
    // create an event for crossing off the to do item
    document.getElementById(toDoID).addEventListener("change", function(e) {
      crossToDo(e.srcElement.checked, e.target.id );
    });
    // create an event for the toDoDeleteButton button
    document.getElementById(deletetoDoID).addEventListener("click", function(e) {
      deleteToDoLi(e.target.parentElement, toDoListIDs);
    });
    // Empty the to do field
    document.forms["form-of-input-for-new-task"].reset();
    // Store ID as key and textvalue as value in the local storage
    localStorage.setItem(toDoID, addedInputForNewTask);
  }
}

// Function to delete certain to do item and delete ID in array, also delete key value out of the local storage
function deleteToDoLi(parentElement, toDoListIDs) {
  console.log(parentElement);
  var arrayPosition = toDoListIDs.indexOf(parentElement.id);
  delete toDoListIDs[arrayPosition];
  var li = parentElement;
  itemList.removeChild(li);
  localStorage.removeItem(parentElement.id);
}

//Function to delete all to do items, every deletion process needs to delete the ID out off the array and delete all key values out of the local storage
function deleteAllToDoLis(toDoListIDs) {
  for (i in toDoListIDs) {
    var element = document.getElementById(toDoListIDs[i]);
    element.parentElement.removeChild(element);
    delete toDoListIDs[i];
    localStorage.clear();
  }
}

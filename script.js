window.onload = function() {
  // Create Array of IDs from LIs
  var todoList = [];
  // Get ID from UL for the todo items
  const itemList = document.getElementById("todo-list");

  // iterate localStorage
  for (var i = 0; i < localStorage.length; i++) {
    // set iteration key name
    var key = localStorage.key(i);
    // use key name to retrieve the corresponding value
    var value = localStorage.getItem(key);
    // console.log the iteration key and value
    //console.log('Key: ' + key + ', Value: ' + value);
    newItem = document.createElement("LI");
    const now = key;
    const deleteNow = now + 1;
    newItem.id = now;
    newItem.className = "list-group-item list-group-item-info";
    // Create delete button
    var itemDelete = document.createElement("button");
    itemDelete.className = "btn btn-danger btn-sm float-right delete";
    itemDelete.appendChild(document.createTextNode("X"));
    itemDelete.id = now + 1;
    newItem.appendChild(itemDelete);
    // Create a <INPUT> node with attributes
    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = now;
    newItem.appendChild(input);
    // Add ID to the array
    todoList.push(newItem.id);
    // Get to do text and put it into the LI
    const text = document.createTextNode(value);
    newItem.appendChild(text);
    // Get the <ul> element to insert a new node
    const list = document.getElementById("todo-list");
    list.appendChild(newItem);
    // create an event for crossing off the to do item
    document.getElementById(now).addEventListener("change", function(e) {
      e.preventDefault();
      crossToDo(e);
    });
    // create an event for the itemDelete button
    document.getElementById(deleteNow).addEventListener("click", function(e) {
      deleteToDoItem(e.target.parentElement, todoList, itemList);
    });
  }

  // Ad event listener for adding todo items
  document
    .getElementById("submit-button")
    .addEventListener("click", function(e) {
      e.preventDefault();
      submitClick(todoList);
    });

  // Ad event listener for deleting all todo items
  document
    .getElementById("clear-button")
    .addEventListener("click", function(e) {
      deleteAllItems(todoList);
    });
};

// Function to straight through to do item
function crossToDo(event) {
  // Only if checkbox is checked cross of the to do item otherwise let style empty
  checkbox = event.srcElement.checked;
  if (checkbox == true) {
    document.getElementById(event.target.id).style.textDecoration = "line-through";
  } else {
    document.getElementById(event.target.id).style.textDecoration = "";
  }
}

// Function to add new to do item (LI) with ID, to do value, class, button element, input element to the UL.
// Generate an event listener for crossing and deleting of the LI.
// Append ID to the array
function submitClick(todoList) {
  if (document.getElementById("new-task").value !== "") {
    // Create a <li> node
    newItem = document.createElement("LI");
    const now = new Date().toISOString();
    const deleteNow = now + 1;
    newItem.id = now;
    newItem.className = "list-group-item list-group-item-info";
    // Create delete button
    var itemDelete = document.createElement("button");
    itemDelete.className = "btn btn-danger btn-sm float-right delete";
    itemDelete.appendChild(document.createTextNode("X"));
    itemDelete.id = now + 1;
    newItem.appendChild(itemDelete);
    // Create a <INPUT> node with attributes
    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = now;
    newItem.appendChild(input);
    // Get to do text and put it into the LI
    const submitValue = document.getElementById("new-task").value;
    const text = document.createTextNode(submitValue);
    newItem.appendChild(text);
    // Add ID to the array
    todoList.push(newItem.id);
    // Get the <ul> element to insert a new node
    const list = document.getElementById("todo-list");
    list.appendChild(newItem);
    // create an event for crossing off the to do item
    document.getElementById(now).addEventListener("change", crossToDo);
    // create an event for the itemDelete button
    document.getElementById(deleteNow).addEventListener("click", function(e) {
      deleteToDoItem(e.target.parentElement);
    });
    // Empty the to do field
    document.forms["item-form"].reset();
    // Store ID as key and textvalue as value in the local storage
    localStorage.setItem(now, submitValue);
  }
}

// Function to delete certain to do item and delete ID in array, also delete key value out of the local storage
// function deleteItem(e) {
//   if (e.target.classList.contains("delete")) {
//     var arrayPosition = todoList.indexOf(e.target.parentElement.id);
//     delete todoList[arrayPosition];
//     var li = e.target.parentElement;
//     itemList.removeChild(li);
//     localStorage.removeItem(e.target.parentElement.id);
//   }
// }

function deleteToDoItem(parentElement, todoList, itemList) {
  console.log(parentElement);
  var arrayPosition = todoList.indexOf(parentElement.id);
  delete todoList[arrayPosition];
  var li = parentElement;
  itemList.removeChild(li);
  localStorage.removeItem(parentElement.id);
}

//Function to delete all to do items, every deletion process needs to delete the ID out off the array and delete all key values out of the local storage
function deleteAllItems(todoList) {
  for (i in todoList) {
    var element = document.getElementById(todoList[i]);
    element.parentElement.removeChild(element);
    delete todoList[i];
    localStorage.clear();
  }
}

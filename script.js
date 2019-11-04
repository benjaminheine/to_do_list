window.onload = function() {
  var toDoListIDs = [];
  var toDoArrayForLocalStorage = [];
  let checkBoxStatus = "";
  // recreate all todos after relaod out of the local storage by getting the key as id and the value as todo text.
  if (localStorage.length > 0) {
  for (var i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    //Get Object out of local storage
    toDoObjFromLocalStorage = JSON.parse(localStorage.getItem(key));
    //let toDoLiTextValue = localStorage.getItem(key);
    let toDoLiTextValue = toDoObjFromLocalStorage.toDoTextValue;
    let toDoID = key;
    let deletetoDoID = toDoID + 1;
    let checkboxStatus = toDoObjFromLocalStorage.checkStatus;
    
    createToDoLi(toDoListIDs, toDoID, deletetoDoID, toDoLiTextValue, checkBoxStatus);
  }
}
  // Ad event listener for adding todo items
  document
    .getElementById("add-todo-button")
    .addEventListener("click", function(e) {
      e.preventDefault();
      addToDo(toDoListIDs);
    });
  // Ad event listener for deleting all todo items
  document.getElementById("clear-button").addEventListener("click", function() {
    deleteAllToDoLis(toDoListIDs);
  });
};

class ToDo {
  constructor(sequenceNumber, id, toDoLiTextValue, checkStatus){
    this.sequenceNumber = sequenceNumber;
    this.id = id;
    this.toDoTextValue = toDoLiTextValue;
    this.checkStatus = checkStatus;
  }
  
}

function serializeToDoObjectToString (toDoObject) {
  localStorage.setItem('user', JSON.stringify(obj));
}




function crossToDo(checkboxCheck, checkBoxId) {
  console.log(checkboxCheck);
  checkbox = checkboxCheck;
  if (checkbox == true) {
    document.getElementById(checkBoxId).style.textDecoration = "line-through";
    checkBoxId.checkStatus = true;
  } else {
    document.getElementById(checkBoxId).style.textDecoration = "";
    checkBoxId.checkStatus = false;
  }
}

// Creating li element with delete button and todo text as input with checkbox for crossing out. Adding id to an array and creating event listeners for crossing off and deleting todo.
function createToDoLi(toDoListIDs, toDoArrayForLocalStorage, toDoID, deletetoDoID, toDoLiTextValue, checkBoxStatus) {
  let newToDoLi = document.createElement("LI");
  newToDoLi.id = toDoID;
  newToDoLi.className = "list-group-item list-group-item-info";
  let toDoDeleteButton = document.createElement("button");
  toDoDeleteButton.id = deletetoDoID;
  toDoDeleteButton.className = "btn btn-danger btn-sm float-right delete";
  toDoDeleteButton.appendChild(document.createTextNode("X"));
  newToDoLi.appendChild(toDoDeleteButton);
  let newToDoLiChildInputText = document.createElement("input");
  newToDoLiChildInputText.type = "checkbox";
  newToDoLiChildInputText.id = toDoID;
  newToDoLi.appendChild(newToDoLiChildInputText);
  newToDoLi.appendChild(document.createTextNode(toDoLiTextValue));

  

  toDoListIDs.push(newToDoLi.id);
  document.getElementById("ul-for-to-dos").appendChild(newToDoLi);

  if ( checkBoxStatus == true) {
    document.getElementById(toDoID).style.textDecoration = "line-through";
    newToDoLiChildInputText.checked = true;
  } else {
    document.getElementById(toDoID).style.textDecoration = "";
    newToDoLiChildInputText.checked = false;
  }



  document.getElementById(toDoID).addEventListener("change", function(e) {
    crossToDo(e.srcElement.checked, e.target.id);
  });
  document.getElementById(deletetoDoID).addEventListener("click", function(e) {
    deleteToDoLi(e.target.parentElement, toDoListIDs);
  });
}

function addToDo(toDoListIDs) {
  if (document.getElementById("input-for-new-task").value !== "") {
    let toDoID = new Date().toISOString();
    let deletetoDoID = toDoID + 1;
    let toDoLiTextValue = document.getElementById("input-for-new-task").value;
    createToDoLi(toDoListIDs, toDoID, deletetoDoID, toDoLiTextValue);

// Determine sequence number for todo
let sequenceNumber = toDoListIDs.length +1;
// Determine checkboxStatus


toDoObjForLocalStorage = new ToDo (sequenceNumber, toDoID, toDoLiTextValue, false);
console.log(toDoObjForLocalStorage);
//toDoArrayForLocalStorage.push('toDo_'sequenceNumber);
localStorage.setItem(toDoID, JSON.stringify(toDoObjForLocalStorage));
console.log(JSON.parse(localStorage.getItem(toDoID)));
    //localStorage.setItem(toDoID, toDoLiTextValue);
    document.forms["form-of-input-for-new-task"].reset();
  }
}

function deleteToDoLi(parentElement, toDoListIDs) {
  console.log(parentElement);
  var arrayPosition = toDoListIDs.indexOf(parentElement.id);
  delete toDoListIDs[arrayPosition];
  document.getElementById("ul-for-to-dos").removeChild(parentElement);
  localStorage.removeItem(parentElement.id);
}

function deleteAllToDoLis(toDoListIDs) {
  for (i in toDoListIDs) {
    var element = document.getElementById(toDoListIDs[i]);
    element.parentElement.removeChild(element);
    delete toDoListIDs[i];
    
  }
  localStorage.clear();
}



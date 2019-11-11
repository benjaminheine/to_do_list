// New todos are build out of a class and stored in the local storage with a sequence number.
// The sequence number is needed because the local storage does not sort by index. With the sequence number the order is recreated after reloading the page.
let toDoObjFromLocalStorage = "";
let allToDoObjFromLocalStorage = [];
window.onload = function() {
  var toDoListIDs = [];
  let checkBoxStatus = "";
  getAllObjectsFromLocalStorage(
    toDoObjFromLocalStorage,
    allToDoObjFromLocalStorage
  );
  // Sort all li objects by their sequence numbers to get back the right order
  if (allToDoObjFromLocalStorage.lenght != 0) {
    allToDoObjFromLocalStorage.sort(function(a, b) {
      return a.sequenceNumber - b.sequenceNumber;
    });
    // Recreate all arguments for rebuilding the to do li and rebuild the to do li
    for (var i = 0; i < allToDoObjFromLocalStorage.length; i++) {
      let toDoLiTextValue = allToDoObjFromLocalStorage[i].toDoTextValue;
      let toDoID = allToDoObjFromLocalStorage[i].id;
      let deletetoDoID = toDoID + 1;
      let checkBoxStatus = allToDoObjFromLocalStorage[i].checkStatus;
      createToDoLi(
        toDoListIDs,
        toDoID,
        deletetoDoID,
        toDoLiTextValue,
        checkBoxStatus
      );
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

function getAllObjectsFromLocalStorage() {
  if (localStorage.length > 0) {
    for (var i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      toDoObjFromLocalStorage = JSON.parse(localStorage.getItem(key));
      allToDoObjFromLocalStorage.push(toDoObjFromLocalStorage);
    }
  }
}

// Class for the to do li objects
class ToDo {
  constructor(sequenceNumber, id, toDoLiTextValue, checkStatus) {
    this.sequenceNumber = sequenceNumber;
    this.id = id;
    this.toDoTextValue = toDoLiTextValue;
    this.checkStatus = checkStatus;
  }
}

function crossToDo(checkboxCheck, checkBoxId) {
  console.log(checkboxCheck);
  checkbox = checkboxCheck;
  if (checkbox == true) {
    document.getElementById(checkBoxId).style.textDecoration = "line-through";
    checkBoxId.checkStatus = true;
    let toDoLiChildInputObj = JSON.parse(localStorage.getItem(checkBoxId));
    toDoLiChildInputObj.checkStatus = true;
    localStorage.setItem(checkBoxId, JSON.stringify(toDoLiChildInputObj));
  } else {
    document.getElementById(checkBoxId).style.textDecoration = "";
    checkBoxId.checkStatus = false;
    let toDoLiChildInputObj = JSON.parse(localStorage.getItem(checkBoxId));
    toDoLiChildInputObj.checkStatus = false;
    localStorage.setItem(checkBoxId, JSON.stringify(toDoLiChildInputObj));
  }
}

// Creating li element with delete button and todo text as input with checkbox for crossing out. Adding id to an array and creating event listeners for crossing off and deleting todo.
function createToDoLi(
  toDoListIDs,
  toDoID,
  deletetoDoID,
  toDoLiTextValue,
  checkBoxStatus
) {
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
  // Strike through out of local storage
  let inputElementForCheckbox = document.getElementById(toDoID);
  if (checkBoxStatus == true) {
    inputElementForCheckbox.style.textDecoration = "line-through";
    inputElementForCheckbox.children[1].checked = true;
  } else {
    inputElementForCheckbox.style.textDecoration = "";
    inputElementForCheckbox.children[1].checked = false;
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
    getAllObjectsFromLocalStorage();
    //Getting the highest sequence number from objects of the local storage to create one that is higher than all others
    let maxid = 0;
    if (allToDoObjFromLocalStorage.length > 0) {
      allToDoObjFromLocalStorage.map(function(obj) {
        if (obj.sequenceNumber > maxid) maxid = obj.sequenceNumber;
      });
      var sequenceNumber = maxid + 1;
    } else {
      var sequenceNumber = 1;
    }
    toDoObjForLocalStorage = new ToDo(
      sequenceNumber,
      toDoID,
      toDoLiTextValue,
      false
    );
    localStorage.setItem(toDoID, JSON.stringify(toDoObjForLocalStorage));
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

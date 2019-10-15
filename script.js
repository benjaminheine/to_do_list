var toDoList = [];
const itemList = document.getElementById("toDoList");
document.getElementById("submitButton").addEventListener("click", submitClick);
document.getElementById("clearButton").addEventListener("click", deleteAllItems);

function crossToDo(event) {
  event.preventDefault();
  checkbox = event.srcElement.checked;
  if (checkbox == true) {
    document.getElementById(event.target.id).style.textDecoration =
      "line-through";
  } else {
    document.getElementById(event.target.id).style.textDecoration = "";
  }
}

function submitClick(event) {
  event.preventDefault();

  // Create a <li> node
  newItem = document.createElement("LI");
  const now = new Date().toISOString();
  const deleteNow = now + 1;
  newItem.id = now;
  newItem.className = "list-group-item";
  // Create delete button
  var itemDelete = document.createElement("button");
  itemDelete.className = "btn btn-danger btn-sm float-right delete";
  itemDelete.appendChild(document.createTextNode("X"));
  itemDelete.id = now + 1;
  console.log(itemDelete.id);
  newItem.appendChild(itemDelete);

  // Create a <INPUT> node with attributes
  const input = document.createElement("input");
  input.type = "checkbox";
  input.id = now;
  newItem.appendChild(input);

  const submitValue = document.getElementById("newTask").value;
  const text = document.createTextNode(submitValue);
  newItem.appendChild(text);

  //var arrayId = newItem.id;
  toDoList.push(newItem.id);
  // Get the <ul> element to insert a new node
  const list = document.getElementById("toDoList");
  list.appendChild(newItem);

  // create an event
  document.getElementById(now).addEventListener("change", crossToDo);
  // create an event for the itemDelete button
  document.getElementById(deleteNow).addEventListener("click", deleteItem);
}

function deleteItem(e) {
  if (e.target.classList.contains("delete")) {
    var arrayPosition = toDoList.indexOf(e.target.parentElement.id);
    toDoList.splice(arrayPosition);
    // console.log(toDoList);
    var li = e.target.parentElement;
    itemList.removeChild(li);
    //console.log(e.target.parentElement.id);
    
  }
}

function deleteAllItems(e) {
console.log(itemList.children);
//var allItems = ;
//console.log(allItems);
//itemList.remove(allItems);
for (i in toDoList)
{
  var element = document.getElementById(toDoList[i]);
  element.parentElement.removeChild(element);
  console.log(element);
  //console.log(toDoList[i]);
} 

//itemList.parentNode.removeChild(toDoList);
}
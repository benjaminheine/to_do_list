var toDoList = [];

document.getElementById("submitButton").addEventListener("click", submitClick);

function crossToDo(event) {
  event.preventDefault();
  checkbox = event.srcElement.checked;
  if (checkbox == true) {
    document.getElementById(event.target.id).style.textDecoration = "line-through";
  } else {
    document.getElementById(this.id).style.textDecoration = "";
  }
}

function submitClick(event) {
  event.preventDefault();
  
  // Create a <li> node
  newItem = document.createElement("LI"); 
  const now = new Date().toISOString();
  newItem.id = now;

  // Create a <INPUT> node with attributes
  const input = document.createElement("input");
  input.type = "checkbox";
  input.id = now;
  newItem.appendChild(input);

  const submitValue = document.getElementById("newTask").value;
  const text = document.createTextNode(submitValue);
  newItem.appendChild(text);

  var arrayId = newItem.id;
  toDoList.push(arrayId);
  // Get the <ul> element to insert a new node
  const list = document.getElementById("toDoList"); 
  list.appendChild(newItem);

  // create an event
  document.getElementById(now).addEventListener("change", crossToDo);
}

console.log(toDoList);

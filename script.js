var todolist = [];
var submitvalue
document.getElementById("submitbutton").addEventListener("click", SubmitClick);

function SubmitClick(event) {
  event.preventDefault();
  var submitvalue = document.getElementById("newtask").value;
  var newItem = document.createElement("LI"); // Create a <li> node
  var textnode = document.createTextNode(submitvalue); // Create a text node
  newItem.appendChild(textnode); // Append the text to <li>
  var list = document.getElementById("ToDoList"); // Get the <ul> element to insert a new node
  list.insertBefore(newItem, list.childNodes[0]); // Insert <li> before the first child of <ul>
}
//console.log(todolist);


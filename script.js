var todolist = [];
var submitvalue
document.getElementById("submitbutton").addEventListener("click", SubmitClick);

function SubmitClick(event) {
  event.preventDefault();
  
  submitvalue = document.getElementById("newtask").value;
  // Create a <INPUT> node with attributes
  newItem = document.createElement("LI"); // Create a <li> node

  newItem.innerHTML='<input type="checkbox">' + submitvalue;
  
  
  // newItem.id=Date;
  // newItem.type='checkbox';
  // newItem.checked=false;
  

  // create label for <INPUT> with id

  // newLabelforItem= document.createElement("label");
  // newLabelforItem.setAttribute("for", newItem.id);
  // newLabelforItem.innerHTML = submitvalue;
  //textnode = document.createTextNode(submitvalue); // Create a text node
  //newItem.value=textnode;
  //newItem.appendChild(textnode); // Append the text to <li>
  list = document.getElementById("ToDoList"); // Get the <ul> element to insert a new node
  list.insertBefore(newItem, list.childNodes[0]); // Insert <li> before the first child of <ul>
  //listcheckbox = document.getElementById(newItem.id);
  //listcheckbox.insertBefore(newLabelforItem,listcheckbox.childNodes[0]);
  //
  //todolist.push(list.childNodes[0]);
  //
  //console.log(todolist);
}
//console.log(todolist);


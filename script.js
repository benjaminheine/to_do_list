var todolist = [];
var submitvalue

document.getElementById("submitbutton").addEventListener("click", SubmitClick);
//document.querySelector('input').addEventListener("checked", CrossToDo);
//document.getElementById("todolist[]").addEventListener("checked", CrossToDo);






function CrossToDo(event){
  event.preventDefault();
  console.log(event);
}

function SubmitClick(event) {
  event.preventDefault();
  
  submitvalue = document.getElementById("newtask").value;
  // Create a <INPUT> node with attributes
  newItem = document.createElement("LI"); // Create a <li> node

  var att = document.createAttribute("style");
  att.value="text-align:center";
  newItem.setAttributeNode(att);
  newItem.innerHTML='<input type="checkbox">' + submitvalue;
  
  var now = new Date();
  newItem.id=now;
  var arrayid=newItem.id
  todolist.push(arrayid);

  // create an event
  // var event = new Event(newItem.id);
  // document.getElementById(now).addEventListener("click", CrossToDo);

  //console.log(arrayid);
  
  list = document.getElementById("ToDoList"); // Get the <ul> element to insert a new node
  list.insertBefore(newItem, list.childNodes[0]); // Insert <li> before the first child of <ul>
  
}

console.log(todolist);




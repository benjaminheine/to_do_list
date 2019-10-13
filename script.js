var todolist = [];
var submitvalue

document.getElementById("submitbutton").addEventListener("click", SubmitClick);
//document.querySelector('input').addEventListener("checked", CrossToDo);
//document.getElementById("submitbutton").addEventListener("click", SubmitClick);
//document.getElementById("submitbutton").addEventListener("click", SubmitClick);





function CrossToDo(event){
  event.preventDefault();
  console.log(this.checked);
  console.log(event);
  checkbox = document.getElementById(this.id);
  if (this.checked == true){
    document.getElementById(this.id).style.textDecoration = 'line-through';
  }else{
    document.getElementById(this.id).style.textDecoration = '';
  }
  
}

function SubmitClick(event) {
  event.preventDefault();
  
  submitvalue = document.getElementById("newtask").value;
  // Create a <INPUT> node with attributes
  newItem = document.createElement("LI"); // Create a <li> node
  var now = new Date();
  newItem.id=now;
  var idatt = document.createAttribute("id");
  idatt.value = now;
  var att = document.createAttribute("style");
  att.value="text-align:center";
  newItem.setAttributeNode(att);
  //newItem.innerHTML='<input type="checkbox>"' + submitvalue;
   newItem.innerHTML="<input id="+ now + ' type="checkbox" > <label for="' + now + '"' + ">" + submitvalue + "</label>";
 
  
  var arrayid=newItem.id;
  todolist.push(arrayid);

  // create an event
  

  
  list = document.getElementById("ToDoList"); // Get the <ul> element to insert a new node
  list.insertBefore(newItem, list.childNodes[0]); // Insert <li> before the first child of <ul>
  var checkbox = document.getElementById(newItem.id);
  document.getElementById(now).addEventListener('change', CrossToDo);

}

console.log(todolist);




// var todosubmit = document.getElementById('submitbutton').addEventListener('click', SubmitClick(event));
// function SubmitClick(event) {
//     var submitvalue = ('newtask');
//     event.preventDefault()
//     console.log(submitval);
// }
function SubmitClick(){
var todosubmit = document.getElementById("newtask").value;
safedTodo.innerHTML = "<ul>"+todosubmit+"</ul>";
//document.writeln(todosubmit);
}

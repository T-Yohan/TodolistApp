const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");


function addTask(){
  console.log("page ajoutée");
if (inputBox.value === '') {
  alert("you must write something!");
;
} else {
    addItemToLi(inputBox.value);
    addTaskToApi(inputBox.value);
}
inputBox.value = "";
saveData()
}
listContainer.addEventListener("click",function(e){
  if (e.target.tagName === "LI") {
    console.log("tache modifiée");
    e.target.classList.toggle("checked");
    saveData()
  } else if(e.target.tagName === "SPAN"){
    console.log("tache suppriméé");
    e.target.parentElement.remove();
    saveData()
  }
}, false);
function saveData(){
  console.log("donnée sauvegardée");
  localStorage.setItem("data", listContainer.innerHTML);
}
function showTask(){
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
readAllElementInApi();
//ajouter des éléments à la liste
//let variable modifiable
//const variable constante non modifiable

function addItemToLi(item){
  let li = document.createElement("li");
  li.innerHTML = inputBox.value;
  //ajouter l'enfant crée
  listContainer.appendChild(li);
  let span = document.createElement("span");
  span.innerHTML = "\u00d7";
  li.appendChild(span);
}
//lire les données de l'Api
function readAllElementInApi(){
    console.log("interrogation Api");
    fetch('http://127.0.0.1:8000/api/Todolist').then(response =>{
      console.log(response.json());
      return response;
    });
}
//async = fonction asyncrone
async function readAllElementInApi(){
  console.log('int Api');
  //await mot clé pour attendre l'execution d'un code
  //fetch = interrogation de l'Api
    const response = await  fetch('http://127.0.0.1:8000/api/Todolist');
    //conversion de la réponse en tableau
    const tasks = await response.json();
    console.log(tasks);
    tasks.forEach(item => {
      // console.log(item.taches);
      addItemToLi(item.taches);
    });
}
async function addTaskToApi(task){
  //
    let formData = new FormData();
    formData.append("taches",task);
    formData.append("etat",0);
    console.log(formData);
    const response = await fetch('http://127.0.0.1:8000/api/Todolist',{
      method:"Post",
      body:formData,
    });
    console.log(response.json);
}
addTaskToApi();
const tbody = document.querySelector('#tbody')
const saveButton = document.getElementById("saveButton")
const nameInput = document.querySelector("#name")
const idInput = document.querySelector("#id")
const cityInput = document.querySelector("#city")
const salaryInput = document.querySelector("#salary")

//Read
const url = 'http://localhost:8000/api/employees'

//Promise

function getEmployees(){
  fetch(url)
  .then((response) => {
    return response.json()
  })
  .then((result) => {
    renderTbody(result.data)
  });
}


getEmployees()
function renderTbody(empList) {
  var tbodyContent = '';
  empList.forEach((emp) => {
    var row = `
    <tr>
      <td>${emp.id}</td>      
      <td>${emp.name}</td>      
      <td>${emp.city}</td>      
      <td>${emp.salary}</td>
      <td>
        <button class="btn btn-danger" onclick="deleteEmployee(${emp.id})">
        Törlés
        </button>
      </td>
      <td>
        <button class="btn btn-warning" onclick="updateEmployee(${emp})">
        Szerkesztés
        </button>
      </td>
    </tr>
    `;    
    tbodyContent += row;
  })
  tbody.innerHTML = tbodyContent
  

}
//create művelet

saveButton.addEventListener("click",()=>{
  //javascript objektum
  const emp  = {
    name:nameInput.value,
    city:cityInput.value,
    salary:salaryInput.value
  }
  addEmployee(emp)
  clearFields()
})

function clearFields(){
  nameInput.value="";
  idInput.value="";
  cityInput.value="";
  salaryInput.value="";
}

function addEmployee(empData){
  fetch(url,{
    method: 'POST',
    body: JSON.stringify(empData),
    headers:{
      "Content-Type":"application/json"
    }
  })
  .then(response => response.json())
  .then(result=>{
    console.log(result),
    getEmployees()
  })
  .catch(err =>console.log(err))
}

function deleteEmployee(id){
  const delURL = url+"/"+id;
  fetch(delURL,{
    method:"DELETE"})
  .then(response => response.json()
  .then(result=>
    console.log(result)),
    getEmployees())
}
function updateEmployee(emp){
  console.log("emp: ",emp)
}
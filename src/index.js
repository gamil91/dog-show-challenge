document.addEventListener('DOMContentLoaded', () =>{
    getDogs()
    dogForm = document.getElementById("dog-form")
    dogForm.addEventListener("submit", (e) => submitForm(e))
})

        function getDogs(){
            return fetch("http://localhost:3000/dogs")
            .then(resp => resp.json())
            .then(dogs => eachDog(dogs))
        }
    
        function eachDog(dogs){
           
            const tableBody = document.getElementById("table-body")
            tableBody.innerHTML = ""
            
            dogs.forEach(dog => {
                
                const tableRow = document.createElement("tr")
                tableRow.id = dog.id
    
                const name = document.createElement("td")
                name.textContent = dog.name
    
                const breed = document.createElement("td")
                breed.textContent = dog.breed
    
                const sex = document.createElement("td")
                sex.textContent = dog.sex

                const edit = document.createElement("td")
                const editBtn = document.createElement("button")
                editBtn.textContent = "Edit Dog"
                editBtn.addEventListener("click", () => editDog(dogForm, dog))
                

                edit.appendChild(editBtn)
                tableRow.append(name, breed, sex, edit)
                tableBody.appendChild(tableRow)
            });
        }
    
        function editDog(dogForm, dog){
            dogForm.reset()
            dogForm.name.value = dog.name
            dogForm.breed.value = dog.breed
            dogForm.sex.value = dog.sex
            dogForm.dataset.id = dog.id
        }

         function submitForm(e) {
                
            e.preventDefault()

            console.log(e.dataset)

            let formData = {
                name:e.target.name.value,
                breed:e.target.breed.value,
                sex:e.target.sex.value
            }
    
                configObj = {
                    method: "PATCH",
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            
            const trId = e.target.dataset.id
            const tr = document.getElementById(trId)
                
            return fetch("http://localhost:3000/dogs" + `/${e.target.dataset.id}`, configObj)
            .then(resp => resp.json())
            .then((json) => {
                tr.getElementsByTagName("td")[0].innerText = json.name
                tr.getElementsByTagName("td")[1].innerText= json.breed
                tr.getElementsByTagName("td")[2].innerText= json.sex
                getDogs()      
                    
                })
               
            
              }
            
           
       
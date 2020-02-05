const dogsURL = "http://localhost:3000/dogs/"
document.addEventListener('DOMContentLoaded', () => {

// On page load, render a list of already registered dogs in the table. You can fetch these dogs from http://localhost:3000/dogs.
function fetchDogs(){
    fetch(dogsURL)
        .then(response => response.json())
        .then(dogs => renderDogs(dogs))
}

function renderDogs(dogs){
    for (let i = 0; i < dogs.length; i++) {
        renderDog(dogs[i]);
    }
}

function renderDog(dog){
    const tableBody = document.querySelector('#table-body')
    const trTag = document.createElement('tr')
    let tdName = document.createElement('td')
    tdName.innerText = dog.name
    let tdBreed = document.createElement('td')
    tdBreed.innerText = dog.breed
    let tdSex = document.createElement('td')
    tdSex.innerText = dog.sex
    const buttonTag = document.createElement('button')
    buttonTag.innerText = "Edit"
    // buttonTag.id = dog.id
    trTag.append(tdName, tdBreed, tdSex, buttonTag)
    tableBody.append(trTag)

    buttonTag.addEventListener('click', function(e){
        e.target.innerText = "Editing above"
        const form = document.querySelector('#dog-form')
        const rowOfDog = e.target.parentNode
        form.addEventListener('submit', function(e){
            // console.log(e)
            e.preventDefault()
            const name = document.querySelector('input[name="name"]').value
            const breed = document.querySelector('input[name="breed"]').value
            const sex = document.querySelector('input[name="sex"]').value
            const editDog = {
                name: name,
                breed: breed,
                sex: sex
            }

            tdName.innerText = name
            tdBreed.innerText = breed
            tdSex.innerText = sex
            

            const configurationObject = {
                method: "PATCH",
                headers: {
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                },
                body: JSON.stringify(editDog)
            }
            fetch(dogsURL + dog.id, configurationObject)
                .then(response => response.json())
                .then(function(editDog){    
                })
            
        })
    })
}


// Make a dog editable. Clicking on the edit button next to a dog should populate the top form with that dog's current information.
// On submit of the form, a PATCH request should be made to http://localhost:3000/dogs/:id to update the dog information 
// (including name, breed and sex attributes).
// Once the form is submitted, the table should reflect the updated dog information. 
// There are many ways to do this. You could search for the table fields you need to edit and update each of them in turn, 
// but we suggest making a new get request for all dogs and rerendering all of them in the table. 
// Make sure this GET happens after the PATCH so you can get the most up-to-date dog information.
fetchDogs()
})
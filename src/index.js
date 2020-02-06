const getElement = (element) => document.querySelector(element)
const makeElement = (element) => document.createElement(element)

const dogsURL = "http://localhost:3000/dogs/"

document.addEventListener('DOMContentLoaded', () => {
   
    const dogsTable = getElement("#table-body")
    const dogForm = getElement("#dog-form")

    // fetch data from API
    const getAndRenderDogs = (url) => { 
        fetch(url)
            .then( resp => resp.json() )
            .then( dogs => renderDogs(dogs) )
    }

    // clear existing table then render each dog in array
    const renderDogs = (dogs) => {
        dogsTable.innerHTML = ""
        for(const dog of dogs){
            createDogRow(dog)
        }
    }

    // create dog row in table
    const createDogRow = (dog) => {
        const { name, breed, sex } = dog
        let row = makeElement("tr")
        let dogName = makeElement("td")
        dogName.innerText = name
        let dogBreed = makeElement("td")
        dogBreed.innerText = breed
        let dogSex = makeElement("td")
        dogSex.innerText = sex
        let edit = makeElement("td")
        let editButton = makeElement("button")
        editButton.innerText = "Edit"
        createEdit(editButton, dog)
        edit.append(editButton)

        row.append(dogName, dogBreed, dogSex, edit)
        dogsTable.append(row)
    }

    // add event listener to edit button

    const createEdit = (button, dog) => {
        const { id, name, breed, sex } = dog
        button.addEventListener("click", () => {
            loadDogInEditForm(dog) 
        })
    }

    // populate edit form at top with dog's details when click edit button on dog
    const loadDogInEditForm = (dog) => {
        const { name, breed, sex } = dog
        dogForm.name.value = name
        dogForm.breed.value = breed
        dogForm.sex.value = sex
        dogForm.addEventListener("submit", (e) => {
            e.preventDefault()
            updateDog(dog)
            e.target.reset()
        })
    }

    // update dog when submit edit form
    const updateDog = (dog) => {
        const { id } = dog
        const configObj = {
            method: "PATCH",
            headers: {"content-type":"application/json"},
            body: JSON.stringify({
                "name": dogForm.name.value,
                "breed": dogForm.breed.value,
                "sex": dogForm.sex.value
            })
        }
        fetch(dogsURL + id, configObj)
            .then(getAndRenderDogs(dogsURL))
    }



    getAndRenderDogs(dogsURL)
})
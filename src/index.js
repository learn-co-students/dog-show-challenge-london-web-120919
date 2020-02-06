document.addEventListener('DOMContentLoaded', () => {
    const urlDogs = 'http://localhost:3000/dogs/';

    //html elements
    const tableBody = document.querySelector('#table-body')
    //form
    const form = document.getElementById('dog-form')

    function fetchDogs() {
        fetch(urlDogs)
            .then(resp => resp.json())
            .then(allTheDogs)
    }

    function allTheDogs(json) {
        for(let dog of json) {
            renderDog(dog)
        }
    }

    function renderDog(dog) {
        const tr = document.createElement('tr')
        tr.id = dog.id;

        const tdName = document.createElement('td')
        tdName.innerText = dog.name
        tdName.classList = "name";

        const tdBreed = document.createElement('td')
        tdBreed.innerText = dog.breed
        tdBreed.classList = "breed"

        const tdSex = document.createElement('td')
        tdSex.innerText = dog.sex
        tdSex.classList = "sex"

        const tdButton = document.createElement('td')
        const button = document.createElement('button')
        button.innerText = "Edit Dog"
        button.addEventListener('click',()=>
        addDogToEdit(dog)
        )

        tdButton.appendChild(button)
        tr.append(tdName,tdBreed,tdSex,tdButton)
        tableBody.append(tr)

        

    }

    //////////// Edit Dog ////////////////////////////////////

    //ad event listener do edit dog button
     //when clicked it should populate the edit form 
    ///// Event Listerner
    function addDogToEdit(dog){
        form.name.value = dog.name;
        form.sex.value = dog.sex;
        form.breed.value = dog.breed;

        form.addEventListener('submit', (e)=>{
            e.preventDefault()
            dogThings(dog)
        })

    }

    //when clicked submit it should do a patch request
    
    function dogThings(dog) {
        const dogDetails = {
            name: form.name.value,
            breed: form.breed.value,
            sex: form.sex.value
        }
        editDog(dogDetails,dog)
    }

    function editDog(dogDetails,dog) {
        return fetch(urlDogs+dog.id, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(dogDetails)
        })
        .then(resp => resp.json())
        .then(dog => updateDogDetails(dog))
    }

    function updateDogDetails(dog) {
       let dogTr =document.getElementById(dog.id)

       dogTr.querySelector('.name').innerText = dog.name;
       dogTr.querySelector('.breed').innerText = dog.breed;
       dogTr.querySelector('.sex').innerText = dog.sex;
   
        
    }


    fetchDogs()
})
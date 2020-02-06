document.addEventListener('DOMContentLoaded', () => {

    const baseURL = "http://localhost:3000/dogs/"

    function fetchAndRenderDogs() {
        fetch(baseURL)
            .then(resp => resp.json())
        .then(renderDogs)
    }
    function renderDogs(dogs) { 
        dogs.forEach(dog => { 
            showDog(dog)
        })
    }
    
    function showDog(dog) { 
        const bodyOfTable = document.querySelector("#table-body")
        const trROW = document.createElement('tr')

        let tdNAME = document.createElement('td')
        let tdBREED = document.createElement('td')
        let tdSEX = document.createElement('td')
        const tdEDIT = document.createElement('td')
        const editBtn = document.createElement('button')
        editBtn.innerText = "Edit Dog"
        tdEDIT.appendChild(editBtn)

        tdNAME.innerText = dog.name
        tdBREED.innerText = dog.breed
        tdSEX.innerText = dog.sex

        trROW.append(tdNAME, tdBREED, tdSEX, tdEDIT)
        bodyOfTable.appendChild(trROW)

        editBtn.addEventListener('click', function (e) {
            e.target.innerText = "Editing"
            console.log(dog)
            const formEdit = document.querySelector('#dog-form')
            formEdit.name.value = dog.name
            formEdit.breed.value = dog.breed
            formEdit.sex.value = dog.sex
            let id = dog.id

            const submitFromBtn = document.querySelector('#submit')

            formEdit.addEventListener('submit', function (e){ 
                e.preventDefault()
                
                let dogObject = {
                    name: formEdit.name.value,
                    breed: formEdit.breed.value,
                    sex: formEdit.sex.value
                }

                tdNAME.innerText = dogObject.name
                tdBREED.innerText = dogObject.breed
                tdSEX.innerText = dogObject.sex

                fetch(baseURL + id, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dogObject)
                })
                .then(response =>response.json())

            })

        })
       
        
    }









    fetchAndRenderDogs()
})
console.log("client js file is loaded")


var weatherForm = document.querySelector('form')
var search = document.querySelector('input')
var messageOne = document.querySelector('#messageOne')
var messageTwo = document.querySelector('#messageTwo')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    var location = search.value

    console.log("location input:",  location)

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                console.log(data.error)
            }
            else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})
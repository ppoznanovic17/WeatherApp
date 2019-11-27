const weatherForm = document.querySelector('form')
const searchInp = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = "Loading..."
messageTwo.textContent = ""

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = searchInp.value

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error || data.location == undefined){
                messageOne.textContent = "Address not found"
            }else{
                messageOne.textContent = 'Location: ' + data.location
                messageTwo.textContent = '' + data.forecast
            }
        })
    })

})

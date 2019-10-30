console.log('Java script file was loded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const currentWeather = document.querySelector('#messageWeather')
const currentError = document.querySelector('#messageError')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    currentError.textContent = 'Working, please wait...'
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data2) => {
        if (data2.error) {
            currentWeather.textContent = ''
            currentError.textContent = data2.error
            console.log(data2.error)
        } else {
            currentError.textContent = data2.location
            currentWeather.textContent = data2.forecast
            console.log(data2.forecast)
            console.log(data2.location)
        }
    })
})
})
const div1 = document.createElement('div')
div1.classList.add("container")
document.body.appendChild(div1)

const h1 = document.createElement('h1')
h1.id = "title"
h1.classList.add("text-center")
h1.textContent = "THE WEATHER APP"
div1.appendChild(h1)

const div2 = document.createElement('div')
div2.classList.add("row")
// div2.classList.add("row-cols-lg-4")
div1.appendChild(div2)


async function getCountryData() {
    let res = await fetch("https://restcountries.com/v3.1/all")
    let countriesData = await res.json()
    console.log(countriesData)

    for (let each of countriesData) {

        // console.log(`CountryCapital ==> ${each.capital[0]} Region ==> ${each.region} Latlng ==> ${each.latlng} CountryName ==> ${each.name.common} Flag ==> ${each.flags.png} CountryCodes ==> ${each.cioc}`)

        const card = document.createElement("div");
        card.classList.add("card", "col-lg-4", "col-md-6", "col-sm-12", "mb-4", "bg-secondary-subtle")
        // card.classList.add("col-md-4", "mb-4");

        const lat = each.latlng[0]
        const lon = each.latlng[1]

        // console.log(lat, lon)

        card.innerHTML = `
            <div class="card-header">${each.name.common}</div>
            <div class="card-body">
                <img src="${each.flags.png}" class="card-img-top" alt="${each.name.common} Flag" max-width="220px" height="170px">
                <p class="card-text">Capital: ${each.capital}</p>
                <p class="card-text">Continent: ${each.region}</p>
                <p class="card-text">Latlng: ${each.latlng}</p>
                <p class="card-text">Country Code: ${each.cioc}</p>
                <button class="btn btn-primary" data-lat="${lat}" data-lon="${lon}">Click for Weather</button>
                <p class="card-text displayData mt-3 fs-5 bg-white"></p>
            </div>
        `;

        div2.appendChild(card)

    }

    // getWeatherData()

}

getCountryData()


div2.addEventListener('click', function (event) {

    if (event.target.tagName === 'BUTTON') {
        // alert("Clicked!");
        const lat = event.target.dataset.lat
        const lon = event.target.dataset.lon

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9c7796f02582757bddf232566f9e3a42`)
        .then((response => response.json()))
        .then(data => {
            // console.log(Data)

            const temperature = (data.main.temp - 273.15).toFixed()
            const weatherDescription = data.weather[0].description
            const temperatureFeelsLike = (data.main.feels_like - 273.15).toFixed()
            const humidity = data.main.humidity
            const pressure = data.main.pressure
            const name = data.name
            const visibility = data.visibility
            const weatherReport = `Name: ${name}  |  Temperature: ${temperature}°C  |  Feels Like: ${temperatureFeelsLike}°C  |  Description: ${weatherDescription}  |  Humidity: ${humidity}% | Pressure: ${pressure} hPa |  Visibility: ${visibility} meters`

            // alert(weatherReport)

            const cardBody = event.target.parentNode
            const displayArea = cardBody.querySelector('.displayData')

            if(displayArea.textContent) {
                displayArea.textContent = ''
                // displayArea.textContent = weatherReport
            } else {
                displayArea.textContent = weatherReport
            }
            // console.log(displayArea.textContent)
        })
        .catch(error => alert("Error! Couldn't fetch the weather data"))
    }
});





// Event delegation on div2 to catch click events on buttons
// div2.addEventListener('click', function (event) {
//     if (event.target.tagName === 'BUTTON') {
//         alert("Clicked!");
//     }
// });

// function getWeatherData() {
//     const buttons = document.querySelectorAll('button')

//     buttons.forEach((button) => {
//         button.addEventListener('click', () => {
//             alert("Clicked!")
//         })
//     })
// }

// getWeatherData()

/* <div class="card"></div> */
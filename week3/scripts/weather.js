const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=metric&appid=aecb17add2375f7114f5286dd070c1af';

async function apiFecth() { 
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw new Error(await response.text());
        }
    } catch (error){
        console.error('There was an error: ', error);
    }
}

function displayResults(data) { 
    captionDesc.innerHTML = data.weather[0].description
    currentTemp.innerHTML = `${data.main.temp}&deg;C`
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    weatherIcon.setAttribute('SRC', iconsrc)
    weatherIcon.setAttribute('alt', data.weather[0].description)
}


apiFecth();
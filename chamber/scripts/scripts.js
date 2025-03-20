document.addEventListener("DOMContentLoaded", async function () {
    const currentYearEl = document.getElementById("currentYear");
    if (currentYearEl) {
        currentYearEl.textContent = `${new Date().getFullYear()}`;
    }
    const lastModifiedEl = document.getElementById("lastModified");
    if (lastModifiedEl) {
        lastModifiedEl.textContent = `Last Update: ${document.lastModified}`;
    }
    const hamburgerElement = document.querySelector("#menu-icon");
    const navElement = document.querySelector("#animation");
    if (hamburgerElement && navElement) {
        hamburgerElement.addEventListener("click", () => {
            navElement.classList.toggle("open");
            hamburgerElement.classList.toggle("open");
        });
    }

    const businessSection = document.querySelector(".business-list");
    const toggleButton = document.getElementById("toggle-view");
    let businessesData = []; 

    async function fetchBusinesses() {
        try {
            const response = await fetch("data/members.json");
            if (!response.ok) throw new Error("Error loading data");
            businessesData = await response.json();
            displayBusinesses("grid"); 
        } catch (error) {
            console.error("Error:", error);
        }
    }

    function displayBusinesses(viewType) {
        if (!businessSection || !businessesData.length) return;

        businessSection.innerHTML = "";
        businessSection.classList.toggle("list-layout", viewType === "list");

        businessesData.forEach(business => {
            const businessCard = document.createElement("div");
            businessCard.classList.add("business-card");
            if (viewType === "list") businessCard.classList.add("list-view");

            businessCard.innerHTML = `
                <h3>${business.name}</h3>
                <p class="tagline">${business.tagline}</p>
                <div class="business-content">
                    <div class="business-image">
                        <img src="${business.image}" alt="${business.name}">
                    </div>
                    <div class="business-info">
                        <p><strong>Email:</strong> <a href="mailto:${business.email}">${business.email}</a></p>
                        <p><strong>Phone:</strong> ${business.phone}</p>
                        <p><strong>Website:</strong> <a href="${business.website}" target="_blank">${business.website}</a></p>
                        <p><strong>Address:</strong> ${business.address}</p>
                        <p><strong>Membership:</strong> ${getMembershipLevel(business.membership)}</p>
                    </div>
                </div>
            `;
            businessSection.appendChild(businessCard);
        });
    }

    function toggleView() {
        const isGrid = businessSection.classList.contains("list-layout");
        displayBusinesses(isGrid ? "grid" : "list");

        const iconEl = document.getElementById("icon");
        if (iconEl) {
            iconEl.src = isGrid ? "images/grid.png" : "images/list.png";
            iconEl.alt = isGrid ? "Grid View" : "List View"
        }
    }

    function getMembershipLevel(level) {
        switch (level) {
            case 1: return "Member";
            case 2: return "Silver";
            case 3: return "Gold";
            default: return "Unknown";
        }
    }

    await fetchBusinesses();
    if (toggleButton) {
        toggleButton.addEventListener("click", toggleView);
    }
});

// Weather 

const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#description'); 
const highTemp = document.querySelector('#high'); 
const lowTemp = document.querySelector('#low'); 
const humidity = document.querySelector('#humidity'); 
const sunrise = document.querySelector('#sunrise'); 
const sunset = document.querySelector('#sunset');  

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=25.69&lon=-100.32&units=metric&appid=';

async function apiFecth() { 
    try {
        const response = await fetch(url);``
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            displayResults(data);
        } else {
            throw new Error(await response.text());
        }
    } catch (error){
        console.error('There was an error: ', error);
    }
}

// Change the time to AM/PM
function formatTime(unixTimestamp, timezoneOffset) {
    const date = new Date((unixTimestamp + timezoneOffset) * 1000);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true});
}

function displayResults(data) { 
    captionDesc.innerHTML = data.weather[0].description;
    currentTemp.innerHTML = `${data.main.temp}&deg;C`;
    highTemp.innerHTML = `High: ${data.main.temp_max}&deg;C`;
    lowTemp.innerHTML = `Low: ${data.main.temp_min}&deg;C`;
    humidity.innerHTML = `Humidity: ${data.main.humidity}%`;

    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    weatherIcon.setAttribute('SRC', iconsrc)
    weatherIcon.setAttribute('alt', data.weather[0].description)

    const timezoneOffset = data.timezone;
    sunrise.innerHTML = `Sunrise: ${formatTime(data.sys.sunrise, timezoneOffset)}`;
    sunset.innerHTML = `Sunset: ${formatTime(data.sys.sunset, timezoneOffset)}`;

}

apiFecth();
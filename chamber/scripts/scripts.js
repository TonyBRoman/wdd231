document.addEventListener("DOMContentLoaded", async function () {

    // Get the Year 
    const currentYearEl = document.getElementById("currentYear");
    if (currentYearEl) {
        currentYearEl.textContent = `${new Date().getFullYear()}`;
    }

    // Get the Date
    const lastModifiedEl = document.getElementById("lastModified");
    if (lastModifiedEl) {
        lastModifiedEl.textContent = `Last Update: ${document.lastModified}`;
    }

    async function loadPlaces() {
        try {
            const response = await fetch("data/places.json");
            if (!response.ok) throw new Error("Error loading places data");
            const places = await response.json();

            const container = document.querySelector("#places-container");
            if(!container) return;

            container.innerHTML = "";

            places.slice(0, 8).forEach(place => { 
                const card = document.createElement("div");
                card.classList.add("place-card");

                card.innerHTML = `
                <h2>${place.name}</h2>
                    <figure>
                        <img src="${place.image}" alt="${place.name}" width="300" height="200" loadig="lazy">
                    </figure>
                    <address>${place.address}</address>
                    <p>${place.description}</p>
                    <button class="learn-more">Learn More</button>
                `;
                container.appendChild(card);
            });
        } catch(error) {
            console.error("Error loading places:", error);
        }
    }

    function displayLastVisitMessage() {
        const sidebar = document.querySelector("#sidebar");
        if (!sidebar) return;

        const lastVisit = localStorage.getItem("lastVisit");
        const now = new Date();
        localStorage.setItem("lastVisit", now.toISOString());

        if (!lastVisit) {
            sidebar.textContent = "Welcome! Let us know if you have any questions";
        } else { 
            const lastVisitDate = new Date(lastVisit);
            const diffDays = Math.floor((now - lastVisitDate) / (1000 * 60 * 60 * 24));

            if (diffDays === 0) {
                sidebar.textContent = "Back so soon! Awesome!";
            } else if (diffDays === 1) { 
                sidebar.textContent = "Welcome back! You last visited yesterday.";
            } else { 
                sidebar.textContent = `Welcome back! You last visited ${diffDays} days ago.`;
            }
        }
    }

    loadPlaces();
    displayLastVisitMessage();


    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        const now = new Date();
        const formattedDate = now.toISOString();
        timestampField.value = formattedDate;
    }
    // Hamburger Icon
    const hamburgerElement = document.querySelector("#menu-icon");
    const navElement = document.querySelector("#animation");
    if (hamburgerElement && navElement) {
        hamburgerElement.addEventListener("click", () => {
            navElement.classList.toggle("open");
            hamburgerElement.classList.toggle("open");
        });
    }

    // Business Section
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
        if (!businessSection || businessesData.length === 0) return;

        businessSection.innerHTML = ""; 
        businessSection.classList.toggle("list-layout", viewType === "list");

        const shuffledBusinesses = [...businessesData]
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);

        shuffledBusinesses.forEach(business => {
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

    // Toggle 
    function toggleView() {
        const isGrid = businessSection.classList.contains("list-layout");
        displayBusinesses(isGrid ? "grid" : "list");

        const iconEl = document.getElementById("icon");
        if (iconEl) {
            iconEl.src = isGrid ? "images/grid.png" : "images/list.png";
            iconEl.alt = isGrid ? "Grid View" : "List View";
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

    fetchBusinesses();

    if (toggleButton) {
        toggleButton.addEventListener("click", toggleView);
    }

    const form =document.querySelector("form");

    if (form) { 
        form.addEventListener("submit", function (event) {
            let isValid = true;
            
            // Organizational Title validation
            const titleInput = document.querySelector("[name='organizational-title']");
            const titlePattern = /^[A-Za-z][A-Za-z\s-]{6,}$/; 
    
            if (titleInput && !titlePattern.test(titleInput.value)) {
                alert("Organizational Title must be at least 7 characters long and contain only letters, spaces, or hyphens.");
                isValid = false;
            }
    
            // Phone Validation
            const phoneInput = document.querySelector("[name='phone']");
            const phonePattern = /^[0-9]{10,15}$/;
    
            if (phoneInput && !phonePattern.test(phoneInput.value)) {
                alert("Please enter a valid phone number.");
                isValid = false;
            }
    
            if (!isValid) { 
                event.preventDefault();
            }
        });
    }
});

// Weather 
const currentTemp = document.querySelector('#current-temp');
const currentTempForecast = document.querySelector('#current-temp-forecast');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#description'); 
const highTemp = document.querySelector('#high'); 
const lowTemp = document.querySelector('#low'); 
const humidity = document.querySelector('#humidity'); 
const sunrise = document.querySelector('#sunrise'); 
const sunset = document.querySelector('#sunset');  

const forecastDay1 = document.querySelector('#forecast-day1');
const forecastDay2 = document.querySelector('#forecast-day2');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=25.69&lon=-100.32&units=metric&appid=aecb17add2375f7114f5286dd070c1af';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=25.69&lon=-100.32&units=metric&appid=aecb17add2375f7114f5286dd070c1af';

async function apiFetch() { 
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            displayResults(data);
        } else {
            throw new Error(await response.text());
        }
    } catch (error){
        console.error('There was an error:', error);
    }
}

async function fetchForecast() { 
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            throw new Error(await response.text());
        }
    } catch (error){
        console.error('There was an error:', error);
    }
}

// Change the time to AM/PM
function formatTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true, 
        timeZone: userTimeZone
    });
}

function displayResults(data) { 
    if (!currentTemp || !captionDesc || !weatherIcon || !highTemp || !lowTemp || !humidity || !sunrise || !sunset) {
        return; 
    }

    captionDesc.innerHTML = data.weather[0].description;
    currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;C`;
    currentTempForecast.innerHTML = `Today: ${Math.round(data.main.temp)}&deg;C`;
    highTemp.innerHTML = `High: ${Math.round(data.main.temp_max)}&deg;C`;
    lowTemp.innerHTML = `Low: ${Math.round(data.main.temp_min)}&deg;C`;
    humidity.innerHTML = `Humidity: ${data.main.humidity}%`;

    if (data.weather[0].icon) {
        const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        // console.log("icon Url:", data.weather[0].icon);
        weatherIcon.setAttribute('src', iconsrc);
        weatherIcon.setAttribute('alt', data.weather[0].description);
    }

    sunrise.innerHTML = `Sunrise: ${formatTime(data.sys.sunrise)}`;
    sunset.innerHTML = `Sunset: ${formatTime(data.sys.sunset)}`;
    
}

function displayForecast(data) {
    if (!forecastDay1 || !forecastDay2) {
        return;
    }

    const dailyForecast = {};
    const today = new Date().toISOString().split('T')[0];

    data.list.forEach(item => {
        const dateObj = new Date(item.dt * 1000);
        const dateKey = dateObj.toISOString().split('T')[0];
        if (dateKey > today && !dailyForecast[dateKey]) {
            dailyForecast[dateKey] = item;
        }
    });

    const forecastEntries = Object.entries(dailyForecast).slice(0, 2);

    if (forecastEntries[0]) {
        const dateObj = new Date(forecastEntries[0][0]);
        forecastDay1.innerHTML = `${dateObj.toLocaleDateString('en-US', { weekday: 'long'})}: ${Math.round(forecastEntries[0][1].main.temp)}&deg;C`;
    }
    if (forecastEntries[1]) {
        const dateObj = new Date(forecastEntries[1][0]);
        forecastDay2.innerHTML = `${dateObj.toLocaleDateString('en-US', { weekday: 'long'})}: ${Math.round(forecastEntries[1][1].main.temp)}&deg;C`;
    }
}

apiFetch();
fetchForecast();

// Open and close modals
document.querySelectorAll('.info-btn').forEach(button => {
    button.addEventListener('click', function() {
        const targetModalId = this.getAttribute('data-target');
        const targetModal = document.querySelector(targetModalId);
        if (targetModal) {
            targetModal.style.display = 'block';
        }
    });
});

document.querySelectorAll('.close-btn').forEach(button => {
    button.addEventListener('click', function() {
        const modal = this.closest('.modal');
        if (modal) {
            modal.style.display = 'none';
        }
    });
});

// Close modal if clicked outside the modal content
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});

const userInfoContainer = document.querySelector('#user-info');
if (userInfoContainer) { 
    const myInfo = new URLSearchParams(window.location.search);

    document.querySelector('#user-info').innerHTML = `
        <div class="info-container">
            <h1>Thank You for Enrolling!</h1>
            <p>Dear <strong>${myInfo.get('first-name')} ${myInfo.get('last-name')}</strong>,</p>
            <p>We have received your enrollment request. Here are your details:</p>
            <div class="user-details">
                <div class="detail">
                    <span class="label">📧 Email:</span> 
                    <span class="value">${myInfo.get('email')}</span>
                </div>
                <div class="detail">
                    <span class="label">📞 Phone:</span> 
                    <span class="value">${myInfo.get('phone')}</span>
                </div>
                <div class="detail">
                    <span class="label">🏢 Business/Organization:</span> 
                    <span class="value">${myInfo.get('organization')}</span>
                </div>
            </div>
            <p>We will contact you soon with more information.</p>
            <a href="index.html" class="return-btn">Return to Home</a>
        </div>
    `;
}

// Dark mode button 
const darkModeToggle = document.getElementById('darkModeToggle');

if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '◑'; 
} else {
    document.body.classList.remove('dark-mode');
    darkModeToggle.textContent = '◐'; 
}

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.textContent = '◑';
    } else {
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.textContent = '◐';
    }
});


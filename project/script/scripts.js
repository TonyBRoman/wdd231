document.addEventListener("DOMContentLoaded", async function () {
    // current year
    const currentYearEl = document.getElementById("currentYear");
    if (currentYearEl) {
        currentYearEl.textContent = `${new Date().getFullYear()}`;
    }

    // cats cards
    loadCats();

    async function loadCats() {
        try {
            const response = await fetch("data/cats.json");
            if (!response.ok) throw new Error("Error loading cats data");

            const cats = await response.json();
            const container = document.querySelector("#cats-container");
            if (!container) return;

            container.innerHTML = "";

            // Randomize cats
            cats.sort(() => 0.5 - Math.random());

            const currentPage = window.location.pathname;

            const catsToDisplay = currentPage.includes("cats.html") ? cats : cats.slice(0, 4);

            catsToDisplay.forEach(cat => {
                const article = document.createElement("article");
                article.classList.add("cat-card");
                article.style.opacity = 0;

                article.innerHTML = `
                    <img src="${cat.image}" alt="${cat.name}" loading="lazy">
                    <h3>${cat.name}</h3>
                    <p>${cat.age} ${cat.gender}. ${cat.description}</p>
                    <button class="btn more-info-btn">More info</button>
                `;

                container.appendChild(article);

                setTimeout(() => {
                    article.style.opacity = 1;
                }, 200);
            });

            setupModals();

        } catch (error) {
            console.error(error);
        }
    }

    function setupModals() {
        const btns = document.querySelectorAll(".more-info-btn");

        btns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const card = e.target.closest("article");
                const name = card.querySelector("h3").textContent;
                const desc = card.querySelector("p").textContent;
                const img = card.querySelector("img").src;

                fetch("data/cats.json")
                    .then(res => res.json())
                    .then(cats => {
                        const catData = cats.find(cat => cat.name === name);
                        if (!catData) return;

                        const hobbiesList = catData.hobbies.map(hobby => `<li>${hobby}</li>`).join("");
                        const vaccinesList = catData.vaccines.map(vaccine => `<li>${vaccine}</li>`).join("");

                        const modal = document.createElement("div");
                        modal.classList.add("modal");
                        modal.innerHTML = `
                            <div class="modal-content">
                                <span class="close">&times;</span>
                                <img src="${img}" alt="${name}">
                                <h3>${name}</h3>
                                <p>${desc}</p>
                                <h4>Hobbies:</h4>
                                <ul>${hobbiesList}</ul>
                                <h4>Vaccines:</h4>
                                <ul>${vaccinesList}</ul>
                                <a href="${catData.adoptionLink}" class="btn">Adopt ${name}</a>
                            </div>
                        `;

                        document.body.appendChild(modal);

                        modal.querySelector(".close").addEventListener("click", () => {
                            modal.remove();
                        });

                        modal.addEventListener("click", (event) => {
                            if (event.target === modal) {
                                modal.remove();
                            }
                        });
                    });
            });
        });
    }
});

// menu icon
const hamburgerElement = document.querySelector("#menu-icon");
const navElement = document.querySelector(".menu-links"); 

if (hamburgerElement && navElement) {
    hamburgerElement.addEventListener("click", () => {
        navElement.classList.toggle("open");
        hamburgerElement.classList.toggle("open");
    });
}

// Dark Mode button
const darkModeToggle = document.getElementById('darkModeToggle');

if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '◑'; 
} else {
    document.body.classList.remove('dark-mode');
    darkModeToggle.textContent = '◐'; 
}

darkModeToggle.addEventListener('click', () => {
    darkModeToggle.classList.add('rotate');

    setTimeout(() => {
        darkModeToggle.classList.remove('rotate');
    }, 500);

    // Dark Mode toggle
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.textContent = '◑';
    } else {
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.textContent = '◐';
    }
});

const userInfoContainer = document.querySelector('#confirmation-info');
if (userInfoContainer) { 
    const myInfo = new URLSearchParams(window.location.search);

    document.querySelector('#confirmation-info').innerHTML = `
        <div class="info-container">
            <h1>Thank You For Your Adoption Request!</h1>
            <p>Dear <strong>${myInfo.get('first-name')} ${myInfo.get('last-name')}</strong>,</p>
            <p>We have received your request to adopt a cat. Here are the details you provided:</p>
            <div class="user-details">
                <div class="detail">
                    <span class="label">📧 Email:</span> 
                    <span>${myInfo.get('email')}</span>
                </div>
                <div class="detail">
                    <span class="label">📞 Phone:</span> 
                    <span>${myInfo.get('phone')}</span>
                </div>
                <div class="detail">
                    <span class="label">🏠 Address:</span> 
                    <span>${myInfo.get('address')}</span>
                </div>
                <div class="detail">
                    <span class="label">🐱 Selected Cat:</span>
                    <span class="value">${myInfo.get('catSelect')}</span>
                </div>
                <div class="detail">
                    <span class="label">🐾 Experience with Cats:</span>
                    <span class="value">${myInfo.get('experience')}</span>
                </div>
                <div class="detail">
                    <span class="label">💛 Looking for Personality:</span>
                    <span class="value">${myInfo.get('catPersonality')}</span>
                </div>
                <div class="detail">
                    <span class="label">🐶 Other Pets:</span>
                    <span class="value">${myInfo.get('otherPets')}</span>
                </div>
                ${myInfo.get('otherPets') === 'yes' && myInfo.get('petDetails')
                    ? `<div class="detail">
                        <span class="label">📋 Pet Details:</span>
                        <span class="value">${myInfo.get('petDetails')}</span>
                    </div>` 
                    : ''
                }
            </div>
            <p>We will contact you soon with more information.</p>
            <a href="index.html" class="btn">Return to Home</a>
        </div>
    `;
}


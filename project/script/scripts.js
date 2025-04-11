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

            cats.slice(0, 4).forEach(cat => {
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
                                <a href="${catData.adoptionLink}" class="btn" target="_blank">Adopt ${name}</a>
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




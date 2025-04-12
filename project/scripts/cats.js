//  cat cards
export async function loadCats() {
    try {
        const response = await fetch("data/cats.json");
        if (!response.ok) throw new Error("Error loading cats data");

        const cats = await response.json();
        const container = document.querySelector("#cats-container");
        if (!container) return;

        container.innerHTML = "";

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

    } catch (error) {
        console.error(error);
    }
}

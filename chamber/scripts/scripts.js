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

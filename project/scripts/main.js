import { loadCats } from './cats.js';
import { setupModals } from './modal.js';
import { setupDarkMode } from './darkmode.js';

document.addEventListener("DOMContentLoaded", () => {
    const currentYearEl = document.getElementById("currentYear");
    if (currentYearEl) {
        currentYearEl.textContent = `${new Date().getFullYear()}`;
    }

    loadCats().then(setupModals);
    setupDarkMode();
});

// hambuerger menu
const hamburgerElement = document.querySelector("#menu-icon");
const navElement = document.querySelector(".menu-links");

if (hamburgerElement && navElement) {
    hamburgerElement.addEventListener("click", () => {
        navElement.classList.toggle("open");
        hamburgerElement.classList.toggle("open");
    });
}

// adoption confirmation
const userInfoContainer = document.querySelector('#confirmation-info');
if (userInfoContainer) {
    const myInfo = new URLSearchParams(window.location.search);

    userInfoContainer.innerHTML = `
        <div class="info-container">
            <h1>Thank You For Your Adoption Request!</h1>
            <p>Dear <strong>${myInfo.get('first-name')} ${myInfo.get('last-name')}</strong>,</p>
            <p>We have received your request to adopt a cat. Here are the details you provided:</p>
            <div class="user-details">
                <div class="detail"><span class="label">📧 Email:</span> ${myInfo.get('email')}</div>
                <div class="detail"><span class="label">📞 Phone:</span> ${myInfo.get('phone')}</div>
                <div class="detail"><span class="label">🏠 Address:</span> ${myInfo.get('address')}</div>
                <div class="detail"><span class="label">🐱 Selected Cat:</span> ${myInfo.get('catSelect')}</div>
                <div class="detail"><span class="label">🐾 Experience:</span> <span class="value">${myInfo.get('experience')}</span></div>
                <div class="detail"><span class="label">💛 Personality:</span> <span class="value">${myInfo.get('catPersonality')}</span></div>
                <div class="detail"><span class="label">🐶 Other Pets:</span> <span class="value">${myInfo.get('otherPets')}</span></div>
                ${myInfo.get('otherPets') === 'yes' && myInfo.get('petDetails') ? `
                    <div class="detail"><span class="label">📋 Pet Details:</span> <span class="value">${myInfo.get('petDetails')}</span></div>
                ` : ''}
            </div>
            <p>We will contact you soon with more information.</p>
            <a href="index.html" class="btn">Return to Home</a>
        </div>
    `;
}

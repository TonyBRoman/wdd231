document.addEventListener("DOMContentLoaded", async function () {
    // Current Year
    const currentYearEl = document.getElementById("currentYear");
    if (currentYearEl) {
        currentYearEl.textContent = `${new Date().getFullYear()}`;
    }
    // Get the Date
    const lastModifiedEl = document.getElementById("lastModified");
    if (lastModifiedEl) {
        lastModifiedEl.textContent = `Last Update: ${document.lastModified}`;
    }
    // Menu 
    const hamburgerElement = document.querySelector('#menu-icon');
    const navElement = document.querySelector('#animation');

    if (hamburgerElement && navElement) {
        hamburgerElement.addEventListener('click', () => {
            navElement.classList.toggle('open');
            hamburgerElement.classList.toggle('open');
        });
    } 

})
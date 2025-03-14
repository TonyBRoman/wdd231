document.addEventListener("DOMContentLoaded", function() {
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

    const hamburgerElement = document.querySelector('#menu-icon');
    const navElement = document.querySelector('#animation');

    hamburgerElement.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open');
});
})

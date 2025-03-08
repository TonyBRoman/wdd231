document.addEventListener("DOMContentLoaded", function () {
    // Current Year
    const currentYearEl = document.getElementById("currentYear");
    if (currentYearEl) {
        currentYearEl.textContent = `© ${new Date().getFullYear()}`;
    }
    // Last Modified
    const lastModifiedEl = document.getElementById("lastModified");
    if (lastModifiedEl) {
        lastModifiedEl.textContent = `Last Update: ${document.lastModified}`;
    }
    // Menu
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const closeMenu = document.getElementById('close-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active'); 
    });

    closeMenu.addEventListener('click', () => {
        navMenu.classList.remove('active'); 
    });
 
});


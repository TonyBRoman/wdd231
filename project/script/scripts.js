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
    // Animación de giro
    darkModeToggle.classList.add('rotate');

    setTimeout(() => {
        darkModeToggle.classList.remove('rotate');
    }, 500); // mismo tiempo que la animación

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




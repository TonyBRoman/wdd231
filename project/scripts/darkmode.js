export function setupDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');

    if (!darkModeToggle) return;

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

        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.textContent = '◑';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkModeToggle.textContent = '◐';
        }
    });
}

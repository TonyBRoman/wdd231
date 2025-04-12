export function setupPhoneValidation() {
    const phoneInput = document.getElementById('phone');
    if (!phoneInput) return;

    phoneInput.addEventListener('input', () => {
        phoneInput.value = phoneInput.value.replace(/[^0-9]/g, '').slice(0, 15);
    });

    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        if (phoneInput.value.length < 8) {
            e.preventDefault();
            alert('The phone number must be at least 8 digits long.');
        }
    });
}

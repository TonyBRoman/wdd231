export function setupCatSelection() {
    fetch('./data/cats.json')
        .then(response => response.json())
        .then(data => {
            const catSelect = document.getElementById('catSelect');
            const catPreview = document.getElementById('selectedCatPreview');
            const catName = document.getElementById('catName');

            data.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat.name;
                option.textContent = cat.name;
                catSelect.appendChild(option);
            });

            catSelect.addEventListener('change', function () {
                const selectedCat = data.find(cat => cat.name === this.value);

                if (selectedCat) {
                    catPreview.style.display = 'block';
                    catName.innerHTML = `
                        <img src="${selectedCat.image}" alt="${selectedCat.name}" style="max-width:150px; border-radius:10px;">
                        <p>${selectedCat.name}</p>
                    `;
                } else {
                    catPreview.style.display = 'none';
                }
            });
        })
        .catch(error => {
            console.error('Error loading cats:', error);
        });
}

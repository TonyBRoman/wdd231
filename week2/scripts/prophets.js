const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');
const filters = document.querySelector('#filters');

async function getProphetsData() {
    const response = await fetch(url);
    const data = await response.json();
    // console.table(data.prophets);
    displayProphets(data.prophets);
    createFilters(data.prophets); 
}

const displayProphets = (prophets) => {
    cards.innerHTML = '';

    prophets.forEach((prophet) => { 
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let birthDate = document.createElement('p');
        let birthPlace = document.createElement('p');
        let portrait = document.createElement('img');

        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
        birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;
        
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '200');
        portrait.setAttribute('height', '250');

        card.appendChild(fullName);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(portrait);
        cards.appendChild(card);
    });
};

function createFilters(prophets) {
    filters.innerHTML = ''; 

    const filterOptions = [
        { label: 'Born in Utah', filter: (p) => p.birthplace.includes('Utah') },
        { label: 'Born Outside USA', filter: (p) => !p.birthplace.includes('USA') },
        { label: 'Lived to 95+', filter: (p) => (p.death - p.birth) >= 95 },
        { label: '10+ Children', filter: (p) => p.numofchildren >= 10 },
        { label: 'Served 15+ Years', filter: (p) => p.length >= 15 },
        { label: 'Show All', filter: () => true }
    ];

    filterOptions.forEach(option => { 
        let button = document.createElement('button');
        button.textContent = option.label;
        button.addEventListener('click', () => { 
            let filteredProphets = prophets.filter(option.filter);
            displayProphets(filteredProphets);
        });
        filters.appendChild(button); 
    });
}

getProphetsData();


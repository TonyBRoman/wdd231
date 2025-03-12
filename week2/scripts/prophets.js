const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetsData() {
    const response = await fetch(url);
    const data = await response.json();
    // console.table(data.prophets);
    displayProphets(data.prophets);
};

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => { 
        let card =document.createElement('section');
        let fullName = document.createElement('h2');
        let portrait = document.createElement('img');

        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '200');
        portrait.setAttribute('height', '250');

        card.appendChild(fullName);
        card.appendChild(portrait);

        cards.appendChild(card);
    });
};

getProphetsData();


document.addEventListener("DOMContentLoaded", function () {
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

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming...',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web...',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized...',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects...',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals...',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals...',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

function displayCourses(filter = 'All') {
    const courseContainer = document.getElementById('course-container');
    const creditCounter = document.getElementById('credit-counter');
    
    courseContainer.innerHTML = '';

    const filteredCourses = courses.filter(course => filter === 'All' || course.subject === filter);
    // Total of credits according to the filter
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    creditCounter.textContent =`Total Credits: ${totalCredits}`;
    
    // Cards of the courses
    filteredCourses.forEach(course => {
        const courseCard = document.createElement('button');
        courseCard.classList.add('course-card');
        courseCard.classList.add(course.subject.toLowerCase()); 

        if (course.completed) {
            courseCard.classList.add('completed');
        }

        courseCard.textContent = `${course.subject} ${course.number}`;

        courseContainer.appendChild(courseCard);
    });
}

document.getElementById('btn-all').addEventListener('click', () => displayCourses('All'));
document.getElementById('btn-cse').addEventListener('click', () => displayCourses('CSE'));
document.getElementById('btn-wdd').addEventListener('click', () => displayCourses('WDD'));

displayCourses();

const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption'); 

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=25.74&lon=-100.29&units=metric&appid=aecb17add2375f7114f5286dd070c1af';

async function apiFecth() { 
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw new Error(await response.text());
        }
    } catch (error){
        console.error('There was an error: ', error);
    }
}

function displayResults(data) { 
    captionDesc.innerHTML = data.weather[0].description
    currentTemp.innerHTML = `${data.main.temp}&deg;C`
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    weatherIcon.setAttribute('SRC', iconsrc)
    weatherIcon.setAttribute('alt', data.weather[0].description)
}

apiFecth();
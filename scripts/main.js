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
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
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
        courseCard.addEventListener('click', () => displayCourseDetails(course)); // = `${course.subject} ${course.number}`;

        courseContainer.appendChild(courseCard);
    });
}

function displayCourseDetails(course) { 
    const courseDetails = document.getElementById('course-details');
    
    courseDetails.innerHTML = `
    <button id="course-modal">❌</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p>${course.credits} credits</p>
    <p><strong>Certificate</strong>: ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technology</strong>: ${course.technology.join(', ')}</p>
    `;
    
    courseDetails.showModal();

    const closeModal = document.getElementById('course-modal');
    closeModal.addEventListener("click", () => {
        courseDetails.close();
    });

    courseDiv.addEventListener('click', () => {
        displayCourseDetails(course);
    });
    
}

document.getElementById('btn-all').addEventListener('click', () => displayCourses('All'));
document.getElementById('btn-cse').addEventListener('click', () => displayCourses('CSE'));
document.getElementById('btn-wdd').addEventListener('click', () => displayCourses('WDD'));

displayCourses();

// Weather 

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
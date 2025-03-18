
// Gestion du menu actif

document.querySelector('.fds-menu-select-btn').addEventListener('click', () => {
    document.querySelector('.fds-menu-select-items').classList.toggle('active');
});

const menuItems = document.querySelectorAll('.fds-menu-item');
const sections = document.querySelectorAll('.fds-section');

function setActiveMenuItem() {
    const currentScroll = window.scrollY;

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
            menuItems.forEach(item => item.classList.remove('active'));
            menuItems[index].classList.add('active');
            document.querySelector('.fds-menu-select-items').classList.remove('active');
        }
    });
}

window.addEventListener('scroll', setActiveMenuItem);

// Gestion des questions dépliables
const fdsQuestions = document.querySelectorAll('.fds-question');

fdsQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const isActive = item.classList.contains('active');

        // Ferme toutes les questions
        document.querySelectorAll('.fds-item').forEach(item => {
            item.classList.remove('active');
        });

        // Ouvre la question cliquée si elle n'était pas déjà ouverte
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Gestion du défilement doux
menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        

        window.scrollTo({
            top: targetSection.offsetTop - 20,
            behavior: 'smooth'
        });
    });
});

// Gestion de la recherche
const searchInput = document.querySelector('.fds-search-input');
const searchResultsBox = document.querySelector('.fds-search-results-box');
const btnClose = document.querySelector('.fds-close-search');

const questions = Array.from(document.querySelectorAll('.fds-question span:first-child')).map(q => ({
    text: q.textContent,
    element: q.closest('.fds-item')
}));

btnClose.addEventListener('click', () => {
    searchResultsBox.style.display = 'none';
    btnClose.style.display = 'none';
    searchInput.value = '';
});

searchInput.addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();
    if (searchText.length < 1) {
        searchResultsBox.style.display = 'none';
        return;
    }

    btnClose.style.display = 'block';

    const filteredQuestions = questions.filter(q =>
        q.text.toLowerCase().includes(searchText)
    );
    

    if (filteredQuestions.length === 0) {
        searchResultsBox.innerHTML = `<div class="fds-search-results-empty">Il n'y a aucun résultat pour « ${searchText} »</div>`;

    }else{
        searchResultsBox.innerHTML = filteredQuestions
            .map(q => `<div class="fds-search-results">${q.text}</div>`)
            .join('');
    }
    

    // searchResultsBox.style.display = filteredQuestions.length ? 'block' : 'none';
    searchResultsBox.style.display = 'block';
});

searchResultsBox.addEventListener('click', (e) => {

    if (e.target.classList.contains('fds-search-results')) {
        const questionText = e.target.textContent;
        const question = questions.find(q => q.text === questionText);
        console.log(question)

        if (question) {
            question.element.scrollIntoView({ behavior: 'smooth' });
            question.element.querySelector('.fds-question').click();
            searchResultsBox.style.display = 'none';
            searchInput.value = '';
        }
    }
});

// Navigation fluide pour les ancres
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();
//         document.querySelector(this.getAttribute('href')).scrollIntoView({
//             behavior: 'smooth'
//         });
//     });
// });

// Fermer les résultats de recherche en cliquant ailleurs
// document.addEventListener('click', (e) => {
//     if (!e.target.closest('.search-container')) {
//         searchResultsBox.style.display = 'none';
//     }
// });
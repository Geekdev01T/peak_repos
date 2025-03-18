//Affichage du bouton de recherche lorsque l'on survole l'image avec la souris(effet hover)
//start
document.getElementById('div-main-image').addEventListener('mouseenter', () => {
    document.querySelector('.btn-main-image').style.display = 'block';
});

document.getElementById('div-main-image').addEventListener('mouseout', () => {
    document.querySelector('.btn-main-image').style.display = 'none';
});

document.querySelectorAll('.div-detail-image').forEach((elt, index) => {
    elt.addEventListener('mouseenter', () => {
        elt.lastElementChild.style.display = 'block';
    });
});

document.querySelectorAll('.div-detail-image').forEach((elt, index) => {
    elt.addEventListener('mouseout', () => {
        elt.lastElementChild.style.display = 'none';
    });
});

//end


//Affichage des images en grand format lorsque l'on clique dessus 
document.getElementById('div-main-image').addEventListener('click', () => {
    document.querySelector('.gallerie-image-cover').style.display = 'block';
});
document.querySelectorAll('.div-detail-image').forEach((elt, index) => {
    elt.addEventListener('click', () => {
        document.querySelector('.gallerie-image-cover').style.display = 'block';
    });
});

document.querySelector('.gallerie-image-cover').addEventListener('click', () => {
    document.querySelector('.gallerie-image-cover').style.display = 'none';
});

document.querySelectorAll('.slide').forEach((slide, index) => {
    slide.addEventListener('click', () => {
        document.querySelector('.gallerie-image-cover').style.display = 'block';
    });
});

//slide
// État global du slider
const state = {
    currentIndex: 0,
    touchStartX: 0,
    touchEndX: 0
};

// Sélection des éléments du DOM
const slider = document.querySelector('.slider-contenair');
const slides = slider.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const counter = document.querySelector('.slide-counter');
const totalSlides = slides.length;

// Fonction pour afficher une slide spécifique
function showSlide(index) {
    // Retire la classe active de la slide courante
    slides[state.currentIndex].classList.remove('active');

    // Ajoute la classe active à la nouvelle slide
    slides[index].classList.add('active');

    // Met à jour l'index courant
    state.currentIndex = index;

    // Met à jour le compteur et les boutons
    updateCounter();
    updateButtons();
}

// Fonction pour mettre à jour le compteur
function updateCounter() {
    counter.textContent = `${state.currentIndex + 1}/${totalSlides}`;
}

// Fonction pour mettre à jour l'état des boutons
function updateButtons() {
    prevButton.disabled = state.currentIndex === 0;
    nextButton.disabled = state.currentIndex === totalSlides - 1;
}

// Fonction pour passer à la slide précédente
function prevSlide() {
    if (state.currentIndex > 0) {
        showSlide(state.currentIndex - 1);
    }
}

// Fonction pour passer à la slide suivante
function nextSlide() {
    if (state.currentIndex < totalSlides - 1) {
        showSlide(state.currentIndex + 1);
    }
}

// Gestion du swipe
function handleSwipe() {
    const swipeThreshold = 50;
    const diff = state.touchStartX - state.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
}

nextButton.addEventListener('click', nextSlide);
// Installation des événements
function setupEventListeners() {
    // Événements des boutons
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    // Événements tactiles
    slider.addEventListener('touchstart', (e) => {
        state.touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', (e) => {
        state.touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    // Support des touches clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
}

// Fonction d'initialisation
function initSlider() {
    updateButtons();
    updateCounter();
    setupEventListeners();
}

// Initialisation au chargement de la page
window.addEventListener('load', initSlider);
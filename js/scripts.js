// Menú Móvil
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('header nav');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('menu-open');
        menuToggle.classList.toggle('active');
    });
}

// Cierra el menú si haces clic en un enlace
document.querySelectorAll('header nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('menu-open');
        menuToggle.classList.remove('active');
    });
});

// Scroll Header Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Scroll Reveal Animations
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Opcional: dejar de observar si solo queremos que se anime una vez
            // observer.unobserve(entry.target); 
        }
    });
};

const revealOptions = {
    threshold: 0.15, // Porcentaje visible para activar
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

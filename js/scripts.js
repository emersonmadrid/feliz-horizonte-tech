const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('header nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('menu-open');
    menuToggle.classList.toggle('active');
});

// Cierra el menú si haces clic en un enlace
document.querySelectorAll('header nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('menu-open');
        menuToggle.classList.remove('active');
    });
});

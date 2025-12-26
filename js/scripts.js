// Existing code...
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Scroll reveal animation
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// Smooth scroll with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });
}

// ========== NEW: IMPACTFUL VISUAL EFFECTS ==========

// 1. Floating Particles System
const particlesContainer = document.getElementById('particles-container');
const particleCount = 50;

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';

    // Random animation delay and duration
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 15) + 's';

    // Random size
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';

    particlesContainer.appendChild(particle);
}

// 2. Animated Counters for Metrics
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target === 99 ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (target === 99 ? '%' : '+');
        }
    }, 16);
};

const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const metricValues = entry.target.querySelectorAll('.metric-value');
            metricValues.forEach(value => {
                if (!value.classList.contains('counted')) {
                    animateCounter(value);
                    value.classList.add('counted');
                }
            });
        }
    });
}, observerOptions);

const liveMetrics = document.querySelector('.live-metrics');
if (liveMetrics) {
    metricsObserver.observe(liveMetrics);
}

// 3. Interactive Particles (Mouse Movement)
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

setInterval(() => {
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        if (index % 3 === 0) { // Only affect every 3rd particle for performance
            const rect = particle.getBoundingClientRect();
            const particleX = rect.left + rect.width / 2;
            const particleY = rect.top + rect.height / 2;

            const deltaX = mouseX - particleX;
            const deltaY = mouseY - particleY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (distance < 200) {
                const angle = Math.atan2(deltaY, deltaX);
                const force = (200 - distance) / 200;
                const moveX = Math.cos(angle) * force * 20;
                const moveY = Math.sin(angle) * force * 20;

                particle.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
            } else {
                particle.style.transform = 'translate(0, 0)';
            }
        }
    });
}, 50);

// WhatsApp Button - Show only after scrolling past hero
const whatsappBtn = document.querySelector('.whatsapp-button');
if (whatsappBtn) {
    window.addEventListener('scroll', () => {
        const heroHeight = document.querySelector('.hero')?.offsetHeight || 600;
        if (window.scrollY > heroHeight * 0.7) {
            whatsappBtn.classList.add('visible');
        } else {
            whatsappBtn.classList.remove('visible');
        }
    });
}

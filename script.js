// ===================================
// NAVIGATION
// ===================================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===================================
// SMOOTH SCROLLING
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll(
    '.skill-card, .timeline-item, .cert-card, .contact-card, .about-content, .tech-stack'
);

animatedElements.forEach(el => {
    observer.observe(el);
});

// ===================================
// STATS COUNTER ANIMATION
// ===================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.dataset.suffix || '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.dataset.suffix || '');
        }
    }, 16);
}

// Initialize counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                const suffix = stat.textContent.replace(/[0-9]/g, '');
                stat.dataset.suffix = suffix;
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ===================================
// LANGUAGE SKILLS ANIMATION
// ===================================

const languageBarsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.language-fill');
            fills.forEach((fill, index) => {
                setTimeout(() => {
                    fill.style.width = fill.style.width;
                }, index * 100);
            });
            languageBarsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const languageGrid = document.querySelector('.language-grid');
if (languageGrid) {
    languageBarsObserver.observe(languageGrid);
}

// ===================================
// STAGGERED ANIMATION FOR CARDS
// ===================================

const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.children;
            Array.from(cards).forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('slide-in-up');
                }, index * 100);
            });
            staggerObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsGrid = document.querySelector('.skills-grid');
const certGrid = document.querySelector('.cert-grid');

if (skillsGrid) staggerObserver.observe(skillsGrid);
if (certGrid) staggerObserver.observe(certGrid);

// ===================================
// ACTIVE SECTION HIGHLIGHTING
// ===================================

const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===================================
// PARTICLE EFFECT FOR HERO (OPTIONAL)
// ===================================

function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(59, 130, 246, ${Math.random() * 0.5});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        hero.appendChild(particle);
    }
}

// Add particle animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        50% {
            opacity: 0.5;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize particles
createParticles();

// ===================================
// TYPING EFFECT FOR HERO SUBTITLE (OPTIONAL)
// ===================================

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Optional: Uncomment to enable typing effect
// const heroSubtitle = document.querySelector('.hero-subtitle');
// if (heroSubtitle) {
//     const originalText = heroSubtitle.textContent;
//     typeWriter(heroSubtitle, originalText, 50);
// }

// ===================================
// COPY EMAIL FUNCTIONALITY
// ===================================

const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Allow default mailto behavior
        // Optionally add toast notification
        console.log('Email link clicked');
    });
});

// ===================================
// SCROLL TO TOP BUTTON (OPTIONAL)
// ===================================

function createScrollToTop() {
    const button = document.createElement('button');
    button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
        </svg>
    `;
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--color-primary);
        border: none;
        border-radius: 50%;
        color: white;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
    
    document.body.appendChild(button);
}

createScrollToTop();

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Lazy load images (if any are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// PRELOAD CRITICAL RESOURCES
// ===================================

window.addEventListener('load', () => {
    // Remove loading class from body if exists
    document.body.classList.remove('loading');
    
    // Trigger any post-load animations
    console.log('Portfolio loaded successfully');
});

// ===================================
// KEYBOARD NAVIGATION
// ===================================

document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===================================
// DETECT REDUCED MOTION PREFERENCE
// ===================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--transition-fast', '0ms');
    document.documentElement.style.setProperty('--transition-base', '0ms');
    document.documentElement.style.setProperty('--transition-slow', '0ms');
}

// ===================================
// CONSOLE MESSAGE
// ===================================

console.log(
    '%c👋 Hello!',
    'font-size: 24px; font-weight: bold; color: #3b82f6;'
);
console.log(
    '%cThanks for checking out my portfolio!',
    'font-size: 14px; color: #a1a1aa;'
);
console.log(
    '%cBuilt with HTML, CSS, and JavaScript',
    'font-size: 12px; color: #71717a;'
);

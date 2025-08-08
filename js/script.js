// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - header.offsetHeight - 50;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll('.skill-category, .project-card, .stat-item, .contact-item');
animatedElements.forEach(el => {
    observer.observe(el);
});

// Dynamic typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        const originalText = heroName.textContent;
        typeWriter(heroName, originalText, 150);
    }
});

// Contact Form Handler (Privacy-focused)
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const company = formData.get('company');
    const message = formData.get('message');
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`Mensaje de ${name} - ${company || 'Consulta Profesional'}`);
    const body = encodeURIComponent(
        `Hola Lukas,\n\n` +
        `${message}\n\n` +
        `Saludos,\n${name}\n` +
        `Email: ${email}\n` +
        `${company ? `Empresa: ${company}` : ''}`
    );
    
    const mailtoLink = `mailto:avgmss6qu@mozmail.com?subject=${subject}&body=${body}`;
    
    // Show success message
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = '✅ ¡Abriendo cliente de email!';
    submitButton.style.background = '#10b981';
    
    // Open default email client
    window.location.href = mailtoLink;
    
    // Reset form
    setTimeout(() => {
        this.reset();
        submitButton.textContent = originalText;
        submitButton.style.background = '';
    }, 3000);
});

// Privacy protection - obfuscate email display
document.addEventListener('DOMContentLoaded', function() {
    const emailElements = document.querySelectorAll('a[href^="mailto:avgmss6qu"]');
    emailElements.forEach(element => {
        // Add privacy indicator
        element.setAttribute('title', 'Email temporal para proteger privacidad');
    });
});

// Scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

// Stats counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Preserve the original format (number + suffix)
            const originalText = counter.textContent;
            const suffix = originalText.replace(/[\d]/g, '');
            counter.textContent = Math.floor(current) + suffix;
        }, 16);
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.disconnect(); // Run only once
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Console security message
console.log(`
    ╔══════════════════════════════════════════════════════════╗
    ║                                                          ║
    ║   🛡️  PORTFOLIO SEGURO - LUKAS LEE NAVARRO             ║
    ║                                                          ║
    ║   🔒 Información personal protegida                      ║
    ║   📧 Email temporal para contacto profesional           ║
    ║   🚀 Estudiante de Ingeniería en Redes                  ║
    ║   💻 Apasionado por DevOps y Automatización             ║
    ║                                                          ║
    ║   ¿Interesado en mi perfil? ¡Usa el formulario!        ║
    ║                                                          ║
    ╚══════════════════════════════════════════════════════════╝
`);

// Performance optimization: Use passive listeners for scroll events
const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

const scrollEvents = throttle(() => {
    // Scroll-related functions are already handled above
}, 16);

window.addEventListener('scroll', scrollEvents, { passive: true });

// Lazy loading placeholder for avatar
const avatarPlaceholder = document.querySelector('.avatar-placeholder');
if (avatarPlaceholder) {
    // Add subtle animation to the user icon
    avatarPlaceholder.style.animation = 'pulse 2s ease-in-out infinite alternate';
    
    // Add CSS for pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            from { opacity: 0.6; transform: scale(1); }
            to { opacity: 1; transform: scale(1.05); }
        }
    `;
    document.head.appendChild(style);
}

// Privacy notice for developers
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.warn('🚨 DESARROLLO LOCAL: Recuerda no incluir información personal sensible en producción');
}

// Export functions for potential module use
window.PortfolioJS = {
    typeWriter,
    throttle,
    animateCounters
};

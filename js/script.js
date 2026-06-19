// Cursor personalizado
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX - 16 + 'px';
        cursorFollower.style.top = e.clientY - 16 + 'px';
    }, 100);
});

// Efeito de hover nos links
const links = document.querySelectorAll('a, button, .concept-card, .skill-item');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursorFollower.style.transform = 'scale(1.5)';
    });
    
    link.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});


// =========================================
// SMOOTH SCROLL
// =========================================
function smoothScrollTo(targetY, duration) {
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    let startTime = null;

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function step(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, startY + distance * easeInOutQuad(progress));
        if (elapsed < duration) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

document.addEventListener('click', function (e) {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const navbarHeight = 70;
    const targetY = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
    smoothScrollTo(targetY, 800);
});

// Efeito de digitação (typewriter)
const texts = ['resultados', 'valor', 'inovação', 'agilidade'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.querySelector('.typewriter');

function typeWriter() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeWriter, typeSpeed);
}

window.addEventListener('load', typeWriter);

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.concept-card, .skill-item, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.floating-shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.2);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

let lastScroll = 0;
let navbar = null;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 500) {
        if (!navbar) {
            createNavbar();
            navbar = document.querySelector('.navbar');
            navbar.offsetHeight;
        }
        navbar.style.opacity = '1';
        navbar.style.transform = 'translateY(0)';
    } else {
        if (navbar) {
            navbar.style.opacity = '0';
            navbar.style.transform = 'translateY(-100%)';
        }
    }
    
    lastScroll = currentScroll;
});

function createNavbar() {
    const nav = document.createElement('nav');
    nav.className = 'navbar navbar-expand-md navbar-dark bg-dark fixed-top shadow-sm';
    nav.style.transition = 'all 0.4s ease';
    nav.style.opacity = '0';
    nav.style.transform = 'translateY(-100%)';
    nav.innerHTML = `
        <div class="container">
            <a class="navbar-brand text-white fw-bold" href="#home">&lt;GustavoDena /&gt;</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item"><a class="nav-link text-white" href="#home">Início</a></li>
                    <li class="nav-item"><a class="nav-link text-white" href="#sobre">Sobre</a></li>
                    <li class="nav-item"><a class="nav-link text-white" href="#skills">Skills</a></li>
                    <li class="nav-item"><a class="nav-link text-white" href="#journey">Jornada</a></li>
                    <li class="nav-item"><a class="nav-link text-white" href="#contato">Contato</a></li>
                </ul>
            </div>
        </div>
    `;
    document.body.insertBefore(nav, document.body.firstChild);
}

const magneticButtons = document.querySelectorAll('.btn-magnetic');

magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".concept-card"), {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });
}

const animateValue = (obj, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const finalValue = stat.textContent;
                if (finalValue.includes('+')) {
                    animateValue(stat, 0, parseInt(finalValue), 2000);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
});

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

const profileImage = document.querySelector('.profile-img');
if (profileImage) {
    window.addEventListener('scroll', () => {
        if (window.innerWidth < 992) {
            profileImage.style.opacity = '1';
            return;
        }

        const scrolled = window.scrollY;
        const opacity = Math.max(0, 1 - (scrolled / 450));
        profileImage.style.opacity = opacity;
        profileImage.style.pointerEvents = opacity === 0 ? 'none' : 'auto';
    });
}

console.log('🚀 Portfolio carregado com sucesso!');
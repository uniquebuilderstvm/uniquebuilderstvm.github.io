/**
 * Unique Builders - Premium JS 2026
 * Handles animations, navbar effects, and interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Optimized Scroll Reveal Animation
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. Smooth Counter Animation
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.textContent);
                let current = 0;
                const duration = 2000;
                const startTime = performance.now();
                
                const animate = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // Cubic ease-out
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    
                    target.textContent = Math.floor(easeOut * countTo) + (target.dataset.suffix || '');
                    
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        target.textContent = countTo + (target.dataset.suffix || '');
                    }
                };
                
                if (target.textContent.includes('+')) target.dataset.suffix = '+';
                requestAnimationFrame(animate);
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // 4. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // 5. Cinematic Hero Parallax (Mouse Movement)
    const hero = document.querySelector('.hero');
    const layers = document.querySelectorAll('.hero-layer');
    const heroContent = document.querySelector('.hero-content');

    if (hero && window.innerWidth > 992) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            const moveX = (clientX - centerX) / centerX;
            const moveY = (clientY - centerY) / centerY;

            layers.forEach(layer => {
                const speed = parseFloat(layer.getAttribute('data-speed')) || 0.05;
                const x = moveX * 100 * speed;
                const y = moveY * 100 * speed;
                
                // Subtle zoom effect on main layer
                const scale = layer.classList.contains('layer-main') ? 1 + (Math.abs(moveX) * 0.02) : 1;
                
                layer.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
            });

            // Very subtle motion for content
            if (heroContent) {
                const h1 = heroContent.querySelector('h1');
                const p = heroContent.querySelector('p');
                
                if (h1) {
                    const h1Speed = parseFloat(h1.getAttribute('data-parallax-speed')) || 0.01;
                    h1.style.transform = `translate(${moveX * 20 * h1Speed}px, ${moveY * 20 * h1Speed}px)`;
                }
                if (p) {
                    const pSpeed = parseFloat(p.getAttribute('data-parallax-speed')) || 0.005;
                    p.style.transform = `translate(${moveX * 20 * pSpeed}px, ${moveY * 20 * pSpeed}px)`;
                }
            }
        });
    }

    // 5b. Hero Slideshow Logic
    const slides = document.querySelectorAll('.hero-slides .layer-main');
    if (slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = 8000; // 8 seconds for slower transition

        const nextSlide = () => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        };

        setInterval(nextSlide, slideInterval);
    }

    // 6. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});


// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initHeroImage();
    initScrollAnimations();
    initGalleryLightbox();
    initBookingForm();
    initParallaxEffects();
    initImageHoverEffects();
    initMobileMenu();
});

// Navbar scroll effect
function initNavbar() {
    const navbar = document.querySelector('.main-nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Hero image animation
function initHeroImage() {
    const heroImage = document.getElementById('hero-main-image');
    const images = [
        'https://guesthouses.auroville.org/wp-content/uploads/2024/03/sincerity-guest-house-auroville-pic17.webp',
        'https://guesthouses.auroville.org/wp-content/uploads/2024/03/sincerity-guest-house-auroville-pic6.webp',
        'https://guesthouses.auroville.org/wp-content/uploads/2024/03/sincerity-guest-house-auroville-pic18.webp'
    ];
    
    let currentIndex = 0;
    
    // Preload images
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Change hero image every 8 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        
        // Fade out
        heroImage.style.opacity = '0';
        
        // Change image after fade out
        setTimeout(() => {
            heroImage.style.backgroundImage = `url('${images[currentIndex]}')`;
            
            // Fade in
            setTimeout(() => {
                heroImage.style.opacity = '1';
            }, 100);
        }, 500);
    }, 8000);
}

// Scroll reveal animations
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    const elementsToAnimate = document.querySelectorAll('.reveal-image, .highlight-card, .gallery-item, .room-card, .testimonial-card, .experience-highlight');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('pre-reveal');
        observer.observe(el);
    });
    
    // Add CSS for reveal animations
    const style = document.createElement('style');
    style.textContent = `
        .pre-reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s cubic-bezier(0.19, 1, 0.22, 1), 
                        transform 0.8s cubic-bezier(0.19, 1, 0.22, 1);
        }
        
        .revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        .highlight-card.pre-reveal {
            transition-delay: calc(var(--index, 0) * 0.1s);
        }
        
        .gallery-item.pre-reveal {
            transition-delay: calc(var(--index, 0) * 0.05s);
        }
    `;
    document.head.appendChild(style);
    
    // Set index for staggered animations
    document.querySelectorAll('.highlight-card').forEach((card, index) => {
        card.style.setProperty('--index', index);
    });
    
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.style.setProperty('--index', index);
    });
}

// Gallery lightbox
function initGalleryLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-nav.prev');
    const nextBtn = lightbox.querySelector('.lightbox-nav.next');
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    const images = Array.from(galleryItems).map(item => ({
        src: item.querySelector('img').src,
        caption: item.querySelector('.gallery-caption').textContent
    }));
    
    let currentImageIndex = 0;
    
    // Open lightbox when gallery item is clicked
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            updateLightbox();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    closeBtn.addEventListener('click', () => {
        closeLightbox();
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Navigation
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateLightbox();
    });
    
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateLightbox();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            updateLightbox();
        } else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            updateLightbox();
        }
    });
    
    function updateLightbox() {
        lightboxImg.src = images[currentImageIndex].src;
        lightboxCaption.textContent = images[currentImageIndex].caption;
        
        // Fade in effect
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            lightboxImg.style.opacity = '1';
        }, 100);
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Booking form submission
function initBookingForm() {
    const bookingForm = document.getElementById('booking-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(bookingForm);
            const data = Object.fromEntries(formData);
            
            // In a real application, you would send this data to a server
            // For demo purposes, we'll just show an alert
            
            // Simple validation
            if (!data.checkin || !data.checkout) {
                alert('Please select both check-in and check-out dates.');
                return;
            }
            
            // Show success message
            alert('Thank you for your inquiry! We will contact you within 24 hours to confirm your reservation.');
            
            // Reset form
            bookingForm.reset();
        });
        
        // Set minimum dates for check-in and check-out
        const today = new Date().toISOString().split('T')[0];
        const dateInputs = bookingForm.querySelectorAll('input[type="date"]');
        
        dateInputs.forEach(input => {
            input.min = today;
            
            // Set check-out min date based on check-in
            if (input.placeholder === 'Check-out') {
                const checkinInput = bookingForm.querySelector('input[placeholder="Check-in"]');
                checkinInput.addEventListener('change', function() {
                    if (this.value) {
                        const nextDay = new Date(this.value);
                        nextDay.setDate(nextDay.getDate() + 1);
                        input.min = nextDay.toISOString().split('T')[0];
                        
                        // If current check-out value is before new min, clear it
                        if (input.value && input.value < input.min) {
                            input.value = '';
                        }
                    }
                });
            }
        });
    }
}

// Parallax effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-image, .image-frame img, .room-image img');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach(el => {
            const speed = el.classList.contains('hero-image') ? 0.3 : 0.1;
            const yPos = -(scrollY * speed);
            el.style.transform = `translateY(${yPos}px) scale(${1 + Math.abs(speed * 0.1)})`;
        });
    });
}

// Image hover effects
function initImageHoverEffects() {
    const images = document.querySelectorAll('.image-frame img, .room-image img');
    
    images.forEach(img => {
        const parent = img.parentElement;
        
        parent.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.05)';
        });
        
        parent.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });
}

// Mobile menu
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            mobileMenuBtn.innerHTML = navLinks.style.display === 'flex' ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            
            // Position the menu
            if (navLinks.style.display === 'flex') {
                navLinks.style.position = 'fixed';
                navLinks.style.top = '80px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'var(--color-light-transparent)';
                navLinks.style.backdropFilter = 'blur(10px)';
                navLinks.style.flexDirection = 'column';
                navLinks.style.padding = '2rem';
                navLinks.style.gap = '1.5rem';
                navLinks.style.boxShadow = 'var(--shadow-soft)';
                navLinks.style.zIndex = '999';
            } else {
                navLinks.style = '';
            }
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.style.display = 'none';
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                navLinks.style = '';
            });
        });
        
        // Close menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 992) {
                navLinks.style.display = '';
                navLinks.style = '';
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.main-nav').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

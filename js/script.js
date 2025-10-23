// Guestogram Coming Soon - JavaScript Functionality
document.addEventListener('DOMContentLoaded', function() {
    initCountdown();
    initEmailForm();
    initModal();
    initAnimations();
    initParticles();
});

// Countdown Timer
function initCountdown() {
    // Set launch date to December 21st, 2025 at 7:00 PM IST
    const launchDate = new Date('2025-12-21T19:00:00+05:30'); // IST is UTC+5:30
    
    const countdownElements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = launchDate.getTime() - now;
        
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            countdownElements.days.textContent = String(days).padStart(2, '0');
            countdownElements.hours.textContent = String(hours).padStart(2, '0');
            countdownElements.minutes.textContent = String(minutes).padStart(2, '0');
            countdownElements.seconds.textContent = String(seconds).padStart(2, '0');
            
            // Add pulse animation on seconds update
            if (seconds !== parseInt(countdownElements.seconds.getAttribute('data-prev') || '0')) {
                countdownElements.seconds.style.animation = 'none';
                setTimeout(() => {
                    countdownElements.seconds.style.animation = 'countdownPulse 2s ease-in-out infinite';
                }, 10);
                countdownElements.seconds.setAttribute('data-prev', seconds);
            }
        } else {
            // Launch day reached
            countdownElements.days.textContent = '00';
            countdownElements.hours.textContent = '00';
            countdownElements.minutes.textContent = '00';
            countdownElements.seconds.textContent = '00';
            
            // Show launch message
            document.querySelector('.countdown-title').textContent = 'We\'re Live!';
            clearInterval(countdownInterval);
        }
    }
    
    // Update immediately and then every second
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}

// Email Form Handling
function initEmailForm() {
    const form = document.getElementById('signupForm');
    const emailInput = document.getElementById('email');
    const submitBtn = form.querySelector('.submit-btn');
    const formMessage = document.getElementById('formMessage');
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show form message
    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type} show`;
        
        setTimeout(() => {
            formMessage.classList.remove('show');
        }, 5000);
    }
    
    // Simulate email submission
    function submitEmail(email) {
        return new Promise((resolve, reject) => {
            // Simulate API call delay
            setTimeout(() => {
                // Simulate random success/failure for demo
                const success = Math.random() > 0.1; // 90% success rate
                
                if (success) {
                    // Store email in localStorage (in real app, send to server)
                    const emails = JSON.parse(localStorage.getItem('guestogram_emails') || '[]');
                    if (!emails.includes(email)) {
                        emails.push(email);
                        localStorage.setItem('guestogram_emails', JSON.stringify(emails));
                    }
                    resolve();
                } else {
                    reject(new Error('Server error. Please try again.'));
                }
            }, 1500);
        });
    }
    
    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        // Validation
        if (!email) {
            showMessage('Please enter your email address.', 'error');
            emailInput.focus();
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            emailInput.focus();
            return;
        }
        
        // Check if email already exists
        const existingEmails = JSON.parse(localStorage.getItem('guestogram_emails') || '[]');
        if (existingEmails.includes(email)) {
            showMessage('You\'re already on our list! We\'ll notify you soon.', 'success');
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        try {
            await submitEmail(email);
            
            // Success
            emailInput.value = '';
            showModal();
            
            // Track subscription (in real app, use analytics)
            console.log('Email subscription successful:', email);
            
        } catch (error) {
            showMessage(error.message, 'error');
        } finally {
            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
    
    // Real-time email validation
    emailInput.addEventListener('input', function() {
        const email = this.value.trim();
        
        // Remove previous validation states
        this.classList.remove('valid', 'invalid');
        
        if (email && isValidEmail(email)) {
            this.classList.add('valid');
        } else if (email) {
            this.classList.add('invalid');
        }
    });
    
    // Clear message when user starts typing
    emailInput.addEventListener('focus', function() {
        formMessage.classList.remove('show');
    });
}

// Modal Functionality
function initModal() {
    const modal = document.getElementById('successModal');
    const closeBtn = document.getElementById('modalClose');
    
    // Show modal
    window.showModal = function() {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Focus on close button for accessibility
        setTimeout(() => {
            closeBtn.focus();
        }, 300);
    };
    
    // Hide modal
    function hideModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    // Close button click
    closeBtn.addEventListener('click', hideModal);
    
    // Click outside modal to close
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideModal();
        }
    });
    
    // Escape key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            hideModal();
        }
    });
}

// Scroll Animations
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.feature, .time-unit');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Parallax effect for background
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.background-overlay');
        
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Enhanced Particle System
function initParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 20;
    
    // Create additional particles dynamically
    for (let i = 6; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning and animation
        const left = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = 15 + Math.random() * 10;
        const size = 2 + Math.random() * 4;
        
        particle.style.left = `${left}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random opacity for variation
        particle.style.opacity = 0.3 + Math.random() * 0.4;
        
        particlesContainer.appendChild(particle);
    }
}

// Utility Functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Performance optimization for scroll events
const optimizedResize = debounce(() => {
    // Recalculate any size-dependent elements
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}, 250);

window.addEventListener('resize', optimizedResize);

// Touch and mobile optimizations
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Improve touch interactions
    const touchElements = document.querySelectorAll('.submit-btn, .social-link, .modal-close');
    touchElements.forEach(el => {
        el.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        el.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 150);
        });
    });
}

// Analytics and tracking (placeholder)
function trackEvent(eventName, properties = {}) {
    // In a real application, integrate with your analytics service
    console.log('Event tracked:', eventName, properties);
    
    // Example: Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    
    // Example: Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, properties);
    }
}

// Track page load
trackEvent('page_view', {
    page_title: document.title,
    page_location: window.location.href
});

// Performance monitoring
window.addEventListener('load', () => {
    // Track page load time
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    trackEvent('page_load_time', {
        load_time: loadTime,
        user_agent: navigator.userAgent
    });
});

// Error tracking
window.addEventListener('error', (e) => {
    trackEvent('javascript_error', {
        error_message: e.message,
        error_filename: e.filename,
        error_lineno: e.lineno,
        error_colno: e.colno
    });
});

// Service Worker registration (for offline functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Keyboard navigation improvements
document.addEventListener('keydown', (e) => {
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Cookie consent (placeholder)
function initCookieConsent() {
    const consentKey = 'guestogram_cookie_consent';
    const hasConsent = localStorage.getItem(consentKey);
    
    if (!hasConsent) {
        // Show cookie banner (implement as needed)
        console.log('Show cookie consent banner');
    }
}

// Initialize cookie consent
setTimeout(initCookieConsent, 2000);

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initCountdown,
        initEmailForm,
        initModal,
        initAnimations,
        trackEvent
    };
}
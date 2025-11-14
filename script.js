// Countdown Timer Functionality
function initializeCountdown() {
    // Target date: December 21st, 2025 at 7:00 PM IST
    const targetDate = new Date('2025-12-21T19:00:00+05:30').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;
        
        if (timeLeft > 0) {
            // Calculate time units
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            // Update DOM elements
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            // Countdown has ended
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            
            // Update the countdown title to show launch message
            document.querySelector('.countdown-title').textContent = 'We Have Launched!';
        }
    }
    
    // Update countdown immediately
    updateCountdown();
    
    // Update countdown every second
    setInterval(updateCountdown, 1000);
}

// Email notification form functionality
function initializeNotificationForm() {
    const form = document.getElementById('notifyForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = form.querySelector('input[type="email"]').value;
        const button = form.querySelector('button');
        
        // Basic email validation
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        button.textContent = 'Submitting...';
        button.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Reset form
            form.reset();
            button.textContent = 'Notify Me';
            button.disabled = false;
            
            // Show success message
            showMessage('Thank you! We\'ll notify you when we launch.', 'success');
        }, 1500);
    });
}

// Email validation helper function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification message
function showMessage(message, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.notification-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `notification-message ${type}`;
    messageDiv.textContent = message;
    
    // Add styles
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 9999;
        opacity: 0;
        transition: all 0.3s ease;
        background: ${type === 'success' ? 'linear-gradient(45deg, #00BFFF, #87CEEB)' : 'linear-gradient(45deg, #FF6B6B, #FF8E8E)'};
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(messageDiv);
    
    // Fade in
    setTimeout(() => {
        messageDiv.style.opacity = '1';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 4000);
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize parallax effect for hero section
function initializeParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Add animation on scroll for feature cards
function initializeScrollAnimations() {
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
    
    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCountdown();
    initializeNotificationForm();
    initializeSmoothScrolling();
    initializeParallaxEffect();
    
    // Delay scroll animations to ensure proper loading
    setTimeout(() => {
        initializeScrollAnimations();
    }, 100);
    
    // Add loading animation fade out
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Handle window resize for responsive countdown timer
window.addEventListener('resize', function() {
    // Adjust countdown layout for mobile if needed
    const timer = document.querySelector('.countdown-timer');
    if (window.innerWidth <= 480 && timer) {
        timer.style.gap = '0.5rem';
    } else if (timer) {
        timer.style.gap = '2rem';
    }
});
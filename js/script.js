// ===== ENHANCED JAVASCRIPT WITH INTERACTIVE FEATURES =====

document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    // Smooth scrolling
    initSmoothScroll();
    
    // Navigation active states
    initNavigation();
    
    // Animations on scroll
    initScrollAnimations();
    
    // Form validations
    initFormValidations();
    
    // Interactive elements
    initAccordions();
    initImageGallery();
    initSearchFunctionality();
    
    // Newsletter handling
    initNewsletter();
    
    // Map initialization (if on contact page)
    if (document.getElementById('map')) {
        initMap();
    }
}

// ===== SMOOTH SCROLLING =====
function initSmoothScroll() {
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

// ===== NAVIGATION =====
function initNavigation() {
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.style.display = 'none'; // Hidden by default, shown in media query
    document.querySelector('.nav-container').appendChild(mobileMenuBtn);

    mobileMenuBtn.addEventListener('click', function() {
        document.querySelector('.nav-menu').classList.toggle('active');
    });

    // Show mobile menu button on small screens
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'block';
            document.querySelector('.nav-menu').style.display = 'none';
        } else {
            mobileMenuBtn.style.display = 'none';
            document.querySelector('.nav-menu').style.display = 'flex';
        }
    }

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
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

    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== ACCORDION FUNCTIONALITY =====
function initAccordions() {
    const accordions = document.querySelectorAll('.accordion-header');
    
    accordions.forEach(header => {
        header.addEventListener('click', function() {
            const accordion = this.parentElement;
            const content = this.nextElementSibling;
            
            // Close all other accordions
            document.querySelectorAll('.accordion-content').forEach(item => {
                if (item !== content) {
                    item.style.maxHeight = null;
                    item.previousElementSibling.classList.remove('active');
                }
            });
            
            // Toggle current accordion
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                this.classList.remove('active');
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                this.classList.add('active');
            }
        });
    });
}

// ===== IMAGE GALLERY WITH LIGHTBOX =====
function initImageGallery() {
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="" alt="">
            <div class="lightbox-caption"></div>
        </div>
    `;
    document.body.appendChild(lightbox);

    // Add gallery functionality to all gallery images
    document.querySelectorAll('.gallery-image').forEach(img => {
        img.addEventListener('click', function() {
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = lightbox.querySelector('img');
            const caption = lightbox.querySelector('.lightbox-caption');
            
            lightboxImg.src = this.src;
            caption.textContent = this.getAttribute('data-caption') || '';
            lightbox.style.display = 'flex';
            
            // Prevent body scroll when lightbox is open
            document.body.style.overflow = 'hidden';
        });
    });

    // Lightbox close functionality
    document.getElementById('lightbox').addEventListener('click', function(e) {
        if (e.target !== this.querySelector('img')) {
            this.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    document.querySelector('.lightbox-close').addEventListener('click', function() {
        document.getElementById('lightbox').style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

// ===== SEARCH FUNCTIONALITY =====
function initSearchFunctionality() {
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    
    if (searchInput && searchResults) {
        const debouncedSearch = debounce(function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            if (searchTerm.length < 2) {
                searchResults.style.display = 'none';
                return;
            }
            
            // Simple search implementation
            const searchableContent = [
                { title: 'School Workshops', url: 'programs.html', description: 'Environmental education programs for students' },
                { title: 'Community Clean-ups', url: 'cleanup-join.html', description: 'Join our community environmental events' },
                { title: 'Volunteer Opportunities', url: 'volunteer-signup.html', description: 'Become a volunteer and make a difference' },
                { title: 'Donation Options', url: 'donation.html', description: 'Support our mission through donations' },
                { title: 'About Our Mission', url: 'about.html', description: 'Learn about Green Earth Initiative' },
                { title: 'Contact Us', url: 'contact.html', description: 'Get in touch with our team' }
            ];
            
            const matches = searchableContent.filter(item => 
                item.title.toLowerCase().includes(searchTerm) || 
                item.description.toLowerCase().includes(searchTerm)
            );
            
            if (matches.length > 0) {
                searchResults.innerHTML = matches.map(item => `
                    <div style="padding: 0.5rem; border-bottom: 1px solid #eee;">
                        <a href="${item.url}" style="color: var(--primary-green); text-decoration: none; font-weight: 600;">${item.title}</a>
                        <p style="margin: 0.25rem 0 0 0; color: var(--text-light); font-size: 0.9rem;">${item.description}</p>
                    </div>
                `).join('');
                searchResults.style.display = 'block';
            } else {
                searchResults.innerHTML = `<p style="padding: 1rem; text-align: center; color: var(--text-light);">No results found for "${searchTerm}"</p>`;
                searchResults.style.display = 'block';
            }
        }, 300);
        
        searchInput.addEventListener('input', debouncedSearch);
        
        // Close search results when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }
}

// ===== ADVANCED FORM VALIDATIONS =====
function initFormValidations() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                showFormMessage(this, 'Please correct the errors above before submitting.', 'error');
            } else {
                // Simulate successful submission
                console.log('Form submitted successfully');
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearError(this);
            });
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const fields = form.querySelectorAll('[required]');
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous errors
    clearError(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        errorMessage = 'This field is required';
        isValid = false;
    }
    
    // Email validation
    else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Please enter a valid email address';
            isValid = false;
        }
    }
    
    // Phone validation
    else if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            errorMessage = 'Please enter a valid phone number';
            isValid = false;
        }
    }
    
    // Minimum length validation
    else if (field.hasAttribute('minlength') && value.length < field.getAttribute('minlength')) {
        errorMessage = `Minimum ${field.getAttribute('minlength')} characters required`;
        isValid = false;
    }
    
    // Date validation (future dates)
    else if (field.type === 'date' && value) {
        const selectedDate = new Date(value);
        const today = new Date();
        if (selectedDate < today) {
            errorMessage = 'Please select a future date';
            isValid = false;
        }
    }
    
    if (!isValid) {
        showError(field, errorMessage);
    }
    
    return isValid;
}

function showError(field, message) {
    field.style.borderColor = '#ff4444';
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff4444';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '0.25rem';
    field.parentNode.appendChild(errorDiv);
}

function clearError(field) {
    field.style.borderColor = '#e0e0e0';
    const errorDiv = field.parentNode.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function showFormMessage(form, message, type) {
    // Remove existing messages
    const existingMessages = form.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    form.appendChild(messageDiv);
    
    // Scroll to message
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// ===== AJAX FORM SUBMISSION =====
function submitFormAjax(form, successCallback) {
    const formData = new FormData(form);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<div class="loading-spinner"></div> Processing...';
    submitBtn.disabled = true;
    
    // Simulate API call (replace with actual fetch in production)
    setTimeout(() => {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Simulate success
        const success = Math.random() > 0.2; // 80% success rate for demo
        
        if (success) {
            successCallback({ success: true, message: 'Form submitted successfully!' });
        } else {
            showFormMessage(form, 'An error occurred. Please try again.', 'error');
        }
    }, 2000);
}

// ===== MAP FUNCTIONALITY =====
function initMap() {
    // Simple map implementation - in production, integrate with Google Maps API or Leaflet
    const mapElement = document.getElementById('map');
    if (mapElement) {
        // Add interactive map features here
        console.log('Map initialized for location:', mapElement.dataset.location);
        
        // Example: Add click handler for map
        mapElement.addEventListener('click', function() {
            window.open('https://maps.google.com/?q=Brackenfell+Cape+Town+7560', '_blank');
        });
        
        mapElement.style.cursor = 'pointer';
    }
}

// ===== NEWSLETTER FUNCTIONALITY =====
function initNewsletter() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('.newsletter-input');
            const email = emailInput.value;
            
            if (email && validateEmail(email)) {
                // Simulate AJAX submission
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.innerHTML = '<div class="loading-spinner"></div> Subscribing...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    this.innerHTML = '<p style="color: var(--secondary-green); font-weight: 600; text-align: center;">Thank you for subscribing to our newsletter!</p>';
                }, 1500);
            } else {
                showFormMessage(this, 'Please enter a valid email address.', 'error');
            }
        });
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== DEBOUNCE FUNCTION FOR SEARCH =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== UTILITY FUNCTIONS =====
function formatPhoneNumber(phone) {
    // Basic phone formatting for South African numbers
    return phone.replace(/(\d{2})(\d{3})(\d{4})/, '$1 $2 $3');
}

function formatCurrency(amount) {
    // Format as South African Rand
    return 'R ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// ===== EXPORT FUNCTIONS FOR GLOBAL USE =====
window.GreenEarth = {
    validateForm,
    submitFormAjax,
    formatPhoneNumber,
    formatCurrency,
    debounce
};

// Console welcome message
console.log(`
🌱 Welcome to Green Earth Initiative Website!
🌍 Environmental Conservation NGO
📍 Based in Cape Town, South Africa
📧 Contact: info@greenearth.org.za
📞 Phone: +27 21 123 4567

Thank you for supporting environmental conservation!
`);
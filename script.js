// Initialize AOS library
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-button-glass');
const mobileMenu = document.querySelector('.mobile-menu-glass');
const navLinks = document.querySelectorAll('.nav-link');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const skillPercentages = document.querySelectorAll('.skill-percentage');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const contactForm = document.getElementById('contact-form');

// Mobile menu toggle with proper animation
if (mobileMenuBtn && mobileMenu) {
    console.log('Mobile menu elements found'); // Debug log
    
    mobileMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Mobile menu button clicked'); // Debug log
        
        // Toggle the show class instead of hidden
        const isMenuOpen = mobileMenu.classList.contains('show');
        
        if (isMenuOpen) {
            // Close menu
            mobileMenu.classList.remove('show');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = 'auto';
            console.log('Menu closed');
        } else {
            // Open menu
            mobileMenu.classList.add('show');
            mobileMenuBtn.classList.add('active');
            document.body.style.overflow = 'hidden';
            console.log('Menu opened');
        }
    });
    
    // Close mobile menu when clicking on nav items
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    mobileNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            console.log('Mobile nav item clicked');
            mobileMenu.classList.remove('show');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('show') && 
            !mobileMenuBtn.contains(e.target) && 
            !mobileMenu.contains(e.target)) {
            console.log('Clicked outside, closing menu');
            mobileMenu.classList.remove('show');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('show')) {
            mobileMenu.classList.remove('show');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
} else {
    console.log('Mobile menu elements not found!'); // Debug log
}

// Navigation active state based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
    
    // Show/hide scroll to top button
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

// Scroll to top button functionality
scrollTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Project filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Animate skill bars on scroll
const animateSkills = () => {
    skillPercentages.forEach(skill => {
        const percentage = skill.style.width;
        skill.style.width = '0';
        setTimeout(() => {
            skill.style.width = percentage;
        }, 300);
    });
};

// Trigger skill animation when section is in view
const skillSection = document.getElementById('skills');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (skillSection) {
    observer.observe(skillSection);
}

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        // For demonstration, we'll just show a success message
        
        // Clear form
        contactForm.reset();
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'bg-green-500 text-white p-4 rounded-lg mt-4';
        successMessage.innerHTML = 'Message sent successfully! I\'ll get back to you soon.';
        
        contactForm.appendChild(successMessage);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    });
}

// EmailJS contact form submission
function sendEmail(event) {
    event.preventDefault();
    
    const submitText = document.getElementById('submit-text');
    const submitLoader = document.getElementById('submit-loader');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    
    // Show loading state
    submitText.classList.add('hidden');
    submitLoader.classList.remove('hidden');
    
    // Hide previous messages
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');
    
    // EmailJS send parameters
    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    emailjs.send('service_iu6pzro', 'template_6c2brtw', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            // Reset form
            document.getElementById('contact-form').reset();
            // Show success message
            successMessage.classList.remove('hidden');
            // Reset button state
            submitText.classList.remove('hidden');
            submitLoader.classList.add('hidden');
        }, function(error) {
            console.log('FAILED...', error);
            // Show error message
            errorMessage.classList.remove('hidden');
            // Reset button state
            submitText.classList.remove('hidden');
            submitLoader.classList.add('hidden');
        });
}

// Typing effect for the intro text
const introText = document.querySelector('.intro span');
if (introText) {
    const text = introText.textContent;
    introText.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            introText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start the typing effect after a delay
    setTimeout(typeWriter, 1000);
}

// Add image hover effect
const images = document.querySelectorAll('.project-img');
images.forEach(img => {
    img.addEventListener('mouseover', () => {
        img.style.transform = 'scale(1.1)';
    });
    
    img.addEventListener('mouseout', () => {
        img.style.transform = 'scale(1)';
    });
});

// Create directory for images
document.addEventListener('DOMContentLoaded', () => {
    // This is a placeholder for the actual creation of an assets directory
    console.log('Don\'t forget to create an "assets" directory with images for your portfolio!');
});

// ================================
// LIQUID GLASS NAVIGATION ENHANCEMENTS
// ================================

// Update DOM elements for liquid glass navigation
const liquidGlassHeader = document.querySelector('.liquid-glass-header');
const mobileMenuBtnGlass = document.querySelector('.mobile-menu-button-glass');
const mobileMenuGlass = document.querySelector('.mobile-menu-glass');
const navPills = document.querySelectorAll('.nav-pill');
const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

// Enhanced mobile menu toggle with liquid glass animations
if (mobileMenuBtnGlass) {
    mobileMenuBtnGlass.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenuBtnGlass.classList.toggle('active');
        
        if (mobileMenuGlass.classList.contains('hidden')) {
            mobileMenuGlass.classList.remove('hidden');
            setTimeout(() => {
                mobileMenuGlass.classList.add('show');
            }, 10);
        } else {
            mobileMenuGlass.classList.remove('show');
            setTimeout(() => {
                mobileMenuGlass.classList.add('hidden');
            }, 400);
        }
        
        // Add ripple effect
        createRippleEffect(mobileMenuBtnGlass, e);
    });
    
    // Close mobile menu when clicking on a link
    mobileNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            mobileMenuBtnGlass.classList.remove('active');
            mobileMenuGlass.classList.remove('show');
            setTimeout(() => {
                mobileMenuGlass.classList.add('hidden');
            }, 400);
            
            // Add ripple effect to nav item
            createRippleEffect(item, e);
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtnGlass.contains(e.target) && !mobileMenuGlass.contains(e.target)) {
            mobileMenuBtnGlass.classList.remove('active');
            mobileMenuGlass.classList.remove('show');
            setTimeout(() => {
                mobileMenuGlass.classList.add('hidden');
            }, 400);
        }
    });
}

// Create ripple effect function for liquid glass elements
function createRippleEffect(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        position: absolute;
        border-radius: 50%;
        background: rgba(147, 51, 234, 0.4);
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 0;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Enhanced scroll effects for liquid glass header
let lastScrollY = window.scrollY;
let ticking = false;

function updateHeaderOnScroll() {
    const scrollY = window.scrollY;
    
    // Add/remove scrolled class for enhanced glass effect
    if (scrollY > 50) {
        liquidGlassHeader.classList.add('scrolled');
    } else {
        liquidGlassHeader.classList.remove('scrolled');
    }
    
    // Update active navigation pills
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    // Update nav pills active state
    navPills.forEach(pill => {
        pill.classList.remove('active');
        if (pill.getAttribute('data-section') === current) {
            pill.classList.add('active');
        }
    });
    
    // Update mobile nav items active state
    mobileNavItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === current) {
            item.classList.add('active');
        }
    });
    
    lastScrollY = scrollY;
    ticking = false;
}

// Optimized scroll listener
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateHeaderOnScroll);
        ticking = true;
    }
});

// Add hover effects to nav pills
navPills.forEach(pill => {
    pill.addEventListener('mouseenter', (e) => {
        createHoverEffect(pill, e);
    });
});

// Create hover effect for nav pills
function createHoverEffect(element, event) {
    const glow = document.createElement('div');
    const rect = element.getBoundingClientRect();
    
    glow.style.cssText = `
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(99, 102, 241, 0.3));
        border-radius: inherit;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
        z-index: -1;
    `;
    
    element.style.position = 'relative';
    element.appendChild(glow);
    
    setTimeout(() => {
        glow.style.opacity = '1';
    }, 10);
    
    element.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
        setTimeout(() => {
            glow.remove();
        }, 300);
    }, { once: true });
}

// Add CSS animation for ripple effect
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 0.6;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ================================
// BUY ME A COFFEE FUNCTIONALITY
// ================================

// Coffee payment variables
let currentPaymentAmount = 0;
let currentCoffeeType = '';

// UPI Configuration - Replace with your actual UPI ID
const UPI_ID = 'beshwanthsai@oksbi'; // Replace with your actual UPI ID (corrected format)
const MERCHANT_NAME = 'Beshwanth Sai Katari';
const MERCHANT_CODE = 'BSK001'; // Merchant code for identification

// Open payment modal
function openPaymentModal(coffeeType, amount) {
    currentCoffeeType = coffeeType;
    currentPaymentAmount = amount;
    
    const modal = document.getElementById('paymentModal');
    const modalTitle = document.getElementById('modalTitle');
    const paymentAmount = document.getElementById('paymentAmount');
    
    modalTitle.textContent = `Buy Me a ${coffeeType.charAt(0).toUpperCase() + coffeeType.slice(1)}`;
    paymentAmount.textContent = amount;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Add some coffee animation
    createCoffeeParticles();
}

// Open custom payment modal
function openCustomPaymentModal() {
    const customAmount = document.getElementById('customAmount').value;
    
    if (!customAmount || customAmount < 1) {
        showNotification('Please enter a valid amount', 'error');
        return;
    }
    
    if (customAmount > 10000) {
        showNotification('Maximum amount is ₹10,000', 'error');
        return;
    }
    
    openPaymentModal('custom support', parseInt(customAmount));
}

// Close payment modal
function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    const qrContainer = document.getElementById('qrCodeContainer');
    
    modal.classList.remove('show');
    qrContainer.classList.add('hidden');
    document.body.style.overflow = 'auto';
    
    // Reset form
    document.getElementById('customAmount').value = '';
}

// Generate UPI QR Code
function generateUPIQR(app) {
    const qrContainer = document.getElementById('qrCodeContainer');
    const upiIdElement = document.getElementById('upiId');
    
    // Generate unique transaction reference
    const transactionRef = 'BSK' + Date.now().toString().slice(-8);
    const transactionNote = `Coffee Support - Thank you!`;
    
    // Use the simplest UPI URL format that works with most apps
    // This format is widely supported across all major UPI applications
    const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${currentPaymentAmount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;
    
    console.log('Generated UPI URL:', upiUrl);
    console.log('Payment Details:', {
        upiId: UPI_ID,
        amount: currentPaymentAmount,
        merchant: MERCHANT_NAME,
        note: transactionNote
    });
    
    // Show QR container
    qrContainer.classList.remove('hidden');
    upiIdElement.textContent = UPI_ID;
    
    // Generate QR code with error handling
    generateQRCode(upiUrl)
        .then(() => {
            console.log('QR Code generated successfully');
            showNotification(`QR Code ready! Scan to pay ₹${currentPaymentAmount}`, 'success');
        })
        .catch((error) => {
            console.error('QR generation failed:', error);
            showNotification('QR generation failed. Please use direct links below.', 'error');
        });
    
    // Add payment tracking
    trackPaymentAttempt(app, currentPaymentAmount);
    
    // Add direct UPI app links as fallback
    addDirectUPILinks(app, upiUrl);
}

// Generate QR Code using QRCode.js library
function generateQRCode(text) {
    return new Promise((resolve, reject) => {
        const canvas = document.getElementById('qrCanvas');
        
        // Clear previous QR code
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        console.log('Generating QR code for:', text);
        
        // Check if QRCode library is loaded
        if (typeof QRCode === 'undefined') {
            console.error('QRCode library not loaded');
            generateFallbackQR(canvas, text);
            reject(new Error('QRCode library not available'));
            return;
        }
        
        // Generate QR code with optimal settings for UPI
        QRCode.toCanvas(canvas, text, {
            width: 280,
            height: 280,
            colorDark: '#000000',
            colorLight: '#FFFFFF',
            correctLevel: QRCode.CorrectLevel.M, // Medium error correction for better compatibility
            margin: 3,
            version: 10 // Force higher version for better UPI compatibility
        }, function (error) {
            if (error) {
                console.error('QR Code generation failed:', error);
                generateFallbackQR(canvas, text);
                reject(error);
            } else {
                console.log('QR Code generated successfully');
                
                // Add smooth animation
                canvas.style.opacity = '0';
                canvas.style.transition = 'opacity 0.5s ease';
                
                setTimeout(() => {
                    canvas.style.opacity = '1';
                }, 150);
                
                // Validate the generated QR code
                validateQRCode(text);
                resolve();
            }
        });
    });
}

// Validate QR code content
function validateQRCode(upiUrl) {
    try {
        console.log('Validating UPI URL:', upiUrl);
        
        // Parse the UPI URL
        if (!upiUrl.startsWith('upi://pay?')) {
            throw new Error('Invalid UPI URL format');
        }
        
        const urlParams = new URLSearchParams(upiUrl.split('?')[1]);
        
        const validationData = {
            upiId: urlParams.get('pa'),
            amount: urlParams.get('am'),
            currency: urlParams.get('cu'),
            merchantName: urlParams.get('pn'),
            note: urlParams.get('tn')
        };
        
        console.log('QR Code validation results:', validationData);
        
        // Check required parameters
        const errors = [];
        if (!validationData.upiId) errors.push('Missing UPI ID');
        if (!validationData.amount) errors.push('Missing amount');
        if (!validationData.currency) errors.push('Missing currency');
        if (!validationData.merchantName) errors.push('Missing merchant name');
        
        if (errors.length > 0) {
            throw new Error(`Validation failed: ${errors.join(', ')}`);
        }
        
        // Validate UPI ID format
        if (!validationData.upiId.includes('@')) {
            throw new Error('Invalid UPI ID format');
        }
        
        // Validate amount
        const amount = parseFloat(validationData.amount);
        if (isNaN(amount) || amount <= 0) {
            throw new Error('Invalid amount');
        }
        
        console.log('✅ QR Code validation successful');
        return true;
        
    } catch (error) {
        console.error('❌ QR Code validation failed:', error.message);
        showNotification(`QR validation issue: ${error.message}. Manual UPI payment available below.`, 'warning');
        return false;
    }
}

// Fallback QR code generator (placeholder pattern)
function generateFallbackQR(canvas, text) {
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 200;
    canvas.height = 200;
    
    // Create a pattern that looks like a QR code
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 200, 200);
    
    ctx.fillStyle = '#fff';
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
            if (Math.random() > 0.5) {
                ctx.fillRect(i * 10, j * 10, 10, 10);
            }
        }
    }
    
    // Add corner squares (QR code positioning squares)
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 70, 70);
    ctx.fillRect(130, 0, 70, 70);
    ctx.fillRect(0, 130, 70, 70);
    
    ctx.fillStyle = '#fff';
    ctx.fillRect(10, 10, 50, 50);
    ctx.fillRect(140, 10, 50, 50);
    ctx.fillRect(10, 140, 50, 50);
    
    ctx.fillStyle = '#000';
    ctx.fillRect(20, 20, 30, 30);
    ctx.fillRect(150, 20, 30, 30);
    ctx.fillRect(20, 150, 30, 30);
    
    // Add loading effect
    canvas.style.opacity = '0';
    setTimeout(() => {
        canvas.style.opacity = '1';
        canvas.style.transition = 'opacity 0.5s ease';
    }, 300);
}

// Copy UPI ID to clipboard
function copyUPIId() {
    const upiId = document.getElementById('upiId').textContent;
    
    navigator.clipboard.writeText(upiId).then(() => {
        showNotification('UPI ID copied to clipboard!', 'success');
        
        // Visual feedback
        const copyBtn = document.querySelector('.copy-btn');
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        copyBtn.style.background = '#10B981';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.style.background = '#9333ea';
        }, 2000);
    }).catch(() => {
        showNotification('Failed to copy UPI ID', 'error');
    });
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.payment-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `payment-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Create coffee particles animation
function createCoffeeParticles() {
    const coffeeSection = document.getElementById('coffee');
    
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.innerHTML = '☕';
            particle.style.cssText = `
                position: absolute;
                font-size: 20px;
                color: #8B4513;
                pointer-events: none;
                z-index: 100;
                animation: coffeeFloat 3s ease-out forwards;
                left: ${Math.random() * 100}%;
                top: 100%;
            `;
            
            coffeeSection.appendChild(particle);
            
            setTimeout(() => particle.remove(), 3000);
        }, i * 200);
    }
}

// Track payment attempts (for analytics)
function trackPaymentAttempt(app, amount) {
    console.log(`Payment attempt: ${app} - ₹${amount}`);
    
    // Here you can add analytics tracking
    // gtag('event', 'payment_attempt', {
    //     'payment_method': app,
    //     'value': amount,
    //     'currency': 'INR'
    // });
}

// Coffee section animations on scroll
function animateCoffeeStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalNumber = parseInt(stat.textContent);
        let currentNumber = 0;
        const increment = finalNumber / 50;
        
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= finalNumber) {
                stat.textContent = finalNumber;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(currentNumber);
            }
        }, 30);
    });
}

// Initialize coffee section when it comes into view
const coffeeSection = document.getElementById('coffee');
if (coffeeSection) {
    const coffeeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCoffeeStats();
                coffeeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    coffeeObserver.observe(coffeeSection);
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('paymentModal');
    if (e.target === modal) {
        closePaymentModal();
    }
});

// Add coffee particle animation CSS
const coffeeAnimationCSS = `
    @keyframes coffeeFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-200px) rotate(360deg);
            opacity: 0;
        }
    }
`;

// Inject coffee animation styles
const coffeeStyleSheet = document.createElement('style');
coffeeStyleSheet.textContent = coffeeAnimationCSS;
document.head.appendChild(coffeeStyleSheet);

// Add direct UPI app links as fallback
function addDirectUPILinks(app, upiUrl) {
    const qrContainer = document.getElementById('qrCodeContainer');
    
    // Remove existing direct links
    const existingLinks = qrContainer.querySelector('.direct-upi-links');
    if (existingLinks) {
        existingLinks.remove();
    }
    
    // Create app-specific UPI URLs
    const gpayUrl = `tez://upi/pay?pa=${UPI_ID}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${currentPaymentAmount}&cu=INR`;
    const paytmUrl = `paytmmp://pay?pa=${UPI_ID}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${currentPaymentAmount}&cu=INR`;
    const phonepeUrl = `phonepe://pay?pa=${UPI_ID}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${currentPaymentAmount}&cu=INR`;
    
    // Create direct UPI links container
    const directLinksContainer = document.createElement('div');
    directLinksContainer.className = 'direct-upi-links';
    directLinksContainer.innerHTML = `
        <div style="margin-top: 1rem; padding: 1rem; background: rgba(0,0,0,0.3); border-radius: 10px;">
            <p style="color: rgba(255,255,255,0.8); font-size: 0.9rem; margin-bottom: 1rem; text-align: center;">
                <strong>QR not working?</strong> Try these direct payment links:
            </p>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-bottom: 1rem;">
                <a href="${gpayUrl}" target="_blank" class="direct-upi-link" style="
                    background: linear-gradient(135deg, #4285f4, #34a853); 
                    color: white; 
                    padding: 0.7rem 1.2rem; 
                    border-radius: 8px; 
                    text-decoration: none; 
                    font-size: 0.85rem;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 8px rgba(66, 133, 244, 0.3);
                " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 16px rgba(66, 133, 244, 0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(66, 133, 244, 0.3)'">
                    📱 Google Pay
                </a>
                <a href="${paytmUrl}" target="_blank" class="direct-upi-link" style="
                    background: linear-gradient(135deg, #00baf2, #0099cc); 
                    color: white; 
                    padding: 0.7rem 1.2rem; 
                    border-radius: 8px; 
                    text-decoration: none; 
                    font-size: 0.85rem;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 8px rgba(0, 186, 242, 0.3);
                " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 16px rgba(0, 186, 242, 0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0, 186, 242, 0.3)'">
                    💳 Paytm
                </a>
                <a href="${phonepeUrl}" target="_blank" class="direct-upi-link" style="
                    background: linear-gradient(135deg, #5f2d91, #7a4399); 
                    color: white; 
                    padding: 0.7rem 1.2rem; 
                    border-radius: 8px; 
                    text-decoration: none; 
                    font-size: 0.85rem;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 8px rgba(95, 45, 145, 0.3);
                " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 16px rgba(95, 45, 145, 0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(95, 45, 145, 0.3)'">
                    ☎️ PhonePe
                </a>
            </div>
            <div style="background: rgba(0,0,0,0.2); border-radius: 8px; padding: 0.8rem; border: 1px solid rgba(255,255,255,0.1);">
                <p style="color: rgba(255,255,255,0.7); font-size: 0.8rem; margin: 0 0 0.5rem 0; text-align: center;">
                    Or manually enter UPI ID in any UPI app:
                </p>
                <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; background: rgba(0,0,0,0.3); border-radius: 6px; padding: 0.5rem;">
                    <code style="color: #FFD700; font-size: 0.9rem; font-weight: 600;">${UPI_ID}</code>
                    <button onclick="copyUPIId()" style="
                        background: #9333ea; 
                        color: white; 
                        border: none; 
                        padding: 0.3rem 0.6rem; 
                        border-radius: 4px; 
                        cursor: pointer; 
                        font-size: 0.75rem;
                        transition: all 0.2s ease;
                    " onmouseover="this.style.background='#7c3aed'" onmouseout="this.style.background='#9333ea'">
                        📋 Copy
                    </button>
                </div>
            </div>
        </div>
    `;
    
    qrContainer.appendChild(directLinksContainer);
}

// Debug mode for UPI payments (for development testing)
function debugUPIPayment() {
    console.log('=== UPI Payment Debug Information ===');
    console.log('UPI ID:', UPI_ID);
    console.log('Merchant Name:', MERCHANT_NAME);
    console.log('Current Payment Amount:', currentPaymentAmount);
    console.log('Current Coffee Type:', currentCoffeeType);
    
    if (currentPaymentAmount > 0) {
        const testUpiUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${currentPaymentAmount}&cu=INR&tn=${encodeURIComponent('Test Payment')}`;
        console.log('Generated Test UPI URL:', testUpiUrl);
        
        // Test URL parsing
        const urlParams = new URLSearchParams(testUpiUrl.split('?')[1]);
        console.log('Parsed Parameters:');
        console.log('- pa (UPI ID):', urlParams.get('pa'));
        console.log('- pn (Merchant):', urlParams.get('pn'));
        console.log('- am (Amount):', urlParams.get('am'));
        console.log('- cu (Currency):', urlParams.get('cu'));
        console.log('- tn (Note):', urlParams.get('tn'));
        
        // Validate the URL
        validateQRCode(testUpiUrl);
    }
    console.log('=====================================');
}

// Test UPI functionality
function testUPIIntegration() {
    console.log('Testing UPI integration...');
    
    // Set test values
    currentPaymentAmount = 100;
    currentCoffeeType = 'test';
    
    // Run debug
    debugUPIPayment();
    
    // Test QR generation
    const testUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${currentPaymentAmount}&cu=INR&tn=${encodeURIComponent('Test Coffee')}`;
    
    console.log('Testing QR code generation...');
    generateQRCode(testUrl)
        .then(() => {
            console.log('✅ QR code test successful');
            showNotification('UPI integration test completed successfully!', 'success');
        })
        .catch((error) => {
            console.error('❌ QR code test failed:', error);
            showNotification('UPI integration test failed. Check console for details.', 'error');
        });
}

// Add debug mode toggle (for development)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🔧 Development mode detected. UPI debug functions available:');
    console.log('- debugUPIPayment() - Show current UPI settings');
    console.log('- testUPIIntegration() - Test QR generation');
    
    // Make functions globally available for testing
    window.debugUPIPayment = debugUPIPayment;
    window.testUPIIntegration = testUPIIntegration;
}

// ================================
// ENHANCED ERROR HANDLING
// ================================

// Enhanced error handling for payment flows
function handlePaymentError(error, context = '') {
    console.error(`Payment error${context ? ` (${context})` : ''}:`, error);
    
    const errorMessages = {
        'QR_GENERATION_FAILED': 'QR code generation failed. Please use the direct payment links below.',
        'UPI_APP_NOT_FOUND': 'UPI app not found. Please install a UPI app or use manual payment.',
        'INVALID_UPI_ID': 'UPI ID appears to be invalid. Please check the UPI ID.',
        'NETWORK_ERROR': 'Network error. Please check your internet connection.',
        'LIBRARY_NOT_LOADED': 'Required libraries not loaded. Please refresh the page.'
    };
    
    const userMessage = errorMessages[error.code] || error.message || 'Payment setup failed. Please try manual UPI payment.';
    showNotification(userMessage, 'error');
}

// Monitor UPI link clicks and provide feedback
function monitorUPILinks() {
    document.addEventListener('click', (event) => {
        const target = event.target;
        
        // Check if clicked element is a UPI link
        if (target.tagName === 'A' && (target.href.startsWith('upi://') || target.href.startsWith('tez://') || target.href.startsWith('paytmmp://') || target.href.startsWith('phonepe://'))) {
            console.log('UPI link clicked:', target.href);
            
            // Show feedback to user
            showNotification('Opening UPI app... If nothing happens, please install the app or use manual payment.', 'info');
            
            // Track the click
            trackPaymentAttempt('direct_link', currentPaymentAmount);
            
            // Set a timeout to show fallback message if app doesn't open
            setTimeout(() => {
                showNotification('UPI app not opening? Try copying the UPI ID manually: ' + UPI_ID, 'warning');
            }, 3000);
        }
    });
}

// Initialize error monitoring
monitorUPILinks();

// Enhanced smooth scrolling for mobile navigation
function smoothScrollToSection(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
        const headerHeight = 80; // Account for fixed header
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Add smooth scrolling to all navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Handle desktop nav pills
    const navPills = document.querySelectorAll('.nav-pill');
    navPills.forEach(pill => {
        pill.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = pill.getAttribute('href');
            smoothScrollToSection(targetId);
        });
    });
    
    // Handle mobile nav items
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    mobileNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href');
            
            // Close mobile menu
            if (mobileMenu) {
                mobileMenu.classList.remove('show');
                if (mobileMenuBtn) {
                    mobileMenuBtn.classList.remove('active');
                }
                document.body.style.overflow = 'auto';
            }
            
            // Smooth scroll to section
            setTimeout(() => {
                smoothScrollToSection(targetId);
            }, 300); // Small delay to allow menu to close
        });
    });
});

// Debug function to check if elements exist
function debugMobileMenu() {
    console.log('=== Mobile Menu Debug ===');
    console.log('Mobile menu button:', document.querySelector('.mobile-menu-button-glass'));
    console.log('Mobile menu:', document.querySelector('.mobile-menu-glass'));
    console.log('Mobile nav items:', document.querySelectorAll('.mobile-nav-item'));
    console.log('========================');
}

// Run debug on page load
window.addEventListener('load', debugMobileMenu);

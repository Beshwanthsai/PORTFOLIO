// Initialize AOS library
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const skillPercentages = document.querySelectorAll('.skill-percentage');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const contactForm = document.getElementById('contact-form');

// Mobile menu toggle
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
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

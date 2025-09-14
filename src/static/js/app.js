// Global state
let currentPage = 'home';
let chatbotOpen = false;

// DOM elements
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');
const namasteCode = document.getElementById('namasteCode');
const icdCode = document.getElementById('icdCode');
const contactForm = document.getElementById('contactForm');
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSearch();
    initializeChatbot();
    initializeContactForm();
    initializeMobileMenu();
});

// Navigation functionality
function initializeNavigation() {
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            navigateToPage(page);
        });
    });
}

function navigateToPage(page) {
    // Update current page
    currentPage = page;
    
    // Update navigation
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-page') === page) {
            item.classList.add('active');
        }
    });
    
    // Update page visibility
    pages.forEach(pageEl => {
        pageEl.classList.remove('active');
        if (pageEl.id === page) {
            pageEl.classList.add('active');
        }
    });
}

// Search functionality
function initializeSearch() {
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

async function performSearch() {
    const query = searchInput.value.trim();
    if (!query) {
        showError('Please enter a disease name');
        return;
    }
    
    try {
        // Show loading state
        // searchBtn.innerHTML = '<span class="loading"></span>';
        searchBtn.disabled = true;
        
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        if (data.error) {
            showError(data.error);
            return;
        }
        
        if (data.results && data.results.length > 0) {
            displaySearchResults(data.results[0]);
        } else {
            showError('No matching disease found. Try another search term.');
        }
        
    } catch (error) {
        console.error('Search error:', error);
        showError('Search failed. Please try again.');
    } finally {
        // Reset button state
        // searchBtn.innerHTML = 'Search';
        searchBtn.disabled = false;
    }
}

function displaySearchResults(disease) {
    namasteCode.textContent = disease.namaste;
    icdCode.textContent = disease.icd11;
    searchResults.classList.remove('hidden');
    
    // Scroll to results
    searchResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showError(message) {
    searchResults.classList.add('hidden');
    
    // Create or update error message
    let errorEl = document.getElementById('searchError');
    if (!errorEl) {
        errorEl = document.createElement('div');
        errorEl.id = 'searchError';
        errorEl.className = 'search-error';
        searchResults.parentNode.insertBefore(errorEl, searchResults.nextSibling);
    }
    
    errorEl.innerHTML = `
        <div style="background: rgba(239, 68, 68, 0.2); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 0.5rem; padding: 1rem; text-align: center; color: #fca5a5; margin-top: 1rem;">
            ${message}
        </div>
    `;
    
    // Auto-hide error after 5 seconds
    setTimeout(() => {
        errorEl.innerHTML = '';
    }, 5000);
}

// Chatbot functionality
function initializeChatbot() {
    chatbotToggle.addEventListener('click', toggleChatbot);
    chatbotSend.addEventListener('click', sendChatMessage);
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
}

function toggleChatbot() {
    chatbotOpen = !chatbotOpen;
    
    if (chatbotOpen) {
        chatbotWindow.classList.remove('hidden');
        chatbotToggle.innerHTML = '✕';
        chatbotInput.focus();
    } else {
        chatbotWindow.classList.add('hidden');
        chatbotToggle.innerHTML = '💬';
    }
}

async function sendChatMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;
    
    // Add user message to chat
    addChatMessage(message, 'user');
    chatbotInput.value = '';
    
    try {
        const response = await fetch(`/api/chatbot?message=${encodeURIComponent(message)}`);
        const data = await response.json();
        
        // Add bot response to chat
        setTimeout(() => {
            addChatMessage(data.response, 'bot');
        }, 500); // Small delay for better UX
        
    } catch (error) {
        console.error('Chatbot error:', error);
        addChatMessage('Sorry, I encountered an error. Please try again.', 'bot');
    }
}

function addChatMessage(message, type) {
    const messageEl = document.createElement('div');
    messageEl.className = type === 'user' ? 'user-message' : 'bot-message';
    messageEl.textContent = message;
    
    chatbotMessages.appendChild(messageEl);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Contact form functionality
function initializeContactForm() {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simulate form submission
        showFormSuccess();
        contactForm.reset();
    });
}

function showFormSuccess() {
    const successMessage = document.createElement('div');
    successMessage.innerHTML = `
        <div style="background: rgba(34, 197, 94, 0.2); border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 0.5rem; padding: 1rem; text-align: center; color: #86efac; margin-top: 1rem;">
            Thank you for your message! We will get back to you soon.
        </div>
    `;
    
    contactForm.appendChild(successMessage);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// Mobile menu functionality
function initializeMobileMenu() {
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('mobile-active');
        this.classList.toggle('active');
    });
    
    // Close mobile menu when nav item is clicked
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navMenu.classList.remove('mobile-active');
            mobileMenuBtn.classList.remove('active');
        });
    });
}

// Utility functions
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

// Search only on button click - removed auto-search functionality

// Smooth scrolling for internal links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // ESC to close chatbot
    if (e.key === 'Escape' && chatbotOpen) {
        toggleChatbot();
    }
    
    // Quick navigation with number keys
    if (e.ctrlKey || e.metaKey) {
        const keyMap = {
            '1': 'home',
            '2': 'features',
            '3': 'api-docs',
            '4': 'use-cases',
            '5': 'contact'
        };
        
        if (keyMap[e.key]) {
            e.preventDefault();
            navigateToPage(keyMap[e.key]);
        }
    }
});

// Loading animation for page transitions
function showPageLoading() {
    document.body.style.pointerEvents = 'none';
    setTimeout(() => {
        document.body.style.pointerEvents = 'auto';
    }, 300);
}

// Enhanced navigation with loading
const originalNavigateToPage = navigateToPage;
navigateToPage = function(page) {
    showPageLoading();
    setTimeout(() => {
        originalNavigateToPage(page);
    }, 100);
};

// Initialize tooltips and interactive elements
function initializeInteractiveElements() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.feature-card, .feature-detailed-card, .use-case-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Call interactive elements initialization
document.addEventListener('DOMContentLoaded', initializeInteractiveElements);

// Performance optimization
function preloadImages() {
    // Preload any background images or icons here if needed
}

document.addEventListener('DOMContentLoaded', preloadImages);

// Error handling for fetch requests
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    showError('An unexpected error occurred. Please refresh the page and try again.');
});

// Service worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker can be registered here for caching and offline functionality
        console.log('Service Worker support detected');
    });
}
// Main application initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize modules
    modalModule.init();
    animationModule.init();
    matchesModule.displayMatches();
    betModule.displayBets();
    

    // Handle contact form submission
    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        utils.showMessage('Thank you for your message! We will get back to you soon.', 'success');
        e.target.reset();
    });

    // Mobile menu toggle
})
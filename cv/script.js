// script.js - Minimal interactivity for CV

document.addEventListener('DOMContentLoaded', function() {
    // Print button functionality
    const printButton = document.getElementById('print-btn');
    if (printButton) {
        printButton.addEventListener('click', function() {
            window.print();
        });
    }
    
    // Add smooth scrolling for anchor links (if any)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 20,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add current year to footer if needed
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
    
    // Console greeting (optional)
    console.log('CV loaded successfully!');
    console.log('This CV was built with HTML/CSS/JS and is optimized for both web and print.');
});
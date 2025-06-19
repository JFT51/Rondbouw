document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = document.querySelector('header').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - headerOffset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Basic "active" state for nav links on scroll
    const sections = document.querySelectorAll('main section');
    const headerHeight = document.querySelector('header').offsetHeight;

    // Adjust main content padding dynamically
    document.querySelector('main').style.paddingTop = headerHeight + 'px';

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - headerHeight - 5) { // Adjusted offset plus a small buffer
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('nav');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Update aria-expanded attribute for accessibility
            const isExpanded = navMenu.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isExpanded);
            if (isExpanded) {
                hamburger.innerHTML = '&times;'; // Change to 'X' (close icon)
                hamburger.setAttribute('aria-label', 'Menu sluiten');
            } else {
                hamburger.innerHTML = '&#9776;'; // Change back to hamburger icon
                hamburger.setAttribute('aria-label', 'Menu openen');
            }
        });

        // Close mobile menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    hamburger.innerHTML = '&#9776;'; // Reset hamburger icon
                    hamburger.setAttribute('aria-label', 'Menu openen');
                }
            });
        });
    }
});

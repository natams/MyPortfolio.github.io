// Make mobile navigation work
const btnNavEl = document.querySelector('.btn-mobile-nav')
const headerEl = document.querySelector('.header')

btnNavEl.addEventListener('click', () => {
    headerEl.classList.toggle('nav-open')
})


// Smooth scrolling animation
const allLinks = document.querySelectorAll('a:link')
allLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault()
        const href = link.getAttribute('href')

        // Scroll back to top
        if (href === '#')
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            })

        // Scroll to other links
        if (href !== '#' && href.startsWith('#')) {
            const sectionEl = document.querySelector(href)
            sectionEl.scrollIntoView({ behavior: 'smooth' })
        }

        // Close mobile navigation
        if (link.classList.contains('main-nav-link')) {
            headerEl.classList.toggle('nav-open')
        }
    })
})

document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        const targetId = this.getAttribute('href');

        // Check if the targetId starts with '#' to ensure it's an internal link
        if (targetId.startsWith('#')) {
            event.preventDefault(); // Prevent the default anchor behavior

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Disable right-click context menu
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});



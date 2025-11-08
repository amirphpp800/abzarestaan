// Page Transitions - Smooth navigation between pages

document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to body
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 10);

    // Handle all internal links
    const links = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"], a[href^="index.html"], a[href^="pages/"], a[href^="tools.html"], a[href^="articles.html"], a[href^="about.html"]');
    
    links.forEach(link => {
        // Skip links that open in new tab or have specific classes
        if (link.target === '_blank' || link.classList.contains('no-transition')) {
            return;
        }

        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's a hash link or external
            if (!href || href.startsWith('#') || href.startsWith('http')) {
                return;
            }

            e.preventDefault();
            
            // Fade out
            document.body.style.opacity = '0';
            
            // Navigate after fade out
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            document.body.style.opacity = '1';
        }
    });
});

// Add smooth scroll behavior for hash links
document.addEventListener('click', function(e) {
    const target = e.target.closest('a[href^="#"]');
    if (target) {
        e.preventDefault();
        const id = target.getAttribute('href').substring(1);
        const element = document.getElementById(id);
        
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

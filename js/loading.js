// Page Loading Manager
(function() {
    'use strict';

    // Create loading screen
    function createLoader() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-logo">
                    <img src="/assets/logo/logo.svg" alt="ابزارستان">
                </div>
                <div class="loader-spinner">
                    <div class="spinner-ring"></div>
                </div>
                <div class="loader-text">
                    در حال بارگذاری<span class="loader-dots"></span>
                </div>
            </div>
        `;
        document.body.insertBefore(loader, document.body.firstChild);
        return loader;
    }

    // Create loading bar
    function createLoadingBar() {
        const bar = document.createElement('div');
        bar.className = 'loading-bar';
        document.body.appendChild(bar);
        return bar;
    }

    // Hide loader
    function hideLoader(loader, bar) {
        // Simulate loading progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                // Complete loading bar
                bar.style.width = '100%';
                bar.classList.add('complete');
                
                // Hide loader after a short delay
                setTimeout(() => {
                    loader.classList.add('hidden');
                    document.body.classList.add('loaded');
                    
                    // Remove elements after transition
                    setTimeout(() => {
                        loader.remove();
                        bar.remove();
                    }, 500);
                }, 300);
            } else {
                bar.style.width = progress + '%';
            }
        }, 100);
    }

    // Initialize loading
    function initLoading() {
        const loader = createLoader();
        const bar = createLoadingBar();

        // Wait for page to load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                hideLoader(loader, bar);
            });
        } else {
            hideLoader(loader, bar);
        }

        // Fallback: force hide after 2 seconds max
        setTimeout(() => {
            if (!loader.classList.contains('hidden')) {
                hideLoader(loader, bar);
            }
        }, 2000);
        
        // Emergency fallback: ensure content is visible after 3 seconds
        setTimeout(() => {
            document.body.classList.add('loaded');
            document.body.style.opacity = '1';
        }, 3000);
    }

    // Start loading immediately
    initLoading();

    // Handle page navigation (for SPA-like behavior)
    window.addEventListener('beforeunload', () => {
        document.body.style.opacity = '0';
    });

})();

// Utility function for manual loading states
window.showLoading = function() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.classList.remove('hidden');
    }
};

window.hideLoading = function() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.classList.add('hidden');
    }
};

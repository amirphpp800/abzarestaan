// Page Loading Manager - Enhanced for slow connections
(function() {
    'use strict';

    let progress = 0;
    let progressInterval;
    let resourcesLoaded = 0;
    let totalResources = 0;

    // Create loading screen
    function createLoader() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.id = 'pageLoader';
        loader.innerHTML = `
            <div class="loading-bar" id="loadingBar"></div>
            <div class="loader-content">
                <div class="loader-logo">
                    <img src="assets/logo/logo.svg" alt="ابزارستان">
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

    // Update progress bar
    function updateProgress(newProgress) {
        const bar = document.getElementById('loadingBar');
        if (bar && newProgress > progress) {
            progress = newProgress;
            bar.style.width = progress + '%';
        }
    }

    // Start simulated progress
    function startProgress() {
        progressInterval = setInterval(() => {
            if (progress < 70) {
                // Slow incremental progress
                const increment = progress < 30 ? 2 : progress < 50 ? 1 : 0.5;
                updateProgress(progress + increment);
            }
        }, 200);
    }

    // Complete loading
    function completeLoading(loader) {
        clearInterval(progressInterval);
        
        // Complete the progress bar
        updateProgress(100);
        
        // Hide loader after animation
        setTimeout(() => {
            if (loader) {
                loader.classList.add('hidden');
                document.body.classList.add('loaded');
                document.body.style.opacity = '1';
            }
            
            // Remove loader from DOM
            setTimeout(() => {
                if (loader && loader.parentNode) {
                    loader.remove();
                }
            }, 500);
        }, 400);
    }

    // Track resource loading
    function trackResources() {
        // Track images
        const images = document.querySelectorAll('img');
        totalResources += images.length;

        images.forEach(img => {
            if (img.complete) {
                resourcesLoaded++;
            } else {
                img.addEventListener('load', () => {
                    resourcesLoaded++;
                    updateResourceProgress();
                });
                img.addEventListener('error', () => {
                    resourcesLoaded++;
                    updateResourceProgress();
                });
            }
        });

        // Track stylesheets
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        totalResources += stylesheets.length;

        stylesheets.forEach(link => {
            if (link.sheet) {
                resourcesLoaded++;
            } else {
                link.addEventListener('load', () => {
                    resourcesLoaded++;
                    updateResourceProgress();
                });
                link.addEventListener('error', () => {
                    resourcesLoaded++;
                    updateResourceProgress();
                });
            }
        });

        // Track scripts
        const scripts = document.querySelectorAll('script[src]');
        totalResources += scripts.length;

        scripts.forEach(script => {
            script.addEventListener('load', () => {
                resourcesLoaded++;
                updateResourceProgress();
            });
            script.addEventListener('error', () => {
                resourcesLoaded++;
                updateResourceProgress();
            });
        });
    }

    // Update progress based on resources loaded
    function updateResourceProgress() {
        if (totalResources > 0) {
            const resourceProgress = Math.floor((resourcesLoaded / totalResources) * 30);
            updateProgress(70 + resourceProgress);
        }
    }

    // Initialize loading
    function initLoading() {
        const loader = createLoader();
        
        // Start progress animation
        startProgress();
        
        // Track all resources
        setTimeout(() => {
            trackResources();
        }, 100);

        // Wait for complete page load (including all resources)
        if (document.readyState === 'complete') {
            // Page already loaded
            setTimeout(() => completeLoading(loader), 500);
        } else {
            // Wait for window load event (all resources loaded)
            window.addEventListener('load', () => {
                setTimeout(() => completeLoading(loader), 500);
            });

            // Fallback: Hide after maximum wait time (15 seconds for slow connections)
            setTimeout(() => {
                if (loader && !loader.classList.contains('hidden')) {
                    console.warn('Loading timeout - completing anyway');
                    completeLoading(loader);
                }
            }, 15000);
        }
    }

    // Start loading immediately
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLoading);
    } else {
        initLoading();
    }

    // Handle page navigation
    window.addEventListener('beforeunload', () => {
        document.body.style.opacity = '0.7';
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

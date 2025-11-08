// Page Loader - Show loading screen until page is fully loaded
(function() {
    'use strict';

    const pageLoader = document.getElementById('pageLoader');
    const loadingBar = document.getElementById('loadingBar');
    let progress = 0;
    let progressInterval;

    // Start loading bar animation
    function startLoadingBar() {
        progressInterval = setInterval(() => {
            if (progress < 90) {
                // Slow down as we approach 90%
                const increment = progress < 50 ? 5 : progress < 70 ? 3 : 1;
                progress += increment;
                if (loadingBar) {
                    loadingBar.style.width = progress + '%';
                }
            }
        }, 100);
    }

    // Complete loading
    function completeLoading() {
        clearInterval(progressInterval);
        
        // Complete the progress bar
        if (loadingBar) {
            loadingBar.style.width = '100%';
        }

        // Wait a bit then hide loader
        setTimeout(() => {
            if (pageLoader) {
                pageLoader.classList.add('hidden');
                document.body.classList.add('loaded');
            }

            // Remove loader from DOM after animation
            setTimeout(() => {
                if (pageLoader && pageLoader.parentNode) {
                    pageLoader.parentNode.removeChild(pageLoader);
                }
            }, 500);
        }, 300);
    }

    // Check if page is already loaded (cached)
    if (document.readyState === 'complete') {
        completeLoading();
    } else {
        // Start loading bar
        startLoadingBar();

        // Listen for page load
        window.addEventListener('load', completeLoading);

        // Fallback: Hide loader after maximum time (10 seconds)
        setTimeout(() => {
            if (pageLoader && !pageLoader.classList.contains('hidden')) {
                console.warn('Loading timeout - forcing loader hide');
                completeLoading();
            }
        }, 10000);
    }

    // Handle images loading
    const images = document.querySelectorAll('img');
    let loadedImages = 0;
    const totalImages = images.length;

    if (totalImages > 0) {
        images.forEach(img => {
            if (img.complete) {
                loadedImages++;
            } else {
                img.addEventListener('load', () => {
                    loadedImages++;
                    // Update progress based on images loaded
                    const imageProgress = Math.floor((loadedImages / totalImages) * 30);
                    if (progress < 60 + imageProgress) {
                        progress = 60 + imageProgress;
                        if (loadingBar) {
                            loadingBar.style.width = progress + '%';
                        }
                    }
                });
                img.addEventListener('error', () => {
                    loadedImages++;
                });
            }
        });
    }

    // Preload critical resources
    const criticalResources = [
        'css/main.css',
        'css/layout.css',
        'css/components.css',
        'assets/logo/logo.svg'
    ];

    let loadedResources = 0;
    criticalResources.forEach(resource => {
        fetch(resource)
            .then(() => {
                loadedResources++;
                const resourceProgress = Math.floor((loadedResources / criticalResources.length) * 20);
                if (progress < 40 + resourceProgress) {
                    progress = 40 + resourceProgress;
                    if (loadingBar) {
                        loadingBar.style.width = progress + '%';
                    }
                }
            })
            .catch(() => {
                loadedResources++;
            });
    });

})();

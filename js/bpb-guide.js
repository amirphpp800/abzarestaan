// BPB Guide Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Common elements
    const sidebar = document.querySelector('.bpb-sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarNav = document.getElementById('sidebarNav');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    
    // Force sticky positioning on desktop
    function updateSidebarPosition() {
        const isMobile = window.innerWidth <= 1024;
        
        console.log('Window width:', window.innerWidth);
        console.log('Is mobile:', isMobile);
        
        if (sidebar) {
            // Get all parent elements
            const container = document.querySelector('.bpb-container');
            const layout = document.querySelector('.bpb-guide-layout');
            const mainElement = document.querySelector('.bpb-guide-page');
            
            if (isMobile) {
                // Mobile: fixed positioning
                sidebar.style.position = 'fixed';
                sidebar.style.top = '0';
                sidebar.style.right = '-100%';
                console.log('Sidebar set to FIXED (mobile)');
            } else {
                // Desktop: sticky positioning
                // Fix body and html overflow
                document.body.style.overflowX = 'visible';
                document.documentElement.style.overflowX = 'visible';
                console.log('Body overflow fixed');
                
                // Fix all parent overflow issues
                if (container) {
                    container.style.overflow = 'visible';
                    container.style.overflowX = 'visible';
                    container.style.overflowY = 'visible';
                    console.log('Container overflow fixed');
                }
                
                if (layout) {
                    layout.style.overflow = 'visible';
                    layout.style.overflowX = 'visible';
                    layout.style.overflowY = 'visible';
                    console.log('Layout overflow fixed');
                }
                
                if (mainElement) {
                    mainElement.style.overflow = 'visible';
                    mainElement.style.overflowX = 'visible';
                    mainElement.style.overflowY = 'visible';
                    console.log('Main element overflow fixed');
                }
                
                // Set sidebar to sticky
                sidebar.style.position = 'sticky';
                sidebar.style.top = '2rem';
                sidebar.style.right = 'auto';
                sidebar.style.zIndex = '10';
                sidebar.style.maxHeight = 'calc(100vh - 4rem)';
                sidebar.style.overflowY = 'auto';
                sidebar.style.overflowX = 'hidden';
                sidebar.style.scrollbarWidth = 'none'; // Firefox
                sidebar.style.msOverflowStyle = 'none'; // IE/Edge
                
                console.log('Sidebar set to STICKY (desktop)');
                console.log('Computed position:', window.getComputedStyle(sidebar).position);
                
                // Check parent overflows
                console.log('Body overflow-x:', window.getComputedStyle(document.body).overflowX);
                console.log('HTML overflow-x:', window.getComputedStyle(document.documentElement).overflowX);
                console.log('Container overflow:', window.getComputedStyle(container).overflow);
                console.log('Layout overflow:', window.getComputedStyle(layout).overflow);
                
                // Check all parents for overflow hidden
                let parent = sidebar.parentElement;
                let level = 1;
                while (parent && level <= 10) {
                    const styles = window.getComputedStyle(parent);
                    if (styles.overflow !== 'visible' || styles.overflowX !== 'visible' || styles.overflowY !== 'visible') {
                        console.warn(`⚠️ Parent level ${level} has overflow issue:`, {
                            element: parent.className || parent.tagName,
                            overflow: styles.overflow,
                            overflowX: styles.overflowX,
                            overflowY: styles.overflowY
                        });
                    }
                    parent = parent.parentElement;
                    level++;
                }
            }
        }
    }
    
    // Run on load
    updateSidebarPosition();
    
    // Run on resize
    window.addEventListener('resize', updateSidebarPosition);
    
    // Make sure all sidebar links are clickable
    sidebarLinks.forEach(link => {
        link.style.pointerEvents = 'auto';
        link.style.cursor = 'pointer';
    });
    
    // Toggle sidebar visibility (Desktop collapse/expand)
    const toggleBtn = document.getElementById('toggleSidebar');
    
    if (toggleBtn && sidebarNav) {
        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isMobile = window.innerWidth <= 1024;
            
            if (isMobile) {
                // On mobile, close the sidebar
                if (sidebar && sidebarOverlay) {
                    sidebar.classList.remove('active');
                    sidebarOverlay.classList.remove('active');
                    document.body.classList.remove('sidebar-open');
                }
            } else {
                // On desktop, toggle collapse/expand
                sidebarNav.classList.toggle('hidden');
                
                // Change button text
                if (sidebarNav.classList.contains('hidden')) {
                    toggleBtn.textContent = '[نمایش]';
                } else {
                    toggleBtn.textContent = '[پنهان]';
                }
            }
        });
    }
    
    // Smooth scrolling for sidebar links
    function handleSidebarLinkClick(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const link = e.currentTarget;
        const targetId = link.getAttribute('href');
        
        console.log('Link clicked:', targetId); // Debug
        
        // Remove active class from all links
        sidebarLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Get target section
        const targetSection = document.querySelector(targetId);
        
        console.log('Target section found:', targetSection); // Debug
        
        if (targetSection) {
            const isMobile = window.innerWidth <= 1024;
            
            // Function to perform scroll
            const performScroll = () => {
                const headerOffset = 120;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                
                console.log('Scrolling to:', offsetPosition); // Debug
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            };
            
            if (isMobile) {
                // On mobile, close the sidebar first
                if (sidebar && sidebarOverlay) {
                    sidebar.classList.remove('active');
                    sidebarOverlay.classList.remove('active');
                    document.body.classList.remove('sidebar-open');
                }
                
                // Scroll to the section after sidebar closes
                setTimeout(performScroll, 350);
            } else {
                // On desktop, scroll immediately
                performScroll();
            }
        } else {
            console.error('Target section not found for:', targetId); // Debug
        }
    }
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', handleSidebarLinkClick);
        // Ensure links are clickable
        link.style.pointerEvents = 'auto';
        link.style.cursor = 'pointer';
    });
    
    // Update active link on scroll
    const sections = document.querySelectorAll('.content-section');
    
    function updateActiveLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Throttle scroll event
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(function() {
            updateActiveLink();
        });
    });
    
    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !mainNav.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                mainNav.classList.remove('active');
            }
        });
    }
    
    // Mobile sidebar toggle functionality
    const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');
    
    function toggleMobileSidebar() {
        if (sidebar && sidebarOverlay) {
            const isActive = sidebar.classList.contains('active');
            
            if (isActive) {
                // Close sidebar
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
                document.body.classList.remove('sidebar-open');
                
                // If a section was selected in the sidebar, scroll to it
                if (window.targetSectionId) {
                    const targetSection = document.querySelector(window.targetSectionId);
                    if (targetSection) {
                        setTimeout(() => {
                            targetSection.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                            // Clear the target section ID
                            window.targetSectionId = null;
                        }, 300);
                    }
                }
            } else {
                // Open sidebar
                sidebar.classList.add('active');
                sidebarOverlay.classList.add('active');
                document.body.classList.add('sidebar-open');
            }
        }
    }
    
    if (mobileSidebarToggle) {
        // Add both click and touchstart events for better mobile support
        mobileSidebarToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile sidebar toggle clicked');
            toggleMobileSidebar();
        });
        
        mobileSidebarToggle.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile sidebar toggle touched');
            toggleMobileSidebar();
        }, { passive: false });
        
        // Ensure the toggle button is always clickable
        mobileSidebarToggle.style.pointerEvents = 'auto';
        mobileSidebarToggle.style.zIndex = '1002';
        mobileSidebarToggle.style.cursor = 'pointer';
        mobileSidebarToggle.style.userSelect = 'none';
        mobileSidebarToggle.style.webkitUserSelect = 'none';
        mobileSidebarToggle.style.webkitTapHighlightColor = 'transparent';
        
        console.log('Mobile sidebar toggle initialized');
    } else {
        console.error('Mobile sidebar toggle button not found!');
    }
    
    // Close sidebar when clicking overlay
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Overlay clicked');
            if (sidebar) {
                sidebar.classList.remove('active');
            }
            sidebarOverlay.classList.remove('active');
            document.body.classList.remove('sidebar-open');
            
            // If a section was selected in the sidebar, scroll to it
            if (window.targetSectionId) {
                const targetSection = document.querySelector(window.targetSectionId);
                if (targetSection) {
                    setTimeout(() => {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        // Clear the target section ID
                        window.targetSectionId = null;
                    }, 300);
                }
            }
        });
        
        // Add touchstart for better mobile support
        sidebarOverlay.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Overlay touched');
            if (sidebar) {
                sidebar.classList.remove('active');
            }
            sidebarOverlay.classList.remove('active');
            document.body.classList.remove('sidebar-open');
        }, { passive: false });
    }
    
    // We're removing the automatic closing of sidebar when clicking links
    // This allows users to navigate through the sidebar without it closing
    // The sidebar will only close when clicking the overlay or the close button
    
    // Optional: If you still want to close the sidebar after a delay when clicking a link
    // Uncomment the following code:
    /*
    const closeSidebarOnMobile = function() {
        if (window.innerWidth <= 1024 && sidebar && sidebarOverlay) {
            setTimeout(() => {
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }, 1000); // Longer delay to allow the user to see where they're navigating
        }
    };
    
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', closeSidebarOnMobile);
    });
    */
    
    // Copy code functionality (if needed in future)
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.textContent = 'کپی';
        button.addEventListener('click', function() {
            navigator.clipboard.writeText(block.textContent);
            button.textContent = 'کپی شد!';
            setTimeout(() => {
                button.textContent = 'کپی';
            }, 2000);
        });
        block.parentElement.style.position = 'relative';
        block.parentElement.appendChild(button);
    });
});

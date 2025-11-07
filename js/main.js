// Main JavaScript File

// Sample data - In a real application, this would come from an API or database
const sampleArticles = [
    {
        id: '1',
        title: 'کنترل به جای نوآوری: روایت توسعه نامتوازن هوش مصنوعی در ایران',
        excerpt: 'جمهوری اسلامی ایران طی سال‌های اخیر استفاده از فناوری‌های نوین برای کنترل جامعه را به صورت سیستماتیک توسعه داده است',
        content: 'این مقاله به بررسی نحوه‌ای می‌پردازد که توسعه هوش مصنوعی در ایران صرفاً در جهت تأمین نیازهای نظارتی پیش رفته است...',
        date: '۱۵ مهر ۱۴۰۳',
        category: 'تکنولوژی',
        views: 1250,
        comments: 12,
        coverImage: '/assets/images/ai.png',
        featured: true
    },
    {
        id: '2',
        title: 'آینده طراحی وب در عصر هوش مصنوعی',
        excerpt: 'بررسی تأثیرات هوش مصنوعی بر صنعت طراحی وب و چگونگی تطبیق با تکنولوژی‌های جدید',
        content: 'هوش مصنوعی به سرعت در حال تغییر چهره صنعت طراحی وب است...',
        date: '۱۰ مهر ۱۴۰۳',
        category: 'طراحی وب',
        views: 890,
        comments: 8,
        coverImage: '/assets/images/head-banner.png'
    },
    {
        id: '3',
        title: 'میراث جنگ: نگاه امنیتی بر اکوسیستم دیجیتال',
        excerpt: 'بررسی تأثیرات جنگ بر اکوسیستم دیجیتال ایران و چگونگی تبدیل نگاه امنیتی به رویکرد غالب',
        content: 'با رشد روزافزون استفاده از اینترنت، امنیت سایبری تبدیل به مهم‌ترین دغدغه شده است...',
        date: '۵ مهر ۱۴۰۳',
        category: 'امنیت',
        views: 654,
        comments: 15,
        coverImage: '/assets/images/war.png'
    },
    {
        id: '4',
        title: 'معماری میکروسرویس‌ها در پروژه‌های بزرگ',
        excerpt: 'نحوه پیاده‌سازی معماری میکروسرویس و مزایای آن در پروژه‌های مقیاس بزرگ',
        content: 'معماری میکروسرویس یکی از الگوهای مدرن توسعه نرم‌افزار است...',
        date: '۱۴۰۳/۰۸/۰۸',
        category: 'معماری',
        views: 543,
        comments: 18,
        icon: '🏗️'
    },
    {
        id: '5',
        title: 'آینده هوش مصنوعی در توسعه وب',
        excerpt: 'بررسی تأثیر هوش مصنوعی بر صنعت توسعه وب و ابزارهای جدید',
        content: 'هوش مصنوعی در حال تغییر چهره صنعت توسعه وب است...',
        date: '۱۴۰۳/۰۸/۰۵',
        category: 'هوش مصنوعی',
        views: 892,
        comments: 27,
        icon: '🤖'
    },
    {
        id: '6',
        title: 'طراحی رابط کاربری مدرن با CSS Grid',
        excerpt: 'آموزش کامل استفاده از CSS Grid برای ایجاد لایوت‌های پیچیده و زیبا',
        content: 'CSS Grid یکی از قدرتمندترین ابزارهای طراحی لایوت است...',
        date: '۱۴۰۳/۰۸/۰۳',
        category: 'CSS',
        views: 665,
        comments: 12,
        icon: '📐'
    }
];

const sampleTools = [
    {
        id: '1',
        title: 'مولد رنگ‌های هارمونیک',
        description: 'ابزاری برای تولید پالت رنگ‌های هماهنگ و زیبا برای پروژه‌های طراحی',
        coverImage: '/assets/images/head-banner.png',
        features: [
            'تولید پالت رنگ خودکار',
            'پشتیبانی از انواع هارمونی رنگ',
            'صادرات به فرمت‌های مختلف',
            'پیش‌نمایش زنده'
        ],
        featured: true
    },
    {
        id: '2',
        title: 'تحلیلگر صوتی پیشرفته',
        description: 'ابزاری قدرتمند برای تجزیه و تحلیل فایل‌های صوتی و استخراج اطلاعات',
        coverImage: '/assets/images/audio.png',
        features: [
            'تحلیل فرکانس صوت',
            'شناسایی الگوهای صوتی',
            'تبدیل فرمت صوتی',
            'گزارش تفصیلی'
        ]
    },
    {
        id: '3',
        title: 'مبدل کد رنگ',
        description: 'تبدیل بین فرمت‌های مختلف رنگ (HEX, RGB, HSL, CMYK)',
        icon: '🌈',
        features: [
            'پشتیبانی از همه فرمت‌ها',
            'تبدیل فوری',
            'پیش‌نمایش رنگ',
            'کپی سریع'
        ]
    },
    {
        id: '4',
        title: 'ژنراتور متن لورم',
        description: 'تولید متن‌های نمونه فارسی و انگلیسی برای پروژه‌های طراحی',
        icon: '📝',
        features: [
            'متن فارسی و انگلیسی',
            'طول قابل تنظیم',
            'فرمت‌های مختلف',
            'کپی آسان'
        ]
    },
    {
        id: '5',
        title: 'فشرده‌ساز تصاویر',
        description: 'کاهش حجم تصاویر بدون از دست دادن کیفیت برای بهینه‌سازی وب',
        icon: '📷',
        features: [
            'فشرده‌سازی بدون افت کیفیت',
            'پشتیبانی از فرمت‌های مختلف',
            'پردازش دسته‌ای',
            'پیش‌نمایش قبل و بعد'
        ],
        featured: true
    },
    {
        id: '6',
        title: 'تولیدکننده QR کد',
        description: 'ایجاد QR کدهای سفارشی برای لینک‌ها، متن‌ها و اطلاعات تماس',
        icon: '📱',
        features: [
            'انواع مختلف QR کد',
            'سفارشی‌سازی ظاهر',
            'دانلود با کیفیت بالا',
            'پیش‌نمایش زنده'
        ]
    }
];

// State management
let currentArticlePage = 1;
let articlesPerPage = 6;
let isLoading = false;

// DOM elements
let articlesContainer;
let toolsContainer;
let loadMoreBtn;
let searchInput;
let searchBtn;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
    loadInitialContent();
    setupSearch();
    setupAutoRedirects();
    setupAutoSEO();
});

// Auto SEO and meta tags management
function setupAutoSEO() {
    // Auto update page title based on current section
    function updatePageTitle() {
        const hash = window.location.hash;
        const baseTitle = 'ابـزارسـتـان - مرجع کامل ابزارها و مقالات';

        let newTitle = baseTitle;

        switch(hash) {
            case '#articles':
                newTitle = 'مقالات - ' + baseTitle;
                break;
            case '#tools':
                newTitle = 'ابزارها - ' + baseTitle;
                break;
            case '#about':
                newTitle = 'درباره ما - ' + baseTitle;
                break;
        }

        document.title = newTitle;

        // Update Open Graph title
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.setAttribute('content', newTitle);
        }
    }

    // Listen for hash changes to update title
    window.addEventListener('hashchange', updatePageTitle);

    // Auto add structured data
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "ابـزارسـتـان",
        "description": "مرجع کامل ابزارها و مقالات کاربردی برای توسعه‌دهندگان و طراحان",
        "url": window.location.origin,
        "potentialAction": {
            "@type": "SearchAction",
            "target": window.location.origin + "/?search={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    // Add structured data to head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
}

// Auto redirect handling (replaces _redirects file)
function setupAutoRedirects() {
    // Handle 404 errors by redirecting to home
    window.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG' || e.target.tagName === 'LINK') {
            console.warn('Resource not found:', e.target.src || e.target.href);
        }
    });

    // Handle hash-based routing
    function handleRouting() {
        const hash = window.location.hash;

        // Auto scroll to sections
        if (hash && document.querySelector(hash)) {
            setTimeout(() => {
                document.querySelector(hash).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }

    // Listen for hash changes
    window.addEventListener('hashchange', handleRouting);

    // Handle initial load
    handleRouting();

    // Force HTTPS in production (optional)
    if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
        // Uncomment next line to force HTTPS
        // location.replace('https:' + window.location.href.substring(window.location.protocol.length));
    }
}

function initializeElements() {
    articlesContainer = document.getElementById('articles-container');
    toolsContainer = document.getElementById('tools-container');
    loadMoreBtn = document.getElementById('load-more-articles');
    searchInput = document.querySelector('.search-input');
    searchBtn = document.querySelector('.search-btn');
}

function setupEventListeners() {
    // Load more articles
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreArticles);
    }

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation link highlighting
    window.addEventListener('scroll', updateActiveNavLink);

    // Search functionality
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
}

function loadInitialContent() {
    loadArticles();
    loadTools();

    // Set search data
    searchInstance.setData(sampleArticles, sampleTools);
}

function loadArticles(articles = null) {
    if (!articlesContainer) return;

    const articlesToShow = articles || sampleArticles.slice(0, articlesPerPage * currentArticlePage);

    if (!articles) {
        // Show loading skeletons initially
        showLoadingSkeletons(articlesContainer, LoadingSkeleton.article, 6);

        // Simulate loading delay
        setTimeout(() => {
            articlesContainer.innerHTML = '';
            renderArticles(articlesToShow);
        }, 1000);
    } else {
        renderArticles(articlesToShow);
    }
}

function renderArticles(articles) {
    if (!articlesContainer) return;

    articlesContainer.innerHTML = '';
    articles.forEach(article => {
        const articleCard = new ArticleCard(article);
        articlesContainer.innerHTML += articleCard.render();
    });

    // Update load more button visibility
    if (loadMoreBtn) {
        const hasMore = articles.length < sampleArticles.length && !isLoading;
        loadMoreBtn.style.display = hasMore ? 'inline-block' : 'none';
    }
}

function loadTools(tools = null) {
    if (!toolsContainer) return;

    const toolsToShow = tools || sampleTools;

    if (!tools) {
        // Show loading skeletons initially
        showLoadingSkeletons(toolsContainer, LoadingSkeleton.tool, 6);

        // Simulate loading delay
        setTimeout(() => {
            toolsContainer.innerHTML = '';
            renderTools(toolsToShow);
        }, 1200);
    } else {
        renderTools(toolsToShow);
    }
}

function renderTools(tools) {
    if (!toolsContainer) return;

    toolsContainer.innerHTML = '';
    tools.forEach(tool => {
        const toolCard = new ToolCard(tool);
        toolsContainer.innerHTML += toolCard.render();
    });
}

function showLoadingSkeletons(container, skeletonFunction, count) {
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
        container.innerHTML += skeletonFunction();
    }
}

function loadMoreArticles() {
    if (isLoading) return;

    isLoading = true;
    loadMoreBtn.innerHTML = '<span class="loading"></span> در حال بارگذاری...';

    setTimeout(() => {
        currentArticlePage++;
        const newArticles = sampleArticles.slice(0, articlesPerPage * currentArticlePage);
        renderArticles(newArticles);

        isLoading = false;
        loadMoreBtn.innerHTML = 'مشاهده بیشتر';

        Toast.show('مقالات جدید بارگذاری شد!', 'success');
    }, 1000);
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('.newsletter-input').value;

    if (email) {
        Toast.show('با موفقیت در خبرنامه عضو شدید!', 'success');
        e.target.reset();
    } else {
        Toast.show('لطفاً ایمیل معتبر وارد کنید', 'error');
    }
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

function handleSearch() {
    const query = searchInput.value.trim();

    if (!query) {
        loadArticles();
        loadTools();
        Toast.show('جستجو خالی است', 'error');
        return;
    }

    const results = searchInstance.search(query);

    if (results.articles.length === 0 && results.tools.length === 0) {
        Toast.show('نتیجه‌ای یافت نشد', 'info');
        return;
    }

    loadArticles(results.articles);
    loadTools(results.tools);

    Toast.show(`${results.articles.length + results.tools.length} نتیجه یافت شد`, 'success');
}

function setupSearch() {
    // Advanced search functionality can be added here
    // For now, we have basic search implemented above
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

// Performance optimization
const debouncedSearch = debounce(handleSearch, 300);
if (searchInput) {
    searchInput.addEventListener('input', debouncedSearch);
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('خطا رخ داد:', e.error);
    Toast.show('خطایی رخ داد. لطفاً صفحه را تازه‌سازی کنید.', 'error');
});

// Mobile menu toggle
function toggleMobileMenu() {
    const nav = document.querySelector('.main-nav');
    nav.classList.toggle('active');
}

// Service Worker registration is handled in pwa/pwa-init.js

// ArticleCard, ToolCard, and LoadingSkeleton classes are defined in components.js

// Placeholder for Toast notifications
class Toast {
    static show(message, type = 'info') {
        console.log(`Toast (${type}): ${message}`);
        // In a real app, this would display a visible notification to the user.
    }
}

// Search functionality is defined in components.js (Search class and searchInstance)
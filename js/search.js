// Search Functionality
(function() {
    'use strict';

    // Database of all content
    const searchDatabase = {
        articles: [
            { 
                id: 5, 
                title: 'از اینترنت طبقاتی تا اعلام شروط رفع فیلتر تلگرام؛ اجرای گام به گام مصوبه‌ای که انتشار عمومی نیافت', 
                excerpt: 'بررسی اجرای گام به گام مصوبه‌ای که انتشار عمومی نیافت و تأثیر آن بر اینترنت ایران و رفع فیلتر تلگرام.',
                date: '۱۶ آبان ۱۴۰۴',
                image: 'assets/images/network.png',
                tags: ['اینترنت', 'فیلترینگ', 'تلگرام', 'سیاستگذاری'],
                type: 'article',
                url: '/pages/article.html?id=5'
            },
            { 
                id: 4, 
                title: 'رمز‌ارز جدیدترین ابزار جمهوری اسلامی برای تاب‌آوری در مقابل تحریم‌ها', 
                excerpt: 'بررسی نقش رمزارزها در اقتصاد ایران و چگونگی استفاده از آن برای دور زدن تحریم‌های بین‌المللی.',
                date: '۱۵ مهر ۱۴۰۴',
                image: 'assets/images/network.png',
                tags: ['رمزارز', 'تحریم', 'اقتصاد'],
                type: 'article',
                url: '/pages/article.html?id=4'
            },
            { 
                id: 3, 
                title: 'از اینترنت تا پیامک؛ گسترش سانسور به آخرین کانال ارتباطی', 
                excerpt: 'بررسی گسترش سانسور از اینترنت به پیامک و تأثیر آن بر آخرین کانال‌های ارتباطی شهروندان.',
                date: '۲۳ مرداد ۱۴۰۴',
                image: 'assets/images/sms.png',
                tags: ['سانسور', 'پیامک', 'ارتباطات'],
                type: 'article',
                url: '/pages/article.html?id=3'
            },
            { 
                id: 2, 
                title: 'میراث جنگ ۱۲ روزه: غلبه نگاه امنیتی بر اکوسیستم دیجیتال و شبکه اینترنت', 
                excerpt: 'بررسی تأثیرات جنگ ۱۲ روزه بر اکوسیستم دیجیتال ایران و چگونگی تبدیل نگاه امنیتی به رویکرد غالب در مدیریت فضای مجازی و شبکه اینترنت کشور.',
                date: '۱۰ مرداد ۱۴۰۴',
                image: 'assets/images/war.png',
                tags: ['امنیت', 'اینترنت', 'جنگ'],
                type: 'article',
                url: '/pages/article.html?id=2'
            },
            { 
                id: 1, 
                title: 'کنترل به جای نوآوری؛ روایت توسعه نامتوازن هوش مصنوعی در ایران', 
                excerpt: 'بررسی چالش‌های توسعه هوش مصنوعی در ایران و تمرکز بر کنترل به جای نوآوری.',
                date: '۱۸ آبان ۱۴۰۳',
                image: 'assets/images/ai.png',
                tags: ['هوش مصنوعی', 'فناوری', 'نوآوری'],
                type: 'article',
                url: '/pages/article.html?id=1'
            }
        ],
        podcasts: [
            {
                id: 1,
                title: 'پادکست لایه هفتم',
                excerpt: 'در مورد فیلترینگ در ایران، راه‌های دسترسی به اینترنت، نگرانی‌های امنیت دیجیتال شهروندان، حمله‌های سایبری',
                image: 'assets/images/audio.png',
                tags: ['پادکست', 'فیلترینگ', 'امنیت'],
                type: 'podcast',
                url: '/pages/podcast-layeh7.html'
            }
        ],
        tools: [
            {
                id: 1,
                title: 'دسترسی به اینترنت آزاد با کلودفلر',
                excerpt: 'دسترسی به اینترنت بدون فیلتر با استفاده از پنل BPB و Cloudflare Workers',
                image: 'assets/images/BPB-card.svg',
                tags: ['ابزار', 'فیلترشکن', 'کلودفلر'],
                type: 'tool',
                url: '/pages/bpb-guide.html'
            }
        ]
    };

    // DOM Elements
    const searchBtn = document.getElementById('searchBtn');
    const headerSearchBtn = document.getElementById('headerSearchBtn');
    const headerSearchInput = document.getElementById('headerSearchInput');
    const searchModal = document.getElementById('searchModal');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchCloseBtn = document.getElementById('searchCloseBtn');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchTags = document.querySelectorAll('.search-tag');

    // Open search modal
    function openSearch() {
        searchModal.classList.add('active');
        searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            searchInput.focus();
        }, 300);
    }

    // Close search modal
    function closeSearch() {
        searchModal.classList.remove('active');
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
        searchInput.value = '';
        showEmptyState();
    }

    // Show empty state
    function showEmptyState() {
        searchResults.innerHTML = `
            <div class="search-empty">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
                <p>جستجو کنید</p>
                <small>مقالات، ابزارها و پادکست‌ها را جستجو کنید</small>
            </div>
        `;
    }

    // Show no results
    function showNoResults() {
        searchResults.innerHTML = `
            <div class="no-results">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
                <p>نتیجه‌ای یافت نشد</p>
            </div>
        `;
    }

    // Search function
    function performSearch(query) {
        if (!query || query.trim() === '') {
            showEmptyState();
            return;
        }

        query = query.toLowerCase().trim();
        const results = [];

        // Search in all content
        const allContent = [
            ...searchDatabase.articles,
            ...searchDatabase.podcasts,
            ...searchDatabase.tools
        ];

        allContent.forEach(item => {
            const titleMatch = item.title.toLowerCase().includes(query);
            const excerptMatch = item.excerpt.toLowerCase().includes(query);
            const tagsMatch = item.tags.some(tag => tag.toLowerCase().includes(query));

            if (titleMatch || excerptMatch || tagsMatch) {
                results.push(item);
            }
        });

        displayResults(results);
    }

    // Display search results
    function displayResults(results) {
        if (results.length === 0) {
            showNoResults();
            return;
        }

        const resultsHTML = results.map(item => {
            const typeIcon = getTypeIcon(item.type);
            const typeName = getTypeName(item.type);
            
            return `
                <a href="${item.url}" class="search-result-item">
                    <div class="search-result-thumbnail">
                        <img src="${item.image}" alt="${item.title}" loading="lazy">
                    </div>
                    <div class="search-result-content">
                        <h3 class="search-result-title">${item.title}</h3>
                        <p class="search-result-excerpt">${item.excerpt}</p>
                        <div class="search-result-meta">
                            <span class="search-result-badge">
                                ${typeIcon}
                                ${typeName}
                            </span>
                            ${item.date ? `<span>${item.date}</span>` : ''}
                        </div>
                    </div>
                </a>
            `;
        }).join('');

        searchResults.innerHTML = resultsHTML;
    }

    // Get type icon
    function getTypeIcon(type) {
        const icons = {
            article: '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>',
            podcast: '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>',
            tool: '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>'
        };
        return icons[type] || '';
    }

    // Get type name
    function getTypeName(type) {
        const names = {
            article: 'مقاله',
            podcast: 'پادکست',
            tool: 'ابزار'
        };
        return names[type] || '';
    }

    // Event Listeners
    if (searchBtn) {
        searchBtn.addEventListener('click', openSearch);
    }

    if (headerSearchBtn) {
        headerSearchBtn.addEventListener('click', () => {
            const query = headerSearchInput.value;
            if (query.trim()) {
                openSearch();
                searchInput.value = query;
                performSearch(query);
            } else {
                openSearch();
            }
        });
    }

    if (headerSearchInput) {
        // Open modal on click/focus
        headerSearchInput.addEventListener('click', () => {
            const query = headerSearchInput.value;
            openSearch();
            if (query) {
                searchInput.value = query;
                performSearch(query);
            }
        });

        headerSearchInput.addEventListener('focus', () => {
            const query = headerSearchInput.value;
            openSearch();
            if (query) {
                searchInput.value = query;
                performSearch(query);
            }
        });

        headerSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = headerSearchInput.value;
                openSearch();
                searchInput.value = query;
                performSearch(query);
            }
        });
    }

    if (searchCloseBtn) {
        searchCloseBtn.addEventListener('click', closeSearch);
    }

    if (searchOverlay) {
        searchOverlay.addEventListener('click', closeSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            performSearch(e.target.value);
        });
    }

    // Tag click handlers
    searchTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.preventDefault();
            const tagName = tag.getAttribute('data-tag');
            searchInput.value = tagName;
            performSearch(tagName);
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Open search with Ctrl/Cmd + K
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            openSearch();
        }

        // Close search with Escape
        if (e.key === 'Escape' && searchModal.classList.contains('active')) {
            closeSearch();
        }
    });

})();

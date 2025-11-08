
// Article Page JavaScript - Updated for new structure

let currentArticle = null;
let isLiked = false;
let isBookmarked = false;

// Initialize article page
document.addEventListener('DOMContentLoaded', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    
    if (articleId) {
        await loadArticle(articleId);
        setupArticleFeatures();
        generateTableOfContents();
        loadRelatedArticles();
        loadComments(articleId);
    } else {
        // Redirect to home if no article ID
        window.location.href = '/';
    }
});

// Load article content from HTML files
async function loadArticle(articleId) {
    try {
        showLoadingState();
        
        // Load article HTML file
        const articlePath = `/data/articles/article-${articleId}.html`;
        const response = await fetch(articlePath);
        
        if (!response.ok) {
            throw new Error('Article not found');
        }
        
        const htmlContent = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        
        // Extract article data from HTML attributes
        const articleElement = doc.querySelector('article[data-id]');
        if (!articleElement) {
            throw new Error('Invalid article format');
        }
        
        // Extract content from the new structure
        const contentElement = doc.querySelector('.article-body-content') || doc.querySelector('.article-body');
        if (!contentElement) {
            throw new Error('Article content not found');
        }
        
        const article = {
            id: articleElement.getAttribute('data-id'),
            title: doc.querySelector('h1').textContent,
            category: articleElement.getAttribute('data-category'),
            author: articleElement.getAttribute('data-author'),
            date: articleElement.getAttribute('data-date'),
            readingTime: parseInt(articleElement.getAttribute('data-reading-time')) || 5,
            excerpt: articleElement.getAttribute('data-excerpt'),
            tags: (articleElement.getAttribute('data-tags') || '').split(',').map(t => t.trim()).filter(t => t),
            featured: articleElement.getAttribute('data-featured') === 'true',
            content: contentElement.innerHTML,
            featuredImage: doc.querySelector('.article-image')?.src || doc.querySelector('.article-image')?.getAttribute('src') || '../assets/images/war.png',
            views: parseInt(localStorage.getItem(`article_${articleId}_views`)) || 0,
            likes: parseInt(localStorage.getItem(`article_${articleId}_likes`)) || 0,
            comments: parseInt(localStorage.getItem(`article_${articleId}_comments`)) || 0
        };
        
        currentArticle = article;
        populateArticleContent(article);
        updatePageMeta(article);
        incrementViews(articleId);
        
    } catch (error) {
        console.error('Error loading article:', error);
        showNotFoundError();
    }
}

// Populate article content
function populateArticleContent(article) {
    // Set featured image
    const featuredImage = document.getElementById('article-image');
    if (featuredImage && article.featuredImage) {
        if (article.featuredImage.startsWith('http') || article.featuredImage.startsWith('/') || article.featuredImage.startsWith('.')) {
            // It's an image URL - set as background
            featuredImage.style.backgroundImage = `url('${article.featuredImage}')`;
            featuredImage.style.backgroundSize = 'cover';
            featuredImage.style.backgroundPosition = 'center';
            featuredImage.style.backgroundRepeat = 'no-repeat';
        } else {
            // It's a gradient
            featuredImage.style.background = article.featuredImage;
        }
    }
    
    // Set basic info - with null checks
    const categoryEl = document.getElementById('article-category');
    if (categoryEl) categoryEl.textContent = article.category;
    
    const badgeEl = document.getElementById('category-badge');
    if (badgeEl) badgeEl.textContent = article.category;
    
    const titleEl = document.getElementById('main-title');
    if (titleEl) titleEl.textContent = article.title;
    
    const excerptEl = document.getElementById('article-excerpt');
    if (excerptEl) excerptEl.textContent = article.excerpt;
    
    const dateEl = document.getElementById('article-date');
    if (dateEl) dateEl.textContent = article.date;
    
    const viewsEl = document.getElementById('article-views');
    if (viewsEl) viewsEl.textContent = article.views || '0';
    
    const readingTimeEl = document.getElementById('reading-time');
    if (readingTimeEl) readingTimeEl.textContent = `${article.readingTime || 5} دقیقه`;
    
    // Set hero info
    const titleHeroEl = document.getElementById('article-title-hero');
    if (titleHeroEl) titleHeroEl.textContent = article.title;
    
    const dateHeroEl = document.getElementById('article-date-hero');
    if (dateHeroEl) dateHeroEl.textContent = article.date;
    
    const readingTimeHeroEl = document.getElementById('reading-time-hero');
    if (readingTimeHeroEl) readingTimeHeroEl.textContent = article.readingTime || 5;
    
    // Set content
    const contentContainer = document.getElementById('article-content');
    if (contentContainer) {
        contentContainer.innerHTML = article.content;
    }
    
    // Set tags
    if (article.tags && article.tags.length > 0) {
        const tagsContainer = document.getElementById('article-tags');
        if (tagsContainer) {
            tagsContainer.innerHTML = article.tags
                .map(tag => `<a href="/?search=${encodeURIComponent(tag.trim())}" class="tag">#${tag.trim()}</a>`)
                .join('');
        }
    }
    
    hideLoadingState();
}

// Update page meta information
function updatePageMeta(article) {
    document.title = `${article.title} - ابزارستان`;
    document.getElementById('article-title').textContent = article.title;
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.setAttribute('content', article.excerpt);
    }
}

// Generate table of contents
function generateTableOfContents() {
    const headings = document.querySelectorAll('#article-content h2, #article-content h3');
    const tocContainer = document.getElementById('table-of-contents');
    
    if (!tocContainer) {
        console.warn('Table of contents container not found');
        return;
    }
    
    if (headings.length > 0) {
        tocContainer.innerHTML = '';
        
        headings.forEach((heading, index) => {
            if (!heading.id) {
                heading.id = `heading-${index}`;
            }
            
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `#${heading.id}`;
            a.textContent = heading.textContent;
            a.className = heading.tagName.toLowerCase() === 'h3' ? 'sub-heading' : '';
            
            li.appendChild(a);
            tocContainer.appendChild(li);
        });
        
        // Add smooth scrolling and active state
        setupTocScrolling();
    }
}

// Setup table of contents scrolling
function setupTocScrolling() {
    const tocLinks = document.querySelectorAll('#table-of-contents a');
    
    // Add click handlers
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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
    
    // Add scroll spy
    window.addEventListener('scroll', function() {
        const headings = document.querySelectorAll('#article-content h2, #article-content h3');
        let currentHeading = null;
        
        headings.forEach(heading => {
            const rect = heading.getBoundingClientRect();
            if (rect.top <= 100) {
                currentHeading = heading;
            }
        });
        
        // Update active TOC link
        tocLinks.forEach(link => link.classList.remove('active'));
        if (currentHeading) {
            const activeLink = document.querySelector(`#table-of-contents a[href="#${currentHeading.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// Setup article features
function setupArticleFeatures() {
    const articleId = new URLSearchParams(window.location.search).get('id');
    
    const likeBtnInit = document.querySelector('.like-btn');
    if (localStorage.getItem(`liked_${articleId}`) === 'true') {
        isLiked = true;
        if (likeBtnInit) likeBtnInit.classList.add('active');
    }
    
    const bookmarkBtnInit = document.querySelector('.bookmark-btn');
    if (localStorage.getItem(`bookmarked_${articleId}`) === 'true') {
        isBookmarked = true;
        if (bookmarkBtnInit) bookmarkBtnInit.classList.add('active');
    }
    
    // Set initial like count
    const likeCount = localStorage.getItem(`article_${articleId}_likes`) || '0';
    const likeCountEl = document.getElementById('like-count');
    if (likeCountEl) {
        likeCountEl.textContent = likeCount;
    }
}

// Toggle like
async function toggleLike() {
    const articleId = new URLSearchParams(window.location.search).get('id');
    const likeBtn = document.querySelector('.like-btn');
    const likeCountElement = document.getElementById('like-count');
    
    isLiked = !isLiked;
    
    if (isLiked) {
        if (likeBtn) likeBtn.classList.add('active');
        const currentCount = (likeCountElement ? parseInt(likeCountElement.textContent) : parseInt(localStorage.getItem(`article_${articleId}_likes`))) || 0;
        const newCount = currentCount + 1;
        if (likeCountElement) likeCountElement.textContent = newCount;
        localStorage.setItem(`liked_${articleId}`, 'true');
        localStorage.setItem(`article_${articleId}_likes`, newCount.toString());
        
        showToast('مقاله پسندیده شد!', 'success');
    } else {
        if (likeBtn) likeBtn.classList.remove('active');
        const currentCountCalc = (likeCountElement ? parseInt(likeCountElement.textContent) : parseInt(localStorage.getItem(`article_${articleId}_likes`))) || 0;
        const currentCount = Math.max(0, currentCountCalc - 1);
        if (likeCountElement) likeCountElement.textContent = currentCount;
        localStorage.setItem(`liked_${articleId}`, 'false');
        localStorage.setItem(`article_${articleId}_likes`, currentCount.toString());
        
        showToast('پسند برداشته شد', 'info');
    }
}

// Toggle bookmark
async function toggleBookmark() {
    const articleId = new URLSearchParams(window.location.search).get('id');
    const bookmarkBtn = document.querySelector('.bookmark-btn');
    
    isBookmarked = !isBookmarked;
    
    if (isBookmarked) {
        if (bookmarkBtn) bookmarkBtn.classList.add('active');
        localStorage.setItem(`bookmarked_${articleId}`, 'true');
        
        // Save to bookmarks list
        const bookmarks = JSON.parse(localStorage.getItem('bookmarked_articles') || '[]');
        if (!bookmarks.includes(articleId)) {
            bookmarks.push(articleId);
            localStorage.setItem('bookmarked_articles', JSON.stringify(bookmarks));
        }
        
        showToast('مقاله ذخیره شد!', 'success');
    } else {
        if (bookmarkBtn) bookmarkBtn.classList.remove('active');
        localStorage.setItem(`bookmarked_${articleId}`, 'false');
        
        // Remove from bookmarks list
        const bookmarks = JSON.parse(localStorage.getItem('bookmarked_articles') || '[]');
        const updatedBookmarks = bookmarks.filter(id => id !== articleId);
        localStorage.setItem('bookmarked_articles', JSON.stringify(updatedBookmarks));
        
        showToast('ذخیره برداشته شد', 'info');
    }
}

// Share functions
function shareOnTelegram() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(currentArticle ? currentArticle.title : 'مقاله جالب');
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(currentArticle ? currentArticle.title : 'مقاله جالب');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
}

function shareOnWhatsApp() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(currentArticle ? currentArticle.title : 'مقاله جالب');
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        if (window.toast) {
            window.toast.success('لینک مقاله با موفقیت کپی شد!');
        } else {
            showToast('لینک کپی شد!', 'success');
        }
    }).catch(() => {
        if (window.toast) {
            window.toast.error('خطا در کپی کردن لینک');
        } else {
            showToast('خطا در کپی لینک', 'error');
        }
    });
}

// Load related articles
async function loadRelatedArticles() {
    console.log('🔍 Loading related articles...');
    console.log('Current article:', currentArticle);
    
    if (!currentArticle) {
        console.error('❌ No current article found');
        return;
    }
    
    const relatedContainer = document.getElementById('related-articles');
    if (!relatedContainer) {
        console.error('❌ Related articles container not found');
        return;
    }
    
    try {
        // Get all available articles
        const allArticles = await getAllArticles();
        console.log('📚 All articles:', allArticles);
        
        // Find related articles based on shared tags
        const relatedArticles = findRelatedArticles(currentArticle, allArticles);
        console.log('🔗 Related articles found:', relatedArticles);
        
        // Display up to 9 related articles
        displayRelatedArticles(relatedArticles.slice(0, 9));
        
    } catch (error) {
        console.error('Error loading related articles:', error);
    }
}

// Get all articles from the system
async function getAllArticles() {
    const articles = [];
    
    // Article 1: AI
    try {
        const response1 = await fetch('/data/articles/article-1.html');
        if (response1.ok) {
            const html1 = await response1.text();
            const parser = new DOMParser();
            const doc1 = parser.parseFromString(html1, 'text/html');
            const articleEl1 = doc1.querySelector('article');
            if (articleEl1) {
                articles.push({
                    id: '1',
                    title: articleEl1.querySelector('h1')?.textContent || 'کنترل به جای نوآوری؛ روایت توسعه نامتوازن هوش مصنوعی در ایران',
                    tags: (articleEl1.dataset.tags || '').split(',').map(t => t.trim()),
                    category: articleEl1.dataset.category || 'تکنولوژی'
                });
            }
        }
    } catch (e) {
        articles.push({
            id: '1',
            title: 'کنترل به جای نوآوری؛ روایت توسعه نامتوازن هوش مصنوعی در ایران',
            tags: ['هوش مصنوعی', 'سیاست', 'اینترنت'],
            category: 'تکنولوژی'
        });
    }
    
    // Article 2: War
    articles.push({
        id: '2',
        title: 'میراث جنگ ۱۲ روزه: غلبه نگاه امنیتی بر اکوسیستم دیجیتال',
        tags: ['جنگ', 'امنیت', 'اینترنت', 'فیلترینگ', 'سیاست'],
        category: 'امنیت'
    });
    
    // Article 3: SMS
    try {
        const response3 = await fetch('/data/articles/article-3.html');
        if (response3.ok) {
            const html3 = await response3.text();
            const parser = new DOMParser();
            const doc3 = parser.parseFromString(html3, 'text/html');
            const articleEl3 = doc3.querySelector('article');
            if (articleEl3) {
                articles.push({
                    id: '3',
                    title: articleEl3.querySelector('h1')?.textContent || 'از اینترنت تا پیامک؛ گسترش سانسور به آخرین کانال ارتباطی',
                    tags: (articleEl3.dataset.tags || '').split(',').map(t => t.trim()),
                    category: articleEl3.dataset.category || 'سانسور'
                });
            }
        }
    } catch (e) {
        articles.push({
            id: '3',
            title: 'از اینترنت تا پیامک؛ گسترش سانسور به آخرین کانال ارتباطی',
            tags: ['سانسور', 'پیامک', 'فیلترینگ', 'اینترنت'],
            category: 'سانسور'
        });
    }
    
    // Article 4: Crypto
    articles.push({
        id: '4',
        title: 'رمز‌ارز جدیدترین ابزار جمهوری اسلامی برای تاب‌آوری در مقابل تحریم‌ها؛ اعمال فشار و محدودیت برای جلوگیری از دور زدن تحریم‌ها',
        tags: ['رمز‌ارز', 'سیاستگذاری', 'اینترنت', 'فیلترینگ'],
        category: 'شبکه و سیاستگذاری'
    });
    
    return articles;
}

// Find related articles based on shared tags
function findRelatedArticles(currentArticle, allArticles) {
    const maxArticles = 9;
    
    if (!currentArticle.tags || currentArticle.tags.length === 0) {
        // If no tags, return shuffled articles
        const otherArticles = allArticles.filter(article => article.id !== currentArticle.id);
        return shuffleArray(otherArticles).slice(0, maxArticles);
    }
    
    const currentTags = currentArticle.tags.map(tag => tag.toLowerCase().trim());
    
    // Calculate relevance score for each article
    const allOtherArticles = allArticles.filter(article => article.id !== currentArticle.id);
    
    const scoredArticles = allOtherArticles
        .map(article => {
            const articleTags = (article.tags || []).map(tag => tag.toLowerCase().trim());
            
            // Count shared tags
            const sharedTags = currentTags.filter(tag => articleTags.includes(tag));
            const score = sharedTags.length;
            
            return {
                ...article,
                score: score,
                sharedTags: sharedTags
            };
        })
        .sort((a, b) => b.score - a.score); // Sort by relevance (most shared tags first)
    
    // Get articles with shared tags
    const relatedWithTags = scoredArticles.filter(article => article.score > 0);
    
    // If we have enough related articles, return them
    if (relatedWithTags.length >= maxArticles) {
        return relatedWithTags.slice(0, maxArticles);
    }
    
    // If we need more articles, add random ones from the rest
    const articlesWithoutTags = scoredArticles.filter(article => article.score === 0);
    const shuffledOthers = shuffleArray(articlesWithoutTags);
    const needed = maxArticles - relatedWithTags.length;
    
    return [...relatedWithTags, ...shuffledOthers.slice(0, needed)];
}

// Shuffle array helper function
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Display related articles
function displayRelatedArticles(articles) {
    console.log('📝 Displaying related articles:', articles);
    const container = document.getElementById('related-articles');
    
    if (!container) {
        console.error('❌ Related articles container not found!');
        return;
    }
    
    console.log('✅ Container found:', container);
    
    if (articles.length === 0) {
        console.warn('⚠️ No related articles to display');
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 1rem;">مقاله مرتبطی یافت نشد</p>';
        return;
    }
    
    const html = articles.map((article, index) => `
        <a href="/pages/article.html?id=${article.id}" class="related-item">
            <div class="related-item-number">${index + 1}</div>
            <div class="related-item-content">
                <div class="related-item-title">${article.title}</div>
            </div>
        </a>
    `).join('');
    
    console.log('🎨 Generated HTML:', html.substring(0, 200) + '...');
    container.innerHTML = html;
    console.log('✅ Related articles displayed successfully');
}

// Load comments
async function loadComments(articleId) {
    const commentsContainer = document.getElementById('comments-list');
    
    try {
        // Load comments from localStorage
        const commentsKey = `article_${articleId}_comments_list`;
        const comments = JSON.parse(localStorage.getItem(commentsKey) || '[]');
        
        // Add some sample comments if none exist
        if (comments.length === 0) {
            const sampleComments = [
                {
                    id: 1,
                    author: 'علی احمدی',
                    text: 'مقاله بسیار جامع و مفیدی بود. متشکرم از نویسنده.',
                    date: '۱۶ مهر ۱۴۰۳',
                    timestamp: new Date().toISOString()
                },
                {
                    id: 2,
                    author: 'مریم حسینی',
                    text: 'نکات مطرح شده در این مقاله قابل تأمل است و باید بیشتر به این موضوعات توجه کرد.',
                    date: '۱۶ مهر ۱۴۰۳',
                    timestamp: new Date().toISOString()
                }
            ];
            localStorage.setItem(commentsKey, JSON.stringify(sampleComments));
            displayComments(sampleComments);
        } else {
            displayComments(comments);
        }
        
    } catch (error) {
        console.error('Error loading comments:', error);
    }
}

// Display comments
function displayComments(comments) {
    const container = document.getElementById('comments-list');
    if (!container) {
        return;
    }
    
    if (comments.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted); text-align: center;">هنوز نظری ثبت نشده است.</p>';
        return;
    }
    
    container.innerHTML = comments.map(comment => `
        <div class="comment">
            <div class="comment-author">${comment.author}</div>
            <div class="comment-text">${comment.text}</div>
            <div class="comment-date">${comment.date}</div>
        </div>
    `).join('');
}

// Submit comment
async function submitComment() {
    const commentInput = document.getElementById('comment-text');
    if (!commentInput) {
        return;
    }
    const commentText = commentInput.value.trim();
    const articleId = new URLSearchParams(window.location.search).get('id');
    
    if (!commentText) {
        showToast('لطفاً نظر خود را بنویسید', 'error');
        return;
    }
    
    try {
        const commentsKey = `article_${articleId}_comments_list`;
        const comments = JSON.parse(localStorage.getItem(commentsKey) || '[]');
        
        const newComment = {
            id: Date.now(),
            author: 'کاربر مهمان',
            text: commentText,
            date: new Intl.DateTimeFormat('fa-IR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(new Date()),
            timestamp: new Date().toISOString()
        };
        
        comments.unshift(newComment);
        localStorage.setItem(commentsKey, JSON.stringify(comments));
        
        // Update comment count
        const currentCount = parseInt(localStorage.getItem(`article_${articleId}_comments`)) || 0;
        localStorage.setItem(`article_${articleId}_comments`, (currentCount + 1).toString());
        
        showToast('نظر شما ثبت شد', 'success');
        commentInput.value = '';
        displayComments(comments);
        
    } catch (error) {
        console.error('Error submitting comment:', error);
        showToast('خطا در ثبت نظر', 'error');
    }
}

// Increment article views
async function incrementViews(articleId) {
    try {
        const viewsKey = `article_${articleId}_views`;
        const currentViews = parseInt(localStorage.getItem(viewsKey)) || 0;
        localStorage.setItem(viewsKey, (currentViews + 1).toString());
        const viewsEl = document.getElementById('article-views');
        if (viewsEl) {
            viewsEl.textContent = currentViews + 1;
        }
    } catch (error) {
        console.warn('Could not increment views:', error);
    }
}

// Utility functions
function showLoadingState() {
    const loadingEl = document.querySelector('.content-loading');
    if (loadingEl) {
        loadingEl.style.display = 'block';
    }
}

function hideLoadingState() {
    const loadingEl = document.querySelector('.content-loading');
    if (loadingEl) {
        loadingEl.style.display = 'none';
    }
}

function showError(message) {
    const contentContainer = document.getElementById('article-content');
    if (contentContainer) {
        contentContainer.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: #888;">
                <h3>خطا در بارگذاری</h3>
                <p>${message}</p>
                <button onclick="window.location.reload()" style="background: #9D0913; color: white; border: none; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer;">تلاش مجدد</button>
            </div>
        `;
    }
}

function showNotFoundError() {
    const contentContainer = document.getElementById('article-content');
    if (contentContainer) {
        contentContainer.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: #888;">
                <h3>مقاله یافت نشد</h3>
                <p>متأسفانه مقاله مورد نظر پیدا نشد.</p>
                <a href="../index.html" style="background: #9D0913; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; text-decoration: none; display: inline-block; margin-top: 1rem;">بازگشت به خانه</a>
            </div>
        `;
    }
    hideLoadingState();
}

// Toast notification function
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    // Add styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--card-bg);
        color: var(--text-primary);
        padding: 1rem;
        border-radius: var(--radius-md);
        border: 1px solid var(--border-color);
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: var(--shadow-lg);
    `;
    
    // Add type-specific styling
    if (type === 'success') {
        toast.style.borderLeft = '4px solid #27ae60';
    } else if (type === 'error') {
        toast.style.borderLeft = '4px solid var(--primary-color)';
    } else if (type === 'info') {
        toast.style.borderLeft = '4px solid var(--secondary-color)';
    }
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Make functions globally available
window.toggleLike = toggleLike;
window.toggleBookmark = toggleBookmark;
window.shareOnTelegram = shareOnTelegram;
window.shareOnTwitter = shareOnTwitter;
window.shareOnWhatsApp = shareOnWhatsApp;
window.shareOnLinkedIn = shareOnLinkedIn;
window.copyLink = copyLink;
window.submitComment = submitComment;

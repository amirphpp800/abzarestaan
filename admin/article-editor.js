// Initialize editor
let currentArticleId = null;
let coverImageData = null;

document.addEventListener('DOMContentLoaded', () => {
    // Check if editing existing article
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    
    if (articleId) {
        loadArticleForEdit(articleId);
    }

    // Setup event listeners
    setupEventListeners();
    
    // Auto-update preview
    setInterval(updatePreview, 1000);
});

function setupEventListeners() {
    // Title to slug conversion
    document.getElementById('articleTitle').addEventListener('input', (e) => {
        const slug = generateSlug(e.target.value);
        document.getElementById('articleSlug').value = slug;
    });

    // Cover upload
    document.getElementById('coverUpload').addEventListener('change', handleCoverUpload);

    // Cover tabs
    document.querySelectorAll('.cover-tab').forEach(tab => {
        tab.addEventListener('click', () => switchCoverTab(tab.dataset.tab));
    });

    // Editor content change
    document.getElementById('articleEditor').addEventListener('input', updatePreview);
}

function generateSlug(text) {
    const persianToEnglish = {
        'ا': 'a', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ث': 's', 'ج': 'j', 'چ': 'ch',
        'ح': 'h', 'خ': 'kh', 'د': 'd', 'ذ': 'z', 'ر': 'r', 'ز': 'z', 'ژ': 'zh',
        'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't', 'ظ': 'z', 'ع': 'a',
        'غ': 'gh', 'ف': 'f', 'ق': 'gh', 'ک': 'k', 'گ': 'g', 'ل': 'l', 'م': 'm',
        'ن': 'n', 'و': 'v', 'ه': 'h', 'ی': 'y', ' ': '-'
    };

    return text
        .toLowerCase()
        .split('')
        .map(char => persianToEnglish[char] || char)
        .join('')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

function switchCoverTab(tab) {
    document.querySelectorAll('.cover-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.cover-panel').forEach(p => p.classList.remove('active'));
    
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    document.getElementById(`${tab}-panel`).classList.add('active');
}

function handleCoverUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        coverImageData = event.target.result;
        displayCoverPreview(coverImageData);
    };
    reader.readAsDataURL(file);
}

function loadCoverFromUrl() {
    const url = document.getElementById('coverUrl').value;
    if (!url) return;

    coverImageData = url;
    displayCoverPreview(url);
}

function displayCoverPreview(src) {
    const preview = document.getElementById('coverPreview');
    preview.innerHTML = `<img src="${src}" alt="Cover">`;
}

// Text formatting functions
function formatText(command) {
    document.execCommand(command, false, null);
    document.getElementById('articleEditor').focus();
}

function insertHeading(level) {
    document.execCommand('formatBlock', false, level);
    document.getElementById('articleEditor').focus();
}

function insertList(type) {
    const command = type === 'ul' ? 'insertUnorderedList' : 'insertOrderedList';
    document.execCommand(command, false, null);
    document.getElementById('articleEditor').focus();
}

function insertLink() {
    const url = prompt('لینک را وارد کنید:');
    if (url) {
        document.execCommand('createLink', false, url);
    }
    document.getElementById('articleEditor').focus();
}

function insertImage() {
    const url = prompt('آدرس تصویر را وارد کنید:');
    if (url) {
        document.execCommand('insertImage', false, url);
    }
    document.getElementById('articleEditor').focus();
}

function insertCode() {
    const code = prompt('کد را وارد کنید:');
    if (code) {
        const pre = document.createElement('pre');
        const codeEl = document.createElement('code');
        codeEl.textContent = code;
        pre.appendChild(codeEl);
        
        const selection = window.getSelection();
        if (selection.rangeCount) {
            const range = selection.getRangeAt(0);
            range.deleteContents();
            range.insertNode(pre);
        }
    }
    document.getElementById('articleEditor').focus();
}

function insertQuote() {
    document.execCommand('formatBlock', false, 'blockquote');
    document.getElementById('articleEditor').focus();
}

function insertDivider() {
    document.execCommand('insertHorizontalRule', false, null);
    document.getElementById('articleEditor').focus();
}

// Preview functions
function togglePreview() {
    const panel = document.getElementById('previewPanel');
    panel.classList.toggle('active');
    updatePreview();
}

function updatePreview() {
    const title = document.getElementById('articleTitle').value || 'عنوان مقاله';
    const author = document.getElementById('articleAuthor').value || 'نویسنده';
    const content = document.getElementById('articleEditor').innerHTML;

    document.getElementById('previewTitle').textContent = title;
    document.getElementById('previewAuthor').textContent = author;
    document.getElementById('previewDate').textContent = new Date().toLocaleDateString('fa-IR');
    document.getElementById('previewBody').innerHTML = content;

    if (coverImageData) {
        const coverImg = document.getElementById('previewCover');
        coverImg.src = coverImageData;
        coverImg.style.display = 'block';
    }
}

// Save article
async function saveArticleForm(status) {
    const title = document.getElementById('articleTitle').value;
    const slug = document.getElementById('articleSlug').value;
    const category = document.getElementById('articleCategory').value;
    const author = document.getElementById('articleAuthor').value;
    const excerpt = document.getElementById('articleExcerpt').value;
    const tags = document.getElementById('articleTags').value;
    const content = document.getElementById('articleEditor').innerHTML;

    if (!title || !category || !content) {
        alert('لطفاً فیلدهای ضروری را پر کنید');
        return;
    }

    const articleId = currentArticleId || generateId();
    const article = {
        id: articleId,
        title,
        slug: slug || generateSlug(title),
        category,
        author,
        excerpt,
        tags: tags.split(',').map(t => t.trim()).filter(t => t),
        content,
        coverImage: coverImageData,
        status,
        date: new Date().toISOString(),
        lastModified: new Date().toISOString()
    };

    // Save using KV storage
    await saveArticle(article);

    // If published, create HTML file and save to backup
    if (status === 'published') {
        const htmlContent = generateArticleHTML(article);
        saveHTMLFile(article, htmlContent);
        
        // Save to backup
        saveToBackup(article, htmlContent);
    }

    alert(status === 'published' ? 'مقاله با موفقیت منتشر شد!' : 'پیش‌نویس ذخیره شد!');
    window.location.href = 'articles.html';
}

// Generate HTML file for article
function generateArticleHTML(article) {
    const persianDate = new Date(article.date).toLocaleDateString('fa-IR');
    
    return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${article.title} - ابزارستان</title>
    <link rel="stylesheet" href="../../css/main.css">
    <link rel="stylesheet" href="../../css/article.css">
    <link rel="stylesheet" href="../../css/article-template.css">
</head>
<body class="article-template">
    <article 
        data-id="${article.id}" 
        data-category="${article.category}" 
        data-author="${article.author}" 
        data-date="${persianDate}" 
        data-reading-time="10"
        data-excerpt="${article.excerpt}"
        data-tags="${article.tags.join(',')}"
        data-featured="false">
        
        <header class="article-meta" data-category="${article.category}">
            <img class="article-image" src="${article.coverImage || '../../assets/images/default-cover.png'}" alt="${article.title}">
            <h1>${article.title}</h1>
        </header>

        <div class="article-meta-info">
            <div class="article-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span><strong>تاریخ:</strong> ${persianDate}</span>
            </div>
            <div class="article-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span><strong>نویسنده:</strong> ${article.author}</span>
            </div>
            <div class="article-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span><strong>زمان مطالعه:</strong> 10 دقیقه</span>
            </div>
        </div>

        <main class="article-body">
            ${article.content}
        </main>
    </article>
</body>
</html>`;
}

// Save HTML file (download)
function saveHTMLFile(article, htmlContent) {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `article-${article.id}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Save to backup (localStorage)
function saveToBackup(article, htmlContent) {
    const backups = JSON.parse(localStorage.getItem('articleBackups') || '[]');
    
    backups.push({
        id: article.id,
        title: article.title,
        htmlContent: htmlContent,
        timestamp: new Date().toISOString()
    });
    
    // Keep only last 50 backups
    if (backups.length > 50) {
        backups.shift();
    }
    
    localStorage.setItem('articleBackups', JSON.stringify(backups));
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Load article for editing
function loadArticleForEdit(id) {
    const articles = JSON.parse(localStorage.getItem('articles') || '[]');
    const article = articles.find(a => a.id === id);

    if (!article) {
        alert('مقاله یافت نشد!');
        window.location.href = 'articles.html';
        return;
    }

    currentArticleId = id;
    document.getElementById('pageTitle').textContent = 'ویرایش مقاله';
    
    document.getElementById('articleTitle').value = article.title;
    document.getElementById('articleSlug').value = article.slug;
    document.getElementById('articleCategory').value = article.category;
    document.getElementById('articleAuthor').value = article.author;
    document.getElementById('articleExcerpt').value = article.excerpt;
    document.getElementById('articleTags').value = article.tags.join(', ');
    document.getElementById('articleEditor').innerHTML = article.content;

    if (article.coverImage) {
        coverImageData = article.coverImage;
        displayCoverPreview(article.coverImage);
    }
}

// Load template
function loadTemplate() {
    window.location.href = 'templates.html';
}

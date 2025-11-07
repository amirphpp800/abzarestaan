// Auto Articles Loader - Automatically discover and load articles from data/articles folder
// این فایل به صورت خودکار مقالات را از پوشه data/articles پیدا و لود می‌کند

// لیست شناخته شده مقالات (می‌توانید به صورت دستی اضافه کنید یا خودکار باشد)
const KNOWN_ARTICLES = [
    { id: 1, filename: 'article-1.html' },
    { id: 2, filename: 'article-2.html' },
    { id: 3, filename: 'article-3.html' },
    { id: 4, filename: 'article-4.html' },
    { id: 5, filename: 'article-5.html' }
];

// تابع برای استخراج metadata از فایل HTML مقاله
async function extractArticleMetadata(articleId, filename) {
    try {
        const response = await fetch(`/data/articles/${filename}`);
        if (!response.ok) return null;
        
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const articleEl = doc.querySelector('article');
        
        if (!articleEl) return null;
        
        // استخراج اطلاعات از data attributes یا محتوای HTML
        const title = articleEl.querySelector('h1')?.textContent || 
                     doc.querySelector('title')?.textContent || 
                     'بدون عنوان';
        
        const metaDesc = doc.querySelector('meta[name="description"]')?.content || '';
        const excerpt = metaDesc || articleEl.querySelector('p')?.textContent?.substring(0, 150) + '...' || '';
        
        // استخراج تاریخ از data attribute یا محتوا
        const date = articleEl.dataset.date || '۱۴۰۴';
        const readingTime = articleEl.dataset.readingTime || '10';
        const category = articleEl.dataset.category || 'عمومی';
        const tags = articleEl.dataset.tags ? articleEl.dataset.tags.split(',').map(t => t.trim()) : [];
        
        // استخراج مسیر عکس
        const imgEl = articleEl.querySelector('img') || doc.querySelector('img');
        let image = '../assets/images/default.png';
        if (imgEl) {
            const src = imgEl.getAttribute('src');
            // تبدیل مسیر نسبی به مسیر مطلق
            if (src.startsWith('../../')) {
                image = src.replace('../../', '../');
            } else {
                image = src;
            }
        }
        
        return {
            id: articleId,
            title: title.trim(),
            excerpt: excerpt.trim(),
            category: category,
            date: date,
            readingTime: readingTime,
            image: image,
            tags: tags,
            filename: filename
        };
    } catch (error) {
        console.error(`Error loading article ${filename}:`, error);
        return null;
    }
}

// تابع برای لود تمام مقالات به صورت خودکار
async function loadAllArticlesAuto() {
    const articles = [];
    
    for (const article of KNOWN_ARTICLES) {
        const metadata = await extractArticleMetadata(article.id, article.filename);
        if (metadata) {
            articles.push(metadata);
        }
    }
    
    return articles;
}

// Export برای استفاده در فایل‌های دیگر
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadAllArticlesAuto, extractArticleMetadata };
}

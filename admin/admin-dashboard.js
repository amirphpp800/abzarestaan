// Load dashboard data
function loadDashboardData() {
    // Load articles from localStorage
    const articles = JSON.parse(localStorage.getItem('articles') || '[]');
    const images = JSON.parse(localStorage.getItem('uploadedImages') || '[]');

    // Calculate stats
    const totalArticles = articles.length;
    const publishedArticles = articles.filter(a => a.status === 'published').length;
    const draftArticles = articles.filter(a => a.status === 'draft').length;
    const totalImages = images.length;

    // Update stats
    document.getElementById('totalArticles').textContent = totalArticles;
    document.getElementById('publishedArticles').textContent = publishedArticles;
    document.getElementById('draftArticles').textContent = draftArticles;
    document.getElementById('totalImages').textContent = totalImages;

    // Load recent articles
    loadRecentArticles(articles);
}

function loadRecentArticles(articles) {
    const tbody = document.getElementById('recentArticles');
    
    if (articles.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; padding: 2rem; color: rgba(255,255,255,0.5);">
                    هنوز مقاله‌ای ثبت نشده است
                </td>
            </tr>
        `;
        return;
    }

    // Sort by date and get last 5
    const recentArticles = articles
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    tbody.innerHTML = recentArticles.map(article => `
        <tr>
            <td>
                <strong style="color: white;">${article.title}</strong>
            </td>
            <td>
                <span class="status-badge status-${article.status}">
                    ${article.status === 'published' ? 'منتشر شده' : 'پیش‌نویس'}
                </span>
            </td>
            <td>${formatDate(article.date)}</td>
            <td>
                <div style="display: flex; gap: 0.5rem;">
                    <button onclick="editArticle('${article.id}')" class="btn-icon" title="ویرایش">
                        ✏️
                    </button>
                    <button onclick="deleteArticle('${article.id}')" class="btn-icon" title="حذف">
                        🗑️
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fa-IR').format(date);
}

function editArticle(id) {
    window.location.href = `add-article.html?id=${id}`;
}

function deleteArticle(id) {
    if (confirm('آیا مطمئن هستید که می‌خواهید این مقاله را حذف کنید؟')) {
        let articles = JSON.parse(localStorage.getItem('articles') || '[]');
        articles = articles.filter(a => a.id !== id);
        localStorage.setItem('articles', JSON.stringify(articles));
        loadDashboardData();
    }
}

// Load data on page load
document.addEventListener('DOMContentLoaded', loadDashboardData);

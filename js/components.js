
// Component Classes and Functions

class ArticleCard {
    constructor(article) {
        this.article = article;
    }

    render() {
        return `
            <article class="article-card" data-id="${this.article.id}">
                <a href="/pages/article.html?id=${this.article.id}" class="article-card-link">
                    <div class="article-card-image">
                        <img src="${this.article.image || '/assets/images/default-article.png'}" alt="${this.article.title}" loading="lazy">
                        <span class="article-category-badge">${this.article.category}</span>
                    </div>
                    <div class="article-card-content">
                        <h3 class="article-card-title">${this.article.title}</h3>
                        <p class="article-card-excerpt">${this.article.excerpt}</p>
                        <div class="article-card-meta">
                            <span class="article-date">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                                ${this.article.date}
                            </span>
                            ${this.article.readingTime ? `
                            <span class="article-reading-time">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                ${this.article.readingTime} دقیقه
                            </span>
                            ` : ''}
                        </div>
                        ${this.article.tags && this.article.tags.length > 0 ? `
                        <div class="article-card-tags">
                            ${this.article.tags.slice(0, 4).map(tag => `<span class="tag">#${tag}</span>`).join('')}
                        </div>
                        ` : ''}
                    </div>
                </a>
            </article>
        `;
    }
}

class ToolCard {
    constructor(tool) {
        this.tool = tool;
    }

    render() {
        const features = this.tool.features ? this.tool.features.map(feature => 
            `<li>${feature}</li>`
        ).join('') : '';

        return `
            <div class="tool-card" data-id="${this.tool.id}">
                ${this.tool.featured ? '<div class="featured-badge">محبوب</div>' : ''}
                <div class="tool-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                        <path d="M22.7 19L13.6 9.9C14.5 7.6 14 4.9 12.1 3C10.1 1 7.1 0.6 4.7 1.7L9 6L6 9L1.6 4.7C0.4 7.1 0.9 10.1 2.9 12.1C4.8 14 7.5 14.5 9.8 13.6L18.9 22.7C19.3 23.1 19.9 23.1 20.3 22.7L22.6 20.4C23.1 20 23.1 19.3 22.7 19Z" fill="currentColor"/>
                    </svg>
                </div>
                <h3 class="tool-title">${this.tool.title}</h3>
                <p class="tool-description">${this.tool.description}</p>
                ${features ? `<ul class="tool-features">${features}</ul>` : ''}
                <div class="tool-actions">
                    <a href="#" class="tool-btn tool-btn-primary" onclick="useTool('${this.tool.id}')">
                        استفاده
                    </a>
                    <a href="#" class="tool-btn tool-btn-secondary" onclick="showToolInfo('${this.tool.id}')">
                        اطلاعات بیشتر
                    </a>
                </div>
            </div>
        `;
    }
}

class LoadingSkeleton {
    static article() {
        return `
            <div class="card-loading">
                <div class="loading-skeleton skeleton-title"></div>
                <div class="loading-skeleton skeleton-text"></div>
                <div class="loading-skeleton skeleton-text"></div>
                <div class="loading-skeleton skeleton-text"></div>
            </div>
        `;
    }

    static tool() {
        return `
            <div class="card-loading">
                <div class="loading-skeleton" style="width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 1rem;"></div>
                <div class="loading-skeleton skeleton-title"></div>
                <div class="loading-skeleton skeleton-text"></div>
                <div class="loading-skeleton skeleton-text"></div>
            </div>
        `;
    }
}

class Modal {
    constructor(id) {
        this.id = id;
        this.element = null;
        this.create();
    }

    create() {
        this.element = document.createElement('div');
        this.element.className = 'modal';
        this.element.id = this.id;
        this.element.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" onclick="closeModal('${this.id}')">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <div class="modal-body"></div>
            </div>
        `;
        document.body.appendChild(this.element);

        // Close on backdrop click
        this.element.addEventListener('click', (e) => {
            if (e.target === this.element) {
                this.close();
            }
        });
    }

    open(content) {
        const modalBody = this.element.querySelector('.modal-body');
        modalBody.innerHTML = content;
        this.element.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.element.classList.remove('active');
        document.body.style.overflow = '';
    }
}

class Toast {
    static show(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const iconMap = {
            'success': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M9 12L11 14L15 10M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>`,
            'error': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                      <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2"/>
                      <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2"/>
                      </svg>`,
            'info': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                     <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                     <line x1="12" y1="16" x2="12" y2="12" stroke="currentColor" stroke-width="2"/>
                     <line x1="12" y1="8" x2="12.01" y2="8" stroke="currentColor" stroke-width="2"/>
                     </svg>`
        };

        toast.innerHTML = `
            <div class="toast-content">
                <div class="toast-icon">${iconMap[type] || iconMap['info']}</div>
                <span class="toast-message">${message}</span>
            </div>
        `;

        document.body.appendChild(toast);

        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 100);

        // Auto remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => document.body.removeChild(toast), 300);
        }, duration);
    }
}

// Search functionality
class Search {
    constructor() {
        this.articles = [];
        this.tools = [];
    }

    setData(articles, tools) {
        this.articles = articles;
        this.tools = tools;
    }

    search(query) {
        const lowerQuery = query.toLowerCase();

        const matchedArticles = this.articles.filter(article => 
            article.title.toLowerCase().includes(lowerQuery) ||
            article.excerpt.toLowerCase().includes(lowerQuery) ||
            article.category.toLowerCase().includes(lowerQuery)
        );

        const matchedTools = this.tools.filter(tool => 
            tool.title.toLowerCase().includes(lowerQuery) ||
            tool.description.toLowerCase().includes(lowerQuery)
        );

        return {
            articles: matchedArticles,
            tools: matchedTools
        };
    }
}

// Initialize search
const searchInstance = new Search();

// Global functions for component interactions
function openArticle(articleId) {
    const modal = new Modal('article-modal');
    const article = sampleArticles.find(a => a.id === articleId);

    if (article) {
        const content = `
            <h2>${article.title}</h2>
            <div class="article-meta" style="margin-bottom: 1rem;">
                <span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="margin-right: 0.5rem;">
                        <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19ZM7 10H17V12H7V10ZM7 14H14V16H7V14Z" fill="currentColor"/>
                    </svg>
                    ${article.date}
                </span>
                <span style="margin: 0 1rem;">•</span>
                <span class="article-category">${article.category}</span>
            </div>
            <div style="line-height: 1.8; color: var(--text-secondary);">
                ${article.content || article.excerpt + '<br><br>محتوای کامل مقاله در اینجا نمایش داده می‌شود...'}
            </div>
        `;
        modal.open(content);
    }
}

function useTool(toolId) {
    const tool = sampleTools.find(t => t.id === toolId);
    if (tool) {
        Toast.show(`ابزار "${tool.title}" در حال اجرا...`, 'info');
        // Here you would implement the actual tool functionality
        setTimeout(() => {
            Toast.show(`ابزار "${tool.title}" با موفقیت اجرا شد!`, 'success');
        }, 2000);
    }
}

function showToolInfo(toolId) {
    const modal = new Modal('tool-modal');
    const tool = sampleTools.find(t => t.id === toolId);

    if (tool) {
        const features = tool.features ? tool.features.map(f => `<li>${f}</li>`).join('') : '';
        const content = `
            <div style="text-align: center; margin-bottom: 1rem;">
                <div class="tool-icon" style="margin: 0 auto;">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                        <path d="M22.7 19L13.6 9.9C14.5 7.6 14 4.9 12.1 3C10.1 1 7.1 0.6 4.7 1.7L9 6L6 9L1.6 4.7C0.4 7.1 0.9 10.1 2.9 12.1C4.8 14 7.5 14.5 9.8 13.6L18.9 22.7C19.3 23.1 19.9 23.1 20.3 22.7L22.6 20.4C23.1 20 23.1 19.3 22.7 19Z" fill="currentColor"/>
                    </svg>
                </div>
            </div>
            <h2>${tool.title}</h2>
            <p style="color: var(--text-secondary); margin-bottom: 1rem;">${tool.description}</p>
            ${features ? `<h4>ویژگی‌ها:</h4><ul style="color: var(--text-secondary);">${features}</ul>` : ''}
            <div style="margin-top: 1.5rem; text-align: center;">
                <button class="btn btn-primary" onclick="useTool('${tool.id}'); closeModal('tool-modal');">
                    استفاده از ابزار
                </button>
            </div>
        `;
        modal.open(content);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ArticleCard,
        ToolCard,
        LoadingSkeleton,
        Modal,
        Toast,
        Search
    };
}

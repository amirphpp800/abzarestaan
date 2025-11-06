// KV Storage System for better performance and accessibility
class KVStorage {
    constructor(namespace = 'abzarestan') {
        this.namespace = namespace;
        this.cache = new Map();
        this.initIndexedDB();
    }

    // Initialize IndexedDB for persistent storage
    async initIndexedDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(`${this.namespace}_db`, 1);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('kv_store')) {
                    db.createObjectStore('kv_store', { keyPath: 'key' });
                }
            };
        });
    }

    // Set value with caching
    async set(key, value) {
        const fullKey = `${this.namespace}:${key}`;
        
        // Update cache
        this.cache.set(fullKey, value);
        
        // Update localStorage
        try {
            localStorage.setItem(fullKey, JSON.stringify(value));
        } catch (e) {
            console.warn('localStorage full, using IndexedDB only');
        }

        // Update IndexedDB
        if (this.db) {
            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction(['kv_store'], 'readwrite');
                const store = transaction.objectStore('kv_store');
                const request = store.put({ key: fullKey, value, timestamp: Date.now() });

                request.onsuccess = () => resolve(true);
                request.onerror = () => reject(request.error);
            });
        }
    }

    // Get value with caching
    async get(key) {
        const fullKey = `${this.namespace}:${key}`;

        // Check cache first
        if (this.cache.has(fullKey)) {
            return this.cache.get(fullKey);
        }

        // Check localStorage
        try {
            const localValue = localStorage.getItem(fullKey);
            if (localValue) {
                const parsed = JSON.parse(localValue);
                this.cache.set(fullKey, parsed);
                return parsed;
            }
        } catch (e) {
            console.warn('localStorage read error');
        }

        // Check IndexedDB
        if (this.db) {
            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction(['kv_store'], 'readonly');
                const store = transaction.objectStore('kv_store');
                const request = store.get(fullKey);

                request.onsuccess = () => {
                    if (request.result) {
                        this.cache.set(fullKey, request.result.value);
                        resolve(request.result.value);
                    } else {
                        resolve(null);
                    }
                };
                request.onerror = () => reject(request.error);
            });
        }

        return null;
    }

    // Delete value
    async delete(key) {
        const fullKey = `${this.namespace}:${key}`;

        // Remove from cache
        this.cache.delete(fullKey);

        // Remove from localStorage
        try {
            localStorage.removeItem(fullKey);
        } catch (e) {
            console.warn('localStorage delete error');
        }

        // Remove from IndexedDB
        if (this.db) {
            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction(['kv_store'], 'readwrite');
                const store = transaction.objectStore('kv_store');
                const request = store.delete(fullKey);

                request.onsuccess = () => resolve(true);
                request.onerror = () => reject(request.error);
            });
        }
    }

    // Get all keys
    async keys(pattern = '') {
        const allKeys = new Set();

        // From cache
        for (const key of this.cache.keys()) {
            if (key.startsWith(`${this.namespace}:${pattern}`)) {
                allKeys.add(key.replace(`${this.namespace}:`, ''));
            }
        }

        // From localStorage
        try {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.startsWith(`${this.namespace}:${pattern}`)) {
                    allKeys.add(key.replace(`${this.namespace}:`, ''));
                }
            }
        } catch (e) {
            console.warn('localStorage keys error');
        }

        return Array.from(allKeys);
    }

    // Clear all data
    async clear() {
        this.cache.clear();

        // Clear localStorage
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith(`${this.namespace}:`)) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));

        // Clear IndexedDB
        if (this.db) {
            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction(['kv_store'], 'readwrite');
                const store = transaction.objectStore('kv_store');
                const request = store.clear();

                request.onsuccess = () => resolve(true);
                request.onerror = () => reject(request.error);
            });
        }
    }
}

// Create global instance
const kvStorage = new KVStorage('abzarestan');

// Helper functions for articles
async function saveArticle(article) {
    const articles = await kvStorage.get('articles') || [];
    const index = articles.findIndex(a => a.id === article.id);
    
    if (index >= 0) {
        articles[index] = article;
    } else {
        articles.push(article);
    }
    
    await kvStorage.set('articles', articles);
    await kvStorage.set(`article:${article.id}`, article);
    return article;
}

async function getArticle(id) {
    return await kvStorage.get(`article:${id}`);
}

async function getAllArticles() {
    return await kvStorage.get('articles') || [];
}

async function deleteArticle(id) {
    const articles = await kvStorage.get('articles') || [];
    const filtered = articles.filter(a => a.id !== id);
    await kvStorage.set('articles', filtered);
    await kvStorage.delete(`article:${id}`);
}

// Helper functions for media
async function saveMedia(media) {
    const mediaList = await kvStorage.get('media') || [];
    mediaList.push(media);
    await kvStorage.set('media', mediaList);
    await kvStorage.set(`media:${media.id}`, media);
    return media;
}

async function getAllMedia() {
    return await kvStorage.get('media') || [];
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { KVStorage, kvStorage };
}

// Media Manager
let currentFileType = 'tool';
let uploadedFiles = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadFiles();
    setupEventListeners();
    updateStats();
});

function setupEventListeners() {
    // File type selector
    document.querySelectorAll('.file-type-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.file-type-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFileType = btn.dataset.type;
        });
    });

    // Upload area
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');

    uploadArea.addEventListener('click', () => fileInput.click());

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
    });

    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });
}

async function handleFiles(files) {
    const progressDiv = document.getElementById('uploadProgress');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');

    progressDiv.style.display = 'block';

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const progress = ((i + 1) / files.length) * 100;

        progressFill.style.width = progress + '%';
        progressText.textContent = `در حال آپلود ${i + 1} از ${files.length}...`;

        await uploadFile(file);
    }

    progressDiv.style.display = 'none';
    progressFill.style.width = '0%';
    document.getElementById('fileInput').value = '';

    loadFiles();
    updateStats();
}

async function uploadFile(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        
        reader.onload = async (e) => {
            const fileData = {
                id: generateId(),
                name: file.name,
                size: file.size,
                type: currentFileType,
                mimeType: file.type,
                data: e.target.result,
                uploadDate: new Date().toISOString(),
                url: URL.createObjectURL(file)
            };

            // Save to KV storage
            uploadedFiles.push(fileData);
            await kvStorage.set('uploadedFiles', uploadedFiles);

            // Also save individual file
            await kvStorage.set(`file:${fileData.id}`, fileData);

            resolve();
        };

        reader.readAsDataURL(file);
    });
}

async function loadFiles() {
    uploadedFiles = await kvStorage.get('uploadedFiles') || [];
    displayFiles();
}

function displayFiles() {
    const grid = document.getElementById('filesGrid');

    if (uploadedFiles.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: rgba(255,255,255,0.5);">
                هنوز فایلی آپلود نشده است
            </div>
        `;
        return;
    }

    grid.innerHTML = uploadedFiles.map(file => `
        <div class="file-card">
            <div class="file-preview">
                ${getFilePreview(file)}
            </div>
            <div class="file-info">
                <div class="file-name">${file.name}</div>
                <div class="file-meta">
                    <span>${formatFileSize(file.size)}</span>
                    <span>${getFileTypeLabel(file.type)}</span>
                    <span>${formatDate(file.uploadDate)}</span>
                </div>
            </div>
            <div class="file-actions">
                <button class="btn-copy" onclick="downloadFile('${file.id}')">
                    دانلود فایل
                </button>
                <button class="btn-copy" onclick="showDirectLink('${file.id}')" style="background: rgba(59, 130, 246, 0.9);">
                    کپی لینک
                </button>
                <button class="btn-delete" onclick="deleteFile('${file.id}')">
                    🗑️
                </button>
            </div>
        </div>
    `).join('');
}

function getFilePreview(file) {
    if (file.mimeType.startsWith('image/')) {
        return `<img src="${file.data}" alt="${file.name}">`;
    } else if (file.mimeType.startsWith('audio/')) {
        return `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18V5l12-2v13"></path>
                <circle cx="6" cy="18" r="3"></circle>
                <circle cx="18" cy="16" r="3"></circle>
            </svg>
        `;
    } else if (file.mimeType.startsWith('video/')) {
        return `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
            </svg>
        `;
    } else if (file.mimeType.includes('zip') || file.mimeType.includes('rar')) {
        return `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="12" y1="18" x2="12" y2="12"></line>
                <line x1="9" y1="15" x2="15" y2="15"></line>
            </svg>
        `;
    } else {
        return `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                <polyline points="13 2 13 9 20 9"></polyline>
            </svg>
        `;
    }
}

function getFileTypeLabel(type) {
    const labels = {
        'tool': 'ابزار',
        'podcast': 'پادکست',
        'other': 'سایر'
    };
    return labels[type] || 'سایر';
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fa-IR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(date);
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

async function updateStats() {
    const files = await kvStorage.get('uploadedFiles') || [];
    
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    const audioFiles = files.filter(f => f.type === 'podcast' || f.mimeType.startsWith('audio/')).length;
    const toolFiles = files.filter(f => f.type === 'tool').length;

    document.getElementById('totalFiles').textContent = files.length;
    document.getElementById('totalSize').textContent = formatFileSize(totalSize);
    document.getElementById('audioFiles').textContent = audioFiles;
    document.getElementById('toolFiles').textContent = toolFiles;
}

function showDirectLink(fileId) {
    const file = uploadedFiles.find(f => f.id === fileId);
    if (!file) return;

    // Encode file info for URL (without the large data)
    const fileInfo = {
        id: file.id,
        name: file.name,
        size: file.size,
        type: file.type,
        mimeType: file.mimeType
    };
    
    // Create a shareable download link with encoded file info
    const encodedInfo = encodeURIComponent(JSON.stringify(fileInfo));
    const downloadLink = `${window.location.origin}/download.html?file=${fileId}&info=${encodedInfo}`;
    
    document.getElementById('linkInput').value = downloadLink;
    document.getElementById('linkModal').classList.add('active');
}

function downloadFile(fileId) {
    const file = uploadedFiles.find(f => f.id === fileId);
    if (!file) return;

    // Convert data URL to blob
    const blob = dataURLtoBlob(file.data);
    const url = URL.createObjectURL(blob);

    // Create temporary link and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Clean up the URL object
    setTimeout(() => URL.revokeObjectURL(url), 100);
}

function dataURLtoBlob(dataURL) {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

function closeLinkModal() {
    document.getElementById('linkModal').classList.remove('active');
}

function copyDirectLink() {
    const input = document.getElementById('linkInput');
    input.select();
    document.execCommand('copy');
    
    // Show feedback
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '✓ کپی شد!';
    setTimeout(() => {
        btn.textContent = originalText;
    }, 2000);
}

async function deleteFile(fileId) {
    if (!confirm('آیا مطمئن هستید که می‌خواهید این فایل را حذف کنید؟')) {
        return;
    }

    uploadedFiles = uploadedFiles.filter(f => f.id !== fileId);
    await kvStorage.set('uploadedFiles', uploadedFiles);
    await kvStorage.delete(`file:${fileId}`);

    loadFiles();
    updateStats();
}

// Modern Toast Notification System

class ToastNotification {
    constructor() {
        this.container = null;
        this.init();
    }

    init() {
        // Create container if it doesn't exist
        if (!document.getElementById('toast-container')) {
            this.container = document.createElement('div');
            this.container.id = 'toast-container';
            this.container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 99999;
                display: flex;
                flex-direction: column;
                gap: 10px;
                pointer-events: none;
            `;
            document.body.appendChild(this.container);
        } else {
            this.container = document.getElementById('toast-container');
        }
    }

    show(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        // Get icon based on type
        const icon = this.getIcon(type);
        
        toast.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-content">
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        `;

        // Add styles
        this.applyStyles(toast, type);

        // Add to container
        this.container.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
            toast.style.opacity = '1';
        }, 10);

        // Auto remove
        if (duration > 0) {
            setTimeout(() => {
                this.remove(toast);
            }, duration);
        }

        return toast;
    }

    remove(toast) {
        toast.style.transform = 'translateX(400px)';
        toast.style.opacity = '0';
        setTimeout(() => {
            if (toast.parentElement) {
                toast.parentElement.removeChild(toast);
            }
        }, 300);
    }

    applyStyles(toast, type) {
        const colors = {
            success: {
                bg: 'linear-gradient(135deg, rgba(52, 211, 153, 0.08) 0%, rgba(16, 185, 129, 0.12) 100%)',
                border: 'rgba(52, 211, 153, 0.18)',
                glow: 'rgba(52, 211, 153, 0.2)'
            },
            error: {
                bg: 'linear-gradient(135deg, rgba(251, 113, 133, 0.08) 0%, rgba(244, 63, 94, 0.12) 100%)',
                border: 'rgba(251, 113, 133, 0.18)',
                glow: 'rgba(251, 113, 133, 0.2)'
            },
            warning: {
                bg: 'linear-gradient(135deg, rgba(251, 191, 36, 0.08) 0%, rgba(245, 158, 11, 0.12) 100%)',
                border: 'rgba(251, 191, 36, 0.18)',
                glow: 'rgba(251, 191, 36, 0.2)'
            },
            info: {
                bg: 'linear-gradient(135deg, rgba(96, 165, 250, 0.08) 0%, rgba(59, 130, 246, 0.12) 100%)',
                border: 'rgba(96, 165, 250, 0.18)',
                glow: 'rgba(96, 165, 250, 0.2)'
            }
        };

        const color = colors[type] || colors.info;

        toast.style.cssText = `
            display: flex;
            align-items: center;
            gap: 14px;
            background: ${color.bg};
            color: white;
            padding: 18px 22px;
            border-radius: 20px;
            border: 0.5px solid ${color.border};
            box-shadow: 
                0 10px 40px rgba(0, 0, 0, 0.25),
                0 0 0 0.5px rgba(255, 255, 255, 0.15) inset,
                0 1px 2px rgba(255, 255, 255, 0.1) inset,
                0 0 30px ${color.glow};
            min-width: 320px;
            max-width: 420px;
            transform: translateX(400px);
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            pointer-events: auto;
            backdrop-filter: blur(40px) saturate(200%);
            -webkit-backdrop-filter: blur(40px) saturate(200%);
            font-family: 'AbarMidFaNum', 'Tahoma', sans-serif;
            position: relative;
            overflow: hidden;
        `;
        
        // Add iOS-style shimmer effect
        const shimmer = document.createElement('div');
        shimmer.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            animation: shimmer 3s infinite;
            pointer-events: none;
        `;
        toast.appendChild(shimmer);
        
        // Add shimmer animation
        if (!document.getElementById('toast-shimmer-animation')) {
            const style = document.createElement('style');
            style.id = 'toast-shimmer-animation';
            style.textContent = `
                @keyframes shimmer {
                    0% { left: -100%; }
                    50%, 100% { left: 100%; }
                }
            `;
            document.head.appendChild(style);
        }

        // Icon styles
        const iconEl = toast.querySelector('.toast-icon');
        if (iconEl) {
            iconEl.style.cssText = `
                flex-shrink: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
        }

        // Content styles
        const contentEl = toast.querySelector('.toast-content');
        if (contentEl) {
            contentEl.style.cssText = `
                flex: 1;
                font-size: 14px;
                line-height: 1.5;
            `;
        }

        // Close button styles
        const closeBtn = toast.querySelector('.toast-close');
        if (closeBtn) {
            closeBtn.style.cssText = `
                flex-shrink: 0;
                background: rgba(255, 255, 255, 0.12);
                border: 0.5px solid rgba(255, 255, 255, 0.18);
                border-radius: 50%;
                width: 26px;
                height: 26px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                color: white;
                backdrop-filter: blur(10px);
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15), 0 0 0 0.5px rgba(255, 255, 255, 0.1) inset;
            `;
            closeBtn.onmouseover = () => {
                closeBtn.style.background = 'rgba(255, 255, 255, 0.22)';
                closeBtn.style.transform = 'scale(1.08)';
                closeBtn.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2), 0 0 0 0.5px rgba(255, 255, 255, 0.15) inset';
            };
            closeBtn.onmouseout = () => {
                closeBtn.style.background = 'rgba(255, 255, 255, 0.12)';
                closeBtn.style.transform = 'scale(1)';
                closeBtn.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15), 0 0 0 0.5px rgba(255, 255, 255, 0.1) inset';
            };
        }
    }

    getIcon(type) {
        const icons = {
            success: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>`,
            error: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>`,
            warning: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>`,
            info: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>`
        };
        return icons[type] || icons.info;
    }

    success(message, duration) {
        return this.show(message, 'success', duration);
    }

    error(message, duration) {
        return this.show(message, 'error', duration);
    }

    warning(message, duration) {
        return this.show(message, 'warning', duration);
    }

    info(message, duration) {
        return this.show(message, 'info', duration);
    }
}

// Create global instance
const toast = new ToastNotification();

// Export for use in other files
if (typeof window !== 'undefined') {
    window.toast = toast;
}

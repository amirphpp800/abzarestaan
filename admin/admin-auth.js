// Check authentication
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    const loginTime = parseInt(sessionStorage.getItem('adminLoginTime'));
    const currentTime = Date.now();
    const hoursPassed = (currentTime - loginTime) / (1000 * 60 * 60);

    // Session expires after 24 hours
    if (isLoggedIn !== 'true' || hoursPassed >= 24) {
        sessionStorage.removeItem('adminLoggedIn');
        sessionStorage.removeItem('adminLoginTime');
        window.location.href = 'login.html';
        return false;
    }

    return true;
}

// Logout function
function logout() {
    if (confirm('آیا مطمئن هستید که می‌خواهید خارج شوید؟')) {
        sessionStorage.removeItem('adminLoggedIn');
        sessionStorage.removeItem('adminLoginTime');
        window.location.href = 'login.html';
    }
}

// Check auth on page load
if (window.location.pathname.includes('/admin/') && !window.location.pathname.includes('login.html')) {
    checkAuth();
}

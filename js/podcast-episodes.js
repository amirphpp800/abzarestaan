// Episodes data
const episodes = [
    {
        id: 1,
        title: 'هامون و مکران؛‌ بدون آب و آنتن',
        date: '۱۲ خرداد ۱۴۰۳',
        duration: '20:29',
        description: 'بررسی وضعیت دسترسی به اینترنت و ارتباطات در مناطق هامون و مکران',
        thumbnail: '../assets/images/laye7/E1.png'
    },
    {
        id: 2,
        title: 'تاریخ شفاهی سانسور و مقاومت دیجیتال',
        date: '۲۹ اردیبهشت ۱۴۰۳',
        duration: '22:15',
        description: 'مروری بر تاریخچه سانسور و مقاومت دیجیتال در ایران',
        thumbnail: '../assets/images/laye7/E2.png'
    },
    {
        id: 3,
        title: 'بالماسکه با برادر بزرگ',
        date: '۱۵ اردیبهشت ۱۴۰۳',
        duration: '25:40',
        description: 'بررسی نظارت دیجیتال و چالش‌های حریم خصوصی در فضای مجازی',
        thumbnail: '../assets/images/laye7/E3.png'
    },
    {
        id: 4,
        title: 'پاتو از روی سیم بردار',
        date: '۱ اردیبهشت ۱۴۰۳',
        duration: '18:45',
        description: 'بررسی شنود و نظارت بر ارتباطات تلفنی و اینترنتی',
        thumbnail: '../assets/images/laye7/E4.png'
    },
    {
        id: 5,
        title: 'ناگهان فَتا؛ درباره بستن صفحه‌های اینستاگرامی',
        date: '۱۸ فروردین ۱۴۰۳',
        duration: '23:30',
        description: 'بررسی بسته شدن صفحات اینستاگرامی توسط پلیس فتا',
        thumbnail: '../assets/images/laye7/E5.png'
    },
    {
        id: 6,
        title: 'تحت نظارت برادر بزرگ',
        date: '۴ فروردین ۱۴۰۳',
        duration: '26:10',
        description: 'بررسی سیستم‌های نظارتی و کنترل اینترنت در ایران',
        thumbnail: '../assets/images/laye7/E6.png'
    },
    {
        id: 7,
        title: 'استارلینک خوب استارلینک صیانت‌شده است',
        date: '۱۹ اسفند ۱۴۰۲',
        duration: '24:55',
        description: 'بررسی اینترنت ماهواره‌ای استارلینک و چالش‌های استفاده از آن در ایران',
        thumbnail: '../assets/images/laye7/E7.png'
    },
    {
        id: 8,
        title: 'قسمت صفر: لایه هفتم',
        date: '۲۸ بهمن ۱۴۰۲',
        duration: '20:00',
        description: 'معرفی پادکست لایه هفتم و موضوعات مورد بحث در این مجموعه',
        thumbnail: '../assets/images/laye7/E0.jpg'
    }
];

// Load episodes
function loadEpisodes() {
    const container = document.getElementById('episodesList');
    if (!container) return;
    
    // Reverse episodes array to show newest first
    const reversedEpisodes = [...episodes].reverse();
    container.innerHTML = reversedEpisodes.map(episode => `
        <a href="podcast-episode.html?id=${episode.id}" class="episode-card">
            <div class="episode-thumbnail">
                <img src="${episode.thumbnail}" alt="${episode.title}" onerror="this.src='../assets/images/audio.png'">
                <div class="play-overlay">
                    <svg viewBox="0 0 24 24" fill="white">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                </div>
            </div>
            <div class="episode-content">
                <div class="episode-header">
                    <div>
                        <h3 class="episode-title">${episode.title}</h3>
                        <div class="episode-date">${episode.date}</div>
                    </div>
                </div>
                <p class="episode-description">${episode.description}</p>
                <div class="episode-meta">
                    <div class="meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>${episode.duration}</span>
                    </div>
                </div>
            </div>
        </a>
    `).join('');
}

// Load on page load
document.addEventListener('DOMContentLoaded', loadEpisodes);

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navItems = mainNav.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            mainNav.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mainNav.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            mobileMenuBtn.classList.remove('active');
            mainNav.classList.remove('active');
        }
    });
}

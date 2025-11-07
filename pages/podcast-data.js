// Podcast episodes data with full content
const podcastEpisodes = {
    1: {
        id: 1,
        title: 'هامون و مکران؛‌ بدون آب و آنتن',
        date: '۱۲ خرداد ۱۴۰۳',
        duration: '20:29',
        audioUrl: '#', // Add actual audio URL
        thumbnail: '../assets/images/laye7/E1.png',
        content: `
            <h2>درباره این اپیزود</h2>
            <p>در این اپیزود به بررسی سامانه سیتام و کنترل بی‌پایان پوشش زبان در ایران پرداخته و از تهدید فزاینده.</p>
            
            <h3>الگوریتم عقاید؛ سامانه سیتام و کنترل بی‌پایان پوشش زبان در ایران</h3>
            <p>در سرویس قسمت اتصال سوم پادکست لایه هفتم، این موضوع با تمرکز بر کارکرد تحقیقی پروسه در مورد فزاینده است. نخستین دوره بررسی از کاربرد سامانه سیتام و نقش آن در کنترل اطلاعات و نظارت بر شهروندان، تا تحلیل ابعاد مختلف این سامانه و تأثیرات آن بر حریم خصوصی و آزادی بیان پرداخته می‌شود.</p>

            <blockquote>
            سامانه سیتام ابزاری قدرتمند برای کنترل فضای دیجیتال و نظارت بر شهروندان است که با استفاده از الگوریتم‌های پیچیده، رفتار آنلاین افراد را رصد و تحلیل می‌کند.
            </blockquote>

            <h3>نکات کلیدی این اپیزود:</h3>
            <ul>
                <li>تاریخچه و چگونگی راه‌اندازی سامانه سیتام در ایران</li>
                <li>نقش الگوریتم‌ها در کنترل محتوای دیجیتال</li>
                <li>تأثیرات سامانه بر حریم خصوصی شهروندان</li>
                <li>روش‌های مقابله و حفاظت از اطلاعات شخصی</li>
                <li>مقایسه با سیستم‌های مشابه در سایر کشورها</li>
            </ul>

            <h3>منابع و مطالعات بیشتر</h3>
            <p>برای اطلاعات بیشتر درباره سامانه سیتام و تأثیرات آن، می‌توانید به گزارش‌های سازمان‌های حقوق بشری و تحقیقات دانشگاهی در این زمینه مراجعه کنید.</p>
        `
    },
    2: {
        id: 2,
        title: 'تاریخ شفاهی سانسور و مقاومت دیجیتال',
        date: '۲۹ اردیبهشت ۱۴۰۳',
        duration: '22:15',
        audioUrl: '#',
        thumbnail: '../assets/images/laye7/E2.png',
        content: `
            <h2>درباره این اپیزود</h2>
            <p>در این قسمت به تحلیل روش‌های جدید کلیدشکافی و نظارت بر ارتباطات دیجیتال در ایران می‌پردازیم.</p>
            
            <h3>کلیدشکافی استخراجی چیست؟</h3>
            <p>کلیدشکافی استخراجی یکی از پیشرفته‌ترین روش‌های نظارت بر ارتباطات رمزنگاری شده است که در آن به جای شکستن رمزنگاری، کلیدهای رمزنگاری از دستگاه‌ها استخراج می‌شوند.</p>

            <h3>نکات مهم:</h3>
            <ul>
                <li>روش‌های استخراج کلیدهای رمزنگاری</li>
                <li>تأثیر بر امنیت ارتباطات</li>
                <li>راهکارهای محافظت از کلیدهای خصوصی</li>
                <li>استفاده از رمزنگاری سخت‌افزاری</li>
            </ul>
        `
    },
    3: {
        id: 3,
        title: 'بالماسکه با برادر بزرگ',
        date: '۱۵ اردیبهشت ۱۴۰۳',
        duration: '25:40',
        audioUrl: '#',
        thumbnail: '../assets/images/laye7/E3.png',
        content: `
            <h2>راهنمای جامع VPN</h2>
            <p>در این اپیزود به بررسی کامل VPN‌ها و نحوه انتخاب و استفاده از آن‌ها در شرایط بحرانی می‌پردازیم.</p>
            
            <h3>معیارهای انتخاب VPN مناسب</h3>
            <ul>
                <li>سیاست عدم ثبت لاگ (No-Log Policy)</li>
                <li>پروتکل‌های امنیتی قوی</li>
                <li>سرعت و پایداری اتصال</li>
                <li>حوزه قضایی مناسب</li>
                <li>قیمت و پشتیبانی</li>
            </ul>

            <h3>پروتکل‌های VPN</h3>
            <p>بررسی پروتکل‌های مختلف مانند OpenVPN، WireGuard، IKEv2 و مقایسه آن‌ها از نظر امنیت و سرعت.</p>
        `
    },
    4: {
        id: 4,
        title: 'پاتو از روی سیم بردار',
        date: '۱ اردیبهشت ۱۴۰۳',
        duration: '18:45',
        audioUrl: '#',
        thumbnail: '../assets/images/laye7/E4.png',
        content: `
            <h2>حفظ ارتباط در شرایط بحرانی</h2>
            <p>راهکارهای عملی برای حفظ ارتباط در زمان قطعی یا محدودیت اینترنت.</p>
            
            <h3>ابزارهای ارتباطی جایگزین</h3>
            <ul>
                <li>پیام‌رسان‌های غیرمتمرکز</li>
                <li>شبکه‌های Mesh</li>
                <li>ارتباطات رادیویی</li>
                <li>استفاده از Bluetooth و WiFi Direct</li>
            </ul>
        `
    },
    5: {
        id: 5,
        title: 'ناگهان فَتا؛ درباره بستن صفحه‌های اینستاگرامی',
        date: '۱۸ فروردین ۱۴۰۳',
        duration: '23:30',
        audioUrl: '#',
        thumbnail: '../assets/images/laye7/E5.png',
        content: `
            <h2>آمادگی برای قطعی اینترنت</h2>
            <p>چگونه پیش از وقوع قطعی اینترنت آماده شویم و چه اقداماتی انجام دهیم.</p>
            
            <h3>اقدامات پیشگیرانه</h3>
            <ul>
                <li>ذخیره‌سازی اطلاعات مهم</li>
                <li>آماده‌سازی ابزارهای ارتباطی آفلاین</li>
                <li>ایجاد شبکه اعتماد</li>
                <li>تهیه نسخه پشتیبان از داده‌ها</li>
            </ul>
        `
    },
    6: {
        id: 6,
        title: 'تحت نظارت برادر بزرگ',
        date: '۴ فروردین ۱۴۰۳',
        duration: '26:10',
        audioUrl: '#',
        thumbnail: '../assets/images/laye7/E6.png',
        content: `
            <h2>روش‌های مختلف سانسور</h2>
            <p>بررسی جامع انواع روش‌های سانسور و فیلترینگ در ایران.</p>
            
            <h3>لایه‌های مختلف سانسور</h3>
            <ul>
                <li>فیلترینگ DNS</li>
                <li>مسدودسازی IP</li>
                <li>بازرسی عمیق بسته‌ها (DPI)</li>
                <li>کنترل محتوای پیامک</li>
                <li>نظارت بر شبکه‌های اجتماعی</li>
            </ul>
        `
    },
    7: {
        id: 7,
        title: 'استارلینک خوب استارلینک صیانت‌شده است',
        date: '۱۹ اسفند ۱۴۰۲',
        duration: '24:55',
        audioUrl: '#',
        thumbnail: '../assets/images/laye7/E7.png',
        content: `
            <h2>تهدید جاسوس‌افزارها</h2>
            <p>بررسی جاسوس‌افزارهای مورد استفاده در ایران و روش‌های مقابله با آن‌ها.</p>
            
            <h3>انواع جاسوس‌افزارها</h3>
            <ul>
                <li>جاسوس‌افزارهای موبایل</li>
                <li>نرم‌افزارهای نظارتی دسکتاپ</li>
                <li>ابزارهای شنود تماس</li>
                <li>برنامه‌های ردیابی موقعیت</li>
            </ul>

            <h3>راهکارهای محافظت</h3>
            <p>استفاده از نرم‌افزارهای امنیتی معتبر، به‌روزرسانی منظم سیستم‌عامل، و اجتناب از نصب برنامه‌های ناشناخته.</p>
        `
    },
    8: {
        id: 8,
        title: 'قسمت صفر: لایه هفتم',
        date: '۲۸ بهمن ۱۴۰۲',
        duration: '20:00',
        audioUrl: '#',
        thumbnail: '../assets/images/laye7/E0.jpg',
        content: `
            <h2>درباره این اپیزود</h2>
            <p>معرفی پادکست لایه هفتم و موضوعات مورد بحث در این مجموعه.</p>
            
            <h3>درباره پادکست لایه هفتم</h3>
            <p>پادکست لایه هفتم به بررسی موضوعات مرتبط با فیلترینگ، امنیت دیجیتال، و چالش‌های فضای مجازی در ایران می‌پردازد.</p>
        `
    }
};

// Load episode data
function loadEpisode() {
    const urlParams = new URLSearchParams(window.location.search);
    const episodeId = parseInt(urlParams.get('id'));
    
    console.log('Episode ID:', episodeId);
    
    const episode = podcastEpisodes[episodeId];
    
    console.log('Episode data:', episode);
    
    if (!episode) {
        console.log('Episode not found, redirecting...');
        window.location.href = 'podcast-layeh7.html';
        return;
    }

    // Update page title
    document.getElementById('pageTitle').textContent = episode.title + ' - پادکست لایه هفتم';
    document.title = episode.title + ' - پادکست لایه هفتم';
    
    // Update episode info
    document.getElementById('episodeTitle').textContent = `اپیزود ${episode.id}: ${episode.title}`;
    document.getElementById('episodeDate').textContent = episode.date;
    document.getElementById('episodeDuration').textContent = episode.duration;
    
    // Update player subtitle
    document.getElementById('playerSubtitle').textContent = `اپیزود ${episode.id}`;
    
    // Set main cover image
    const mainCover = document.getElementById('episodeCoverMain');
    if (mainCover) {
        const absolutePath = episode.thumbnail.replace('../', '/');
        mainCover.src = absolutePath;
        mainCover.alt = episode.title;
        console.log('Main cover image set to:', absolutePath);
    }
    
    // Set player cover image
    const playerCover = document.getElementById('playerCover');
    const playerIconFallback = document.getElementById('playerIconFallback');
    if (playerCover && playerIconFallback) {
        console.log('🖼️ Setting up player cover image');
        console.log('Original thumbnail path:', episode.thumbnail);
        
        // Convert relative path to absolute path
        const absolutePath = episode.thumbnail.replace('../', '/');
        console.log('Absolute path:', absolutePath);
        
        // Setup error handler BEFORE setting src
        playerCover.onerror = function() {
            console.error('❌ Failed to load image from:', this.src);
            this.style.display = 'none';
            playerIconFallback.style.display = 'block';
        };
        
        // Setup load handler BEFORE setting src
        playerCover.onload = function() {
            console.log('✅ Image loaded successfully!');
            this.style.display = 'block';
            playerIconFallback.style.display = 'none';
        };
        
        // Set alt text
        playerCover.alt = episode.title;
        
        // Set the source - this triggers the load
        playerCover.src = absolutePath;
        console.log('Image src set to:', playerCover.src);
    } else {
        console.error('❌ Player cover or fallback element not found!');
    }
    
    // Update audio player
    document.getElementById('audioSource').src = episode.audioUrl;
    document.getElementById('audioPlayer').load();
    
    // Update download button
    document.getElementById('downloadBtn').href = episode.audioUrl;
    
    // Load content
    document.getElementById('episodeContent').innerHTML = episode.content;
    
    // Load other episodes
    loadOtherEpisodes(episodeId);
}

// Load other episodes (excluding current one)
function loadOtherEpisodes(currentEpisodeId) {
    const container = document.getElementById('otherEpisodesList');
    if (!container) return;
    
    // Get all episodes except current one
    const otherEpisodes = Object.values(podcastEpisodes)
        .filter(ep => ep.id !== currentEpisodeId)
        .sort((a, b) => b.id - a.id); // Sort by newest first
    
    // Take maximum 6 episodes
    const displayEpisodes = otherEpisodes.slice(0, 6);
    
    container.innerHTML = displayEpisodes.map(episode => {
        const absolutePath = episode.thumbnail.replace('../', '/');
        return `
            <a href="podcast-episode.html?id=${episode.id}" class="other-episode-card">
                <img src="${absolutePath}" alt="${episode.title}" class="other-episode-thumbnail" onerror="this.src='/assets/images/audio.png'">
                <div class="other-episode-info">
                    <div class="other-episode-title">اپیزود ${episode.id}: ${episode.title}</div>
                    <div class="other-episode-duration">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        ${episode.duration}
                    </div>
                </div>
            </a>
        `;
    }).join('');
    
    console.log(`Loaded ${displayEpisodes.length} other episodes`);
}

// Share functions
function shareOnTwitter() {
    const url = window.location.href;
    const text = document.getElementById('episodeTitle').textContent;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
}

function shareOnTelegram() {
    const url = window.location.href;
    const text = document.getElementById('episodeTitle').textContent;
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
}

function copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        if (window.toast) {
            window.toast.success('لینک کپی شد!');
        }
    }).catch(() => {
        if (window.toast) {
            window.toast.error('خطا در کپی کردن لینک');
        }
    });
}

// Load episode on page load
document.addEventListener('DOMContentLoaded', loadEpisode);

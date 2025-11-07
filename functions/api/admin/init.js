
// Admin API to initialize sample data
// POST /api/admin/init - Initialize sample articles in KV storage

export async function onRequestPost({ env }) {
    try {
        // Sample articles data
        const sampleArticles = [
            {
                id: '1',
                title: 'کنترل به جای نوآوری: روایت توسعه نامتوازن هوش مصنوعی در ایران از اسناد ملی تا ابزارهای نظارتی',
                excerpt: 'جمهوری اسلامی ایران طی سال‌های اخیر استفاده از فناوری‌های نوین برای کنترل جامعه را به صورت سیستماتیک توسعه داده است.',
                content: `
                    <h2 id="intro">مقدمه</h2>
                    <p>جمهوری اسلامی ایران طی سال‌های اخیر استفاده از فناوری‌های نوین برای کنترل جامعه را به صورت سیستماتیک توسعه داده است. این مقاله به بررسی نحوه‌ای می‌پردازد که توسعه هوش مصنوعی در ایران صرفاً در جهت تأمین نیازهای نظارتی و کنترلی حاکمیت پیش رفته است.</p>
                    
                    <p>در شرایط کنونی که توسعه هوش مصنوعی در جهان به سمت بهبود زندگی شهروندان و ارتقای خدمات عمومی حرکت کرده، در ایران این فناوری‌ها عمدتاً برای محدود کردن آزادی‌های شهروندان و کنترل اجتماعی به کار گرفته می‌شوند.</p>

                    <h2 id="content">محتوای اصلی</h2>
                    <h3>سیاست‌گذاری هوش مصنوعی در ایران</h3>
                    <p>بررسی اسناد بالادستی نشان می‌دهد که رویکرد حاکمیت نسبت به هوش مصنوعی دوگانه است. از یک سو در اسناد رسمی، توسعه هوش مصنوعی به عنوان ابزاری برای پیشرفت اقتصادی و علمی معرفی می‌شود، اما در عمل، بودجه‌ها و منابع عمدتاً صرف پروژه‌های نظارتی و امنیتی می‌شوند.</p>

                    <blockquote>
                    این رویکرد باعث شده است که ایران در زمینه کاربردهای مدنی و تجاری هوش مصنوعی عقب بماند و تنها در حوزه‌های نظارتی پیشرفت کند.
                    </blockquote>

                    <h3>ابزارهای نظارتی مبتنی بر هوش مصنوعی</h3>
                    <p>نمونه‌هایی از استفاده نظارتی از هوش مصنوعی در ایران شامل موارد زیر است:</p>
                    
                    <ul>
                        <li>سیستم‌های تشخیص چهره برای کنترل حجاب</li>
                        <li>ابزارهای تحلیل متن برای نظارت بر شبکه‌های اجتماعی</li>
                        <li>سیستم‌های تشخیص الگو برای شناسایی رفتارهای "مشکوک"</li>
                        <li>پردازش داده‌های ترافیکی برای ردیابی تحرکات شهروندان</li>
                    </ul>

                    <h2 id="conclusion">نتیجه‌گیری</h2>
                    <p>توسعه هوش مصنوعی در ایران نمونه‌ای از نحوه استفاده ابزاری از فناوری برای تقویت ساختارهای قدرت موجود است. این رویکرد نه تنها مانع رشد اقتصادی و علمی کشور شده، بلکه باعث عمیق‌تر شدن شکاف دیجیتال بین ایران و جهان شده است.</p>
                `,
                date: '۱۵ مهر ۱۴۰۳',
                category: 'تکنولوژی',
                views: 1250,
                likes: 45,
                comments: 12,
                tags: ['هوش مصنوعی', 'سیاست', 'فناوری', 'ایران'],
                readingTime: 8,
                author: 'تیم تحلیلی ابزارستان',
                featuredImage: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                featured: true
            },
            {
                id: '2',
                title: 'میراث جنگ ۱۲ روزه: غلبه نگاه امنیتی بر اکوسیستم دیجیتال و شبکه اینترنت',
                excerpt: 'بررسی تأثیرات جنگ ۱۲ روزه بر اکوسیستم دیجیتال ایران و چگونگی تبدیل نگاه امنیتی به رویکرد غالب در مدیریت فضای مجازی و شبکه اینترنت کشور',
                content: `
                    <h2 id="intro">مقدمه</h2>
                    <p>جنگ ۱۲ روزه تأثیرات عمیقی بر اکوسیستم دیجیتال ایران گذاشت. در این مقاله به بررسی چگونگی تبدیل نگاه امنیتی به رویکرد غالب در مدیریت فضای مجازی و شبکه اینترنت کشور می‌پردازیم.</p>
                    
                    <p>در شرایط پس از جنگ، شاهد تشدید محدودیت‌ها و کنترل‌های امنیتی بر فضای دیجیتال بوده‌ایم که این امر تأثیرات مستقیمی بر کسب‌وکارهای آنلاین، پلتفرم‌های داخلی و دسترسی شهروندان به اینترنت داشته است.</p>

                    <h2 id="platforms">تأثیر بر پلتفرم‌های داخلی</h2>
                    <p>یکی از بارزترین نمونه‌های این رویکرد امنیتی، برخورد با پلتفرم‌های داخلی بوده است. صداوسیما با استفاده از ابزارهای قانونی، اقدام به محدود کردن فعالیت رقبای خود در فضای دیجیتال کرده است.</p>
                    
                    <div class="twitter-embed-container" style="margin: 2rem 0; padding: 1.5rem; background: rgba(255, 255, 255, 0.02); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
                        <blockquote class="twitter-tweet" data-theme="dark"><p lang="fa" dir="rtl"><a href="https://twitter.com/hashtag/%D8%A7%DA%A9%D9%86%D9%88%D9%86?src=hash&amp;ref_src=twsrc%5Etfw">#اکنون</a> حکم دادگاه بدوی در خصوص توقف فعالیت <a href="https://twitter.com/hashtag/%D8%A2%D9%BE%D8%A7%D8%B1%D8%A7%D8%AA_%D8%A7%D8%B3%D9%BE%D8%B1%D8%AA?src=hash&amp;ref_src=twsrc%5Etfw">#آپارات_اسپرت</a> با بیش از ٢.۵ میلیون تماشاچی ماهیانه و مجوز کامل فعالیت از وزارت ارشاد به دستم رسید!<br>صداوسیمای پرمخاطب(!) و پرکینه حتی نگذاشت یک ماه از جنگ و احوال جنگ بگذرد و بعد روی پلتفرم‌های داخلی تیغ بکشد.<br>حمایت صدا و سیما پیش‌کش آقای… <a href="https://t.co/C0F1yVc54g">https://t.co/C0F1yVc54g</a> <a href="https://t.co/yjfmD7bIOY">pic.twitter.com/yjfmD7bIOY</a></p>&mdash; Mohammad Javad Shakouri (@mohammad784) <a href="https://twitter.com/mohammad784/status/1947562046351958383?ref_src=twsrc%5Etfw">July 22, 2025</a></blockquote>
                    </div>

                    <p>این توییت نشان‌دهنده یکی از نمونه‌های بارز فشار بر پلتفرم‌های داخلی است. آپارات اسپرت با وجود داشتن مجوز کامل از وزارت ارشاد و بیش از ۲.۵ میلیون تماشاچی ماهیانه، با حکم دادگاه متوقف شد.</p>

                    <h2 id="security-approach">نگاه امنیتی غالب</h2>
                    <p>پس از جنگ ۱۲ روزه، نگاه امنیتی به طور کامل بر اکوسیستم دیجیتال ایران غلبه کرده است. این رویکرد شامل موارد زیر است:</p>
                    
                    <ul>
                        <li>تشدید کنترل و نظارت بر پلتفرم‌های داخلی</li>
                        <li>محدودسازی دسترسی به اینترنت در مواقع بحرانی</li>
                        <li>افزایش فیلترینگ و سانسور محتوا</li>
                        <li>فشار بر کسب‌وکارهای آنلاین و استارتاپ‌ها</li>
                        <li>استفاده از ابزارهای قانونی برای محدود کردن رقابت</li>
                    </ul>

                    <h2 id="impact">تأثیرات بر اکوسیستم</h2>
                    <p>این رویکرد امنیتی تأثیرات منفی متعددی بر اکوسیستم دیجیتال ایران داشته است:</p>
                    
                    <blockquote>
                    وقتی پلتفرم‌های داخلی با وجود داشتن مجوز و مخاطب، تحت فشار قرار می‌گیرند، انگیزه سرمایه‌گذاری و نوآوری در فضای دیجیتال از بین می‌رود.
                    </blockquote>

                    <p>کاهش اعتماد سرمایه‌گذاران، مهاجرت استعدادها به خارج از کشور، و کاهش کیفیت خدمات دیجیتال از جمله پیامدهای این رویکرد است.</p>

                    <h2 id="conclusion">نتیجه‌گیری</h2>
                    <p>میراث جنگ ۱۲ روزه، غلبه کامل نگاه امنیتی بر اکوسیستم دیجیتال ایران بوده است. این رویکرد نه تنها به توسعه فضای دیجیتال کمکی نکرده، بلکه موانع جدیدی بر سر راه نوآوری و رقابت سالم ایجاد کرده است.</p>
                    
                    <p>برای آینده‌ای بهتر، نیاز به تغییر این رویکرد و حرکت به سمت فضای دیجیتال باز، رقابتی و مبتنی بر قانون داریم.</p>
                `,
                date: '۱۴ آبان ۱۴۰۳',
                category: 'تحلیل',
                views: 2340,
                likes: 89,
                comments: 24,
                tags: ['جنگ', 'دیجیتال', 'امنیت', 'اینترنت', 'ایران'],
                readingTime: 8,
                author: 'تیم تحلیلی ابزارستان',
                featuredImage: 'linear-gradient(135deg, #667eea, #764ba2)'
            },
            {
                id: '3',
                title: 'امنیت سایبری در عصر دیجیتال',
                excerpt: 'راهنمای جامع برای محافظت از داده‌های شخصی و تجاری در فضای دیجیتال',
                content: `
                    <h2>اهمیت امنیت سایبری</h2>
                    <p>با رشد روزافزون استفاده از اینترنت و خدمات آنلاین، امنیت سایبری تبدیل به یکی از مهم‌ترین دغدغه‌های کاربران و سازمان‌ها شده است.</p>
                    
                    <h2>تهدیدات رایج</h2>
                    <ul>
                        <li>حملات فیشینگ</li>
                        <li>ویروس‌ها و بدافزارها</li>
                        <li>نفوذ به سیستم‌ها</li>
                        <li>سرقت اطلاعات</li>
                    </ul>
                    
                    <h2>راه‌های مقابله</h2>
                    <p>استفاده از رمزهای قوی، به‌روزرسانی مداوم نرم‌افزارها، و آگاهی از تهدیدات رایج از مهم‌ترین راه‌های مقابله محسوب می‌شوند.</p>
                `,
                date: '۵ مهر ۱۴۰۳',
                category: 'امنیت',
                views: 654,
                likes: 28,
                comments: 15,
                tags: ['امنیت', 'سایبری', 'حفاظت از داده'],
                readingTime: 4,
                author: 'احمد محمدی',
                featuredImage: 'linear-gradient(135deg, #f093fb, #f5576c)'
            }
        ];
        
        // Save each article
        const promises = sampleArticles.map(async (article) => {
            await env.DB.put(`article:${article.id}`, JSON.stringify(article));
            return {
                id: article.id,
                title: article.title,
                excerpt: article.excerpt,
                category: article.category,
                date: article.date,
                featured: article.featured || false
            };
        });
        
        const articlesList = await Promise.all(promises);
        
        // Save articles list
        await env.DB.put('articles:list', JSON.stringify(articlesList));
        
        // Initialize some sample comments
        const sampleComments = [
            {
                id: 1,
                text: 'مقاله بسیار جامع و مفیدی بود. متشکرم از نویسنده.',
                author: 'علی احمدی',
                timestamp: new Date().toISOString(),
                date: '۱۶ مهر ۱۴۰۳'
            },
            {
                id: 2,
                text: 'نکات مطرح شده در این مقاله قابل تأمل است و باید بیشتر به این موضوعات توجه کرد.',
                author: 'مریم حسینی',
                timestamp: new Date().toISOString(),
                date: '۱۶ مهر ۱۴۰۳'
            }
        ];
        
        await env.DB.put('article:1:comments', JSON.stringify(sampleComments));
        
        return new Response(JSON.stringify({ 
            success: true, 
            message: 'Sample data initialized successfully',
            articlesCount: sampleArticles.length 
        }), {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        
    } catch (error) {
        return new Response(JSON.stringify({ 
            error: 'Failed to initialize data',
            details: error.message 
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }
}

export async function onRequestOptions() {
    return new Response(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
}

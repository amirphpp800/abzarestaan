# راهنمای اضافه کردن مقاله جدید

## روش ساده (توصیه می‌شود)

### گام 1: ایجاد فایل مقاله
فایل HTML مقاله خود را در پوشه `data/articles/` با نام `article-X.html` ایجاد کنید.
مثال: `article-5.html`

### گام 2: اضافه کردن به لیست
فقط **یک فایل** را ویرایش کنید:

**فایل: `js/articles-auto-loader.js`**

```javascript
const KNOWN_ARTICLES = [
    { id: 1, filename: 'article-1.html' },
    { id: 2, filename: 'article-2.html' },
    { id: 3, filename: 'article-3.html' },
    { id: 4, filename: 'article-4.html' },
    { id: 5, filename: 'article-5.html' }  // مقاله جدید
];
```

### گام 3: اضافه کردن metadata به فایل HTML
در فایل HTML مقاله، به تگ `<article>` این attributeها را اضافه کنید:

```html
<article 
    data-id="5" 
    data-category="دسته‌بندی" 
    data-author="نویسنده" 
    data-date="تاریخ" 
    data-reading-time="15" 
    data-excerpt="خلاصه مقاله" 
    data-tags="تگ1,تگ2,تگ3">
```

### مثال کامل:

```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>عنوان مقاله - ابزارستان</title>
    <meta name="description" content="خلاصه مقاله">
</head>
<body class="article-template">
    <article 
        data-id="5" 
        data-category="تکنولوژی" 
        data-author="نویسنده" 
        data-date="۲۰ آبان ۱۴۰۴" 
        data-reading-time="15" 
        data-excerpt="این یک خلاصه مقاله است" 
        data-tags="تکنولوژی,هوش مصنوعی,اینترنت">
        
        <header class="article-meta">
            <h1>عنوان مقاله</h1>
            <img class="article-image" src="../../assets/images/my-image.png" alt="...">
        </header>

        <main class="article-body">
            <p>محتوای مقاله...</p>
        </main>
    </article>
</body>
</html>
```

---

## روش قدیمی (نیاز به ویرایش 3 فایل)

اگر می‌خواهید از روش قدیمی استفاده کنید، باید این 3 فایل را ویرایش کنید:

1. **`js/articles-loader.js`** - خط 38
2. **`js/article.js`** - خط 449
3. **`index.html`** - اگر می‌خواهید در صفحه اصلی نمایش داده شود

---

## نکات مهم

- ✅ عکس مقاله را در `assets/images/` قرار دهید
- ✅ از نام‌گذاری منظم استفاده کنید: `article-1.html`, `article-2.html`, ...
- ✅ همیشه `data-id` را در تگ `<article>` اضافه کنید
- ✅ برای مقالات خاص (مثل `network-article.html`) نیاز به لینک دستی در `index.html` دارید

---

## تست کردن

بعد از اضافه کردن مقاله:
1. صفحه را Refresh کنید
2. به `/pages/articles.html` بروید
3. مقاله جدید باید نمایش داده شود

اگر مقاله نمایش داده نشد، Console مرورگر را چک کنید (F12).

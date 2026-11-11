# Tappy
مشروع ستاتيك (HTML/CSS/JS) كيخدم مباشرة على GitHub Pages.

## الرفع
1. دير Repository جديد فـ GitHub وارفع كل الملفات (index.html فالجذر).
2. Settings > Pages > Source: Deploy from a branch > main / root.
3. الرابط: https://USERNAME.github.io/REPO/

## الصفحات
- index.html الرئيسية | customer.html الزبون | merchant.html المتجر | admin.html المشرف
- الأرقام السرية التجريبية: المتاجر 1111 / 2222 / 3333، المشرف 0000 (assets/app.js)

## ملاحظة مهمة
البيانات كتتخزن فـ localStorage (نفس المتصفح فقط). للإنتاج: بدل DB فـ assets/app.js بـ Firebase/Firestore أو API،
والرمز السري بتسجيل دخول حقيقي، وكود QR حقيقي، وكارطات Apple/Google Wallet من السيرفر.

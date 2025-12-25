# 📝 HTML/CSS/JavaScript Guide for KashPages

## Creating Landing Pages

KashPages supports **two types** of landing pages:

### 1. **Full HTML Documents** (Recommended for Complex Pages)
### 2. **HTML Snippets** (For Simple Content)

---

## Option 1: Full HTML Document

### When to Use
- You want complete control over the entire page
- You're using external CSS/JS libraries (Bootstrap, Tailwind, etc.)
- You have custom styles and scripts
- You want the page isolated from KashPages branding

### Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Business Name</title>
  
  <!-- External CSS Libraries -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <!-- Or Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Custom CSS -->
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
    }
    
    .hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 100px 20px;
      text-align: center;
    }
    
    .cta-button {
      display: inline-block;
      padding: 15px 40px;
      background: white;
      color: #667eea;
      text-decoration: none;
      border-radius: 50px;
      font-weight: bold;
      margin: 10px;
      transition: transform 0.3s;
    }
    
    .cta-button:hover {
      transform: scale(1.05);
    }
  </style>
</head>
<body>
  <div class="hero">
    <h1>Welcome to My Business</h1>
    <p>Quality products and services in Kashmir</p>
    
    <!-- Contact Buttons -->
    <a href="tel:+919999999999" class="cta-button">
      📞 Call Now
    </a>
    <a href="https://wa.me/919999999999" class="cta-button">
      💬 WhatsApp
    </a>
    <a href="https://instagram.com/yourbusiness" class="cta-button">
      📸 Instagram
    </a>
  </div>
  
  <!-- Your content sections -->
  <div class="container" style="padding: 40px 20px;">
    <h2>About Us</h2>
    <p>Your business description here...</p>
  </div>
  
  <!-- External JavaScript Libraries -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  
  <!-- Custom JavaScript -->
  <script>
    // Your custom JavaScript code
    console.log('Page loaded successfully!');
    
    // Example: Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  </script>
</body>
</html>
```

### Features Supported
✅ External CSS (CDN links)  
✅ External JavaScript (CDN links)  
✅ Custom inline styles  
✅ Custom inline scripts  
✅ Bootstrap, Tailwind, etc.  
✅ jQuery, Alpine.js, etc.  
✅ Font Awesome, Google Fonts  
✅ Embedded iframes (YouTube, Instagram, etc.)  

---

## Option 2: HTML Snippet

### When to Use
- Simple content-only pages
- You want KashPages branding footer
- Don't need custom styles
- Minimal JavaScript

### Template

```html
<div class="container" style="max-width: 1200px; margin: 0 auto; padding: 40px 20px;">
  <div style="text-align: center; margin-bottom: 50px;">
    <h1 style="font-size: 3rem; color: #1a202c; margin-bottom: 20px;">
      My Business Name
    </h1>
    <p style="font-size: 1.2rem; color: #4a5568;">
      Quality products and services
    </p>
  </div>
  
  <!-- Contact Buttons -->
  <div style="text-align: center; margin-bottom: 50px;">
    <a href="tel:+919999999999" style="display: inline-block; padding: 15px 30px; background: #3b82f6; color: white; text-decoration: none; border-radius: 8px; margin: 10px;">
      📞 Call Now
    </a>
    <a href="https://wa.me/919999999999" style="display: inline-block; padding: 15px 30px; background: #10b981; color: white; text-decoration: none; border-radius: 8px; margin: 10px;">
      💬 WhatsApp
    </a>
  </div>
  
  <!-- Content Section -->
  <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <h2 style="color: #1a202c; margin-bottom: 15px;">About Us</h2>
    <p style="color: #4a5568; line-height: 1.6;">
      Your business description here. Tell customers what makes you special.
    </p>
  </div>
</div>

<!-- Optional: Add simple JavaScript -->
<script>
  console.log('Snippet page loaded');
</script>
```

---

## Using External Libraries

### Popular Libraries Supported

#### 1. **Bootstrap 5**
```html
<!-- In <head> -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Before </body> -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
```

#### 2. **Tailwind CSS**
```html
<!-- In <head> -->
<script src="https://cdn.tailwindcss.com"></script>
```

#### 3. **jQuery**
```html
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script>
  $(document).ready(function() {
    console.log('jQuery ready!');
  });
</script>
```

#### 4. **Alpine.js** (Lightweight React alternative)
```html
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

<div x-data="{ open: false }">
  <button @click="open = !open">Toggle</button>
  <div x-show="open">Content shown when open</div>
</div>
```

#### 5. **Lucide Icons** (If you saw the error)
```html
<!-- Add this BEFORE using lucide icons -->
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
<script>
  // Initialize icons after page loads
  document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
  });
</script>

<!-- Then use icons -->
<i data-lucide="phone"></i>
<i data-lucide="mail"></i>
```

#### 6. **Font Awesome**
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

<!-- Use icons -->
<i class="fas fa-phone"></i>
<i class="fab fa-instagram"></i>
```

#### 7. **Google Fonts**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">

<style>
  body {
    font-family: 'Inter', sans-serif;
  }
</style>
```

#### 8. **AOS (Animate On Scroll)**
```html
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
<script>
  AOS.init();
</script>

<!-- Use animations -->
<div data-aos="fade-up">This will fade up on scroll</div>
```

---

## Contact Buttons (Copy-Paste Ready)

### Phone
```html
<a href="tel:+919999999999" style="display: inline-block; padding: 15px 30px; background: #3b82f6; color: white; text-decoration: none; border-radius: 8px;">
  📞 Call Now
</a>
```

### WhatsApp
```html
<a href="https://wa.me/919999999999?text=Hi%20I'm%20interested%20in%20your%20services" style="display: inline-block; padding: 15px 30px; background: #10b981; color: white; text-decoration: none; border-radius: 8px;">
  💬 WhatsApp
</a>
```

### Instagram
```html
<a href="https://instagram.com/yourusername" target="_blank" style="display: inline-block; padding: 15px 30px; background: #e1306c; color: white; text-decoration: none; border-radius: 8px;">
  📸 Instagram
</a>
```

### Email
```html
<a href="mailto:your@email.com?subject=Inquiry" style="display: inline-block; padding: 15px 30px; background: #6b7280; color: white; text-decoration: none; border-radius: 8px;">
  📧 Email Us
</a>
```

### Google Maps
```html
<a href="https://goo.gl/maps/your-location" target="_blank" style="display: inline-block; padding: 15px 30px; background: #ef4444; color: white; text-decoration: none; border-radius: 8px;">
  📍 Get Directions
</a>
```

---

## Embedding Content

### YouTube Video
```html
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <iframe 
    src="https://www.youtube.com/embed/VIDEO_ID" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
  </iframe>
</div>
```

### Instagram Post
```html
<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/POST_ID/"></blockquote>
<script async src="//www.instagram.com/embed.js"></script>
```

### Google Maps
```html
<iframe 
  src="https://www.google.com/maps/embed?pb=YOUR_MAP_CODE" 
  width="100%" 
  height="450" 
  style="border:0; border-radius: 8px;" 
  allowfullscreen="" 
  loading="lazy" 
  referrerpolicy="no-referrer-when-downgrade">
</iframe>
```

---

## Common Issues & Solutions

### Issue 1: "lucide is not defined"

**Problem:** You're using Lucide icons but didn't include the library.

**Solution:**
```html
<!-- Add this BEFORE using any lucide icons -->
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
  });
</script>
```

### Issue 2: Scripts Not Running

**Problem:** JavaScript not executing.

**Solution:** Make sure:
1. Scripts are in `<script>` tags
2. External scripts use full URLs (https://...)
3. Scripts are at the bottom of `<body>` or use `defer`

### Issue 3: Styles Not Applying

**Problem:** CSS not working.

**Solution:**
1. Use inline styles: `style="..."`
2. Or include styles in `<style>` tag in `<head>`
3. Or link external CSS with full URL

### Issue 4: Sandbox Warning in Console

**Problem:** "iframe can escape its sandboxing"

**Solution:** **This is now fixed!** You can ignore this warning. It's for security and doesn't affect functionality.

---

## Best Practices

### 1. **Mobile Responsive**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  @media (max-width: 768px) {
    .hero h1 {
      font-size: 2rem;
    }
  }
</style>
```

### 2. **Fast Loading**
- Use CDN links for libraries
- Optimize images (compress before uploading)
- Minimize inline CSS/JS
- Use `defer` or `async` for scripts

### 3. **SEO Friendly**
```html
<head>
  <title>Your Business Name - Kashmir</title>
  <meta name="description" content="Quality products and services in Kashmir">
  <meta name="keywords" content="business, kashmir, services">
</head>
```

### 4. **Contact Buttons Visible**
- Make buttons large (min 15px padding)
- Use bright colors (#3b82f6, #10b981)
- Add icons (📞 💬 📸)
- Place at top and bottom of page

---

## Complete Example

Here's a **production-ready template** you can copy:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kashmir Tech Solutions - Premium IT Services</title>
  <meta name="description" content="Professional IT services and laptop repairs in Srinagar, Kashmir">
  
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  
  <!-- AOS Animations -->
  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
  
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
  </style>
</head>
<body class="bg-gray-50">
  <!-- Hero Section -->
  <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20" data-aos="fade-down">
    <div class="container mx-auto px-4 text-center">
      <h1 class="text-5xl font-bold mb-4">Kashmir Tech Solutions</h1>
      <p class="text-xl mb-8">Premium IT Services & Laptop Repairs</p>
      
      <!-- Contact Buttons -->
      <div class="flex flex-wrap justify-center gap-4">
        <a href="tel:+919999999999" class="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
          <i class="fas fa-phone mr-2"></i> Call Now
        </a>
        <a href="https://wa.me/919999999999" class="bg-green-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600 transition">
          <i class="fab fa-whatsapp mr-2"></i> WhatsApp
        </a>
        <a href="https://instagram.com/yourhandle" class="bg-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-600 transition">
          <i class="fab fa-instagram mr-2"></i> Instagram
        </a>
      </div>
    </div>
  </div>
  
  <!-- Services Section -->
  <div class="container mx-auto px-4 py-16">
    <h2 class="text-3xl font-bold text-center mb-12" data-aos="fade-up">Our Services</h2>
    <div class="grid md:grid-cols-3 gap-8">
      <div class="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-up" data-aos-delay="100">
        <i class="fas fa-laptop text-4xl text-blue-600 mb-4"></i>
        <h3 class="text-xl font-semibold mb-2">Laptop Repair</h3>
        <p class="text-gray-600">Expert repairs for all laptop brands</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-up" data-aos-delay="200">
        <i class="fas fa-code text-4xl text-blue-600 mb-4"></i>
        <h3 class="text-xl font-semibold mb-2">Web Development</h3>
        <p class="text-gray-600">Modern websites for your business</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-up" data-aos-delay="300">
        <i class="fas fa-shield-alt text-4xl text-blue-600 mb-4"></i>
        <h3 class="text-xl font-semibold mb-2">IT Support</h3>
        <p class="text-gray-600">24/7 technical assistance</p>
      </div>
    </div>
  </div>
  
  <!-- Location Section -->
  <div class="bg-white py-16">
    <div class="container mx-auto px-4" data-aos="fade-up">
      <h2 class="text-3xl font-bold text-center mb-8">Visit Us</h2>
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.748!2d74.8!3d34.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDAwJzAwLjAiTiA3NMKwNDgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890" 
        width="100%" 
        height="450" 
        style="border:0; border-radius: 12px;" 
        allowfullscreen="" 
        loading="lazy">
      </iframe>
    </div>
  </div>
  
  <!-- AOS Script -->
  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
  <script>
    AOS.init({
      duration: 800,
      once: true
    });
  </script>
</body>
</html>
```

---

## Summary

✅ **Full HTML documents** support everything (CSS, JS, libraries)  
✅ **HTML snippets** support inline styles and simple scripts  
✅ **External libraries** work (Bootstrap, jQuery, Alpine, etc.)  
✅ **CDN links** fully supported  
✅ **Embedded content** works (YouTube, Instagram, Maps)  
✅ **Sandbox warning** is normal and safe (now fixed)  
✅ **Scripts execute** properly in both modes  

**Need help?** Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common issues.

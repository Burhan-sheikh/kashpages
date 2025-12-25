# 🚀 KashPages Production Checklist

## ✅ Completed Features

### 🏠 Guest Features
- ✅ **Beautiful Homepage** with hero, features, pricing, CTA sections
- ✅ **Explore Page** with all published businesses
- ✅ **Landing Pages** with dynamic HTML rendering
- ✅ **Contact Buttons** (Phone, WhatsApp, Instagram, Maps)
- ✅ **SEO Optimization** with meta tags
- ✅ **Mobile Responsive** Apple-inspired premium design
- ✅ **Unpaid Notice Modal** for temporary published pages
- ✅ **404 Page** with navigation options

### 👤 User Features
- ✅ **User Dashboard** with personalized greeting
- ✅ **My Pages** - View owned pages with status
- ✅ **Payment Status Tracking** - See paid/unpaid, expiry dates
- ✅ **Plan Details** - View all plans and pricing
- ✅ **Account Settings** - Edit profile, view role
- ✅ **Expiry Warnings** - Visual indicators for expired pages
- ✅ **View-Only Access** - Cannot edit (contact admin)

### 🔒 Admin Features
- ✅ **Admin Dashboard** separate from user dashboard
- ✅ **Full Page Editor** with:
  - Create/Edit/Delete pages
  - HTML content editor
  - SEO metadata (title, description, keywords, OG image)
  - Contact info (phone, WhatsApp, Instagram, Maps)
  - Owner assignment
  - Plan selection
  - Publish/Unpublish
  - Preview link
  - Delete confirmation
- ✅ **Payment Management**:
  - Set payment status (isPaid)
  - Set purchase date
  - Set expiry date
  - Separate from content updates
- ✅ **Pages List** with filters (all, published, draft, expired)
- ✅ **Users Management** - View all users and their pages
- ✅ **Role-based Access Control**

### 🔐 Security & Auth
- ✅ **Firebase Authentication** (Email + Google)
- ✅ **Firestore Security Rules**
- ✅ **Protected Routes** (admin-only, user-only)
- ✅ **Role-based Redirects** (admin→/admin, user→/dashboard)
- ✅ **XSS Protection** with DOMPurify

### 🎨 Design
- ✅ **Premium Apple-like Design**
- ✅ **Mobile Responsive** (works on all devices)
- ✅ **Light Theme** with subtle gradients
- ✅ **Smooth Animations** and transitions
- ✅ **Modern UI Components** (Button, Badge, Modal)
- ✅ **Consistent Spacing** and typography

### 🚀 Performance & SEO
- ✅ **Fast Build** with Vite
- ✅ **Esbuild Minification**
- ✅ **robots.txt**
- ✅ **Dynamic Sitemap** (Netlify Function)
- ✅ **Meta Tags** per page
- ✅ **Open Graph** tags
- ✅ **Canonical URLs**

---

## 🛠️ Setup Required (One-Time)

### 1. Deploy Firestore Indexes ⚠️ CRITICAL

```bash
firebase login
firebase deploy --only firestore:indexes
```

**Wait 2-3 minutes** for indexes to build.

**Why needed:** Without indexes, the Explore page will fail with "Missing index" error.

---

### 2. Deploy Firestore Rules

```bash
firebase deploy --only firestore:rules
```

**Why needed:** Protects admin-only operations and ensures users can only access their own data.

---

### 3. Create Admin User

1. **Sign up** on your deployed site (email or Google)
2. **Go to Firebase Console** → Firestore Database
3. Open `users` collection
4. Find your user document (by email)
5. **Edit** the document:
   ```
   role: "user"  →  role: "admin"
   ```
6. **Save**
7. **Log out** and **log back in**
8. You should now see:
   - "Admin Panel" link in header
   - ADMIN badge next to your name
   - Access to `/admin` routes

---

### 4. Set Netlify Environment Variables

Go to Netlify Dashboard → Site Settings → Environment Variables

**Add these variables:**

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_APP_URL=https://your-site.netlify.app
VITE_DOMAIN=kashpages.in
```

**For Sitemap Function (optional but recommended):**

```env
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

**How to get service account key:**
1. Firebase Console → Project Settings → Service Accounts
2. Click "Generate New Private Key"
3. Download JSON file
4. Copy `client_email` and `private_key` to Netlify env vars

---

### 5. Configure Custom Domain (Optional)

**In Netlify:**
1. Site Settings → Domain Management
2. Add custom domain: `kashpages.in`
3. Follow DNS setup instructions

**In GoDaddy (or your DNS provider):**
1. Add CNAME record:
   - Name: `www`
   - Value: `your-site.netlify.app`
2. Add ALIAS/ANAME record:
   - Name: `@`
   - Value: `your-site.netlify.app`

**Wait 24-48 hours** for DNS propagation.

---

## ✅ Production Testing

### Test as Guest
1. Visit homepage → Should see hero, features, pricing
2. Click "Explore Pages" → Should show all published pages (or empty state)
3. Visit any landing page → Should render correctly
4. Click contact buttons → Should open phone/WhatsApp/Instagram/Maps

### Test as User
1. Sign up with new email
2. Should redirect to `/dashboard`
3. Check "My Pages" → Should show empty state
4. Check "Plans" → Should show pricing
5. Check "Account" → Should show profile
6. Try to visit `/admin` → Should redirect to `/dashboard`

### Test as Admin
1. Login with admin account
2. Should redirect to `/admin`
3. See "Admin Panel" in header with ADMIN badge
4. Go to "Pages" → Should list all pages
5. Click "Create Page" → Should open editor
6. Fill in all fields:
   - Title: "Test Business"
   - Slug: "test-business"
   - HTML: `<!DOCTYPE html><html><body><h1>Test Page</h1></body></html>`
   - Meta title: "Test Business"
   - Meta description: "A test business page"
   - Owner: Select yourself
   - Plan: Basic
7. Click "Save Changes" → Should succeed
8. Click "Publish Page" → Should succeed
9. Set payment:
   - Check "Payment Received"
   - Set purchase date: Today
   - Set expiry date: 1 year from now
   - Click "Update Payment Status"
10. Click "Preview" → Should open page in new tab
11. Visit `/explore` → Should show your test page
12. Visit `/test-business` → Should render your HTML

---

## 📝 Content Updates

### Update Contact Information

Search for `+91-XXXX-XXXX` and `admin@kashpages.in` in:
- `src/pages/Home.jsx`
- `src/pages/dashboard/MyPages.jsx`
- `src/pages/dashboard/PlanDetails.jsx`
- `src/pages/dashboard/Account.jsx`
- `src/pages/landing/LandingRenderer.jsx`

Replace with real contact details.

### Update Pricing (if needed)

Edit pricing in:
- `src/pages/Home.jsx` (homepage)
- `src/pages/dashboard/PlanDetails.jsx` (user dashboard)

---

## 🚨 Common Issues & Fixes

### Issue 1: "Failed to load businesses" on Explore page

**Cause:** Missing Firestore indexes

**Fix:**
```bash
firebase deploy --only firestore:indexes
```
Wait 2-3 minutes.

---

### Issue 2: Admin Panel not showing

**Cause:** Role not set in Firestore

**Fix:**
1. Open browser console (F12)
2. Look for: `isAdmin check: { userProfile: ..., result: false }`
3. Go to Firestore → `users` → find your user
4. Change `role: "user"` to `role: "admin"`
5. Log out and log back in
6. Hard refresh (Ctrl+Shift+R)

---

### Issue 3: Build failing on Netlify

**Cause:** Missing dependencies or wrong Node version

**Fix:**
1. Check Netlify build logs
2. Verify `.nvmrc` specifies correct Node version (18.20.8)
3. Run locally: `npm install && npm run build`
4. If passes locally, clear Netlify cache:
   - Deploys → Trigger deploy → Clear cache and deploy

---

### Issue 4: Sitemap not generating

**Cause:** Missing Firebase Admin credentials

**Fix:**
1. Add `FIREBASE_CLIENT_EMAIL` and `FIREBASE_PRIVATE_KEY` to Netlify env vars
2. Redeploy site
3. Visit `https://your-site.netlify.app/sitemap.xml`
4. Should see XML sitemap

---

## 📊 Google Search Console Setup

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `kashpages.in`
3. Verify ownership (DNS or HTML file)
4. Submit sitemap: `https://kashpages.in/sitemap.xml`
5. Wait 2-7 days for Google to index pages

---

## 📦 Firebase Quotas (Free Tier)

**Firestore:**
- 50,000 reads/day
- 20,000 writes/day
- 20,000 deletes/day

**Authentication:**
- Unlimited users
- SMS: 10,000/month (if using phone auth)

**Hosting (not using):**
- N/A (using Netlify)

**Monitor usage:**
Firebase Console → Usage and Billing

---

## ✅ Production Launch Checklist

- [ ] Firestore indexes deployed
- [ ] Firestore rules deployed
- [ ] Admin user created
- [ ] Netlify environment variables set
- [ ] Custom domain configured (optional)
- [ ] Contact info updated in code
- [ ] Firebase Admin credentials added (for sitemap)
- [ ] Test as guest, user, and admin
- [ ] Create first real business page
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor Firebase usage
- [ ] Set up backup/monitoring (optional)

---

## 📞 Support

If you encounter issues:

1. **Check browser console** (F12) for errors
2. **Check Netlify build logs** for deployment errors
3. **Check Firebase Console** for quota/permission issues
4. **Review** `ARCHITECTURE_STATUS.md` for feature details
5. **Review** `QUICK_START.md` for setup steps

---

## 🎉 You're Ready!

Your KashPages platform is now production-ready with:

✅ Beautiful, mobile-responsive design  
✅ Role-based access control  
✅ Full admin dashboard  
✅ User dashboard  
✅ Landing page rendering  
✅ SEO optimization  
✅ Payment tracking  
✅ Secure Firebase backend  

**Start creating landing pages for Kashmir businesses!** 🚀

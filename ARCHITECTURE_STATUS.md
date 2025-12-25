# KashPages Architecture Status

## ✅ Fully Implemented

### User Roles & Authentication
- ✅ **Guest** - Can explore and view published pages
- ✅ **Logged-in User** - Can view their owned pages
- ✅ **Admin** - Full CRUD access to all pages and users
- ✅ **Role-based redirects** - Admin → /admin, User → /dashboard
- ✅ **Firebase Authentication** (Email + Google)

### Admin Features
- ✅ **Full Page Editor** (`/admin/pages/:id/edit`)
  - Create/Edit/Delete pages
  - Edit HTML content
  - SEO metadata (title, description, keywords, OG image)
  - Contact info (phone, WhatsApp, Instagram, Maps)
  - Assign owner (from user list)
  - Set plan (basic, standard, custom)
  - Publish/Unpublish
  - Preview link
  - Delete confirmation modal

- ✅ **Payment Management** (Admin-only)
  - Set `isPaid` status
  - Set `purchaseDate`
  - Set `expiryDate`
  - Separate from content updates
  - Payment history tracked via `lastPaymentUpdatedAt`

- ✅ **Pages List** (`/admin/pages`)
  - View all pages
  - Status badges (published, draft, expired)
  - Payment status indicators
  - Edit links
  - Preview links
  - Expiry date warnings

- ✅ **Users Management** (`/admin/users`)
  - View all users
  - See owned pages
  - User details

### User Dashboard
- ✅ **My Pages** (`/dashboard/pages`)
  - View owned pages only
  - See plan details
  - See payment status
  - See expiry dates
  - Cannot edit (must contact admin)

- ✅ **Plans** (`/dashboard/plans`)
  - View plan information
  - Pricing details
  - No checkout (contact-based)

- ✅ **Account** (`/dashboard/account`)
  - Profile settings

### Public Features
- ✅ **Homepage** (`/`)
  - KashPages introduction
  - CTA to explore

- ✅ **Explore** (`/explore`)
  - All published pages
  - SEO indexable
  - Error handling with Firebase index links

- ✅ **Landing Pages** (`/:businessSlug`)
  - Renders raw HTML
  - SEO meta tags injection
  - Contact buttons
  - Status-based display

### Data Models
- ✅ **Pages Collection** (Firestore)
  ```
  {
    id, title, slug, html,
    meta: { title, description, keywords, ogImage, phone, whatsapp, instagram, mapUrl },
    status: 'draft' | 'published' | 'expired',
    plan: 'basic' | 'standard' | 'custom',
    ownerId, isPaid, purchaseDate, expiryDate,
    createdAt, updatedAt, lastPaymentUpdatedAt
  }
  ```

- ✅ **Users Collection** (Firestore)
  ```
  {
    uid, name, email, role: 'user' | 'admin',
    ownedPages, createdAt
  }
  ```

### Security
- ✅ **Firestore Rules** (`firestore.rules`)
  - Only admins can create/edit pages
  - Only admins can change payment status
  - Users can only read their own pages
  - Guests can only read published pages

- ✅ **Route Protection** (`ProtectedRoute.jsx`)
  - Admin routes require `role === 'admin'`
  - Non-admins redirected to `/dashboard`
  - Unauthenticated redirected to `/login`

### SEO
- ✅ **Meta Tags** (per page)
  - `<title>`
  - `<meta name="description">`
  - `<meta name="keywords">`
  - Open Graph tags
  - Twitter Card tags
  - Canonical URL

### Error Handling
- ✅ **Firestore Index Errors**
  - Shows Firebase console link
  - "Create Index" button
  - Manual instructions

- ✅ **Admin Detection Logs**
  - Console logs for debugging role issues
  - Visual ADMIN badge

---

## ⚠️ Partially Implemented / Needs Review

### Landing Page Rendering
- ⚠️ **Unpaid Notice Modal**
  - Logic exists in `pages.service.js`
  - Modal component may need to be added to `LandingRenderer.jsx`
  - Should show: "This page is temporarily published for review..."
  - Triggered when: `status === 'published' && isPaid === false`

### Sitemap Generation
- ⚠️ **Auto-generated Sitemap** (`/sitemap.xml`)
  - Not yet implemented
  - Should include only published pages
  - Can be generated with Netlify plugin or custom script

### robots.txt
- ⚠️ **Search Engine Directives**
  - Not yet added to `/public/robots.txt`
  - Should allow all crawling

### Global Notices
- ⚠️ **Admin-controlled Notices**
  - Settings for global notices not implemented
  - Footer disclaimers exist but not admin-editable

---

## ❌ Not Yet Implemented

### Auto-expiry System
- ❌ **Automatic Status Updates**
  - No cron job or Cloud Function to check `expiryDate`
  - Pages don't auto-change from `published` → `expired`
  - **Solution:** Firebase Cloud Function (scheduled) or manual admin check

### Admin Settings Page
- ❌ **Global Platform Settings** (`/admin/settings`)
  - Edit global SEO defaults
  - Edit notice modal text
  - Platform-wide announcements

### User Page Request
- ❌ **Request New Page** (User dashboard)
  - Users can't request pages from dashboard
  - Currently must contact admin externally
  - Could add a form that creates a draft page for admin review

### Analytics
- ❌ **Page View Tracking**
  - No analytics integration
  - Could add Google Analytics or simple Firestore counter

### Notifications
- ❌ **Email Notifications**
  - No email sent when page expires
  - No email sent when page is published
  - Could use SendGrid + Cloud Functions

---

## 🛠️ Required Setup Steps

### 1. Deploy Firestore Indexes (CRITICAL)
```bash
firebase deploy --only firestore:indexes
```
Without this, `/explore` will fail.

### 2. Deploy Firestore Rules
```bash
firebase deploy --only firestore:rules
```
Protects admin-only operations.

### 3. Create First Admin User
1. Sign up in app
2. Go to Firebase Console → Firestore → `users` collection
3. Find your user document
4. Change `role: "user"` → `role: "admin"`
5. Log out and back in

### 4. Verify Environment Variables (Netlify)
Ensure all Firebase config vars are set:
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_APP_URL
VITE_DOMAIN
```

---

## 👁️ What to Check / Fix

### Potential Issues:

1. **Admin not showing after role change?**
   - Check browser console for logs: `isAdmin check:`
   - Hard refresh (Ctrl+Shift+R)
   - Clear localStorage and re-login

2. **Explore page failing?**
   - Deploy Firestore indexes
   - Check error message for Firebase link
   - Click "Create Index" button in error

3. **Can't edit pages?**
   - Verify admin role in Firestore
   - Check Firestore rules are deployed
   - Check browser console for permission errors

4. **Landing pages not rendering?**
   - Check `LandingRenderer.jsx` is receiving page data
   - Verify slug matches Firestore `slug` field
   - Check page status is `published`

5. **Payment dates not saving?**
   - Use the "Update Payment Status" button (separate from Save)
   - Check `lastPaymentUpdatedAt` field is updating

---

## 🚀 Next Steps (Priority Order)

1. **Test complete admin flow:**
   - Create page → Save as draft
   - Publish → Set owner
   - Mark as paid → Set dates
   - Preview page
   - Edit content
   - Unpublish

2. **Add unpaid notice modal** to `LandingRenderer.jsx`

3. **Generate sitemap** (Netlify plugin or build script)

4. **Add robots.txt** to `/public/`

5. **Test user dashboard** with non-admin account

6. **Consider auto-expiry** (Cloud Function or cron)

7. **Add admin settings page** for global notices

---

## 📚 Reference Files

| Feature | File |
|---------|------|
| Admin Page Editor | `src/pages/admin/PageEditor.jsx` |
| Pages List | `src/pages/admin/PagesList.jsx` |
| User Dashboard | `src/pages/dashboard/DashboardLayout.jsx` |
| Admin Dashboard | `src/pages/admin/AdminLayout.jsx` |
| Landing Renderer | `src/pages/landing/LandingRenderer.jsx` |
| Auth Hook | `src/hooks/useAuth.js` |
| Pages Service | `src/firebase/pages.service.js` |
| Firestore Rules | `firestore.rules` |
| Firestore Indexes | `firestore.indexes.json` |
| Routes | `src/app/Router.jsx` |
| Protected Routes | `src/app/ProtectedRoute.jsx` |

---

**Last Updated:** December 25, 2025

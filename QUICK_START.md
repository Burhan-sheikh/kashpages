# KashPages Quick Start Guide

## Step 1: Deploy Firestore Indexes (REQUIRED)

The app needs Firestore indexes to query pages. Without them, the Explore page will fail.

### Option A: Automatic (Recommended)

```bash
# Install Firebase CLI if you haven't
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize (if not done)
firebase init firestore
# Select your project
# Use existing firestore.rules and firestore.indexes.json

# Deploy indexes
firebase deploy --only firestore:indexes
```

**Wait 2-3 minutes** for indexes to build, then refresh your app.

### Option B: Manual (If CLI doesn't work)

1. Open Firebase Console: https://console.firebase.google.com
2. Select your project
3. Go to **Firestore Database** → **Indexes**
4. Click **Add Index**
5. Create these indexes:

#### Index 1: Published Pages Query
- Collection: `pages`
- Fields:
  - `status` (Ascending)
  - `createdAt` (Descending)

#### Index 2: User Pages Query
- Collection: `pages`
- Fields:
  - `ownerId` (Ascending)
  - `createdAt` (Descending)

#### Index 3: Users List Query
- Collection: `users`
- Fields:
  - `createdAt` (Descending)

Wait 2-3 minutes for indexes to build.

---

## Step 2: Create Admin User

You need to manually set the admin role in Firestore.

### Steps:

1. **Create account in your app:**
   - Go to your deployed site
   - Click **Login** → **Sign Up**
   - Create account with your email
   - OR use **Continue with Google**

2. **Get your Firebase UID:**
   - Go to Firebase Console
   - **Authentication** → **Users**
   - Find your email
   - Copy the **User UID** (long string)

3. **Set admin role in Firestore:**
   - Go to **Firestore Database**
   - Click on `users` collection
   - Find the document with your UID
   - Click to edit
   - Change `role` field from `"user"` to `"admin"`
   - Save

4. **Verify:**
   - Log out and log back in
   - You should see **"Admin Panel"** link in header
   - You should see **ADMIN** badge next to your name
   - Navigate to `/admin` - should work

---

## Step 3: Deploy Security Rules

```bash
firebase deploy --only firestore:rules
```

This ensures:
- Only admins can create/edit pages
- Only admins can manage payment status
- Users can only see their own pages
- Guests can only see published pages

---

## Step 4: Test Your Setup

### Test 1: Admin Access
1. Login with admin account
2. Go to `/admin`
3. Should see "Admin Panel" with:
   - Pages list (empty initially)
   - Users list (showing you)

### Test 2: Explore Page
1. Go to `/explore`
2. Should see "No published pages yet" (not an error)
3. If you see an error with a link, click it to create the index

### Test 3: Create First Page (Admin Only)
1. Go to `/admin/pages`
2. Click **Create Page**
3. Fill in:
   - Title: "Test Business"
   - Slug: "test"
   - HTML: `<div><h1>Test Page</h1></div>`
   - Meta title: "Test Business"
   - Meta description: "A test page"
4. Save as draft
5. Publish
6. Visit `https://your-domain.netlify.app/test`
7. Should see your test page

---

## Troubleshooting

### Admin Panel Not Showing

**Symptom:** Logged in but no "Admin Panel" link

**Fix:**
1. Open browser console (F12)
2. Check for logs: `User profile loaded:` and `isAdmin check:`
3. Verify `role: "admin"` in Firestore `users/{your-uid}` document
4. Log out and log back in
5. Hard refresh (Ctrl+Shift+R)

### Explore Page Error

**Symptom:** "Failed to load pages" or index error

**Fix:**
1. Check the error message for a Firebase link
2. Click the link to create index automatically
3. OR deploy indexes: `firebase deploy --only firestore:indexes`
4. Wait 2-3 minutes
5. Refresh page

### "Permission Denied" Errors

**Symptom:** Can't read/write to Firestore

**Fix:**
1. Deploy security rules: `firebase deploy --only firestore:rules`
2. Verify your account has `role: "admin"` in Firestore
3. Check Firebase Console → Firestore → Rules tab

### Build Errors on Netlify

**Already Fixed:**
- ✅ Missing dependencies (react-helmet-async, dompurify, lucide-react)
- ✅ Terser error (switched to esbuild)

**If still failing:**
1. Check Netlify build logs
2. Clear cache: Deploys → Trigger deploy → Clear cache and deploy
3. Verify environment variables are set

---

## Environment Variables (Netlify)

Make sure these are set in Netlify dashboard:

```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_APP_URL=https://your-site.netlify.app
VITE_DOMAIN=kashpages.in
```

---

## Next Steps

Once everything is working:

1. **Create real pages** for clients via Admin Panel
2. **Set up custom domain** (kashpages.in) in Netlify
3. **Submit sitemap** to Google Search Console
4. **Monitor Firebase usage** (Firestore quotas)

---

## Quick Command Reference

```bash
# Deploy everything
firebase deploy

# Deploy only indexes
firebase deploy --only firestore:indexes

# Deploy only rules
firebase deploy --only firestore:rules

# Local development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

**Need Help?** Check browser console logs (F12) for detailed error messages with Firebase links.

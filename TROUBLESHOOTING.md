# 🔧 KashPages Troubleshooting Guide

## Issue 1: CSS Errors in Browser Console

### Symptoms
```
Uncaught (in promise) Error: Could not establish connection. Receiving end does not exist.
at y (content-all.js:1:57697)
```

### Cause
This error comes from **browser extensions** (like Grammarly, ad blockers, etc.) trying to inject scripts into the page. It's NOT an error from your code.

### Solutions

#### Option 1: Ignore (Recommended)
- This error doesn't affect functionality
- It's from external browser extensions
- Your page works perfectly fine

#### Option 2: Test in Incognito Mode
- Open your page in **Incognito/Private** mode
- Extensions are disabled by default
- Error should disappear

#### Option 3: Full HTML Pages (Implemented)
For landing pages with complete HTML documents:
- Now renders in an **isolated iframe**
- Extensions can't interfere with iframe content
- Automatically detected when HTML contains `<!DOCTYPE>` or `<html>` tags

---

## Issue 2: Published Pages Not Accessible

### Symptoms
- Admin can see pages
- Guest/User gets "Page not found" or permission error
- Explore page is empty

### Cause
Missing Firestore indexes or incorrect firestore rules.

### Solutions

#### Step 1: Deploy Firestore Indexes ⚠️ CRITICAL

```bash
firebase login
firebase deploy --only firestore:indexes
```

**Wait 2-3 minutes** for indexes to build.

**Why:** Firestore needs indexes for queries with `where()` and `orderBy()` together.

#### Step 2: Deploy Firestore Rules

```bash
firebase deploy --only firestore:rules
```

**Why:** Rules control who can read/write data.

#### Step 3: Verify in Firebase Console

1. Go to **Firebase Console** → **Firestore Database** → **Indexes**
2. Check status:
   - ✅ Green = Building or Ready
   - ❌ Red = Error
3. If red, click the error to see details
4. Follow the link to create index

#### Step 4: Test Access

**Test as Guest (No Login):**
1. Open incognito window
2. Go to `https://your-site.com/explore`
3. Should see published pages
4. Click a page → Should load

**If still doesn't work:**
- Check browser console for errors
- Look for "permission-denied" or "index" errors
- See [Error Messages](#common-error-messages) below

---

## Issue 3: "Permission Denied" Errors

### Symptoms
```
FirebaseError: Missing or insufficient permissions
```

### Cause
Firestore security rules are blocking access.

### Check Current Rules

1. Firebase Console → Firestore Database → Rules
2. Should see:

```javascript
// Pages Collection
match /pages/{pageId} {
  // ✅ Guests can read published pages
  allow read: if resource.data.status == 'published';
  
  // ✅ Only admin can write
  allow create, update, delete: if isAdmin();
}
```

### Fix Rules

If rules are different, replace with correct version:

```bash
firebase deploy --only firestore:rules
```

---

## Issue 4: Landing Page Not Rendering

### Symptoms
- Page URL loads but shows blank/broken
- HTML not displaying correctly
- Styles not applying

### Solutions

#### For Complete HTML Documents

Your HTML should include:
```html
<!DOCTYPE html>
<html>
<head>
  <title>Your Page</title>
  <style>
    /* Your CSS here */
  </style>
</head>
<body>
  <!-- Your content here -->
</body>
</html>
```

**System will automatically:**
- Detect full HTML document
- Render in isolated iframe
- Prevent extension interference

#### For HTML Snippets

Your HTML can be just:
```html
<div class="container">
  <h1>My Business</h1>
  <p>Description...</p>
</div>
```

**System will:**
- Render directly in page
- Add KashPages footer
- Apply Tailwind styles if needed

---

## Issue 5: Indexes Building Forever

### Symptoms
- Indexes show "Building" for > 5 minutes
- Pages still not loading

### Solutions

#### Check Index Status

```bash
firebase firestore:indexes
```

Should show:
```
Index for collection: pages
Status: READY
```

#### If Stuck:

1. **Cancel and Recreate:**
   - Firebase Console → Indexes
   - Delete stuck index
   - Redeploy: `firebase deploy --only firestore:indexes`

2. **Manual Creation:**
   - Go to error link in Explore page
   - Click "Create Index"
   - Wait 2-3 minutes

---

## Issue 6: Explore Page Shows "Failed to Load"

### Debug Steps

#### 1. Open Browser Console (F12)

Look for errors:

**Error A: Missing Index**
```
FirebaseError: The query requires an index.
You can create it here: https://console.firebase.google.com/...
```

**Fix:** Click the link or deploy indexes

**Error B: Permission Denied**
```
FirebaseError: Missing or insufficient permissions
```

**Fix:** Deploy firestore rules

**Error C: Network Error**
```
Failed to fetch
```

**Fix:** Check Firebase project status

#### 2. Test Firestore Directly

Firebase Console → Firestore Database → Data:
1. Open `pages` collection
2. Find a document
3. Check `status` field = `"published"`
4. If no documents, create a test page as admin

#### 3. Test Query

In browser console:
```javascript
// Test if Firestore is working
import { getPublishedPages } from './firebase/pages.service'
getPublishedPages().then(console.log).catch(console.error)
```

---

## Issue 7: Admin Can't See Dashboard

### Symptoms
- Logged in but redirected to `/dashboard` instead of `/admin`
- No "Admin Panel" link in header

### Cause
User role is not set to "admin" in Firestore.

### Fix

1. **Firebase Console** → Firestore Database → `users` collection
2. Find your user document (by email or UID)
3. **Edit** document:
   ```
   role: "user"  →  role: "admin"
   ```
4. **Save**
5. **Log out** and **log back in**
6. **Hard refresh** page (Ctrl+Shift+R or Cmd+Shift+R)

### Verify

Should now see:
- Header shows "Admin Panel" link
- ADMIN badge next to name
- Redirects to `/admin` after login

---

## Issue 8: Netlify Build Failing

### Common Causes

#### Error: "Module not found"
```
Error: Cannot find module 'firebase'
```

**Fix:**
1. Check `package.json` has all dependencies
2. Netlify → Site Settings → Build & Deploy → Clear cache
3. Trigger new deploy

#### Error: "Export not found"
```
"functionName" is not exported by "file.js"
```

**Fix:**
1. Check function is exported in service file
2. Check import statement matches export name
3. Commit and push fix

---

## Common Error Messages

### 1. Index Error
```
The query requires an index. You can create it here: https://...
```

**Quick Fix:**
```bash
firebase deploy --only firestore:indexes
```

### 2. Permission Error
```
Missing or insufficient permissions
```

**Quick Fix:**
```bash
firebase deploy --only firestore:rules
```

### 3. Not Found Error
```
Page not found or unavailable
```

**Check:**
- Is page published? (status = "published")
- Is slug correct?
- Does page exist in Firestore?

### 4. Connection Error
```
Could not establish connection
```

**Cause:** Browser extension  
**Fix:** Ignore or test in incognito

---

## Testing Checklist

### As Guest (Incognito)
- [ ] Can view homepage
- [ ] Can view Explore page
- [ ] Can see published pages list
- [ ] Can click and view landing page
- [ ] Contact buttons work (phone, WhatsApp, etc.)
- [ ] No console errors (except extension warnings)

### As User
- [ ] Can sign up/login
- [ ] Redirects to `/dashboard`
- [ ] Can view "My Pages"
- [ ] Can view account settings
- [ ] Cannot access `/admin` (redirects away)

### As Admin
- [ ] Login redirects to `/admin`
- [ ] Can see "Admin Panel" in header
- [ ] Can create page
- [ ] Can edit page
- [ ] Can publish page
- [ ] Can manage payment status
- [ ] Can preview page (opens in new tab)
- [ ] Can delete page
- [ ] Published page shows on Explore
- [ ] Guest can view published page

---

## Getting Help

### 1. Check Logs

**Browser Console (F12):**
- See JavaScript errors
- See network requests
- See Firebase errors

**Netlify Build Logs:**
- Deploys → Click deploy → View logs
- Look for error messages
- Note line numbers

**Firebase Console:**
- Usage tab → Check quotas
- Firestore → Check data
- Authentication → Check users

### 2. Common Solutions

90% of issues are fixed by:
1. Deploying indexes: `firebase deploy --only firestore:indexes`
2. Setting admin role in Firestore
3. Hard refresh browser (Ctrl+Shift+R)
4. Testing in incognito mode

### 3. Debug Information to Collect

If issue persists:
- Browser console errors (screenshot)
- Netlify build logs (if deploy fails)
- Firebase errors (from console)
- Steps to reproduce
- User role (admin/user/guest)

---

## Quick Reference

### Important Commands

```bash
# Deploy everything
firebase deploy

# Deploy only indexes
firebase deploy --only firestore:indexes

# Deploy only rules
firebase deploy --only firestore:rules

# Check index status
firebase firestore:indexes

# Local development
npm run dev

# Build locally
npm run build
```

### Important URLs

- Firebase Console: https://console.firebase.google.com
- Netlify Dashboard: https://app.netlify.com
- Your Site: https://kashpages.in (or your domain)
- GitHub Repo: https://github.com/Burhan-sheikh/kashpages

### File Locations

- Firestore Rules: `firestore.rules`
- Firestore Indexes: `firestore.indexes.json`
- Landing Renderer: `src/pages/landing/LandingRenderer.jsx`
- Explore Page: `src/pages/Explore.jsx`
- Pages Service: `src/firebase/pages.service.js`

---

**Remember:** Most issues are configuration-related, not code bugs. Double-check Firebase setup first! 🔥

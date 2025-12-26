# Firestore Database Schema

This document defines the complete Firestore database structure for KashPages.

---

## Collections Overview

```
firestore/
├── users/              # User accounts
├── pages/              # Landing pages
└── settings/           # Global platform settings
```

---

## Collection: `users`

**Purpose:** Store user account information

### Document Structure

```typescript
{
  // Document ID = Firebase Auth UID
  
  // Basic Info
  name: string,              // User's full name
  email: string,             // User's email (from Firebase Auth)
  role: 'user' | 'admin',    // User role
  
  // Metadata
  createdAt: string,         // ISO 8601 timestamp
  updatedAt: string,         // ISO 8601 timestamp
  
  // Optional
  phone?: string,            // Contact number
  businessName?: string      // If they're a business owner
}
```

### Example Document

```json
{
  "name": "Ahmad Khan",
  "email": "ahmad@example.com",
  "role": "user",
  "phone": "+91-9999999999",
  "businessName": "Kashmir Electronics",
  "createdAt": "2025-12-26T07:30:00.000Z",
  "updatedAt": "2025-12-26T07:30:00.000Z"
}
```

### Security Rules

```javascript
// Users can read their own data
match /users/{userId} {
  allow read: if request.auth != null && request.auth.uid == userId;
  allow read: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
  allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
}
```

---

## Collection: `pages`

**Purpose:** Store landing page data

### Document Structure

```typescript
{
  // Basic Info
  title: string,                  // Page title (e.g., "Kashmir Electronics")
  slug: string,                   // URL slug (e.g., "kashmir-electronics")
  ownerId: string,                // Firebase Auth UID of owner
  ownerEmail: string,             // Owner's email (for reference)
  
  // Content
  content: string,                // HTML content (Phase 3)
  metaDescription?: string,       // SEO meta description
  
  // Plan & Payment
  planName: string,               // "Basic" | "Standard" | "Custom"
  isPaid: boolean,                // Payment status
  purchaseDate: string,           // ISO 8601 timestamp
  expiryDate: string,             // ISO 8601 timestamp (1 year from purchase)
  
  // Status
  published: boolean,             // Is the page live?
  status: 'draft' | 'active' | 'expired',
  
  // SEO
  seoTitle?: string,              // Custom SEO title
  ogImage?: string,               // Open Graph image URL
  
  // Metadata
  createdAt: string,              // ISO 8601 timestamp
  updatedAt: string,              // ISO 8601 timestamp
  lastPaymentUpdatedAt?: string,  // When payment status last changed
  
  // Audit
  createdBy: string,              // Admin UID who created
  lastEditedBy?: string           // Admin UID who last edited
}
```

### Example Document

```json
{
  "title": "Kashmir Electronics",
  "slug": "kashmir-electronics",
  "ownerId": "abc123xyz",
  "ownerEmail": "ahmad@example.com",
  "content": "<div class='container'>...</div>",
  "metaDescription": "Best electronics store in Srinagar, Kashmir. Laptops, mobiles, and accessories.",
  
  "planName": "Standard",
  "isPaid": true,
  "purchaseDate": "2025-12-01T00:00:00.000Z",
  "expiryDate": "2026-12-01T00:00:00.000Z",
  
  "published": true,
  "status": "active",
  
  "seoTitle": "Kashmir Electronics - Best Laptop & Mobile Store Srinagar",
  "ogImage": "https://example.com/og-image.jpg",
  
  "createdAt": "2025-12-01T10:00:00.000Z",
  "updatedAt": "2025-12-20T15:30:00.000Z",
  "lastPaymentUpdatedAt": "2025-12-01T10:00:00.000Z",
  
  "createdBy": "admin-uid-123",
  "lastEditedBy": "admin-uid-123"
}
```

### Security Rules

```javascript
// Users can read their own pages
// Everyone can read published pages
match /pages/{pageId} {
  allow read: if resource.data.published == true;  // Public can read published
  allow read: if request.auth != null && request.auth.uid == resource.data.ownerId;  // Owners can read their own
  allow read: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';  // Admins can read all
  allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';  // Only admins can write
}
```

---

## Collection: `settings`

**Purpose:** Global platform settings

### Document: `global`

```typescript
{
  // Notice Modal
  noticeEnabled: boolean,           // Show notice on unpaid pages?
  noticeTitle: string,              // Notice modal title
  noticeMessage: string,            // Notice modal message
  noticeContactPhone: string,       // Contact phone in notice
  noticeContactWhatsApp: string,    // WhatsApp number
  
  // Platform Info
  platformName: string,             // "KashPages"
  platformEmail: string,            // Contact email
  platformPhone: string,            // Contact phone
  platformWhatsApp: string,         // WhatsApp number
  
  // Defaults
  defaultOgImage: string,           // Default OG image URL
  
  // Metadata
  updatedAt: string,                // ISO 8601 timestamp
  updatedBy: string                 // Admin UID who last updated
}
```

### Example Document

```json
{
  "noticeEnabled": true,
  "noticeTitle": "Page Payment Required",
  "noticeMessage": "This page is published but payment is pending. Contact us to complete your subscription.",
  "noticeContactPhone": "+91-9999999999",
  "noticeContactWhatsApp": "919999999999",
  
  "platformName": "KashPages",
  "platformEmail": "hello@kashpages.in",
  "platformPhone": "+91-9999999999",
  "platformWhatsApp": "919999999999",
  
  "defaultOgImage": "https://kashpages.in/og-default.jpg",
  
  "updatedAt": "2025-12-26T07:30:00.000Z",
  "updatedBy": "admin-uid-123"
}
```

### Security Rules

```javascript
// Anyone can read settings (for notice modal)
// Only admins can write
match /settings/{settingId} {
  allow read: if true;
  allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
}
```

---

## Complete Security Rules

**File:** `firestore.rules`

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function to check if user is admin
    function isAdmin() {
      return request.auth != null && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Helper function to check if user owns resource
    function isOwner(ownerId) {
      return request.auth != null && request.auth.uid == ownerId;
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null && 
                     (request.auth.uid == userId || isAdmin());
      allow write: if isAdmin();
    }
    
    // Pages collection
    match /pages/{pageId} {
      allow read: if resource.data.published == true ||  // Published pages are public
                     isOwner(resource.data.ownerId) ||   // Owners can read their pages
                     isAdmin();                          // Admins can read all
      allow create, update, delete: if isAdmin();        // Only admins can write
    }
    
    // Settings collection
    match /settings/{settingId} {
      allow read: if true;           // Public read (for notice modal)
      allow write: if isAdmin();     // Admin only write
    }
  }
}
```

---

## Indexes

### Composite Indexes Required

1. **Pages - By Owner & Creation Date**
   ```
   Collection: pages
   Fields: ownerId (Ascending), createdAt (Descending)
   ```

2. **Pages - By Published & Creation Date**
   ```
   Collection: pages
   Fields: published (Ascending), createdAt (Descending)
   ```

3. **Pages - By Status & Expiry**
   ```
   Collection: pages
   Fields: status (Ascending), expiryDate (Ascending)
   ```

### Single-Field Indexes (Auto-created)

- `users.email`
- `users.role`
- `users.createdAt`
- `pages.slug` (unique)
- `pages.ownerId`
- `pages.published`
- `pages.isPaid`
- `pages.status`
- `pages.expiryDate`

---

## Data Validation

### Slug Rules
- Lowercase only
- Alphanumeric + hyphens
- No spaces
- Must be unique
- 3-50 characters

### Date Format
- ISO 8601: `YYYY-MM-DDTHH:mm:ss.sssZ`
- Always UTC
- Example: `2025-12-26T07:30:00.000Z`

### Required Fields

**Users:**
- `email`, `role`, `createdAt`

**Pages:**
- `title`, `slug`, `ownerId`, `ownerEmail`, `planName`, `isPaid`, `published`, `status`, `createdAt`

---

## Migration Scripts

### Create Initial Admin User

```javascript
// Run in Firebase Console
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

async function createAdmin() {
  await db.collection('users').doc('YOUR_UID').set({
    name: 'Admin',
    email: 'admin@kashpages.in',
    role: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  console.log('Admin user created!');
}

createAdmin();
```

### Initialize Global Settings

```javascript
async function initSettings() {
  await db.collection('settings').doc('global').set({
    noticeEnabled: true,
    noticeTitle: 'Page Payment Required',
    noticeMessage: 'This page is published but payment is pending. Contact us to complete your subscription.',
    noticeContactPhone: '+91-9999999999',
    noticeContactWhatsApp: '919999999999',
    platformName: 'KashPages',
    platformEmail: 'hello@kashpages.in',
    platformPhone: '+91-9999999999',
    platformWhatsApp: '919999999999',
    defaultOgImage: 'https://kashpages.in/og-default.jpg',
    updatedAt: new Date().toISOString(),
    updatedBy: 'ADMIN_UID'
  });
  console.log('Settings initialized!');
}

initSettings();
```

---

## Phase-by-Phase Usage

### Phase 2 (Current)
- `users` collection: Read/list
- `pages` collection: Schema ready, empty
- Basic security rules

### Phase 3
- `pages` collection: Create, publish, render
- `content` field: Full HTML
- Slug generation

### Phase 4
- Expiry automation
- Payment tracking
- Status updates

### Phase 5
- Template system
- Content blocks
- Custom HTML overrides

---

**Status:** ✅ Phase 2 Complete - Schema Defined & Ready

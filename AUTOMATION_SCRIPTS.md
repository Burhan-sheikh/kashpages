# Automation Scripts for KashPages

This document contains scripts for automating expiry checks, email notifications, and payment reminders.

---

## Overview

### Automation Options

1. **Firebase Cloud Functions** (Recommended)
   - Serverless, scalable
   - Integrated with Firebase
   - Automatically triggered

2. **Scheduled Netlify Functions**
   - Works with Netlify hosting
   - Cron-based scheduling
   - Good for static site + serverless

3. **Node.js Cron Jobs**
   - Self-hosted option
   - Full control
   - Requires server

---

## Option 1: Firebase Cloud Functions (Recommended)

### Setup

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Initialize Firebase Functions
firebase init functions

# Install dependencies
cd functions
npm install firebase-admin
npm install nodemailer  # For email sending
```

### Script 1: Daily Expiry Check

**File:** `functions/index.js`

```javascript
const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

const db = admin.firestore()

// Run daily at 9 AM IST
exports.checkExpiringPages = functions.pubsub
  .schedule('0 9 * * *')
  .timeZone('Asia/Kolkata')
  .onRun(async (context) => {
    console.log('Running daily expiry check...')
    
    const now = new Date()
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(now.getDate() + 30)
    
    try {
      // Get all published pages
      const pagesSnapshot = await db
        .collection('pages')
        .where('published', '==', true)
        .where('isPaid', '==', true)
        .get()
      
      const expiringPages = []
      const expiredPages = []
      
      pagesSnapshot.forEach(doc => {
        const page = { id: doc.id, ...doc.data() }
        
        if (!page.expiryDate) return
        
        const expiryDate = new Date(page.expiryDate)
        const daysRemaining = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24))
        
        // Already expired
        if (daysRemaining < 0) {
          expiredPages.push({ ...page, daysRemaining })
        }
        // Expiring in 30 days or less
        else if (daysRemaining <= 30) {
          expiringPages.push({ ...page, daysRemaining })
        }
      })
      
      console.log(`Found ${expiringPages.length} expiring pages`)
      console.log(`Found ${expiredPages.length} expired pages`)
      
      // Update status for expired pages
      for (const page of expiredPages) {
        await db.collection('pages').doc(page.id).update({
          status: 'expired'
        })
      }
      
      // TODO: Send emails to page owners
      // await sendExpiryEmails(expiringPages)
      
      return null
    } catch (error) {
      console.error('Error in expiry check:', error)
      return null
    }
  })

// Automatically update status when a page is created/updated
exports.updatePageStatus = functions.firestore
  .document('pages/{pageId}')
  .onWrite(async (change, context) => {
    const page = change.after.exists ? change.after.data() : null
    
    if (!page) return null
    
    // Calculate status
    let newStatus = 'draft'
    
    if (page.published) {
      const now = new Date()
      const expiryDate = page.expiryDate ? new Date(page.expiryDate) : null
      const isExpired = expiryDate && expiryDate < now
      
      if (isExpired) {
        newStatus = 'expired'
      } else if (!page.isPaid) {
        newStatus = 'unpaid'
      } else {
        newStatus = 'active'
      }
    }
    
    // Only update if status changed
    if (page.status !== newStatus) {
      await change.after.ref.update({ status: newStatus })
    }
    
    return null
  })
```

### Script 2: Email Notifications

**Add to** `functions/index.js`

```javascript
const nodemailer = require('nodemailer')

// Configure email transporter (example with Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().email.user,
    pass: functions.config().email.password
  }
})

// Alternative: SendGrid
// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(functions.config().sendgrid.key)

async function sendExpiryEmail(page, daysRemaining) {
  const settingsDoc = await db.collection('settings').doc('global').get()
  const settings = settingsDoc.data()
  
  // Get user email
  const userDoc = await db.collection('users').doc(page.ownerId).get()
  const user = userDoc.data()
  
  if (!user || !user.email) return
  
  const subject = daysRemaining > 0
    ? `Your KashPages subscription expires in ${daysRemaining} days`
    : 'Your KashPages subscription has expired'
  
  const message = daysRemaining > 0
    ? `Hello ${user.name},\n\nYour page "${page.title}" (${page.slug}) will expire on ${new Date(page.expiryDate).toLocaleDateString()}.\n\nTo renew, please contact us:\nPhone: ${settings.platformPhone}\nWhatsApp: https://wa.me/${settings.platformWhatsApp}\nEmail: ${settings.platformEmail}\n\nThank you,\nKashPages Team`
    : `Hello ${user.name},\n\nYour page "${page.title}" (${page.slug}) has expired.\n\nTo renew, please contact us immediately:\nPhone: ${settings.platformPhone}\nWhatsApp: https://wa.me/${settings.platformWhatsApp}\nEmail: ${settings.platformEmail}\n\nThank you,\nKashPages Team`
  
  const mailOptions = {
    from: settings.platformEmail,
    to: user.email,
    subject: subject,
    text: message
  }
  
  try {
    await transporter.sendMail(mailOptions)
    console.log(`Expiry email sent to ${user.email}`)
  } catch (error) {
    console.error(`Error sending email to ${user.email}:`, error)
  }
}

exports.sendExpiryEmails = functions.pubsub
  .schedule('0 9 * * *')
  .timeZone('Asia/Kolkata')
  .onRun(async (context) => {
    console.log('Checking for pages requiring expiry emails...')
    
    const settingsDoc = await db.collection('settings').doc('global').get()
    const settings = settingsDoc.data()
    
    if (!settings.enableExpiryEmails) {
      console.log('Expiry emails are disabled')
      return null
    }
    
    const now = new Date()
    const warningDate = new Date()
    warningDate.setDate(now.getDate() + (settings.expiryWarningDays || 30))
    
    try {
      const pagesSnapshot = await db
        .collection('pages')
        .where('published', '==', true)
        .where('isPaid', '==', true)
        .get()
      
      for (const doc of pagesSnapshot.docs) {
        const page = { id: doc.id, ...doc.data() }
        
        if (!page.expiryDate) continue
        
        const expiryDate = new Date(page.expiryDate)
        const daysRemaining = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24))
        
        // Send email at 30 days, 7 days, and 1 day before expiry
        if (daysRemaining === 30 || daysRemaining === 7 || daysRemaining === 1 || daysRemaining === 0) {
          await sendExpiryEmail(page, daysRemaining)
        }
      }
      
      return null
    } catch (error) {
      console.error('Error sending expiry emails:', error)
      return null
    }
  })
```

### Deploy Firebase Functions

```bash
# Set email configuration
firebase functions:config:set email.user="your-email@gmail.com" email.password="your-app-password"

# Or for SendGrid
firebase functions:config:set sendgrid.key="YOUR_SENDGRID_API_KEY"

# Deploy
firebase deploy --only functions
```

---

## Option 2: Netlify Scheduled Functions

### Setup

**File:** `netlify/functions/daily-expiry-check.js`

```javascript
const admin = require('firebase-admin')

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    })
  })
}

const db = admin.firestore()

exports.handler = async (event, context) => {
  console.log('Running daily expiry check...')
  
  const now = new Date()
  
  try {
    const pagesSnapshot = await db
      .collection('pages')
      .where('published', '==', true)
      .where('isPaid', '==', true)
      .get()
    
    const updates = []
    
    pagesSnapshot.forEach(doc => {
      const page = doc.data()
      
      if (!page.expiryDate) return
      
      const expiryDate = new Date(page.expiryDate)
      
      if (expiryDate < now && page.status !== 'expired') {
        updates.push(
          db.collection('pages').doc(doc.id).update({ status: 'expired' })
        )
      }
    })
    
    await Promise.all(updates)
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Updated ${updates.length} expired pages`,
        count: updates.length
      })
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  }
}
```

### Schedule with GitHub Actions

**File:** `.github/workflows/daily-tasks.yml`

```yaml
name: Daily Expiry Check

on:
  schedule:
    # Run at 3:30 AM UTC (9:00 AM IST)
    - cron: '30 3 * * *'
  workflow_dispatch:  # Allow manual trigger

jobs:
  expiry-check:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Netlify Function
        run: |
          curl -X POST https://kashpages.netlify.app/.netlify/functions/daily-expiry-check
```

---

## Option 3: Self-Hosted Node.js Cron

### Setup

```bash
npm install node-cron firebase-admin nodemailer
```

**File:** `scripts/cron-jobs.js`

```javascript
const cron = require('node-cron')
const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

// Run daily at 9 AM IST
cron.schedule('0 9 * * *', async () => {
  console.log('Running daily expiry check at', new Date().toISOString())
  
  const now = new Date()
  
  try {
    const pagesSnapshot = await db
      .collection('pages')
      .where('published', '==', true)
      .get()
    
    const batch = db.batch()
    let updateCount = 0
    
    pagesSnapshot.forEach(doc => {
      const page = doc.data()
      
      if (!page.expiryDate) return
      
      const expiryDate = new Date(page.expiryDate)
      const isExpired = expiryDate < now
      
      // Update status if expired
      if (isExpired && page.status !== 'expired') {
        batch.update(doc.ref, { status: 'expired' })
        updateCount++
      }
      // Update status if active but should be expired
      else if (!isExpired && page.isPaid && page.status !== 'active') {
        batch.update(doc.ref, { status: 'active' })
        updateCount++
      }
    })
    
    if (updateCount > 0) {
      await batch.commit()
      console.log(`Updated ${updateCount} pages`)
    } else {
      console.log('No updates needed')
    }
  } catch (error) {
    console.error('Error in expiry check:', error)
  }
})

console.log('Cron jobs started. Waiting for scheduled tasks...')
```

### Run as Service

**File:** `package.json`

```json
{
  "scripts": {
    "cron": "node scripts/cron-jobs.js"
  }
}
```

**PM2 (Process Manager):**

```bash
# Install PM2
npm install -g pm2

# Start cron job
pm2 start npm --name "kashpages-cron" -- run cron

# Set to start on boot
pm2 startup
pm2 save
```

---

## Email Service Options

### 1. Gmail (Development/Small Scale)

```javascript
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password'  // Generate in Google Account settings
  }
})
```

**Limitations:**
- 500 emails/day
- Requires 2FA and App Password
- Not ideal for production

### 2. SendGrid (Recommended)

```bash
npm install @sendgrid/mail
```

```javascript
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const msg = {
  to: 'user@example.com',
  from: 'noreply@kashpages.in',
  subject: 'Your subscription is expiring',
  text: 'Your page will expire in 7 days...'
}

await sgMail.send(msg)
```

**Benefits:**
- 100 free emails/day
- Reliable delivery
- Analytics dashboard
- Professional

### 3. AWS SES (Scalable)

```bash
npm install @aws-sdk/client-ses
```

```javascript
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses')

const client = new SESClient({ region: 'ap-south-1' })

const command = new SendEmailCommand({
  Destination: { ToAddresses: ['user@example.com'] },
  Message: {
    Subject: { Data: 'Your subscription is expiring' },
    Body: { Text: { Data: 'Your page will expire in 7 days...' } }
  },
  Source: 'noreply@kashpages.in'
})

await client.send(command)
```

**Benefits:**
- Very cheap ($0.10 per 1000 emails)
- Highly scalable
- Requires domain verification

---

## Testing

### Manual Trigger (Firebase)

```bash
# Test locally
firebase functions:shell

# In shell:
checkExpiringPages()
```

### Manual Trigger (Netlify)

```bash
curl -X POST https://kashpages.netlify.app/.netlify/functions/daily-expiry-check
```

### Manual Trigger (Node.js)

```bash
node scripts/cron-jobs.js
```

---

## Monitoring

### Firebase Console
- View function logs
- Check execution count
- Monitor errors

### Netlify Dashboard
- View function invocations
- Check logs
- Monitor failures

### Email Service Dashboards
- SendGrid: Delivery stats
- AWS SES: Bounce/complaint tracking

---

## Best Practices

1. **Error Handling**: Always wrap in try-catch
2. **Logging**: Log all actions for debugging
3. **Rate Limiting**: Don't send too many emails at once
4. **Batch Operations**: Use Firestore batch writes
5. **Timezone**: Always use IST for scheduling
6. **Testing**: Test with real data before production
7. **Monitoring**: Set up alerts for failures
8. **Backup**: Keep logs of all email sends

---

## Phase 4 Status: Ready for Implementation

✅ Scripts provided for all automation options  
✅ Email notification templates included  
✅ Multiple service options documented  
✅ Testing procedures provided  
✅ Best practices outlined  

**Choose the option that fits your deployment strategy!**

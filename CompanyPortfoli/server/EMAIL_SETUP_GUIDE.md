# 📧 Email Setup Guide

## Current Status
❌ **Email is NOT working** - No emails are being sent because Gmail App Password is not configured.

## Quick Fix Options

### Option 1: Set Gmail App Password (Recommended)

1. **Enable 2-Factor Authentication:**
   - Go to: https://myaccount.google.com/security
   - Enable "2-Step Verification" if not already enabled

2. **Generate App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" → "Other (custom name)"
   - Enter: "Vishnu Labs Contact System"
   - Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

3. **Update Configuration:**
   - Open `server/index.js`
   - Find line 21: `pass: process.env.GMAIL_APP_PASSWORD || 'your_app_password_here'`
   - Replace `'your_app_password_here'` with your actual App Password
   - Example: `pass: 'abcdefghijklmnop'` (remove spaces)

### Option 2: Disable Email Temporarily

If you don't want to set up email right now, the system will still work:
- ✅ Contact form submissions will be saved to database
- ✅ Admin dashboard will show all submissions
- ❌ No email notifications will be sent

### Option 3: Use Environment Variable

1. Create a `.env` file in the `server/` directory
2. Add: `GMAIL_APP_PASSWORD=your_16_character_password`
3. Restart the server

## Test Email Configuration

After setting up the App Password:

1. **Restart the server:** `npm run server`
2. **Submit a test contact form**
3. **Check your email:** vishnupqw@gmail.com
4. **Check server logs** for email status

## Current Email Status

The server logs show:
```
Email sending failed: Error: Invalid login: 535-5.7.8 Username and Password not accepted
```

This means the Gmail App Password needs to be configured.

## Need Help?

1. **Test the system:** http://localhost:3001/test
2. **Check login:** http://localhost:3001/login-test
3. **View database:** http://localhost:3001/admin (after login)

The contact form and database are working perfectly - only email needs configuration!

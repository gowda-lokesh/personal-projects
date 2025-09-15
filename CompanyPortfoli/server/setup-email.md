# 📧 Email Setup Instructions

## Gmail App Password Setup

To enable email notifications for contact form submissions, you need to set up a Gmail App Password:

### Step 1: Enable 2-Step Verification
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Under "Signing in to Google", click **2-Step Verification**
3. Follow the setup process if not already enabled

### Step 2: Generate App Password
1. In Google Account Security, click **App passwords**
2. Select **Mail** as the app
3. Select **Other (Custom name)** and enter "Vishnu Labs Contact Form"
4. Click **Generate**
5. Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

### Step 3: Configure Your Server
Replace `your_app_password_here` in `server/index.js` with your actual app password:

```javascript
const EMAIL_CONFIG = {
  service: 'gmail',
  auth: {
    user: 'vishnupqw@gmail.com',
    pass: 'your_16_character_app_password' // Replace this
  }
};
```

### Step 4: Test Email Functionality
1. Start your server: `npm run server`
2. Submit a test contact form
3. Check your email at vishnupqw@gmail.com

## Email Features

✅ **Automatic email notifications** for every contact form submission  
✅ **Beautiful HTML email template** with all contact details  
✅ **Database integration** - emails are sent after data is saved  
✅ **Error handling** - form still works even if email fails  
✅ **Professional formatting** with your brand colors  

## Email Template Includes:
- Contact person's name and email
- Company information (if provided)
- Full message content
- Submission timestamp
- Database record ID
- Professional Vishnu Labs branding

## Troubleshooting

**Email not sending?**
- Check that 2-Step Verification is enabled
- Verify the App Password is correct (16 characters, no spaces)
- Check server console for error messages
- Ensure Gmail account is not locked

**Still having issues?**
- Try generating a new App Password
- Check Gmail's "Less secure app access" settings
- Verify the email address is correct

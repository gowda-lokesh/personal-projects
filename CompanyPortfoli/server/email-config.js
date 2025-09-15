// Email Configuration
// IMPORTANT: You need to set up Gmail App Password for this to work

export const EMAIL_CONFIG = {
  service: 'gmail',
  auth: {
    user: 'vishnupqw@gmail.com', // Your Gmail address
    pass: process.env.GMAIL_APP_PASSWORD || 'your_app_password_here' // Gmail App Password
  }
};

// Instructions to set up Gmail App Password:
// 1. Go to your Google Account settings
// 2. Navigate to Security > 2-Step Verification (enable if not already)
// 3. Go to App passwords
// 4. Generate a new app password for "Mail"
// 5. Copy the 16-character password
// 6. Replace 'your_app_password_here' with your actual app password
// 7. Or set GMAIL_APP_PASSWORD environment variable

// Alternative: You can also use environment variables
// Set GMAIL_APP_PASSWORD=your_16_character_app_password
// Then the config will automatically use it

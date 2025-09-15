import express from 'express';
import cors from 'cors';
import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';
import { Resend } from 'resend';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '0.0.0.0';
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_in_production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

// Email configuration
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'vishnupqw@gmail.com';
const TO_EMAIL = process.env.TO_EMAIL || 'vishnupqw@gmail.com';

// Create Resend client (with error handling)
let resend;
try {
  if (!RESEND_API_KEY) {
    console.warn('⚠️ RESEND_API_KEY not set. Email sending will be disabled.');
    resend = null;
  } else {
    resend = new Resend(RESEND_API_KEY);
    console.log('✅ Resend client initialized successfully');
  }
} catch (error) {
  console.error('❌ Resend client creation failed:', error);
  resend = null;
}


const ADMIN_CREDENTIALS = {
  username: 'loki',
  password: 'admin@123'
};


const authenticateAdmin = (req, res, next) => {
  const bearerToken = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.slice(7)
    : undefined;
  const token = bearerToken || req.query.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized access' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.admin = { username: payload.username };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Middleware
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(express.json());

// Validate DATABASE_URL
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is required but not set.');
  console.error('Please ensure you have a PostgreSQL database service attached to your Railway project.');
  process.exit(1);
}

// Initialize PostgreSQL database
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSLMODE === 'require' ? { rejectUnauthorized: false } : undefined,
});

// A function to set up the database schema
async function ensureSchema() {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(254) NOT NULL,
        company VARCHAR(150),
        message TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;
    await pool.query(createTableQuery);
    console.log('✅ Database schema ensured successfully.');
  } catch (err) {
    console.error('❌ Failed to ensure schema:', err);
    // Close the pool before exiting
    try {
      await pool.end();
      console.log('Database pool closed after schema error.');
    } catch (closeErr) {
      console.error('Error closing database pool:', closeErr);
    }
    process.exit(1);
  }
}

// Call the schema function before starting the server
ensureSchema().then(() => {
  app.listen(PORT, HOST, () => {
    console.log(`🚀 Server listening on ${HOST}:${PORT}`);
    console.log(`📊 Connected to PostgreSQL database`);
  });
}).catch((err) => {
  console.error('❌ Failed to start server:', err);
  process.exit(1);
});

// API Routes

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return res.json({ success: true, message: 'Login successful', token });
  }

  return res.status(401).json({ success: false, message: 'Invalid username or password' });
});

// Logout endpoint
// Stateless JWT logout placeholder (client should discard token)
app.post('/api/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

app.post('/api/contact', (req, res) => {
  const raw = req.body || {};
  const name = String(raw.name || '').trim();
  const email = String(raw.email || '').trim();
  const company = String(raw.company || '').trim();
  const message = String(raw.message || '').trim();

  // Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }
  if (name.length < 2 || name.length > 100) {
    return res.status(400).json({ error: 'Name must be between 2 and 100 characters' });
  }
  if (!emailRegex.test(email) || email.length > 254) {
    return res.status(400).json({ error: 'Please enter a valid email address' });
  }
  if (company.length > 150) {
    return res.status(400).json({ error: 'Company name is too long' });
  }
  if (message.length < 10 || message.length > 5000) {
    return res.status(400).json({ error: 'Message must be between 10 and 5000 characters' });
  }

  pool.query(
    'INSERT INTO contacts (name, email, company, message) VALUES ($1, $2, $3, $4) RETURNING id',
    [name, email, company || '', message],
    async (err, result) => {
      if (err) {
        console.error('❌ Database error:', err);
        return res.status(500).json({ error: 'Failed to save contact information' });
      }

      const insertedId = result.rows[0]?.id;

      // Send email notification (best-effort, non-blocking)
      if (resend) {
        // Don't await - send asynchronously to avoid blocking the response
        resend.emails.send({
          from: FROM_EMAIL,
          to: [TO_EMAIL],
          replyTo: email,
          subject: `New Contact Form Submission - ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
              <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
                <h1 style="margin: 0; font-size: 24px;">📧 New Contact Form Submission</h1>
              </div>
              <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <div style="margin-bottom: 20px;">
                  <h3 style="color: #333; margin-bottom: 10px; border-bottom: 2px solid #6366f1; padding-bottom: 5px;">👤 Contact Details</h3>
                  <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
                    <p style="margin: 8px 0;"><strong>Email:</strong> ${email}</p>
                  <p style="margin: 8px 0;"><strong>Company:</strong> ${company || 'Not provided'}</p>
                  <p style="margin: 8px 0;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
                </div>
                <div style="margin-bottom: 20px;">
                  <h3 style="color: #333; margin-bottom: 10px; border-bottom: 2px solid #6366f1; padding-bottom: 5px;">💬 Message</h3>
                  <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #6366f1;">
                    <p style="margin: 0; line-height: 1.6; color: #555;">${message.replace(/\n/g, '<br>')}</p>
                  </div>
                </div>
                <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                  <p style="color: #666; font-size: 14px; margin: 0;">This email was automatically generated from your Vishnu Labs contact form.</p>
                  <p style="color: #666; font-size: 12px; margin: 5px 0 0 0;">Database ID: ${insertedId}</p>
                </div>
              </div>
            </div>
          `
        }).then(() => {
          console.log('✅ Email sent successfully via Resend');
        }).catch((emailError) => {
          console.error('❌ Email sending failed:', emailError);
        });
      } else {
        console.log('⚠️ Resend client not available, skipping email send');
      }

      return res.json({ success: true, message: 'Contact information saved successfully', id: insertedId });
    }
  );
});

// Get all contacts (for admin purposes) - Protected route
app.get('/api/contacts', authenticateAdmin, async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    return res.json(rows);
  } catch (err) {
    console.error('❌ Database error:', err);
    return res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Clear all contacts (for admin purposes) - Protected route
app.delete('/api/contacts', authenticateAdmin, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM contacts');
    return res.json({ success: true, message: `Cleared ${result.rowCount} contact(s) from database` });
  } catch (err) {
    console.error('❌ Database error:', err);
    return res.status(500).json({ error: 'Failed to clear contacts' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// Serve test page
app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, 'test.html'));
});

// Serve login test page
app.get('/login-test', (req, res) => {
  res.sendFile(path.join(__dirname, 'login-test.html'));
});

// Serve email test page
app.get('/email-test', (req, res) => {
  res.sendFile(path.join(__dirname, 'email-test.html'));
});

// Serve admin page (protected)
app.get('/admin', (req, res) => {
  const token = req.query.token;
  try {
    if (!token) return res.redirect('/login');
    jwt.verify(token, JWT_SECRET);
    return res.sendFile(path.join(__dirname, 'admin.html'));
  } catch {
    return res.redirect('/login');
  }
});

// Server startup is now handled in the ensureSchema promise chain above

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down server...');
  try {
    await pool.end();
    console.log('Database pool closed.');
  } catch (e) {
    console.error('Error closing database pool:', e);
  }
  process.exit(0);
});

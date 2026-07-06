const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from frontend (if deployed together)
// Comment this out if frontend is deployed separately
// app.use(express.static('../frontend'));

// Import routers
const authRouter = require('./routes/auth');
const subscribeRouter = require('./routes/subscribe');
const claimsRouter = require('./routes/claims');
const contactRouter = require('./routes/contact');
const contractsRouter = require('./routes/contracts');

// API Routes (FIXED: Use app.use instead of app.post/app.get)
app.use('/api/auth', authRouter);
app.use('/api/subscribe', subscribeRouter);
app.use('/api/claims', claimsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/contracts', contractsRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    path: req.path,
    method: req.method
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[ERROR]', {
    message: err.message,
    path: req.path,
    method: req.method,
    stack: err.stack
  });
  
  res.status(err.status || err.statusCode || 500).json({ 
    error: err.message || 'Internal Server Error',
    code: err.code || 'INTERNAL_ERROR',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║              SURO Backend Server Starting                       ║
╚════════════════════════════════════════════════════════════════╝
✓ Environment: ${NODE_ENV}
✓ Port: ${PORT}
✓ Base URL: http://localhost:${PORT}
✓ API Endpoint: http://localhost:${PORT}/api
✓ Frontend URL: ${process.env.FRONTEND_URL || 'Not configured (CORS open)'}
✓ Supabase: ${process.env.SUPABASE_URL ? '✓ Connected' : '✗ Missing (check .env)'}
✓ JWT Secret: ${process.env.JWT_SECRET ? '✓ Configured' : '✗ Missing (check .env)'}

Ready to accept requests on http://localhost:${PORT}
  ✓ POST   /api/auth/signup
  ✓ POST   /api/auth/login
  ✓ POST   /api/subscribe
  ✓ GET    /api/contracts/:userId
  ✓ POST   /api/claims
  ✓ GET    /api/claims/:userId
  ✓ POST   /api/contact
  ✓ GET    /health
═══════════════════════════════════════════════════════════════════
  `);
});

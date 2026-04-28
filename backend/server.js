const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


const JWT_SECRET = process.env.JWT_SECRET || 'patel-engineering-super-secret-2024';

console.log('-------------------------------------------');
console.log('🚀 SERVER VERSION: 5.0 (MONGODB ATLAS)');
console.log('-------------------------------------------');

const app = express();
// Enhanced Prisma configuration with connection pooling
const prisma = new PrismaClient({
  log: ['error', 'warn'],
  errorFormat: 'pretty'
});

app.use(cors());
app.use(express.json());

// ─── Connection Test ────────────────────────────────────
let isConnected = false;

async function testConnection() {
  try {
    console.log('⏳ Connecting to MongoDB Atlas...');
    await prisma.$connect();
    console.log('✅ Database connection successful');
    isConnected = true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);

    if (error.message.includes('InternalError') || error.message.includes('Server selection timeout') || error.message.includes('No available servers')) {
      console.log('\x1b[33m%s\x1b[0m', '💡 TIP: This usually means your IP address is not whitelisted in MongoDB Atlas.');
      console.log('\x1b[33m%s\x1b[0m', '👉 To fix this "every time": Go to MongoDB Atlas -> Network Access -> Add IP Address -> Allow Access From Anywhere (0.0.0.0/0)');
    }

    isConnected = false;
    // Retry connection after 5 seconds
    setTimeout(testConnection, 5000);
  }
}
testConnection();

// Global Error Handlers
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

// ─── Database Connection Middleware ─────────────────────
const checkConnection = (req, res, next) => {
  if (!isConnected) {
    return res.status(503).json({ error: 'Database connection unavailable. Please try again.' });
  }
  next();
};

app.use(checkConnection);

// ─── Cloudinary Upload Config ──────────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'patel_steel_uploads',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'mp4'],
    resource_type: 'auto'
  }
});

const upload = multer({ storage });


// ─── JWT Auth Middleware ────────────────────────────────
const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.admin = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// ─── Public Routes ──────────────────────────────────────
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/clients', async (req, res) => {
  try {
    const clients = await prisma.client.findMany();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/certificates', async (req, res) => {
  try {
    const certificates = await prisma.certificate.findMany();
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message, companyName, phone } = req.body;
    const contact = await prisma.contactForm.create({
      data: { name, email, message, companyName, phone }
    });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ─── Admin Auth Routes ──────────────────────────────────
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await prisma.admin.findUnique({ where: { username } });
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '8h' });
    res.json({ token, username: admin.username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Inquiry management
app.get('/api/admin/inquiries', requireAuth, async (req, res) => {
  try {
    const inquiries = await prisma.contactForm.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/inquiries/:id', requireAuth, async (req, res) => {
  try {
    await prisma.contactForm.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin Project Management (List)
app.get('/api/admin/projects', requireAuth, async (req, res) => {
  try {
    const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin Product Management (List)
app.get('/api/admin/products', requireAuth, async (req, res) => {
  try {
    const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Seed admin
app.post('/api/admin/seed', async (req, res) => {
  try {
    const count = await prisma.admin.count();
    if (count > 0) return res.json({ message: 'Admin already exists' });
    const passwordHash = await bcrypt.hash('admin123', 10);
    const admin = await prisma.admin.create({ data: { username: 'admin', passwordHash } });
    res.json({ message: 'Admin created', username: admin.username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new project
app.post('/api/admin/projects', requireAuth, async (req, res) => {
  try {
    const { title, description, images } = req.body;
    const imagesString = typeof images === 'string' ? images : JSON.stringify(images || []);
    const project = await prisma.project.create({ data: { title, description, images: imagesString } });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update project
app.put('/api/admin/projects/:id', requireAuth, async (req, res) => {
  try {
    const { title, description, images } = req.body;
    const project = await prisma.project.update({
      where: { id: req.params.id },
      data: { title, description, images: typeof images === 'string' ? images : JSON.stringify(images || []) }
    });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete project
app.delete('/api/admin/projects/:id', requireAuth, async (req, res) => {
  try {
    await prisma.project.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upload image files to Cloudinary
app.post('/api/admin/upload', requireAuth, upload.array('images', 50), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      console.log('⚠️ No files were uploaded.');
      return res.status(400).json({ error: 'No files uploaded' });
    }
    const urls = req.files.map(f => f.path);
    console.log('✅ Successfully uploaded to Cloudinary:', urls);
    res.json({ urls });
  } catch (error) {
    console.error('❌ Cloudinary upload error:', error);
    res.status(500).json({ error: 'Cloudinary upload failed' });
  }
});
// ─── Admin Product Management ──────────────────────────
app.post('/api/admin/products', requireAuth, async (req, res) => {
  try {
    const { name, description, images } = req.body;
    const product = await prisma.product.create({
      data: { name, description: description || '', images: typeof images === 'string' ? images : JSON.stringify(images || []) }
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/admin/products/:id', requireAuth, async (req, res) => {
  try {
    const { name, description, images } = req.body;
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: { name, description, images: typeof images === 'string' ? images : JSON.stringify(images || []) }
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/products/:id', requireAuth, async (req, res) => {
  try {
    await prisma.product.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
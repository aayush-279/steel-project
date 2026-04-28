require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const { neon } = require('@neondatabase/serverless');
const { PrismaNeon } = require('@prisma/adapter-neon');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('❌ ERROR: DATABASE_URL is not defined in .env file!');
  process.exit(1);
}

const JWT_SECRET = process.env.JWT_SECRET || 'patel-engineering-super-secret-2024';

const sql = neon(DATABASE_URL);
const adapter = new PrismaNeon(sql);

const app = express();
const prisma = new PrismaClient({ adapter });

app.use(cors());
app.use(express.json());

const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
  const token = authHeader.split(' ')[1];
  try {
    req.admin = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

app.get('/', (req, res) => res.json({ status: '✅ Backend Active', port: 5000 }));

// Public API
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({ orderBy: { createdAt: 'asc' } });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany({ orderBy: { createdAt: 'asc' } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin API
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

app.get('/api/admin/projects', requireAuth, async (req, res) => {
  try {
    const projects = await prisma.project.findMany({ orderBy: { createdAt: 'asc' } });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/projects', requireAuth, async (req, res) => {
  try {
    const { title, description, images } = req.body;
    const project = await prisma.project.create({
      data: { title, description: description || '', images: images || '[]' }
    });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/admin/projects/:id', requireAuth, async (req, res) => {
  try {
    const { title, description, images } = req.body;
    const project = await prisma.project.update({
      where: { id: parseInt(req.params.id) },
      data: { title, description, images: images || '[]' }
    });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/projects/:id', requireAuth, async (req, res) => {
  try {
    await prisma.project.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/products', requireAuth, async (req, res) => {
  try {
    const products = await prisma.product.findMany({ orderBy: { createdAt: 'asc' } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/products', requireAuth, async (req, res) => {
  try {
    const { name, description, images } = req.body;
    const product = await prisma.product.create({
      data: { name, description: description || '', images: images || '[]' }
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
      where: { id: parseInt(req.params.id) },
      data: { name, description, images: images || '[]' }
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/products/:id', requireAuth, async (req, res) => {
  try {
    await prisma.product.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/upload', requireAuth, multer({ 
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(__dirname, '../frontend/public/assets/uploads');
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
  })
}).array('images', 50), (req, res) => {
  const urls = req.files.map(f => `/assets/uploads/${f.filename}`);
  res.json({ urls });
});

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

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));

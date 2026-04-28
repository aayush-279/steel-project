const fs = require('fs');
const path = require('path');

const c = fs.readFileSync(path.join(__dirname, '.env'), 'utf-8');
const envVars = Object.fromEntries(
  c.split('\n')
    .filter(l => l.includes('=') && !l.startsWith('#'))
    .map(l => {
      const i = l.indexOf('=');
      const k = l.substring(0, i).trim();
      const v = l.substring(i + 1).trim().replace(/^"|"$/g, '').replace(/\r/g, '');
      return [k, v];
    })
);

// Inject directly into process.env BEFORE loading neon
process.env.DATABASE_URL = envVars.DATABASE_URL;
process.env.PGSSL = 'true';

console.log('DATABASE_URL set in process.env:', process.env.DATABASE_URL.substring(0, 50));

const { Pool, neonConfig } = require('@neondatabase/serverless');
const { PrismaNeon } = require('@prisma/adapter-neon');
const { PrismaClient } = require('@prisma/client');
const ws = require('ws');

neonConfig.webSocketConstructor = ws;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaNeon(pool);
const prisma = new PrismaClient({ adapter });

async function test() {
  try {
    const count = await prisma.admin.count();
    console.log('✅ DB Connected! Admin count:', count);
    
    const bcrypt = require('bcryptjs');
    const hash = await bcrypt.hash('admin123', 10);
    
    if (count === 0) {
      const admin = await prisma.admin.create({ data: { username: 'admin', passwordHash: hash } });
      console.log('✅ Created admin:', admin.username);
    } else {
      console.log('ℹ Admin already exists, skipping seed');
    }
  } catch (e) {
    console.error('❌ Error:', e.message);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

test();

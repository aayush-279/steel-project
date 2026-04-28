require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const { Pool, neonConfig } = require('@neondatabase/serverless');
const { PrismaNeon } = require('@prisma/adapter-neon');
const bcrypt = require('bcryptjs');
const ws = require('ws');

neonConfig.webSocketConstructor = ws;

async function main() {
  const connectionString = process.env.DATABASE_URL;
  console.log('Connecting to DB:', connectionString ? connectionString.substring(0, 40) + '...' : 'UNDEFINED');
  
  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool);
  const prisma = new PrismaClient({ adapter });

  const passwordHash = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      passwordHash: passwordHash,
    },
  });

  console.log('✅ Admin seeded successfully:', { id: admin.id, username: admin.username });
  await prisma.$disconnect();
  await pool.end();
}

main().catch((e) => {
  console.error('❌ Seed failed:', e.message);
  process.exit(1);
});


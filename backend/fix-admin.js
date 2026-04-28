const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function seed() {
  try {
    const passwordHash = await bcrypt.hash('admin123', 10);
    const admin = await prisma.admin.upsert({
      where: { username: 'admin' },
      update: { passwordHash: passwordHash },
      create: {
        username: 'admin',
        passwordHash: passwordHash,
      },
    });
    console.log('✅ Admin user "admin" created/updated with password "admin123"');
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
  } finally {
    await prisma.$disconnect();
  }
}

seed();

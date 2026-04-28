const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  try {
    const admins = await prisma.admin.findMany();
    console.log('Admins in DB:', admins.map(a => ({ id: a.id, username: a.username })));
  } catch (err) {
    console.error('Error checking admins:', err.message);
  } finally {
    await prisma.$disconnect();
  }
}

check();

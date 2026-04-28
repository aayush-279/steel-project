require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const projectCount = await prisma.project.count();
    const productCount = await prisma.product.count();
    console.log(`Projects: ${projectCount}`);
    console.log(`Products: ${productCount}`);
    
    if (projectCount > 0) {
      const projects = await prisma.project.findMany();
      console.log('Project Titles:', projects.map(p => p.title));
    }
  } catch (e) {
    console.error('Error connecting to database:', e.message);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();

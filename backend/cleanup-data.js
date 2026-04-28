const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function clean() {
  try {
    console.log('🧹 Cleaning Projects...');
    const projects = await prisma.project.findMany();
    for (const p of projects) {
      let images = p.images;
      // If it's a double-stringified JSON, parse it once
      try {
        const parsed = JSON.parse(images);
        if (typeof parsed === 'string') {
           console.log(`Fixing double-stringified project: ${p.title}`);
           await prisma.project.update({
             where: { id: p.id },
             data: { images: parsed }
           });
        }
      } catch (e) {
        // Not a JSON string or already correct, skip
      }
    }

    console.log('🧹 Cleaning Products...');
    const products = await prisma.product.findMany();
    for (const p of products) {
      let images = p.images;
      try {
        const parsed = JSON.parse(images);
        if (typeof parsed === 'string') {
           console.log(`Fixing double-stringified product: ${p.name}`);
           await prisma.product.update({
             where: { id: p.id },
             data: { images: parsed }
           });
        }
      } catch (e) {
        // Skip
      }
    }
    console.log('✅ Cleanup complete!');
  } catch (err) {
    console.error('❌ Cleanup failed:', err);
  } finally {
    await prisma.$disconnect();
  }
}

clean();

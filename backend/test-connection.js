const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
  console.log('\n🔍 Testing MongoDB Connection...\n');
  console.log('DATABASE_URL:', process.env.DATABASE_URL.substring(0, 50) + '...');
  
  try {
    console.log('⏳ Connecting to MongoDB...');
    await prisma.$connect();
    console.log('✅ Connection successful!\n');

    // Test a query
    const adminCount = await prisma.admin.count();
    console.log(`✅ Query successful! Found ${adminCount} admin(s)\n`);

    await prisma.$disconnect();
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('\n📋 Troubleshooting steps:');
    console.error('1. Check MongoDB Atlas cluster status (should be ACTIVE)');
    console.error('2. Add your IP to Network Access > IP Whitelist');
    console.error('3. Verify DATABASE_URL in .env file is correct');
    console.error('4. Check internet connection');
    console.error('5. Try: npx prisma db push --skip-generate\n');
    process.exit(1);
  }
}

testConnection();

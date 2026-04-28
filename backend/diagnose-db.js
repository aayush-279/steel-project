const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { PrismaClient } = require('@prisma/client');

// Create Prisma instance with proper error handling
const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
});

prisma.$on('query', (e) => {
  console.log('Query:', e.query);
  console.log('Duration:', e.duration + 'ms');
});

async function diagnoseConnection() {
  console.log('\n📊 MongoDB Connection Diagnostic\n');
  console.log('DATABASE_URL:', process.env.DATABASE_URL.substring(0, 80) + '...');
  
  try {
    console.log('\n⏳ Attempting to connect...');
    await prisma.$connect();
    console.log('✅ Initial connection successful');

    console.log('\n⏳ Testing a simple query (counting admin records)...');
    const adminCount = await prisma.admin.count();
    console.log(`✅ Query successful! Found ${adminCount} admin(s)`);

    console.log('\n⏳ Testing insert operation...');
    const testContact = await prisma.contactForm.create({
      data: {
        name: 'Test User',
        email: 'test@example.com',
        message: 'Test message',
        companyName: 'Test Co',
        phone: '+91 9876543210'
      }
    });
    console.log(`✅ Insert successful! ID: ${testContact.id}`);

    console.log('\n⏳ Testing read operation...');
    const contacts = await prisma.contactForm.findMany({ take: 1 });
    console.log(`✅ Read successful! Found ${contacts.length} contact(s)`);

    console.log('\n✅✅✅ ALL TESTS PASSED! ✅✅✅');
    console.log('\nYour MongoDB Atlas connection is working correctly!');

    await prisma.$disconnect();
  } catch (error) {
    console.error('\n❌ Error occurred:');
    console.error('Type:', error.constructor.name);
    console.error('Message:', error.message);
    console.error('\n📋 Troubleshooting steps:');
    console.error('1. Go to https://cloud.mongodb.com/');
    console.error('2. Check if your cluster "PatelBhai" is ACTIVE (not paused)');
    console.error('3. Click "Resume" if paused');
    console.error('4. Go to Network Access and add your IP: 152.58.60.170/32');
    console.error('5. Go to Database Access and verify user credentials');
    console.error('6. If still failing, try recreating the connection string');
    process.exit(1);
  }
}

diagnoseConnection();

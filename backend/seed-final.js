const { Pool } = require('@neondatabase/serverless');
const ws = require('ws');
const bcrypt = require('bcryptjs');

const url = "postgresql://neondb_owner:npg_oQYX3Bcp2jvz@ep-young-cherry-a4mrtka3-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

async function seed() {
  console.log('🔗 Connecting to database...');
  const pool = new Pool({ connectionString: url, webSocketConstructor: ws });
  
  try {
    const passwordHash = await bcrypt.hash('admin123', 10);
    console.log('⏳ Seeding admin user...');
    
    // Create table if it doesn't exist (safety)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "Admin" (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        "passwordHash" TEXT NOT NULL,
        "createdAt" TIMESTAMP DEFAULT NOW()
      )
    `);
    
    await pool.query('INSERT INTO "Admin" (username, "passwordHash") VALUES ($1, $2) ON CONFLICT (username) DO NOTHING', ['admin', passwordHash]);
    
    console.log('✅ SUCCESS! Admin user "admin" is ready with password "admin123"');
  } catch (err) {
    console.error('❌ FAILED:', err.message);
  } finally {
    await pool.end();
  }
}

seed();

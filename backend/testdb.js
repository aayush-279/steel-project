const fs = require('fs');
const path = require('path');
const { Pool, neonConfig } = require('@neondatabase/serverless');
const ws = require('ws');

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

const DATABASE_URL = envVars.DATABASE_URL;
console.log('DB URL length:', DATABASE_URL ? DATABASE_URL.length : 0);
console.log('First 60 chars:', DATABASE_URL ? DATABASE_URL.substring(0, 60) : 'MISSING');

neonConfig.webSocketConstructor = ws;
const pool = new Pool({ connectionString: DATABASE_URL });

pool.query('SELECT 1 as test').then(r => {
  console.log('DB Connection SUCCESS:', r.rows);
  pool.end();
}).catch(e => {
  console.error('DB Connection FAILED:', e.message);
});

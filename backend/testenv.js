const fs = require('fs');
const c = fs.readFileSync('.env','utf-8');
const lines = c.split('\n').filter(l => l.includes('=') && !l.startsWith('#'));
const pairs = lines.map(l => {
  const idx = l.indexOf('=');
  const k = l.substring(0, idx).trim();
  const v = l.substring(idx + 1).trim().replace(/^"|"$/g, '').replace(/\r/g, '');
  return [k, v];
});
const obj = Object.fromEntries(pairs);
console.log('DB URL:', obj.DATABASE_URL ? obj.DATABASE_URL.substring(0, 80) + '...' : 'MISSING');
console.log('Has sslmode:', obj.DATABASE_URL ? obj.DATABASE_URL.includes('sslmode') : false);

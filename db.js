import pg from 'pg';
import dotenv from 'dotenv';
import dns from 'dns';

dotenv.config();

const { Pool } = pg;

// Resolve IPv4 address of the Supabase host
const dbHost = new URL(process.env.DATABASE_URL).hostname;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // This makes Postgres use IP address directly
  host: await new Promise((resolve, reject) => {
    dns.lookup(dbHost, { family: 4 }, (err, address) => {
      if (err) reject(err);
      else resolve(address);
    });
  }),
});

export default pool;

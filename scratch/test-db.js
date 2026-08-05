import 'dotenv/config';
import { Pool } from 'pg';

async function testPG() {
  const url1 = process.env.DATABASE_URL;
  console.log("Testing direct pg connection to:", url1);
  
  const pool1 = new Pool({
    connectionString: url1,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000
  });

  try {
    const res = await pool1.query("SELECT NOW()");
    console.log("Direct PG query success!", res.rows);
    await pool1.end();
    return;
  } catch (err) {
    console.error("Direct PG query error:", err.message);
    await pool1.end();
  }

  // Try pooler host / port 6543
  const poolerUrl = url1.replace(':5432', ':6543');
  console.log("Testing pooler pg connection to:", poolerUrl);
  const pool2 = new Pool({
    connectionString: poolerUrl,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000
  });

  try {
    const res = await pool2.query("SELECT NOW()");
    console.log("Pooler PG query success!", res.rows);
    await pool2.end();
  } catch (err) {
    console.error("Pooler PG query error:", err.message);
    await pool2.end();
  }
}

testPG();

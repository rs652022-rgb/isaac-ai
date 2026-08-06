import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

async function testConnection() {
  const url = process.env.DATABASE_URL;
  console.log("Testing DATABASE_URL:", url?.replace(/:[^:@]+@/, ":****@"));

  const directUrl = process.env.DIRECT_URL || url;
  console.log("Testing DIRECT_URL:", directUrl?.replace(/:[^:@]+@/, ":****@"));

  // Test standard pool connection
  try {
    const pool = new Pool({
      connectionString: url,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 5000,
    });
    const client = await pool.connect();
    const res = await client.query("SELECT NOW()");
    console.log("DATABASE_URL connection SUCCESS:", res.rows[0]);
    client.release();
    await pool.end();
  } catch (err: any) {
    console.error("DATABASE_URL connection FAILED:", err.message);
  }

  // Test port 6543 if default port 5432 failed
  if (url && url.includes(":5432")) {
    const poolerUrl = url.replace(":5432", ":6543");
    console.log("\nTesting port 6543 pooler:", poolerUrl.replace(/:[^:@]+@/, ":****@"));
    try {
      const pool = new Pool({
        connectionString: poolerUrl,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 5000,
      });
      const client = await pool.connect();
      const res = await client.query("SELECT NOW()");
      console.log("Port 6543 pooler connection SUCCESS:", res.rows[0]);
      client.release();
      await pool.end();
    } catch (err: any) {
      console.error("Port 6543 pooler connection FAILED:", err.message);
    }
  }
}

testConnection();

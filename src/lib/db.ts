import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn("⚠️ DATABASE_URL is not set. Database features will fail.");
}

export const pool = new Pool({
  connectionString,
});

/**
 * Initializes the database schemas if they do not exist yet.
 */
export const initDb = async (): Promise<void> => {
  const createTablesQuery = `
    CREATE TABLE IF NOT EXISTS waitlist (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      organisation VARCHAR(255),
      email VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      compute TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status VARCHAR(50) DEFAULT 'pending',
      notes TEXT
    );
  `;

  try {
    const client = await pool.connect();
    await client.query(createTablesQuery);
    client.release();
    console.log("✅ PostgreSQL Database Initialized Successfully");
  } catch (error: any) {
    console.error("❌ PostgreSQL Initialization failed:", error.message);
  }
};

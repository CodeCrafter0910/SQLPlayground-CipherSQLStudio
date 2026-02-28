const { Pool } = require("pg");

// Support both DATABASE_URL (connection string) and individual env vars
const pool = new Pool(
  process.env.DATABASE_URL
    ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    }
    : {
      host: process.env.POSTGRES_HOST || "localhost",
      port: parseInt(process.env.POSTGRES_PORT) || 5432,
      user: process.env.POSTGRES_USER || "postgres",
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB || "ciphersqlstudio",
      // Only use SSL if explicitly set (for cloud deployments)
      ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
    }
);

pool.connect()
  .then(() => {
    console.log("PostgreSQL Connected Successfully");
  })
  .catch((err) => {
    console.error("PostgreSQL Connection Failed:", err.message);
  });

module.exports = pool;
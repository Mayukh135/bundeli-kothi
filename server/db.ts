import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  console.warn("DATABASE_URL not set. Running in-memory storage mode.");
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  min: 2,                      // minimum connections in pool
  max: 10,                      // maximum connections in pool
  idleTimeoutMillis: 30000,     // close idle connections after 30s
  connectionTimeoutMillis: 5000, // wait up to 5s for connection
});

export const db = drizzle(pool, { schema });

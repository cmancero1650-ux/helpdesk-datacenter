import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const pool = new Pool({
  host: process.env.PGHOST || "localhost",
  port: Number(process.env.PGPORT || 5432),
  database: process.env.PGDATABASE || "helpdesk_datacenter",
  user: process.env.PGUSER || "postgres",
  password: String(process.env.PGPASSWORD || "2026"),
  ssl: process.env.PGSSL === "true" ? { rejectUnauthorized: false } : undefined
});

export async function query(text, params = []) {
  return pool.query(text, params);
}

export async function connectDatabase() {
  await pool.query("SELECT 1");
  console.log("Base de datos conectada: PostgreSQL");
}

export async function initializeDatabase() {
  const schemaPath = path.resolve(__dirname, "../../../db/schema.sql");
  const schema = await readFile(schemaPath, "utf8");
  await pool.query(schema);
}

export async function disconnectDatabase() {
  await pool.end();
}

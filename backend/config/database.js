import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false }, max: 20 });
pool.on('error', (err) => { console.error('Erro PostgreSQL:', err); process.exit(-1); });

export const query = (text, params) => pool.query(text, params);
export const getClient = () => pool.connect();
export default pool;

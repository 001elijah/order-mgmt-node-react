import { Client, Pool } from 'pg';

const config = {
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10)
}

const pool = new Pool(config)

export const client = new Client(config)

export const query = (text: string, params?: any[]) => pool.query(text, params);

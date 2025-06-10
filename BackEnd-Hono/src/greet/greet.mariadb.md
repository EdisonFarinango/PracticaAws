import { createConnection } from "mariadb";
import type { Connection, ConnectionConfig } from "mariadb";
import * as dotenv from 'dotenv';

dotenv.config();

const dbConfig: ConnectionConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
};

let connection: Connection | null = null;

async function getConnection(): Promise<Connection> {
  if (!connection) {
    try {
      connection = await createConnection(dbConfig);
      console.log('✅ Conectado a la base de datos');
    } catch (err) {
      console.error('❌ Error de conexión:', err);
      throw err;
    }
  }
  return connection;
}

export type Param = {
  greet: string;
  language: string;
};

export class Greet {
  static async findAll() {
    const conn = await getConnection();
    return await conn.query('SELECT id, greet, language FROM regards');
  }

  static async findById(id: number) {
    const conn = await getConnection();
    const result = await conn.query(
      'SELECT id, greet, language FROM regards WHERE id = ?',
      [id]
    );
    return result[0];
  }

  static async create(param: Param) {
    const conn = await getConnection();
    const res = await conn.query(
      'INSERT INTO regards (greet, language) VALUES (?, ?)',
      [param.greet, param.language]
    );
    const result = await conn.query(
      'SELECT id, greet, language FROM regards WHERE id = ?',
      [res.insertId]
    );
    return result[0];
  }

  static async delete(id: number) {
    const conn = await getConnection();
    const result = await conn.query(
      'DELETE FROM regards WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }

  static async update(id: number, param: Param) {
    const conn = await getConnection();
    const result = await conn.query(
      'UPDATE regards SET greet = ?, language = ? WHERE id = ?',
      [param.greet, param.language, id]
    );
    return result.affectedRows > 0;
  }
}
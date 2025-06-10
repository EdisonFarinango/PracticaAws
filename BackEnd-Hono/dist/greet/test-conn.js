import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });
import mysql from 'mysql2/promise';
async function testConnection() {
    console.log('Variables de entorno:', {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD ? '*****' : null,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
    });
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: Number(process.env.DB_PORT),
            database: process.env.DB_NAME,
        });
        console.log('✅ Conexión a la base de datos exitosa');
        const [rows] = await connection.query('SELECT VERSION() AS version');
        console.log('Versión MySQL:', rows);
        await connection.end();
    }
    catch (error) {
        console.error('❌ Error al conectar:', error);
    }
}
testConnection();

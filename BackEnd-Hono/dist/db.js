import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
dotenv.config();
console.log('Variables de entorno DB:', {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD ? '*****' : null,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});
export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

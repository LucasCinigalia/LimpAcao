import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '.env');
dotenv.config({ path: envPath });

typeof process !== 'undefined' && console.log('Carregando .env em', envPath);

// Suporta dois formatos de variáveis de ambiente:
//  - Local/desenvolvimento: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
//  - Railway (plugin MySQL): MYSQLHOST, MYSQLPORT, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE
//  - Ou DATABASE_URL completo (mysql://user:pass@host:port/db)
const dbUrl = process.env.DATABASE_URL;
const pool = dbUrl
  ? mysql.createPool({
      uri: dbUrl,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      multipleStatements: true,
    })
  : mysql.createPool({
      host: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
      port: Number(process.env.MYSQLPORT || process.env.DB_PORT || 3306),
      user: process.env.MYSQLUSER || process.env.DB_USER || 'root',
      password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '',
      database: process.env.MYSQLDATABASE || process.env.DB_NAME || 'limpacao',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      multipleStatements: true,
    });

console.log('MySQL config:', {
  host: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
  port: process.env.MYSQLPORT || process.env.DB_PORT || '3306',
  user: process.env.MYSQLUSER || process.env.DB_USER || 'root',
  database: process.env.MYSQLDATABASE || process.env.DB_NAME || 'limpacao',
  viaUrl: Boolean(dbUrl),
});

export default pool;

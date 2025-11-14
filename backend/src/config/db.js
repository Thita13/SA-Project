// src/config/db.js - เชื่อมต่อ MySQL
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// สร้าง connection pool เพื่อรองรับหลาย request พร้อมกัน
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise(); // ใช้ promise เพื่อ await query ได้

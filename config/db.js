const mysql = require("mysql2/promise");
require("dotenv").config(); // Load environment variables

// Database connection with connection pooling
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true, // Tunggu jika koneksi penuh
  connectionLimit: 10, // Batasi jumlah maksimum koneksi
  queueLimit: 0, // Tidak ada batasan antrean
});

// Tes koneksi ke database saat server pertama kali berjalan
db.getConnection()
  .then((connection) => {
    console.log("✅ Connected to MySQL database");
    connection.release(); // Pastikan koneksi dikembalikan ke pool
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err);
  });

module.exports = db;

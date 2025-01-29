const mysql = require("mysql2/promise");

// Konfigurasi database langsung (TIDAK DISARANKAN untuk produksi)
const db = mysql.createPool({
  host: "api.sidak2025.lampungsehat.org",
  user: "lampungsehat_sidak2025",
  password: "us6Oo#GRtd+s",
  database: "lampungsehat_sidak2025",
  port: 3306,

  waitForConnections: true,
  connectionLimit: 10,  // Batasi jumlah maksimum koneksi
  queueLimit: 0,
  acquireTimeout: 10000, // Timeout saat menunggu koneksi (10 detik)
  connectTimeout: 10000  // Timeout saat menghubungkan ke database (10 detik)
});

// Tes koneksi
db.getConnection()
  .then((connection) => {
    console.log("✅ Connected to MySQL database");
    connection.release(); // Pastikan koneksi dikembalikan ke pool
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err);
  });

module.exports = db;

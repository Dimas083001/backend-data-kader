const mysql = require("mysql2/promise");
require("dotenv").config(); // Load environment variables

// Database connection
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.getConnection()
  .then(() => console.log("Connected to hosted MySQL database"))
  .catch((err) => console.error("Database connection error:", err));

module.exports = db;

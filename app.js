const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const favicon = require('serve-favicon');

const app = express();

// Import routes
const login = require('./routes/login');
const dataKader = require('./routes/dataKader');
const sebaranWilayah = require('./routes/sebaranWilayah');
const laporan = require('./routes/laporan');
const tambahAkun = require('./routes/tambahAkun');
const dashboard = require('./routes/dashboard');
const profil = require('./routes/profil');
const kta = require('./routes/kta');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Mengizinkan favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// ✅ Alternatif jika tidak ingin menggunakan favicon (mengabaikan request)
app.get('/favicon.ico', (req, res) => res.status(204));

// Register API routes dengan prefix "/api"
app.use("/api/login", login);
app.use("/api/dataKader", dataKader);
app.use("/api/sebaranWilayah", sebaranWilayah);
app.use("/api/tambahAkun", tambahAkun);
app.use("/api/laporan", laporan);
app.use("/api/dashboard", dashboard);
app.use("/api/profil", profil);
app.use("/api/kta", kta);

// Default route
app.get("/", (req, res) => {
  res.send("API is running!");
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

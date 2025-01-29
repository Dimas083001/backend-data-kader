const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');

const app = express();

// Import Routes
const login = require('./routes/login');
const dataKader = require('./routes/dataKader');
const sebaranWilayah = require('./routes/sebaranWilayah');
const laporan = require('./routes/laporan');
const tambahAkun = require('./routes/tambahAkun');
const dashboard = require('./routes/dashboard');
const profil = require('./routes/profil');
const kta = require('./routes/kta');

// Middleware Keamanan (CSP diperbaiki)
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", "https://backend-data-kader.vercel.app"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https://backend-data-kader.vercel.app"],
        connectSrc: ["'self'", "https://backend-data-kader.vercel.app"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"]
      }
    }
  })
);

// Middleware Umum
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Menyediakan akses ke folder 'uploads' untuk menyimpan file upload
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Menyediakan akses ke folder 'public' untuk favicon dan file statis
app.use(express.static(path.join(__dirname, 'public')));

// Route khusus untuk favicon agar tidak terjadi error CSP
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'favicon.ico'));
});

// Routing API
app.use(login);
app.use(dataKader);
app.use(sebaranWilayah);
app.use(tambahAkun);
app.use(laporan);
app.use(dashboard);
app.use(profil);
app.use(kta);

// Default Route
app.get("/", (req, res) => {
  res.send("API is running!");
});

// Menentukan Port dan Menjalankan Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware dasar
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Middleware untuk Content Security Policy
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; " +
    "img-src 'self' https://backend-data-kader.vercel.app data: blob:; " +
    "connect-src 'self' https://backend-data-kader.vercel.app; " +
    "script-src 'self' 'unsafe-inline'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "object-src 'none'; " +
    "media-src 'self'; " +
    "frame-ancestors 'self'; " +
    "manifest-src 'self'; " +
    "worker-src 'self';"
  );
  next();
});


// Middleware untuk menangani request favicon.ico agar tidak error di console
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Middleware untuk static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '..', 'public')));

// Import rute API
const login = require('./routes/login');
const dataKader = require('./routes/dataKader');
const sebaranWilayah = require('./routes/sebaranWilayah');
const laporan = require('./routes/laporan');
const tambahAkun = require('./routes/tambahAkun');
const dashboard = require('./routes/dashboard');
const profil = require('./routes/profil');
const kta = require('./routes/kta');

// Gunakan rute API
app.use( login);
app.use( dataKader);
app.use( sebaranWilayah);
app.use( tambahAkun);
app.use( laporan);
app.use( dashboard);
app.use( profil);
app.use( kta);

// Tes API
app.get("/", (req, res) => {
  res.send("API is running!");
});

// Port server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

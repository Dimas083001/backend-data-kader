const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet'); // Tambahkan helmet untuk keamanan
const path = require('path');

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

// Middleware Keamanan - Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https://backend-data-kader.vercel.app"],
        connectSrc: ["'self'", "https://backend-data-kader.vercel.app"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
  })
);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Middleware untuk mengurai JSON body dari request

// Serve Static Files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '..', 'public')));

// Routes
app.use(login);
app.use(dataKader);
app.use(sebaranWilayah);
app.use(tambahAkun);
app.use(laporan);
app.use(dashboard);
app.use(profil);
app.use(kta);

// Handle Root Request
app.get("/", (req, res) => {
  res.send("API is running!");
});

// Favicon Handler (Menghindari CSP Error)
app.get('/favicon.ico', (req, res) => {
  res.status(204).end(); // No Content untuk menghindari error
});

// Server Listen
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

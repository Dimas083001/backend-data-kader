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

app.use( login)
app.use( dataKader)
app.use( sebaranWilayah)
app.use( tambahAkun)
app.use( laporan)
app.use ( dashboard)
app.use ( profil)
app.use ( kta)

app.get("/", (req, res) => {
  res.send("API is running!");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

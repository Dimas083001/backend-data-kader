const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Load environment variables

// Import routes
const checkDb = require('./routes/checkDb');
const dataKader = require('./routes/dataKader');
const sebaranWilayah = require('./routes/sebaranWilayah');
const laporan = require('./routes/laporan');
const kta = require('./routes/kta');

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Middleware untuk mengurai JSON body dari request
app.use(cors());

// Menyajikan file statis
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '..', 'public')));

// Register routes dengan prefix yang benar
app.use('/checkDb', checkDb);
app.use('/dataKader', dataKader);
app.use('/sebaranWilayah', sebaranWilayah);
app.use('/laporan', laporan);
app.use('/kta', kta);

// Route utama
app.get('/', (req, res) => {
  res.send('API is running!');
});

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

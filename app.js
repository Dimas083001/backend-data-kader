const express = require('express');
const app = express();

const checkDb = require('./routes/checkDb');
// const login = require('./routes/login');
const dataKader = require('./routes/dataKader');
const sebaranWilayah = require('./routes/sebaranWilayah');
const laporan = require('./routes/laporan');
// const tambahAkun = require('./routes/tambahAkun');
// const dashboard = require('./routes/dashboard');
// const profil = require('./routes/profil');
const kta = require('./routes/kta');

// Tambahkan middleware untuk route baru
app.use(checkDb);
// app.use(login);
app.use(dataKader);
app.use(sebaranWilayah);
// app.use(tambahAkun);
app.use(laporan);
// app.use(dashboard);
// app.use(profil);
app.use(kta);

app.get('/', (req, res) => {
  res.send('Aplikasi berjalan dengan benar!');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server berjalan pada port', process.env.PORT || 3000);
});
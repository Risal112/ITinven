const mongoose = require('mongoose');

const peminjamanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  alat: { type: String, required: true },
  date: { type: Date, required: true },
  petugas: { type: String, required: true },
  photo: { type: String, required: false },  // URL atau path ke foto
  status: { type: String, default: 'Belum Dikembalikan' }, // Status default
  returnDate: { type: Date, required: false } // Tanggal pengembalian
});

const Peminjaman = mongoose.model('Peminjaman', peminjamanSchema);

module.exports = Peminjaman;

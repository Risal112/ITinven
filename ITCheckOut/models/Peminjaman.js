const mongoose = require('mongoose');

const peminjamanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  alat: { type: String, required: true },
  date: { type: String, required: true },
  petugas: { type: String, required: true },
<<<<<<< HEAD
  photo: { type: String, required: true }, // Path foto
}, { timestamps: true });
=======
  photo: { type: String, required: false },  // URL atau path ke foto
  status: { type: String, default: 'Belum Dikembalikan' } // Status default
});
>>>>>>> 4489895 (sellesaii)

const Peminjaman = mongoose.model('Peminjaman', peminjamanSchema);

module.exports = Peminjaman;

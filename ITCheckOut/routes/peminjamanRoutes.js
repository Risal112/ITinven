const express = require('express');
const router = express.Router();  // Pastikan router didefinisikan di sini
const multer = require('multer');
const { check, validationResult } = require('express-validator');
const path = require('path');
const Peminjaman = require('../models/Peminjaman');

// Konfigurasi penyimpanan file dengan multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Pastikan folder 'uploads' sudah ada
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Menambahkan timestamp di nama file untuk menghindari duplikat
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });  // Inisialisasi multer dengan konfigurasi penyimpanan

// GET semua peminjaman
router.get('/', async (req, res) => {
  try {
    const peminjamans = await Peminjaman.find();
    res.status(200).json(peminjamans);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data.', error: error.message });
  }
});

// POST peminjaman baru
router.post(
  '/',
  upload.single('photo'),
  [
    check('name', 'Nama wajib diisi').notEmpty(),
    check('alat', 'Nama alat wajib diisi').notEmpty(),
    check('date', 'Tanggal wajib diisi').notEmpty(),
    check('petugas', 'Nama petugas wajib diisi').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, alat, date, petugas } = req.body;
      const photo = req.file ? `/uploads/${req.file.filename}` : null;

      const peminjaman = new Peminjaman({ name, alat, date, petugas, photo });

      // Simpan peminjaman ke database
      await peminjaman.save();

      // Menambahkan pesan sukses di terminal
      console.log(`Data peminjaman berhasil disimpan: ${name}, ${alat}, ${date}, ${petugas}`);

      // Mengirimkan response ke client
      res.status(201).json({ message: 'Data peminjaman berhasil disimpan.' });
    } catch (error) {
      res.status(500).json({ message: 'Gagal menyimpan data.', error: error.message });
    }
  }
);

// PUT untuk memperbarui data peminjaman berdasarkan ID
router.put('/:id', async (req, res) => {
  const { id } = req.params; // Ambil ID dari parameter URL
  const { name, alat, petugas, status } = req.body; // Ambil data yang ingin diperbarui dari request body

  try {
    // Cari peminjaman berdasarkan ID dan perbarui data
    const updatedPeminjaman = await Peminjaman.findByIdAndUpdate(
      id,
      { name, alat, petugas, status }, // Perbarui data peminjaman
      { new: true } // Mengembalikan data yang sudah diperbarui
    );

    // Jika peminjaman tidak ditemukan
    if (!updatedPeminjaman) {
      return res.status(404).json({ message: 'Data peminjaman tidak ditemukan.' });
    }

    // Kirimkan data yang sudah diperbarui
    res.status(200).json(updatedPeminjaman);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Gagal memperbarui data peminjaman.', error: error.message });
  }
});

module.exports = router;

const Peminjaman = require('../models/Peminjaman');

// Proses pengembalian alat
exports.returnItem = async (req, res) => {
  const { returnId } = req.body;

  if (!returnId) {
    return res.status(400).json({ message: 'ID pengembalian wajib diisi.' });
  }

  try {
    const item = await Peminjaman.findById(returnId);
    if (!item) {
      return res.status(404).json({ message: 'Data peminjaman tidak ditemukan.' });
    }

    if (item.status === 'Sudah Dikembalikan') {
      return res.status(400).json({ message: 'Item sudah dikembalikan.' });
    }

    // Perbarui status menjadi 'Sudah Dikembalikan'
    item.status = 'Sudah Dikembalikan';
    await item.save();

    res.status(200).json({ message: 'Item berhasil dikembalikan.', item });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat memproses pengembalian.', error: error.message });
  }
};

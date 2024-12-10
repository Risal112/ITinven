const express = require('express');
const router = express.Router();
const { returnItem } = require('../controllers/returnController');

// Rute untuk proses pengembalian alat
router.post('/return', returnItem);

module.exports = router;

const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

router.get('/download-invoice/:orderId', invoiceController.downloadInvoice);

module.exports = router;

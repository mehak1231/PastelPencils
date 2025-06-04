const PDFDocument = require('pdfkit');
const Order = require('../models/order');
const generateInvoicePDF = require('../utils/invoiceGenerator');

exports.downloadInvoice = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    // Fetch order from DB
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Set response headers to serve PDF as download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=invoice_${orderId}.pdf`);

    // Create PDF document and pipe directly to response
    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    doc.pipe(res);

    // Use your existing invoiceGenerator, but modify it to accept doc as parameter (see below)
    generateInvoicePDF(order, doc);

    doc.end();

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

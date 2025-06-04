const generateInvoicePDF = (order, doc) => {
  // header section
  doc
    .font('Helvetica-Bold')
    .fontSize(24)
    .fillColor('#f979a2')
    .text("Pastel Pencils", { align: 'center' });

  doc.moveDown(0.5);

  doc
    .fontSize(18)
    .fillColor('black')
    .text(`Invoice`, { align: 'center' });

  doc.moveDown(1);

  // Order details section
  doc
    .font('Helvetica-Bold')
    .fontSize(14)
    .text(`Invoice for Order ID: `, { continued: true })
    .font('Helvetica')
    .text(`${order.id}`);

  doc
    .font('Helvetica-Bold')
    .text(`Status: `, { continued: true })
    .font('Helvetica')
    .text(`${order.status}`);

  doc
    .font('Helvetica-Bold')
    .text(`Date: `, { continued: true })
    .font('Helvetica')
    .text(`${new Date(order.createdAt).toLocaleString()}`);

  doc
    .font('Helvetica-Bold')
    .text(`Total Amount: `, { continued: true })
    .font('Helvetica')
    .text(`₹${order.totalAmount}`);

  doc.moveDown(1.5);

  // Shipping address section
  doc
    .font('Helvetica-Bold')
    .fontSize(16)
    .fillColor('#f979a2')
    .text("Shipping Address");

  doc.moveDown(0.3);

  doc
    .font('Helvetica')
    .fontSize(12)
    .fillColor('black')
    .text(`${order.address.firstName} ${order.address.lastName}`);
  doc.text(`${order.address.street}`);
  doc.text(`${order.address.city}, ${order.address.state} ${order.address.zipCode}`);
  doc.text(`${order.address.country}`);
  doc.text(`Phone: ${order.address.phone}`);

  doc.moveDown(1.5);

  // Billing address section
  doc
    .font('Helvetica-Bold')
    .fontSize(16)
    .fillColor('#f979a2')
    .text("Order Items");

  doc.moveDown(0.3);

  const tableTop = doc.y;
  const itemX = 50;
  const descX = 90;
  const qtyX = 350;
  const priceX = 400;
  const totalX = 480;

  doc
    .fontSize(12)
    .fillColor('black')
    .font('Helvetica-Bold')
    .text('#', itemX, tableTop)
    .text('Item Description', descX, tableTop)
    .text('Qty', qtyX, tableTop, { width: 50, align: 'right' })
    .text('Price', priceX, tableTop, { width: 60, align: 'right' })
    .text('Total', totalX, tableTop, { width: 60, align: 'right' });

  doc.moveDown(0.5);

  doc.moveTo(itemX, doc.y).lineTo(totalX + 60, doc.y).stroke();

  let position = doc.y + 5;
  doc.font('Helvetica').fontSize(12);

  order.items.forEach((item, i) => {
    const itemTotal = (item.price * item.quantity).toFixed(2);

    doc
      .text(i + 1, itemX, position)
      .text(item.name, descX, position)
      .text(item.quantity, qtyX, position, { width: 50, align: 'right' })
      .text(`₹${item.price.toFixed(2)}`, priceX, position, { width: 60, align: 'right' })
      .text(`₹${itemTotal}`, totalX, position, { width: 60, align: 'right' });

    position += 20;
  });

  doc.moveDown(2);

  // Total amount section
  doc
    .font('Helvetica-Oblique')
    .fontSize(12)
    .fillColor('gray')
    .text("Thank you for shopping with Pastel Pencils!", { align: 'center' });

  const range = doc.bufferedPageRange();
  for (let i = 0; i < range.count; i++) {
    doc.switchToPage(i);
    doc
      .fontSize(8)
      .fillColor('gray')
      .text(`Page ${i + 1} of ${range.count}`, 520, 760, {
        align: 'right',
      });
  }
};

module.exports = generateInvoicePDF;

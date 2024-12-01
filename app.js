const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());

const receipts = {};

function calculatePoints(receipt) {
  let points = 0;

  // Rule 1
  points += (receipt.retailer.match(/[a-z0-9]/gi) || []).length;

  // Rule 2
  if (parseFloat(receipt.total) % 1 === 0) points += 50;

  // Rule 3
  if (parseFloat(receipt.total) % 0.25 === 0) points += 25;

  // Rule 4
  points += Math.floor(receipt.items.length / 2) * 5;

  // Rule 5
  receipt.items.forEach(item => {
    const trimmedLength = item.shortDescription.trim().length;
    if (trimmedLength % 3 === 0) {
      points += Math.ceil(parseFloat(item.price) * 0.2);
    }
  });

  // Rule 6
  const day = parseInt(receipt.purchaseDate.split('-')[2], 10);
  if (day % 2 !== 0) points += 6;

  // Rule 7
  const [hour, minute] = receipt.purchaseTime.split(':').map(Number);
  if (hour === 14 || (hour === 15 && minute < 60)) points += 10;

  return points;
}

// POST /receipts/process
app.post('/receipts/process', (req, res) => {
  const receipt = req.body;

  if (!receipt || !receipt.retailer || !receipt.total || !receipt.items) {
    return res.status(400).json({ error: 'Invalid receipt data' });
  }

  const id = uuidv4();
  const points = calculatePoints(receipt);

  receipts[id] = { receipt, points };

  res.status(201).json({ id });
});

// GET /receipts/{id}/points
app.get('/receipts/:id/points', (req, res) => {
  const id = req.params.id;

  if (!receipts[id]) {
    return res.status(404).json({ error: 'Receipt not found' });
  }

  res.status(200).json({ points: receipts[id].points });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Receipt Processor is running on port ${PORT}`);
});
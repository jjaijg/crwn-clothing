const express = require('express');
const path = require('path');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server is running on port ${port}`);
});

app.post('/payment', (req, res) => {
  const { token, amount } = req.body;

  const body = {
    source: token.id,
    amount,
    currency: 'inr',
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) return res.status(500).json({ error: stripeErr });
    return res.status(200).json({ success: stripeRes });
  });
});

const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'FoodExpress API is running' });
});

app.get('/api/menu', (req, res) => {
  res.json([
    { id: 1, name: 'Burger', price: 5.99 },
    { id: 2, name: 'Pizza', price: 8.99 }
  ]);
});

app.get('/api/orders', (req, res) => {
  res.json([
    { id: 101, item: 'Burger', status: 'Preparing' },
    { id: 102, item: 'Pizza', status: 'Delivered' }
  ]);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

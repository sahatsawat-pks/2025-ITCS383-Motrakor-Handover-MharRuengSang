require('dotenv').config();
require('./db');
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const gamesRoutes = require('./routes/games');
const cartRoutes = require('./routes/cart');
const purchasesRoutes = require('./routes/purchases');
const wishlistRoutes = require('./routes/wishlist');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/games', gamesRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/purchases', purchasesRoutes);
app.use('/api/wishlist', wishlistRoutes);

// Routes (we'll add these soon)
app.get('/', (req, res) => {
  res.json({ message: 'SteamJek API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
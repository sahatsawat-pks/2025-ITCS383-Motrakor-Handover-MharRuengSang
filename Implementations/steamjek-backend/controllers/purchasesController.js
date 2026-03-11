const pool = require('../db');

// GET USER PURCHASES
const getPurchases = async (req, res) => {
  const user_id = req.user.id;
  try {
    const result = await pool.query(
      `SELECT purchases.id, games.title, games.cover_image,
              purchases.amount, purchases.purchased_at
       FROM purchases
       JOIN games ON purchases.game_id = games.id
       WHERE purchases.user_id = $1
       ORDER BY purchases.purchased_at DESC`,
      [user_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// MAKE PURCHASE (checkout cart)
const makePurchase = async (req, res) => {
  const user_id = req.user.id;
  try {
    // Get all items in cart
    const cartItems = await pool.query(
      `SELECT cart.game_id, games.price
       FROM cart
       JOIN games ON cart.game_id = games.id
       WHERE cart.user_id = $1`,
      [user_id]
    );

    if (cartItems.rows.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Insert each cart item into purchases
    for (const item of cartItems.rows) {
      await pool.query(
        'INSERT INTO purchases (user_id, game_id, amount) VALUES ($1, $2, $3)',
        [user_id, item.game_id, item.price]
      );
    }

    // Clear the cart after purchase
    await pool.query(
      'DELETE FROM cart WHERE user_id = $1', [user_id]
    );

    // Calculate total
    const total = cartItems.rows.reduce(
      (sum, item) => sum + parseFloat(item.price), 0
    );

    res.status(201).json({
      message: 'Purchase successful',
      items_purchased: cartItems.rows.length,
      total_amount: total.toFixed(2)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getPurchases, makePurchase };
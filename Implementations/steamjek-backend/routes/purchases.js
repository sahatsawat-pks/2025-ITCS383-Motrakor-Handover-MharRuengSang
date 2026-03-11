const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const {
  getPurchases,
  makePurchase
} = require('../controllers/purchasesController');

router.get('/', authenticateToken, getPurchases);
router.post('/', authenticateToken, makePurchase);

module.exports = router;
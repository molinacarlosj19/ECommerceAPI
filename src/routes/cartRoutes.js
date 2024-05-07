const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Cart Routes
router.post('/:userId/add', cartController.addToCart);
router.get('/:userId', cartController.getCartByUserId);
router.put('/:userId/:itemId', cartController.updateCartItem);
router.delete('/:userId/:itemId', cartController.removeCartItem);

module.exports = router;

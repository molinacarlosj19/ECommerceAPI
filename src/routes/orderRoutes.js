const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Order Routes
router.post('/', orderController.createOrder);
router.get('/:orderId', orderController.getOrderById);
router.put('/:orderId', orderController.updateOrder);
router.delete('/:orderId', orderController.deleteOrder);

module.exports = router;

const cartModel = require('../models/cartModel');

// Cart Controller Functions
exports.addToCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { productId, quantity } = req.body;
    
    // Add product to user's cart
    const cartItem = await cartModel.addToCart(userId, productId, quantity);
    res.status(200).json(cartItem);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getCartByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    // Get user's cart
    const cart = await cartModel.getCartByUserId(userId);
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error getting cart by user ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const userId = req.params.userId;
    const itemId = req.params.itemId;
    const { quantity } = req.body;

    // Update cart item quantity
    await cartModel.updateCartItem(userId, itemId, quantity);
    res.status(200).json({ message: "Cart item updated successfully" });
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    const userId = req.params.userId;
    const itemId = req.params.itemId;

    // Remove cart item
    await cartModel.removeCartItem(userId, itemId);
    res.status(200).json({ message: "Cart item removed successfully" });
  } catch (error) {
    console.error("Error removing cart item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

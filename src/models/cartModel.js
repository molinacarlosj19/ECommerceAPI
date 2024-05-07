// cartModel.js
const pool = require('../database/db');

const cartModel = {
  addToCart: async (userId, productId, quantity) => {
    const checkCartItemQuery = 'SELECT * FROM cart_items WHERE cart_id = (SELECT cart_id FROM shopping_carts WHERE user_id = $1) AND product_id = $2';
    const checkCartItemValues = [userId, productId];
    const { rows: existingCartItem } = await pool.query(checkCartItemQuery, checkCartItemValues);

    if (existingCartItem.length > 0) {
      // If the product already exists in the user's cart, update the quantity
      const updateCartItemQuery = 'UPDATE cart_items SET quantity = $1 WHERE cart_id = (SELECT cart_id FROM shopping_carts WHERE user_id = $2) AND product_id = $3';
      const updateCartItemValues = [existingCartItem[0].quantity + quantity, userId, productId];
      await pool.query(updateCartItemQuery, updateCartItemValues);
      return { message: 'Quantity updated in cart' };
    } else {
      // If the product doesn't exist in the user's cart, add it
      const addToCartQuery = 'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ((SELECT cart_id FROM shopping_carts WHERE user_id = $1), $2, $3)';
      const addToCartValues = [userId, productId, quantity];
      await pool.query(addToCartQuery, addToCartValues);
      return { message: 'Product added to cart' };
    }
  },
  
  getCartByUserId: async (userId) => {
    const getCartQuery = `
      SELECT 
        ci.item_id, 
        p.product_id, 
        p.name, 
        p.description, 
        p.price, 
        p.image_url, 
        ci.quantity 
      FROM 
        cart_items ci 
      INNER JOIN 
        products p ON ci.product_id = p.product_id 
      WHERE 
        ci.cart_id = (SELECT cart_id FROM shopping_carts WHERE user_id = $1)
    `;
    const { rows: cartItems } = await pool.query(getCartQuery, [userId]);
    return cartItems;
  },
  
  updateCartItem: async (userId, itemId, quantity) => {
    const updateCartItemQuery = 'UPDATE cart_items SET quantity = $1 WHERE cart_id = (SELECT cart_id FROM shopping_carts WHERE user_id = $2) AND item_id = $3';
    const updateCartItemValues = [quantity, userId, itemId];
    await pool.query(updateCartItemQuery, updateCartItemValues);
  },
  
  removeCartItem: async (userId, itemId) => {
    const removeCartItemQuery = 'DELETE FROM cart_items WHERE cart_id = (SELECT cart_id FROM shopping_carts WHERE user_id = $1) AND item_id = $2';
    const removeCartItemValues = [userId, itemId];
    await pool.query(removeCartItemQuery, removeCartItemValues);
  }
};

module.exports = cartModel;

const productModel = require('../models/productModel');

// Product Controller Functions
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl } = req.body;
    
    // Create new product
    const newProduct = await productModel.createProduct({ name, description, price, imageUrl });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    // Get all products
    const products = await productModel.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error getting all products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    // Get product by ID
    const product = await productModel.getProductById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error getting product by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { name, description, price, imageUrl } = req.body;

    // Check if product exists
    const product = await productModel.getProductById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update product information
    await productModel.updateProduct(productId, { name, description, price, imageUrl });
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Check if product exists
    const product = await productModel.getProductById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete product
    await productModel.deleteProduct(productId);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

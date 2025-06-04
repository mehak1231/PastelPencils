const Product = require("../models/product");
const fs = require("fs");

// Add a new product
const addProduct = async (req, res) => {
    try {
      console.log("Form data received:", req.body);
      console.log("File received:", req.file);
  
      const image_filename = req.file?.filename; // use optional chaining in case file is undefined
  
      if (!image_filename) {
        return res.status(400).json({ success: false, message: "Image not uploaded" });
      }
  
      const product = await Product.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
        stock: 10
      });
  
      res.status(201).json({
        success: true,
        message: "Product added successfully",
        product,
      });
    } catch (error) {
      console.error("Error in addProduct:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };
  

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const [updated] = await Product.update(
      { name, price, stock },
      { where: { id: req.params.id } }
    );

    if (updated) {
      const updatedProduct = await Product.findByPk(req.params.id);
      res.status(200).json({ message: "Product updated successfully!", updatedProduct });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(200).json({ message: "Product deleted successfully!" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};

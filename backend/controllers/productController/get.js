const Product = require("../../models/product");

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({ isActive: true });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve products",
            error: error.message
        });
    }
};

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve product",
            error: error.message
        });
    }
};

exports.getProductsManagement = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve all products",
            error: error.message
        });
    }
};

exports.getTotalProduct = async (req , res) => {
    try {
        const totalProduct = await Product.countDocuments();
        res.status(200).json(totalProduct);
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve total product",
            error: error.message
        });
    }
}
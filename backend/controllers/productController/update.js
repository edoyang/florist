const Product = require("../../models/product");

exports.updateProduct = async (req, res) => {
    try {
        const { product_name, original_price, price, category, stocks, discount, isActive } = req.body;
        const files = req.files;
        const product_images = files ? files.map(file => file.path) : [];

        const updatedProduct = {
            product_name,
            original_price,
            price,
            category: Array.isArray(category) ? category : [category], // Ensure category is an array
            stocks: parseInt(stocks, 10),
            discount,
            product_image: product_images.length > 0 ? product_images : undefined, // Only update if new images are uploaded
            isActive: isActive === 'true' || isActive === true, // Ensure boolean value
        };

        // Remove undefined fields to prevent overwriting with undefined
        Object.keys(updatedProduct).forEach(key => updatedProduct[key] === undefined && delete updatedProduct[key]);

        const updatedProductResponse = await Product.findByIdAndUpdate(req.params.productId, updatedProduct, { new: true });

        if (!updatedProductResponse) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({
            message: 'Product updated successfully!',
            data: updatedProductResponse
        });
    } catch (error) {
        console.error('Failed to update product:', error);
        res.status(500).json({
            message: 'Failed to update product',
            error: error.message
        });
    }
};
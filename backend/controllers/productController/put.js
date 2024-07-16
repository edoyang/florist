const Product = require("../../models/product");
const cloudinary = require('cloudinary').v2;

exports.updateProduct = async (req, res) => {
    const { productId } = req.params;
    let { product_name, original_price, isDiscounted, discountPercentage, price, stocks, category, removedImages } = req.body;

    if (!Array.isArray(removedImages)) {
        removedImages = removedImages ? [removedImages] : [];  // Ensure it's always an array
    }

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Update basic product fields
        product.product_name = product_name;
        product.original_price = original_price;
        product.isDiscounted = isDiscounted;
        product.discountPercentage = discountPercentage;
        product.price = price;
        product.stocks = stocks;
        product.isActive = stocks > 0;
        product.category = category;

        // Handle deletion of images on Cloudinary
        if (removedImages.length > 0) {
            const deleteImagePromises = removedImages.map(publicId => {
                return cloudinary.uploader.destroy(publicId, { invalidate: true });
            });

            // Await the resolution of all promises
            const deleteResults = await Promise.all(deleteImagePromises);
            console.log("Deletion results:", deleteResults);

            // Filter out the deleted images from the product's image array
            product.product_image = product.product_image.filter(image => 
                !removedImages.includes(image.publicId)
            );
        }

        await product.save();
        res.status(201).json({
            message: 'Product updated successfully!',
            data: product
        });
    } catch (error) {
        console.error('Update failed:', error);
        res.status(500).json({ message: "Failed to update product", error: error.message });
    }
};

import axios from 'axios';

export const handleUpdate = async (productId, name, originalPrice, isDiscounted, discountPercentage, price, stocks, categories = [], images = []) => {
    const formData = new FormData();

    formData.append('product_name', name);
    formData.append('original_price', originalPrice);
    formData.append('price', price);
    categories.forEach(category => formData.append('category', category));
    formData.append('stocks', stocks);
    formData.append('discount', isDiscounted ? discountPercentage : 0);

    images.forEach(image => {
        formData.append('product_image', image.file); // Append the actual file object
    });

    try {
        const response = await axios.put(`http://localhost:3000/update-product/${productId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('Server response:', response.data);
        alert('Product updated successfully');
    } catch (error) {
        console.error('Failed to update product:', error.response?.data || error.message);
    }
};


export const handlePriceInput = (field, value, isDiscounted, discountPercentage, setOriginalPrice, setPrice) => {
    value = parseFloat(value) || 0;  // Ensure working with numbers, defaulting to 0 if invalid

    if (field === 'originalPrice') {
        setOriginalPrice(value);
        if (isDiscounted && discountPercentage > 0) {
            setPrice(value - (value * (discountPercentage / 100)));
        } else {
            setPrice(value);  // No discount, so price matches original price
        }
    } else if (field === 'price' && isDiscounted) {
        setPrice(value);
        const calculatedOriginal = value / (1 - (discountPercentage / 100));
        setOriginalPrice(calculatedOriginal);
    }
};

export const handleImageChange = (event, setImages) => {
    const files = event.target.files;
    if (files.length) {
        const newImages = Array.from(files).map(file => ({
            url: URL.createObjectURL(file),
            file, // Store the actual file object for form submission
            name: file.name
        }));
        setImages(prevImages => [...prevImages, ...newImages]); 
    }
    event.target.value = null;
};

export const removeImage = async (index, imageUrl, setImages) => {
    try {
        const response = await axios.delete('http://localhost:3000/delete-image', { data: { imageUrl } });
        console.log('Delete response:', response.data);
        setImages(currentImages => currentImages.filter((_, i) => i !== index)); // Remove from state if deletion was successful
        alert('Image deleted successfully');
    } catch (error) {
        console.error('Failed to delete image:', error.response?.data || error.message);
        alert('Failed to delete image');
    }
};
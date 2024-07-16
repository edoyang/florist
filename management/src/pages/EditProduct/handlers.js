import axios from 'axios';

export const imageCompare = (originalImages, currentImages) => {
    const originalKeys = new Set(originalImages.map(img => img.id)); // Using unique IDs
    const currentKeys = new Set(currentImages.map(img => img.id));

    const added = currentImages.filter(img => !originalKeys.has(img.id));
    const removed = originalImages.filter(img => !currentKeys.has(img.id));
    const unchanged = currentImages.filter(img => originalKeys.has(img.id));

    return { added, removed, unchanged };
};


export const handleUpdate = async (productId, name, originalPrice, isDiscounted, discountPercentage, price, stocks, categories, originalImages, currentImages) => {
    const { added, removed, unchanged } = imageCompare(originalImages, currentImages);
    console.log('Added Images:', added);
    console.log('Removed Images:', removed);
    console.log('Unchanged Images:', unchanged);

    const formData = new FormData();
    formData.append('product_name', name);
    formData.append('original_price', originalPrice);
    formData.append('isDiscounted', isDiscounted);
    formData.append('discountPercentage', discountPercentage);
    formData.append('price', price);
    formData.append('stocks', stocks);
    categories.forEach(category => formData.append('category', category));
    formData.append('isActive', stocks > 0);
    formData.append('addedImages', JSON.stringify(added.map(img => img.file.name)));
    removed.forEach(image => {
        formData.append('removedImages', image.publicId);  // Send each publicId directly, not as JSON
    });
    added.forEach(image => {
        formData.append('product_image', image.file);  // Append the actual file object
    });
    const updateData = {
        product_name: name,
        original_price: originalPrice,
        isDiscounted: isDiscounted,
        discountPercentage: discountPercentage,
        price: price,
        stocks: stocks,
        category: categories.filter(cat => cat.checked).map(cat => cat.id),
        addedImages: added.map(img => img.file.name),
        removedImages: removed.map(img => img.publicId),
    };

    console.log ('Sending data:', updateData);

    try {
        const response = await axios.put(`http://localhost:3000/update-product/${productId}`, formData);
        console.log('Server response:', response.data);
        alert('Product updated successfully');
    } catch (error) {
        console.error('Failed to update product:', error.response?.data || error.message);
        alert('Failed to update product: ' + (error.response?.data.error || error.message));
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
            file,
            name: file.name,
        }));
        setImages(prevImages => [...prevImages, ...newImages]); 
    }
    event.target.value = "";  // Clear the input after files are selected
};

export const removeImage = (name, setImages) => {
    setImages(currentImages => currentImages.filter(image => image.name !== name));
};
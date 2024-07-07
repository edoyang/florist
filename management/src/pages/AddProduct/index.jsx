import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './style.scss';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [originalPrice, setOriginalPrice] = useState('');
    const [discountState, setDiscountState] = useState(false);
    const [discount, setDiscount] = useState(0);
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [images, setImages] = useState([]);  
    const [stocks, setStocks] = useState(0);
    const [activeState, setActiveState] = useState(true);

    const { id } = useParams();
    const isEditMode = id !== undefined;

    useEffect(() => {
        if (isEditMode) {
            axios.get(`http://localhost:3000/product/${id}`)
                .then(response => {
                    const product = response.data;
                    setName(product.product_name || '');
                    setOriginalPrice(product.original_price || '');
                    setPrice(product.price || '');
                    setStocks(product.stocks || 0);
                    setDiscountState(product.discount > 0);
                    setDiscount(product.discount || 0);
                    setActiveState(product.isActive !== undefined ? product.isActive : true);
                    setImages(product.product_image.map(img => ({
                        file: undefined,
                        name: img,
                        url: img
                    })));
                    // Update categories based on the product data
                    const productCategories = product.category || [];
                    const updatedCategories = {...categories};
                    Object.keys(categories).forEach(category => {
                        updatedCategories[category] = productCategories.includes(category);
                    });
                    setCategories(updatedCategories);
                })
                .catch(error => console.error('Error fetching product:', error));
        }
    }, [id, isEditMode]);
    

    const [categories, setCategories] = useState({
        birthday: false,
        anniversary: false,
        valentine: false,
        gift: false,
        memorial: false
    });

    const handleCategoryChange = (event) => {
        const { name, checked } = event.target;
        setCategories(prev => ({
            ...prev,
            [name]: checked
        }));
    };
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        const selectedCategories = Object.keys(categories).filter(key => categories[key]);
        const formData = new FormData();
        images.forEach(image => {
            if (image.file) {
                formData.append('product_image', image.file);
            }
        });
        formData.append('product_name', name);
        formData.append('original_price', originalPrice);
        formData.append('price', price);
        formData.append('stocks', stocks);
        selectedCategories.forEach(category => {
            formData.append('category', category); // Append each category as a separate entry
        });
        formData.append('discount', discount);
        formData.append('isActive', activeState);
    
        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const response = isEditMode ?
                await axios.put(`http://localhost:3000/products/${id}`, formData, config) :
                await axios.post('http://localhost:3000/add-product', formData, config);
            console.log(`${isEditMode ? 'Product updated' : 'Product added'}:`, response.data);
            alert(`${isEditMode ? 'Product updated' : 'Product added'} successfully!`);
        } catch (error) {
            console.error(`Error ${isEditMode ? 'updating' : 'adding'} product:`, error);
        }
    };
    

    const handleDiscountToggle = (e) => {
        const checked = e.target.checked;
        setDiscountState(checked);
        if (!checked) {
            setPrice(originalPrice);
            setDiscount(0);
        } else {
            setPrice(originalPrice);
            setDiscount('');
        }
    };

    const handleActiveToggle = (e) => {
        setActiveState(e.target.checked);
    };

    const handleOriginalPriceChange = (e) => {
        const newOriginalPrice = e.target.value;
        setOriginalPrice(newOriginalPrice);
        if (!discountState) {
            setPrice(newOriginalPrice);
        }
    };

    const handleDiscountChange = (e) => {
        const newDiscount = e.target.value;
        setDiscount(newDiscount);
        if (discountState && originalPrice) {
            const calculatedPrice = originalPrice - (originalPrice * newDiscount / 100);
            setPrice(calculatedPrice.toFixed(2));
        }
    };

    const handlePriceChange = (e) => {
        const newPrice = e.target.value;
        setPrice(newPrice);
        if (discountState && originalPrice) {
            const newDiscount = ((originalPrice - newPrice) / originalPrice) * 100;
            setDiscount(newDiscount.toFixed(2));
        }
    };

    const handleImageChange = (e) => {
        const fileObjects = Array.from(e.target.files);
        const newImages = fileObjects.map(file => ({
            file,
            name: file.name,
            url: URL.createObjectURL(file)  // Create URL once when file is added
        }));
        setImages(newImages);
    };
    
    useEffect(() => {
        // Clean up the created URLs on component unmount or when images change
        return () => {
            images.forEach(image => URL.revokeObjectURL(image.url));
        };
    }, [images]);

    const removeImage = async (image, index) => {
        // Check if the image has been uploaded (i.e., has a file object)
        if (image.file) {
            // If it's a new image (with a file object), remove it from the local state
            setImages(images.filter((_, idx) => idx !== index));
        } else if (image.url) {
            // If it's an existing image from the server, attempt to delete it
            try {
                await axios.delete(`http://localhost:3000/images/${image.name}`); // Adjust this endpoint as needed
                setImages(images.filter((_, idx) => idx !== index));
            } catch (error) {
                console.error('Failed to delete image:', error);
                // Optionally handle this error more gracefully in the UI
            }
        }
    };

    return (
        <div className='add-product-page'>
            <div className="add-product-title">
                <h1>Product Details</h1>
            </div>

            <form className="flex-group" onSubmit={handleSubmit}>
                <div className="left">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input required type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="form-group original-price">
                        <label htmlFor="original-price">Original Price</label>
                        <input required type="number" id="original-price" name="original-price" value={originalPrice} onChange={handleOriginalPriceChange} />

                        <label htmlFor="discount-state">Discount</label>
                        <input type="checkbox" id="discount-state" name="discount-state" checked={discountState} onChange={handleDiscountToggle} />
                        <label htmlFor="discount-state" className='toggle-button'></label>

                        <label htmlFor="discount">Discount (%)</label>
                        <input required type="number" id='discount' name='discount' value={discount} onChange={handleDiscountChange} disabled={!discountState} />

                        <label htmlFor="price">Price</label>
                        <input required type="number" id="price" name="price" value={price} onChange={handlePriceChange} disabled={!discountState} />
                    </div>

                    <div className="form-group category">
                        <label>Category</label>
                        <div className="categories">
                            {Object.keys(categories).map((category, index) => (
                                <React.Fragment key={index}>
                                    <input 
                                        type="checkbox" 
                                        id={category} 
                                        name={category} 
                                        value={category} 
                                        checked={categories[category]} 
                                        onChange={handleCategoryChange} 
                                    />
                                    <label className={`category-button ${category}`} htmlFor={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</label>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>


                    <div className="form-group">
                        <label htmlFor="stocks">Stocks</label>
                        <input required type="number" id="stocks" name="stocks" value={stocks} onChange={(e) => setStocks(e.target.value)} />
                    </div>

                    {isEditMode ? (
                        <>
                            <label htmlFor="active-state">Active</label>
                            <input type="checkbox" 
                                id="active-state" 
                                name="active-state" 
                                checked={activeState} 
                                onChange={(e) => setActiveState(e.target.checked)} />
                            <label htmlFor="active-state" className='toggle-button'></label>
                        </>
                    ) : null}
                    
                </div>

                <div className="right">
                    <div className="image-preview">
                        {images.map((image, index) => (
                            <div key={index} className="image-container">
                                <img src={image.url} alt={`Preview ${index}`} />
                                <button type="button" onClick={() => removeImage(image, index)}>Remove</button>
                            </div>
                        ))}
                    </div>


                    <div className="image-drop">
                        <label htmlFor="image">Drop your image here</label>
                        <input multiple type="file" id="image" name="image" onChange={handleImageChange} />
                    </div>
                
                    <div className="buttons">
                        <button type='submit' className="btn-primary">Add Product</button>
                        <button type='button' className="btn-danger">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
import React, { useState } from 'react';
import './style.scss';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [originalPrice, setOriginalPrice] = useState('');
    const [discountState, setDiscountState] = useState(false);
    const [discount, setDiscount] = useState(0);
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [priceSource, setPriceSource] = useState('manual'); // New state to track source of price change

    const handleDiscountToggle = (e) => {
        const checked = e.target.checked;
        setDiscountState(checked);
        if (!checked) {
            setPrice(originalPrice);
            setDiscount(0);
        } else {
            setPrice('');
            setDiscount('');
        }
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
        setPriceSource('discount');
        if (discountState && originalPrice) {
            const calculatedPrice = originalPrice - (originalPrice * newDiscount / 100);
            setPrice(calculatedPrice.toFixed(2));
        }
    };

    const handlePriceChange = (e) => {
        const newPrice = e.target.value;
        setPrice(newPrice);
        setPriceSource('manual');
        if (discountState && originalPrice) {
            const newDiscount = ((originalPrice - newPrice) / originalPrice) * 100;
            setDiscount(newDiscount.toFixed(2));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setUploadProgress(0); // Reset upload progress
        }
    };

    const uploadImage = () => {
        // Simulate an upload
        const interval = setInterval(() => {
            setUploadProgress(oldProgress => {
                const newProgress = oldProgress + 10;
                if (newProgress >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return newProgress;
            });
        }, 200);
    };

    return (
        <div className='add-product-page'>
            <div className="add-product-title">
                <h1>Product Details</h1>
            </div>

            <form className="flex-group">
                <div className="left">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group original-price">
                        <label htmlFor="original-price">Original Price</label>
                        <input type="number" id="original-price" name="original-price" value={originalPrice} onChange={handleOriginalPriceChange} />
                        
                        <label htmlFor="discount-state">Discount</label>
                        <input type="checkbox" id="discount-state" name="discount-state" checked={discountState} onChange={handleDiscountToggle} />
                        <label htmlFor="discount-state" className='toggle-button'></label>

                        <label htmlFor="discount">Discount (%)</label>
                        <input type="number" id='discount' name='discount' value={discount} onChange={handleDiscountChange} disabled={!discountState} />

                        <label htmlFor="price">Price</label>
                        <input type="number" id="price" name="price" value={price} onChange={handlePriceChange} disabled={!discountState} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <input type="text" id="category" name="category" />
                    </div>
                </div>

                <div className="right">
                    <div className="image-preview">
                        {image && <img src={URL.createObjectURL(image)} alt="preview" />}
                    </div>
                    
                    <div className="image-drop">
                        <label htmlFor="image">Drop your image here</label>
                        <input type="file" id="image" name="image" onChange={handleImageChange} />
                    </div>

                    <div className="upload-status">
                        {image && (
                            <div className="product">
                                <div className="image-container">
                                    <img src={URL.createObjectURL(image)} alt="Product thumbnail" />
                                </div>

                                <div className="upload-progress">
                                    <p>{image.name}</p>
                                    <div className="progress-bar">
                                        <div className="progress" style={{ width: `${uploadProgress}%` }}></div>
                                    </div>
                                </div>

                                <div className="upload-validity">
                                    <p>{uploadProgress === 100 ? 'Uploaded' : 'Uploading...'}</p>
                                </div>

                                <div className="remove">
                                    <button onClick={() => setImage(null)}>Remove this image</button>
                                </div>
                            </div>
                        )}
                    </div>
                
                    <div className="buttons">
                        <button type='submit' className="btn-primary" onClick={uploadImage}>Add Product</button>
                        <button className="btn-danger">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;

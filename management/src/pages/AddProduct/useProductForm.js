import React from 'react';
import { useState } from 'react';

const ProductForm = ({
    name, setName,
    originalPrice, handleOriginalPriceChange,
    discountState, handleDiscountToggle,
    discount, handleDiscountChange,
    price, handlePriceChange,
    categories, handleCategoryChange,
    stocks, setStocks,
    activeState, setActiveState,
    images, removeImage,
    handleImageChange,
    handleSubmit,
    isEditMode
}) => {
    return (
        <form className="flex-group" onSubmit={handleSubmit}>
            <div className="left">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input required type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="original-price">Original Price</label>
                    <input required type="number" id="original-price" name="original-price" value={originalPrice} onChange={handleOriginalPriceChange} />
                </div>

                <label htmlFor="discount-state">Discount</label>
                <input type="checkbox" id="discount-state" name="discount-state" checked={discountState} onChange={handleDiscountToggle} />
                <label htmlFor="discount-state" className='toggle-button'></label>

                <div className="form-group">
                    <label htmlFor="discount">Discount (%)</label>
                    <input required type="number" id="discount" name="discount" value={discount} onChange={handleDiscountChange} disabled={!discountState} />
                </div>

                <div className="form-group">
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
                                <label htmlFor={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</label>
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="stocks">Stocks</label>
                    <input required type="number" id="stocks" name="stocks" value={stocks} onChange={(e) => setStocks(e.target.value)} />
                </div>

                {isEditMode && (
                    <div className="form-group">
                        <label htmlFor="active-state">Active</label>
                        <input type="checkbox" id="active-state" name="active-state" checked={activeState} onChange={(e) => setActiveState(e.target.checked)} />
                    </div>
                )}
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
                    <button type='submit' className="btn-primary">{isEditMode ? 'Update Product' : 'Add Product'}</button>
                    <button type='button' className="btn-danger">Cancel</button>
                </div>
            </div>
        </form>
    );
};

export default ProductForm;

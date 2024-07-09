import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FormGroup from '../../components/FormGroup';
import CategoriesFormGroup from '../../components/CategoriesFormGroup';
import { handleImageChange, removeImage, handlePriceInput, handleUpdate } from './handlers';
import useOptimistic from '../../utils/useOptimistic';
import './style.scss';

const EditProduct = () => {
    const { productId } = useParams(); // Ensure this is correct
    const [images, setImages] = useState([]);
    const [name, setName] = useState('');
    const [originalPrice, setOriginalPrice] = useState('');
    const [isDiscounted, setIsDiscounted] = useState(false);
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [price, setPrice] = useState('');
    const [stocks, setStocks] = useState('');
    const [categories, setCategories] = useState([
        { id: 'birthday', label: 'Birthday', checked: false },
        { id: 'anniversary', label: 'Anniversary', checked: false },
        { id: 'valentine', label: 'Valentine', checked: false },
        { id: 'graduation', label: 'Graduation', checked: false },
        { id: 'gift', label: 'Gift', checked: false },
        { id: 'memorial', label: 'Memorial', checked: false }
    ]);
    const [isActive, setIsActive] = useState(false);

    const { state, isPending, error, run } = useOptimistic(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/product/${productId}`);
                const product = response.data;
    
                setName(product.product_name);
                setOriginalPrice(product.original_price);
                setPrice(product.price);
                setStocks(product.stocks);
                setIsActive(product.isActive);
                setDiscountPercentage(product.discount);
                setIsDiscounted(product.discount > 0);
                setImages(product.product_image.map((imageUrl, index) => ({ url: imageUrl, name: imageUrl })));
    
                // Update categories based on fetched product
                const productCategories = product.category; // Array of categories from the product
                setCategories(categories.map(category => ({
                    ...category,
                    checked: productCategories.includes(category.id) // Check if category.id is in the product's category array
                })));
            } catch (error) {
                console.error("Failed to retrieve product", error);
            }
        };
    
        fetchProduct();
    }, [productId]); // Only rerun if productId changes
    

    return (
        <div className='edit-product-page'>
            <div className="edit-product-page-title">
                <h1>Edit Product</h1>
            </div>

            <form className="edit-product-form">
                <div className="left">
                    <FormGroup label="Name" id="name" type="text" required value={name} onChange={e => setName(e.target.value)} />
                    <FormGroup label="Original Price" id="original-price" type="number" required value={originalPrice}
                        onChange={e => handlePriceInput('originalPrice', e.target.value, isDiscounted, discountPercentage, setOriginalPrice, setPrice)} />
                    <FormGroup label="Discount" id="discount-state" type="checkbox" checkbox value={isDiscounted} onChange={e => setIsDiscounted(e.target.checked)} />
                    <FormGroup label="Discount (%)" id="discount" type="number" required disabled={!isDiscounted} value={discountPercentage} onChange={e => setDiscountPercentage(parseFloat(e.target.value) || 0)} />
                    <FormGroup label="Price" id="price" type="number" required disabled={!isDiscounted} value={price}
                        onChange={e => handlePriceInput('price', e.target.value, isDiscounted, discountPercentage, setOriginalPrice, setPrice)} />
                    <FormGroup label="Stocks" id="stocks" type="number" required value={stocks} onChange={e => setStocks(parseInt(e.target.value, 10) || 0)} />
                    <CategoriesFormGroup categories={categories} setCategories={setCategories} />
                    <FormGroup label="Active" id="active-state" type="checkbox" checkbox value={isActive} onChange={e => setIsActive(e.target.checked)} />
                </div>

                <div className="right">
                    <div className="image-preview">
                        {images.map((image, index) => (
                            <div className="image-container" key={index} onClick={() => removeImage(index, setImages)}>
                                <img src={image.url} draggable="false" alt="Uploaded Preview" style={{ cursor: 'pointer' }} />
                                <span className="remove-image">Remove this image?</span>
                            </div>
                        ))}
                    </div>

                    <div className="image-drop">
                        <input type="file" id="image-upload" name="image-upload" accept="image/*" multiple onChange={(event) => handleImageChange(event, setImages)} />
                        <label htmlFor="image-upload">Click to upload image</label>
                        <div className="file-names">
                            {images.map(image => 
                                <span key={image.name}>{image.name}</span>
                            )}
                        </div>
                    </div>
                    <button type='button' onClick={handleUpdate} disabled={isPending}>
                        {isPending ? 'Updating...' : 'Update Product'}
                    </button>
                    {error && <div className="error">{error.message}</div>}
                </div>
            </form>
        </div>
    );
}

export default EditProduct;

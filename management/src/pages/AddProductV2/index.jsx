import { useEffect, useState } from 'react';
import { handleImageChange, removeImage, handlePriceInput, handleSubmit } from './handlers'; 
import FormGroup from '../../components/FormGroup';
import CategoriesFormGroup from '../../components/CategoriesFormGroup';
import useOptimistic from '../../utils/useOptimistic';  // Correct the import path to your utils folder
import './style.scss';

const AddProductV2 = () => {
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

    const { state, isPending, error, run } = useOptimistic(null);

    useEffect(() => {
        if (isDiscounted) {
            if (discountPercentage === 0) {
                setPrice(originalPrice); 
                setDiscountPercentage(0);
            } else {
                const original = parseFloat(originalPrice);
                const discount = parseFloat(discountPercentage);
                const discountedPrice = original - (original * (discount / 100));
                setPrice(discountedPrice.toFixed(2));
            }
        } else {
            setDiscountPercentage(0); 
            setPrice(originalPrice);
        }
    }, [originalPrice, discountPercentage, isDiscounted]);

    const handleFormSubmit = () => {
        const selectedCategories = categories.filter(category => category.checked).map(category => category.id);
        run(() => handleSubmit(name, originalPrice, isDiscounted, discountPercentage, price, stocks, selectedCategories, images));
    };

    const logAllStates = () => {
        console.log("Images: ", images);
        console.log("Name: ", name);
        console.log("Original Price: ", originalPrice);
        console.log("Is Discounted: ", isDiscounted);
        console.log("Discount Percentage: ", discountPercentage);
        console.log("Price: ", price);
        console.log("Stocks: ", stocks);
        console.log("Categories: ", categories);
    };

    return (
        <div className='add-product-page'>
            <div className="add-product-page-title">
                <h1>Add Product</h1>
            </div>

            <form className="add-product-form">
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
                    <button type='button' onClick={logAllStates}>Logging</button>
                    <button type='button' onClick={handleFormSubmit} disabled={isPending}>
                        {isPending ? 'Sending...' : 'Add Product'}
                    </button>
                    {error && <div className="error">{error.message}</div>}
                </div>
            </form>
        </div>
    );
};

export default AddProductV2;
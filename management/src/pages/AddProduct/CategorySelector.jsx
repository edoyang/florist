import React from 'react';

const CategorySelector = ({ categories, handleCategoryChange }) => {
    return (
        <div className="categories">
            {Object.keys(categories).map((category, index) => (
                <label key={index}>
                    <input 
                        type="checkbox" 
                        id={category} 
                        name={category} 
                        checked={categories[category]} 
                        onChange={handleCategoryChange} 
                    />
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </label>
            ))}
        </div>
    );
};

export default CategorySelector;  // Ensure this uses 'export default'

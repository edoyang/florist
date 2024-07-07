import React from 'react';

const CategoriesFormGroup = ({ categories, setCategories }) => {
    const handleCategoryChange = (event) => {
        const { id, checked } = event.target;
        setCategories(prev => {
            const newCategories = prev.map(category =>
                category.id === id ? { ...category, checked } : category
            );
            return newCategories;
        });
    };

    return (
        <div className="form-group category">
            <p>Category</p>
            <div className="categories">
                {categories.map(category => (
                    <React.Fragment key={category.id}>
                        <input
                            type="checkbox"
                            id={category.id}
                            name={category.id}
                            checked={category.checked || false}
                            onChange={handleCategoryChange}
                        />
                        <label htmlFor={category.id} className={category.id}>{category.label}</label>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default CategoriesFormGroup;

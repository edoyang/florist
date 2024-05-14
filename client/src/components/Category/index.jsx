import React, { useEffect, useState } from 'react';
import products from '../../dummy/product.json';
import categorySvg from '/category.svg';
import { Link } from 'react-router-dom';

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const uniqueCategories = new Set();
    products.forEach(product => {
      product.category.forEach(cat => uniqueCategories.add(cat));
    });
    setCategories(Array.from(uniqueCategories)); 
  }, []);

  const generateSlug = (categoryName) => {
    return categoryName.toLowerCase().replace(/\s+/g, '-');
  };

  const slugToSpace = (categoryName) => {
    return categoryName.replace(/-/g, '');
  };

  const getImageSrc = (categoryName) => {
    const slug = generateSlug(categoryName);
    return `/${slug}.svg`;
  };

  return (
    <div className="category">
      <div className="label">
        <img draggable="false" src={categorySvg} alt="Category" />
        <p>CATEGORY</p>
      </div>
      <div className="list">
        {categories.map((category, index) => (
          <Link to={`/browse/${generateSlug(category)}`} className="label" key={index}>
            <img draggable="false" src={getImageSrc(category)} alt={category} />
            <p>{slugToSpace(category)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;

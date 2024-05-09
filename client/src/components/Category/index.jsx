import React, { useEffect, useState } from 'react';
import products from '../../dummy/product.json';
import categorySvg from '../../assets/category.svg';
import birthday from '../../assets/birthday.svg';
import anniversary from '../../assets/anniversary.svg';
import forGift from '../../assets/gift.svg';
import inMemorial from '../../assets/in-memorial.svg';
import promo from '../../assets/promo.svg';
import valentine from '../../assets/valentine.svg';

const Category = () => {
  const [categories, setCategories] = useState([]);

  const categoryImages = {
    Birthday: birthday,
    Anniversary: anniversary,
    'For Gift': forGift,
    'In Memorial': inMemorial,
    Valentine: valentine,
    Promo: promo,
  };

  useEffect(() => {
    const uniqueCategories = new Set();
    products.forEach(product => {
      product.category.forEach(cat => uniqueCategories.add(cat));
    });
    setCategories(Array.from(uniqueCategories));
  }, []);

  return (
    <div className="category">
      <div className="label">
        <img draggable="false" src={categorySvg} alt="Category" />
        <p>CATEGORY</p>
      </div>
      <div className="list">
        {categories.map((category, index) => (
          <div className="label" key={index}>
            <img draggable="false" src={categoryImages[category]} alt={category} />
            <p>{category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;

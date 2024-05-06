import React from 'react'

const Category = () => {
  return (
    <div className="category">
    <div className="label">
      <img draggable="false" src="category.svg" alt="category.svg" />
      <p>CATEGORY</p>
    </div>
    <div className="list">
      <div className="label">
        <img draggable="false" src="birthday.svg" alt="birthday.svg" />
        <p>Birthday</p>
      </div>
      <div className="label">
        <img draggable="false" src="anniversary.svg" alt="anniversary.svg" />
        <p>Anniversary</p>
      </div>
      <div className="label">
        <img draggable="false" src="valentine.svg" alt="valentine.svg" />
        <p>Valentine</p>
      </div>
      <div className="label">
        <img draggable="false" src="in-memorial.svg" alt="in-memorial.svg" />
        <p>In Memorial</p>
      </div>
      <div className="label">
        <img draggable="false" src="gift.svg" alt="gift.svg" />
        <p>For Gift</p>
      </div>
      <div className="label">
        <img draggable="false" src="promo.svg" alt="promo.svg" />
        <p>Promo</p>
      </div>
    </div>
  </div>
  )
}

export default Category
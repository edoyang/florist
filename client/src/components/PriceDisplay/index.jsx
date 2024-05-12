const PriceDisplay = ({ product }) => {



  return (
    <div className="price" style={{display: 'flex', gap:'0.25rem'}}>
      {product.discount > 0 ? (
        <>
          <h4>${product.price.toFixed(2)}</h4>
          <strike style={{ color: '#00000050', fontWeight: '600' }}>${product.original_price.toFixed(2)}</strike>
        </>
      ) : (
        <h4>${product.price.toFixed(2)}</h4>
      )}
    </div>
  );
}

export default PriceDisplay;

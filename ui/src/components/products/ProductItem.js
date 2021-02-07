import React from 'react';
import PropTypes from 'prop-types';

const ProductItem = ({ product }) => {
  const { name, description, code } = product;

  return (
    <div className='card'>
      {name} - {description} - {code}
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductItem;

import React from 'react';
import PropTypes from 'prop-types';

const ProductItem = ({ product }) => {
  const { name, description } = product;

  return (
    <div>
      {name} - {description}
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductItem;

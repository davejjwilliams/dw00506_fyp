import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
  const { _id, name, description, code } = product;

  return (
    <div className='col s6 card'>
      <h3>{name}</h3>
      <h5>{code.toUpperCase()}</h5>
      <h4>
        {description}
        <br />
        <Link to={`/product/${_id}`}>View Updates</Link>
      </h4>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductItem;

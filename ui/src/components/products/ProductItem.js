import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
  const { _id, name, image_url, description, code } = product;

  return (
    <div className='col s12 m6 l4'>
      <div className='col-content card'>
        <div class='card-image'>
          <img
            src={image_url}
            alt={name}
            height='150'
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className='card-content'>
          <h3>{name}</h3>
          <h5>{code.toUpperCase()}</h5>
          <p className='truncate'>{description} </p>
          <p>
            <Link to={`/product/${_id}`}>View Updates</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductItem;

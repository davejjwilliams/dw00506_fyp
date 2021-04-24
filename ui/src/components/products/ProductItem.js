import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
  const { _id, name, image_url, description, code } = product;

  return (
    <Link to={`/product/${_id}`} style={{ color: 'black' }}>
      <div className='col s12 m6 l4'>
        <div className='col-content card hoverable'>
          <div className='card-image'>
            <img
              src={image_url}
              alt={name}
              height='150'
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className='card-content'>
            <h4>{name}</h4>
            <h5>{code.toUpperCase()}</h5>
            <p className='truncate'>{description} </p>
            <p style={{ color: 'blue', textDecoration: 'underline' }}>
              View Updates
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductItem;

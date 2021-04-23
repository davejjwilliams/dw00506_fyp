import React, { useState, useContext, useEffect } from 'react';
import ProductContext from '../../context/product/productContext';
import AuthContext from '../../context/auth/authContext';

import M from 'materialize-css/dist/js/materialize.min.js';

const NewProduct = props => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
  }, []);

  const productContext = useContext(ProductContext);
  const {
    error,
    formSuccess,
    addProduct,
    clearProductErrors,
    resetFormSuccess
  } = productContext;

  useEffect(() => {
    if (formSuccess) {
      resetFormSuccess();
      props.history.push('/');
    }
    if (error === 'Product creator must be a seller.') {
      M.toast({ html: 'You must be a seller to create a product.' });
      clearProductErrors();
    }
  }, [error, formSuccess]);

  const [product, setProduct] = useState({
    name: '',
    description: '',
    image_url: '',
    manufacturer_emails: ''
  });

  const { name, description, image_url, manufacturer_emails } = product;

  const onChange = e => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (name === '' || description === '' || image_url === '') {
      M.toast({ html: 'Please enter all required fields.' });
    } else {
      addProduct(product);
    }
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={onSubmit}>
        <div className='input-field'>
          <label className='active' htmlFor='name'>
            Name
          </label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className='input-field'>
          <label className='active' htmlFor='description'>
            Description
          </label>
          <input
            type='text'
            name='description'
            value={description}
            onChange={onChange}
            required
          />
        </div>
        <div className='input-field'>
          <label className='active' htmlFor='image_url'>
            Image URL
          </label>
          <input
            type='text'
            name='image_url'
            value={image_url}
            onChange={onChange}
            required
          />
        </div>
        <div className='input-field'>
          <label className='active' htmlFor='manufacturer_emails'>
            Manufacturers - Enter the emails of all manufacturers working on
            this project, separated by commas.
          </label>
          <input
            type='text'
            name='manufacturer_emails'
            value={manufacturer_emails}
            onChange={onChange}
          />
        </div>
        <input type='submit' value='Submit Product' className='btn' />
      </form>
    </div>
  );
};

export default NewProduct;

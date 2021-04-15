import React, { useState, useContext, useEffect } from 'react';
import ProductContext from '../../context/product/productContext';
import AuthContext from '../../context/auth/authContext';

const NewProduct = props => {
  const authContext = useContext(AuthContext);
  const productContext = useContext(ProductContext);

  useEffect(() => {
    authContext.loadUser();
  }, []);

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
    productContext.addProduct(product);
    setProduct({
      name: '',
      description: '',
      manufacturer_emails: ''
    });
    props.history.push('/');
  };

  return (
    <div>
      <h1>Add New Product</h1>
      <form onSubmit={onSubmit}>
        <div className='input-field'>
          <label className='active' htmlFor='name'>
            Name
          </label>
          <input type='text' name='name' value={name} onChange={onChange} />
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

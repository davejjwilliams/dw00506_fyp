import React, { useState, useContext } from 'react';
import ProductContext from '../../context/product/productContext';

const NewProduct = props => {
  const productContext = useContext(ProductContext);

  const [product, setProduct] = useState({
    name: '',
    description: ''
  });

  const { name, description } = product;

  const onChange = e => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    productContext.addProduct(product);
    setProduct({
      name: '',
      description: ''
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
        <input type='submit' value='Submit Product' className='btn' />
      </form>
    </div>
  );
};

export default NewProduct;

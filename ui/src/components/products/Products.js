import React, { Fragment, useContext, useEffect } from 'react';
import ProductContext from '../../context/product/productContext';
import ProductItem from './ProductItem';

const Products = () => {
  const productContext = useContext(ProductContext);

  const { products, getProducts } = productContext;

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, []);

  if (products.length === 0) {
    return (
      <Fragment>
        <h4>There are no products to show.</h4>
      </Fragment>
    );
  }

  return (
    <div className='row'>
      {products.map(product => (
        <ProductItem product={product} key={product._id} />
      ))}
    </div>
  );
};

export default Products;

import React, { Fragment, useContext, useEffect } from 'react';
import ProductContext from '../../context/product/productContext';
import ProductItem from './ProductItem';

const Products = () => {
  const productContext = useContext(ProductContext);

  const { products, loading, getProducts } = productContext;

  useEffect(() => {
    getProducts();
  }, []);

  if (products.length === 0) {
    return (
      <Fragment>
        <h2>There are no products to show.</h2>
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

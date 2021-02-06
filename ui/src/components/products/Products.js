import React, { Fragment, useContext, useEffect } from 'react';
import ProductContext from '../../context/product/productContext';
import ProductItem from './ProductItem';

const Products = () => {
  const productContext = useContext(ProductContext);

  const { products, getProducts } = productContext;

  useEffect(() => {
    getProducts();
  }, []);

  if (products.length === 0) {
    return (
      <Fragment>
        <h2>You aren't currently tracking any products.</h2>
      </Fragment>
    );
  }

  return (
    <Fragment>
      {products.map(product => (
        <ProductItem product={product} key={product.id} />
      ))}
    </Fragment>
  );
};

export default Products;

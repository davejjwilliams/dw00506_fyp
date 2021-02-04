import React, { Fragment, useContext } from 'react';
import ProductContext from '../../context/product/productContext';
import ProductItem from './ProductItem';

const Products = () => {
  const productContext = useContext(ProductContext);

  const { products } = productContext;

  return (
    <Fragment>
      {products.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </Fragment>
  );
};

export default Products;

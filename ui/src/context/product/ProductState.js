import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import ProductContext from './productContext';
import productReducer from './productReducer';
import { ADD_PRODUCT } from '../types';

const ProductState = props => {
  const initialState = {
    products: [
      {
        id: 1,
        name: 'keyboard',
        description: 'This is a test keyboard',
        code: 'AAAAAA',
        seller_key: 'ABCDEF'
      },
      {
        id: 2,
        name: 'product',
        description: 'This is a test product',
        code: 'BBBBBB',
        seller_key: 'ABCDEF'
      },
      {
        id: 3,
        name: 'shirt',
        description: 'This is a test shirt',
        code: 'CCCCCC',
        seller_key: 'ABCDEF'
      }
    ]
  };

  const [state, dispatch] = useReducer(productReducer, initialState);

  // Add Product
  const addProduct = product => {
    product.id = uuid();
    dispatch({ type: ADD_PRODUCT, payload: product });
  };

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        addProduct
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;

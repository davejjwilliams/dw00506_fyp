import React, { useReducer } from 'react';
import ProductContext from './productContext';
import productReducer from './productReducer';
import {
  GET_PRODUCTS,
  GET_PRODUCT,
  GET_MESSAGES,
  ADD_MESSAGE,
  ADD_PRODUCT,
  CLEAR_PRODUCTS,
  PRODUCT_ERROR
} from '../types';
import axios from 'axios';

const ProductState = props => {
  const initialState = {
    products: [],
    product: {},
    messages: [],
    loading: true,
    error: null
  };

  const [state, dispatch] = useReducer(productReducer, initialState);

  // Get Products
  const getProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      dispatch({ type: GET_PRODUCTS, payload: res.data });
    } catch (err) {
      dispatch({ type: PRODUCT_ERROR, payload: err.response.msg });
    }
  };

  // Get Product
  const getProduct = async id => {
    try {
      const res = await axios.get(`/api/products/${id}`);
      dispatch({ type: GET_PRODUCT, payload: res.data });
    } catch (err) {
      dispatch({ type: PRODUCT_ERROR, payload: err.response.msg });
    }
  };

  // Get Product Messages
  const getProductMessages = async id => {
    try {
      const res = await axios.get(`/api/products/${id}/messages`);
      dispatch({ type: GET_MESSAGES, payload: res.data });
    } catch (err) {
      dispatch({ type: PRODUCT_ERROR, payload: err.response.msg });
    }
  };

  // Submit New Message
  const submitMessage = async message => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(`/api/products/messages`, message, config);
      dispatch({ type: ADD_MESSAGE, payload: res.data });
    } catch (err) {
      dispatch({ type: PRODUCT_ERROR, payload: err.response.msg });
    }
  };

  // Add Product
  const addProduct = async product => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/products', product, config);
      dispatch({ type: ADD_PRODUCT, payload: res.data });
    } catch (err) {
      dispatch({ type: PRODUCT_ERROR, payload: err.response.msg });
    }
  };

  // Submit Code
  const submitCode = async code => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/products/code', { code }, config);
      dispatch({ type: ADD_PRODUCT, payload: res.data });
    } catch (err) {
      dispatch({ type: PRODUCT_ERROR, payload: err.response.msg });
    }
  };

  // Clear Products
  const clearProducts = () => dispatch({ type: CLEAR_PRODUCTS });

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        product: state.product,
        messages: state.messages,
        loading: state.loading,
        error: state.error,
        addProduct,
        getProducts,
        getProduct,
        getProductMessages,
        submitMessage,
        clearProducts,
        submitCode
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;

import React, { useEffect, useContext } from 'react';
import ProductContext from '../../context/product/productContext';
import AuthContext from '../../context/auth/authContext';

import Messages from '../messages/Messages';

const Product = ({ match }) => {
  const productContext = useContext(ProductContext);
  const authContext = useContext(AuthContext);

  const {
    product,
    messages,
    loading,
    getProduct,
    getProductMessages
  } = productContext;
  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
    getProduct(match.params.id);
    getProductMessages(match.params.id);
  }, []);

  return (
    <div>
      <div className='row'>
        <div className='col s6'>
          <img src='https://via.placeholder.com/300' alt='Placeholder' />
        </div>
        <div className='col s6'>
          <h1>{product && product.name}</h1>
          <h5>{product && product.description}</h5>

          {messages.length !== 0 ? (
            <Messages />
          ) : (
            <p>There are no messages to display.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;

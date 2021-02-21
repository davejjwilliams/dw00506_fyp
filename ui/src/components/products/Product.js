import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
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
          <Link to={`/product/${match.params.id}/newmessage`} className='btn'>
            Add Message
          </Link>
          <h1>{product && product.name}</h1>
          <h5>{product && product.description}</h5>
        </div>
      </div>
      <h3 className='center'>Updates</h3>
      <div>
        {messages.length !== 0 ? (
          <Messages messages={messages} />
        ) : (
          <p>There are no messages to display.</p>
        )}
      </div>
    </div>
  );
};

export default Product;

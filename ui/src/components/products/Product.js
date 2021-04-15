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
  const { user, loadUser } = authContext;

  useEffect(() => {
    loadUser();
    getProduct(match.params.id);
    getProductMessages(match.params.id);
  }, []);

  return (
    <div>
      <br />
      <div className='row'>
        <div className='col s12 m6'>
          <img
            src={product.image_url}
            alt='Placeholder'
            height='auto'
            style={{ maxWidth: '100%' }}
          />
        </div>
        <div className='col s12 m6'>
          <h1>{product && product.name}</h1>
          <h5>{product && product.description}</h5>
          <br />
        </div>
      </div>
      <div className='center'>
        <h3>Updates</h3>
        {user && user.role !== 'customer' && (
          <Link to={`/product/${match.params.id}/newmessage`} className='btn'>
            Add Message
          </Link>
        )}
      </div>

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

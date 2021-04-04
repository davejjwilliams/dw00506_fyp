import React, { Fragment, useEffect, useContext } from 'react';
import Products from '../products/Products';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  const { loading, user, loadUser } = authContext;

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Fragment>
      <h1>Your Products</h1>
      <div>
        {user && user.role === 'customer' && (
          <p>Enter a product code to follow a new product.</p>
        )}
        {user && user.role === 'seller' && (
          <p>Add a new product from the top menu button.</p>
        )}
        {user && user.role === 'manufacturer' && (
          <p>Products sellers have included you in will appear below.</p>
        )}
        <Products />
      </div>
    </Fragment>
  );
};
export default Home;

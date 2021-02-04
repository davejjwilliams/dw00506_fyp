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
      <h1>Welcome to the tracking app{user ? `, ${user.name}.` : '.'}</h1>
      <div>
        <Products />
      </div>
    </Fragment>
  );
};
export default Home;

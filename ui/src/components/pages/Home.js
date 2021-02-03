import React, { Fragment } from 'react';
import Products from '../products/Products';

const Home = () => {
  return (
    <Fragment>
      <h1>Welcome to the tracking app.</h1>
      <div>
        <Products />
      </div>
    </Fragment>
  );
};
export default Home;

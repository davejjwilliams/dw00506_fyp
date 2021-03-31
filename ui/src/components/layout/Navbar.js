import React, { Fragment, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ProductContext from '../../context/product/productContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const productContext = useContext(ProductContext);

  const { isAuthenticated, user, loadUser, logout } = authContext;
  const { clearProducts } = productContext;

  useEffect(() => {
    loadUser();
  }, []);

  const onLogout = () => {
    logout();
    clearProducts();
  };

  const authLinks = (
    <Fragment>
      <li>
        <Link to='/'>Welcome, {user && user.name}</Link>
      </li>
      {user && user.role === 'customer' ? (
        <li>
          <Link to='/code'>Enter Code</Link>
        </li>
      ) : (
        <li>
          <Link to='/newproduct'>New Product</Link>
        </li>
      )}
      <li>
        <a onClick={onLogout} href='#!'>
          Logout
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/login'>Sign-In</Link>
      </li>
    </Fragment>
  );

  return (
    <Fragment>
      <nav>
        <div className='nav-wrapper'>
          <Link to='/' className='brand-logo center'>
            {title}
          </Link>
          <a href='#!' data-target='mobile-demo' className='sidenav-trigger'>
            <i className='material-icons'>menu</i>
          </a>
          <ul className='left hide-on-med-and-down'>
            <li>
              <Link to='/about'>About</Link>
            </li>
          </ul>
          <ul className='right hide-on-med-and-down'>
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </nav>

      <ul className='sidenav' id='mobile-demo'>
        <li>
          <Link to='/about'>About</Link>
        </li>
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </Fragment>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: 'Manutrackture',
  icon: 'house'
};

export default Navbar;

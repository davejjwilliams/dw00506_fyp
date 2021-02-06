import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, user, logout } = authContext;

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href='#!'>
          Logout
        </a>
      </li>
      <li>
        <Link to='/newproduct'>New Product</Link>
      </li>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
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
          <a href='#' data-target='mobile-demo' className='sidenav-trigger'>
            <i className='material-icons'>menu</i>
          </a>
          <ul className='right hide-on-med-and-down'>
            <li>
              <Link to='/about'>About</Link>
            </li>
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

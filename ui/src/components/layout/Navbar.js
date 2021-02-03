import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ title, icon }) => {
  return (
    <Fragment>
      <nav>
        <div class='nav-wrapper'>
          <Link to='/' class='brand-logo center'>
            {title}
          </Link>
          <a href='#' data-target='mobile-demo' class='sidenav-trigger'>
            <i class='material-icons'>menu</i>
          </a>
          <ul class='right hide-on-med-and-down'>
            <li>
              <Link to='/about'>About</Link>
            </li>
          </ul>
        </div>
      </nav>

      <ul class='sidenav' id='mobile-demo'>
        <li>
          <Link to='/about'>About</Link>
        </li>
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

import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div>
      <h2>Blockchain-Powered Reassurance</h2>
      <div className='row'>
        <div className='col s12 m6 center'>
          <div className='card'>
            <div className='card-content'>
              <h5>
                Welcome to Manutrackture, the easiest place to keep up with your
                the manufacturing of your ordered items.
              </h5>
            </div>
          </div>
          <Link to='/register' className='btn btn-large blue darken-4'>
            Get Started
          </Link>
          <br />
          <br />
          <div className='divider'></div>
          <div className='card'>
            <div className='card-content'>
              <h5>
                Using the Ethereum blockchain combined with secure digital
                signature schemes, we guarantee that the updates you receive are
                verifiable and always coming from the correct sources.
              </h5>
            </div>
          </div>
          <div className='divider'></div>
          <div className='card'>
            <div className='card-content'>
              <h5>
                If you have received a product code from your seller, create an
                account to track the manufacturing progress of your purchased
                product!
              </h5>
            </div>
          </div>
        </div>
        <div className='col s12 m6 center'>
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/1920px-Ethereum-icon-purple.svg.png'
            alt='Eth'
            style={{ height: '300px' }}
          />
        </div>
      </div>
    </div>
  );
};
export default About;

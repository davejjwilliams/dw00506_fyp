import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div>
      <h1>Blockchain-Powered Reassurance</h1>
      <p>Now using blockchain!</p>
      <Link to='/register' className='btn'>
        Get Started
      </Link>
    </div>
  );
};
export default About;

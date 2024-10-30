import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound: React.FC = () => {
  return (
    <div className="notfound-container">
      <img src="https://i.ibb.co/W6tgcKQ/softcodeon.gif" alt="Page Not Found Animation" />
      <h1 className="error-text">Whoops, we can't seem to find the resource you're looking for.</h1>
      <p className="text">Please check that the website address is spelled correctly. Or,</p>
      <div className="btn1">
        <Link className="error" to="/">Go to Homepage</Link>
      </div>
    </div>
  );
};

export default NotFound;

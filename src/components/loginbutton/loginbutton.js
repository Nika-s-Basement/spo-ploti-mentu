import React from 'react';
import './loginbutton.css';

const Button = ({ onClick, text }) => {
  return (
    <button className="login-button" onClick={onClick}> {text} </button>
  );
};

export default Button;

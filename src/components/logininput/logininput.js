import React from 'react';
import './logininput';

const InputField = ({ type, placeholder, onChange }) => {
  return (
    <input className="login-input"
     type={type}
      placeholder={placeholder}
      onChange={onChange}
      required
      title="Пожалуйста, введите корректный адрес электронной почты" />
  );
};

export default InputField;

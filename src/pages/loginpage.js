import React, { useState } from 'react';
import './loginpage.css';
import LoginButton from '../components/loginbutton/loginbutton.js';
import InputField from '../components/logininput/logininput.js';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@gibdd\.ru$/;
    if (!emailRegex.test(email)) {
      setEmailError('Пожалуйста, введите корректный адрес электронной почты @gibdd.ru');
      return;
    }
    // Добавьте вашу логику отправки формы здесь
  };

  return (
    <div className="login-form">
      <h1>Вход</h1>
      <form onSubmit={handleSubmit}>
        <InputField type="email" placeholder="ivanov.v.v@gibdd.ru" onChange={handleEmailChange} />
        {emailError && <p className="error-message">{emailError}</p>}
        <InputField type="password" placeholder="********" onChange={handlePasswordChange} />
        <LoginButton type="submit">Войти</LoginButton>
      </form>
    </div>
  );
};

export default LoginPage;

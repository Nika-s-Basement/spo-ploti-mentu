import React, { useState } from 'react';
import Button from '../components/loginbutton/loginbutton.js';
import InputField from '../components/logininput/logininput.js';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // Логика входа (например, отправка данных на сервер)
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div>
      <h1>Вход</h1>
      <InputField
        type="email"
        name="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Введите email"
      />
      <InputField
        type="password"
        name="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Введите пароль"
      />
      <Button onClick={handleLogin} text="Войти" />
    </div>
  );
};

export default LoginPage;

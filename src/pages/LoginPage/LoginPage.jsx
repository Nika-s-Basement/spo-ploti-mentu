import React, { useState } from 'react';
import Layout from '../../component/FrontBackReq/Layout';
import LoginForm from '../../component/LoginForm/LoginForm';
import UserForm from '../../component/UserForm/UserForm';
import UserReg from '../../component/UserReg/UserReg';
import Button from '../../component/Button/Button';

<<<<<<< HEAD

const LoginPage = () => (
  <Layout className="LoginPage">
    <LoginForm label='Login' />
  </Layout>
);
=======
const LoginPage = () => {
  const [showUserForm, setShowUserForm] = useState(false);
  const [showUserReg, setShowUserReg] = useState(false);
>>>>>>> 1fd96a4d4ad255234685de511e81b9c8dd9fe60a

  const handleDriverClick = () => {
    setShowUserForm(true);
    setShowUserReg(false);
  };

  const handleMentorClick = () => {
    setShowUserForm(false);
    setShowUserReg(false);
  };

  const handleRegisterClick = () => {
    setShowUserForm(false);
    setShowUserReg(true);
  };

  const handleCancelRegister = () => {
    setShowUserForm(true);
    setShowUserReg(false);
  };

  return (
    <Layout>
      {!showUserForm && !showUserReg && (
        <>
          <LoginForm label = "Войти"/>
          <Button onClick={handleDriverClick}>Войти как водитель</Button>
        </>
      )}
      {showUserForm && (
        <>
          <UserForm />
          <Button onClick={handleMentorClick}>Войти как мент</Button>
          <Button onClick={handleRegisterClick}>Зарегистрироваться</Button>
        </>
      )}
      {showUserReg && (
        <>
          <UserReg />
          <Button onClick={handleCancelRegister}>Отмена</Button>
        </>
      )}
    </Layout>
  );
};

export default LoginPage;

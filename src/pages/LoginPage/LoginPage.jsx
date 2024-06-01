import React, { useState, useEffect } from 'react';
import Layout from '../../component/FrontBackReq/Layout';
import LoginForm from '../../component/LoginForm/LoginForm';
import UserForm from '../../component/UserForm/UserForm';
import UserReg from '../../component/UserReg/UserReg';
import Button from '../../component/Button/Button';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [showUserForm, setShowUserForm] = useState(false);
  const [showUserReg, setShowUserReg] = useState(false);

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

  useEffect(() => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userFio');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId')
    console.log('data deleted')
  }, []);

  return (
    <Layout>
      {!showUserForm && !showUserReg && (
        <>
          <LoginForm label="Войти" />
          <div className={styles.Button}>
            <Button onClick={handleDriverClick}>Войти как водитель</Button>
          </div>
        </>
      )}
      {showUserForm && (
        <>
          <UserForm />
          <div className={styles.bUttOn}>
            <div className={styles.BuTTon}>
              <Button onClick={handleMentorClick}>Вход мента</Button>
              <Button onClick={handleRegisterClick}>Зарегистрироваться</Button>
            </div>
          </div>
        </>
      )}
      {showUserReg && (
        <>
          <UserReg />
          <div className={styles.button}>
            <Button onClick={handleCancelRegister}>Отмена</Button>
          </div>
        </>
      )}
    </Layout>
  );
};

export default LoginPage;

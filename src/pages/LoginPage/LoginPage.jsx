import React, { useState } from 'react';
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

  return (
      <div className={styles.Button}>
        <Layout>
          {!showUserForm && !showUserReg && (
              <>
                <LoginForm className={styles.Button} label = "Войти"/>
                <Button className={styles.Button} onClick={handleDriverClick}>Войти как водитель</Button>
              </>
          )}
          {showUserForm && (
              <>
                <UserForm className={styles.Button} />
                <Button className={styles.Button} onClick={handleMentorClick}>Войти как мент</Button>
                <Button className={styles.Button} onClick={handleRegisterClick}>Зарегистрироваться</Button>
              </>
          )}
          {showUserReg && (
              <>
                <UserReg className={styles.Button} />
                <Button className={styles.Button} onClick={handleCancelRegister}>Отмена</Button>
              </>
          )}
        </Layout>
      </div>
  );
};

export default LoginPage;

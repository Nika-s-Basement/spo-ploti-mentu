import React from 'react';
import Layout from '../../component/FrontBackReq/Layout';
import LoginForm from '../../component/LoginForm/LoginForm';


const LoginPage = () => (
  <Layout className="LoginPage">
    <LoginForm label='Login' />
  </Layout>
);

export default LoginPage;
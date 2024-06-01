import React from 'react';
import Layout from '../../component/FrontBackReq/Layout';

const ErrorPage = () => {
  return (
    <Layout>
      <h1>404 - Страница не найдена</h1>
      <p style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>Если вы видите это сообщение значит вы попали на не существующую страницу. </p>
    </Layout>
  );
};

export default ErrorPage;

import React from 'react';
import Layout from '../../component/FrontBackReq/Layout';

const ErrorPage = () => {
  return (
    <Layout>
      <h1>404 - Page non trouvée</h1>
      <p style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>Désolé, la page que vous recherchez n'existe pas.</p>
    </Layout>
  );
};

export default ErrorPage;

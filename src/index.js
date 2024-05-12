import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/loginpage.js';
import './index.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

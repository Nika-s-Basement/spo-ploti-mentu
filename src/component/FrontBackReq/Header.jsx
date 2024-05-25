import React from 'react';
import styles from './Header.module.css';

const Header = () => (
  <header className={styles.header}>
      <div>
          <h1>Система</h1>
          <h2>анализа ДТП</h2>
      </div>
      <nav>
          <ul>
              <li><a href="/">Главная</a></li>
        <li><a href="/about">О нас</a></li>
        <li><a href="/contact">Выйти</a></li>
      </ul>
    </nav>
  </header>
);

export default Header

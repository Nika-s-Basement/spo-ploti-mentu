import React from 'react';
import styles from './Header.module.css';

const Header = () => (
  <header className={styles.header}>
    <h1>Система анализа ДТП</h1>
    <nav>
      <ul>
        <li><a href="/">Главная</a></li>
        <li><a href="/about">О нас</a></li>
        <li><a href="/contact">Выйти</a></li>
      </ul>
    </nav>
  </header>
);

export default Header;

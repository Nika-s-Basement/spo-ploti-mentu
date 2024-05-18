import React from 'react';
import styles from './Popup.module.css';

const Popup = ({ message, onClose }) => (
  <div className={styles.popup}>
    <div className={styles.popupContent}>
      <span className={styles.close} onClick={onClose}>
        &times;
      </span>
      <p>{message}</p>
    </div>
  </div>
);

export default Popup;

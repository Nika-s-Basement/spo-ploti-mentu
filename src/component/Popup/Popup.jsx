import React from 'react';
import styles from './Popup.module.css';

const Popup = ({ message, onClose }) => (
  <div className={styles.popup}>
    <div className={styles.popupContent}>
      <span className={styles.close} onClick={onClose}>
        &times;
      </span>
      <div>{message}</div>
    </div>
  </div>
);

export default Popup;

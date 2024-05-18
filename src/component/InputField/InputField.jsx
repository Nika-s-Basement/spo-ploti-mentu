import React from 'react';
import styles from './InputField.module.css';

const InputField = ({ label, id, type, placeholder, value, onChange, autoComplete }) => (
  <div className={styles.inputField}>
    <label className={styles.label} htmlFor={id}>
      {label}
    </label>
    <input
      className={styles.input}
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
    />
  </div>
);

export default InputField;
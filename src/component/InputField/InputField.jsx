import React from 'react';
import styles from './InputField.module.css';

const InputField = ({ label, id, type, placeholder, value, onChange, autoComplete, options }) => (
<div className={styles.inputField}>
    <label className={styles.label} htmlFor={id}>
      {label}
    </label>
    {type === 'select' ? ( 
      <select
        className={styles.input}
        id={id}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        className={styles.input}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
      />
    )}
  </div>
);

export default InputField;
import React, { useState } from 'react';
import styles from './Dropdown.module.css';
import Button from '../Button/Button';

const Dropdown = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.header} onClick={toggleDropdown}>
        <div className={styles.label}>{label}</div>
        <div className={styles.button}>
          <Button isSmall={true} isArrow={true} />
        </div>
      </div>
      {isOpen && <div className={styles.content}>{children}</div>}
    </div>
  );
};

export default Dropdown;

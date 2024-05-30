import React, { useState } from 'react';
import InputField from '../InputField/InputField';
import styles from './AddCarMini.module.css';
import Button from '../Button/Button'

const AddCarMini = ({ onAddCar }) => {
  const [license, setLicense] = useState('');
  const [carNum, setCarNum] = useState('');

  const handleAddCar = () => {
    const car = {
      license: license,
      car_num: carNum
    };
    onAddCar(car);
    setLicense('');
    setCarNum('');
  };

  return (
    <div className={styles.addCarMini}>
      <InputField
        label="Номер ТС"
        type="text"
        value={license}
        onChange={(e) => setLicense(e.target.value)}
        className={styles.addCarMiniInput}
      />
      <InputField
        label="Гос. номер"
        type="text"
        value={carNum}
        onChange={(e) => setCarNum(e.target.value)}
        className={styles.addCarMiniInput}
      />
      <Button className={styles.addCarMiniButton} onClick={handleAddCar}>Сохранить авто</Button>
    </div>
  );
};

export default AddCarMini;

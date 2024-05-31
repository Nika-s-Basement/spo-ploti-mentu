import React, { useState } from 'react';
import InputField from '../InputField/InputField';
import styles from './AddCarMini.module.css';
import Button from '../Button/Button';

const AddCarMini = ({ onAddCar }) => {
  const [license, setLicense] = useState('');
  const [car_num, setCar_num] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const car = {
      license: license,
      car_num: car_num,
    };

    onAddCar(car);

    setLicense('');
    setCar_num('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label="Номер ТС"
        type="number"
        value={license}
        onChange={(e) => setLicense(e.target.value)}
      />
      <InputField
        label="Гос. номер"
        type="text"
        value={car_num}
        onChange={(e) => setCar_num(e.target.value)}
      />
      <Button>Добавить еще</Button>
    </form>
  );
};

export default AddCarMini;

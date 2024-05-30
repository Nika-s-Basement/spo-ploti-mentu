import React, { useState } from 'react';
import axios from 'axios';
import InputField from '../InputField/InputField';
import AddCarMini from '../AddCarMini/AddCarMini';
import styles from './AddDTP.module.css';
import Button from '../Button/Button'

const AddDtp = () => {
  const [describe, setDescribe] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [photo, setPhoto] = useState('');
  const [cars, setCars] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      describe: describe,
      cars: cars,
      address: address,
      date: date,
      photo: photo
    };

    axios.post('https://spo-ploti-mentu.onrender.com/add/dtp/', data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.error(error);
    });
  };

  const handleAddCar = (car) => {
    setCars([...cars, car]);
  };

  return (
    <form className={styles.addDtpForm} onSubmit={handleSubmit}>
      <InputField
        label="Описание"
        type="textarea"
        value={describe}
        onChange={(e) => setDescribe(e.target.value)}
        className={styles.addDtpInput}
      />
      <InputField
        label="Адрес"
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className={styles.addDtpInput}
      />
      <InputField
        label="Дата"
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className={styles.addDtpInput}
      />
      <InputField
        label="Фото"
        type="text"
        value={photo}
        onChange={(e) => setPhoto(e.target.value)}
        className={styles.addDtpInput}
      />
      <AddCarMini onAddCar={handleAddCar} />
      <ul>
        {cars.map((car, index) => (
          <li key={index}>
            Номер ТС: {car.license}, Гос. номер: {car.car_num}
          </li>
        ))}
      </ul>
      <Button className={styles.addDtpButton} type="submit">Добавить ДТП</Button>
    </form>
  );
};

export default AddDtp;

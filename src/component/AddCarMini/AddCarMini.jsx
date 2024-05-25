import React, { useState } from 'react';
import InputField from '../InputField/InputField';
import styles from './AddCarMini.module.css';
import Button from '../Button/Button';

const CarFormMini = () => {
    const [car_num, setCar_num] = useState('');
    const [id_user, setId_user] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Получаем массив автомобилей из localStorage или создаем новый, если он отсутствует
        let cars = JSON.parse(localStorage.getItem('cars')) || [];

        // Добавляем новый автомобиль в массив
        const newCar = {
            car_num: car_num,
            license: id_user,
        };
        cars.push(newCar);

        // Сохраняем массив автомобилей в localStorage
        localStorage.setItem('cars', JSON.stringify(cars));
    }
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <InputField
                label="Номер авто:"
                id="car_num"
                type="text"
                placeholder="o000oo00"
                value={car_num}
                onChange={(e) => setCar_num(e.target.value)}
                autoComplete="off"
            />
            <InputField
                label="Номер лицензии:"
                id="id_user"
                type="number"
                placeholder=""
                value={id_user}
                onChange={(e) => setId_user(e.target.value)}
                autoComplete="off"
            />
            <Button>
                Отправить
            </Button>
        </form>
    );
};

export default CarFormMini;

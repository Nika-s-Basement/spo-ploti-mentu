import React, { useState } from 'react';
import axios from 'axios';
import InputField from '../InputField/InputField';
import styles from './AddCar.module.css';
import Button from '../Button/Button';

const CarForm = () => {

    const [car_num, setCar_num] = useState('');
    const [pts, setPts] = useState('');
    const [insurance, setInsurance] = useState('');
    const [id_user, setId_user] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('mentToken');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        axios.post('https://spo-ploti-mentu.onrender.com/add/car/', {
            token: token,
            car_num: car_num,
            pts: pts,
            insurance: insurance,
            id_user: id_user,
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
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
                label="ПТС:"
                id="pts"
                type="number"
                placeholder="123456789012345"
                value={pts}
                onChange={(e) => setPts(e.target.value)}
                autoComplete="off"
            />

            <InputField
                label="Номер страхования:"
                id="insurance"
                type="number"
                placeholder="1234567890"
                value={insurance}
                onChange={(e) => setInsurance(e.target.value)}
                autoComplete="off"
            />
            <InputField
                label="Номер пользователя:"
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

export default CarForm;

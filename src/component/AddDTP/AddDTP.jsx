import React, { useState } from 'react';
import InputField from '../InputField/InputField';
import styles from './AddDTP.module.css';
import Button from '../Button/Button';
import CarFormMini from '../AddCarMini/AddCarMini';

const DtpForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [district, setDistrict] = useState('');
    const [images, setImages] = useState([]);
    const [cars, setCars] = useState([]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleDistrictChange = (e) => {
        setDistrict(e.target.value);
    }

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleAddCar = (car) => {
        setCars([...cars, car]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Создаем объект формы
        const formData = new FormData();

        // Добавляем поля в объект формы
        formData.append('title', title);
        formData.append('description', description);
        formData.append('district', district);
        formData.append('date', new Date().toISOString()); // Текущая дата и время

        // Добавляем изображения в объект формы
        for (let i = 0; i < images.length; i++) {
            formData.append(`images[${i}]`, images[i]);
        }

        // Добавляем массив автомобилей в объект формы
        formData.append('cars', JSON.stringify(cars));

        // Отправляем POST-запрос на сервер
        const response = await fetch('https://spo-ploti-mentu.onrender.com/add/dtp/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('mentToken')}`
            },
            body: formData
        });

        if (response.ok) {
            // Данные успешно отправлены
            console.log('Данные успешно отправлены');
        } else {
            // Ошибка при отправке данных
            console.log('Ошибка при отправке данных');
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Button>
                Добавить авто
            </Button>
            <InputField
                label="Название:"
                id="title"
                type="text"
                placeholder="Введите название"
                value={title}
                onChange={handleTitleChange}
                autoComplete="off"
            />

            <InputField
                label="Район:"
                id="district"
                type="text"
                placeholder="Введите название района"
                value={district}
                onChange={handleDistrictChange}
                autoComplete="off"
            />

            <InputField
                label="Описание:"
                id="description"
                type="text"
                placeholder="Введите описание"
                value={description}
                onChange={handleDescriptionChange}
                autoComplete="off"
                className={styles.textarea}
            />

            <label className={styles.label} htmlFor="images">
                Фотографии:
            </label>
            <input
                className={styles.input}
                id="images"
                type="file"
                multiple
                onChange={handleImageChange}
            />

            <Button>
                Отправить
            </Button>
        </form>
    );
};

export default DtpForm;

import React, { useState } from 'react';
import InputField from '../InputField/InputField';
import styles from './AddDTP.module.css';
import Button from '../Button/Button';

const DtpForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [district, setdistrict] = useState('');
    const [images, setImages] = useState([]);

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

    const handleSubmit = (e) => {
        e.preventDefault();

        // TODO: Handle form submission
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
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

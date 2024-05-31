import React, {useState} from 'react';
import axios from 'axios';
import styles from './LoginForm.module.css';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import Popup from '../Popup/Popup';
import {useNavigate} from 'react-router-dom';

const LoginForm = ({label}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {

        e.preventDefault();

        // Проверка почты
        const emailRegex = /^[^\s@]+@gibdd\.ru$/;
        if (!emailRegex.test(email)) {
            setPopupMessage('Введите корректный адрес электронной почты, заканчивающийся на @gibdd.ru');
            setShowPopup(true);
            return;
        }

        // Проверка пароля
        if (password.length < 8) {
            setPopupMessage('Пароль должен состоять из минимум 8 символов');
            setShowPopup(true);
            return;
        }

        axios.post('https://spo-ploti-mentu.onrender.com/login/ment/', {
            email: email,
            password: password
        })
            .then(function (response) {
                console.log(response);
                const token = response.data.token;
                const fio = response.data.fio;
                localStorage.setItem('userToken', token);
                localStorage.setItem('userFio', fio);
                localStorage.setItem('userType', 'ment');
                navigate('/main');
            })
            .catch(function (error) {
                console.log(error);
                setPopupMessage('Ошибка при входе. Проверьте ваши данные и попробуйте снова.');
                setShowPopup(true);
            });
    };


    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <InputField
                    id="email"
                    label="Почта"
                    type="email"
                    placeholder="example@gibdd.ru"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    for="email"
                    autoComplete="email"
                />
                <InputField
                    id="password"
                    label="Пароль"
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    for="password"
                    autoComplete="current-password"
                />
                <div className={styles.Button}>
                    <Button className={styles.button} onClick={handleSubmit}>{label}</Button>
                </div>
            </form>
            {showPopup && <Popup message={popupMessage} onClose={closePopup}/>}
        </>
    );
};

export default LoginForm;

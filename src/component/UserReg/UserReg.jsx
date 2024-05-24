import React, { useState } from 'react';
import axios from 'axios';
import styles from './UserReg.module.css';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import Popup from '../Popup/Popup';
import { useNavigate } from 'react-router-dom';

const UserReg = () => {
  const [fio, setFio] = useState('');
  const [license, setLicense] = useState('');
  const [card, setCard] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Проверка ФИО
    if (fio.length < 3) {
      setPopupMessage('ФИО должно состоять из минимум 3 символов');
      setShowPopup(true);
      return;
    }

    // Проверка номера водительского удостоверения
    if (license.length !== 10) {
      setPopupMessage('Номер водительского удостоверения должен состоять из 10 символов');
      setShowPopup(true);
      return;
    }

    // Проверка номера банковской карты
    if (card.length !== 16) {
      setPopupMessage('Номер банковской карты должен состоять из 16 символов');
      setShowPopup(true);
      return;
    }

    // Проверка почты
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setPopupMessage('Введите корректный адрес электронной почты');
      setShowPopup(true);
      return;
    }

    // Проверка пароля
    if (password.length < 8) {
      setPopupMessage('Пароль должен состоять из минимум 8 символов');
      setShowPopup(true);
      return;
    }

    // Отправка запроса на сервер
    axios.post('https://spo-ploti-mentu.onrender.com/register/user/', {
      fio: fio,
      license: license,
      card: card,
      email: email,
      password: password
    })
      .then(function (response) {
        console.log(response);
        // Обработка успешной регистрации
        navigate('/login'); // Перенаправляем на страницу входа
      })
      .catch(function (error) {
        console.log(error);
        setPopupMessage('Ошибка при регистрации. Проверьте ваши данные и попробуйте снова.');
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
          id="fio"
          label="ФИО"
          type="text"
          placeholder="Иванов Иван Иванович"
          value={fio}
          onChange={(e) => setFio(e.target.value)}
          for="fio"
          autoComplete="fio"
        />
        <InputField
          id="license"
          label="Номер водительского удостоверения"
          type="text"
          placeholder="1234567788"
          value={license}
          onChange={(e) => setLicense(e.target.value)}
          for="license"
          autoComplete="license"
        />
        <InputField
          id="card"
          label="Номер банковской карты"
          type="text"
          placeholder="1234567788123456"
          value={card}
          onChange={(e) => setCard(e.target.value)}
          for="card"
          autoComplete="card"
        />
        <InputField
          id="email"
          label="Почта"
          type="email"
          placeholder="example@gmail.com"
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
        <Button onClick={handleSubmit}>Зарегистрироваться</Button>
      </form>
      {showPopup && <Popup message={popupMessage} onClose={closePopup} />}
    </>
  );
};

export default UserReg;

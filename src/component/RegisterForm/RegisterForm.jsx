import React, { useState } from 'react';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import styles from './RegisterForm.module.css';
import axios from 'axios';

const RegisterForm = ({ label }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState(0);
  const [fio, setFio] = useState('');
  const [rank, setRank] = useState('');
  const [experience, setExperience] = useState(0);
  const [age, setAge] = useState(0);
  const [depId, setDepId] = useState(0);
  const [boss, setBoss] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('userToken');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    axios.post('https://spo-ploti-mentu.onrender.com/register/lil/', {
      token: token,
      id: id,
      fio: fio,
      rank: rank,
      experience: experience,
      age: age,
      dep_id: depId,
      boss: boss,
      email: email,
      password: password,
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
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
        <InputField
          id="id"
          label="ID"
          type="number"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          for="id"
        />
        <InputField
          id="fio"
          label="ФИО"
          type="text"
          placeholder="ФИО"
          value={fio}
          onChange={(e) => setFio(e.target.value)}
          for="fio"
        />
        <InputField
          id="rank"
          label="Звание"
          type="text"
          placeholder="Звание"
          value={rank}
          onChange={(e) => setRank(e.target.value)}
          for="rank"
        />
        <InputField
          id="experience"
          label="Стаж"
          type="number"
          placeholder="Стаж"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          for="experience"
        />
        <InputField
          id="age"
          label="Возраст"
          type="number"
          placeholder="Возраст"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          for="age"
        />
        <InputField
          id="depId"
          label="ID отдела"
          type="number"
          placeholder="ID отдела"
          value={depId}
          onChange={(e) => setDepId(e.target.value)}
          for="depId"
        />
        <InputField
          id="boss"
          label="ID начальника"
          type="number"
          placeholder="ID начальника"
          value={boss}
          onChange={(e) => setBoss(e.target.value)}
          for="boss"
        />
        <Button onClick={handleSubmit}>{label}</Button>
      </form>
    </>
  );
};

export default RegisterForm;

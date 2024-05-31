import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../../component/FrontBackReq/Layout';
import './MainPage.css';
import Dropdown from '../../component/Dropdown/Dropdown';
import CarForm from '../../component/AddCar/AddCar';
import RegisterForm from '../../component/RegisterForm/RegisterForm';
import ChartComp from '../../component/Chart/Chart';
import DTPForm from '../../component/AddDTP/AddDTP'
import DtpList from '../../component/ListDTP/ListDTP';

const data = [
    ['Район', 'Кол/во ДТП'],
    ['Бибирево', 2],
    ['Опалиха', 1]
];

const options = {
    title: 'Дтп',
    pieHole: 3,
};

const MainPage = () => {
    const [fio, setFio] = useState('');
    const [userType, setUserType] = useState('');
    const [dtps, setDtps] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fio = localStorage.getItem('userFio');
        const UserType = localStorage.getItem('userType');
        console.log(userType);

        if (fio == null) {
            navigate('/login');
        }

        if (fio) {
            setFio(fio);
        }

        if (UserType) {
            setUserType(UserType);
        }

        const token = localStorage.getItem('userToken');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        axios.get('https://spo-ploti-mentu.onrender.com/get/all/dtp')
            .then(response => {
                console.log(response.data);
                setDtps(response.data);
            })
            .catch(error => {
                console.log(error);
            });

    }, []);


    return (
        <Layout>
            <h1>
                Добро пожаловать, {fio}!
            </h1>
            {userType === 'ment' && (
                <Dropdown label="Регистрация ЛилМента">
                    <RegisterForm label='Sign up' />
                </Dropdown>
            )}
            <Dropdown label="Статистика по ДТП">
                <ChartComp data={data} options={options} type="PieChart" />
            </Dropdown>
            <Dropdown label="Добавить авто">
                <CarForm label='Добавить' />
            </Dropdown>
            <Dropdown label="Добавление ДТП">
                <DTPForm />
            </Dropdown>
            <Dropdown label="Поиск ДТП">
                <DtpList dtps={dtps} />
            </Dropdown>
        </Layout>
    );
};

export default MainPage;
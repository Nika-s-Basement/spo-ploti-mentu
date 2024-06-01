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
import Popup from '../../component/Popup/Popup';

const options = {
    title: 'Дтп',
    pieHole: 3,
};

const MainPage = () => {
    const [fio, setFio] = useState('');
    const [userType, setUserType] = useState('');
    const [dtps, setDtps] = useState([]);
    const [data, setData] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
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
                const dtpsWithId = response.data.map((dtp, index) => ({ ...dtp, id: index + 1 }));
                setDtps(dtpsWithId);

                let data = [['Район', 'Кол/во ДТП']];
                let regionCount = {};
                response.data.forEach(dtp => {
                    let region = dtp.address.split(',')[0];
                    if (!regionCount[region]) {
                        regionCount[region] = 0;
                    }
                    regionCount[region]++;
                });
                for (let region in regionCount) {
                    data.push([region, regionCount[region]]);
                }
                setData(data);
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });

        if (UserType === 'ment') {
            const id = localStorage.getItem('userId');
            axios.get(`https://spo-ploti-mentu.onrender.com/get/ment/${id}`)
                .then(response => {
                    console.log(response.data);
                    setUserInfo(response.data.gai);
                })
                .catch(error => {
                    console.log(error);
                });
        }

        if (UserType === 'vodila') {
            const id = localStorage.getItem('userId');
            axios.get(`https://spo-ploti-mentu.onrender.com/get/data/${id}/profile`)
                .then(response => {
                    console.log(response.data);
                    setUserInfo(response.data)
                })
                .catch(error => {
                    console.log(error);
                });
        }

    }, []);

    const handleFioClick = () => {
        setShowPopup(true);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    return (
        <Layout>
            <h1>
                Добро пожаловать, <span onClick={handleFioClick}>{fio}</span>!
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
            {showPopup && (
                <Popup message={
                    userInfo && (
                        <>
                            {userType === 'vodila' ? (
                                <>
                                    <h3>Номер карты: {userInfo.card}</h3>
                                    <h3>Email: {userInfo.email}</h3>
                                    <h3>ФИО: {userInfo.fio}</h3>
                                    <h3>Номер прав: {userInfo.license}</h3>
                                    {userInfo.cars.map((car, index) => (
                                        <div key={car.car_num} style={{ borderBottom: '3px solid #000000', padding: '10px' }}>
                                            <React.Fragment>
                                                <p>Номер авто {index + 1}: {car.car_num}</p>
                                                <p>Страховой номер {index + 1}: {car.insurance}</p>
                                                <p>ПТС {index + 1}: {car.pts}</p>
                                            </React.Fragment>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <>
                                    <h3>ФИО: {userInfo.fio}</h3>
                                    <h3>Звание: {userInfo.rank}</h3>
                                    <h3>ID отделения: {userInfo.dep_id}</h3>
                                    <h3>Email: {userInfo.email}</h3>
                                    <h3>Стаж: {userInfo.experience}</h3>
                                </>
                            )}
                        </>
                    )
                } onClose={handlePopupClose} />
            )}
        </Layout>
    );
};

export default MainPage;
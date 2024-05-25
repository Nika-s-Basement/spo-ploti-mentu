import React, { useEffect, useState } from 'react';
import Layout from '../../component/FrontBackReq/Layout';
import './MainPage.css';
import Dropdown from '../../component/Dropdown/Dropdown';
import CarForm from '../../component/AddCar/AddCar';
import RegisterForm from '../../component/RegisterForm/RegisterForm';
import ChartComp from '../../component/Chart/Chart';
import DTPForm from '../../component/AddDTP/AddDTP'
import DtpList from '../../component/ListDTP/ListDTP';


const dtps = [
    {
        id: 1,
        title: 'ДТП на перекрестке',
        district: 'Опалиха',
        description: 'Легковой автомобиль столкнулся с грузовиком на перекрестке. Пострадавших нет.',
        images: ['https://sun9-57.userapi.com/impf/NmO91j1cIK3SgImWoWRWxxHuwNPO6bJleEfZzA/nKxisbCYtFs.jpg?size=960x640&quality=96&sign=26949694e198cbf07af24d7be7b32626&c_uniq_tag=hlk64o3Ab_dFsXdxd2OTOAvfH_2InbdEEsQPfRhYP98&type=album']
    },
    {
        id: 2,
        title: 'Авария на трассе',
        district: 'Бибирево',
        description: 'Автобус выехал на встречную полосу и столкнулся с легковым автомобилем. Есть пострадавшие.',
        images: []
    },
    {
        id: 3,
        title: 'Столкновение на парковке',
        district: 'Бибирево',
        description: 'Два легковых автомобиля столкнулись на парковке из-за невнимательности водителей. Пострадавших нет.',
        images: ['https://mercurynews.com/wp-content/uploads/2016/11/a15crash.jpg']
    }
];

const data = [
    ['Район', 'Кол/во ДТП'],
    ['Бибирево', 2],
    ['Опалиха', 1]
];

const options = {
    title: 'Дтп',
    pieHole: 1,
};

const MainPage = () => {
    const [fio, setFio] = useState('');
    const [token, setToken] = useState('');
    const [userType, setUserType] = useState('');

    useEffect(() => {
        const storedFio = localStorage.getItem('userFio');
        const storedUserType = localStorage.getItem('userType');
        console.log(userType);

        if (storedFio) {
            setFio(storedFio);
        }

        if (storedUserType) {
            setUserType(storedUserType);
        }
    }, []);

    useEffect(() => {
        const storedToken = localStorage.getItem('userToken');
        if (storedToken) {
            setToken(storedToken);
        }
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
            <Dropdown label="Умная Мысль">
                <h1>
                    Какаой-то умный текст
                </h1>
            </Dropdown>
            <Dropdown label="Статистика по ДТП">
                <ChartComp data={data} options={options} type="PieChart" />
            </Dropdown>
            <Dropdown label="Добавить авто">
                <CarForm label='Добавить'/>
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
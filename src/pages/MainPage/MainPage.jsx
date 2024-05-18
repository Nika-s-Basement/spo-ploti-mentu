import React from 'react';
import Layout from '../../component/FrontBackReq/Layout';
import './MainPage.css';
import Dropdown from '../../component/Dropdown/Dropdown';
import LoginForm from '../../component/LoginForm/LoginForm';
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


/*const getDistrictCounts = (dtps) => {
    const districtCounts = {};

    dtps.forEach((dtp) => {
        if (dtp.district) {
            districtCounts[dtp.district] = (districtCounts[dtp.district] || 0) + 1;
        }
    });

    const data = Object.entries(districtCounts).map(([district, count]) => [
        district,
        count,
    ]);

    return data;
};

const data = getDistrictCounts(dtps);
console.log(data);*/

const data = [
    ['Район', 'Кол/во ДТП'],
    ['Бибирево', 2],
    ['Опалиха', 1]
    ];

const options = {
    title: 'Дтп',
    pieHole: 1,
};

const MainPage = () => (
    <Layout>
        <h1>
            Добро пожаловать, товарищ!
        </h1>
        <Dropdown label="Регистрация ЛилМента">
            <LoginForm label='Sign up' />
        </Dropdown>
        <Dropdown label="Умная Мысль">
            <h1>
                Какаой-о умный текст
            </h1>
        </Dropdown>
        <Dropdown label="Статистика по ДТП">
            <ChartComp data={data} options={options} type="PieChart" />
        </Dropdown>
        <Dropdown label="Добавление ДТП">
            <DTPForm />
        </Dropdown>
        <Dropdown label="Поиск ДТП">
            <DtpList dtps={dtps} />
        </Dropdown>
    </Layout>
)

export default MainPage;
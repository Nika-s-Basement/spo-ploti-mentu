import React, {useEffect, useState, useMemo, useCallback} from 'react';
import Layout from '../../component/FrontBackReq/Layout';
import styles from './AboutPage.module.css';

const formatData = (data) => {
    const keyMap = {
        address: 'Адрес',
        fio: 'ФИО',
        age: 'Возраст',
    };

    const listItems = Object.entries(data)
        .filter(([key, value]) => key !== 'map')
        .map(([key, value]) => {
            const formattedKey = keyMap[key];
            return (
                <div key={key} className={styles.item}>
                    <span className={styles.key}>{formattedKey}:</span>
                    <span className={styles.value}>{value}</span>
                </div>
            );
        });

    // Извлекаем значения из ключа 'map'
    const {latitude, longitude} = data.map || {};

    // Проверяем, что значения latitude и longitude существуют
    if (latitude && longitude) {
        // Создаем ссылку на картинку с использованием значений latitude и longitude
        const mapImageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=600x300&markers=color:red%7Clabel:C%7C${latitude},${longitude}&key=YOUR_API_KEY`;

        // Возвращаем список элементов и изображение карты
        return (
            <React.Fragment>
                <div className="campus-photo">
                    <img className={styles.campusPhotoImage} src={mapImageUrl} alt={`Фотография ${data.name}`}/>
                </div>
                <dl>{listItems}</dl>
            </React.Fragment>
        );
    } else {
        // Возвращаем список элементов и изображение по умолчанию
        return (
            <React.Fragment>
                <div className="campus-photo">
                    <img src="../../../src/assets/image.png" alt={`Фотография ${data.name}`}/>
                </div>
                <dl>{listItems}</dl>
            </React.Fragment>
        );
    }
};


function AboutPage() {
    const [campusesData, setCampusesData] = useState([]);
    const [filter, setFilter] = useState('');
    const [prevFilter, setPrevFilter] = useState(''); // новое состояние для сохранения прошлого фильтра

    useEffect(() => {
        // Получение всех кампусов из базы данных
        fetch('https://spo-ploti-mentu.onrender.com/get/all/gai')
            .then(response => response.json())
            .then(data => setCampusesData(data));
    }, []);

    const handleFilterChange = useCallback((event) => {
        const filter = event.target.value;
        setFilter(filter);
        setPrevFilter(filter); // сохраняем текущий фильтр в отдельном состоянии
        // Фильтрация кампусов по заданному адресу
        const filteredCampuses = campusesData.filter(campus => {
            return campus.address.toLowerCase().includes(filter.toLowerCase());
        });
        setCampuses(filteredCampuses);
    }, [campusesData]);

    const handleFilterSubmit = useCallback((event) => {
        event.preventDefault();
        // Фильтрация кампусов по заданному адресу
        const addressParts = prevFilter.split(','); // используем сохраненный фильтр
        const filteredCampuses = campusesData.filter(campus => {
            return addressParts.every(part => campus.address.includes(part.trim()));
        });
        setCampuses(filteredCampuses);
    }, [campusesData, prevFilter]);

    const campuses = useMemo(() => {
        if (!filter) {
            return campusesData;
        }

        return campusesData.filter(campus => {
            return campus.address.toLowerCase().includes(filter.toLowerCase());
        });
    }, [filter, campusesData]);

    return (
        <Layout>
            <h1 className={styles.H1}>Список ГИБДД</h1>
            <>
                <form className={styles.form} onSubmit={handleFilterSubmit}>
                    <label htmlFor="filter-input">Поиск по адресу:</label>
                    <input type="text" id="filter-input" value={filter} onChange={handleFilterChange}
                           placeholder="Введите адрес"/>
                    <button type="submit">Поиск</button>
                </form>
                <div className={styles.Spisok}>
                    <ul className={styles.nav}>
                        {campuses.map(campus => (
                            <li key={campus.id} className={styles.li}>
                <pre className={styles.format}>
                  {formatData(campus)}
                </pre>
                            </li>
                        ))}
                    </ul>
                </div>
            </>
        </Layout>
    );
}

export default AboutPage;

import React, {useEffect, useState, useMemo, useCallback} from 'react';
import Layout from '../../component/FrontBackReq/Layout';
import styles from './AboutPage.module.css';

const formatData = (data) => {
    const listItems = Object.entries(data)
        .filter(([key, value]) => key !== 'photo' && value !== null)
        .map(([key, value]) => (
            <React.Fragment key={key}>
                <dt>{key.charAt(0).toUpperCase() + key.slice(1)}:</dt>
                <dd>{value}</dd>
            </React.Fragment>
        ));

    return (
        <React.Fragment>
            <div className="campus-photo">
                <img src="../../../src/assets/image.png" alt={`Фотография ${data.name}`}/>
            </div>
            <dl>{listItems}</dl>
        </React.Fragment>
    );
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
                <h1>Список ГИБДД</h1>
                <>
                    <form className={styles.form} onSubmit={handleFilterSubmit}>
                        <label htmlFor="filter-input">Filter by address:</label>
                        <input type="text" id="filter-input" value={filter} onChange={handleFilterChange}
                               placeholder="Enter street, city, etc."/>
                        <button type="submit">Filter</button>
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

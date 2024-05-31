import React, { useEffect, useState } from 'react';
import Layout from '../../component/FrontBackReq/Layout';
import styles from  './AboutPage.module.css';


function AboutPage() {
    const [campuses, setCampuses] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        // Получение всех кампусов из базы данных
        fetch('https://spo-ploti-mentu.onrender.com/get/all/gai')
            .then(response => response.json())
            .then(data => setCampuses(data));
    }, []);

    function handleFilterChange(event) {
        setFilter(event.target.value);
    }

    function handleFilterSubmit(event) {
        event.preventDefault();
        // Фильтрация кампусов по заданному критерию
        setCampuses(campuses.filter(campus => campus.name.includes(filter)));
    }

    function formatData(data) {
        const listItems = Object.entries(data)
            .filter(([key, value]) => key !== 'photo' && value !== null) // отфильтровываем значения null и ключ 'photo'
            .map(([key, value]) => (
                <React.Fragment key={key}>
                    <dt>{key.charAt(0).toUpperCase() + key.slice(1)}:</dt>
                    <dd>{value}</dd>
                </React.Fragment>
            ));

        return (
            <React.Fragment>
                <div className="campus-photo">{/* добавляем div с фотографией */}
                    <img src="../../../src/assets/image.png" alt={`Фотография ${data.name}`} />
                </div>
                <dl>{listItems}</dl>{/* добавляем список с данными */}
            </React.Fragment>
        );
    }


    return (
        <Layout>
            <h1>Список ГИБДД</h1>
            <>
                <form className={styles.form} onSubmit={handleFilterSubmit}>
                    <label htmlFor="filter-input">Filter by name:</label>
                    <input type="text" id="filter-input" value={filter} onChange={handleFilterChange}/>
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
    )
}


export default AboutPage;

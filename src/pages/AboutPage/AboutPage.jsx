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
        return Object.entries(data).map(([key, value]) => {
            if (value === null) {
                value = 'недоступна';
            }
            return `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`;
        }).join('\n');
    }

    return (
        <Layout>
            <div>
                <form onSubmit={handleFilterSubmit}>
                    <label htmlFor="filter-input">Filter by name:</label>
                    <input type="text" id="filter-input" value={filter} onChange={handleFilterChange}/>
                    <button type="submit">Filter</button>
                </form>
                <ul>
                    {campuses.map(campus => (
                        <li key={campus.id}>
              <pre>
                {formatData(campus)}
              </pre>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    )
}


export default AboutPage;

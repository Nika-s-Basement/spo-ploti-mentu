import React, { useEffect } from 'react';
import Layout from '../../component/FrontBackReq/Layout';
import styles from  './AboutPage.module.css';


const AboutPage = () => {
    function CampusList() {
        const [campuses, setCampuses] = useState([]);
        const [filter, setFilter] = useState('https://spo-ploti-mentu.onrender.com/get/all/gai');

        useEffect(() => {
            // Получение всех кампусов из базы данных
            fetch('')
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
                        <li key={campus.id}>{campus.name}</li>
                    ))}
                </ul>
            </div>
        </Layout>
    )
}

export default AboutPage;

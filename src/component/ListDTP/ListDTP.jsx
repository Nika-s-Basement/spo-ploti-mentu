import React, { useState } from 'react';
import styles from './ListDTP.module.css';
import InputField from '../InputField/InputField';

const DtpList = ({ dtps }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredDtps = dtps.filter((dtp) =>
        (dtp.describe && typeof dtp.describe === 'string' && dtp.describe.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (dtp.address && typeof dtp.address === 'string' && dtp.address.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (dtp.cars && dtp.cars.join(', ').toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className={styles.container}>
            <InputField
                label="Поиск:"
                id="search"
                type="text"
                placeholder=""
                value={searchTerm}
                onChange={handleSearchChange}
                autoComplete="off"
            />
            {filteredDtps.map((dtp) => (
                <div className={styles.dtp} key={dtp.id}>
                    <p className={styles.description}>{dtp.describe}</p>
                    <p className={styles.car}>{dtp.cars.join(', ')}</p>
                    <p className={styles.district}>Адрес: {dtp.address}</p>
                </div>
            ))}

        </div>
    );
};

export default DtpList;

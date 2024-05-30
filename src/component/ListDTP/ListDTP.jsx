import React, { useState }from 'react';
import styles from './ListDTP.module.css';
import InputField from '../InputField/InputField';

const DtpList = ({ dtps }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredDtps = dtps.filter((dtp) =>
        (dtp.title && dtp.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (dtp.description && dtp.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (dtp.district && dtp.district.toLowerCase().includes(searchTerm.toLowerCase()))
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
                    <p className={styles.description}>{dtp.description}</p>
                    <p className={stytle.description}>{dtp.car}</p>
                    <p className={styles.district}>Район: {dtp.district}</p>
                    {dtp.images.length > 0 ? (
                        <div className={styles.images}>
                            {dtp.images.map((image, index) => (
                                <img
                                    className={styles.image}
                                    src={image}
                                    alt={`Image ${index + 1}`}
                                    key={index}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className={styles.noImages}>Фотографий нет</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default DtpList;
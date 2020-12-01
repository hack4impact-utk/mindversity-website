import React from 'react'
import { Officer } from 'utils/types'
import styles from './style.module.scss';

interface Props {
  officers: Officer[];
}

const OfficerCarouselComp: React.FC<Props> = ({ officers }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={officers[0].picture?.url} />
        <img src={officers[0].picture?.url} />
      </div>
      <div className={styles.infoContainer}>
        <h1>{officers[0].name}</h1>
        <h2>{officers[0].role}</h2>
        <p>{officers[0].bio}</p>

        <div className={styles.btnContainer}>
          <button className={styles.active}></button>
          <button></button>
        </div>
      </div>
    </div>
  );
};

export default OfficerCarouselComp;

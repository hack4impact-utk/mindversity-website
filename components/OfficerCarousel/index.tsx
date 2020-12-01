import React from 'react'
import { Officer } from 'utils/types'
import styles from './style.module.scss';

interface Props {
  officers: Officer[];
}

const OfficerCarouselComp: React.FC<Props> = ({ officers }) => {
  return (
    <div className={styles.container}>
      <p>Officers: Test { JSON.stringify(officers) }</p>
    </div>
  );
};

export default OfficerCarouselComp;

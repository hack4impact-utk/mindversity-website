import React, { useEffect, useState } from 'react'
import { Officer } from 'utils/types'
import styles from './style.module.scss';

interface Props {
  officers: Officer[];
}

const OfficerCarouselComp: React.FC<Props> = ({ officers }) => {
  const [officer, setOfficer] = useState({
    id: officers[0]._id,
    name: officers[0].name,
    role: officers[0].role,
    bio: officers[0].bio,
    url: officers[0].picture?.url,
    delay: 3000
  });

  const buttons = officers.map((officerObj, i) => {
    let btnClass = "";
    if (officerObj._id == officer.id) {
      btnClass = styles.active;
    }

    return (
      <button onClick={() => setOfficerInfo(i, 10000)} className={btnClass} key={JSON.stringify(officerObj._id)}></button>
    );
  });

  const setOfficerInfo = (num: any, changeDelay: number) => {
    setOfficer({
      id: officers[num]._id,
      name: officers[num].name,
      role: officers[num].role,
      bio: officers[num].bio,
      url: officers[num].picture?.url,
      delay: changeDelay
    });
  }

  const change = () => {
    for (let i = 0; i < officers.length; i++)
    {
      if (officers[i]._id == officer.id)
      {
        // Switch to next officer.
        if (i == officers.length-1) { setOfficerInfo(0, 3000); }
        else { setOfficerInfo(i+1, 3000); }

        break;
      }
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => change(), officer.delay);
    return () => clearTimeout(timeout);
  }, [officer.id]);

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={officer.url} />
        <img src={officer.url} />
      </div>
      <div className={styles.infoContainer}>
        <h1>{officer.name}</h1>
        <h2>{officer.role}</h2>
        <p>{officer.bio}</p>

        <div className={styles.btnContainer}>
          {buttons}
        </div>
      </div>
    </div>
  );
};

export default OfficerCarouselComp;
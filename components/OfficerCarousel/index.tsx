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
    // Add 1 to distinguish default/page load.
    delay: 4001
  });

  const images = officers.map((officerObj) => {
    let wrapperClass;
    // Initial load, default officer: no translation nor animation.
    if (officerObj._id == officer.id && officer.delay == 4001) { wrapperClass = ""; }
    // Next/selected officer: slide into view animation.
    else if (officerObj._id == officer.id) { wrapperClass = styles.show; }
    // Initial load, non-default officer: translate out of view without animation.
    else if (officer.delay == 4001) { wrapperClass = styles.hidden; }
    // Previously shown officer: slide out of view animation.
    else { wrapperClass = styles.hide; }

    return (
      <div className={wrapperClass} key={JSON.stringify(officerObj._id)}>
        <img src={officerObj.picture?.url} />
        <img src={officerObj.picture?.url} />
      </div>
    );
  });

  // Name, Role, Bio elements
  const info = () => {
    // Randomized key so ReactJS will replay transition animation.
    let rand = Math.floor(Math.random() * 999999999);
    return (
      <div className={styles.wrapper} key={rand}>
        <h1>{officer.name}</h1>
        <h2>{officer.role}</h2>
        <p>{officer.bio}</p>
      </div>
    );
  };

  // Carousel button selectors.
  const buttons = officers.map((officerObj, i) => {
    let btnClass = "";
    if (officerObj._id == officer.id) {
      btnClass = styles.active;
    }
    
    if (officers.length > 1)
    {
      return (
        // When user manually changes carousel, increase auto change delay to allow user to focus on selected content longer.
        <button onClick={() => setOfficerInfo(i, 10000)} className={btnClass} key={JSON.stringify(officerObj._id)}></button>
      );
    } else
    {
      // If there is only one officer, disable changing carousel.
      return (
        <button className={btnClass} key={JSON.stringify(officerObj._id)}></button>
      );
    }
  });

  // Change carousel's shown officer to next/selected.
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

  // Change to the next officer in the array.
  const autoChange = () => {
    for (let i = 0; i < officers.length; i++)
    {
      if (officers[i]._id == officer.id)
      {
        // Switch to next officer with default change delay.
        if (i == officers.length-1) { setOfficerInfo(0, 4000); }
        else { setOfficerInfo(i+1, 4000); }

        break;
      }
    }
  }

  // Runs when officer.id is updated, aka when the officer is first loaded or changed.
  useEffect(() => {
    if (officers.length > 1)
    {
      // After carousel is changed (automatically or manually), wait officer.delay ms to change again.
      const timeout = setTimeout(() => autoChange(), officer.delay);
      return () => clearTimeout(timeout);
    }
  }, [officer.id]);

  // Carousel elements
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        {images}
      </div>
      <div className={styles.infoContainer}>
        {info()}
        <div className={styles.btnContainer}>
          {buttons}
        </div>
      </div>
    </div>
  );
};

export default OfficerCarouselComp;
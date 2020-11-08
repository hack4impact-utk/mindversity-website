import React, { useState } from "react";
import style from "./style.module.scss";
import { getRegion } from "utils/helpers";

const HomeChapters: React.FC = () => {
  const [region, setRegion] = React.useState("unknown");

  React.useEffect(() => {
    if (navigator) {
      navigator.geolocation.getCurrentPosition((pos: Position) => {
        const [lat, long] = [pos.coords.latitude, pos.coords.longitude];
        setRegion(getRegion(lat, long));
      });
    }
  });

  return (
    <div className={style.parentContainer}>
      <h2 className={style.title}>Chapters In Your Region</h2>
      <div className={style.cardWrapper}>
        <a href="chapters" className={style.card}>
          <div className={style.cardOverlay}>
            <div className={style.cardText}>University of Tennessee</div>
          </div>
          <img
            src="/utk-placeholder.jpg"
            className={style.cardImage}
            alt="Chapter name here"
          ></img>
        </a>

        <a href="chapters" className={style.card}>
          <div className={style.cardOverlay}>
            <div className={style.cardText}>Rutgers</div>
          </div>
          <img
            src="/rutgers-placeholder.jpg"
            className={style.cardImage}
            alt="Chapter name here"
          ></img>
        </a>
      </div>
      <a href="chapters" className={style.exploreBtn}>
        Explore All
      </a>
    </div>
  );
};

export default HomeChapters;

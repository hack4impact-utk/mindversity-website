import React from "react";
import styles from "./partners.module.css";

const Partners: React.FC = () => {
  return (
    <section className={styles["container"]}>
      <div className={styles["partner"]}>
        <img
          src="https://www.stevefund.org/wp-content/uploads/2019/03/The-Steve-Fund-logo-vertical-color.png"
          alt="Partner logo"
        ></img>
      </div>
      <div className={styles["partner"]}>
        <img
          src="https://www.artwithimpact.org/wp-content/uploads/awi_logo_020711_0-1.png"
          alt="Partner logo"
        ></img>
      </div>
      <div className={styles["partner"]}>
        <img
          src="https://pbs.twimg.com/profile_images/1102970449472950273/xGIOGqeH_400x400.jpg"
          alt="Partner logo"
        ></img>
      </div>
    </section>
  );
};

export default Partners;

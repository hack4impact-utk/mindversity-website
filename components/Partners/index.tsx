import React from "react";
import styles from "./partners.module.css";

const Partners: React.FC = () => {
  return (
    <section className={styles["container"]}>
      <div className={styles["partner"]}>
        <h3>Partner #1</h3>
        <img src="#" alt="Partner logo"></img>
      </div>
      <div className={styles["partner"]}>
        <h3>Partner #2</h3>
        <img src="#" alt="Partner logo"></img>
      </div>
      <div className={styles["partner"]}>
        <h3>Partner #3</h3>
        <img src="#" alt="Partner logo"></img>
      </div>
    </section>
  );
};

export default Partners;

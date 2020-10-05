import React from "react";
import community from "./community.svg";
import characters from "./characters.svg";
import styles from "./maininfo.module.scss";

const MainInfo: React.FC = () => (
  <section className={styles["container"]}>
    <div className={styles["wrapper"]}>
      <header className={styles["opening-text"]}>
        <p>A national peer network.</p>
        <p>A call to action.</p>
        <p>An initiative.</p>
        <p>A change.</p>
      </header>
      <img
        src={community}
        alt="Three characters."
        className={styles["image"]}
      />
    </div>

    <div className={styles["wrapper"]}>
      <img
        src={characters}
        alt="Characters hanging out."
        className={styles["image"]}
      />
      <div className={styles["description"]}>
        <h2>Welcome to MindVersity.</h2>
        <p>
          Since 2020, MindVersity has helped create supportive communities for
          individuals who are overcoming difficulties. We understand how helpful
          it is for people going through life issues to find a space where they
          can build connections with others who understand exactly what
          they&apos;re experiencing. Feel free to reach out for additional
          information.
        </p>
      </div>
    </div>
  </section>
);

export default MainInfo;

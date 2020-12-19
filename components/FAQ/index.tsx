import React, { useState } from "react";
import styles from "./faq.module.scss";

interface Props {
  question: string; //Pass in question as a prop
  children: React.ReactNode; //Children would be the answer to the question
}

const FAQ: React.FC<Props> = ({ question, children }) => {
  const [collapsed, setCollapsed] = useState(true); //Clicking the button will adjust the maximum height of the question, which makes it slide open
  return (
    <section>
      <button
        className={`${styles["accordion"]} ${
          collapsed ? "" : styles["active"]
        }`}
        onClick={() => setCollapsed(!collapsed)}
      >
        {question}
      </button>

      <div className={collapsed ? styles["collapsed"] : styles["visible"]}>
        <p>{children}</p>
      </div>

      <div className={styles.bottomBorder}></div>
    </section>
  );
};
export default FAQ;

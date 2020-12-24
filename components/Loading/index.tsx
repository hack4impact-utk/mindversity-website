import React from "react";
import styles from "./style.module.scss";

// with help from https://github.com/JoshK2/react-spinners-css
const Loader: React.FC = () => {
    const circles = [...Array(4)].map((_, index) => <div key={index} className={styles.circle} />);

    return (
      <div className={styles.loader}>
        {circles}
      </div>
    )
}

export default Loader;
import React from "react";
import styles from "./footer.module.scss";
import Link from "next/link";
const Footer: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <p className={styles.centeredTitle}>We&apos;d Love To Hear From You</p>
                        <Link href="/">
                            <span className={styles.link}>Contact Us</span>
                        </Link>
                    </div>
                    <div className={styles.column}>
                        <p className={styles.title}>General</p>
                        <Link href="/journal">
                            <span className={styles.link}>Journal</span>
                        </Link>
                        <Link href="/chapters">
                            <span className={styles.link}>Chapters</span>
                        </Link>
                        <Link href="/resources">
                            <span className={styles.link}>Resources</span>
                        </Link>
                        <Link href="/faq">
                            <span className={styles.link}>FAQ</span>
                        </Link>
                    </div>
                    {/*TODO: Possibly remove this column*/}
                    <div className={styles.column}>
                        <p className={styles.title}>Get Involved</p>
                        <span>
                            <a className={styles.link} href="/">
                                Start Chapter
                            </a>
                            <a className={styles.link} href="/">
                                Students
                            </a>
                            <a className={styles.link} href="/">
                                Contact Us
                            </a>
                        </span>
                    </div>
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.column}>
                    <Link href="/portal">
                        <span className={styles.link}>Log In</span>
                    </Link>
                </div>
                <div className={styles.column}>
                    <p className={styles.logo}>MindVersity</p>
                </div>
            </div>
        </div>
    );
};
export default Footer;

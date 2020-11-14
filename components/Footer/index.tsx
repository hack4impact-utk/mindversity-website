import React from 'react';
import styles from "./footer.module.scss";

export default function Footer() {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <p className={styles.centeredTitle}>We'd Love To Hear From You</p>
                        <span>
                            <a className={styles.link} href="/">Contact Us</a>
                        </span>
                    </div>
                    <div className={styles.column}>
                        <p className={styles.title}>General</p>
                        <span>
                            <a className={styles.link} href="/journal">Journal</a>
                            <a className={styles.link} href="/chapters">Chapters</a>
                            <a className={styles.link} href="/resources">Resources</a>
                            <a className={styles.link} href="/faq">FAQ</a>
                        </span>
                    </div>
                    <div className={styles.column}>
                        <p className={styles.title}>Get Involved</p>
                        <span>
                            <a className={styles.link} href="/">Start Chapter</a>
                            <a className={styles.link} href="/">Students</a>
                            <a className={styles.link} href="/">Contact Us</a>
                        </span>
                    </div>
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.column}>
                    <p>A Hack4Impact Chapter</p>
                </div>
                <div className={styles.column}>
                    <p className={styles.logo}>MindVersity</p>
                </div>
            </div>
        </div>
    )
}


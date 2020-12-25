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
                    {/*TODO: Possibly remove this column or change hrefs*/}
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
                    <div className={styles.column}>
                        <p className={styles.title}>Social Media</p>
                        <span>
                            <Link href="https://www.facebook.com/MindVersed/">
                                <a target="_blank" className={styles.link}>
                                    Facebook
                                </a>
                            </Link>
                            <Link href="https://www.instagram.com/mindversityorg/">
                                <a target="_blank" className={styles.link}>
                                    Instagram
                                </a>
                            </Link>
                            <Link href="https://twitter.com/MindVersity/media">
                                <a target="_blank" className={styles.link}>
                                    Twitter
                                </a>
                            </Link>
                            <Link href="https://open.spotify.com/show/1VDhTv2Y0K180XMf9NY23W?si=HhIdhDlHRU2ZOiiH4WFF9Q">
                                <a target="_blank" className={styles.link}>
                                    Spotify
                                </a>
                            </Link>
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

import React from 'react';
import styles from "./footer.module.scss";
import fb from '../../public/icons/facebook.png'
import spotify from '../../public/icons/spotify.png'
import tiktok from '../../public/icons/tiktok.png'
import insta from '../../public/icons/instagram.png'
import twitter from '../../public/icons/twitter.png'
import logo from '../../public/mindversity-logo.png'

export default function Footer() {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.row}>
                    <div className={styles.column}>
                      <img src={logo} className={styles.logo}/>
                    </div>
                    <div className={styles.column}>
                        <p className={styles.title}>About Us</p>
                        <a className={styles.link} href="/">Mission</a>
                        <a className={styles.link} href="/">Team</a>
                        <a className={styles.link} href="/">Chapters</a>
                    </div>
                    <div className={styles.column}>
                        <p className={styles.title}>Peer Network</p>
                        <a className={styles.link} href="/">Become an Advocate</a>
                        <a className={styles.link} href="/">Get Support</a>
                        <a className={styles.link} href="/">Forum</a>
                        <a className={styles.link} href="/">Design</a>
                    </div>
                    <div className={styles.column}>
                        <p className={styles.title}>Resources</p>
                        <a className={styles.link} href="/">MindVersity Blogs</a>
                        <a className={styles.link} href="/">Community Blogs</a>
                        <a className={styles.link} href="/">Write a Blog</a>
                    </div>
                    <div className={styles.column}>
                        <p className={styles.title}>Social Media</p>
                        <a className={styles.link} href="https://www.facebook.com/MindVersed/"><img className={styles.icon} src={fb} />Facebook</a>
                        <a className={styles.link} href="https://twitter.com/MindVersity/media"><img className={styles.icon} src={twitter} />Twitter</a>
                        <a className={styles.link} href="https://www.instagram.com/mindversityorg"><img className={styles.icon} src={insta} />Instagram</a>
                        <a className={styles.link} href="https://open.spotify.com/show/1VDhTv2Y0K180XMf9NY23W?si=HhIdhDlHRU2ZOiiH4WFF9Q"><img className={styles.icon} src={spotify} />Spotify</a>
                        <a className={styles.link} href="/@mindversityorg"><img className={styles.icon} src={tiktok} />Tiktok</a>
                    </div>
                </div>
            </div>
        </div>
    )
}


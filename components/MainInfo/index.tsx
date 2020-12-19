import React from "react";
import classNames from "classnames";
import heroBackground from "./herobackground.png";
import aboutBackground from "./characters.svg";
import styles from "./maininfo.module.scss";

const MainInfo: React.FC = () => (
    <section className={styles.container}>
        <div className={styles.hero}>
            <div className={styles.heroOverlay}>
                <div className={styles.heroText}>
                    <h1>Our Voices. Our Stories. Our Minds.</h1>
                    <h2>
                        A Global Effort to Better BIPOC Student Mental Health
                        Care.
                    </h2>
                </div>
            </div>
            <img
                src={heroBackground}
                alt="MindVersity strives to bridge the gaps between access to mental health resources and students of color on college campuses nationwide."
            />
        </div>

        <div className={styles.aboutParent}>
            <div className={styles.aboutCol}>
                <div className={styles.aboutText}>
                    <h2>Mental Health For All</h2>
                    <p>
                        MindVersity strives to bridge the gaps between access to
                        mental health resources and students of color on college
                        campuses nationwide. We aim to do this by creating peer
                        support networks across campuses, reducing cultural
                        stigma through education, and generating a platform
                        where resources are readily made accessible.
                    </p>
                </div>
            </div>

            <div
                className={classNames(
                    styles.aboutCol,
                    styles.aboutBackgroundCol
                )}
            >
                <img
                    src={aboutBackground}
                    alt="MindVersity is a place for students of color to get easire access to mental health resources."
                ></img>
            </div>
        </div>

        <div className={styles.quoteParent}>
            &quot;People of color...feel the stigma [of mental health] more
            keenly. In a race-conscious society, some don&apos;t want to be
            perceived as having yet another deficit.&quot;
        </div>
    </section>
);

export default MainInfo;

import React, { useState } from "react";
import style from "./style.module.scss"; //Import the main stylesheet
import Link from "next/link";
//Import the icons from react-icons
import { AiOutlineMenu } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

import { useRouter } from "next/router";

const Header: React.FC = () => {
    const [open, setOpen] = useState(false); //Control the state of the mobile navigation menu

    const router = useRouter(); // router to determine which link is active

    //Create variables to control the style of the navbar
    let mobileWidth;
    let hamburgerColor;

    //If the header prop is set to open
    if (open) {
        mobileWidth = "100%";
        hamburgerColor = "white";
    }

    return (
        <div>
            <div className={style.parent}>
                <div className={style.header}>
                    <Link href="/">
                        <span className={style.headerLogo}>
                            <img src="/logo.svg" alt="MindVersity Logo"></img>
                        </span>
                    </Link>
                    <div className={style.headerNav}>
                        <div
                            className={style.navWrapper}
                            style={{ width: mobileWidth }}
                        >
                            <Link href="/chapters">
                                <span
                                    className={
                                        router.pathname == "/chapters"
                                            ? style.activeNavBtn
                                            : style.navBtn
                                    }
                                >
                                    Chapters
                                </span>
                            </Link>
                            <Link href="/journal">
                                <span
                                    className={
                                        router.pathname == "/journal"
                                            ? style.activeNavBtn
                                            : style.navBtn
                                    }
                                >
                                    Journal
                                </span>
                            </Link>
                            <Link href="/resources">
                                <span
                                    className={
                                        router.pathname == "/resources"
                                            ? style.activeNavBtn
                                            : style.navBtn
                                    }
                                >
                                    Resources
                                </span>
                            </Link>
                            <Link href="/faq">
                                <span
                                    className={
                                        router.pathname == "/faq"
                                            ? style.activeNavBtn
                                            : style.navBtn
                                    }
                                >
                                    FAQs
                                </span>
                            </Link>
                            <div className={style.navIcon}>
                                <FaSearch className={style.navIconSearch} />
                            </div>
                        </div>
                        <button
                            className={style.navHamButton}
                            style={{ color: hamburgerColor }}
                            onClick={() => setOpen(!open)}
                        >
                            <AiOutlineMenu className={style.navHamButtonIcon} />
                        </button>
                    </div>
                </div>
            </div>
            <div className={style.headerContentSpacer}></div>
        </div>
    );
};

export default Header;

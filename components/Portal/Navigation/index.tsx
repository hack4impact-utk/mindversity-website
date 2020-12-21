import React, { useState } from "react";
import style from "./navigation.module.scss"; //Import the main stylesheet
import Link from "next/link";

//Import the icons from react-icons
import { AiOutlineMenu } from "react-icons/ai";
import { HiOutlineBookOpen } from "react-icons/hi";
import { FiPenTool, FiAward } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";
import Router from "next/router";
import urls from "utils/urls";

const handleSignout = async () => {
    await fetch(`${urls.baseUrl}${urls.api.admin.signout}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
    void Router.push("/");
};

const Navigation: React.FC = () => {
    const [open, setOpen] = useState(false); //Control the state of the mobile navigation menu

    return (
        <div>
            <div className={open ? style["navOpen"] : style["navParent"]}>
                <div className={style.navLogo}>
                    <img src="/logo-white.svg" alt="MindVersity Logo" />
                </div>
                <Link href="/portal/resources">
                    <span className={style.navBtn}>
                        <HiOutlineBookOpen className={style.menuIcon} />
                        Edit Resources
                    </span>
                </Link>
                <Link href="/portal/journal/review">
                    <span className={style.navBtn}>
                        <FiPenTool className={style.menuIcon} />
                        Review Journal Entries
                    </span>
                </Link>
                <Link href="/portal/journal/delete">
                    <span className={style.navBtn}>
                        <RiDeleteBin2Line className={style.menuIcon} />
                        Delete Journal Entries
                    </span>
                </Link>
                <Link href="/portal/chapters">
                    <span className={style.navBtn}>
                        <FiAward className={style.menuIcon} />
                        Manage Chapters
                    </span>
                </Link>
                <div className={style.navLower}>
                    <div className={style.navLowerLinks}>
                        <div className={style.navLowerCol}>
                            <Link href="/journal">
                                <span className={style.navLowerBtn}>
                                    Journal
                                </span>
                            </Link>
                            <Link href="/chapters">
                                <span className={style.navLowerBtn}>
                                    Chapters
                                </span>
                            </Link>
                        </div>
                        <div className={style.navLowerCol}>
                            <Link href="/resources">
                                <span className={style.navLowerBtn}>
                                    Resources
                                </span>
                            </Link>
                            <Link href="/faq">
                                <span className={style.navLowerBtn}>FAQ</span>
                            </Link>
                        </div>
                    </div>
                    <div className={style.navLowerLinks}>
                        <div className={style.navLowerCol}>
                            <button className={style.signoutBtn} onClick={handleSignout}>
                                Sign Out
                            </button>
                        </div>
                    </div>
                    <div className={style.navLowerText}>
                        A Global Effort to Better BIPOC Student Mental Health Care.
                    </div>
                </div>
            </div>
            <div
                aria-hidden="true"
                className={open ? style["overlayOpen"] : style["overlayClosed"]}
                onClick={() => setOpen(!open)}
            ></div>
            <button className={style.hamburgerMenu} onClick={() => setOpen(!open)}>
                <AiOutlineMenu />
            </button>
        </div>
    );
};

export default Navigation;

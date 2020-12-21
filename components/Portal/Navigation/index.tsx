import React, { useState } from "react";
import style from "./navigation.module.scss"; //Import the main stylesheet

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
                <a className={style.navBtn} href="/portal/resources">
                    <HiOutlineBookOpen className={style.menuIcon} />
                    Edit Resources
                </a>
                <a className={style.navBtn} href="/portal/journal/review">
                    <FiPenTool className={style.menuIcon} />
                    Review Journal Entries
                </a>
                <a className={style.navBtn} href="/portal/journal/delete">
                    <RiDeleteBin2Line className={style.menuIcon} />
                    Delete Journal Entries
                </a>
                <a className={style.navBtn} href="/portal/chapters">
                    <FiAward className={style.menuIcon} />
                    Manage Chapters
                </a>
                <div className={style.navLower}>
                    <div className={style.navLowerLinks}>
                        <div className={style.navLowerCol}>
                            <a className={style.navLowerBtn} href="/journal">
                                Journal
                            </a>
                            <a className={style.navLowerBtn} href="/chapters">
                                Chapters
                            </a>
                        </div>
                        <div className={style.navLowerCol}>
                            <a className={style.navLowerBtn} href="/resources">
                                Resources
                            </a>
                            <a className={style.navLowerBtn} href="/faq">
                                FAQ
                            </a>
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

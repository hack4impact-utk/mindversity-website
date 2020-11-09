import React, { useState } from "react";
import style from "./style.module.scss"; //Import the main stylesheet

//Import the icons from react-icons
import { AiOutlineMenu } from "react-icons/ai";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

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
          <a className={style.headerLogo} href="/">
            <img src="/logo.svg" alt="MindVersity Logo"></img>
          </a>
          <div className={style.headerNav}>
            <div className={style.navWrapper} style={{ width: mobileWidth }}>
              <a
                className={
                  router.pathname == "/chapters"
                    ? style.activeNavBtn
                    : style.navBtn
                }
                href="/chapters"
              >
                Chapters
              </a>
              <a
                className={
                  router.pathname == "/journal"
                    ? style.activeNavBtn
                    : style.navBtn
                }
                href="/journal"
              >
                Journal
              </a>
              <a
                className={
                  router.pathname == "/resources"
                    ? style.activeNavBtn
                    : style.navBtn
                }
                href="/resources"
              >
                Resources
              </a>
              <a
                className={
                  router.pathname == "/faq" ? style.activeNavBtn : style.navBtn
                }
                href="/faq"
              >
                FAQs
              </a>
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

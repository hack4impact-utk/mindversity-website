import React, { useState } from "react";
import {
  Parent,
  UpperHeader,
  LowerHeader,
  NavBar,
  NavMenu,
  UpperLink,
  UpperLinkFull,
  UpperLinkText,
  NavLink,
  LogoParent,
  Logo,
  HeaderSapcer,
  HamburgerNav,
} from "./style";

//Import the icons from react-icons
import {
  AiOutlineMenu,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";
import { FaSearch, FaFacebookF, FaMapMarkerAlt } from "react-icons/fa";

const mapIcon = {
  //Give the map icon extra margin
  marginRight: "10px",
};

const Header = () => {
  const [open, setOpen] = useState(false); //Control the state of the mobile navigation menu

  return (
    <div>
      <Parent>
        {/* For the upper (black) portion of the header */}
        <UpperHeader>
          <UpperLink href="login">
            <UpperLinkText>Login</UpperLinkText>
          </UpperLink>
          <UpperLinkFull href="https://www.facebook.com/MindVersed/">
            <UpperLinkText>
              <FaFacebookF />
            </UpperLinkText>
          </UpperLinkFull>
          <UpperLinkFull href="https://www.instagram.com/mindversityorg/">
            <UpperLinkText>
              <AiOutlineInstagram />
            </UpperLinkText>
          </UpperLinkFull>
          <UpperLinkFull href="https://twitter.com/MindVersity">
            <UpperLinkText>
              <AiOutlineTwitter />
            </UpperLinkText>
          </UpperLinkFull>
          <UpperLink>
            <UpperLinkText>
              <FaMapMarkerAlt style={mapIcon} />
              Select Region
            </UpperLinkText>
          </UpperLink>
        </UpperHeader>

        {/* For lower (blue) portion of the header */}
        <LowerHeader>
          <LogoParent href="/">
            <Logo src="/mindversity-logo.png" alt="MindVersity Logo" />
          </LogoParent>
          <NavBar>
            <NavMenu open={open}>
              <NavLink href="about">Chapters</NavLink>
              <NavLink href="resources">Resources</NavLink>
              <NavLink href="chapters">Journal</NavLink>
              <NavLink href="faq">FAQ</NavLink>
              <NavLink href="search">
                <FaSearch />
              </NavLink>
            </NavMenu>
            <HamburgerNav onClick={() => setOpen(!open)}>
              <AiOutlineMenu />
            </HamburgerNav>
          </NavBar>
        </LowerHeader>
      </Parent>

      {/* Since the header is fixed add a relative positioned spaces so nothing can go behind the header */}
      <HeaderSapcer />
    </div>
  );
};

export default Header;

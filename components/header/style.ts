import styled from "styled-components";

export const Parent = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: block;
`;

export const UpperHeader = styled.div`
  height: 40px;
  width: auto;
  position: relative;
  display: block;
  background-color: rgb(41, 43, 45);
  text-align: right;
`;

export const UpperLink = styled.a`
  width: auto;
  height: 100%;
  padding-left: 20px;
  padding-right: 20px;
  position: relative;
  display: inline-block;
  text-decoration: none;
  transition: background 0.5s ease;
  &:hover {
    cursor: pointer;
    background-color: rgb(10, 10, 10);
  }
`;

//Only gets displayed on larger screens
export const UpperLinkFull = styled.a`
  @media (min-width: 770px) {
    width: auto;
    height: 100%;
    padding-left: 20px;
    padding-right: 20px;
    position: relative;
    display: inline-block;
    text-decoration: none;
    transition: background 0.5s ease;
    &:hover {
      cursor: pointer;
      background-color: rgb(10, 10, 10);
    }
  }
  @media (max-width: 770px) {
    display: none;
  }
`;

export const UpperLinkText = styled.a`
  position: relative;
  display: block;
  color: white;
  top: 50%;
  transform: translateY(-50%);
`;

export const LowerHeader = styled.div`
  height: 80px;
  width: auto;
  position: relative;
  display: flex;
  background-color: #030926;
`;

export const LogoParent = styled.a`
  width: auto;
  height: 100%;
  display: inline-block;
  padding: 0px 20px;
  flex: 0;
`;

export const Logo = styled.img`
  max-height: 80%;
  width: auto;
  height: auto;
  position: relative;
  display: block;
  top: 50%;
  transform: translateY(-50%);
`;

export const NavBar = styled.div`
  width: auto;
  height: 100%;
  display: inline-block;
  padding-right: 20px;
  flex: 1;
  text-align: right;
  font-weight: bold;
`;

//Child to the navbar; Only contains the navbar links and doesnt contain the hamburger menu
export const NavMenu = styled.div<{ open: boolean }>`
  @media (min-width: 770px) {
    position: relative;
    display: block;
    top: 50%;
    transform: translateY(-50%);
  }
  @media (max-width: 770px) {
    heigth: auto;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.8);
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    padding-top: 100px;
    overflow: auto;
    z-index: 1000;
    transition: width 0.5s ease;
    width: ${props => (props.open ? "100%" : "0")};
  }
`;

//Links that appear inside the main navbar
export const NavLink = styled.a`
  @media (min-width: 770px) {
    height: auto;
    width: auto;
    position: relative;
    display: inline-block;
    padding: 5px 0px;
    margin-left: 30px;
    font-size: 18px;
    text-decoration: none;
    border-bottom: 2px solid rgba(255, 255, 255, 0);
    transition: 0.5s ease;
    color: white;
    &:hover {
      border-bottom: 2px solid rgba(255, 255, 255, 1);
      cursor: pointer;
    }
  }
  @media (max-width: 770px) {
    height: auto;
    width: auto;
    position: relative;
    display: block;
    text-align: center;
    color: white;
    font-size: 28px;
    text-decoration: none;
    margin: 10px 0px;
    padding: 10px;
  }
`;

export const HamburgerNav = styled.button`
  @media (min-width: 770px) {
    display: none;
  }
  @media (max-width: 770px) {
    height: auto;
    width: auto;
    position: relative;
    display: inline-block;
    padding: 5px 0px;
    margin-left: 30px;
    font-size: 34px;
    text-decoration: none;
    top: 50%;
    transform: translateY(-50%);
    border-bottom: 2px solid rgba(255, 255, 255, 0);
    transition: 0.5s ease;
    color: white;
    background: none;
    border: none;
    outline: none;
    z-index: 1001;
  }
  &:hover {
    cursor: pointer;
    color: grey;
  }
`;

//Since the header is fixed this adds an invisible div behind the header
export const HeaderSapcer = styled.div`
  height: 120px;
  width: auto;
  position: relative;
  display: block;
`;

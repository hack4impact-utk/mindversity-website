import styled from "styled-components";

export const Container = styled.div`
  padding: 10px 20px;
  background: rgb(41, 43, 45);
  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1500px;
  width: 100%;
  margin: 0 auto;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  grid-gap: 10px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 20px;
`;

export const Title = styled.p`
  font-size: 22px;
  color: #bbc0c3;
  margin-bottom: 20px;
  font-weight: bold;
`;

export const Link = styled.a`
  color: #858d95;
  margin-bottom: 10px;
  font-size: 18px;
  text-decoration: none;

  &:hover {
    color: #bbc0c3;
  }
`;

export const Image = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 15px;
  //line the logo up with the text
  margin-bottom: -4px;
`;

export const Logo = styled.img`
  width: 150px;
  height: 110px;
  margin: 30px 30px 20px 0px;
  margin-top: 10px;
`;

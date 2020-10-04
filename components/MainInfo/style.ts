import styled from "styled-components";
//Image sizes will most likely need to be adjusted for smaller breakpoints (small mobile devices probably need a breakpoint around 320px)
//Breakpoint object idea from: https://jsramblings.com/how-to-use-media-queries-with-styled-components/
const sizes = {
  mobile: `769px`,
  desktop: `770px`,
};
const devices = {
  mobile: `(max-width:${sizes.mobile})`,
  desktop: `(min-width:${sizes.desktop})`,
};

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 600px;
  overflow: hidden;
  position: relative;

  @media ${devices.mobile} {
    & > div:nth-child(1) {
      flex-direction: column-reverse;
      align-items: center;
    }
    & > div:nth-child(2) {
      flex-direction: column;
      align-items: center;
    }
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  min-height: 500px;
`;
export const Image = styled.img`
  width: 50%;
  height: 400px;
  right: 0;
  margin: 0 20px;
  align-self: center;
  @media ${devices.mobile} {
    width: 80%;
  }
`;

export const OpeningText = styled.header`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  margin: 0 40px;
  & > p {
    font-weight: 600;
    font-size: 2rem;
    margin: 0;
  }

  @media ${devices.mobile} {
    width: 80%;
    margin-bottom: 50px;
  }
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  margin: 0px 40px;
  & > h2 {
    font-size: 1.8rem;
    text-align: center;
    margin-bottom: 0;
  }
  & > p {
    font-size: 1.1rem;
    color: hsl(0, 0%, 35%);
    line-height: 1.5;
  }

  @media ${devices.mobile} {
    width: 80%;
  }
`;

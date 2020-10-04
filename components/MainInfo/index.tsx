import React from "react";
import { Container, Image, OpeningText, Wrapper, Description } from "./style";
import community from "./community.svg";
import characters from "./characters.svg";
const MainInfo: React.FC = () => (
  <Container>
    <Wrapper>
      <OpeningText>
        <p>A national peer network.</p>
        <p>A call to action.</p>
        <p>An initiative.</p>
        <p>A change.</p>
      </OpeningText>
      <Image src={community} alt="An image of three characters." />
    </Wrapper>

    <Wrapper>
      <Image src={characters} alt="An image of characters hanging out." />
      <Description>
        <h2>Welcome to MindVersity.</h2>
        <p>
          Since 2020, MindVersity has helped create supportive communities for
          individuals who are overcoming difficulties. We understand how helpful
          it is for people going through life issues to find a space where they
          can build connections with others who understand exactly what
          they&apos;re experiencing. Feel free to reach out for additional
          information.
        </p>
      </Description>
    </Wrapper>
  </Container>
);

export default MainInfo;

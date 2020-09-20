import React from "react";

interface Props {
  name: string;
}

// React.FC implicitly adds an optional prop: children
const MyDummyComponent: React.FC<Props> = ({ name, children }) => {
  return (
    <div>
      Hi, {name}! I am a strictly typed functional React component! This is my
      child: <br /> {children}
    </div>
  );
};

export default MyDummyComponent;

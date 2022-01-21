import React from "react";
import styled from "styled-components";
const NoMatch = () => {
  return (
    <Wrapper>
      <h1>Not found</h1>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
export default NoMatch;

import { Box } from "@material-ui/core";
import React, { ReactElement } from "react";
import styled from "styled-components";

const Wrapper = styled("div")`
  display: flex;
  height: 100%;
`;

const Sidebar = styled("div")`
  background-color: purple;
  height: 100vh;
`;
const MainPage = styled(Box)`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

interface Props {}

function Main({}: Props): ReactElement {
  return (
    <Wrapper>
      <Sidebar>SIDEBAR</Sidebar>
      <MainPage>main</MainPage>
    </Wrapper>
  );
}

export default Main;

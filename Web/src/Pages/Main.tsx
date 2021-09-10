import { Box, Button } from "@material-ui/core";
import React, { ReactElement } from "react";
import { Link, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Chat from "../Components/Chat";
import Home from "../Components/Home";
import Review from "../Components/Review";

const Wrapper = styled("div")`
  display: flex;
  height: 100%;
`;

const Sidebar = styled("div")`
  margin: 0;
  padding: 4px 16px;
  background-color: purple;
  display: flex;
  flex-direction: column;
  height: 100vh;
  list-style: none;
  align-items: center;
`;
const NavButton = styled(Button)`
  color: white;
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
      <Sidebar>
        <Link to="/main/home">
          <NavButton>home</NavButton>
        </Link>
        <Link to="/main/chat">
          <NavButton>chat</NavButton>
        </Link>
        <Link to="/main/review">
          <NavButton>review</NavButton>
        </Link>
      </Sidebar>
      <Switch>
        <Route path="home" component={Home} />
        <Route path="chat" component={Chat} />
        <Route path="review" component={Review} />
      </Switch>
    </Wrapper>
  );
}

export default Main;

import { useReactiveVar } from '@apollo/client';
import { Box, Button } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { ReactChild } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { meVar } from '../apollo/localstate';

const Wrapper = styled('div')`
  display: flex;
  height: 100%;
`;

const Sidebar = styled('div')`
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

interface Props {
  children: ReactChild;
}

function Layout({ children }: Props): ReactElement {
  const me = useReactiveVar(meVar);
  return (
    <Wrapper>
      <Sidebar>
        <Link to="/">
          <NavButton>home</NavButton>
        </Link>
        <Link to="/chat">
          <NavButton>chat</NavButton>
        </Link>
        <Link to={me?.__typename === 'Tutor' ? '/feedback' : '/review'}>
          <NavButton>
            {me?.__typename === 'Tutor' ? 'feedback' : 'review'}
          </NavButton>
        </Link>
      </Sidebar>
      <MainPage>{children}</MainPage>
    </Wrapper>
  );
}

export default Layout;

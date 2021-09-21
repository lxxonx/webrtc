import { useReactiveVar } from '@apollo/client';
import React, { ReactElement } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { isLoggedInVar, meVar } from './apollo/localstate';
import { useMeQuery } from './generated/graphql';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Main from './pages/Main';
import Review from './pages/Review';

const LoggedOutPage = () => {
  return (
    <Switch>
      <Route path="/" component={Login} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

const LoggedInPage = () => {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/chat/:classId" component={Chat} />
      <Route path="/review" component={Review} />

      <Redirect from="*" to="/" />
    </Switch>
  );
};
function AppRouter(): ReactElement {
  const { data } = useMeQuery();
  meVar(data?.me);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return <>{isLoggedIn ? <LoggedInPage /> : <LoggedOutPage />}</>;
}

export default AppRouter;

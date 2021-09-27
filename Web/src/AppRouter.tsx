import { useReactiveVar } from '@apollo/client';
import React, { ReactElement } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { isLoggedInVar, meVar } from './apollo/localstate';
import { useMeQuery } from './generated/graphql';
import Chat from './pages/Chat';
import ChatList from './pages/ChatList';
import Feedback from './pages/FeedBack';
import Main from './pages/Main';
import Review from './pages/Review';
import StudentLogin from './pages/StudentLogin';
import TutorLogin from './pages/TutorLogin';

const LoggedOutPage = () => {
  return (
    <Switch>
      <Route exact path="/login/" component={StudentLogin} />
      <Route exact path="/login/tutor" component={TutorLogin} />
      <Redirect from="*" to="/login" />
    </Switch>
  );
};

const StudentPage = () => {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/chat/:classId" component={Chat} />
      <Route exact path="/chat" component={ChatList} />
      <Route path="/review" component={Review} />

      <Redirect from="*" to="/" />
    </Switch>
  );
};
const TutorPage = () => {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/chat/:classId" component={Chat} />
      <Route exact path="/chat" component={ChatList} />
      <Route path="/feedback" component={Feedback} />

      <Redirect from="*" to="/" />
    </Switch>
  );
};
function AppRouter(): ReactElement {
  const { data } = useMeQuery();
  meVar(data?.me);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  if (isLoggedIn) {
    return (
      <>{data?.me?.__typename === 'Tutor' ? <TutorPage /> : <StudentPage />}</>
    );
  } else {
    return (
      <>
        <LoggedOutPage />
      </>
    );
  }
}

export default AppRouter;

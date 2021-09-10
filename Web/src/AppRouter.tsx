import React, { ReactElement, useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./Pages/Main";

const StudentPage = () => {
  return (
    <Switch>
      <Route path="/main" component={Main} />

      <Redirect from="*" to="/" />
    </Switch>
  );
};

const TutorPage = () => {
  return (
    <Switch>
      <Route path="/main" component={Main} />

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

import { CssBaseline, ThemeProvider } from "@material-ui/core";
import React, { ReactElement } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import theme from "./styles/theme";
import AppRouter from "./AppRouter";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo/client";

function App(): ReactElement {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <Router>
            <AppRouter />
          </Router>
        </ApolloProvider>
      </ThemeProvider>
    </>
  );
}

export default App;

import { CssBaseline, ThemeProvider } from "@material-ui/core";
import React, { ReactElement } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import theme from "./styles/theme";
import AppRouter from "./AppRouter";

function App(): ReactElement {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Router>
          <AppRouter />
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;

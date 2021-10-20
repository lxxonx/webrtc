import "../styles/reset.css";
import "../styles/globals.css";
import { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../styles/theme";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo/client";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline />
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
}

export default App;

import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import App from "./App";
import theme from "./theme";
import { createWeb3ReactRoot, Web3ReactProvider } from "@web3-react/core";
import getLibrary from "utils/getLibrary";
import './index.css'

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Web3ReactProvider>,
  document.querySelector("#root")
);

import React from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import Container from "@material-ui/core/Container";

import AuthManagerUtil from "./utils/AuthManagerUtil";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import Header from "./components/Layout/Header";
import SignonPage from "./pages/User/SignonPage";
import CadastroEmpresaPage from "./pages/Company/CadastroEmpresaPage";
import JobsPage from "./pages/Jobs/JobsPage";
import CreateJobPage from "./pages/Jobs/CreateJobPage";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#FFF2E9",
      main: "#000",
      dark: "#ec660b",
      contrastText: "#fff"
    },
    secondary: {
      light: "#0050a0",
      main: "#0050a0",
      dark: "#0050a0",
      contrastText: "#fff"
    },
    error: {
      main: "#D40026",
      contrastText: "#fff"
    },
    success: {
      main: "#38AC38"
    }
  }
});

const styleContainer = {
  padding: "16px"
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      AuthManagerUtil.isAuthenticated() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

function App() {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <Header />
        <Container fixed style={styleContainer}>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/home" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/cadastro" component={SignonPage} />
            <Route path="/cadastrar-empresa" component={CadastroEmpresaPage} />
            <PrivateRoute path="/ofertas-emprego" component={JobsPage} />
            <PrivateRoute path="/cadastrar-emprego" component={CreateJobPage} />
            {/*
              <Route component={NotFound} /> */}
          </Switch>
        </Container>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;

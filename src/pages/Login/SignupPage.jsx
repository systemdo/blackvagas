import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import { signUp } from "../../services/UserService";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import LoadDialog from "../../commons/Loads/LoadDialog";
import { Typography } from "@material-ui/core";
import { validateEmail } from "../../helpers/EmailHelper";
import AuthManagerUtil from "../../utils/AuthManagerUtil";

const styles = theme => ({
  textField: {
    width: "100%"
  },
  btn: {
    width: "100%"
  },
  grid: {
    height: "100vh"
  },
  paper: {
    width: "100%",
    padding: 16
  },
  titulo: {
    textAlign: "center",
    width: "100%"
  }
});

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      showError: false,
      load: false,
      helperTextEmail: "",
      helperTextPassword: "",
      password: ""
    };
  }

  validEmail = () => {
    const { email } = this.state;
    this.setState({ showError: false, helperTextEmail: "" });
    if (email === "") {
      this.setState({
        showError: true,
        helperTextEmail: "Email não pode ser vazio"
      });
      return false;
    } else if (!validateEmail(email)) {
      this.setState({ showError: true, helperTextEmail: "Email inválido" });
      return false;
    }
    return true;
  };

  handleEmail = e => {
    this.setState({ email: e.target.value });
  };

  signUp = () => {
    if (this.validEmail()) {
      this.setState({ load: true });
      signUp(this.state.email, this.state.password)
        .then(res => {
          this.setState({ load: false });
          AuthManagerUtil.setAuthSession(res.data.user);
          this.props.history.push("dogs");
          this.setState({ showError: true, helperTextEmail: "Login inválido" });
        })
        .catch(error => {
          this.setState({ load: false });
        });
    }
  };

  render() {
    const {
      load,
      showError,
      email,
      helperTextEmail,
      password,
      helperTextPassword
    } = this.state;
    const { classes } = this.props;
    return (
      <Grid
        container
        justify="center"
        alignContent="center"
        spacing={1}
        className={classes.grid}
      >
        <LoadDialog action={load} />
        <Grid container item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Typography component="h4" gutterBottom className={classes.titulo}>
              Login
            </Typography>
            <TextField
              error={showError}
              label="Email"
              type="email"
              className={classes.textField}
              value={email}
              onChange={this.handleEmail}
              margin="normal"
              variant="outlined"
              helperText={helperTextEmail}
            />
            <TextField
              error={showError}
              label="Senha"
              type="password"
              className={classes.textField}
              value={password}
              onChange={this.handleEmail}
              margin="normal"
              variant="outlined"
              helperText={helperTextPassword}
            />
            <Button
              variant="contained"
              className={classes.btn}
              color="primary"
              onClick={this.signUp}
            >
              Entrar
            </Button>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(withRouter(SignupPage));

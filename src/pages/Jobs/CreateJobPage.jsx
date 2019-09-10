import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import LoadDialog from "../../commons/Loads/LoadDialog";
import SelectSugestion from "../../commons/SelectSugestion";
import { Typography } from "@material-ui/core";
import { validateEmail } from "../../helpers/EmailHelper";
import AuthManagerUtil from "../../utils/AuthManagerUtil";
import CompanyService from "../../services/CompanyService";
import TextareaEditor from "./TextareaEditor";

const styles = theme => ({
  textField: {
    width: "100%"
  },
  btn: {
    width: "100%"
  },
  grid: {
    marginTop: 16
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

class CreateJobPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      load: false,
      position: "",
      description: "",
      details: "",
      helperTextPosition: "",
      helperTextDescription: "",
      helperTextDetails: "",
      showErrorPosition: false,
      showErrorDescription: false,
      showErrorDetails: false,
      data: [
        { label: "Analista de Sistemas" },
        { label: "Desenvolvedor de Sistemas" },
        { label: "Programador" },
        { label: "Engenheiro de Sistemas" }
      ]
    };
    this.CompanyService = new CompanyService();
  }

  validPosition = () => {
    const { position } = this.state;
    this.setState({ showErrorPosition: false, helperTextPosition: "" });
    if (position === "") {
      this.setState({
        showErrorPosition: true,
        helperTextPosition: "Qual o posto de trabalho?"
      });
      return false;
    }

    return true;
  };

  validDescription = () => {
    const { description } = this.state;
    this.setState({
      showErrorDescription: false,
      helperTextDescription: ""
    });
    if (description === "") {
      this.setState({
        showErrorDescription: true,
        helperTextDescription: "A descrição não pode ser vazia"
      });
      return false;
    }
    return true;
  };

  validDescription = () => {
    const { details } = this.state;
    this.setState({
      showErrorDetails: false,
      helperTextDetails: ""
    });
    if (details === "") {
      this.setState({
        showErrorDetails: true,
        helperTextDetails: "Os destalhes não pode estar vazio"
      });
      return false;
    }
    return true;
  };

  handleDescription = e => {
    console.log(e);
    this.setState({ description: e });
  };

  handleDetails = e => {
    this.setState({ details: e });
  };

  cadastrar = () => {
    if (this.validName() && this.validEmail()) {
      this.setState({ load: true });
      const company = {
        name: this.state.name,
        email: this.state.email,
        adress: ""
      };
      this.CompanyService.sendCompany(JSON.stringify(company))
        .then(res => {
          this.setState({ load: false });
          this.props.history.push("ofertas-emprego");
        })
        .catch(error => {
          this.setState({ load: false });
        });
    }
  };

  render() {
    const {
      data,
      load,
      position,
      description,
      details,
      showErrorPosition,
      helperTextPosition
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
              Cadastre-se
            </Typography>
            <SelectSugestion
              handleSelected={this.handlePosition}
              data={data}
              showError={showErrorPosition}
              helperText={helperTextPosition}
            />
            <TextareaEditor onWriteText={this.handleDescription} />
            <TextareaEditor onWriteText={this.handleDetails} />

            <Button
              variant="contained"
              className={classes.btn}
              color="primary"
              onClick={this.cadastrar}
            >
              cadastre-se
            </Button>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(withRouter(CreateJobPage));

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import LoadDialog from '../../commons/Loads/LoadDialog';
import { Typography } from '@material-ui/core';
import { validateEmail } from '../../helpers/EmailHelper'
import AuthManagerUtil from '../../utils/AuthManagerUtil';
import LoginService from '../../services/LoginService';
import UserManagerUtil from '../../utils/UserManagerUtil';

const styles = theme => ({
    textField:{
        width:'100%'
    },
    btn:{
        width:'100%',
        margin: 3,
    },
    grid: {
        height: '90vh'
    },
    paper:{
        width:'100%',
        padding: 16
    },
    titulo: {
        textAlign:'center',
        width:'100%',
    },
    error: {
        display: 'flex',
        justifyContent: 'center',
        color: 'red',
        border: '1px solid red'
    }
});

class LoginPage extends Component {   
    constructor(props) {
        super(props);
        this.state = {
           email: '',
           helperTextEmail: '',
           showError: false,
           textError: '',
           load: false,
           helperTextPassword: '',
           password:'',
           showErrorEmail: false,
           showErrorPassword: false
        }
        this.LoginService = new LoginService();
      }
    
    
    validEmail = () => {
        const { email } = this.state;
        this.setState({ showErrorEmail: false, helperTextEmail: ''});
        if(email === ''){
            this.setState({ showErrorEmail: true,  helperTextEmail: 'Email não pode ser vazio'});
            return false;
        }else if(!validateEmail(email)){
            this.setState({ showErrorEmail: true,  helperTextEmail: 'Email inválido'});
            return false;
        }
        return true;
    };

    validPassword = () => {
        const { password } = this.state;
        this.setState({ showErrorPassword: false, helperTextPassword: ''});
        if(password === ''){
            this.setState({ showErrorPassword: true,  helperTextPassword: 'Senha não pode ser vazia'});
            return false;
        }
        return true;
    };

    handleEmail = e => {      
        this.setState({ email: e.target.value });
    };

    handlePassword = e => {      
        this.setState({ password: e.target.value });
    };

    login = () => {
        if(this.validEmail() && this.validPassword()) {
            this.setState({ load: true, showError: false });
            this.LoginService.doSignInWithEmailAndPassword(this.state.email, this.state.password).then(result => {
                
               // AuthManagerUtil.setAuthSession(result.getToken());
                UserManagerUtil.setUserSession(result.user);
                this.setState({ load: false});
                this.setState({ showError: false,  textError: ''});
                this.props.history.push('ofertas-emprego');
            }).catch( error => {
                console.log(error);
                this.setState({ load: false});
                this.setState({ showError: true,  textError: 'Login inválido'});
            });
        }
       
    };

    signupGoogle = () => {
        this.LoginService.signGoogle().then( result =>{
            AuthManagerUtil.setAuthSession(result.credential.accessToken);
            UserManagerUtil.setUserSession(result.user);
            this.props.history.push('ofertas-emprego');
        }).catch( error => {
            this.setState({ showError: true,  textError: 'Login inválido'});
            
             /*var errorCode = error.code;
             var errorMessage = error.message;
             // The email of the user's account used.
             var email = error.email;
             // The firebase.auth.AuthCredential type that was used.
             var credential = error.credential;*/
             
        });
    } 

    signOn = () => {
        this.props.history.push('cadastro');
    }

    signOnCompany = () => {
        this.props.history.push('/cadastrar-empresa');
    }

    render (){
        const { load, showError, email, helperTextEmail, password, helperTextPassword, textError, showErrorEmail, showErrorPassword } = this.state;
        const { classes } = this.props
        return (
            <Grid container justify="center" alignContent="center" spacing={1} className={classes.grid}>
                <LoadDialog action={load} />
                <Grid container item xs={12} md={6} >
                    <Paper className={classes.paper}>
                        <Typography component='h4' gutterBottom className={classes.titulo}>
                            Login
                        </Typography>
                        <Typography component='span' gutterBottom className={classes.error} style={{ display: showError? 'flex': 'none'}}>
                           { textError }
                        </Typography>
                        <TextField
                            error={showErrorEmail}
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
                            error={showErrorPassword}
                            label="Senha"
                            type="password"
                            className={classes.textField}
                            value={password}
                            onChange={this.handlePassword}
                            margin="normal"
                            variant="outlined"
                            helperText={helperTextPassword}
                        />
                        <Button variant="contained" className={classes.btn} color="primary" onClick={this.login} >
                            Entrar
                        </Button>
                        <Button variant="contained" className={classes.btn} color="secondary" onClick={this.signupGoogle} >
                           Login com Gmail
                        </Button>
                        <Button  variant="outlined" className={classes.btn} color="primary" onClick={this.signOn} >
                           Cadastre-se
                        </Button>
                        <Button  variant="outlined" className={classes.btn} color="secondary" onClick={this.signOnCompany} >
                           Para empresas
                        </Button>
                </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(withRouter(LoginPage));

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
        width:'100%'
    },
    grid: {
        height: '100vh'
    },
    paper:{
        width:'100%',
        padding: 16
    },
    titulo: {
        textAlign:'center',
        width:'100%',
    }
});

class LoginPage extends Component {   
    constructor(props) {
        super(props);
        this.state = {
           email: '',
           showError: false,
           load: false,
           helperTextEmail: '',
           helperTextPassword: '',
           password:''
        }
        this.LoginService = new LoginService();
      }
    
    
    validEmail = () => {
        const { email } = this.state;
        this.setState({ showError: false, helperTextEmail: ''});
        if(email === ''){
            this.setState({ showError: true,  helperTextEmail: 'Email não pode ser vazio'});
            return false;
        }else if(!validateEmail(email)){
            this.setState({ showError: true,  helperTextEmail: 'Email inválido'});
            return false;
        }
        return true;
    };

    validPassword = () => {
        const { password } = this.state;
        this.setState({ showError: false, helperTextPassword: ''});
        if(password === ''){
            this.setState({ showError: true,  helperTextPassword: 'Senha não pode ser vazio'});
            return false;
        }
        return true;
    };

    handleEmail = e => {      
        this.setState({ email: e.target.value });
    };

    login = () => {
        if(this.validEmail()) {
            this.setState({ load: true });
            this.LoginService.doSignInWithEmailAndPassword(this.state.email, this.state.password).then(result => {
                AuthManagerUtil.setAuthSession(result.credential.accessToken);
                AuthManagerUtil.setUserSession(result.user);
                this.setState({ load: false});
                this.props.history.push('home');
                this.setState({ showError: false,  helperTextEmail: ''});
            }).catch( error => {
                this.setState({ load: false});
                this.setState({ showError: true,  helperTextEmail: 'Login inválido'});
            });
        }
       
    };

    signupGoogle = () => {
        this.LoginService.signGoogle().then( result =>{
            AuthManagerUtil.setAuthSession(result.credential.accessToken);
            AuthManagerUtil.setUserSession(result.user);
            this.props.history.push('home');
        }).catch( error => {
            this.setState({ showError: true,  helperTextEmail: 'Login inválido'});
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

    render (){
        const { load, showError, email, helperTextEmail, password, helperTextPassword } = this.state;
        const { classes } = this.props
        return (
            <Grid container justify="center" alignContent="center" spacing={1} className={classes.grid}>
                <LoadDialog action={load} />
                <Grid container item xs={12} md={6} >
                    <Paper className={classes.paper}>
                        <Typography component='h4' gutterBottom className={classes.titulo}>
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
                        <Button variant="contained" className={classes.btn} color="primary" onClick={this.login} >
                            Entrar
                        </Button>
                        <Button variant="contained" className={classes.btn} color="secondary" onClick={this.signupGoogle} >
                           Gmail
                        </Button>
                        <Button  className={classes.btn} color="primary" onClick={this.signOn} >
                           Cadastre-se
                        </Button>
                </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(withRouter(LoginPage));

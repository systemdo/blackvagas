import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import UserService, { signUp } from '../../services/UserService'; 
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import LoadDialog from '../../commons/Loads/LoadDialog';
import { Typography } from '@material-ui/core';
import { validateEmail } from '../../helpers/EmailHelper'
import AuthManagerUtil from '../../utils/AuthManagerUtil';
import SelectSugestion from '../../commons/SelectSugestion';



const styles = theme => ({
    textField:{
        width:'100%'
    },
    btn:{
        width:'100%'
    },
    grid: {
        marginTop: 16
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

class SignonPage extends Component {   
    constructor(props) {
        super(props);
        this.state = {
           email: '',
           load: false,
           helperTextEmail: '',
           helperTextPassword: '',
           password:'',
           emailConfirm: '',
           passwordConfirm: '',
           helperTextEmailConfirm: '',
           helperTextPasswordConfirm: '',
           showErrorEmail: false,
           showErrorEmailConfirm: false,
           showErrorPassword: false,
           showErrorPasswordConfirm: false,
           carrer: '',
           helpTextCarrer: '',
           showErrorCarrer: false,
        }
        this.UserService = new UserService();
      }
    
    
    validEmail = () => {
        const { email, emailConfirm } = this.state;
        this.setState({ showErrorEmailConfirm: false, showErrorEmail: false, helperTextEmail: ''});
        if(email === ''){
            this.setState({ showErrorEmail: true,  helperTextEmail: 'Email não pode ser vazio'});
            return false;
        }else if(!validateEmail(email)){
            this.setState({ showErrorEmail: true,  helperTextEmail: 'Email inválido'});
            return false;
        }
        else if( emailConfirm === '' ){
            this.setState({ showErrorEmailConfirm: true,  helperTextEmailConfirm: 'Email de confirmação não pode ser vazio'});
            return false;
        }
        else if( email !== emailConfirm){
            this.setState({ showErrorEmailConfirm: true,  helperTextEmailConfirm: 'Email de confirmação é diferente do email'});
            return false;
        }
        else if(!validateEmail(emailConfirm)){
            this.setState({ showErrorEmailConfirm: true,  helperTextEmailConfirm: 'Email inválido'});
            return false;
        }
        return true;
    };

    validPassword = () => {
        const { password, passwordConfirm } = this.state;
        this.setState({ showErrorPasswordConfirm: false, showErrorPassword: false, helperTextPassword: '', helperTextPasswordConfirm: ''});
        if(password === ''){
            this.setState({ showErrorPassword: true,  helperTextPassword: 'A senha não pode ser vazia'});
            return false;
        }
        else if( passwordConfirm === '' ){
            this.setState({ showErrorPasswordConfirm: true,  helperTextPasswordConfirm: 'A confirmação de senha não pode ser vazia'});
            return false;
        }
        else if( password !== passwordConfirm){
            this.setState({ showErrorEmailConfirm: true,  helperTextEmailConfirm: 'Email de confirmação é diferente do email'});
            this.setState({ showErrorPasswordConfirm: true,  helperTextPasswordConfirm: 'A confirmação de senha é diferente da senha'});
            return false;
        }
        return true;
    };

    validCarrer = () => {
        const { carrer } = this.state;
        this.setState({ showErrorCarrer: false, helpTextCarrer: ''});
        if(carrer === '') {
            this.setState({ showErrorCarrer: true,  helpTextCarrer: 'Qual sua Profissão?'});
            return false;
        }
      
        return true;
    };

    handleEmail = e => {      
        this.setState({ email: e.target.value });
    };
    handleEmailConfirm = e => {      
        this.setState({ emailConfirm: e.target.value });
    };
    handlePassword = e => {      
        this.setState({ password: e.target.value });
    };
    handlePasswordConfirm = e => {      
        this.setState({ passwordConfirm: e.target.value });
    };

    handleCareer = carrer => {
        this.setState({ carrer });
    }

    signOn = () => {
        if(this.validEmail() && this.validPassword() && this.validCarrer()){
            console.log(this.state);
            this.setState({ load: true });
            this.UserService.doCreateUserWithEmailAndPassword(this.state.email, this.state.password).then(res => {
                this.setState({ load: false});
                //AuthManagerUtil.setAuthSession(res.data.user);
                this.props.history.push('home');
                //this.setState({ showError: true,  helperTextEmail: 'Login inválido'});
            }).catch( error => {
                this.setState({ load: false});
              });
        }
       
    };

    render (){
        const { 
            load, showErrorEmail, email, emailConfirm, showErrorEmailConfirm, helperTextEmail, helperTextEmailConfirm,
            password,
            passwordConfirm,
            showErrorPassword,
            showErrorPasswordConfirm,
            helperTextPassword,
            helperTextPasswordConfirm,
            carrer,
            helpTextCarrer,
            showErrorCarrer
            
        } = this.state;
        
        const { classes } = this.props
        return (
            <Grid container justify="center" alignContent="center" spacing={1} className={classes.grid}>
                <LoadDialog action={load} />
                <Grid container item xs={12} md={6} >
                    <Paper className={classes.paper}>
                        <Typography component='h4' gutterBottom className={classes.titulo}>
                            Junte-se a nós!
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
                            error={showErrorEmailConfirm}
                            label="Email"
                            type="email"
                            className={classes.textField}
                            value={emailConfirm}
                            onChange={this.handleEmailConfirm}
                            margin="normal"
                            variant="outlined"
                            helperText={helperTextEmailConfirm}
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
                        <TextField
                            error={showErrorPasswordConfirm}
                            label="Confirme sua Senha"
                            type="password"
                            className={classes.textField}
                            value={passwordConfirm}
                            onChange={this.handlePasswordConfirm}
                            margin="normal"
                            variant="outlined"
                            helperText={helperTextPasswordConfirm}
                        />
                        <SelectSugestion handleSelected={this.handleCareer} showError={showErrorCarrer} helperText={helpTextCarrer} />
                        <Button variant="contained" className={classes.btn} color="primary" onClick={this.signOn} >
                            cadastre-se
                        </Button>
                </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(withRouter(SignonPage));

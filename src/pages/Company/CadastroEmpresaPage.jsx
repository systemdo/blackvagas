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
import CompanyService from '../../services/CompanyService';

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

class CadastroEmpresaPage extends Component {   
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
           name: '',
           helperTextName: '',
           showErrorName: false,
        }
        this.CompanyService = new CompanyService();
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

    validName= () => {
        const { name } = this.state;
        this.setState({ showErrorName: false, helperTextName: ''});
        if(name === '') {
            this.setState({ showErrorName: true,  helperTextName: 'Qual seu nome?'});
            return false;
        }
      
        return true;
    };
    handleName = e => {      
        this.setState({ name: e.target.value });
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

    cadastrar = () => {
        if(this.validName() && this.validEmail()) {
            this.setState({ load: true });
            const company = { name: this.state.name, email: this.state.email, adress: ''}; 
            this.CompanyService.sendCompany(JSON.stringify(company)).then(res => {
                console.log(res);
                this.setState({ load: false});
                this.props.history.push('home');
            }).catch( error => {
                this.setState({ load: false});
              });
        }
       
    };

    render (){
        const { 
            load, 
            showErrorEmail, 
            email, 
            emailConfirm, 
            showErrorEmailConfirm, 
            helperTextEmail, 
            helperTextEmailConfirm,
            name,
            showErrorName,
            helperTextName
            //password,
            //passwordConfirm,
            //showErrorPassword,
            //showErrorPasswordConfirm,
            //helperTextPassword,
            //helperTextPasswordConfirm,
            
        } = this.state;
        
        const { classes } = this.props
        return (
            <Grid container justify="center" alignContent="center" spacing={1} className={classes.grid}>
                <LoadDialog action={load} />
                <Grid container item xs={12} md={6} >
                    <Paper className={classes.paper}>
                        <Typography component='h4' gutterBottom className={classes.titulo}>
                            Cadastre-se
                        </Typography>
                        <TextField
                            error={showErrorName}
                            label="O nome de sua empresa"
                            type="text"
                            className={classes.textField}
                            value={name}
                            onChange={this.handleName}
                            margin="normal"
                            variant="outlined"
                            helperText={helperTextName}
                        />
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
                        { /*<TextField
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
                        />*/}
                        <Button variant="contained" className={classes.btn} color="primary" onClick={this.cadastrar} >
                            cadastre-se
                        </Button>
                </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(withRouter(CadastroEmpresaPage));

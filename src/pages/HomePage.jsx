import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import LoadDialog from './../commons/Loads/LoadDialog';
import { Typography } from '@material-ui/core';
import { Link as LinkRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    textField:{
        width:'100%'
    },
    btn:{
        width:'100%'
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

class HomePage extends Component {   
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
    }
    
    render (){
        const { load} = this.state;
        const { classes } = this.props
        return (
            <Grid container justify="center" alignContent="center" spacing={1} className={classes.grid}>
                <LoadDialog action={load} />
                <Grid container item xs={12} md={6} >
                    <Typography component='h4' gutterBottom className={classes.titulo}>
                        Sejam bem vindos ao Black Money
                    </Typography>
                    <Grid container justify="center" alignContent="center" spacing={1} className={classes.grid}>
                        <Grid container item xs={12} md={12} >
                            Se deseja fazer login ou cadastro com gmail:  <br/>
                            <Button component={LinkRouter} to="/login" variant="contained" color="primary" >
                                Login
                            </Button>
                        
                       
                        </Grid>
                        <Grid container item xs={12} md={12} >
                            Se deseja fazer Cadastro:  <br/>
                            <Button  variant="outlined" component={LinkRouter} to="/cadastro" color="primary" >
                                Cadastre-se
                            </Button>
                        </Grid>
                        <Grid container item xs={12} md={12} >
                            Se você é uma empresa:  <br/>
                            <Button  variant="outlined"  component={LinkRouter} to="/cadastrar-empresa" color="secondary" >
                                Para empresas
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>            
            </Grid>
        )
    }
}

export default withStyles(styles)(withRouter(HomePage));

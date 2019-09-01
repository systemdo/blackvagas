import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import LoadDialog from '../../commons/Loads/LoadDialog';
import { Typography } from '@material-ui/core';
import CardJobs from '../../components/Jobs/CardJobs';
import JobsService from '../../services/JobsService';



const styles = theme => ({

});

class JobsPage extends Component {   
    constructor(props) {
        super(props);
        this.state = {
           load: false,
           jobs: []
        }
        this.JobsService = new JobsService();
    }

    componentDidMount () {
        this.getJobs();
    }

    getJobs = () => {
        this.setState({ jobs: this.JobsService.getAllJobs()});
    }
   
    render (){
        const { load, jobs} = this.state;
        const { classes } = this.props
        return (
            <Grid container justify="center" alignContent="center" spacing={1} className={classes.grid}>
                <LoadDialog action={load} />
                <Typography component='h4' gutterBottom className={classes.titulo}>
                    Trabalhos
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={2}>
                            { jobs.map( job =>
                                <Grid item xs={12} md={10} >
                                    <CardJobs name={job.name} datejob={job.datejob} company={job.company} description={job.description} details={job.details} />
                                </Grid>  
                            )}
                       </Grid>     
                     </Grid>   
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(withRouter(JobsPage));

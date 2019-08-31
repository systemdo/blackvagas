import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: '100%',
  },
  description:{
    maxHeight: 56,
    display: 'flex',
    overflow: 'hidden'
  },
  expand: {
    transform: 'rotate(270deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));
const CardJobs = props  =>  {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { name, description, datejob, details, company} = props;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        title={name}
        subheader={ ` ${company}: ${datejob}`}
      />
      <CardContent className={classes.cardContent}>
        <div className={classes.description}>
          <Typography variant="body2" color="textSecondary" component="p" >
            {description}
          </Typography>
        </div>

      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="Add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="Share">
          <ShareIcon />
        </IconButton>
        <IconButton className={classes.expand} onClick={handleExpandClick}>
            <MoreVertIcon style={{ color: expanded ? 'blue': ''}}/>
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Detalhes:</Typography>
          <Typography paragraph>
            {details}
          </Typography>
         
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default CardJobs;
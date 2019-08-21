import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';

const styles = () => ({
  dialogload: {
    '& div div': {
      boxShadow: 'none',
      backgroundColor: 'inherit',
      overflow: 'hidden'
    }
  }
});

const LoadDialog = props => {
  const { action, classes, sizeProgress, thicknessProgress } = props;

  return (
    <Fragment>
      <Dialog open={action} close={!action} className={classes.dialogload}>
        <CircularProgress size={sizeProgress} thickness={thicknessProgress} />
      </Dialog>
    </Fragment>
  );
};

export default withStyles(styles)(LoadDialog);

LoadDialog.propTypes = {
  action: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  sizeProgress: PropTypes.number,
  thicknessProgress: PropTypes.number
};

LoadDialog.defaultProps = {
  action: false,
  sizeProgress: 150,
  thicknessProgress: 5
};

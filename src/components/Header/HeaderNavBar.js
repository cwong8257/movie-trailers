import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    marginRight: '1rem',

    '&:hover': {
      color: '#b3b3b3'
    }
  }
});

function doSomething(event) {
  console.log(event.currentTarget.getAttribute('data-something'));
}

function FlatButtons(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography color="inherit" variant="body1" component="span">
        <Link to="/" className={classes.link}>
          Home
        </Link>
      </Typography>
      <Typography color="inherit" variant="body1" component="span">
        <Link to="/most_popular" className={classes.link}>
          Most Popular
        </Link>
      </Typography>
      <Typography color="inherit" variant="body1" component="span">
        <Link to="/upcoming" className={classes.link}>
          Upcoming
        </Link>
      </Typography>
      <Typography color="inherit" variant="body1" component="span">
        <Link to="/top_rated" className={classes.link}>
          Top Rated
        </Link>
      </Typography>
    </div>
  );
}

FlatButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FlatButtons);

import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Grid from 'material-ui/Grid';
import moment from 'moment';

import HorizontalSlider from '../HorizontalSlider';
import FullWidthGrid from '../FullWidthGrid';
import CircularIndeterminate from '../CircularIndeterminate';
import { getPopular, getUpcoming, getTopRated } from '../../tmdb/tmdb';

const styles = theme => ({
  root: {
    padding: '4rem 2rem',
    backgroundColor: '#141414',
    color: '#e5e5e5'
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class HomePage extends React.Component {
  state = {};

  mapMovies = ({ poster_path, title, id, release_date, overview }) => {
    const { config } = this.props;
    const img = config.images.secure_base_url + config.images.poster_sizes[3] + poster_path;
    const year = release_date && moment(release_date).format('YYYY');

    return {
      id,
      img,
      title,
      overview,
      year
    };
  };

  componentDidMount() {
    getPopular().then(response => {
      const mostPopular = response.results;
      this.setState(() => ({ mostPopular }));
    });
    getUpcoming().then(response => {
      const upcoming = response.results;
      this.setState(() => ({ upcoming }));
    });
    getTopRated().then(response => {
      const topRated = response.results;
      this.setState(() => ({ topRated }));
    });
  }

  render() {
    const { classes, config } = this.props;
    const { mostPopular, upcoming, topRated } = this.state;

    if (mostPopular && upcoming && topRated) {
      const mostPopularTileData = mostPopular.map(this.mapMovies);
      const upcomingTileData = upcoming.map(this.mapMovies);
      const topRatedTileData = topRated.map(this.mapMovies);

      return (
        <div className={classes.root}>
          <HorizontalSlider title="Most Popular" link="/most_popular" tileData={mostPopularTileData} />
          <HorizontalSlider title="Upcoming" link="/upcoming" tileData={upcomingTileData} />
          <HorizontalSlider title="Top Rated" link="/top_rated" tileData={topRatedTileData} />
        </div>
      );
    }
    return (
      <div className={classes.loading}>
        <CircularIndeterminate />
      </div>
    );
  }
}

export default compose(
  withStyles(styles, {
    name: 'HomePage'
  }),
  connect(state => ({
    config: state.config
  }))
)(HomePage);

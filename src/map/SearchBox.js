import React from 'react';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import PropTypes from 'prop-types';
import withWidth, { isWidthUp } from 'material-ui/utils/withWidth';
import SearchIcon from 'material-ui-icons/Search';
import { fade } from 'material-ui/styles/colorManipulator';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  wrapper: {
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    marginRight: 0,
    borderRadius: 2,
    background: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      background: fade(theme.palette.common.white, 0.25),
    },
    '& $input': {
      transition: theme.transitions.create('width'),
      width: 50,
      '&:focus': {
        width: 80,
      },
    },
  },
  search: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    font: 'inherit',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px ${theme
      .spacing.unit * 9}px`,
    border: 0,
    display: 'block',
    verticalAlign: 'middle',
    whiteSpace: 'normal',
    background: 'none',
    margin: 0, // Reset for Safari
    color: 'inherit',
    width: '100%',
    '&:focus': {
      outline: 0,
    },
  },
});

function AppSearch(props) {
  const { classes, width } = props;

  return (
    <div className={classes.wrapper}>
      <div className={classes.search}>
        <SearchIcon color='contrast'/>
      </div>
      <input id="docsearch-input" className={classes.input} />
    </div>
  );
}

AppSearch.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
};

export default compose(
  withStyles(styles, {
    name: 'AppSearch',
  }),
  withWidth(),
  pure,
)(AppSearch);
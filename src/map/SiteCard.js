import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = {
  card: {
    maxWidth: 900,
  },
  media: {
    height: 400,
    width: 500
  },
};

function SiteCard(props) {
  const { classes, site } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={`http://localhost:4000/timeseries/${site}.jpg`}
          title={site}
        />
        <CardContent>
          <Typography type="headline" component="h2">
            {site}
          </Typography>
          <Typography component="p">
            content
          </Typography>
        </CardContent>
        <CardActions>
          <Button dense color="primary">
            Share
          </Button>
          <Button dense color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

SiteCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SiteCard);
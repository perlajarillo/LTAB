import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
  wrapper: {
    margin: "65px 0"
  }
});

const MentorsHome = props => {
  const { classes } = props;
  const { history } = props;

  return (
    <main className={classes.wrapper}>
      <div className={classes.backImg} />
      <div className={classes.pageTitle}>
        <Typography variant="h6" gutterBottom>
          Thank you for being a mentor
        </Typography>
      </div>
    </main>
  );
};

MentorsHome.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MentorsHome);

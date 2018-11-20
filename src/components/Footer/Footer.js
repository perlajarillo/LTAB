import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 6,
    bottom: 0,
    width: "100vw"
  },
  paper: {
    padding: theme.spacing.unit * 6,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 0
  },
  textColor: {
    color: theme.palette.primary.contrastText
  }
});

function Footer(props) {
  const { classes } = props;
  return (
    <footer className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <Typography variant="h6" align="center" className={classes.textColor}>
          FLAD Mentorship
        </Typography>
        <Typography
          variant="caption"
          align="center"
          className={classes.textColor}
        >
          Developed by{" "}
          <a
            href="https://www.linkedin.com/in/perla-jarillo-98290436/"
            target="blank"
          >
            Perla Jarillo{" "}
          </a>
        </Typography>
      </Paper>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);

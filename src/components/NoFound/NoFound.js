import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import dog from "../../images/dog.jpg";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  wrapper: {
    margin: 0,
    top: 0,
    bottom: 0,
    height: "100vh",
    width: "100vw",
    zIndex: 1900,
    position: "absolute",
    backgroundColor: "#f4f6f6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  card: {
    padding: "40px 60px",
    background: "#eee",
    maxWidth: "100%",
    display: "block",
    [theme.breakpoints.up("sm")]: {
      width: "40em"
    }
  },
  button: {
    marginTop: theme.spacing.unit * 2
  },
  picture: {
    width: 230,
    height: 330
  }
});

function NoFound(props) {
  const { classes } = props;
  return (
    <main className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.card}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <img src={dog} className={classes.picture} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Typography variant="h4" color="textSecondary" gutterBottom>
                We could not find the page you requested. Please check the URL
                for mistakes and try again.
              </Typography>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            component={Link}
            to="/"
          >
            Go back to home page
          </Button>
        </div>
      </div>
    </main>
  );
}

NoFound.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(NoFound);

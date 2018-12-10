import React, { Component } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import logo_original from "../../images/logo_original.png";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    margin: "95px 0",
    minHeight: "80vh",
    [theme.breakpoints.up("sm")]: {
      margin: "120px 24px"
    }
  },
  pageTitle: {
    paddingTop: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

class MentorsHome extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.pageTitle}>
          <Typography variant="h6" gutterBottom>
            Welcome to FLAD Mentorship
          </Typography>
        </div>
        <Grid container>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <img
              src={logo_original}
              alt="Let's talk about business"
              className={classes.principalLogo}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Typography variant="h6" color="primary" gutterBottom>
              Thank you for being a mentor!
            </Typography>
            <Typography variant="body1">
              Mentorship is incredibly important because it provides
              participating mentees with valuable insight to assist and guide
              them in creating, growing, and strengthening their businesses, and
              achieve success.
            </Typography>
            <br />
            <Typography variant="body1">
              {" "}
              As a mentor, you will be able to share your expertice with the
              community and be involve with a wide business network!.
            </Typography>
            <br />
            <Typography variant="body1">
              {" "}
              You can share a message with our community anytime clicking the
              button bellow.
            </Typography>
            <br />
            <div>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/mentorsmessage"
                className={classes.button}
              >
                Write a message
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

MentorsHome.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MentorsHome);

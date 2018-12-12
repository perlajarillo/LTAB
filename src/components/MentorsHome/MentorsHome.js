import React, { Component } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import logo_original from "../../images/logo.png";
import Grid from "@material-ui/core/Grid";
import MentorsMessage from "./MentorsMessage";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

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
  },
  principalLogo: {
    marginLeft: theme.spacing.unit * 1,
    [theme.breakpoints.up("xs")]: {
      width: "140px",
      marginLeft: theme.spacing.unit * 9
    },
    [theme.breakpoints.up("sm")]: {
      width: "275px",
      marginLeft: theme.spacing.unit * 11
    },
    [theme.breakpoints.up("md")]: {
      width: "355px",
      marginLeft: theme.spacing.unit * 2
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "145px",
      marginLeft: theme.spacing.unit * 7
    }
  },
  note: {
    color: theme.palette.secondary.dark
  }
});

class MentorsHome extends Component {
  render() {
    const { classes } = this.props;
    const name = this.props.authUser ? this.props.authUser.userName : "";
    return (
      <div className={classes.root}>
        <div className={classes.pageTitle}>
          <Typography variant="h6" gutterBottom color="primary">
            {"Welcome to FLAD Mentorship " + name + "!"}
          </Typography>
        </div>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <img
              src={logo_original}
              alt="Let's talk about business"
              className={classes.principalLogo}
            />
          </Grid>
          <Grid item xs={12} sm={7} md={7} lg={7}>
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
            <Card>
              <CardContent>
                <MentorsMessage />
              </CardContent>
            </Card>
            <br />
            <Typography variant="body2" className={classes.note}>
              {" "}
              You can also set your message from the settings menu.
            </Typography>
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

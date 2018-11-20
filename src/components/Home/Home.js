import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import backgroundImg from "../../images/letstalk_logo_3.jpg";
import logo_original from "../../images/logo_original.png";
import LogIn from "../Login/LogIn";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  wrapper: {
    margin: "65px 0"
  },
  sectionStyles: {
    padding: theme.spacing.unit * 1,
    [theme.breakpoints.up("sm")]: {
      padding: "0 100 px 0 100px"
    },
    [theme.breakpoints.up("md")]: {
      padding: "0 90px 0 90px"
    }
  },
  pageTitle: {
    paddingTop: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  backImg: {
    background: "url(" + backgroundImg + ")",
    backgroundPosition: "center 70%",
    padding: "11% 0",
    backgroundSize: "cover",
    [theme.breakpoints.up("sm")]: {
      marginTop: "70px"
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "110px"
    },
    [theme.breakpoints.between("sm", "md")]: {
      marginTop: "130px"
    }
  },
  principalLogo: {
    marginLeft: theme.spacing.unit * 3,
    [theme.breakpoints.up("xs")]: {
      width: "140px",
      marginLeft: theme.spacing.unit * 9
    },
    [theme.breakpoints.up("sm")]: {
      width: "135px",
      marginLeft: theme.spacing.unit * 11
    },
    [theme.breakpoints.up("md")]: {
      width: "225px"
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "145px",
      marginLeft: theme.spacing.unit * 7
    }
  },
  button: {
    margin: theme.spacing.unit
  },
  leftPanel: {
    marginTop: 30,
    marginLeft: 20
  }
});

const Home = props => {
  const { classes } = props;
  const { history } = props;

  return (
    <main className={classes.wrapper}>
      <div className={classes.backImg} />
      <div className={classes.pageTitle}>
        <Typography variant="h6" gutterBottom>
          Mentorship is incredibly important because it provides participating
          mentees with valuable insight to assist and guide them in creating,
          growing, and strengthening their businesses, and achieve success.
        </Typography>
        <Typography variant="h6" gutterBottom>
          It also provides mentors with insight into other business areas, and
          involves them in a wide business network!
        </Typography>
      </div>
      <br />
      <Divider />
      <Grid container spacing={8}>
        <Grid item xs={12} sm={5} md={4} lg={3}>
          <div className={classes.leftPanel}>
            <Typography variant="h6" gutterBottom>
              Do you want to be a #LetsTalkAboutBusiness mentor?
            </Typography>
            <Typography variant="body1" gutterBottom>
              Our Program Coordinator, Carmen Monereo is currently recruiting
              mentors!
            </Typography>
            <Typography variant="body1" gutterBottom>
              Please reach out to us through email to{" "}
              <a href="mailto:talkbusiness@flad.pt">talkbusiness@flad.pt</a>
            </Typography>
            <div>
              <img src={logo_original} className={classes.principalLogo} />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={7} md={8} lg={9}>
          <div>
            <LogIn history={history} />
          </div>
        </Grid>
      </Grid>
    </main>
  );
};

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);

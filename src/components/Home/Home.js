import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import backgroundImg from "../../images/letstalk_logo_3.jpg";
import logo_original from "../../images/logo_original.png";
import LogIn from "../Login/LogIn";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import icon_facebook from "../../images/icon_facebook.png";
import b_business from "../../images/b_business.jpg";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

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
    padding: "13% 0",
    backgroundSize: "contain",
    [theme.breakpoints.up("xs")]: {
      marginTop: "83px"
    },
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

  icons: {
    width: "50px",
    marginLeft: 75,
    paddingBottom: "1%",
    [theme.breakpoints.up("xs")]: {
      width: "40px"
    },
    [theme.breakpoints.up("sm")]: {
      width: "35px"
    },
    [theme.breakpoints.up("md")]: {
      width: "95px"
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "45px"
    }
  },
  iconBusiness: {
    width: "50px",
    marginTop: "50px",
    marginLeft: 75,
    border: "2px solid green",
    paddingBottom: "1%",
    [theme.breakpoints.up("xs")]: {
      width: "40px"
    },
    [theme.breakpoints.up("sm")]: {
      width: "35px"
    },
    [theme.breakpoints.up("md")]: {
      width: "95px"
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "45px"
    }
  },
  card: {
    marginTop: "30px",
    paddingBottom: "1%",
    [theme.breakpoints.up("xs")]: {
      width: "auto"
    },
    [theme.breakpoints.up("sm")]: {
      width: "250px"
    },
    [theme.breakpoints.up("md")]: {
      width: "650px",
      marginLeft: "50px"
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "320px",
      marginLeft: "50px"
    }
  },
  menteeCard: {
    marginTop: "30px",
    paddingBottom: "1%",

    [theme.breakpoints.up("xs")]: {
      width: "auto",
      height: "auto"
    },
    [theme.breakpoints.up("sm")]: {
      width: "250px"
    },
    [theme.breakpoints.up("md")]: {
      width: "650px",
      height: "540px"
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "320px",
      height: "478px"
    }
  },

  text: {
    marginTop: theme.spacing.unit * 2
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
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Do you want to be a #LetsTalkAboutBusiness mentor?
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                component={Link}
                to="/newmentor"
                className={classes.button}
              >
                Create a mentor account
              </Button>

              <Typography variant="body1" gutterBottom className={classes.text}>
                Or please reach out to us through email to{" "}
                <a href="mailto:talkbusiness@flad.pt">talkbusiness@flad.pt</a>
              </Typography>
              <div>
                <img src={logo_original} className={classes.principalLogo} />
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Card className={classes.menteeCard}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Are you looking for a mentor and your are not registered yet?
              </Typography>
              <br />
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                component={Link}
                to="/newmentee"
                className={classes.button}
              >
                Create an account
              </Button>

              <Typography variant="body1" className={classes.text}>
                Or visit our Facebook page and Web Site to know more about the
                program:
              </Typography>
              <a
                href="https://www.facebook.com/TalkBusinessFlad/"
                target="blank"
              >
                <img src={icon_facebook} className={classes.icons} />
              </a>
              <a
                href="https://www.flad.pt/en/lets-talk-about-business/"
                target="blank"
              >
                <img src={b_business} className={classes.iconBusiness} />
              </a>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </main>
  );
};

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);

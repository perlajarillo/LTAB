import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import icon_facebook from "../../images/icon_facebook.png";
import b_business from "../../images/logo_square.png";
import emailLogo from "../../images/email.png";

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
  },
  credits: {
    color: "#bdbdbd",
    fontSize: "0.55rem"
  },
  links: {
    color: "white"
  },
  icon: {
    width: "26px"
  },
  socialIcon: {
    marginRight: "0px",
    margin: "1em"
  },
  iconSection: {
    marginRight: "0px"
  }
});

function Footer(props) {
  const { classes } = props;
  return (
    <footer className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <Typography
              variant="caption"
              align="center"
              className={classes.textColor}
            >
              2018 FLAD Mentorship
            </Typography>
          </Grid>
          <Grid item xs={12} sm={7} md={7} lg={7}>
            <Typography
              variant="caption"
              align="center"
              className={classes.textColor}
            >
              Developed by{" "}
              <a
                className={classes.links}
                href="https://www.linkedin.com/in/perla-jarillo-98290436/"
                target="blank"
              >
                Perla Jarillo{" "}
              </a>{" "}
              and{" "}
              <a
                href="https://www.fabiolavieyra.com/"
                className={classes.links}
                target="blank"
              >
                Fabiola Vieyra{" "}
              </a>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={2} md={2} lg={2}>
            <div className={classes.iconSection}>
              <a
                className={classes.socialIcon}
                href="https://www.facebook.com/TalkBusinessFlad/"
                target="blank"
              >
                <img
                  src={icon_facebook}
                  alt="Let's talk about business in Facebook"
                  className={classes.icon}
                />
              </a>
              <a
                className={classes.socialIcon}
                href="https://www.flad.pt/en/lets-talk-about-business/"
                target="blank"
              >
                <img
                  src={b_business}
                  alt="Let's talk about business"
                  className={classes.icon}
                />
              </a>
              <a
                className={classes.socialIcon}
                href="mailto:talkbusiness@flad.pt"
              >
                <img
                  src={emailLogo}
                  alt="Let's talk about business mail"
                  className={classes.icon}
                />
              </a>
            </div>
          </Grid>
        </Grid>
        <div>
          <Typography
            variant="caption"
            align="center"
            className={classes.credits}
            gutterBottom
          >
            CREDITS - Logos cards social media and phone: Icons made by{" "}
            <a
              href="http://www.freepik.com/"
              title="Freepik"
              className={classes.links}
            >
              Freepik
            </a>{" "}
            from{" "}
            <a
              href="https://www.flaticon.com/"
              title="Flaticon"
              className={classes.links}
            >
              www.flaticon.com
            </a>{" "}
            is licensed by{" "}
            <a
              href="http://creativecommons.org/licenses/by/3.0/"
              title="Creative Commons BY 3.0"
              target="_blank"
              className={classes.links}
            >
              CC 3.0 BY{", "}
            </a>
            Email icon made by{" "}
            <a
              href="https://www.flaticon.com/authors/vectors-market"
              title="Vectors Market"
              className={classes.links}
            >
              Vectors Market
            </a>{" "}
            from{" "}
            <a
              href="https://www.flaticon.com/"
              title="Flaticon"
              className={classes.links}
            >
              www.flaticon.com
            </a>{" "}
            is licensed by{" "}
            <a
              href="http://creativecommons.org/licenses/by/3.0/"
              title="Creative Commons BY 3.0"
              className={classes.links}
              target="_blank"
            >
              CC 3.0 BY{" "}
            </a>
            List of specialties/industries based on LinkedIn's{" "}
            <a
              href="https://developer.linkedin.com/docs/reference/industry-codes"
              title="Industry codes"
              className={classes.links}
              target="_blank"
            >
              reference table.
            </a>
          </Typography>
        </div>
      </Paper>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);

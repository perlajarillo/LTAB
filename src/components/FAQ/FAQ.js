import React, { Component } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Divider from "@material-ui/core/Divider";
import programData from "../Literals/Literals";

const { program, contact } = programData;

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  wrapper: {
    marginTop: "6rem",
    [theme.breakpoints.up("md")]: {
      marginTop: "9rem"
    },
    marginLeft: "1rem",
    marginRight: "1rem",
    padding: theme.spacing.unit * 3
  },
  qa: {
    marginTop: "2rem"
  },
  q: {
    color: "#c62828"
  },
  a: {
    marginTop: "1rem"
  },
  tabBar: {
    background: "transparent",
    boxShadow: "none"
  }
});

class Faq extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.wrapper}>
        <Typography variant="h6" gutterBottom align="center" color="primary">
          Frequently Asked Questions
        </Typography>
        <AppBar position="static" className={classes.tabBar}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            variant="fullWidth"
            textColor="primary"
          >
            <Tab label="Mentees" />
            <Tab label="Mentors" />
          </Tabs>
        </AppBar>
        {value === 0 && (
          <TabContainer>
            <div className={classes.qa}>
              <Typography
                variant="subtitle1"
                gutterBottom
                className={classes.q}
              >
                How can I participate as a mentee?
              </Typography>
              <Typography variant="body2" gutterBottom>
                You need to create an account in {program.name} App. If you
                haven't, click{" "}
                <a href="https://flad-mentorship.firebaseapp.com/newmentee">
                  here
                </a>{" "}
                and fill the information asked. Once you have your account
                created, you will be able to find and contact mentors who are
                participating in {program.name} program!
              </Typography>
              <Divider />
            </div>
            <div className={classes.qa}>
              <Typography
                variant="subtitle1"
                gutterBottom
                className={classes.q}
              >
                I am a mentee with an account, what is next?
              </Typography>
              <Typography variant="body2" gutterBottom>
                As a mentee of {program.name} program you have access to our
                network of experts. Visit this{" "}
                <a href="http://localhost:3000/availablementors">link</a> to see
                the available mentors. Read the descriptions and feel free to
                contact them if their status is <b>available</b>. You can filter
                the mentors by specialty, state or see the suggested mentors for
                you. Here is a{" "}
                <a href="http://ior.ad/FGz" target="blank">
                  tutorial{" "}
                </a>{" "}
                to help you to understand how this section works.
              </Typography>
              <Typography variant="body2" gutterBottom className={classes.a}>
                We strongly recommend to specify your field of interest to help
                us match mentors for you. If you haven't done that yet visit
                this <a href="http://localhost:3000/settings"> page </a>and go
                to the Profile section.
              </Typography>
              <Typography variant="body2" gutterBottom className={classes.a}>
                Our network of mentors is growing every day, so if you did not
                find a mentor today don't give up!.{" "}
              </Typography>
              <Typography variant="body2" gutterBottom className={classes.a}>
                If you have suggestions or need some help finding a mentor
                please send an email to{" "}
                <a href={"mailto:" + contact.email}>{contact.email}</a>
              </Typography>
              <Divider />
            </div>
            <div className={classes.qa}>
              <Typography
                variant="subtitle1"
                gutterBottom
                className={classes.q}
              >
                I am a mentee and haven't found a mentor, what can I do?
              </Typography>
              <Typography variant="body2" gutterBottom>
                After login into your account, you can filter the mentors by
                specialty, state or see the suggested mentors.
              </Typography>
              <Typography variant="body2" gutterBottom className={classes.a}>
                We use your field of interest to find mentors for you. Please
                visit this <a href="http://localhost:3000/settings"> page </a>
                and go to the Profile section to be sure that your profile is
                complete.
              </Typography>
              <Typography variant="body2" gutterBottom className={classes.a}>
                If you completed all the process described above, and you
                haven't find a mentor, please send an email to{" "}
                <a href={"mailto" + contact.email}>{contact.email}</a> and
                describe the kind of expertise you are interested in.
              </Typography>
              <Typography variant="body2" gutterBottom className={classes.a}>
                <b>
                  Finally, the most important is to not give up, our network of
                  professionals is growing every day.
                </b>
              </Typography>
              <Divider />
            </div>
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            <div className={classes.qa}>
              <Typography
                variant="subtitle1"
                gutterBottom
                className={classes.q}
              >
                How can I participate as a mentor?
              </Typography>
              <Typography variant="body2" gutterBottom>
                To participate as a mentor in {program.name} program you may
                create an account by filling this{" "}
                <a href="https://flad-mentorship.firebaseapp.com/newmentor">
                  form
                </a>
                . If you already did it, you are ready to start mentoring!
              </Typography>
              <Divider />
            </div>
            <div className={classes.qa}>
              <Typography
                variant="subtitle1"
                gutterBottom
                className={classes.q}
              >
                I am a mentor with an account, what is next?
              </Typography>
              <Typography variant="body2" gutterBottom>
                Thank you for being part of our network! As a mentor you can
                share your professional experiences with our mentees.
              </Typography>
              <Typography variant="body2" gutterBottom className={classes.a}>
                Even when you don't need to search for mentees, you can help
                them to find you by sharing a message that can guide them to
                know what kind of expertise you have, so they can contact you.
                To share a message click{" "}
                <a href="http://localhost:3000/settings">here</a> then go to the
                option Message and start typing.
              </Typography>
              <Typography variant="body2" gutterBottom className={classes.a}>
                See this <a href="http://ior.ad/6DWH">tutorial</a> to find more
                information about how to use this site.
              </Typography>
              <Divider />
            </div>
            <div className={classes.qa}>
              <Typography
                variant="subtitle1"
                gutterBottom
                className={classes.q}
              >
                I need to change my availability as a mentor, how can I do that?
              </Typography>

              <Typography variant="body2" gutterBottom className={classes.a}>
                You can change your availability any time in the settings menu.
                Click <a href="http://localhost:3000/settings">here</a> then go
                to the option Profile and click in the checkbox "Available for
                mentoring".
              </Typography>
              <Typography variant="body2" gutterBottom className={classes.a}>
                See this <a href="http://ior.ad/FDW">tutorial</a> to find more
                information about how to use this site.
              </Typography>
              <Divider />
            </div>
          </TabContainer>
        )}
      </div>
    );
  }
}

Faq.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Faq);

import React, { Component } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { setState, getMentorState } from "../../firebase/operations";
import { auth } from "../../firebase";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "../SnackbarContentComponent/SnackbarContentComponent";

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
  textField: {
    marginTop: 20,
    [theme.breakpoints.up("xs")]: {
      width: 250
    },
    [theme.breakpoints.up("sm")]: {
      width: 800
    },
    [theme.breakpoints.up("md")]: {
      width: 750
    },

    [theme.breakpoints.between("sm", "md")]: {
      width: 550
    }
  },

  card: {
    width: "500px",
    margin: "30px auto",
    paddingBottom: "1%",
    [theme.breakpoints.up("xs")]: {
      width: "auto",
      margin: "0px auto"
    },
    [theme.breakpoints.up("sm")]: {
      width: "250px"
    },
    [theme.breakpoints.up("md")]: {
      width: "950px"
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "620px"
    }
  }
});

const HAVENT_SET_STATE =
  "Please share something with our community. What would you like for our mentees to know about you?";
const HAVE_SET_STATE =
  "The next message has been shared with our community. You can change it any time at your convenience.";

class MentorsHome extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      mentorState: "",
      openSnackbarSaved: false,
      openSnackbarError: false,
      sectionError: "",
      successMsg: ""
    };
  }

  /**
   * handleChange – the handleChange sets the value selected in a select list
   * or a text field
   * @param {Object} the object name and event
   * @return {void}
   */
  handleChange = event => {
    const { target } = event;
    const { value, name } = target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = () => {
    const { mentorState } = this.state;
    mentorState &&
      setState(auth.currentUserUid(), mentorState)
        .then(
          this.setState({
            openSnackbarSaved: true,
            sectionError: "",
            successMsg: "Your message have been shared with our community."
          })
        )
        .catch(error => {
          this.setState({
            openSnackbarError: true,
            sectionError: error.message
          });
        });
  };
  /**
   * handleSnackbarClose - sets the actions when the snackbar is closed
   * @param {Object} event the event object
   * @param {Object} reason for closing the snackbar
   * @return {void}
   */
  handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.state.openSnackbarSaved
      ? this.setState({
          openSnackbarSaved: false,
          returnMentor: true
        })
      : this.setState({ openSnackbarError: false });
  };
  /**
   * mentorState – sets in the state data to edit
   * @returns {void}
   */
  mentorState = () => {
    getMentorState(auth.currentUserUid()).then(snapshot => {
      this.setState({
        mentorState: snapshot.val()
      });
    });
  };
  /**
   * componentDidMount – call the method mentorState
   * @returns {void}
   */
  componentDidMount = () => {
    if (this.props.authUser) {
      this.mentorState();
    }
  };
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.mentorState();
    }
  }
  render() {
    const { classes } = this.props;
    const {
      mentorState,
      openSnackbarSaved,
      openSnackbarError,
      sectionError,
      successMsg
    } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.pageTitle}>
          <Typography variant="h6" gutterBottom>
            Your message to FLAD Mentorship community
          </Typography>
        </div>

        <Card className={classes.card}>
          <CardContent>
            <Typography variant="body1">
              Write here about the expertise you can share with the community of
              mentees (e.g. "I am an speaker and author, I can help you to
              prepare your speech").
            </Typography>
            <Typography variant="caption" gutterBottom>
              {mentorState ? HAVE_SET_STATE : HAVENT_SET_STATE}
            </Typography>
            <div>
              <br />
              <TextField
                id="mentorState"
                name="mentorState"
                multiline
                rows="5"
                label="Your message (200 characters max)"
                value={mentorState}
                onChange={this.handleChange}
                className={classes.textField}
                inputProps={{ maxLength: 200 }}
              />
            </div>{" "}
            <div>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                className={classes.button}
                onClick={this.handleSubmit}
              >
                Share
              </Button>
            </div>
          </CardContent>
        </Card>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={openSnackbarSaved}
          autoHideDuration={3000}
          onClose={this.handleSnackbarClose}
          id="openSnackbarSaved"
          name="openSnackbarSaved"
        >
          <SnackbarContentWrapper
            onClose={this.handleSnackbarClose}
            variant="success"
            message={successMsg}
          />
        </Snackbar>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={openSnackbarError}
          autoHideDuration={3000}
          onClose={this.handleSnackbarClose}
          id="openSnackbarError"
          name="openSnackbarError"
        >
          <SnackbarContentWrapper
            onClose={this.handleSnackbarClose}
            variant="error"
            message={sectionError}
          />
        </Snackbar>
      </div>
    );
  }
}

MentorsHome.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MentorsHome);

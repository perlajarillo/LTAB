import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "../SnackbarContentComponent/SnackbarContentComponent";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import * as R from "ramda";
import { getMentee, editMentee } from "../../firebase/operations";
import { auth } from "../../firebase";
import FormHelperText from "@material-ui/core/FormHelperText";
import { validateString } from "../validity";

const styles = theme => ({
  formControl: {
    width: 550,
    [theme.breakpoints.up("xs")]: {
      width: "auto"
    },
    [theme.breakpoints.up("sm")]: {
      width: 900
    },
    [theme.breakpoints.up("md")]: {
      width: 910
    },

    [theme.breakpoints.between("sm", "md")]: {
      width: 550
    }
  },

  card: {
    width: "500px",
    paddingBottom: "1%",
    [theme.breakpoints.up("xs")]: {
      width: "auto"
    },
    [theme.breakpoints.up("sm")]: {
      width: "250px"
    },
    [theme.breakpoints.up("md")]: {
      width: "980px"
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "620px"
    }
  }
});

class EditMentee extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: "",
      error: "",
      descendent: "",
      openSnackbarError: false,
      openSnackbarSaved: false,
      nameError: "",
      descendentError: "",
      locationError: "",
      location: ""
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

  /**
   * checkForNull - sets an error if the field is null
   * @returns {void}
   */
  checkForNull = event => {
    const name = event.target.name;
    const formControl = name + "Error";
    const value = event.target.value;
    this.setState({
      [formControl]: validateString(name, value)
    });
  };

  /**
   * getFirebasePayload - returns the data to send to Firebase
   * @returns {Object} the Firebase payload
   */
  getFirebasePayload() {
    return R.pick(["name", "email", "descendent", "location"], this.state);
  }

  /**
   * allRequiredDataProvided - returns true when all required data have been provided
   * or false when some data is missing.
   * @returns {Object} the Firebase payload
   */
  allRequiredDataProvided = () => {
    const { descendent, location } = this.state;
    const fieldsAreRequired = descendent === "" || location === "";
    if (fieldsAreRequired) {
      this.setState({
        error: "All fields are required",
        openSnackbarError: true
      });
      return false;
    }
    return true;
  };

  /**
   * handleSubmit - review if all required data has been provided and then create
   * an account with the email and password.
   * @param {Object} e the event object
   * @param {Object} reason for closing the snackbar
   * @return {void}
   */
  handleSubmit = e => {
    e.preventDefault();

    if (this.allRequiredDataProvided()) {
      editMentee(this.getFirebasePayload(), auth.currentUserUid())
        .then(() => {
          this.setState({
            openSnackbarSaved: true,
            sectionError: ""
          });
        })
        .catch(error => {
          this.setState({
            error: error.message,
            openSnackbarError: true
          });
        });
    }
  };
  /**
   * areThereParameters – sets the state with the parameters sent via url
   * @returns {void}
   *
   */
  getMenteeData = () => {
    getMentee(auth.currentUserUid())
      .then(mentee => {
        this.setState({
          name: mentee.val().name,
          email: mentee.val().email,
          descendent: mentee.val().descendent,
          location: mentee.val().location
        });
      })
      .catch();
  };
  /**
   * componentDidMount – sets in the state data to edit
   * @returns {void}
   */
  componentDidMount = () => {
    this.unregisterObserver = this.getMenteeData();
  };

  /**
   * componentWillUnmount – clean the functions loaded in componentDidMount in
   * order to avoid leaks of memory.
   * @returns {void}
   */
  componentWillUnmount() {
    this.unregisterObserver = null;
  }

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

  render() {
    const { classes } = this.props;
    const {
      name,
      location,
      error,
      descendent,
      openSnackbarError,
      nameError,
      descendentError,
      locationError,
      openSnackbarSaved
    } = this.state;

    return (
      <div className={classes.wrapper}>
        <Card className={classes.card}>
          <form onSubmit={this.handleSubmit}>
            <CardContent>
              <div>
                <FormControl required className={classes.formControl}>
                  <TextField
                    id="name"
                    name="name"
                    label="Name:"
                    placeholder="Your name"
                    value={name}
                    className={classes.textField}
                    margin="normal"
                    onChange={this.handleChange}
                    onBlur={this.checkForNull}
                    required
                  />
                  <FormHelperText error={true}>{nameError}</FormHelperText>
                </FormControl>
              </div>
              <div>
                <FormControl required className={classes.formControl}>
                  <TextField
                    id="location"
                    name="location"
                    label="Location:"
                    placeholder="Where are you living?"
                    value={location}
                    className={classes.textField}
                    margin="normal"
                    onChange={this.handleChange}
                    onBlur={this.checkForNull}
                    required
                  />
                  <FormHelperText error={true}>{locationError}</FormHelperText>
                </FormControl>
              </div>

              <div>
                <FormControl required className={classes.formControl}>
                  <Select
                    value={descendent}
                    onChange={this.handleChange}
                    name="descendent"
                    displayEmpty
                    className={classes.selectEmpty}
                    onBlur={this.checkForNull}
                    required
                  >
                    <MenuItem value="" disabled>
                      Descendent
                    </MenuItem>
                    <MenuItem value={"Portuguese"}>Portuguese</MenuItem>
                    <MenuItem value={"Portuguese descendent"}>
                      Portuguese descendent
                    </MenuItem>
                    <MenuItem value={"American"}>American</MenuItem>
                  </Select>
                  <FormHelperText error={true}>
                    {descendentError}
                  </FormHelperText>
                </FormControl>
              </div>
              <div>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  fullWidth
                >
                  Save changes
                </Button>
              </div>
            </CardContent>
          </form>
        </Card>
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
            message={error}
          />
        </Snackbar>
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
            message="Your changes have been saved!"
          />
        </Snackbar>
      </div>
    );
  }
}

EditMentee.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditMentee);

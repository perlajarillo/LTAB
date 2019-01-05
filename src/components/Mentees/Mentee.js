import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "../SnackbarContentComponent/SnackbarContentComponent";
import { Redirect } from "react-router-dom";
import * as R from "ramda";
import { editMentee, deleteMentee } from "../../firebase/operations";
import { adminApp } from "../../firebase/firebase.js";
import { validateString } from "../validity";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    margin: "80px 0",
    minHeight: "80vh",
    [theme.breakpoints.up("sm")]: {
      margin: "90px 24px"
    },
    alignItems: "center",
    justifyContent: "center",
    display: "flex"
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: theme.spacing.unit * 2
  },
  dpMargin: {
    marginTop: theme.spacing.unit * 6,
    marginRight: theme.spacing.unit * 3
  },
  sectionMargin: {
    marginTop: theme.spacing.unit * 6
  },
  slider: {
    maxWidth: 400,
    margin: "24px 0"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
    [theme.breakpoints.between("sm", "md")]: {
      width: 550,
      marginRight: "20%"
    }
  },
  formControl: {
    margin: "24px 0",
    minWidth: 250,
    [theme.breakpoints.up("sm")]: {
      width: 550
    }
  },

  button: {
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  },
  buttons: {
    marginTop: theme.spacing.unit * 6
  },
  paperPadding: {
    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 2
  },
  notesLegendStyle: {
    marginRight: "40%",
    width: "60%",
    [theme.breakpoints.down("md")]: {
      marginRight: "0%",
      width: "100%"
    },
    [theme.breakpoints.between("sm", "md")]: {
      marginRight: "10%"
    }
  },
  picture: {
    width: 200,
    height: 200
  },
  card: {
    paddingBottom: "1%",

    [theme.breakpoints.up("xs")]: {
      marginTop: "0px"
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: "5px",
      width: 600
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "20px"
    },

    [theme.breakpoints.between("sm", "md")]: {
      marginTop: "15px"
    }
  }
});

class Mentee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameError: "",
      location: "",
      locationError: "",
      descendent: "",
      openSnackbarSaved: false,
      openSnackbarError: false,
      descendentError: "",
      returnMentee: false,
      open: false,
      openSnackbarDeleted: false
    };
  }

  /**
   * componentDidMount – sets in the state data to edit
   * @returns {void}
   */
  componentDidMount = () => {
    this.authUser = this.props.location.state.authUser;
    if (this.props.location.state.mentee) {
      const { mentee } = this.props.location.state;
      this.dataToEdit(mentee);
    }
  };

  /**
   * dataToEdit – sets the state with the parameters sent via url
   * @returns {void}
   *
   */
  dataToEdit = mentee => {
    const { key } = this.props.location.state;
    this.setState({
      name: mentee.name,
      location: mentee.location,
      descendent: mentee.descendent,
      email: mentee.email,
      key: key
    });
  };

  /**
   * checkForErrors - sets an error if the section if there are required fields
   * without a value
   * @returns {void}
   */
  checkForErrors = () => {
    let response = false;
    const {
      nameError,
      locationError,
      descendentError,
      location,
      name
    } = this.state;
    const errorMessages = nameError || locationError || descendentError;
    const values = location === "" || name === "";
    if (errorMessages || values) {
      this.setState({
        openSnackbarError: true,
        sectionError: "The fields with * are required"
      });
      response = true;
    }
    return response;
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
   * handleChange – the handleChange sets the value selected in a select list
   * or a multiline text
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
   * getFirebasePayload - returns the data to send to Firebase
   * @returns {Object} the Firebase payload
   */
  getFirebasePayload() {
    return R.pick(["name", "location", "descendent", "email"], this.state);
  }

  /**
   * handleSubmit - sends Firebase payload
   * @returns {void}
   */
  handleSubmit = e => {
    e.preventDefault();
    const key = this.state.key;
    if (!this.checkForErrors()) {
      editMentee(this.getFirebasePayload(), key).then(
        this.setState({
          openSnackbarSaved: true,
          successMsg: "Mentee's information has been modified",
          sectionError: ""
        })
      );
    }
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
          returnMentee: true
        })
      : this.state.openSnackbarDeleted
      ? this.setState({
          openSnackbarDeleted: false,
          returnMentee: true
        })
      : this.setState({ openSnackbarError: false });
  };

  /**
   * handleDeleteMentee - sets the actions when an intent to delete a mentee
   * is happening
   * @param {void} event the event object
   * @return {void}
   */
  handleDeleteMentee = () => {
    const { key } = this.state;
    deleteMentee(key)
      .then(this.setState({ openSnackbarDeleted: true, open: false }))
      .catch(error => {
        this.setState({
          openSnackbarError: false,
          sectionError: "Error deleting the user:" + error,
          open: false
        });
      });
  };

  /**
   * handleClickDeleteMentee - sets the attribute open to true to display a
   * dialog box
   * @param {void} event the event object
   * @return {void}
   */
  handleClickDeleteMentee = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    const {
      name,
      location,
      descendent,
      openSnackbarSaved,
      openSnackbarError,
      sectionError,
      returnMentee,
      nameError,
      locationError,
      descendentError,
      open,
      key,
      openSnackbarDeleted
    } = this.state;

    return (
      <div className={classes.root}>
        {returnMentee && (
          <Redirect
            to={{
              pathname: "/mentees",
              state: { from: this.props.location }
            }}
          />
        )}
        <Card className={classes.card}>
          <form onSubmit={this.handleSubmit}>
            <CardContent>
              <div className={classes.sectionMargin}>
                <Typography variant="h6" color="primary">
                  Mentee's information
                </Typography>
              </div>
              <div>
                <FormControl required className={classes.formControl}>
                  <TextField
                    id="name"
                    name="name"
                    label="Name"
                    value={name}
                    onChange={this.handleChange}
                    className={classes.textField}
                    onBlur={this.checkForNull}
                    margin="normal"
                    required
                  />
                  <FormHelperText error={true}>{nameError}</FormHelperText>
                </FormControl>
              </div>
              <div>
                <div>
                  <FormControl required className={classes.formControl}>
                    <TextField
                      id="location"
                      name="location"
                      label="Location"
                      placeholder="e.g. New Bedford"
                      value={location}
                      onBlur={this.checkForNull}
                      onChange={this.handleChange}
                      className={classes.textField}
                      margin="normal"
                      required
                    />
                  </FormControl>
                  <FormHelperText error={true}>{locationError}</FormHelperText>
                </div>
                <div>
                  <FormHelperText>Descendent * </FormHelperText>

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

                <div className={classes.buttons}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.button}
                  >
                    Save changes
                  </Button>
                  <Button
                    variant="contained"
                    color="default"
                    component={Link}
                    to={{
                      pathname: "/mentees"
                    }}
                    className={classes.button}
                  >
                    Return to Mentees
                  </Button>
                  {key && (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={this.handleClickDeleteMentee}
                      className={classes.button}
                    >
                      <DeleteIcon /> Delete
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </form>
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
            message="Mentee's information saved!"
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
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={openSnackbarDeleted}
          autoHideDuration={3000}
          onClose={this.handleSnackbarClose}
          id="openSnackbarDeleted"
          name="openSnackbarDeleted"
        >
          <SnackbarContentWrapper
            onClose={this.handleSnackbarClose}
            variant="warning"
            message="Mentee deleted"
          />
        </Snackbar>

        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete mentee?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this mentee?
              <Typography variant="caption">
                Please report to the app{" "}
                <a href="mailto:perlai.jarillo@gmail.com">administrator</a>{" "}
                after deleting.
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDeleteMentee} color="primary">
              Yes
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Mentee.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Mentee);

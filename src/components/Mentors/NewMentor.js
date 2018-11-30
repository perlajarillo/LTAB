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
import PhotoIcon from "../../images/baseline_photo.png";
import Grid from "@material-ui/core/Grid";
import * as R from "ramda";
import {
  writeNewMentor,
  getImage,
  editMentor
} from "../../firebase/operations";
import { validateString } from "../validity";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { auth } from "../../firebase";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    margin: "90px 0",
    minHeight: "80vh",
    [theme.breakpoints.up("sm")]: {
      margin: "120px 24px"
    }
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: theme.spacing.unit * 1
  },
  dpMargin: {
    marginTop: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 3
  },
  sectionMargin: {
    [theme.breakpoints.up("xs")]: {
      marginTop: theme.spacing.unit * 0
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing.unit * 0
    },
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing.unit * 2
    },

    [theme.breakpoints.between("sm", "md")]: {
      marginTop: theme.spacing.unit * 2
    }
  },
  slider: {
    maxWidth: 400,
    margin: "24px 0"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
    [theme.breakpoints.between("sm", "md")]: {
      marginRight: "20%"
    }
  },
  formControl: {
    margin: "20px 0",
    [theme.breakpoints.up("xs")]: {
      margin: "5px 0"
    },
    [theme.breakpoints.up("sm")]: {
      margin: "15px 0"
    },
    [theme.breakpoints.up("md")]: {
      margin: "20px 0"
    },

    [theme.breakpoints.between("sm", "md")]: {
      margin: "10px 0"
    }
  },
  textField: {
    [theme.breakpoints.up("xs")]: {
      width: 250
    },
    [theme.breakpoints.up("sm")]: {
      width: 400
    },
    [theme.breakpoints.up("md")]: {
      width: 450
    },

    [theme.breakpoints.between("sm", "md")]: {
      width: 250
    },
    [theme.breakpoints.only("lg")]: {
      width: 400
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
    [theme.breakpoints.up("xs")]: {
      width: 180,
      height: 210
    },
    [theme.breakpoints.up("sm")]: {
      width: 280,
      height: 330
    },
    [theme.breakpoints.up("md")]: {
      width: 250,
      height: 280
    },

    [theme.breakpoints.between("sm", "md")]: {
      width: 200,
      height: 240
    }
  },
  card: {
    paddingBottom: "1%",

    [theme.breakpoints.up("xs")]: {
      marginTop: "0px"
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: "5px"
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "20px"
    },

    [theme.breakpoints.between("sm", "md")]: {
      marginTop: "15px"
    }
  }
});

class NewMentor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameError: "",
      specialty: "",
      specialtyError: "",
      email: "",
      mailError: "",
      phone: "",
      location: "",
      locationError: "",
      linkedin: "",
      twitter: "",
      facebook: "",
      description: "",
      descriptionError: "",
      btnText: "Create account",
      openSnackbarSaved: false,
      openSnackbarError: false,
      sectionError: "",
      picture: PhotoIcon,
      picturePath: "",
      pictureBlob: "",
      returnMentor: false,
      available: false,
      pictureName: "NA",
      chkDisclaimer: false,
      password: "",
      repeatPassword: "",
      passwordError: "",
      repeatPasswordError: ""
    };
  }

  /**
   * componentDidMount – sets in the state data to edit
   * @returns {void}
   */
  componentDidMount = () => {
    if (this.props.location.state) {
      this.authUser = this.props.location.state.authUser;
      if (this.props.location.state.mentor) {
        const { mentor } = this.props.location.state;
        this.dataToEdit(mentor);
      }
    }
  };

  /**
   * areThereParameters – sets the state with the parameters sent via url
   * @returns {void}
   *
   */
  dataToEdit = mentor => {
    const { key } = this.props.location.state;
    getImage(key, mentor.pictureName)
      .then(url => {
        this.setState({
          picture: url
        });
      })
      .catch(error => {
        this.setState({
          openSnackbarError: true,
          sectionError: "There is not picture for this mentor."
        });
      });
    this.setState({
      name: mentor.name,
      specialty: mentor.specialty,
      email: mentor.email,
      phone: mentor.phone,
      location: mentor.location,
      linkedin: mentor.linkedin,
      twitter: mentor.twitter,
      facebook: mentor.facebook,
      description: mentor.description,
      btnText: "Save changes",
      key: key,
      pictureName: mentor.pictureName,
      available: mentor.available
    });
  };

  /**
   * checkForErrors - sets an error if the section if there are required fields
   * without a value
   * @returns {void}
   */
  checkForErrors = () => {
    let response = false;
    const errorMessages =
      this.state.nameError ||
      this.state.mailError ||
      this.state.locationError ||
      this.state.descriptionError ||
      this.state.specialtyError;
    if (errorMessages) {
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
    const valueUpperCase = value.toUpperCase();

    const mustBeUCase =
      name === "specialty" || name === "name" || name === "location";
    this.setState({
      [name]: mustBeUCase ? valueUpperCase : value
    });
  };

  /**
   * handleChangeCheck – the handleChangeCheck sets the value of mentor's availability
   * @param {Object} the object name and event
   * @return {void}
   */
  handleChangeCheck = event => {
    const { target } = event;
    this.setState({
      available: target.checked
    });
  };

  /**
   * handleDisclamerChange – sets true or false on chkDisclaimer state
   * @param {Object} the object name and event
   * @return {void}
   */
  handleDisclamerChange = () => {
    this.setState({
      chkDisclaimer: !this.state.chkDisclaimer
    });
  };
  /**
   * handlePicture - returns the data to send to Firebase
   * @returns {Object} the Firebase payload
   */
  handlePicture = event => {
    const currentFile = new Blob(event.target.files, { type: "image/png" });
    this.setState({
      picture: window.URL.createObjectURL(currentFile),
      pictureName: event.target.files[0].name,
      pictureBlob: currentFile
    });
  };

  /**
   * getFirebasePayload - returns the data to send to Firebase
   * @returns {Object} the Firebase payload
   */
  getFirebasePayload() {
    return R.pick(
      [
        "name",
        "specialty",
        "email",
        "phone",
        "location",
        "linkedin",
        "twitter",
        "facebook",
        "description",
        "pictureName",
        "available"
      ],
      this.state
    );
  }

  /**
   * handleSubmit - sends Firebase payload
   * @returns {void}
   */
  handleSubmit = () => {
    const { chkDisclaimer, email, password } = this.state;
    const { history } = this.props;
    const key = this.state.key;
    if (!this.checkForErrors()) {
      !key
        ? chkDisclaimer &&
          auth
            .onCreateAccount(email, password)
            .then(authUser => {
              this.setState({
                email: email,
                password: password
              });
              writeNewMentor(
                auth.currentUserUid(),
                this.getFirebasePayload(),
                this.state.pictureBlob
              )
                .then(() => {
                  history.push("/mentorshome");
                })
                .catch(error => {
                  this.setState({
                    error: error.message,
                    openSnackbarError: true
                  });
                });
            })
            .catch(error => {
              this.setState({
                error: error.message,
                openSnackbarError: true
              });
            })
        : editMentor(
            this.getFirebasePayload(),
            key,
            this.state.pictureBlob
          ).then(
            this.setState({
              openSnackbarSaved: true,
              successMsg: "Mentor's information has been modified",
              sectionError: ""
            })
          );
    } else {
      this.setState({
        error: "You must agree with the terms and conditions!",
        openSnackbarError: true
      });
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
          returnMentor: true
        })
      : this.setState({ openSnackbarError: false });
  };

  render() {
    const { classes } = this.props;
    const {
      name,
      specialty,
      email,
      phone,
      location,
      linkedin,
      twitter,
      facebook,
      description,
      btnText,
      openSnackbarSaved,
      openSnackbarError,
      sectionError,
      picture,
      returnMentor,
      nameError,
      specialtyError,
      locationError,
      descriptionError,
      available,
      chkDisclaimer,
      password,
      repeatPassword,
      passwordError,
      repeatPasswordError
    } = this.state;

    return (
      <div className={classes.root}>
        {returnMentor && (
          <Redirect
            to={{
              pathname: "/mentors",
              state: { from: this.props.location }
            }}
          />
        )}
        <Card className={classes.card}>
          <CardContent>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={7} md={7} lg={7}>
                <div className={classes.sectionMargin}>
                  <Typography variant="h6">
                    Fill this form to become a Mentor
                  </Typography>
                </div>
                <div>
                  <img
                    src={picture}
                    alt="mentor photography"
                    className={classes.picture}
                  />

                  <input
                    type="file"
                    id="picture"
                    name="picture"
                    accept=".jpg, .jpeg, .png"
                    onChange={this.handlePicture}
                  />
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
                      required
                    />
                    <FormHelperText error={true}>{nameError}</FormHelperText>
                  </FormControl>
                </div>
                <div>
                  <FormControl required className={classes.formControl}>
                    <TextField
                      id="specialty"
                      name="specialty"
                      label="Specialty"
                      placeholder="e.g. Accountant, Visual Arts, Design, etc."
                      value={specialty}
                      onChange={this.handleChange}
                      onBlur={this.checkForNull}
                      className={classes.textField}
                      required
                    />
                    <FormHelperText error={true}>
                      {specialtyError}
                    </FormHelperText>
                  </FormControl>
                </div>
                <div>
                  <FormControl required className={classes.formControl}>
                    <TextField
                      id="password"
                      name="password"
                      label="Password:"
                      value={password}
                      className={classes.textField}
                      onChange={this.handleChange}
                      type="password"
                      onBlur={this.checkForNull}
                      required
                    />
                    <FormHelperText error={true}>
                      {passwordError}
                    </FormHelperText>
                  </FormControl>
                </div>
                <div>
                  <FormControl required className={classes.formControl}>
                    <TextField
                      id="repeatPassword"
                      name="repeatPassword"
                      label="Repeat password:"
                      value={repeatPassword}
                      className={classes.textField}
                      type="password"
                      onChange={this.handleChange}
                      onBlur={this.checkForNull}
                      required
                    />
                    <FormHelperText error={true}>
                      {repeatPasswordError}
                    </FormHelperText>
                  </FormControl>
                </div>

                <div>
                  <FormControl required className={classes.formControl}>
                    <TextField
                      id="description"
                      name="description"
                      label="Description"
                      placeholder="Professional abstract"
                      multiline
                      rowsMax="15"
                      rows="7"
                      value={description}
                      onBlur={this.checkForNull}
                      onChange={this.handleChange}
                      className={classes.textField}
                      required
                    />
                  </FormControl>
                  <FormHelperText error={true}>
                    {descriptionError}
                  </FormHelperText>
                </div>
              </Grid>
              <Grid item xs={12} sm={5} md={5} lg={5}>
                <div>
                  <FormControl required className={classes.formControl}>
                    <TextField
                      id="location"
                      name="location"
                      label=" Location"
                      placeholder="Physical location (e.g. New England)"
                      value={location}
                      onBlur={this.checkForNull}
                      onChange={this.handleChange}
                      className={classes.textField}
                      required
                    />
                  </FormControl>
                  <FormHelperText error={true}>{locationError}</FormHelperText>
                </div>
                <div>
                  <FormControl required className={classes.formControl}>
                    <TextField
                      id="email"
                      name="email"
                      label="E-mail"
                      type="email"
                      value={email}
                      onChange={this.handleChange}
                      className={classes.textField}
                    />
                  </FormControl>
                </div>
                <div>
                  <FormControl required className={classes.formControl}>
                    <TextField
                      id="phone"
                      name="phone"
                      label="Phone"
                      value={phone}
                      onChange={this.handleChange}
                      className={classes.textField}
                    />
                  </FormControl>
                </div>
                <div>
                  <FormControl required className={classes.formControl}>
                    <TextField
                      id="linkedin"
                      name="linkedin"
                      label="LinkedIn"
                      value={linkedin}
                      onChange={this.handleChange}
                      className={classes.textField}
                    />
                  </FormControl>
                </div>
                <div>
                  <FormControl required className={classes.formControl}>
                    <TextField
                      id="twitter"
                      name="twitter"
                      label="Twitter"
                      value={twitter}
                      onChange={this.handleChange}
                      className={classes.textField}
                    />
                  </FormControl>
                </div>
                <div>
                  <FormControl required className={classes.formControl}>
                    <TextField
                      id="facebook"
                      name="facebook"
                      label="Facebook"
                      value={facebook}
                      onChange={this.handleChange}
                      className={classes.textField}
                    />
                  </FormControl>
                </div>
                <div>
                  <FormControl className={classes.formControl}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={available}
                          onChange={this.handleChangeCheck}
                          color="primary"
                          value="available"
                        />
                      }
                      label="Are you available to start mentoring?"
                    />
                  </FormControl>
                </div>
                <div>
                  <Typography className={classes.text} variant="subtitle1">
                    Please read and agree with the{" "}
                    <a href="/termsandconditions" target="_blank">
                      terms and conditions{" "}
                    </a>{" "}
                    in order to continue.
                  </Typography>

                  <Typography className={classes.text} variant="body1">
                    <Checkbox
                      name="chkDisclaimer"
                      checked={chkDisclaimer}
                      onChange={this.handleDisclamerChange}
                      required
                    />
                    I have read terms and conditions and I agree with them.
                  </Typography>
                </div>
                <div className={classes.buttons}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleSubmit}
                    className={classes.button}
                  >
                    {btnText}
                  </Button>
                  {this.authUser && this.authUser.admin && (
                    <Button
                      variant="contained"
                      color="secondary"
                      component={Link}
                      to={{
                        pathname: "/mentors"
                      }}
                      className={classes.button}
                    >
                      Return to Mentors
                    </Button>
                  )}
                </div>
              </Grid>
            </Grid>
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
            message="Entry saved!"
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

NewMentor.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NewMentor);

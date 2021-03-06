import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "../SnackbarContentComponent/SnackbarContentComponent";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import b_business from "../../images/b_business.jpg";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import * as R from "ramda";
import { writeNewMentee } from "../../firebase/operations";
import { auth } from "../../firebase";
import FormHelperText from "@material-ui/core/FormHelperText";
import { validateString } from "../validity";
import listsData from "../Mentors/Literals/listsData";

const styles = theme => ({
  wrapper: {
    marginTop: "6rem",
    [theme.breakpoints.up("md")]: {
      marginTop: "9rem"
    }
  },

  formControl: {
    margin: "24px 0",
    width: 550,
    [theme.breakpoints.up("xs")]: {
      width: 300
    },
    [theme.breakpoints.up("sm")]: {
      width: 900
    },

    [theme.breakpoints.between("sm", "md")]: {
      width: 550
    }
  },

  text: {
    padding: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
  },
  card: {
    width: "500px",
    margin: "30px auto",
    paddingBottom: "1%",
    [theme.breakpoints.up("xs")]: {
      width: "330px"
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
  },
  cardTitle: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around"
  },
  iconBusiness: {
    width: "100px"
  },
  pos: {
    marginBottom: 24
  }
});

const { specialties } = listsData;

class NewMentee extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
      descendent: "",
      openSnackbarError: false,
      chkDisclaimer: false,
      repeatPassword: "",
      nameError: "",
      emailError: "",
      passwordError: "",
      repeatPasswordError: "",
      descendentError: "",
      locationError: "",
      location: "",
      menteeNeeds: "",
      field: ""
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
   * handleChangeCheck – sets true or false on chkDisclaimer state
   * @param {Object} the object name and event
   * @return {void}
   */
  handleChangeCheck = () => {
    this.setState({
      chkDisclaimer: !this.state.chkDisclaimer
    });
  };

  /**
   * getFirebasePayload - returns the data to send to Firebase
   * @returns {Object} the Firebase payload
   */
  getFirebasePayload() {
    return R.pick(
      ["name", "email", "descendent", "location", "menteeNeeds", "field"],
      this.state
    );
  }

  /**
   * allRequiredDataProvided - returns true when all required data have been provided
   * or false when some data is missing.
   * @returns {Object} the Firebase payload
   */
  allRequiredDataProvided = () => {
    const {
      email,
      password,
      repeatPassword,
      descendent,
      location
    } = this.state;
    const fieldsAreRequired =
      email === "" ||
      password === "" ||
      repeatPassword === "" ||
      descendent === "" ||
      location === "";
    if (fieldsAreRequired) {
      this.setState({
        error: "All fields are required",
        openSnackbarError: true
      });
      return false;
    }

    if (password !== repeatPassword) {
      this.setState({
        error: "The passwords must be equal",
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
    const { chkDisclaimer, email, password } = this.state;
    const { history } = this.props;

    if (this.allRequiredDataProvided()) {
      if (chkDisclaimer) {
        auth
          .onCreateAccount(email, password)
          .then(authUser => {
            auth.onSendEmail();
            this.setState({
              email: email,
              password: password
            });
            writeNewMentee(auth.currentUserUid(), this.getFirebasePayload());
            history.push("/availablementors");
          })
          .catch(error => {
            this.setState({
              error: error.message,
              openSnackbarError: true
            });
          });
      } else {
        this.setState({
          error: "You must agree with the terms and conditions!",
          openSnackbarError: true
        });
      }
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

    this.setState({ openSnackbarError: false });
  };

  render() {
    const { classes } = this.props;
    const {
      name,
      email,
      location,
      password,
      repeatPassword,
      error,
      descendent,
      openSnackbarError,
      chkDisclaimer,
      nameError,
      emailError,
      passwordError,
      repeatPasswordError,
      descendentError,
      locationError,
      menteeNeeds,
      field
    } = this.state;

    return (
      <div className={classes.wrapper}>
        <Card className={classes.card}>
          <form onSubmit={this.handleSubmit}>
            <CardContent>
              <div className={classes.cardTitle}>
                <Typography variant="h6" color="primary">
                  Fill this form to become a mentee{" "}
                </Typography>
                <img
                  src={b_business}
                  alt="Register to look for a mentor"
                  className={classes.iconBusiness}
                />
              </div>
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
                    id="email"
                    name="email"
                    label="E-mail:"
                    value={email}
                    placeholder="your@email.com"
                    className={classes.textField}
                    margin="normal"
                    onChange={this.handleChange}
                    onBlur={this.checkForNull}
                    required
                  />
                  <FormHelperText error={true}>{emailError}</FormHelperText>
                </FormControl>
              </div>
              <div>
                <FormControl required className={classes.formControl}>
                  <TextField
                    id="location"
                    name="location"
                    label="Location:"
                    placeholder="State, city, country you live in"
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
                  <TextField
                    id="password"
                    name="password"
                    label="Password:"
                    placeholder="More than 6 characters"
                    value={password}
                    className={classes.textField}
                    onChange={this.handleChange}
                    type="password"
                    margin="normal"
                    onBlur={this.checkForNull}
                    required
                  />
                  <FormHelperText error={true}>{passwordError}</FormHelperText>
                </FormControl>
              </div>
              <div>
                <FormControl required className={classes.formControl}>
                  <TextField
                    id="repeatPassword"
                    name="repeatPassword"
                    label="Repeat password:"
                    placeholder="Repeat the password"
                    value={repeatPassword}
                    className={classes.textField}
                    type="password"
                    onChange={this.handleChange}
                    onBlur={this.checkForNull}
                    margin="normal"
                    required
                  />
                  <FormHelperText error={true}>
                    {repeatPasswordError}
                  </FormHelperText>
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
                <FormHelperText>
                  What is your field of interest?{" "}
                </FormHelperText>
                <FormControl required className={classes.formControl}>
                  <Select
                    value={field}
                    label="Field"
                    onChange={this.handleChange}
                    onBlur={this.checkForNull}
                    name="field"
                    id="field"
                    displayEmpty
                    className={classes.textField}
                  >
                    <MenuItem value="" disabled>
                      Select the field
                    </MenuItem>
                    {specialties.map(specialty => (
                      <MenuItem key={specialty} value={specialty}>
                        {specialty}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div>
                <Typography variant="body1" gutterBottom>
                  Please describe what kind of tutoring are you looking for
                </Typography>

                <br />
                <FormControl required className={classes.formControl}>
                  <TextField
                    id="menteeNeeds"
                    name="menteeNeeds"
                    multiline
                    rows="5"
                    label="max. 200 characters"
                    value={menteeNeeds}
                    onChange={this.handleChange}
                    className={classes.textField}
                    inputProps={{ maxLength: 200 }}
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
                    onChange={this.handleChangeCheck}
                    required
                  />
                  I have read terms and conditions and I agree with them.
                </Typography>
              </div>
              <div>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  fullWidth
                >
                  Sign up
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
      </div>
    );
  }
}

NewMentee.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NewMentee);

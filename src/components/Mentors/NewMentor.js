import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
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

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    margin: "120px 0",
    minHeight: "80vh",
    [theme.breakpoints.up("sm")]: {
      margin: "120px 24px"
    }
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: theme.spacing.unit * 3
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
      marginRight: "20%"
    }
  },
  formControl: {
    margin: "24px 0",
    minWidth: 250,
    [theme.breakpoints.up("sm")]: {
      width: 400
    }
  },
  textField: {
    minWidth: 400,
    padding: "10px",
    [theme.breakpoints.down("md")]: {
      minWidth: 330
    },
    [theme.breakpoints.between("sm", "md")]: {
      minWidth: 340
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
    width: 280,
    height: 330
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
      mail: "",
      mailError: "",
      phone: "",
      location: "",
      locationError: "",
      linkedin: "",
      twitter: "",
      facebook: "",
      description: "",
      descriptionError: "",
      btnText: "Save",
      openSnackbarSaved: false,
      openSnackbarError: false,
      sectionError: "",
      picture: PhotoIcon,
      picturePath: "",
      pictureBlob: "",
      returnMentor: false,
      available: false
    };
  }

  /**
   * componentDidMount – sets in the state data to edit
   * @returns {void}
   */
  componentDidMount = () => {
    this.authUser = this.props.location.state.authUser;
    if (this.props.location.state.mentor) {
      const { mentor } = this.props.location.state;
      this.dataToEdit(mentor);
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
      mail: mentor.mail,
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
    //const value = this.state[name];
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
   * handleChange – the handleChange sets the value selected in a select list
   * or a multiline text
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
        "mail",
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
    const key = this.state.key;
    if (!this.checkForErrors()) {
      !key
        ? writeNewMentor(
            this.getFirebasePayload(),
            this.state.pictureBlob
          ).then(
            this.setState({
              openSnackbarSaved: true,
              sectionError: "",
              successMsg: "Mentor's information has been saved"
            })
          )
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
      mail,
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
      mailError,
      locationError,
      descriptionError,
      available
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
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <div className={classes.sectionMargin}>
              <Typography variant="h6">Mentor's information</Typography>
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
                  multiline
                  rowsMax="7"
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
              <FormControl required className={classes.formControl}>
                <TextField
                  id="specialty"
                  name="specialty"
                  label="Specialty"
                  multiline
                  rowsMax="7"
                  value={specialty}
                  onChange={this.handleChange}
                  onBlur={this.checkForNull}
                  className={classes.textField}
                  margin="normal"
                  required
                />
                <FormHelperText error={true}>{specialtyError}</FormHelperText>
              </FormControl>
            </div>
            <div>
              <FormControl required className={classes.formControl}>
                <TextField
                  id="description"
                  name="description"
                  label="Description"
                  multiline
                  rowsMax="15"
                  value={description}
                  onBlur={this.checkForNull}
                  onChange={this.handleChange}
                  className={classes.textField}
                  margin="normal"
                  required
                />
              </FormControl>
              <FormHelperText error={true}>{descriptionError}</FormHelperText>
            </div>
            <div>
              <FormControl required className={classes.formControl}>
                <TextField
                  id="location"
                  name="location"
                  label=" Location"
                  multiline
                  rowsMax="7"
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
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <div>
              <FormControl required className={classes.formControl}>
                <TextField
                  id="mail"
                  name="mail"
                  label="Mail"
                  type="email"
                  multiline
                  rowsMax="7"
                  value={mail}
                  onBlur={this.checkForNull}
                  onChange={this.handleChange}
                  className={classes.textField}
                  margin="normal"
                  required
                />
              </FormControl>
              <FormHelperText error={true}>{mailError}</FormHelperText>
            </div>
            <div>
              <FormControl required className={classes.formControl}>
                <TextField
                  id="phone"
                  name="phone"
                  label="Phone"
                  multiline
                  rowsMax="7"
                  value={phone}
                  onChange={this.handleChange}
                  className={classes.textField}
                  margin="normal"
                />
              </FormControl>
            </div>
            <div>
              <FormControl required className={classes.formControl}>
                <TextField
                  id="linkedin"
                  name="linkedin"
                  label="Linkedin"
                  multiline
                  rowsMax="7"
                  value={linkedin}
                  onChange={this.handleChange}
                  className={classes.textField}
                  margin="normal"
                />
              </FormControl>
            </div>
            <div>
              <FormControl required className={classes.formControl}>
                <TextField
                  id="twitter"
                  name="twitter"
                  label="Twitter"
                  multiline
                  rowsMax="7"
                  value={twitter}
                  onChange={this.handleChange}
                  className={classes.textField}
                  margin="normal"
                />
              </FormControl>
            </div>
            <div>
              <FormControl required className={classes.formControl}>
                <TextField
                  id="facebook"
                  name="facebook"
                  label="Facebook"
                  multiline
                  rowsMax="7"
                  value={facebook}
                  onChange={this.handleChange}
                  className={classes.textField}
                  margin="normal"
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
                  label="Available"
                />
              </FormControl>
            </div>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.handleSubmit()}
                className={classes.button}
              >
                {btnText}
              </Button>
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
            </div>
          </Grid>
        </Grid>

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

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "../SnackbarContentComponent/SnackbarContentComponent";
import PhotoIcon from "../../images/baseline_photo.png";
import Grid from "@material-ui/core/Grid";
import * as R from "ramda";
import { getMentor, editMentor } from "../../firebase/operations";
import { validateString } from "../validity";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { auth } from "../../firebase";
import listsData from "./Literals/listsData";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 1
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
      width: 200
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

  picture: {
    width: 200,
    height: 200
  }
});

const { states, specialties } = listsData;
class EditMentor extends Component {
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
      btnText: "Create account",
      openSnackbarSaved: false,
      openSnackbarError: false,
      sectionError: "",
      picturePath: "",
      pictureBlob: "",
      returnMentor: false,
      available: false,
      pictureName: PhotoIcon,
      imageError: "",
      mentorState: "Let's talk about business",
      stateCode: ""
    };
  }

  /**
   * allRequiredDataProvided - sets an error if the section if there are required fields
   * without a value
   * @returns {void}
   */
  allRequiredDataProvided = () => {
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
      return false;
    }

    return true;
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
   * handlePicture - returns the data to send to Firebase
   * @returns {Object} the Firebase payload
   */
  handlePicture = event => {
    const currentFile = new Blob(event.target.files, { type: "image/png" });
    const size = event.target.files[0].size / 1024 / 1024;
    size <= 5
      ? this.setState({
          pictureName: window.URL.createObjectURL(currentFile),
          pictureBlob: currentFile,
          imageError: ""
        })
      : this.setState({
          sectionError: "The size of the image must be inferior to 5 MB.",
          imageError:
            "The size of the image must be inferior to 5 MB. This image will not be save, choose another.",
          openSnackbarError: true
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
        "stateCode",
        "location",
        "linkedin",
        "twitter",
        "facebook",
        "description",
        "pictureName",
        "available",
        "mentorState"
      ],
      this.state
    );
  }

  /**
   * handleSubmit - sends Firebase payload
   * @returns {void}
   */
  handleSubmit = e => {
    e.preventDefault();

    if (this.allRequiredDataProvided()) {
      editMentor(
        this.getFirebasePayload(),
        auth.currentUserUid(),
        this.state.pictureBlob
      )
        .then(() => {
          this.setState({
            openSnackbarSaved: true,
            sectionError: ""
          });
        })
        .catch(error => {
          this.setState({
            sectionError: error.message,
            openSnackbarError: true
          });
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

  /**
   * getMentorData – sets the state with the parameters of the current mentor
   * @returns {void}
   *
   */
  getMentorData = () => {
    getMentor(auth.currentUserUid())
      .then(mentor => {
        this.setState({
          name: mentor.val().name,
          specialty: mentor.val().specialty,
          mail: mentor.val().mail,
          phone: mentor.val().phone,
          stateCode: mentor.val().stateCode,
          location: mentor.val().location,
          linkedin: mentor.val().linkedin,
          twitter: mentor.val().twitter,
          facebook: mentor.val().facebook,
          description: mentor.val().description,
          pictureName:
            mentor.val().pictureName === "NA"
              ? PhotoIcon
              : mentor.val().pictureName,
          available: mentor.val().available,
          mentorState: mentor.val().mentorState
        });
      })
      .catch();
  };

  /**
   * componentDidMount – sets in the state data to edit
   * @returns {void}
   */
  componentDidMount = () => {
    this.unregisterObserver = this.getMentorData();
  };

  /**
   * componentWillUnmount – clean the functions loaded in componentDidMount in
   * order to avoid leaks of memory.
   * @returns {void}
   */
  componentWillUnmount() {
    this.unregisterObserver = null;
  }

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
      openSnackbarSaved,
      openSnackbarError,
      sectionError,
      pictureName,
      nameError,
      specialtyError,
      locationError,
      descriptionError,
      available,
      imageError,
      stateCode
    } = this.state;

    return (
      <div className={classes.root}>
        <form onSubmit={this.handleSubmit}>
          <Grid container spacing={8}>
            <Grid item xs={12} sm={7} md={7} lg={7}>
              <div>
                <img
                  src={pictureName}
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
                <FormHelperText error={true}>{imageError}</FormHelperText>
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
                <FormHelperText>Specialty/Industry * </FormHelperText>
                <FormControl required className={classes.formControl}>
                  <Select
                    value={specialty}
                    label="Specialty"
                    onChange={this.handleChange}
                    name="specialty"
                    id="specialty"
                    displayEmpty
                    required
                    className={classes.textField}
                  >
                    <MenuItem value="" disabled>
                      Select the specialty
                    </MenuItem>
                    {specialties.map(specialty => (
                      <MenuItem key={specialty} value={specialty}>
                        {specialty}
                      </MenuItem>
                    ))}
                  </Select>

                  <FormHelperText error={true}>{specialtyError}</FormHelperText>
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
                <FormHelperText error={true}>{descriptionError}</FormHelperText>
              </div>
            </Grid>
            <Grid item xs={12} sm={5} md={5} lg={5}>
              <div>
                <FormControl required className={classes.formControl}>
                  <TextField
                    id="location"
                    name="location"
                    label=" City"
                    placeholder="e.g. New Bedford"
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
                <FormHelperText>State * </FormHelperText>

                <FormControl required className={classes.formControl}>
                  <Select
                    value={stateCode}
                    label="State"
                    onChange={this.handleChange}
                    name="stateCode"
                    id="stateCode"
                    displayEmpty
                    required
                    className={classes.textField}
                  >
                    <MenuItem value="" disabled>
                      Select the state
                    </MenuItem>
                    {states.map(state => (
                      <MenuItem key={state.code} value={state.code}>
                        {state.stateName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div>
                <FormControl required className={classes.formControl}>
                  <TextField
                    id="mail"
                    name="mail"
                    label="E-mail"
                    type="email"
                    placeholder="e.g. your@email.com"
                    value={mail}
                    required
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
                    placeholder="(nnn) nnn-nnnn "
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
                <FormHelperText>
                  e.g. https://www.linkedin.com/in/your-profile
                </FormHelperText>
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
                <FormHelperText>
                  e.g. https://twitter.com/your_user
                </FormHelperText>
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
                <FormHelperText>
                  e.g. https://www.facebook.com/your_profile
                </FormHelperText>
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
                    label="Available for mentoring."
                  />
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
              </div>
            </Grid>
          </Grid>
        </form>
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

EditMentor.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditMentor);

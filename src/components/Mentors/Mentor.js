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
  writeMentorWithoutEmail,
  editMentor,
  deleteMentor
} from "../../firebase/operations";
import { validateString } from "../validity";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

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
      height: 200
    },
    [theme.breakpoints.up("sm")]: {
      width: 260,
      height: 280
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
      available: false,
      pictureName: "NA",
      open: false,
      imageError: "",
      openSnackbarDeleted: false,
      mentorState: "Let's talk about business"
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
      picture: mentor.pictureName === "NA" ? PhotoIcon : mentor.pictureName,
      available: mentor.available,
      mentorState: mentor.mentorState
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
          picture: window.URL.createObjectURL(currentFile),
          pictureName: event.target.files[0].name,
          pictureBlob: currentFile
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
    const key = this.state.key;
    if (!this.checkForErrors()) {
      !key
        ? writeMentorWithoutEmail(
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
      : this.state.openSnackbarDeleted
      ? this.setState({
          openSnackbarDeleted: false,
          returnMentor: true
        })
      : this.setState({ openSnackbarError: false });
  };

  handleDeleteMentor = () => {
    const { key } = this.state;
    deleteMentor(key).then(this.setState({ openSnackbarDeleted: true }));
    this.handleClose();
  };

  handleClickDeleteMentor = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
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
      locationError,
      descriptionError,
      available,
      open,
      imageError,
      key,
      openSnackbarDeleted,
      mentorState
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
          <form onSubmit={this.handleSubmit}>
            <CardContent>
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
                        value={specialty}
                        onChange={this.handleChange}
                        onBlur={this.checkForNull}
                        className={classes.textField}
                        margin="normal"
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
                        id="description"
                        name="description"
                        label="Description"
                        multiline
                        rowsMax="15"
                        rows="10"
                        value={description}
                        onBlur={this.checkForNull}
                        onChange={this.handleChange}
                        className={classes.textField}
                        margin="normal"
                        required
                      />
                    </FormControl>
                    <FormHelperText error={true}>
                      {descriptionError}
                    </FormHelperText>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <div>
                    <FormControl required className={classes.formControl}>
                      <TextField
                        id="location"
                        name="location"
                        label=" Location"
                        value={location}
                        onBlur={this.checkForNull}
                        onChange={this.handleChange}
                        className={classes.textField}
                        margin="normal"
                        required
                      />
                    </FormControl>
                    <FormHelperText error={true}>
                      {locationError}
                    </FormHelperText>
                  </div>
                  <div>
                    <FormControl required className={classes.formControl}>
                      <TextField
                        id="mail"
                        name="mail"
                        label="Mail"
                        type="email"
                        value={mail}
                        onChange={this.handleChange}
                        className={classes.textField}
                        margin="normal"
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
                        value={facebook}
                        onChange={this.handleChange}
                        className={classes.textField}
                        margin="normal"
                      />
                    </FormControl>
                  </div>
                  <div>
                    <FormControl required className={classes.formControl}>
                      <TextField
                        id="mentorState"
                        name="mentorState"
                        multiline
                        rows="8"
                        label="Your message"
                        value={mentorState}
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
                        label="Available"
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
                      {btnText}
                    </Button>
                    <Button
                      variant="contained"
                      color="default"
                      component={Link}
                      to={{
                        pathname: "/mentors"
                      }}
                      className={classes.button}
                    >
                      Return to Mentors
                    </Button>
                    {key && (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={this.handleClickDeleteMentor}
                        className={classes.button}
                      >
                        <DeleteIcon /> Delete
                      </Button>
                    )}
                  </div>
                </Grid>
              </Grid>
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
            message="Mentor deleted"
          />
        </Snackbar>

        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete mentor?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this mentor?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDeleteMentor} color="primary">
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

NewMentor.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NewMentor);

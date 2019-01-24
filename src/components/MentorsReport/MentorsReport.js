import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "../SnackbarContentComponent/SnackbarContentComponent";
import PhotoIcon from "../../images/baseline_photo.png";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import FormHelperText from "@material-ui/core/FormHelperText";
import { getMentees, getMentor, writeReport } from "../../firebase/operations";
import { auth } from "../../firebase";
import ReactToPrint from "react-to-print";
import * as R from "ramda";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    margin: "80px 0",
    minHeight: "80vh",
    [theme.breakpoints.up("sm")]: {
      margin: "90px 24px"
    }
  },
  wrapper: {
    padding: theme.spacing.unit * 3
  },
  sectionMargin: {
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing.unit * 3
    }
  },
  formControl: {
    margin: "24px 0",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "85%"
    },
    [theme.breakpoints.up("md")]: {
      width: "60%"
    }
  },

  button: {
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  },
  buttons: {
    marginTop: theme.spacing.unit * 6
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
  },
  chips: {
    paddingLeft: theme.spacing.unit * 6,
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit / 4
  },
  picture: {
    margin: "1rem 0",
    width: 200,
    height: 200,
    [theme.breakpoints.up("sm")]: {
      margin: 0
    }
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

class ToPrint extends Component {
  render() {
    const {
      classes,
      state,
      handleChange,
      handleSubmit,
      checkForNull
    } = this.props;
    const {
      name,
      specialty,
      location,
      pictureName,
      activitiesDesc,
      stateCode,
      mentees,
      selectedMentees,
      activitiesDescError
    } = state;
    return (
      <form onSubmit={handleSubmit} className={classes.wrapper}>
        <Typography variant="h6" color="primary">
          Mentor's report of activities
        </Typography>
        <br />
        <Grid container>
          <Grid item xs={12} sm={7} md={8} lg={8}>
            <img
              src={pictureName}
              alt="mentor photography"
              className={classes.picture}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="h6">{name}</Typography>
            <Typography>{specialty}</Typography>
            <Typography>
              {location} , {stateCode}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" className={classes.sectionMargin}>
          Describe the activities you completed as a mentor in the FLAD
          Mentorship program.
        </Typography>
        <FormControl required className={classes.formControl}>
          <TextField
            id="activitiesDesc"
            name="activitiesDesc"
            multiline
            rows="8"
            fullWidth
            value={activitiesDesc}
            onChange={handleChange}
            placeholder="Your report here"
            required
            onBlur={checkForNull}
            variant="outlined"
            autoFocus
          />
        </FormControl>
        <FormHelperText error={true}>{activitiesDescError}</FormHelperText>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple-chip">Mentees helped</InputLabel>
          <Select
            multiple
            value={selectedMentees}
            name="selectedMentees"
            onChange={handleChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {mentees &&
              mentees.map(mentee => (
                <MenuItem key={mentee} value={mentee}>
                  <Checkbox checked={selectedMentees.indexOf(mentee) > -1} />
                  <ListItemText primary={mentee} />
                </MenuItem>
              ))}
          </Select>{" "}
        </FormControl>
      </form>
    );
  }
}

class MentorsReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      specialty: "",
      location: "",
      activitiesDesc: "",
      openSnackbarSaved: false,
      openSnackbarError: false,
      pictureName: PhotoIcon,
      stateCode: "",
      mentees: [],
      selectedMentees: [],
      activitiesDescError: ""
    };
  }
  /**
   * getFirebasePayload - returns the data to send to Firebase
   * @returns {Object} the Firebase payload
   */
  getFirebasePayload() {
    return R.pick(["selectedMentees", "activitiesDesc"], this.state);
  }

  /**
   * checkForNull - sets an error if the field is null
   * @returns {void}
   */
  checkForNull = event => {
    const value = event.target.value;
    value === ""
      ? this.setState({
          activitiesDescError: "Please describe the activities."
        })
      : this.setState({
          activitiesDescError: ""
        });
  };

  /**
   * handleSubmit - sends Firebase payload
   * @returns {void}
   */
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.activitiesDesc !== "") {
      writeReport(this.getFirebasePayload(), auth.currentUserUid())
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
    } else {
      this.setState({
        openSnackbarError: true,
        sectionError: "The description of your activities is required."
      });
    }
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
          stateCode: mentor.val().stateCode,
          location: mentor.val().location,
          activitiesDesc: mentor.val().report
            ? mentor.val().report.activitiesDesc
            : "",
          selectedMentees:
            mentor.val().report && mentor.val().report.selectedMentees
              ? mentor.val().report.selectedMentees
              : [],
          pictureName:
            mentor.val().pictureName === "NA"
              ? PhotoIcon
              : mentor.val().pictureName
        });
      })
      .catch();
  };

  getAllMentees = () => {
    getMentees()
      .then(snapshot => {
        const data = snapshot.val();
        const menteesData = Object.keys(data)
          .map(menteeKey => {
            return data[menteeKey].name;
          })
          .sort();

        this.setState({
          mentees: menteesData
        });
      })
      .catch(
        this.setState({
          mentees: []
        })
      );
  };

  getData = () => {
    this.getAllMentees();
    this.getMentorData();
  };

  componentDidMount() {
    if (this.props.authUser) {
      this.unregisterObserver = this.getData();
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.unregisterObserver = this.getData();
    }
  }
  componentWillUnmount() {
    this.unregisterObserver = null;
  }

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

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    const { openSnackbarSaved, openSnackbarError, sectionError } = this.state;
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <ToPrint
              ref={el => (this.componentRef = el)}
              state={this.state}
              classes={classes}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              checkForNull={this.checkForNull}
            />
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={this.handleSubmit}
                className={classes.button}
              >
                Save
              </Button>
              <ReactToPrint
                trigger={() => (
                  <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                  >
                    Print{" "}
                  </Button>
                )}
                content={() => this.componentRef}
              />
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
            message="Information saved!"
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

MentorsReport.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MentorsReport);

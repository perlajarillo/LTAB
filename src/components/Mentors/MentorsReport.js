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
  sectionMargin: {
    marginTop: theme.spacing.unit * 6
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
      stateCode: ""
    };
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
   * handleSubmit - sends Firebase payload
   * @returns {void}
   */
  handleSubmit = e => {
    e.preventDefault();
    //here will be the actions to save report
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

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    const {
      name,
      specialty,
      location,
      openSnackbarSaved,
      openSnackbarError,
      sectionError,
      pictureName,
      activitiesDesc,
      stateCode
    } = this.state;

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <form onSubmit={this.handleSubmit}>
            <CardContent>
              <Grid container spacing={24}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <div className={classes.sectionMargin}>
                    <Typography variant="h6" color="primary">
                      Mentor's information
                    </Typography>
                  </div>
                  <div>
                    <img
                      src={pictureName}
                      alt="mentor photography"
                      className={classes.picture}
                    />
                  </div>
                  <div>
                    <Typography>{name}</Typography>
                    <Typography>"Specialty: "{specialty}</Typography>
                    <Typography>
                      "Location: "{location} ", " {stateCode}
                    </Typography>
                  </div>
                  <div>
                    <br />
                    <Typography variant="body2" color="primary">
                      Type here a description of the activities you completed as
                      a mentor in FLAD Mentorship program
                    </Typography>
                    <FormControl required className={classes.formControl}>
                      <TextField
                        id="activitiesDesc"
                        name="activitiesDesc"
                        multiline
                        rows="8"
                        value={activitiesDesc}
                        onChange={this.handleChange}
                        className={classes.textField}
                      />
                    </FormControl>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <div />
                  <div className={classes.buttons}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className={classes.button}
                    >
                      Save
                    </Button>
                    <Button
                      variant="contained"
                      color="default"
                      className={classes.button}
                    >
                      Print
                    </Button>
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

export default withStyles(styles)(MentorsReport);

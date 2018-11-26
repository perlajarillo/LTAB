import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "../SnackbarContentComponent/SnackbarContentComponent";
import { Redirect } from "react-router-dom";

import { auth } from "../../firebase";

const styles = theme => ({
  container: {
    marginTop: "30%",
    minHeight: "70vh",
    [theme.breakpoints.up("md")]: {
      marginTop: "20%"
    }
  },
  formControl: {
    margin: theme.spacing.unit
  },
  button: {
    marginTop: theme.spacing.unit * 2
  },
  text: {
    padding: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
  },
  card: {
    margin: "50px auto",
    maxWidth: 345,
    [theme.breakpoints.up("sm")]: {
      maxWidth: 400
    }
  }
});

class EditPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      error: null,
      successMsg: null,
      openSnackbarSaved: false,
      openSnackbarError: false,
      returnToHome: false
    };
  }

  handleChange = event => {
    const { target } = event;
    const { value, name } = target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    const { email } = this.state;
    console.log("clicked handleSubmit");
    event.preventDefault();

    auth
      .onResetPassWord(email)
      .then(() => {
        this.setState({
          email: email,
          successMsg: "We have sent you a link to reset your password",
          openSnackbarSaved: true
        });
      })
      .catch(error => {
        this.setState({
          error: error.message,
          openSnackbarError: true
        });
      });
  };

  /**
   * handleSnackbarClose - sets the actions when the snackbar is closed and redirects
   * to the home page
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
          returnToHome: true
        })
      : this.setState({ openSnackbarError: false });
  };

  render() {
    const {
      email,
      error,
      successMsg,
      openSnackbarSaved,
      openSnackbarError,
      returnToHome
    } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        {returnToHome && (
          <Redirect
            to={{
              pathname: "/",
              state: { from: this.props.location }
            }}
          />
        )}
        <Card className={classes.card}>
          <Typography variant="h6" gutterBottom className={classes.text}>
            Reset your password
          </Typography>
          <Typography variant="body1" gutterBottom className={classes.text}>
            Enter your email address and we will send you a link to reset your
            password
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <CardContent>
              <FormControl
                className={classes.formControl}
                fullWidth
                aria-describedby="required"
                aria-required="true"
              >
                <InputLabel htmlFor="email">
                  Enter your email address
                </InputLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={this.handleChange}
                />
                <FormHelperText id="required">Required*</FormHelperText>
              </FormControl>
            </CardContent>
          </form>
          <CardActions>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
              onClick={this.handleSubmit}
              className={classes.button}
            >
              Send password reset email
            </Button>
          </CardActions>
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
            message={error}
          />
        </Snackbar>
      </div>
    );
  }
}

EditPassword.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditPassword);

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "../SnackbarContentComponent/SnackbarContentComponent";

import { getAdmin, getMentor } from "../../firebase/operations";

const styles = theme => ({
  wrapper: {
    margin: "80px 0",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      margin: "70px 0"
    },
    [theme.breakpoints.up("xs")]: { minHeight: "70vh" }
  },

  container: {
    paddingTop: theme.spacing.unit * 3,
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing.unit * 3
    }
  },
  formControl: {
    margin: theme.spacing.unit
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 3,
    maxWidth: 410,
    [theme.breakpoints.up("xs")]: {
      maxWidth: 270,
      marginLeft: theme.spacing.unit * 2
    },
    [theme.breakpoints.up("sm")]: {
      maxWidth: 400,
      marginLeft: theme.spacing.unit * 3
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: 410,
      marginLeft: theme.spacing.unit * 3
    },
    [theme.breakpoints.between("sm", "md")]: {
      maxWidth: 445,
      marginLeft: theme.spacing.unit * 3
    }
  },
  text: {
    padding: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 2,
    color: theme.palette.primary.main
  },
  card: {
    width: "500px",
    paddingBottom: "1%",
    [theme.breakpoints.up("xs")]: {
      width: "auto",
      marginTop: "5px"
    },
    [theme.breakpoints.up("sm")]: {
      width: "250px",
      marginTop: "40px"
    },
    [theme.breakpoints.up("md")]: {
      width: "500px",
      marginTop: "40px"
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "520px"
    }
  },

  pos: {
    marginBottom: 24
  }
});

class LogIn extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      email: "",
      password: "",
      user: false,
      error: "",
      openSnackbarError: false
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
    event.preventDefault();
    const { email, password } = this.state;
    const { history } = this.props;

    auth
      .onLogIn(email, password)
      .then(() => {
        this.setState({
          email: email,
          password: password
        });
      })
      .then(() => {
        getAdmin(auth.currentUserUid())
          .then(snapshot => {
            snapshot.val() && history.push("/mentors");
          })
          .catch(e => {
            getMentor(auth.currentUserUid())
              .then(snapshot => {
                snapshot.val()
                  ? history.push("/mentorshome")
                  : history.push("/availablementors");
              })
              .catch(() => {
                history.push("/availablementors");
              });
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
    const { email, password, error, openSnackbarError } = this.state;

    return (
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.card}>
            <form onSubmit={this.handleSubmit}>
              <Typography className={classes.text} variant="body1">
                Login to enter your account.
              </Typography>
              <CardContent>
                <FormControl
                  className={classes.formControl}
                  fullWidth
                  aria-describedby="required"
                  aria-required="true"
                >
                  <InputLabel htmlFor="email">E-mail</InputLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={this.handleChange}
                  />
                  <FormHelperText id="required">Required*</FormHelperText>
                </FormControl>
                <FormControl
                  className={classes.formControl}
                  fullWidth
                  aria-describedby="required"
                  aria-required="true"
                >
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    id="password"
                    name="password"
                    type="Password"
                    value={password}
                    onChange={this.handleChange}
                  />
                  <FormHelperText id="required">Required*</FormHelperText>
                </FormControl>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  fullWidth
                  className={classes.button}
                >
                  Log In
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  component={Link}
                  to="/password-reset"
                  className={classes.button}
                >
                  Forgot your password?
                </Button>
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
      </div>
    );
  }
}

LogIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LogIn);

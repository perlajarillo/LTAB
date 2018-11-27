import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "../SnackbarContentComponent/SnackbarContentComponent";
import Grid from "@material-ui/core/Grid";
import icon_facebook from "../../images/icon_facebook.png";
import b_business from "../../images/b_business.jpg";

const styles = theme => ({
  wrapper: {
    margin: "80px 0"
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
      maxWidth: 145,
      marginLeft: theme.spacing.unit * 3
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
      width: "300px"
    },
    [theme.breakpoints.up("sm")]: {
      width: "250px"
    },
    [theme.breakpoints.up("md")]: {
      width: "950px"
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "420px"
    }
  },
  icons: {
    width: "50px",
    marginLeft: 75,
    paddingBottom: "1%",
    [theme.breakpoints.up("xs")]: {
      width: "40px"
    },
    [theme.breakpoints.up("sm")]: {
      width: "35px"
    },
    [theme.breakpoints.up("md")]: {
      width: "95px"
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "45px"
    }
  },
  iconBusiness: {
    width: "50px",
    marginLeft: 75,
    border: "2px solid green",
    paddingBottom: "1%",
    [theme.breakpoints.up("xs")]: {
      width: "40px"
    },
    [theme.breakpoints.up("sm")]: {
      width: "35px"
    },
    [theme.breakpoints.up("md")]: {
      width: "95px"
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "45px"
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
        history.push("/mentors");
        // });
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
      <div>
        <Card className={classes.card}>
          <Grid container spacing={32}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <form onSubmit={this.handleSubmit}>
                <Typography className={classes.text} variant="body1">
                  Login to look for a mentor.
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
                  >
                    Log In
                  </Button>
                </CardContent>
              </form>
              <Button
                variant="outlined"
                type="submit"
                color="primary"
                fullWidth
                component={Link}
                to="/password-reset"
                className={classes.button}
              >
                Forgot your password?
              </Button>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Typography className={classes.text} variant="body1">
                Are you looking for a Mentor and your are not registered yet?
              </Typography>
              <CardActions>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  component={Link}
                  to="/newmentee"
                >
                  Create an account
                </Button>
              </CardActions>

              <Typography className={classes.text} variant="body1">
                Or visit our Facebook page and Web Site to know more about the
                program:
              </Typography>
              <a
                href="https://www.facebook.com/TalkBusinessFlad/"
                target="blank"
              >
                <img src={icon_facebook} className={classes.icons} />
              </a>
              <a
                href="https://www.flad.pt/en/lets-talk-about-business/"
                target="blank"
              >
                <img src={b_business} className={classes.iconBusiness} />
              </a>
            </Grid>
          </Grid>
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

LogIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LogIn);

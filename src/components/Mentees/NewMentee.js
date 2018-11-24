import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "../SnackbarContentComponent/SnackbarContentComponent";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

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

class NewMentee extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: "",
      mail: "",
      password: "",
      location: "",
      error: "",
      ascendence: "",
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

  render() {
    const { classes } = this.props;
    const {
      email,
      password,
      location,
      error,
      ascendence,
      openSnackbarError
    } = this.state;

    return (
      <div>
        <Card className={classes.card}>
          <Grid container spacing={32}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <form onSubmit={this.handleSubmit}>
                <Typography className={classes.text} variant="body1">
                  Register to look for a mentor.
                </Typography>
                <CardContent>
                  <TextField
                    id="name"
                    label="Name:"
                    placeholder="Your name"
                    className={classes.textField}
                    margin="normal"
                    onChange={this.handleChange}
                    required
                  />
                  <TextField
                    id="email"
                    name="email"
                    label="E-mail:"
                    placeholder="Your email"
                    className={classes.textField}
                    margin="normal"
                    onChange={this.handleChange}
                    required
                  />
                  <TextField
                    id="password"
                    label="password"
                    className={classes.textField}
                    type="password"
                    margin="normal"
                  />
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
                    Sign out
                  </Button>
                </CardContent>
              </form>
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

NewMentee.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NewMentee);

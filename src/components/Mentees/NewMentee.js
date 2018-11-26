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

const styles = theme => ({
  wrapper: {
    margin: "80px 0",
    marginTop: 200
  },

  formControl: {
    margin: "24px 0",
    width: 550,

    [theme.breakpoints.up("sm")]: {
      width: 500
    }
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
      width: "330px"
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

  iconBusiness: {
    width: "50px",
    marginLeft: 75,
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
      email: "",
      password: "",
      error: "",
      descendent: "",
      openSnackbarError: false,
      chkDisclaimer: false,
      repeatPassword: ""
    };
  }

  handleChange = event => {
    const { target } = event;
    const { value, name } = target;
    this.setState({
      [name]: value
    });
  };

  handleChangeCheck = () => {
    this.setState({
      chkDisclaimer: !this.state.chkDisclaimer
    });
  };

  render() {
    const { classes } = this.props;
    const {
      name,
      email,
      password,
      repeatPassword,
      error,
      descendent,
      openSnackbarError,
      chkDisclaimer
    } = this.state;

    return (
      <div className={classes.wrapper}>
        <Card className={classes.card}>
          <form onSubmit={this.handleSubmit}>
            <CardContent>
              <Typography variant="h6">
                Register to look for a mentor.{" "}
                <img src={b_business} className={classes.iconBusiness} />
              </Typography>
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
                    required
                  />
                </FormControl>
              </div>
              <div>
                <FormControl required className={classes.formControl}>
                  <TextField
                    id="email"
                    name="email"
                    label="E-mail:"
                    value={email}
                    placeholder="Your email"
                    className={classes.textField}
                    margin="normal"
                    onChange={this.handleChange}
                    required
                  />
                </FormControl>
              </div>
              <div>
                <FormControl required className={classes.formControl}>
                  <TextField
                    id="password"
                    name="password"
                    label="Password:"
                    value={password}
                    className={classes.textField}
                    onChange={this.handleChange}
                    type="password"
                    margin="normal"
                    required
                  />
                </FormControl>
              </div>
              <div>
                <FormControl required className={classes.formControl}>
                  <TextField
                    id="repeatPassword"
                    name="repeatPassword"
                    label="Repeat password:"
                    value={repeatPassword}
                    className={classes.textField}
                    type="password"
                    onChange={this.handleChange}
                    margin="normal"
                    required
                  />
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
                  Sign out
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

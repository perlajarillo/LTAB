import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import AlertIcon from "@material-ui/icons/Warning";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { deleteUser } from "../../firebase/operations";
import { auth } from "../../firebase";
import red from "@material-ui/core/colors/red";
import programData from "../Literals/Literals";

const { program } = programData;

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconBig: {
    fontSize: 30,
    marginRight: theme.spacing.unit * 2
  },
  deleteButton: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700]
    }
  },
  noButton: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.light
    }
  }
});

class CancelAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      msg: null
    };
  }

  handleClickDelete = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = event => {
    auth
      .onDeleteUser()
      .then(() => {
        deleteUser(this.props.uid, this.props.rol).catch(error => {
          this.setState({
            msg: error.message,
            open: false
          });
        });
      })
      .catch(error => {
        this.setState({
          msg: error.message,
          open: false
        });
      });
  };

  render() {
    const { open, msg } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Typography variant="body1" color="secondary">
          WARNING: This operation can NOT be undone. If you delete your account
          you will not be able to access to the information about our mentors
          anymore and use other tools provided by {program.name} app.
        </Typography>
        <br />
        <Button
          variant="contained"
          color="secondary"
          onClick={this.handleClickDelete}
        >
          Delete Account
          <DeleteIcon className={classes.rightIcon} />
        </Button>
        <FormHelperText error={true}>{msg}</FormHelperText>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {" "}
            <AlertIcon className={classes.iconBig} />
            {"Delete account?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this account?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleSubmit}
              className={classes.deleteButton}
            >
              Yes
            </Button>
            <Button
              onClick={this.handleClose}
              className={classes.noButton}
              autoFocus
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

CancelAccount.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CancelAccount);

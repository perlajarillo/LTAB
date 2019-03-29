import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import programData from "../Literals/Literals";

const { contact } = programData;

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500]
  }
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit
  }
}))(MuiDialogActions);

class WelcomeDialog extends React.Component {
  state = {
    open: false
  };

  render() {
    const { openDialog, handleClose, dialogText, tutorialLink } = this.props;
    return (
      <div>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={openDialog}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Welcome! - What to do next?
          </DialogTitle>
          <DialogContent>
            <Typography gutterBottom className={dialogText}>
              1. To find a mentor click in Specialty and choose the field of
              your interest. You can also filter by state or see the recommended
              mentors for you.
            </Typography>
            <Typography gutterBottom className={dialogText}>
              2. Click in the mentor's card to know more about her/ him and
              contact through phone, Twitter, Facebook or LinkedIn, but please
              avoid contact this person if the status is not available{" "}
            </Typography>
            <Typography gutterBottom className={dialogText}>
              3. If you didn't find a mentor today don't give up, our network of
              mentors is growing every day!
            </Typography>
            <Typography gutterBottom className={dialogText}>
              4. If you have suggestions or need some help finding a mentor
              please send an email to{" "}
              <a href={"mailto:" + contact.email}>{contact.email}</a>
            </Typography>
          </DialogContent>
          <DialogActions>
            <Typography variant="body2" className={dialogText}>
              Read this{" "}
              <a
                href="http://ior.ad/FGz"
                className={tutorialLink}
                target="blank"
              >
                tutorial
              </a>{" "}
            </Typography>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default WelcomeDialog;

import React from "react";
import PropTypes from "prop-types";
import PasswordChange from "../PasswordChange/PasswordChange";
import withAuthorization from "../WithAuthorization";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import MessageIcon from "@material-ui/icons/Message";
import PermIcon from "@material-ui/icons/PermIdentity";
import CancelAccount from "../CancelAccount/CancelAccount";
import EditMentor from "../Mentors/EditMentor";
import EditMentee from "../Mentees/EditMentee";
import MentorsMessage from "../MentorsHome/MentorsMessage";

const styles = theme => ({
  wrapper: {
    marginTop: "6rem",

    minHeight: "60vh",
    [theme.breakpoints.up("md")]: {
      marginTop: "7rem"
    }
  },

  sectionStyles: {
    padding: theme.spacing.unit * 3
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  iconStyle: {
    marginRight: theme.spacing.unit * 3,
    color: theme.palette.primary.main
  }
});

class Settings extends React.Component {
  render() {
    const { classes } = this.props;
    const { rol } = this.props.authUser;
    return (
      <main className={classes.wrapper}>
        <section className={classes.sectionStyles}>
          <Typography variant="h5" color="primary">
            Settings
          </Typography>
          <br />
          <br />
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <PermIcon className={classes.iconStyle} />
              <Typography className={classes.heading}>
                Change password
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <PasswordChange />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          {rol === "mentor" && (
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <MessageIcon className={classes.iconStyle} />
                <Typography className={classes.heading}>
                  Set a message
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <MentorsMessage />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )}
          {rol !== "admin" && (
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <EditIcon className={classes.iconStyle} />
                <Typography className={classes.heading}>
                  Edit profile
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                {rol === "mentor" ? (
                  <EditMentor />
                ) : (
                  rol === "mentee" && <EditMentee />
                )}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )}

          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <DeleteIcon className={classes.iconStyle} />
              <Typography className={classes.heading}>
                Cancel account
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <CancelAccount rol={rol} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <br />
          <br />
        </section>
      </main>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired
};

const StyledSettings = withStyles(styles)(Settings);
const authCondition = authUser => Boolean(authUser);

export default withAuthorization(authCondition)(StyledSettings);

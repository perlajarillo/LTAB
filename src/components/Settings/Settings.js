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
import PermIcon from "@material-ui/icons/PermIdentity";

const styles = theme => ({
  wrapper: {
    margin: "80px 0",
    marginTop: "20%",
    minHeight: "70vh",
    [theme.breakpoints.up("md")]: {
      marginTop: "15%"
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

    return (
      <main className={classes.wrapper}>
        <section className={classes.sectionStyles}>
          <Typography variant="h5">Settings</Typography>
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
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <DeleteIcon className={classes.iconStyle} />
              <Typography className={classes.heading}>
                Cancel account
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails />
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

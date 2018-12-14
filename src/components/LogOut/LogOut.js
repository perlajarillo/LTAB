import React from "react";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  textBtn: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.7rem"
    }
  }
});
const LogOut = props => {
  const { classes } = props;

  return (
    <div>
      <Button
        tabIndex="-1"
        color="inherit"
        onClick={auth.onLogOut}
        component={Link}
        className={classes.textBtn}
        to="/"
      >
        Log out
      </Button>
    </div>
  );
};

export default withStyles(styles)(LogOut);

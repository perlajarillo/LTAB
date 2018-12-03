import React from "react";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const LogOut = () => {
  return (
    <div>
      <Button
        tabIndex="-1"
        color="inherit"
        onClick={auth.onLogOut}
        component={Link}
        to="/"
      >
        Log out
      </Button>
    </div>
  );
};
export default LogOut;

import React from "react";
import Reports from "./Reports";
import AuthUserContext from "../AuthUserContext";

const ReportsWithContext = props => (
  <AuthUserContext.Consumer>
    {authUser => <Reports {...props} authUser={authUser} />}
  </AuthUserContext.Consumer>
);

export default ReportsWithContext;

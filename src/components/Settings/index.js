import React from "react";
import Settings from "./Settings";
import AuthUserContext from "../AuthUserContext";

const SettingsWithContext = props => (
  <AuthUserContext.Consumer>
    {authUser => <Settings {...props} authUser={authUser} />}
  </AuthUserContext.Consumer>
);

export default SettingsWithContext;

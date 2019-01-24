import React from "react";
import MentorsReport from "./MentorsReport";
import AuthUserContext from "../AuthUserContext";

const ReportsWithContext = props => (
  <AuthUserContext.Consumer>
    {authUser => <MentorsReport {...props} authUser={authUser} />}
  </AuthUserContext.Consumer>
);

export default ReportsWithContext;

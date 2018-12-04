import React from "react";
import MentorsHome from "./MentorsHome";
import AuthUserContext from "../AuthUserContext";

const MentorsWithContext = props => (
  <AuthUserContext.Consumer>
    {authUser => <MentorsHome {...props} authUser={authUser} />}
  </AuthUserContext.Consumer>
);

export default MentorsWithContext;

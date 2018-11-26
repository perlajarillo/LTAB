import React from "react";
import AvailableMentors from "./AvailableMentors";
import AuthUserContext from "../AuthUserContext";

const MentorsWithContext = props => (
  <AuthUserContext.Consumer>
    {authUser => <AvailableMentors {...props} authUser={authUser} />}
  </AuthUserContext.Consumer>
);

export default MentorsWithContext;

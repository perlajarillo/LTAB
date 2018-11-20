import React from "react";
import Mentors from "./Mentors";
import AuthUserContext from "../AuthUserContext";

const MentorsWithContext = props => (
  <AuthUserContext.Consumer>
    {authUser => <Mentors {...props} authUser={authUser} />}
  </AuthUserContext.Consumer>
);

export default MentorsWithContext;

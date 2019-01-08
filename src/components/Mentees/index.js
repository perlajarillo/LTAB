import React from "react";
import Mentees from "./Mentees";
import AuthUserContext from "../AuthUserContext";

const MenteesWithContext = props => (
  <AuthUserContext.Consumer>
    {authUser => <Mentees {...props} authUser={authUser} />}
  </AuthUserContext.Consumer>
);

export default MenteesWithContext;

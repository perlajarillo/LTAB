import React from "react";
import { firebase } from "../firebase";
import AuthUserContext from "./AuthUserContext";
import { getAdmin } from "../firebase/operations";

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authUser: null,
        admin: false
      };
    }

    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? getAdmin(authUser.uid).then(snapshot => {
              snapshot.val()
                ? this.setState({ authUser: { authUser, admin: true } })
                : this.setState({ authUser: { authUser, admin: false } });
            })
          : this.setState({ authUser: null });
      });
    }

    render() {
      const { authUser } = this.state;
      return (
        <AuthUserContext.Provider value={authUser}>
          <Component />
        </AuthUserContext.Provider>
      );
    }
  }
  return WithAuthentication;
};

export default withAuthentication;

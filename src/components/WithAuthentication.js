import React from "react";
import { firebase } from "../firebase";
import AuthUserContext from "./AuthUserContext";
import { getAdmin, getMentor } from "../firebase/operations";

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
      this.unregisterObserver = firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? getAdmin(authUser.uid)
              .then(snapshot => {
                snapshot.val() &&
                  this.setState({ authUser: { authUser, rol: "admin" } });
              })
              .catch(e => {
                getMentor(authUser.uid)
                  .then(snapshot => {
                    snapshot.val()
                      ? this.setState({ authUser: { authUser, rol: "mentor" } })
                      : this.setState({
                          authUser: { authUser, rol: "mentee" }
                        });
                  })
                  .catch(e => {
                    this.setState({ authUser: { authUser, rol: "mentee" } });
                  });
              })
          : this.setState({ authUser: null });
      });
    }
    componentWillUnmount() {
      this.unregisterObserver = null;
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

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import LogOut from "../LogOut/LogOut";
import logo from "../../images/logo.png";
import AuthUserContext from "../AuthUserContext";

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: "flex"
  },
  menuButton: {
    marginLeft: -12
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  logoStyles: {
    margin: "16px 0",
    flex: 1
  },
  logo: {
    width: "25px",
    height: "25px",
    [theme.breakpoints.up("xs")]: {
      width: "60px",
      height: "60px"
    },
    [theme.breakpoints.up("sm")]: {
      width: "110px",
      height: "110px"
    },
    [theme.breakpoints.up("md")]: {
      width: "115px",
      height: "115px"
    }
  }
});

const NavAuthUser = props => {
  const { classes, mobileOpen, toggle, rol } = props;
  return (
    <Fragment>
      <AppBar className={classes.root} positionsticky="true">
        <Toolbar>
          <IconButton
            className={classes.navIconHide}
            color="inherit"
            aria-label="Menu"
            onClick={toggle}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" className={classes.logoStyles}>
            <img src={logo} alt="Flad Mentorship" className={classes.logo} />
          </Link>
          <LogOut />
          <SwipeableDrawer
            anchor="left"
            open={mobileOpen}
            onClose={toggle}
            onOpen={toggle}
          >
            <div className={classes.list}>
              {rol === "admin" ? (
                <div>
                  <List>
                    <Button
                      tabIndex="-1"
                      color="inherit"
                      component={Link}
                      to="/mentors"
                    >
                      Mentors
                    </Button>
                  </List>
                  <List>
                    <Button
                      tabIndex="-1"
                      color="inherit"
                      component={Link}
                      to="/"
                    >
                      Reports
                    </Button>
                  </List>
                </div>
              ) : rol === "mentor" ? (
                <div>
                  <List>
                    <Button
                      tabIndex="-1"
                      color="inherit"
                      component={Link}
                      to="/mentorsmessage"
                    >
                      Share message
                    </Button>
                  </List>
                  <List>
                    <Button
                      tabIndex="-1"
                      color="inherit"
                      component={Link}
                      to="/"
                    >
                      Reports
                    </Button>
                  </List>
                </div>
              ) : (
                <List>
                  <Button
                    tabIndex="-1"
                    color="inherit"
                    component={Link}
                    to="/availablementors"
                  >
                    Mentors
                  </Button>
                </List>
              )}
              <List>
                <Button
                  tabIndex="-1"
                  color="inherit"
                  component={Link}
                  to="/settings"
                >
                  Settings
                </Button>
              </List>
            </div>
          </SwipeableDrawer>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

const NavNoAuth = props => {
  const { classes } = props;
  return (
    <div>
      <AppBar className={classes.root}>
        <Toolbar>
          <Link to="/" className={classes.logoStyles}>
            <img src={logo} alt="FLAD Mentorship" className={classes.logo} />
          </Link>
          <div>
            <Button tabIndex="-1" color="inherit" component={Link} to="/login">
              Log in
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileOpen: false,
      rol: "mentee"
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
  }

  handleDrawerToggle = event => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes } = this.props;
    const { mobileOpen } = this.state;
    return (
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? (
            <NavAuthUser
              classes={classes}
              mobileOpen={mobileOpen}
              toggle={this.handleDrawerToggle}
              rol={authUser.rol}
            />
          ) : (
            <NavNoAuth classes={classes} />
          )
        }
      </AuthUserContext.Consumer>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);

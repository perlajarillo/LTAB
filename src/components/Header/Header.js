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
import logo from "../../images/logo_square.png";
import AuthUserContext from "../AuthUserContext";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: "flex",
    maxHeight: "100px"
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
    width: "48px",
    height: "48px"
  },
  welcomeText: {
    marginLeft: 16,
    color: "#fff",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.9rem"
    }
  },
  textBtn: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.9rem"
    }
  }
});

const NavAuthUser = props => {
  const { classes, mobileOpen, toggle, rol, userName } = props;
  const home =
    rol === "admin"
      ? "/mentors"
      : rol === "mentor"
      ? "/mentorshome"
      : "/availablementors";

  let shortName;
  shortName = userName.split(" ")[0];

  const home =
    rol === "admin"
      ? "/mentors"
      : rol === "mentor"
      ? "/mentorshome"
      : "/availablementors";

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
          <Typography variant="caption" className={classes.welcomeText}>
            {"Hi, " + shortName}
          </Typography>
          <div>
            <Button
              className={classes.textBtn}
              tabIndex="-1"
              color="inherit"
              component={Link}
              to={home}
            >
              Home
            </Button>
          </div>
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
                  {/* we will removing the comment once the reports are ready
                  <List>
                    <Button
                      tabIndex="-1"
                      color="inherit"
                      component={Link}
                      to="/"
                    >
                      Reports
                    </Button>
                  </List> */}
                </div>
              ) : rol === "mentor" ? (
                <div>
                  {/*  we will removing the comment once the reports are ready
                  <List>
                    <Button
                      tabIndex="-1"
                      color="inherit"
                      component={Link}

                      to="/"
                    >
                      Reports
                    </Button>
                  </List> */}
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
          <IconButton style={{ backgroundColor: "#25560e" }} disabled={true}>
            <MenuIcon style={{ color: "#25560e" }} />
          </IconButton>
          <Link to="/" className={classes.logoStyles}>
            <img src={logo} alt="FLAD Mentorship" className={classes.logo} />
          </Link>
          <div>
            <Button
              tabIndex="-1"
              color="inherit"
              component={Link}
              to="/"
              className={classes.textBtn}
            >
              Home
            </Button>
          </div>
          <div>
            <Button
              tabIndex="-1"
              color="inherit"
              component={Link}
              to="/login"
              className={classes.textBtn}
            >
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
              userName={authUser.userName}
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

import React, { Component } from "react";

import PropTypes from "prop-types";
import logos from "../../images/letstalk_logo_3.jpg";
import { withStyles } from "@material-ui/core/styles";
import { getMentors } from "../../firebase/operations";
import ReactToPrint from "react-to-print";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    margin: "80px 0",
    minHeight: "80vh",
    [theme.breakpoints.up("sm")]: {
      margin: "90px 24px"
    }
  },
  logos: {
    width: 350,
    height: 170
  }
});

class ComponentToPrint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mentors: {},
      totalMentors: ""
    };
  }

  getMentors = () => {
    getMentors()
      .then(snapshot => {
        this.setState({
          mentors: snapshot.val(),
          totalMentors: Object.keys(snapshot.val()).length
        });
      })
      .catch(
        this.setState({
          mentors: "",
          totalMentors: ""
        })
      );
  };

  componentDidMount() {
    if (this.props.authUser) {
      this.unregisterObserver = this.getMentors();
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getMentors();
    }
  }
  componentWillUnmount() {
    this.unregisterObserver = null;
  }
  render() {
    const { classes } = this.props;
    const { totalMentors } = this.state;
    return (
      <div>
        <img src={logos} alt="FLAD-Mentorship" className={classes.logos} />
        <Typography variant="h5"> Summary:</Typography>

        <p>Total of mentors: {totalMentors}</p>
      </div>
    );
  }
}

class Reports extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <ReactToPrint
          trigger={() => <a href="#">Print this report out!</a>}
          content={() => this.componentRef}
        />
        <ComponentToPrint
          ref={el => (this.componentRef = el)}
          state={this.state}
          classes={classes}
        />
      </div>
    );
  }
}

Reports.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Reports);

import React, { Component } from "react";
import withAuthorization from "../WithAuthorization";
import { db } from "../../firebase";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles = theme => ({
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    margin: "80px 0",
    marginTop: "20%",
    minHeight: "70vh",
    [theme.breakpoints.up("md")]: {
      marginTop: "15%"
    }
  },
  card: {
    maxWidth: 345,
    minWidth: 300,
    flexGrow: 1,
    margin: theme.spacing.unit
  },
  media: {
    height: 140
  },
  avatar: {
    margin: 10
  },
  avatar: {
    margin: 10,
    flexWrap: "noWrap"
  },
  bigAvatar: {
    margin: 10,
    width: 100,
    height: 100
  },
  dialogTitle: {
    display: "flex",
    flexFlow: "row noWrap"
  }
});

class AvailableMentors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mentors: [],
      mentorId: "",
      specialty: "",
      mentorData: "",
      uid: "",
      filterApplied: false,
      order: "desc",
      orderBy: "name",
      selected: [],
      page: 0,
      rowsPerPage: 5,
      openSnackbarDeleted: false,
      open: false,
      scroll: "paper"
    };
  }

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

  getMentors = () => {
    db.getMentors().then(snapshot => {
      const data = snapshot.val();
      const mentorsData = Object.keys(data).map(mentorKey => {
        let name = data[mentorKey].name;
        name = name.toLowerCase();
        const mentor = {
          key: mentorKey,
          name: name,
          location: data[mentorKey].location,
          specialty: data[mentorKey].specialty,
          available: data[mentorKey].available,
          description: data[mentorKey].description,
          pictureName: data[mentorKey].pictureName,
          mail: data[mentorKey].mail,
          phone: data[mentorKey].phone,
          lk: data[mentorKey].linkedin,
          tw: data[mentorKey].twitter,
          fb: data[mentorKey].facebook
        };

        return mentor;
      });
      data &&
        this.setState({
          mentors: mentorsData,
          //mentorsMirror: snapshot.val(),
          filterApplied: false
        });
    });
  };

  handleClickOpen = (scroll, mentorKey) => () => {
    const { mentors } = this.state;

    let selectedMentor = mentors.find(mentor => {
      return mentor.key === mentorKey;
    });

    this.setState({
      open: true,
      scroll,
      mentorId: mentorKey,
      mentorData: selectedMentor
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { mentors, mentorData } = this.state;
    return (
      <div>
        <div className={classes.wrapper}>
          {mentors.map(mentor => (
            <Card className={classes.card} key={mentor.key}>
              <CardActionArea>
                <CardHeader
                  avatar={
                    <Avatar
                      alt="Remy Sharp"
                      src="https://via.placeholder.com/100.png/09f/fff?text=mentor"
                      className={classes.bigAvatar}
                    />
                  }
                  title={mentor.name}
                />
                <CardContent>
                  <Typography variant="body2">{mentor.specialty}</Typography>
                  <Typography gutterBottom variant="body2">
                    {mentor.location}
                  </Typography>
                  <br />
                  {mentor.available ? (
                    <hr style={{ border: "1px solid green" }} />
                  ) : (
                    <hr style={{ border: "1px solid red" }} />
                  )}
                  {mentor.available ? (
                    <Typography component="p" style={{ color: "green" }}>
                      available
                    </Typography>
                  ) : (
                    <Typography component="p" style={{ color: "red" }}>
                      available
                    </Typography>
                  )}
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={this.handleClickOpen("paper", mentor.key)}
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>

        {mentorData && (
          <div>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              scroll="paper"
              aria-labelledby="scroll-dialog-title"
            >
              <DialogTitle
                id="scroll-dialog-title"
                className={classes.dialogTitle}
              >
                <Avatar
                  alt="Remy Sharp"
                  src="https://via.placeholder.com/100.png/09f/fff?text=mentor"
                  className={classes.bigAvatar}
                />
                <span>
                  {mentorData.name}
                  <Typography variant="body2">
                    {mentorData.specialty}
                  </Typography>
                  <Typography gutterBottom variant="body2">
                    {mentorData.location}
                  </Typography>
                </span>
              </DialogTitle>

              <DialogContent>
                <DialogContentText>{mentorData.description}</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Twitter
                </Button>
                <Button onClick={this.handleClose} color="primary">
                  Linkedin
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
      </div>
    );
  }
}

AvailableMentors.propTypes = {
  classes: PropTypes.object.isRequired
};

const StyledMentors = withStyles(styles)(AvailableMentors);
const authMentors = authUser => Boolean(authUser);
export default withAuthorization(authMentors)(StyledMentors);

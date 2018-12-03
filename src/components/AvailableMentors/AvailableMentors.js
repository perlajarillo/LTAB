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
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { uniq, map, filter, compose } from "ramda";
import fbLogo from "../../images/facebook.png";
import twLogo from "../../images/twitter.png";
import inLogo from "../../images/linkedin.png";
import email from "../../images/email.png";

const SPACE = " ";

const splitOnSpace = x => x.split(SPACE);
const joinWithSpace = x => x.join(SPACE);

const capitalizeWord = str => {
  if (typeof str !== "string") {
    return "";
  }
  let newStr = str.toLowerCase();
  return newStr.charAt(0).toUpperCase() + newStr.slice(1);
};

const toTitleCase = compose(
  joinWithSpace,
  map(capitalizeWord),
  splitOnSpace
);

/**
 * Uses Ramda methods. The functions in the compose method are executed from right to left or from bottom to top.
 * @param {[String]} strings an array of strings
 * @return {Array} removes duplicates, title cases sentences and sorts in alphabetically
 */
const sanitizeStrings = compose(
  uniq,
  filter(Boolean),
  map(toTitleCase)
);

const styles = theme => ({
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "160px",
    minHeight: "70vh",
    [theme.breakpoints.up("sm")]: {
      marginTop: "225px"
    }
  },
  card: {
    maxWidth: 345,
    minWidth: 300,
    flexGrow: 1,
    margin: theme.spacing.unit
  },
  bigAvatar: {
    margin: 10,
    width: 100,
    height: 100
  },
  dialogTitle: {
    display: "flex",
    flexFlow: "row noWrap"
  },
  root: {
    width: "100%",
    zIndex: 1000,
    position: "fixed",
    top: "90px",
    [theme.breakpoints.up("sm")]: {
      top: "145px"
    },
    [theme.breakpoints.up("md")]: {
      top: "150px"
    }
  },
  details: {
    width: "100%"
  },
  formControl: {
    width: "100%",
    margin: "8px 24px 16px 24px",
    fontSize: "0.8em"
  },
  group: {
    display: "unset"
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  quote: {
    borderLeft: "2px solid #c7c7c7",
    fontStyle: "italic",
    padding: "4px",
    fontSize: "1.3em",
    margin: "16px"
  }
});

function SelectionPanel(props) {
  const {
    classes,
    specialties,
    locations,
    selectedSpecialty,
    handleSelectedSpecialty,
    setSelectedFilter,
    selectedContent,
    selectedLocation,
    handleSelectedLocation
  } = props;

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.column}>
            <Button
              data-id="specialty"
              size="small"
              color="primary"
              onClick={setSelectedFilter}
            >
              Specialty
            </Button>
          </div>
          <div className={classes.column}>
            <Button
              data-id="location"
              size="small"
              color="primary"
              onClick={setSelectedFilter}
            >
              Location
            </Button>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          {selectedContent === "specialty" ? (
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup
                aria-label="Specialty"
                name="mentor-specialty"
                className={classes.group}
                value={selectedSpecialty}
                onChange={handleSelectedSpecialty}
              >
                {specialties &&
                  specialties.map((specialty, index) => (
                    <FormControlLabel
                      value={specialty}
                      control={<Radio />}
                      label={specialty}
                      key={`${specialty}_${index}`}
                    />
                  ))}
              </RadioGroup>
            </FormControl>
          ) : (
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup
                aria-label="Specialty"
                name="mentor-specialty"
                className={classes.group}
                value={selectedLocation}
                onChange={handleSelectedLocation}
              >
                {locations &&
                  locations.map((location, index) => (
                    <FormControlLabel
                      value={location}
                      control={<Radio />}
                      label={location}
                      key={`${location}_${index}`}
                    />
                  ))}
              </RadioGroup>
            </FormControl>
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

class AvailableMentors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mentors: [],
      mentorDetail: "",
      mentorId: "",
      uid: "",
      selected: [],
      page: 0,
      open: false,
      scroll: "paper",
      value: "",
      specialties: [],
      locations: [],
      selectedSpecialty: "",
      selectedLocation: "",
      filteredMentors: null,
      selectedContent: "specialty",
      allMentorsKeys: null
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
    this.imgObserver = null;
  }

  getMentors = () => {
    db.getMentors().then(snapshot => {
      const data = snapshot.val();
      let specialties = [];
      let locations = [];
      let keys = [];
      const mentorsData = Object.keys(data).map(mentorKey => {
        specialties.push(data[mentorKey].specialty);
        locations.push(data[mentorKey].location);
        keys.push(mentorKey);
        let mentorState =
          data[mentorKey].mentorState && data[mentorKey].mentorState;

        const mentor = {
          key: mentorKey,
          name: data[mentorKey].name,
          location: toTitleCase(data[mentorKey].location),
          specialty: toTitleCase(data[mentorKey].specialty),
          available: data[mentorKey].available,
          description: data[mentorKey].description,
          pictureName: db
            .getImage(mentorKey, data[mentorKey].pictureName)
            .then(url => {
              if (!url) {
                url = "https://via.placeholder.com/100.png/09f/fff?text=mentor";
              }
              return url;
            })
            .catch(error => {
              return "https://via.placeholder.com/100.png/09f/fff?text=mentor";
            }),
          mentorState: mentorState,
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
          filterApplied: false,
          specialties: sanitizeStrings(specialties).sort(),
          locations: sanitizeStrings(locations).sort()
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
      mentorDetail: selectedMentor
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  setSelectedFilter = event => {
    event.stopPropagation();

    this.setState({
      selectedContent: event.currentTarget.dataset.id
    });
  };

  handleSelectedSpecialty = event => {
    this.setState(
      {
        selectedSpecialty: event.target.value
      },
      () => {
        const { selectedSpecialty, mentors } = this.state;
        const filteredMentors = this.filterOnSpecialty(
          selectedSpecialty,
          mentors
        );
        this.setState({
          filteredMentors,
          selectedLocation: ""
        });
      }
    );
  };

  filterOnSpecialty = (specialty, mentors) => {
    const isMentor = mentor => mentor.specialty === specialty;
    return filter(isMentor, mentors);
  };

  handleSelectedLocation = event => {
    this.setState(
      {
        selectedLocation: event.target.value
      },
      () => {
        const { selectedLocation, mentors } = this.state;
        const filteredMentors = this.filterOnLocation(
          selectedLocation,
          mentors
        );
        this.setState({
          filteredMentors,
          selectedSpecialty: ""
        });
      }
    );
  };

  filterOnLocation = (location, mentors) => {
    const isMentor = mentor => mentor.location === location;
    return filter(isMentor, mentors);
  };

  render() {
    const { classes } = this.props;
    const {
      mentors,
      mentorDetail,
      specialties,
      selectedSpecialty,
      selectedLocation,
      filteredMentors,
      locations,
      selectedContent
    } = this.state;
    const mentorsToShow = filteredMentors ? filteredMentors : mentors;

    return (
      <div>
        <div className={classes.wrapper}>
          <SelectionPanel
            classes={classes}
            data={mentorDetail}
            state={this.state.value}
            specialties={specialties}
            selectedContent={selectedContent}
            locations={locations}
            selectedSpecialty={selectedSpecialty}
            selectedLocation={selectedLocation}
            handleSelectedSpecialty={this.handleSelectedSpecialty}
            setSelectedFilter={this.setSelectedFilter}
            handleSelectedLocation={this.handleSelectedLocation}
          />
          {mentorsToShow.map(mentor => (
            <Card className={classes.card} key={mentor.key}>
              <CardActionArea
                onClick={this.handleClickOpen("paper", mentor.key)}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      alt="Remy Sharp"
                      src={mentor.pictureName.i}
                      className={classes.bigAvatar}
                    />
                  }
                  title={mentor.name}
                  subheader={mentor.location}
                />
                <CardContent>
                  {mentor.mentorState && (
                    <blockquote className={classes.quote}>
                      {mentor.mentorState}
                    </blockquote>
                  )}
                  <Typography variant="body2">{mentor.specialty}</Typography>
                  {mentor.mail && <Typography gutterBottom variant="body2">
                    {mentor.mail}
                  </Typography>}
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
                      not available
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

        {mentorDetail && (
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
                  src={mentorDetail.pictureName.i}
                  className={classes.bigAvatar}
                />
                <span>
                  {mentorDetail.name}
                  <Typography variant="body2">
                    {mentorDetail.specialty}
                  </Typography>
                  <Typography gutterBottom variant="body2">
                    {mentorDetail.location}
                  </Typography>
                </span>
              </DialogTitle>

              <DialogContent>
                <DialogContentText>
                  {mentorDetail.description}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                {mentorDetail.fb && (
                  <Button onClick={this.handleClose} color="primary">
                    <a href={mentorDetail.fb} target="blank">
                      <img src={fbLogo} width="32px" alt="facebook" />
                    </a>
                  </Button>
                )}
                {mentorDetail.tw && (
                  <Button onClick={this.handleClose} color="primary">
                    <a href={mentorDetail.tw} target="blank">
                      <img src={twLogo} width="32px" alt="twitter" />
                    </a>
                  </Button>
                )}
                {mentorDetail.lk && (
                  <Button onClick={this.handleClose} color="primary">
                    <a href={mentorDetail.lk} target="blank">
                      <img src={inLogo} width="32px" alt="linkedin" />
                    </a>
                  </Button>
                )}
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

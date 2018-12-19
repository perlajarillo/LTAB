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
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { uniq, map, filter, compose } from "ramda";
import fbLogo from "../../images/facebook.png";
import twLogo from "../../images/twitter.png";
import inLogo from "../../images/linkedin.png";
import emailLogo from "../../images/email.png";
import phoneLogo from "../../images/phone-receiver.png";

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

const sanitizeStateStrings = compose(
  uniq,
  filter(Boolean)
);

const styles = theme => ({
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "160px",
    minHeight: "70vh"
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
    height: 100,
    backgroundColor: theme.palette.secondary
  },
  dialogTitle: {
    display: "flex",
    flexFlow: "row noWrap"
  },
  root: {
    width: "100%",
    zIndex: 1000,
    position: "fixed",
    top: "80px"
  },
  details: {
    width: "100%",
    overflow: "scroll",
    maxHeight: "350px"
  },
  socialIcon: {
    width: "32px"
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
  },
  welcomeText: {
    color: theme.palette.primary.dark,
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.75rem"
    },
    marginLeft: "auto",
    marginRight: 0,
    padding: 10
  },
  tutorialLink: {
    color: theme.palette.secondary.dark
  },
  tutorial: {
    display: "flex",
    backgroundColor: "#e8f5e9",
    marginLeft: "auto",
    marginRight: 0
  }
});

function SelectionPanel(props) {
  const {
    classes,
    specialties,
    states,
    selectedSpecialty,
    handleSelectedSpecialty,
    setSelectedFilter,
    selectedContent,
    selectedState,
    handleSelectedState,
    expanded
  } = props;

  return (
    <div className={classes.root}>
      <ExpansionPanel expanded={expanded}>
        <ExpansionPanelSummary>
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
              data-id="state"
              size="small"
              color="primary"
              onClick={setSelectedFilter}
            >
              State
            </Button>
          </div>
          <div className={classes.column}>
            <Button
              data-id="all"
              size="small"
              color="primary"
              onClick={setSelectedFilter}
            >
              All
            </Button>
          </div>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails className={classes.details}>
          {selectedContent && selectedContent === "specialty" && (
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
          )}
          {selectedContent && selectedContent === "state" && (
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup
                aria-label="Specialty"
                name="mentor-specialty"
                className={classes.group}
                value={selectedState}
                onChange={handleSelectedState}
              >
                {states &&
                  states.map((state, index) => (
                    <FormControlLabel
                      value={state}
                      control={<Radio />}
                      label={state}
                      key={`${state}_${index}`}
                    />
                  ))}
              </RadioGroup>
            </FormControl>
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <div className={classes.tutorial}>
        <Typography variant="body2" className={classes.welcomeText}>
          How to use this{" "}
          <a
            href="http://ior.ad/FGz"
            className={classes.tutorialLink}
            target="blank"
          >
            page
          </a>
        </Typography>
      </div>
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
      page: 0,
      open: false,
      scroll: "paper",
      value: "",
      specialties: [],
      states: [],
      selectedSpecialty: "",
      selectedState: "",
      filteredMentors: null,
      selectedContent: "specialty",
      allMentorsKeys: null,
      expanded: false
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
      let states = [];
      let keys = [];
      const mentorsData = Object.keys(data).map(mentorKey => {
        specialties.push(data[mentorKey].specialty);
        states.push(data[mentorKey].stateCode);
        keys.push(mentorKey);
        let mentorState =
          data[mentorKey].mentorState && data[mentorKey].mentorState;
        let imgUrl = data[mentorKey].pictureName;
        let setImgUrl =
          imgUrl === "" ||
          imgUrl === "NA" ||
          imgUrl === "/static/media/baseline_photo.2f761052.png"
            ? "https://via.placeholder.com/150/53833a/FFFFFF?text=mentor"
            : imgUrl;

        const city = toTitleCase(data[mentorKey].location);
        const state = data[mentorKey].stateCode;
        const mentorLocation = `${city}, ${state}`;

        const mentor = {
          key: mentorKey,
          name: toTitleCase(data[mentorKey].name),
          city: city,
          state: state,
          mentorLocation: mentorLocation,
          specialty: toTitleCase(data[mentorKey].specialty),
          available: data[mentorKey].available,
          description: data[mentorKey].description,
          pictureName: setImgUrl,
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
          states: sanitizeStateStrings(states).sort()
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
    event.preventDefault();
    const selectedFilter = event.currentTarget.dataset.id;

    selectedFilter === "all"
      ? this.setState({
          selectedState: "",
          selectedSpecialty: "",
          filteredMentors: null,
          selectedContent: "",
          expanded: false
        })
      : this.setState({
          selectedContent: selectedFilter,
          expanded: true
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
          selectedState: "",
          expanded: false
        });
      }
    );
  };

  filterOnSpecialty = (specialty, mentors) => {
    const isMentor = mentor => mentor.specialty === specialty;
    return filter(isMentor, mentors);
  };

  handleSelectedState = event => {
    this.setState(
      {
        selectedState: event.target.value
      },
      () => {
        const { selectedState, mentors } = this.state;
        const filteredMentors = this.filterOnState(selectedState, mentors);
        this.setState({
          filteredMentors,
          selectedSpecialty: "",
          expanded: false
        });
      }
    );
  };

  filterOnState = (state, mentors) => {
    const isMentor = mentor => mentor.state === state;
    return filter(isMentor, mentors);
  };

  handleChange = event => {
    const { expanded } = this.state;
    this.setState({
      expanded: expanded ? true : false
    });
  };

  render() {
    const { classes } = this.props;
    const {
      mentors,
      mentorDetail,
      specialties,
      selectedSpecialty,
      selectedState,
      filteredMentors,
      states,
      selectedContent,
      expanded
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
            states={states}
            selectedSpecialty={selectedSpecialty}
            selectedState={selectedState}
            handleSelectedSpecialty={this.handleSelectedSpecialty}
            setSelectedFilter={this.setSelectedFilter}
            handleSelectedState={this.handleSelectedState}
            expanded={expanded}
          />
          {mentorsToShow.map(mentor => (
            <Card className={classes.card} key={mentor.key}>
              <CardActionArea
                onClick={this.handleClickOpen("paper", mentor.key)}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      alt={mentor.name}
                      src={mentor.pictureName}
                      className={classes.bigAvatar}
                    />
                  }
                  title={mentor.name}
                  subheader={mentor.mentorLocation}
                />
                <CardContent>
                  {mentor.mentorState && (
                    <blockquote className={classes.quote}>
                      {mentor.mentorState}
                    </blockquote>
                  )}
                  <Typography variant="body2">{mentor.specialty}</Typography>
                  {mentor.mail && (
                    <Typography gutterBottom variant="body2">
                      {mentor.mail}
                    </Typography>
                  )}
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
                  src={mentorDetail.pictureName}
                  className={classes.bigAvatar}
                />
                <span>
                  {mentorDetail.name}
                  <Typography variant="body2">
                    {mentorDetail.specialty}
                  </Typography>
                  <Typography gutterBottom variant="body2">
                    {mentorDetail.mentorLocation}
                  </Typography>
                  {mentorDetail.phone && (
                    <Typography gutterBottom variant="body2">
                      <img
                        src={phoneLogo}
                        className={classes.socialIcon}
                        alt="phone-number"
                      />
                      {mentorDetail.phone}
                    </Typography>
                  )}
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
                      <img
                        src={fbLogo}
                        className={classes.socialIcon}
                        alt="facebook"
                      />
                    </a>
                  </Button>
                )}
                {mentorDetail.tw && (
                  <Button onClick={this.handleClose} color="primary">
                    <a href={mentorDetail.tw} target="blank">
                      <img
                        src={twLogo}
                        className={classes.socialIcon}
                        alt="twitter"
                      />
                    </a>
                  </Button>
                )}
                {mentorDetail.lk && (
                  <Button onClick={this.handleClose} color="primary">
                    <a href={mentorDetail.lk} target="blank">
                      <img
                        src={inLogo}
                        className={classes.socialIcon}
                        alt="linkedin"
                      />
                    </a>
                  </Button>
                )}
                {mentorDetail.mail && (
                  <Button onClick={this.handleClose} color="primary">
                    <a href={`mailto:${mentorDetail.mail}`}>
                      <img
                        src={emailLogo}
                        className={classes.socialIcon}
                        alt="linkedin"
                      />
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

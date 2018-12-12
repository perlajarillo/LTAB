import React, { Component } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import backgroundImg from "../../images/letstalk_logo_3.jpg";
import logo from "../../images/logo.png";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import icon_facebook from "../../images/icon_facebook.png";
import b_business from "../../images/b_business.jpg";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import { db } from "../../firebase";
import { map, compose } from "ramda";

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

const styles = theme => ({
  wrapper: {
    padding: "6em 0",
    /* [theme.breakpoints.up("sm")]: {
      padding: theme.mediumSection.padding
    }, */
    backgroundColor: "#fff"
  },
  pageTitle: {
    padding: theme.smallSection.padding,
    maxWidth: "80%",
    margin: "0 auto",
    [theme.breakpoints.up("sm")]: {
      padding: theme.smallSection.padding
    }
  },
  section: {
    padding: theme.sectionPadding.padding,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexFlow: "column wrap",
    backgroundColor: "#f1f8e9",
    [theme.breakpoints.up("lg")]: {
      flexFlow: "row nowrap",
      justifyContent: "space-evenly"
    }
  },
  mentorSection: {
    padding: "1rem 0",
    display: "flex",
    flexFlow: "row wrap",
    [theme.breakpoints.up("sm")]: {
      padding: theme.sectionPadding.padding
    }
  },
  sectionTitle: {
    padding: theme.smallSection.padding,
    flexGrow: 1,
    background: "#fff"
  },
  sectSocial: {
    padding: theme.smallSection.padding,
    flexGrow: 1,
    background: theme.palette.primary.dark
  },
  iconsSection: {
    padding: theme.sectionPadding.padding,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  socialIcon: {
    margin: "1em"
  },
  button: {
    padding: theme.spacing.unit * 2,
    color: "#fff",
    margin: "1em 0"
  },
  backImg: {
    background: "url(" + backgroundImg + ")",
    backgroundPosition: "center 70%",
    padding: "13% 0",
    backgroundSize: "contain"
  },

  logo: {
    width: "250px"
  },
  icon: {
    width: "64px"
  },
  card: {
    margin: theme.spacing.unit,
    width: 300,
    flexGrow: 1
  },
  bigAvatar: {
    margin: 10,
    width: 100,
    height: 100
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mentorsImgs: []
    };
  }

  componentDidMount() {
    this.regristerObserver = this.getMentorsInfo();
  }

  componentWillUnmount() {
    this.regristerObserver = null;
  }

  getMentorsInfo() {
    db.getMentors()
      .then(snapshot => {
        const data = snapshot.val();
        const mentorsData = Object.keys(data).map(mentorKey => {
          let imgUrl = data[mentorKey].pictureName;
          let setImgUrl =
            imgUrl === "" ||
            imgUrl === "NA" ||
            imgUrl === "/static/media/baseline_photo.2f761052.png"
              ? "https://via.placeholder.com/150/53833a/FFFFFF?text=mentor"
              : imgUrl;

          const mentorImg = {
            key: mentorKey,
            name: toTitleCase(data[mentorKey].name),
            specialty: toTitleCase(data[mentorKey].specialty),
            pictureName: setImgUrl
          };

          return mentorImg;
        });

        this.setState({
          mentorsImgs: mentorsData
        });
      })
      .catch(error => {
        console.log("error", error);
      });
  }

  render() {
    const { classes } = this.props;
    const { mentorsImgs } = this.state;

    return (
      <main className={classes.wrapper}>
        <div className={classes.backImg} />

        <div className={classes.pageTitle}>
          <Typography variant="h6" gutterBottom>
            Mentorship is incredibly important because it provides participating
            mentees with valuable insight to assist and guide them in creating,
            growing, and strengthening their businesses, and achieve success.
          </Typography>
          <Typography variant="h6" gutterBottom>
            It also provides mentors with insight into other business areas, and
            involves them in a wide business network!
          </Typography>
        </div>

        <div className={classes.section}>
          <div>
            <img src={logo} className={classes.logo} />
          </div>
          <div>
            <Typography variant="h6" gutterBottom align="center">
              Do you want to be a #LetsTalkAboutBusiness mentor?
            </Typography>
          </div>
          <div>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={Link}
              to="/newmentor"
              className={classes.button}
            >
              Create a mentor account
            </Button>
            <Typography variant="body1" gutterBottom align="center">
              Or please reach out to us through
            </Typography>
            <Typography variant="body1" gutterBottom align="center">
              email{" "}
              <a href="mailto:talkbusiness@flad.pt">talkbusiness@flad.pt</a>
            </Typography>
          </div>
        </div>
        <div className={classes.sectSocial}>
          <Typography variant="h6" align="center" style={{ color: "#fff" }}>
            Visit our Facebook page and Web Site to know more about the program
          </Typography>
          <div className={classes.iconsSection}>
            <a
              className={classes.socialIcon}
              href="https://www.facebook.com/TalkBusinessFlad/"
              target="blank"
            >
              <img src={icon_facebook} className={classes.icon} />
            </a>
            <a
              className={classes.socialIcon}
              href="https://www.flad.pt/en/lets-talk-about-business/"
              target="blank"
            >
              <img src={b_business} className={classes.icon} />
            </a>
          </div>
        </div>
        <div className={classes.section}>
          <div>
            <img src={b_business} className={classes.logo} />
          </div>
          <div>
            <Typography variant="h6" gutterBottom align="center">
              Are you looking for a mentor and your are not registered yet?
            </Typography>
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              to="/newmentee"
              className={classes.button}
            >
              Create a mentee account
            </Button>
          </div>
        </div>
        <div className={classes.sectionTitle}>
          <div>
            <Typography variant="h6">
              We are proud to introduce our Let's Talk about Business mentors
            </Typography>
          </div>
          <div className={classes.mentorSection}>
            {mentorsImgs &&
              mentorsImgs.map(mentor => (
                <Card className={classes.card} key={mentor.key}>
                  <CardHeader
                    avatar={
                      <Avatar
                        src={mentor.pictureName}
                        alt={mentor.name}
                        className={classes.bigAvatar}
                      />
                    }
                    title={mentor.name}
                    subheader={mentor.specialty}
                  />
                </Card>
              ))}
          </div>
        </div>
      </main>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);

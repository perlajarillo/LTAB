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
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../../firebase";
import { uniq, map, compose } from "ramda";

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
    padding: theme.smallSection.padding,
    [theme.breakpoints.up("sm")]: {
      padding: theme.mediumSection.padding
    },
    backgroundColor: "#fff"
  },
  pageTitle: {
    padding: "3rem 0",
    [theme.breakpoints.up("sm")]: {
      padding: theme.mediumSection.padding
    }
  },
  section: {
    padding: "3rem 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    backgroundColor: "#e0e0e0",
    [theme.breakpoints.up("sm")]: {
      padding: "6rem 0",
      flexWrap: "nowrap",
      justifyContent: "space-around"
    }
  },
  mentorSection: {
    padding: "1rem 0",
    display: "flex",
    flexFlow: "row wrap",
    [theme.breakpoints.up("sm")]: {
      padding: "3rem 0"
    }
  },
  sectionTitle: {
    padding: "1rem",
    flexGrow: 1,
    [theme.breakpoints.up("sm")]: {
      padding: "1.5rem"
    }
  },
  socialSection: {
    padding: "3rem 0",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      padding: "6rem 0",
      justifyContent: "space-around"
    }
  },
  button: {
    padding: theme.spacing.unit * 2,
    color: "#fff"
  },
  backImg: {
    background: "url(" + backgroundImg + ")",
    backgroundPosition: "center 70%",
    padding: "13% 0",
    backgroundSize: "contain"
  },

  logo: {
    width: "150px"
  },
  icon: {
    width: "50px",
    [theme.breakpoints.up("xs")]: {
      width: "40px"
    },
    [theme.breakpoints.up("sm")]: {
      width: "35px"
    },
    [theme.breakpoints.up("md")]: {
      width: "95px"
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "45px"
    }
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
    this.getMentorsInfo();
  }

  getMentorsInfo() {
    db.getMentors()
      .then(snapshot => {
        const data = snapshot.val();
        const mentorsData = Object.keys(data).map(mentorKey => {
          let imgUrl = data[mentorKey].pictureName;
          let setImgUrl =
            imgUrl === "" || imgUrl === "NA"
              ? "https://via.placeholder.com/100.png/09f/fff?text=mentor"
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
    const { classes, history } = this.props;
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
              fullWidth
              component={Link}
              to="/newmentor"
              className={classes.button}
            >
              Create a mentor account
            </Button>
          </div>
        </div>
        <div className={classes.sectionTitle}>
          <div>
            <Typography variant="h6">
              We are proud to introduce our Let's Talk about Business mentors:
            </Typography>
          </div>
          <div className={classes.mentorSection}>
            <Card className={classes.card}>
              <CardContent>
                <CardHeader
                  avatar={
                    <Avatar
                      src="https://via.placeholder.com/100.png/09f/fff?text=mentor"
                      alt="Join us"
                      className={classes.bigAvatar}
                    />
                  }
                  title={"Join us!"}
                />
              </CardContent>
            </Card>

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
              fullWidth
              component={Link}
              to="/newmentee"
              className={classes.button}
            >
              Create an account
            </Button>
          </div>
        </div>
        <div className={classes.sectionTitle}>
          <Typography variant="body1" align="center">
            Visit our Facebook page and Web Site to know more about the program:
          </Typography>
          <div className={classes.socialSection}>
            <a href="https://www.facebook.com/TalkBusinessFlad/" target="blank">
              <img src={icon_facebook} className={classes.icon} />
            </a>
            <a
              href="https://www.flad.pt/en/lets-talk-about-business/"
              target="blank"
            >
              <img src={b_business} className={classes.icon} />
            </a>
            <Typography variant="body1" gutterBottom align="center">
              Or please reach out to us through email to{"  "}
              <a href="mailto:talkbusiness@flad.pt">talkbusiness@flad.pt</a>
            </Typography>
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

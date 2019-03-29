import React, { Component } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import backgroundImg from "../../images/letstalk_logo_3.jpg";
import logo from "../../images/logo.png";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import b_business from "../../images/logo_square_transparent.png";
import quotes from "../../images/quotes.png";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../../firebase";
import { map, compose } from "ramda";
import img1 from "../../images/haley-phelps-433522-unsplash.jpg";
import img2 from "../../images/brooke-cagle-609874-unsplash.jpg";
import programData from "../Literals/Literals";

const { contact } = programData;
const { email } = contact;

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
    backgroundColor: "#fff"
  },
  mainSection: {
    padding: 0,
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    [theme.breakpoints.up("sm")]: {
      justifyContent: "center",
      padding: theme.smallSection.padding
    },
    [theme.breakpoints.up("md")]: {
      padding: "0 1.5rem 3rem 1.5rem",
      flexFlow: "row nowrap",
      justifyContent: "space-between"
    }
  },
  pageTitle: {
    padding: "0 1.5em",
    fontSize: "0.5em",
    margin: "0 auto",
    alignSelf: "center",
    [theme.breakpoints.up("md")]: {
      flexShrink: 2,
      paddingTop: "2.1rem"
    }
  },
  backImg: {
    background: "url(" + backgroundImg + ")",
    backgroundPosition: "center 70%",
    backgroundRepeat: "no-repeat",
    padding: "12% 0",
    marginBottom: "1rem",
    backgroundSize: "contain",
    width: "100vw",
    [theme.breakpoints.up("sm")]: {
      width: "90%"
    }
  },
  sectionMentor: {
    padding: theme.sectionPadding.padding,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      justifyContent: "space-evenly"
    }
  },
  sectionMentee: {
    padding: theme.sectionPadding.padding,
    display: "flex",
    flexDirection: "column-reverse",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f8e9",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      justifyContent: "space-evenly"
    }
  },
  createAccSec: {
    display: "inherit",
    flexDirection: "column",
    alignItems: "center"
  },
  createAccText: {
    maxWidth: "80%",
    justifyContent: "flex-start",
    [theme.breakpoints.up("md")]: {
      maxWidth: "40%",
      padding: "1em"
    }
  },
  quotesImg: {
    height: "4em",
    background: `url(${quotes})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    [theme.breakpoints.down("sm")]: {
      backgroundSize: "contain"
    }
  },
  divider: {
    height: "1px",
    width: "80vw",
    margin: "1.5em 0",
    backgroundColor: "#022c00",
    opacity: 0.8,
    [theme.breakpoints.up("md")]: {
      height: "500px",
      width: "1px"
    },
    [theme.breakpoints.up("lg")]: {
      height: "600px",
      width: "1px"
    }
  },
  mentorsCards: {
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
  joinUsSec: {
    padding: "1em",
    flexGrow: 1,
    background: "#f1f8e9"
  },
  joinUs: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "1em"
  },
  joinUsLinks: {
    textDecoration: "none",
    scrollBehavior: "smooth",
    color: theme.palette.secondary.dark,
    borderBottom: "1px solid currentColor"
  },
  joinUsBtn: {
    margin: theme.spacing.unit
  },
  iconsSection: {
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
  galeryImg: {
    width: "100%"
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
      mentorsImgs: [],
      loading: true
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
          mentorsImgs: mentorsData,
          loading: false
        });
      })
      .catch(error => {
        console.log("error", error);
      });
  }

  render() {
    const { classes } = this.props;
    const { mentorsImgs, loading } = this.state;

    return (
      <main className={classes.wrapper}>
        <div className={classes.mainSection}>
          <div className={classes.backImg} />
          <div className={classes.pageTitle}>
            <Typography variant="subtitle1" gutterBottom>
              Mentorship is incredibly important because it provides
              participating mentees with valuable insight to assist and guide
              them in creating, growing, and strengthening their businesses, and
              achieve success.
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              It also provides mentors with insight into other business areas,
              and involves them in a wide business network!
            </Typography>
          </div>
        </div>
        <div className={classes.joinUsSec}>
          <Typography variant="h5" align="center" style={{ color: "#000" }}>
            Join us!
          </Typography>
          <div className={classes.joinUs}>
            <div>
              <Button size="small" className={classes.joinUsBtn}>
                <a href="#mentor" className={classes.joinUsLinks}>
                  As mentor
                </a>
              </Button>
            </div>
            <div>
              <Button size="small" className={classes.joinUsBtn}>
                <a href="#mentee" className={classes.joinUsLinks}>
                  As mentee
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div id="mentor" className={classes.sectionMentor}>
          <div className={classes.createAccText}>
            <div className={classes.quotesImg} />
            <Typography variant="h6" gutterBottom>
              Mentors are experts with goodwill. They can advise others on how
              to be a successful person. Connect with people of different
              backgrounds, become a mentor!
            </Typography>
            <img src={img1} alt="" className={classes.galeryImg} />
          </div>
          <div className={classes.divider} />
          <div className={classes.createAccSec}>
            <img src={logo} alt="" className={classes.logo} />
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
                email <a href={"mailto:" + email}>{email}</a>
              </Typography>
            </div>
          </div>
        </div>
        <div id="mentee" className={classes.sectionMentee}>
          <div className={classes.createAccSec}>
            <img src={b_business} alt="" className={classes.logo} />
            <div>
              <Typography variant="h6" gutterBottom align="center">
                Are you looking for a mentor and you are not registered yet?
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
          <div className={classes.divider} />
          <div className={classes.createAccText}>
            <div className={classes.quotesImg} />
            <Typography variant="h6" gutterBottom>
              As a mentee, you can have to your side a mentor whose experiences
              can guide you to surpass your goals.
            </Typography>
            <img src={img2} alt="" className={classes.galeryImg} />
          </div>
        </div>
        <div className={classes.sectionTitle}>
          <div>
            <Typography variant="h6">
              We are proud to introduce our Let's Talk about Business mentors
            </Typography>
          </div>
          <div className={classes.mentorsCards}>
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

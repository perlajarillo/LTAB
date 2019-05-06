import React, { Component } from "react";

import PropTypes from "prop-types";
import logos from "../../images/letstalk_logo_3.jpg";
import { withStyles } from "@material-ui/core/styles";
import { getMentors, getMentees } from "../../firebase/operations";
import ReactToPrint from "react-to-print";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import PrintIcon from "@material-ui/icons/Print";
import Button from "@material-ui/core/Button";
import { sortBy, compose, toLower, prop } from "ramda";
import Progress from "../Progress/Progress";
import programData from "../Literals/Literals";

const { program } = programData;

const sortByName = sortBy(
  compose(
    toLower,
    prop("name")
  )
);

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
    width: 400,
    height: 200,
    orientation: "center",
    marginBottom: 10
  },
  heading: {
    textAlign: "center"
  },
  text: {
    marginLeft: "7%",
    paddingBottom: 10
  },
  tableContainer: {
    marginTop: theme.spacing.unit * 1,
    marginLeft: "7%",
    width: "85%",
    overflowX: "auto"
  },
  menteesSection: {
    pageBreakBefore: "always",
    marginTop: theme.spacing.unit * 6
  },
  row: {
    pageBreakAfter: "auto",
    pageBreakInside: "auto"
  },
  table: {
    pageBreakInside: "auto"
  },
  columnTitles: { display: "table-row-group" },
  totalInList: {
    display: "flex"
  },
  personalizedCell: {
    maxWidth: 150
  }
});

const mentorsRows = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name"
  },
  {
    id: "specialty",
    numeric: false,
    disablePadding: true,
    label: "Specialty"
  },
  {
    id: "mail",
    numeric: false,
    disablePadding: false,
    label: "e-mail"
  },
  {
    id: "phone",
    numeric: false,
    disablePadding: false,
    label: "Phone"
  },
  {
    id: "available",
    numeric: false,
    disablePadding: true,
    label: "Available"
  }
];

const menteesRows = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name"
  },
  {
    id: "mail",
    numeric: false,
    disablePadding: true,
    label: "e-mail"
  },
  {
    id: "location",
    numeric: false,
    disablePadding: false,
    label: "Location"
  },

  {
    id: "descendent",
    numeric: false,
    disablePadding: false,
    label: "Descendent"
  }
];

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 12,
    width: "100px"
  }
}))(TableCell);

class ToPrint extends React.Component {
  render() {
    const { classes, state } = this.props;
    const { totalMentors, totalMentees, mentors, mentees } = state;
    return (
      <div>
        <div className={classes.heading}>
          <img src={logos} alt={program.name} className={classes.logos} />
          <hr />
        </div>
        <Typography variant="h6" className={classes.text} gutterBottom>
          Report of mentors and mentees participating in {program.name} Program:
        </Typography>
        <Typography variant="body2" gutterBottom className={classes.text}>
          Date: {new Date().toLocaleString()}
        </Typography>
        <div className={classes.totalInList}>
          <Typography variant="body1" gutterBottom className={classes.text}>
            Total of mentors: {totalMentors}
          </Typography>
          <Typography variant="body1" gutterBottom className={classes.text}>
            Total of mentees: {totalMentees}
          </Typography>
        </div>
        <Typography variant="h6" className={classes.text}>
          List of mentors:
        </Typography>
        <div className={classes.tableContainer}>
          <Table aria-labelledby="tableTitle">
            <TableHead className={classes.columnTitles}>
              <TableRow>
                {mentorsRows.map(row => {
                  return (
                    <CustomTableCell
                      key={row.id}
                      padding={row.disablePadding ? "default" : "none"}
                    >
                      {row.label}
                    </CustomTableCell>
                  );
                }, this)}
              </TableRow>
            </TableHead>
            <TableBody>
              {mentors ? (
                mentors.map(mentor => {
                  return (
                    <TableRow
                      tabIndex={-1}
                      key={mentor.name}
                      className={classes.row}
                    >
                      <CustomTableCell
                        padding="checkbox"
                        className={classes.personalizedCell}
                      >
                        {mentor.name}
                      </CustomTableCell>
                      <CustomTableCell padding="none">
                        {mentor.specialty}
                      </CustomTableCell>
                      <CustomTableCell padding="none">
                        {mentor.mail}
                      </CustomTableCell>
                      <CustomTableCell padding="none">
                        {mentor.phone}
                      </CustomTableCell>
                      <CustomTableCell>{mentor.available}</CustomTableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow tabIndex={-1} className={classes.row}>
                  <CustomTableCell colSpan={5}>
                    Loading information...
                  </CustomTableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className={classes.menteesSection}>
          {" "}
          <Typography variant="h6" className={classes.text}>
            {" "}
            List of mentees:
          </Typography>
          <div className={classes.tableContainer}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <TableHead className={classes.columnTitles}>
                <TableRow>
                  {menteesRows.map(row => {
                    return (
                      <CustomTableCell
                        key={row.id}
                        padding={row.disablePadding ? "default" : "none"}
                      >
                        {row.label}
                      </CustomTableCell>
                    );
                  }, this)}
                </TableRow>
              </TableHead>
              <TableBody>
                {mentees ? (
                  mentees.map(mentee => {
                    return (
                      <TableRow tabIndex={-1} key={mentee.name}>
                        <CustomTableCell
                          padding="checkbox"
                          className={classes.personalizedCell}
                        >
                          {mentee.name}
                        </CustomTableCell>
                        <CustomTableCell padding="default">
                          {mentee.email}
                        </CustomTableCell>
                        <CustomTableCell padding="none">
                          {mentee.location}
                        </CustomTableCell>
                        <CustomTableCell padding="none">
                          {mentee.descendent}
                        </CustomTableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow tabIndex={-1} className={classes.row}>
                    <CustomTableCell colSpan={4}>
                      Loading information...
                    </CustomTableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mentors: [],
      mentees: [],
      totalMentors: "",
      totalMentees: "",
      order: "asc",
      orderBy: "name",
      orderM: "asc",
      orderByM: "name",
      loading: true
    };
  }

  getMentors = () => {
    getMentors()
      .then(snapshot => {
        const data = snapshot.val();
        const totalMentors = Object.keys(snapshot.val()).length;
        const mentorsData = Object.keys(data).map(mentorKey => {
          const mentorsInfo = {
            name: data[mentorKey].name,
            specialty: data[mentorKey].specialty,
            mail: this.verifyEmptyStrings(data[mentorKey].mail),
            phone: this.verifyEmptyStrings(data[mentorKey].phone),
            available: data[mentorKey].available ? "Yes" : "No"
          };
          return mentorsInfo;
        });

        this.setState({
          mentors: sortByName(mentorsData),
          totalMentors: totalMentors,
          loading: false
        });
      })
      .catch(
        this.setState({
          mentors: "",
          totalMentors: ""
        })
      );
  };

  getAllMentees = () => {
    getMentees()
      .then(snapshot => {
        const data = snapshot.val();
        const totalMentees = Object.keys(snapshot.val()).length;
        const menteesData = Object.keys(data).map(menteeKey => {
          const menteesInfo = {
            name: data[menteeKey].name,
            email: data[menteeKey].email,
            location: data[menteeKey].location,
            descendent: data[menteeKey].descendent
          };
          return menteesInfo;
        });

        this.setState({
          mentees: sortByName(menteesData),
          totalMentees: totalMentees
        });
      })
      .catch(
        this.setState({
          mentees: "",
          totalMentees: ""
        })
      );
  };

  verifyEmptyStrings = string => {
    if (string === "") string = "-";
    return string;
  };

  getData = () => {
    this.getMentors();
    this.getAllMentees();
  };
  componentDidMount() {
    if (this.props.authUser) {
      this.unregisterObserver = this.getData();
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getData();
    }
  }
  componentWillUnmount() {
    this.unregisterObserver = null;
  }

  render() {
    const { classes } = this.props;
    const { loading } = this.state;

    return loading ? (
      <Progress />
    ) : (
      <div className={classes.root}>
        <ReactToPrint
          trigger={() => (
            <Button
              size="small"
              variant="extendedFab"
              color="default"
              className={classes.button}
            >
              <PrintIcon />
              Print{" "}
            </Button>
          )}
          content={() => this.componentRef}
        />

        <br />
        <br />
        <Card className={classes.card}>
          <ToPrint
            ref={el => (this.componentRef = el)}
            state={this.state}
            classes={classes}
          />
        </Card>
      </div>
    );
  }
}

Reports.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Reports);

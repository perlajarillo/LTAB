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
    width: 500,
    height: 120,
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
  linkStyle: {
    margin: "0.5em",
    textDecoration: "none"
  },
  menteesSection: {
    pageBreakBefore: "always",
    marginTop: theme.spacing.unit * 6
  }
});

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0][1], b[0][1]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

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
    disablePadding: false,
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
    disablePadding: false,
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

class EnhancedTableHead extends React.Component {
  render() {
    const { rows } = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(row => {
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
    );
  }
}

EnhancedTableHead.propTypes = {
  rowCount: PropTypes.number.isRequired,
  rows: PropTypes.array.isRequired
};

class ComponentToPrint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mentors: {},
      totalMentors: "",
      order: "asc",
      orderBy: "name",
      orderM: "asc",
      orderByM: "name"
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
  getAllMentees = () => {
    getMentees()
      .then(snapshot => {
        this.setState({
          mentees: snapshot.val(),
          totalMentees: Object.keys(snapshot.val()).length
        });
      })
      .catch(
        this.setState({
          mentees: "",
          totalMentees: ""
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
      this.getAllMentees();
    }
  }
  componentWillUnmount() {
    this.unregisterObserver = null;
  }
  render() {
    const { classes } = this.props;
    const {
      totalMentors,
      totalMentees,
      mentors,
      mentees,
      order,
      orderBy,
      orderM,
      orderByM
    } = this.state;
    return (
      <div>
        <div className={classes.heading}>
          <img src={logos} alt="FLAD-Mentorship" className={classes.logos} />
          <hr />
        </div>
        <Typography variant="h6" className={classes.text} gutterBottom>
          {" "}
          Report of mentors and mentees participating in FLAD-Mentorship
          Program:
        </Typography>
        \
        <Typography variant="body2" gutterBottom className={classes.text}>
          {" "}
          Date: {new Date().toLocaleString()}
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.text}>
          {" "}
          Total of mentors: {totalMentors} Total of mentees: {totalMentees}
        </Typography>
        <br />
        <Typography variant="h6" className={classes.text}>
          {" "}
          List of mentors:
        </Typography>
        {mentors ? (
          <div className={classes.tableContainer}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                rowCount={Object.keys(mentors).length}
                rows={mentorsRows}
              />
              <TableBody>
                {stableSort(
                  Object.entries(mentors),
                  getSorting(order, orderBy)
                ).map(n => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={n[0]}
                      className={classes.row}
                    >
                      <CustomTableCell
                        padding="checkbox"
                        className={classes.personalizedCell}
                      >
                        {n[1].name}
                      </CustomTableCell>
                      <CustomTableCell padding="none">
                        {n[1].specialty}
                      </CustomTableCell>
                      <CustomTableCell padding="none">
                        {n[1].mail}
                      </CustomTableCell>
                      <CustomTableCell padding="none">
                        {n[1].phone}
                      </CustomTableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className={classes.root}>
            <Typography variant="body1"> Loading content...</Typography>
          </div>
        )}
        <br />
        <div className={classes.menteesSection}>
          {" "}
          <Typography variant="h6" className={classes.text}>
            {" "}
            List of mentees:
          </Typography>
          {mentees ? (
            <div className={classes.tableContainer}>
              <Table className={classes.table} aria-labelledby="tableTitle">
                <EnhancedTableHead
                  rowCount={Object.keys(mentees).length}
                  rows={menteesRows}
                />
                <TableBody>
                  {stableSort(
                    Object.entries(mentees),
                    getSorting(orderM, orderByM)
                  ).map(n => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={n[0]}
                        className={classes.row}
                      >
                        <CustomTableCell
                          padding="checkbox"
                          className={classes.personalizedCell}
                        >
                          {n[1].name}
                        </CustomTableCell>
                        <CustomTableCell padding="none">
                          {n[1].email}
                        </CustomTableCell>
                        <CustomTableCell className={classes.personalizedCell}>
                          {n[1].location}
                        </CustomTableCell>
                        <CustomTableCell padding="none">
                          {n[1].descendent}
                        </CustomTableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className={classes.root}>
              <Typography variant="h5"> Loading information.</Typography>
            </div>
          )}
        </div>
      </div>
    );
  }
}

class Reports extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Button
          size="small"
          variant="extendedFab"
          color="default"
          aria-label="Add"
          className={classes.button}
        >
          <PrintIcon />
          <ReactToPrint
            trigger={() => (
              <a href="#" className={classes.linkStyle}>
                Print
              </a>
            )}
            content={() => this.componentRef}
          />
        </Button>
        <br />
        <br />
        <Card className={classes.card}>
          <ComponentToPrint
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

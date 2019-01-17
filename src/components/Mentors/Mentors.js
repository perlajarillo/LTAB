import React from "react";
import withAuthorization from "../WithAuthorization";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import { getMentors } from "../../firebase/operations";
import TextField from "@material-ui/core/TextField";
import { Redirect } from "react-router-dom";
import EnhancedTableHead from "../Tables/EnhancedTabledHead";
import { stableSort, getSorting, arrayToObject } from "../Tables/functions";

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
    marginLeft: "1%",
    width: "98%",
    overflowX: "auto"
  },
  wrapper: {
    margin: "100px 0",
    minHeight: "80vh"
  },
  title: {
    margin: "10px 32px"
  },
  button: {
    marginLeft: 20,
    marginTop: 20,
    [theme.breakpoints.down("xs")]: {
      marginLeft: 5
    },
    [theme.breakpoints.between("sm", "md")]: {
      marginLeft: 5
    }
  },

  textField: {
    width: 400
  },

  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    },
    textDecoration: "none"
  },
  table: {
    minWidth: 700
  },
  tableWrapper: {
    overflowX: "auto"
  },
  titleRow: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    margin: theme.spacing.unit * 2,
    [theme.breakpoints.up("sm")]: {
      justifyContent: "space-between"
    }
  },
  searchBar: {
    marginRight: 20,
    display: "flex",
    flexWrap: "wrap",
    [theme.breakpoints.up("sm")]: {
      justifyContent: "space-between"
    }
  },
  personalizedCell: {
    width: "7px",
    align: "center",
    whiteSpace: "nowrap"
  },
  welcomeText: {
    color: theme.palette.primary.light
  },
  tutorialLink: {
    color: theme.palette.secondary.dark
  }
});

const rows = [
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
    id: "location",
    numeric: true,
    disablePadding: false,
    label: "Location "
  },
  {
    id: "available",
    numeric: false,
    disablePadding: false,
    label: "Available"
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

const MentorsList = ({
  state,
  classes,
  isSelected,
  handleRequestSort,
  handleChangePage,
  handleChangeRowsPerPage
}) => {
  const {
    mentors,

    uid,
    order,
    orderBy,
    rowsPerPage,
    page,
    mentorKey
  } = state;
  const emptyRows = mentors
    ? rowsPerPage - Math.min(rowsPerPage, mentors.length - page * rowsPerPage)
    : 0;

  return (
    <div className={classes.root}>
      {mentors ? (
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                mentorKey={mentorKey}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={Object.keys(mentors).length}
                rows={rows}
                CustomTableCell={CustomTableCell}
              />
              <TableBody>
                {stableSort(Object.entries(mentors), getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    const itIsSelected = isSelected(n[0]);
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={itIsSelected}
                        tabIndex={-1}
                        key={n[0]}
                        selected={itIsSelected}
                        className={classes.row}
                      >
                        <CustomTableCell
                          padding="checkbox"
                          className={classes.personalizedCell}
                        >
                          <Radio
                            component={Link}
                            to={{
                              pathname: "/Mentor",
                              state: {
                                mentor: n[1],
                                key: n[0],
                                authUser: uid
                              }
                            }}
                          />
                        </CustomTableCell>

                        <CustomTableCell padding="default">
                          {n[1].name}
                        </CustomTableCell>
                        <CustomTableCell padding="default">
                          {n[1].specialty}
                        </CustomTableCell>
                        <CustomTableCell padding="none">
                          {n[1].mail}
                        </CustomTableCell>
                        <CustomTableCell padding="none">
                          {n[1].phone}
                        </CustomTableCell>
                        <CustomTableCell padding="none">
                          {n[1].location + ", " + n[1].stateCode}
                        </CustomTableCell>
                        <CustomTableCell padding="none">
                          {n[1].available ? "Yes" : "No"}
                        </CustomTableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            component="div"
            count={Object.keys(mentors).length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              "aria-label": "Previous Page"
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page"
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <div className={classes.root}>
          <Typography variant="h5"> Loading data... </Typography>
        </div>
      )}
    </div>
  );
};

class Mentors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mentors: [],
      uid: "",
      open: false,
      mentorKey: "",
      order: "desc",
      orderBy: "name",
      selected: [],
      page: 0,
      rowsPerPage: 25,
      mentorData: {},
      filterApplied: false,
      specialty: ""
    };
  }
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleClick = (event, key, mentorData) => {
    this.state.mentorKey === key
      ? this.setState({ mentorKey: "", mentorData: {} })
      : this.setState({ mentorKey: key, mentorData: mentorData });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  /**
   * handleChange – the handleChange sets the specialty wrote in the state
   * @param {Object} the object name and event
   * @return {void}
   */
  handleChange = event => {
    const { target } = event;
    const { value, name } = target;
    this.setState({
      [name]: value
    });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = key => this.state.mentorKey === key;

  filterBySpecialty = () => {
    const specialty = this.state.specialty;
    if (specialty.trim().length > 0) {
      const mentorsBySpecialty = arrayToObject(
        Object.entries(this.state.mentorsMirror).filter(mentor =>
          mentor[1].specialty.toLowerCase().includes(specialty.toLowerCase())
        )
      );
      this.setState({
        mentors: mentorsBySpecialty,
        filterApplied: true
      });
    }
  };

  getMentors = () => {
    getMentors()
      .then(snapshot => {
        this.setState({
          mentors: snapshot.val(),
          mentorsMirror: snapshot.val(),
          filterApplied: false
        });
      })
      .catch(
        this.setState({
          mentors: "",
          mentorsMirror: "",
          filterApplied: false
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
    const { classes, authUser } = this.props;
    const { from } = this.props.location.state || {
      from: { pathname: "/nofound" }
    };
    const { uid } = this.state;
    return (
      <div className={classes.wrapper}>
        {!authUser.rol === "admin" && <Redirect to={from} />}
        <div className={classes.title}>
          <Typography variant="h5" gutterBottom color="primary">
            Mentor's administration
          </Typography>
          <div>
            <Typography variant="caption" className={classes.welcomeText}>
              {" "}
              Read this{" "}
              <a
                href="http://ior.ad/FHS"
                className={classes.tutorialLink}
                target="blank"
              >
                tutorial
              </a>{" "}
              if you need help using this site.
            </Typography>
          </div>
        </div>
        <div className={classes.titleRow}>
          <Button
            size="small"
            variant="extendedFab"
            color="primary"
            aria-label="Add"
            className={classes.button}
            component={Link}
            to={{
              pathname: "/Mentor",
              state: {
                authUser: uid
              }
            }}
          >
            <AddIcon /> Add new mentor
          </Button>

          <div className={classes.searchBar}>
            {" "}
            <TextField
              id="specialty"
              name="specialty"
              label="Filter by specialty"
              placeholder="e.g. Accountant"
              className={classes.textField}
              onChange={this.handleChange}
              margin="normal"
            />
            <Button
              size="small"
              variant="extendedFab"
              color="default"
              aria-label="Search"
              className={classes.button}
              onClick={this.filterBySpecialty}
            >
              <SearchIcon /> Search
            </Button>
            <Button
              size="small"
              variant="extendedFab"
              color="default"
              aria-label="Show all mentors"
              className={classes.button}
              onClick={this.getMentors}
            >
              Show all mentors
            </Button>
          </div>
        </div>
        <MentorsList
          classes={classes}
          state={this.state}
          filterBySpecialty={this.filterBySpecialty}
          isSelected={this.isSelected}
          handleClick={this.handleClick}
          handleRequestSort={this.handleRequestSort}
          handleChange={this.handleChange}
          handleChangePage={this.handleChangePage}
          handleChangeRowsPerPage={this.handleChangeRowsPerPage}
          getMentors={this.getMentors}
        />
      </div>
    );
  }
}
const StyledMentors = withStyles(styles)(Mentors);
const authMentors = authUser => Boolean(authUser);

export default withAuthorization(authMentors)(StyledMentors);

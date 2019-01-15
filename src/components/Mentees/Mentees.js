import React from "react";
import withAuthorization from "../WithAuthorization";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
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
import { getMentees } from "../../firebase/operations";
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
    marginRight: 0,
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

  titleText: {
    color: theme.palette.primary.main,
    marginLeft: "32px",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "8px"
    }
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
    backgroundColor: "#c62828",
    color: theme.palette.common.white
  },
  body: {
    fontSize: 12,
    width: "100px"
  }
}))(TableCell);

const MenteesList = ({
  state,
  classes,
  filterByLocation,
  isSelected,
  handleRequestSort,
  handleChangePage,
  handleChange,
  handleChangeRowsPerPage,
  getAllMentees
}) => {
  const { mentees, uid, order, orderBy, rowsPerPage, page, menteeKey } = state;
  const emptyRows = mentees
    ? rowsPerPage - Math.min(rowsPerPage, mentees.length - page * rowsPerPage)
    : 0;

  return (
    <div className={classes.root}>
      <div className={classes.titleRow}>
        <div className={classes.searchBar}>
          {" "}
          <TextField
            id="location"
            name="location"
            label="Filter by location"
            placeholder="e.g. New England"
            className={classes.textField}
            onChange={handleChange}
            margin="normal"
          />
          <Button
            size="small"
            variant="extendedFab"
            color="secondary"
            aria-label="Add"
            className={classes.button}
            onClick={filterByLocation}
          >
            <SearchIcon /> Search
          </Button>
          <Button
            size="small"
            variant="extendedFab"
            color="default"
            aria-label="Add"
            className={classes.button}
            onClick={getAllMentees}
          >
            Show all mentees
          </Button>
        </div>
      </div>
      {mentees ? (
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                menteeKey={menteeKey}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={Object.keys(mentees).length}
                rows={rows}
                CustomTableCell={CustomTableCell}
              />
              <TableBody>
                {stableSort(Object.entries(mentees), getSorting(order, orderBy))
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
                              pathname: "/Mentee",
                              state: {
                                mentee: n[1],
                                key: n[0],
                                authUser: uid
                              }
                            }}
                          />
                        </CustomTableCell>

                        <CustomTableCell padding="none">
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
            count={Object.keys(mentees).length}
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
          <Typography variant="h5"> You don't have any mentees yet.</Typography>
        </div>
      )}
    </div>
  );
};

class Mentees extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mentees: [],
      uid: "",
      open: false,
      menteeKey: "",
      order: "desc",
      orderBy: "name",
      selected: [],
      page: 0,
      rowsPerPage: 25,
      menteeData: {},
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

  handleClick = (event, key, menteeData) => {
    this.state.menteeKey === key
      ? this.setState({ menteeKey: "", menteeData: {} })
      : this.setState({ menteeKey: key, menteeData: menteeData });
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

  isSelected = key => this.state.menteeKey === key;

  filterByLocation = () => {
    const location = this.state.location;
    if (location.trim().length > 0) {
      const menteesByLocation = arrayToObject(
        Object.entries(this.state.menteesMirror).filter(mentee =>
          mentee[1].location.toLowerCase().includes(location.toLowerCase())
        )
      );
      this.setState({
        mentees: menteesByLocation,
        filterApplied: true
      });
    }
  };

  getAllMentees = () => {
    getMentees()
      .then(snapshot => {
        this.setState({
          mentees: snapshot.val(),
          menteesMirror: snapshot.val(),
          filterApplied: false
        });
      })
      .catch(
        this.setState({
          mentees: "",
          menteesMirror: "",
          filterApplied: false
        })
      );
  };

  componentDidMount() {
    if (this.props.authUser) {
      this.unregisterObserver = this.getAllMentees();
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getAllMentees();
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

    return (
      <div className={classes.wrapper}>
        {!authUser.rol === "admin" && <Redirect to={from} />}
        <div className={classes.root}>
          <Typography variant="h5" gutterBottom className={classes.titleText}>
            Mentees' administration
          </Typography>
          <MenteesList
            classes={classes}
            state={this.state}
            filterByLocation={this.filterByLocation}
            isSelected={this.isSelected}
            handleClick={this.handleClick}
            handleRequestSort={this.handleRequestSort}
            handleChange={this.handleChange}
            handleChangePage={this.handleChangePage}
            handleChangeRowsPerPage={this.handleChangeRowsPerPage}
            getAllMentees={this.getAllMentees}
          />
        </div>
      </div>
    );
  }
}
const StyledMentees = withStyles(styles)(Mentees);
const authMentees = authUser => Boolean(authUser);

export default withAuthorization(authMentees)(StyledMentees);

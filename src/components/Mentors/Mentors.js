import React from "react";
import withAuthorization from "../WithAuthorization";
import classNames from "classnames";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Radio from "@material-ui/core/Radio";
import { getMentors, deleteMentor } from "../../firebase/operations";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "../SnackbarContentComponent/SnackbarContentComponent";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing.unit * 3
  },
  wrapper: {
    margin: "100px 0",
    minHeight: "80vh"
  },
  sectionStyles: {
    marginTop: "100%",
    [theme.breakpoints.up("sm")]: {
      marginTop: "60%"
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "0%"
    },
    [theme.breakpoints.between("sm", "md")]: {
      marginTop: "0%",
      marginLeft: "10%"
    }
  },

  container: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: theme.spacing.unit * 3
  }
});

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}
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
  },
  {
    id: "location",
    numeric: true,
    disablePadding: false,
    label: "Location "
  },
  {
    id: "linkedin",
    numeric: false,
    disablePadding: false,
    label: " LinkedIn"
  },
  { id: "twitter", numeric: false, disablePadding: false, label: "Twitter" },
  { id: "facebook", numeric: false, disablePadding: false, label: "Facebook" }
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
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          <CustomTableCell padding="checkbox" />
          {rows.map(row => {
            return (
              <CustomTableCell
                key={row.id}
                padding={row.disablePadding ? "none" : "none"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </CustomTableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 50%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
});

let EnhancedTableToolbar = props => {
  const {
    mentorKey,
    classes,
    handleClickDeleteMentor,
    mentorData,
    uid
  } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: mentorKey !== ""
      })}
    >
      <div className={classes.title}>
        {mentorKey !== "" ? (
          <Typography color="inherit" variant="subtitle1">
            {1} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            All mentors
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {mentorKey !== "" ? (
          <div>
            <Tooltip title="Delete">
              <IconButton
                aria-label="Delete"
                color="primary"
                onClick={handleClickDeleteMentor}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton
                size="small"
                color="primary"
                component={Link}
                to={{
                  pathname: "/newMentor",
                  state: {
                    mentor: mentorData,
                    key: mentorKey,
                    authUser: uid
                  }
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </div>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};
EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  mentorKey: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  mentorData: PropTypes.object.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const MentorsList = ({
  state,
  classes,
  handleClickDeleteMentor,
  handleClose,
  handleDeleteMentor,
  isSelected,
  handleClick,
  handleRequestSort,
  handleChangePage,
  handleChangeRowsPerPage
}) => {
  const {
    mentors,
    open,
    uid,
    order,
    orderBy,
    rowsPerPage,
    page,
    mentorKey,
    mentorData
  } = state;
  const emptyRows = mentors
    ? rowsPerPage - Math.min(rowsPerPage, mentors.length - page * rowsPerPage)
    : 0;
  const mentorsData = [];
  return (
    <div className={classes.root}>
      <div className={classes.titleRow}>
        <Button
          size="small"
          variant="extendedFab"
          color="primary"
          aria-label="Add"
          className={classes.button}
          component={Link}
          to={{
            pathname: "/newMentor",
            state: {
              authUser: uid
            }
          }}
        >
          <AddIcon /> Add new mentor
        </Button>
      </div>
      {mentors ? (
        <Paper className={classes.root}>
          <EnhancedTableToolbar
            mentorKey={mentorKey}
            handleClickDeleteMentor={handleClickDeleteMentor}
            uid={uid}
            mentorData={mentorData}
          />
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                mentorKey={mentorKey}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={Object.keys(mentors).length}
              />
              <TableBody>
                {stableSort(Object.entries(mentors), getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    const itIsSelected = isSelected(n[0]);
                    return (
                      <TableRow
                        hover
                        onClick={event => handleClick(event, n[0], n[1])}
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
                          <Radio checked={mentorKey === n[0]} color="primary" />
                        </CustomTableCell>
                        <CustomTableCell padding="none">
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
                        <CustomTableCell className={classes.personalizedCell}>
                          {n[1].location}
                        </CustomTableCell>
                        <CustomTableCell padding="none">
                          {n[1].linkedin}
                        </CustomTableCell>
                        <CustomTableCell padding="none">
                          {n[1].twitter}
                        </CustomTableCell>
                        <CustomTableCell padding="none">
                          {n[1].facebook}
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
          <Typography variant="h5"> You don't have any mentors yet.</Typography>
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
      rowsPerPage: 5,
      mentorData: {},
      openSnackbarDeleted: false
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

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = key => this.state.mentorKey === key;

  handleDeleteMentor = () => {
    const { mentorKey } = this.state;
    deleteMentor(mentorKey).then(this.setState({ openSnackbarDeleted: true }));
    this.getMentors();
    this.handleClose();
  };

  handleClickDeleteMentor = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, mentorKey: "" });
  };
  getMentors = () => {
    getMentors().then(snapshot => {
      this.setState({
        mentors: snapshot.val()
      });
    });
  };

  /**
   * handleSnackbarClose - sets the actions when the snackbar is closed
   * @param {Object} event the event object
   * @param {Object} reason for closing the snackbar
   * @return {void}
   */
  handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      openSnackbarDeleted: false
    });
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
    const { classes } = this.props;
    const { openSnackbarDeleted, open } = this.state;
    return (
      <div className={classes.wrapper}>
        <div className={classes.root}>
          <Typography variant="h5" gutterBottom>
            Mentors
          </Typography>
          <MentorsList
            classes={classes}
            state={this.state}
            handleClickDeleteMentor={this.handleClickDeleteMentor}
            handleClose={this.handleClose}
            handleDeleteMentor={this.handleDeleteMentor}
            isSelected={this.isSelected}
            handleClick={this.handleClick}
            handleSelectAllClick={this.handleSelectAllClick}
            handleRequestSort={this.handleRequestSort}
            handleChangePage={this.handleChangePage}
            handleChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={openSnackbarDeleted}
          autoHideDuration={3000}
          onClose={this.handleSnackbarClose}
          id="openSnackbarDeleted"
          name="openSnackbarDeleted"
        >
          <SnackbarContentWrapper
            onClose={this.handleSnackbarClose}
            variant="warning"
            message="Mentor deleted"
          />
        </Snackbar>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete mentor?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this mentor?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDeleteMentor} color="primary">
              Yes
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
const StyledMentors = withStyles(styles)(Mentors);
const authMentors = authUser => Boolean(authUser);

export default withAuthorization(authMentors)(StyledMentors);
